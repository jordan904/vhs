/**
 * Image optimizer.
 *
 * Reads source images from `client/public/images/`, writes responsive
 * variants (AVIF + WebP at 400/800/1200/1600w plus a JPEG fallback) into
 * `client/public/images/optimized/`.
 *
 * Run once after adding new source images, then commit the outputs:
 *   pnpm run optimize-images
 *
 * Re-running is idempotent. Existing outputs are overwritten only if the
 * source is newer than the output.
 */

import sharp from "sharp";
import {
  readdir,
  mkdir,
  stat,
} from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename, extname } from "node:path";

const SOURCE_DIR = "client/public/images";
const OUT_DIR = "client/public/images/optimized";
const WIDTHS = [400, 800, 1200, 1600] as const;
const FALLBACK_WIDTH = 800;

const HERO_BASENAMES = new Set([
  "hero-bg",
  "contact-hero",
  "about-hero",
  "services-hero",
]);

const AVIF_QUALITY = 60;
const WEBP_QUALITY = 75;
const JPEG_FALLBACK_QUALITY = 78;

const SUPPORTED_INPUT_EXTS = new Set([".jpg", ".jpeg", ".png"]);

interface OptimizeResult {
  source: string;
  outputs: number;
  totalIn: number;
  totalOut: number;
}

async function isOlderThan(target: string, source: string): Promise<boolean> {
  if (!existsSync(target)) return true;
  const [t, s] = await Promise.all([stat(target), stat(source)]);
  return t.mtimeMs < s.mtimeMs;
}

async function optimizeOne(srcPath: string, outDir: string): Promise<OptimizeResult> {
  const ext = extname(srcPath).toLowerCase();
  const name = basename(srcPath, ext);
  const isHero = HERO_BASENAMES.has(name);

  const srcStat = await stat(srcPath);
  const meta = await sharp(srcPath).metadata();
  const sourceWidth = meta.width ?? FALLBACK_WIDTH;

  let outputs = 0;
  let totalOut = 0;

  const widths = WIDTHS.filter((w) => w <= sourceWidth);
  if (widths.length === 0) widths.push(Math.min(sourceWidth, WIDTHS[0]));

  for (const width of widths) {
    const baseSharp = sharp(srcPath).resize({ width, withoutEnlargement: true });

    const avifPath = join(outDir, `${name}-${width}.avif`);
    if (await isOlderThan(avifPath, srcPath)) {
      await baseSharp.clone().avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(avifPath);
      const s = await stat(avifPath);
      totalOut += s.size;
      outputs++;
    } else {
      const s = await stat(avifPath);
      totalOut += s.size;
    }

    const webpPath = join(outDir, `${name}-${width}.webp`);
    if (await isOlderThan(webpPath, srcPath)) {
      await baseSharp.clone().webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(webpPath);
      const s = await stat(webpPath);
      totalOut += s.size;
      outputs++;
    } else {
      const s = await stat(webpPath);
      totalOut += s.size;
    }
  }

  const fallbackPath = join(outDir, `${name}-${FALLBACK_WIDTH}.jpg`);
  if (await isOlderThan(fallbackPath, srcPath)) {
    await sharp(srcPath)
      .resize({ width: FALLBACK_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_FALLBACK_QUALITY, mozjpeg: true })
      .toFile(fallbackPath);
    const s = await stat(fallbackPath);
    totalOut += s.size;
    outputs++;
  } else {
    const s = await stat(fallbackPath);
    totalOut += s.size;
  }

  void isHero;
  return { source: srcPath, outputs, totalIn: srcStat.size, totalOut };
}

async function main(): Promise<void> {
  const start = Date.now();

  await mkdir(OUT_DIR, { recursive: true });

  const entries = await readdir(SOURCE_DIR);
  const sources = entries.filter((f) => SUPPORTED_INPUT_EXTS.has(extname(f).toLowerCase()));

  console.log(`Optimizing ${sources.length} source images -> ${OUT_DIR}`);

  let totalIn = 0;
  let totalOut = 0;
  let totalNew = 0;

  for (const file of sources) {
    const srcPath = join(SOURCE_DIR, file);
    const result = await optimizeOne(srcPath, OUT_DIR);
    totalIn += result.totalIn;
    totalOut += result.totalOut;
    totalNew += result.outputs;
    const inKb = (result.totalIn / 1024).toFixed(0);
    const outKb = (result.totalOut / 1024).toFixed(0);
    const tag = result.outputs > 0 ? `[+${result.outputs}]` : "[cache]";
    console.log(`  ${tag.padEnd(7)} ${file.padEnd(30)} ${inKb.padStart(6)} KB -> ${outKb.padStart(6)} KB`);
  }

  const seconds = ((Date.now() - start) / 1000).toFixed(1);
  const ratio = totalIn > 0 ? (1 - totalOut / totalIn) * 100 : 0;
  console.log("");
  console.log(`Done in ${seconds}s. Wrote ${totalNew} new files.`);
  console.log(`Source total: ${(totalIn / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Output total: ${(totalOut / 1024 / 1024).toFixed(1)} MB (${ratio.toFixed(0)}% smaller)`);
}

void main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
