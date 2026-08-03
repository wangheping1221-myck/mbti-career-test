/**
 * Shared tools catalog — single source of truth for hub, home, related tools, sitemap, SEO.
 * Do not duplicate live tool titles/hrefs elsewhere when adding or renaming tools.
 */

export type ToolCatalogStatus = "live" | "comingSoon";

export type ToolCatalogItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  status: ToolCatalogStatus;
};

export const TOOL_CATALOG: readonly ToolCatalogItem[] = [
  {
    id: "salary-calculator",
    title: "加拿大年薪 / 时薪转换器",
    description:
      "快速将年薪与时薪互算，并查看周薪、双周薪和月薪。结果为税前估算，适用于加拿大常见工资比较。",
    href: "/tools/salary-calculator",
    status: "live",
  },
  {
    id: "clb-calculator",
    title: "CLB 语言成绩转换器",
    description:
      "将 IELTS General Training 听说读写成绩转换为 CLB 等级，便于对照移民与省提名语言要求。",
    href: "/tools/clb-calculator",
    status: "live",
  },
  {
    id: "oinp-eoi-calculator",
    title: "安省 OWP EOI 打分计算器",
    description:
      "按 Ontario Workforce Priority（OWP）公开评分因素估算 EOI 分数。结果仅供参考，非正式官方计算器。",
    href: "/tools/oinp-eoi-calculator",
    status: "live",
  },
] as const;

/** Live tools only — for hub grids and public indexes. */
export function getLiveTools(): readonly ToolCatalogItem[] {
  return TOOL_CATALOG.filter((tool) => tool.status === "live");
}

/**
 * Returns live tools for cross-link surfaces.
 *
 * Used by:
 * - Career Test results
 * - Calculator Related Tools
 * - Future sitemap consumers
 *
 * - `excludeIds`: omit the current tool (or others)
 * - `limit`: max live tools to return (catalog order). Omit for no cap.
 */
export function getRelatedTools(options?: {
  excludeIds?: readonly string[];
  limit?: number;
}): readonly ToolCatalogItem[] {
  const exclude = new Set(options?.excludeIds ?? []);
  const related = getLiveTools().filter((tool) => !exclude.has(tool.id));

  if (options?.limit === undefined) {
    return related;
  }

  return related.slice(0, Math.max(0, options.limit));
}
