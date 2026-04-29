# Phase 3 Plan — VHS Performance + SEO Finish

## Context

Phase 2 shipped commits `851e867`, `263435d`, `d5bd54b`, `1afa240`, `bfc88a4`. Current state: prerendered SSG, AVIF/WebP image pipeline, lazy routes, expanded schema. Final mobile Lighthouse: home 46/92/100 (LCP 5.7s), decks 49/100/100 (LCP 6.1s, CLS 0).

Outstanding deficits: render-blocking CSS+JS (~1,470ms), unused JS (116 KB), no-cache headers (318 KB), descriptive-link-text fail on home, mainthread work 4.2s.

## Phase 3A (parallel)

### Agent 1: Critical CSS inlining

Goal: kill the 1,470ms render-blocking CSS hit. Drop LCP into 2-3s range.

Approach: install `beasties` (maintained `critters` fork). Hook as a post-prerender step in `scripts/prerender.ts`. For each generated `dist/public/<route>/index.html`, run beasties to inline above-the-fold CSS and async-load the rest. Vite's plugin runs at build time before prerender, so post-prerender is the right hook.

Files: `package.json`, `scripts/prerender.ts`, possibly new `scripts/inline-critical.ts`.

Verify: `<style>` block in head of each prerendered HTML, main CSS link uses media-print swap. Lighthouse LCP < 3s.

### Agent 2: Anchor text + button label audit

Goal: home SEO 92 -> 100. Lighthouse flags `link-text` for generic "Learn More" CTAs.

Approach: grep `Learn More`, `Get Started`, `Click here`, `View More`, `Read More` across `client/src/pages/*.tsx`. Replace each with descriptive text matching the destination. Keep buttons under 35 chars to avoid mobile overflow.

Files: Home.tsx, Services.tsx, About.tsx, ServiceArea.tsx, Process.tsx.

Verify: Lighthouse SEO = 100 on home, spot-check buttons at 375px width.

### Agent 3: framer-motion audit (conditional)

Goal: cut TBT (800-980ms) and main-thread work (4.2s).

Approach: confirm `framer-motion` in `package.json`. If yes: classify each `motion.*` usage as essential (hero, lightbox) vs decorative (fade-in). Replace decorative ones with existing `useScrollReveal` hook + CSS `.fade-in`. If no: skip agent.

Files: any page importing from `framer-motion`, `client/src/hooks/useScrollReveal.ts`.

Verify: bundle size -80-150 KB, TBT -300-500 ms.

## Phase 3B (sequential, after all 3A lands)

### Agent 4: Cloudflare Pages migration

Goal: unlock 318 KB cache-insight, faster CDN, proper cache-control.

Approach:
1. Connect repo to CF Pages. Build: `pnpm install --frozen-lockfile && pnpm exec playwright install chromium --with-deps && pnpm run build`. Output: `dist/public`. Set `VITE_FORM_ENDPOINT`.
2. Add `client/public/_headers` with `Cache-Control: public, max-age=31536000, immutable` on `/assets/*` and `/images/optimized/*`.
3. Test on `vhs-preview.pages.dev` first.
4. Schedule DNS cutover off-hours. Switch CNAME.
5. Verify HTTPS works, test all routes.
6. Leave GH Pages workflow as standby for a week, then disable.

Risk: DNS prop window 15 min - 1 hr. Email MX records unaffected.

## Phase 3C (final verification)

### Agent 5: Final benchmark + client-facing report

Run mobile Lighthouse on `/`, `/services/decks`, `/services/metal-roofing`, `/contact`, `/about`. Capture Perf/SEO/A11y/LCP/FCP/TBT/CLS/total-weight per route. Markdown comparing baseline -> Phase 2 -> Phase 3.

## Done criteria

- Mobile Performance >= 75 on every primary route
- LCP < 3 s on every primary route
- SEO = 100 on every primary route
- TBT < 400 ms on every primary route
- HTTP 200 on every route (verify post-CF)

## Concurrency rules

- 3A agents 1, 2, 3 parallel. File overlap minor (1: build config, 2: button JSX, 3: motion JSX).
- If 2 and 3 both touch the same page component, 2 commits first; 3 rebases.
- 3B waits for all 3A merged and Lighthouse confirms no regression.
- 3C last.

## Quick-start

```bash
cd C:/Projects/claude-programs/websites/vhs
git pull
pnpm install
pnpm run check && pnpm run build
```
