import { ToolCard } from "@/components/tools/tool-card";

export interface RelatedToolItem {
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
}

/**
 * Universal Related Tools block.
 * Always shown on tool pages for cross-navigation.
 */
export function RelatedTools({
  title = "相关工具",
  tools,
}: {
  title?: string;
  tools: readonly RelatedToolItem[];
}) {
  return (
    <section className="mx-auto mt-12 max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            href={tool.href}
            comingSoon={tool.comingSoon}
          />
        ))}
      </div>
    </section>
  );
}
