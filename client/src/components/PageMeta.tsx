/**
 * PageMeta — per-route head metadata.
 *
 * Sets <title>, meta description, canonical URL, and Open Graph /
 * Twitter card tags via react-helmet-async. The prerender script
 * (scripts/prerender.ts) captures the rendered head per route, so the
 * static HTML each route ships with includes correct metadata for
 * search engines and AI crawlers that don't execute JS.
 */

import { Helmet } from "react-helmet-async";
import type { ReactElement } from "react";

const SITE_URL = "https://versatilehomesolutions.ca";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/optimized/hero-bg-1200.jpg`;

export interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
}

export function PageMeta({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetaProps): ReactElement {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_CA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
