import { Disclaimer } from "@/components/tools/disclaimer";
import { ToolCard } from "@/components/tools/tool-card";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolLayout } from "@/components/tools/tool-layout";
import { getLiveTools } from "@/lib/tools/catalog";

export default function ToolsHubPage() {
  const tools = getLiveTools();

  return (
    <ToolLayout>
      <ToolHero
        eyebrow="Career Navigator Canada Tools"
        title="加拿大职业工具中心"
        description="免费实用工具，帮助你比较工资、换算语言成绩、估算安省 OWP EOI 分数。结果仅供教育参考，不构成移民或法律建议。"
      />

      <section className="mx-auto mt-10 max-w-3xl" aria-label="Tools">
        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
            />
          ))}
        </div>
      </section>

      <Disclaimer>
        <p>
          本站工具提供一般性职业与移民相关信息，仅供教育与自我评估参考，非正式政府计算器，亦不构成法律、移民或就业建议。正式申请请以加拿大联邦与省政府官方信息为准。
        </p>
      </Disclaimer>
    </ToolLayout>
  );
}
