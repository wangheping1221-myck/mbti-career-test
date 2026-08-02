/**
 * Shared production site origin for canonical URLs, Open Graph, sitemap, and robots.
 * Do not duplicate this constant in layouts.
 */
export const SITE_URL = "https://mbti-career-test.vercel.app";

/**
 * Absolute URL for metadata / sitemap.
 * - `/` → root site URL with trailing slash (homepage canonical policy)
 * - other paths → no trailing slash
 */
export function absoluteUrl(path: string = "/"): string {
  if (path === "/" || path === "") {
    return `${SITE_URL}/`;
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");
  return `${SITE_URL}${withoutTrailingSlash}`;
}
