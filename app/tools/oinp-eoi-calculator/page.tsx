import { Disclaimer } from "@/components/tools/disclaimer";
import { FaqSection } from "@/components/tools/faq-section";
import { FormulaSection } from "@/components/tools/formula-section";
import { LastUpdated } from "@/components/tools/last-updated";
import { OinpEoiCalculator } from "@/components/tools/oinp-eoi-calculator";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolLayout } from "@/components/tools/tool-layout";
import { OINP_OWP_SOURCE } from "@/lib/oinp/constants";
import { getRelatedTools } from "@/lib/tools/catalog";

import {
  CAREER_TEST_RELATED_LINK,
  OWP_FAQ_ITEMS,
  OWP_FORMULA_NOTES,
} from "./content";

const relatedTools = [
  ...getRelatedTools({
    excludeIds: ["oinp-eoi-calculator"],
    limit: 3,
  }).map((tool) => ({
    title: tool.title,
    description: tool.description,
    href: tool.href,
  })),
  CAREER_TEST_RELATED_LINK,
];

export default function OinpEoiCalculatorPage() {
  return (
    <ToolLayout>
      <ToolHero
        eyebrow="Ontario Workforce Priority (OWP) Calculator"
        title="安省 Ontario Workforce Priority（OWP）EOI 打分计算器"
        description="根据 Ontario.ca 公开的 OWP EOI 评分因素，估算 Job Offer 路径总分与分项。结果仅供参考；不判定申请资格，不保证获邀。"
        features={["免费估算", "OWP Job Offer", "分项明细"]}
      />

      <p className="mx-auto mt-4 max-w-3xl rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-amber-950">
        EOI / e-Filing 是否开放以{" "}
        <a
          href={OINP_OWP_SOURCE.crossCheckUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-800 underline underline-offset-2"
        >
          安省 OINP Updates
        </a>{" "}
        最新公告为准。本工具不实时反映 Portal 开关状态。
      </p>

      <div className="mt-10">
        <OinpEoiCalculator />
      </div>

      <FormulaSection
        title="计分说明"
        formulas={[
          "估算 OWP EOI 总分 = Σ（Job Offer 路径下各适用评分因素得分）",
          "TEER + 职业大类；语言能力 + 官方语言数量；安省工作经验仅计一条分支",
        ]}
        notes={OWP_FORMULA_NOTES}
      >
        <p className="text-sm leading-relaxed text-slate-600">
          旧 Employer Job Offer 等多流已关闭。本页仅估算现行 Ontario Workforce
          Priority（OWP）公开 EOI 评分因素，不是 OINP / IRCC 官方计算器。
        </p>
      </FormulaSection>

      <RelatedTools tools={relatedTools} />

      <div className="mx-auto mt-12 max-w-3xl">
        <FaqSection items={OWP_FAQ_ITEMS} />
      </div>

      <Disclaimer>
        <p>
          本工具根据 Ontario Immigrant Nominee
          Program（OINP）在 Ontario.ca 公开的 Ontario Workforce
          Priority（OWP）Expression of Interest（EOI）评分因素信息，进行分数估算，仅供一般信息参考，不构成移民、法律或留学建议。评分因素、流状态、e-Filing
          / EOI
          开放情况与邀请政策可能变更；申请资格、文件要求及最终结果以安大略省政府与
          Immigration, Refugees and Citizenship
          Canada（IRCC）的正式规定与审核为准。本工具不是 OINP 或 IRCC
          官方系统。旧的 Employer Job Offer
          等流已关闭，请勿将历史规则当作现行注册依据。
        </p>
      </Disclaimer>

      <LastUpdated
        date="2026年7月"
        sourceLabel="Ontario Workforce Priority — Scoring factors"
        sourceHref={OINP_OWP_SOURCE.sourceUrl}
      />
    </ToolLayout>
  );
}
