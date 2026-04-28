/**
 * Post-build prerender.
 *
 * After `vite build` produces the SPA in dist/public/index.html, this
 * script:
 *  1. Spawns a static file server pointing at dist/public.
 *  2. Crawls each route in ROUTES with a headless Chromium.
 *  3. Waits for the React app to finish mounting (Suspense + Helmet).
 *  4. Saves the rendered HTML to dist/public/<route>/index.html.
 *
 * GitHub Pages then serves a real HTML file at the right HTTP status
 * for every route, with per-page <title> + meta description baked in,
 * so search engines and AI crawlers (which don't run JS) see real
 * content instead of an empty <div id="root">.
 */

import { createServer, type Server } from "node:http";
import { createReadStream } from "node:fs";
import { stat, mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { setTimeout as wait } from "node:timers/promises";
import Beasties from "beasties";
import { chromium, type Browser } from "playwright";

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const DIST_DIR = "dist/public";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const ROUTES: string[] = [
  "/",
  "/about",
  "/services",
  "/services/metal-roofing",
  "/services/decks",
  "/services/sheds-outbuildings",
  "/services/fences",
  "/services/lvp-flooring",
  "/process",
  "/service-area",
  "/careers",
  "/contact",
  "/404",
];

async function startServer(): Promise<Server> {
  const root = resolve(DIST_DIR);

  const server = createServer(async (req, res) => {
    try {
      const reqPath = new URL(req.url ?? "/", BASE_URL).pathname;
      const candidates = [
        join(root, reqPath),
        join(root, reqPath, "index.html"),
        join(root, "index.html"),
      ];

      for (const file of candidates) {
        try {
          const s = await stat(file);
          if (s.isFile()) {
            const ext = extname(file).toLowerCase();
            const mime = MIME_TYPES[ext] ?? "application/octet-stream";
            res.writeHead(200, { "Content-Type": mime });
            createReadStream(file).pipe(res);
            return;
          }
        } catch {
          // try next candidate
        }
      }
      res.writeHead(404).end("Not Found");
    } catch (err) {
      res.writeHead(500).end(String(err));
    }
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve());
  });
  return server;
}

const CLEANUP_HEAD_SCRIPT = `
(function () {
  var head = document.head;
  var activeTitle = document.title;
  function getMeta(sel) {
    var els = document.querySelectorAll(sel);
    return els.length > 0 ? els[els.length - 1].content || "" : "";
  }
  function getLink(sel) {
    var els = document.querySelectorAll(sel);
    return els.length > 0 ? els[els.length - 1].href || "" : "";
  }

  var desc = getMeta('meta[name="description"]');
  var canonical = getLink('link[rel="canonical"]');
  var ogTitle = getMeta('meta[property="og:title"]') || activeTitle;
  var ogDesc = getMeta('meta[property="og:description"]') || desc;
  var ogUrl = getMeta('meta[property="og:url"]') || canonical;
  var ogImage = getMeta('meta[property="og:image"]');
  var ogType = getMeta('meta[property="og:type"]');
  var ogLocale = getMeta('meta[property="og:locale"]');
  var twCard = getMeta('meta[name="twitter:card"]');
  var twTitle = getMeta('meta[name="twitter:title"]') || activeTitle;
  var twDesc = getMeta('meta[name="twitter:description"]') || desc;
  var twImage = getMeta('meta[name="twitter:image"]') || ogImage;
  var robots = getMeta('meta[name="robots"]');

  function removeAll(selector) {
    var nodes = head.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) nodes[i].remove();
  }
  removeAll('title');
  removeAll('meta[name="description"]');
  removeAll('meta[name="robots"]');
  removeAll('link[rel="canonical"]');
  removeAll('meta[property^="og:"]');
  removeAll('meta[name^="twitter:"]');

  function addMeta(attr, key, value) {
    if (!value) return;
    var m = document.createElement('meta');
    m.setAttribute(attr, key);
    m.setAttribute('content', value);
    head.insertBefore(m, head.firstChild);
  }
  function addLink(rel, href) {
    if (!href) return;
    var l = document.createElement('link');
    l.setAttribute('rel', rel);
    l.setAttribute('href', href);
    head.insertBefore(l, head.firstChild);
  }

  // Insert in reverse so the final DOM order is title, description,
  // canonical, og:*, twitter:* at the very top of <head>.
  addMeta('name', 'twitter:image', twImage);
  addMeta('name', 'twitter:description', twDesc);
  addMeta('name', 'twitter:title', twTitle);
  addMeta('name', 'twitter:card', twCard);
  addMeta('property', 'og:locale', ogLocale);
  addMeta('property', 'og:image', ogImage);
  addMeta('property', 'og:url', ogUrl);
  addMeta('property', 'og:description', ogDesc);
  addMeta('property', 'og:title', ogTitle);
  addMeta('property', 'og:type', ogType);
  addLink('canonical', canonical);
  if (robots) addMeta('name', 'robots', robots);
  addMeta('name', 'description', desc);

  var t = document.createElement('title');
  t.textContent = activeTitle;
  head.insertBefore(t, head.firstChild);
})();
`;

function routeToOutputPath(route: string): string {
  if (route === "/") return join(DIST_DIR, "index.html");
  const trimmed = route.replace(/^\//, "").replace(/\/$/, "");
  return join(DIST_DIR, trimmed, "index.html");
}

async function prerenderRoute(
  browser: Browser,
  beasties: Beasties,
  route: string,
): Promise<{ bytes: number; inlinedCss: number }> {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  try {
    const url = `${BASE_URL}${route}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
    await wait(300);

    /**
     * Helmet leaves stale title/meta tags from earlier render passes
     * inside the live DOM. Before serializing, run JS in-page to
     * rewrite the head so only the currently active metadata survives.
     * Passed as a string to avoid tsx/esbuild emitting __name helpers
     * that don't exist in the browser context.
     */
    await page.evaluate(CLEANUP_HEAD_SCRIPT);

    const rawHtml = await page.content();

    /**
     * Inline above-the-fold CSS so the first paint isn't blocked on the
     * full ~135 KB CSS bundle. Beasties scans the rendered DOM, extracts
     * only the rules that match elements actually in the page, inlines
     * them in a <style> tag, and rewrites the main <link rel="stylesheet">
     * to a media="print" onload swap that loads the rest asynchronously.
     */
    const html = await beasties.process(rawHtml);
    const inlinedCss = measureInlinedCss(html);

    const outPath = routeToOutputPath(route);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    return { bytes: Buffer.byteLength(html, "utf8"), inlinedCss };
  } finally {
    await page.close();
  }
}

function measureInlinedCss(html: string): number {
  const matches = html.match(/<style\b[^>]*>([\s\S]*?)<\/style>/gi);
  if (!matches) return 0;
  return matches.reduce((sum, block) => {
    const inner = block.replace(/^<style\b[^>]*>/i, "").replace(/<\/style>$/i, "");
    return sum + Buffer.byteLength(inner, "utf8");
  }, 0);
}

async function main(): Promise<void> {
  const start = Date.now();
  console.log(`Prerendering ${ROUTES.length} routes from ${DIST_DIR}...`);

  const server = await startServer();
  const browser = await chromium.launch({ headless: true });

  /**
   * Single Beasties instance reused across routes — it caches parsed
   * stylesheets between calls. `path` points at the build output so it
   * can read /assets/index-*.css off disk. `preload: 'media'` rewrites
   * the main <link> to media="print" onload="this.media='all'" plus a
   * <noscript> fallback, which is the cheapest async-CSS pattern.
   */
  const beasties = new Beasties({
    path: resolve(DIST_DIR),
    publicPath: "/",
    preload: "media",
    pruneSource: false,
    mergeStylesheets: true,
    inlineFonts: false,
    preloadFonts: false,
    fonts: false,
    logLevel: "warn",
  });

  let totalBytes = 0;
  let totalInlined = 0;
  try {
    for (const route of ROUTES) {
      const { bytes, inlinedCss } = await prerenderRoute(browser, beasties, route);
      totalBytes += bytes;
      totalInlined += inlinedCss;
      const kb = (bytes / 1024).toFixed(1);
      const inlineKb = (inlinedCss / 1024).toFixed(1);
      console.log(
        `  ${route.padEnd(40)} ${kb.padStart(7)} KB  (inline CSS ${inlineKb.padStart(5)} KB)`,
      );
    }
  } finally {
    await browser.close();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }

  const seconds = ((Date.now() - start) / 1000).toFixed(1);
  console.log(
    `\nDone in ${seconds}s. Wrote ${ROUTES.length} HTML files (${(totalBytes / 1024).toFixed(0)} KB total, ${(totalInlined / 1024).toFixed(0)} KB inline CSS).`,
  );
}

void main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
