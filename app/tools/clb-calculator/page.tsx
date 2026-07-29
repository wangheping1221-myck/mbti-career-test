import { ClbCalculator } from "@/components/tools/clb-calculator";
import { Disclaimer } from "@/components/tools/disclaimer";
import { FaqSection } from "@/components/tools/faq-section";
import { FormulaSection } from "@/components/tools/formula-section";
import { LastUpdated } from "@/components/tools/last-updated";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolLayout } from "@/components/tools/tool-layout";
import { IELTS_GT_CLB_SOURCE } from "@/lib/clb/constants";

import {
  CLB_FAQ_ITEMS,
  CLB_FORMULA_NOTES,
  CLB_RELATED_TOOLS,
} from "./content";

export default function ClbCalculatorPage() {
  return (
    <ToolLayout>
      <ToolHero
        eyebrow="CLB Calculator Canada"
        title="加拿大 CLB 语言成绩转换器"
        description="输入 IELTS General Training 听说读写成绩，查看四项 CLB 与 Overall CLB（最低单项）。换算依据 IRCC 公开对照表，结果仅供参考。"
        features={["免费使用", "即时换算", "官方对照表依据"]}
      />

      <div className="mt-10">
        <ClbCalculator />
      </div>

      <FormulaSection
        title="换算说明"
        formulas={[
          "各项 CLB = 按 IRCC IELTS General Training 对照表逐项查表",
          "Overall CLB = min(Listening CLB, Reading CLB, Writing CLB, Speaking CLB)",
        ]}
        notes={CLB_FORMULA_NOTES}
      >
        <p className="text-sm leading-relaxed text-slate-600">
          这不是数学平均值，也不是「average CLB」。各移民项目可能对四项分别设置最低要求，请以加拿大政府最新官方说明为准。
        </p>
      </FormulaSection>

      <RelatedTools tools={CLB_RELATED_TOOLS} />

      <div className="mx-auto mt-12 max-w-3xl">
        <FaqSection items={CLB_FAQ_ITEMS} />
      </div>

      <Disclaimer>
        <p>
          本工具根据 Immigration, Refugees and Citizenship
          Canada（IRCC）公开的语言成绩对照信息，将 IELTS General Training
          分数换算为 CLB 等级，仅供一般信息参考，不构成移民、法律或留学建议。对照表与项目要求可能更新；申请前应再次核对
          Canada.ca 最新官方要求。最终资格与审核结果以加拿大政府及相关省级部门为准。
        </p>
      </Disclaimer>

      <LastUpdated
        date="July 2026"
        sourceLabel="IRCC 官方对照表"
        sourceHref={IELTS_GT_CLB_SOURCE.sourceUrl}
      />
    </ToolLayout>
  );
}
