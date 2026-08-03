import { Disclaimer } from "@/components/tools/disclaimer";
import { FaqSection } from "@/components/tools/faq-section";
import { FormulaSection } from "@/components/tools/formula-section";
import { LastUpdated } from "@/components/tools/last-updated";
import { RelatedTools } from "@/components/tools/related-tools";
import { SalaryCalculator } from "@/components/tools/salary-calculator";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolLayout } from "@/components/tools/tool-layout";
import { getRelatedTools } from "@/lib/tools/catalog";

const FAQ_ITEMS = [
  {
    question: "年薪怎么换算成时薪？",
    answer:
      "常用做法是：时薪 = 年薪 ÷ 每年工作周数 ÷ 每周工作小时数。例如年薪 $65,000、每周 40 小时、每年 52 周，时薪约为 $31.25。",
  },
  {
    question: "时薪怎么换算成年薪？",
    answer:
      "年薪 = 时薪 × 每周工作小时数 × 每年工作周数。例如时薪 $30、每周 37.5 小时、每年 52 周，年薪约为 $58,500。",
  },
  {
    question: "一年应该按多少周计算？",
    answer:
      "本工具默认按 52 周计算，这是加拿大常见的全年周数假设。若你的合同按不同周数计薪，可自行调整「每年工作周数」。",
  },
  {
    question: "加拿大全职工作通常每周多少小时？",
    answer:
      "很多全职岗位按每周 35、37.5 或 40 小时安排。实际工时因行业、省劳动标准与雇主政策而异，请以劳动合同为准。",
  },
  {
    question: "这个计算器包含所得税、CPP 和 EI 吗？",
    answer:
      "不包含。本工具只做税前年薪与时薪换算，不计算所得税、CPP、EI 或其他扣款。",
  },
  {
    question: "这个计算器包含加班费吗？",
    answer:
      "不包含。加班费率、起算门槛因省份与岗位而异，本工具不估算加班收入。",
  },
  {
    question: "月薪为什么用年薪除以 12？",
    answer:
      "这是一种常见的简化估算方式，便于比较不同报价。部分雇主按双周或按实际出勤发薪，到手节奏可能不同。",
  },
  {
    question: "可以输入 37.5 小时或其他自定义工时吗？",
    answer:
      "可以。可选择 35、37.5、40 等快捷选项，也可选择「自定义」输入其他小时数（支持小数）。",
  },
  {
    question: "年假和法定假日要不要从 52 周中扣除？",
    answer:
      "是否扣除取决于你如何理解「工作周」以及合同如何计薪。本工具默认不自动扣除；若你只想按实际有薪工作周估算，可自行下调周数。",
  },
  {
    question: "计算结果可以用于 OINP 或其他移民项目吗？",
    answer:
      "本工具只提供通用工资换算。不同移民项目可能有专门的工资定义、合资格工时和计算要求，使用前应核对对应政府官方规则。",
  },
] as const;

const relatedTools = getRelatedTools({
  excludeIds: ["salary-calculator"],
  limit: 3,
}).map((tool) => ({
  title: tool.title,
  description: tool.description,
  href: tool.href,
}));

export default function SalaryCalculatorPage() {
  return (
    <ToolLayout>
      <ToolHero
        eyebrow="Salary Calculator Canada"
        title="加拿大年薪 / 时薪转换器"
        description="快速将年薪转换为时薪，或将时薪换算成年薪，并查看周薪、双周薪和月薪。结果为税前估算，适用于加拿大常见工资比较场景。"
        features={["免费使用", "即时计算", "支持自定义工时"]}
      />

      <div className="mt-10">
        <SalaryCalculator />
      </div>

      <FormulaSection
        title="计算公式"
        formulas={[
          "时薪 = 年薪 ÷ 每年工作周数 ÷ 每周工作小时数",
          "年薪 = 时薪 × 每周工作小时数 × 每年工作周数",
        ]}
        notes={[
          "常见全职工作通常按每周 35、37.5 或 40 小时计算",
          "本工具默认每年 52 周",
          "无薪假、奖金、佣金和加班可能导致实际收入不同",
        ]}
      >
        <p className="text-sm leading-relaxed text-slate-600">
          无论你是做加拿大年薪时薪转换、Annual Salary to Hourly，还是 Hourly Wage
          to Annual Salary，都可在上方工具中一键完成，并同时查看周薪、双周薪与月薪。
        </p>
      </FormulaSection>

      <RelatedTools tools={relatedTools} />

      <div className="mx-auto mt-12 max-w-3xl">
        <FaqSection items={FAQ_ITEMS} />
      </div>

      <Disclaimer>
        <p>
          本工具根据用户输入提供税前工资估算，仅供一般信息参考，不构成财务、税务、就业、法律或移民建议。实际收入可能受加班、奖金、佣金、无薪假、Vacation
          Pay、雇主政策及其他因素影响。涉及政府项目、劳动标准或移民申请时，请以加拿大政府及相关省级部门的正式规定为准。
        </p>
      </Disclaimer>

      <LastUpdated date="2026-07-29" />
    </ToolLayout>
  );
}
