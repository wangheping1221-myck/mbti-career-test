import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";
import { getLiveTools } from "@/lib/tools/catalog";

/** Tracked live public product routes only (no API, unlock queries, or untracked paths). */
export default function sitemap(): MetadataRoute.Sitemap {
  const corePaths = ["/", "/career-test", "/tools"] as const;
  const calculatorPaths = getLiveTools().map((tool) => tool.href);

  return [...corePaths, ...calculatorPaths].map((path) => ({
    url: absoluteUrl(path),
  }));
}
