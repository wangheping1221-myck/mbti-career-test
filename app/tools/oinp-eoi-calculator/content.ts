/**
 * Page-level copy for OWP EOI Calculator UI (P4.2).
 * Scoring option labels/points stay in lib/oinp/tables — do not duplicate points here.
 */

export const OWP_FAQ_ITEMS = [
  {
    question: "EOI 分数和申请资格一样吗？",
    answer:
      "不一样。本工具只估算 Ontario Workforce Priority（OWP）EOI 评分因素总分。申请资格（stream criteria）是另一套要求，本工具不判定你是否符合资格。",
  },
  {
    question: "分数高就一定获邀吗？",
    answer:
      "不一定。EOI 分数用于池内排序与邀请参考，获邀还取决于配额、抽选规则与其他政策，本工具不预测获邀、不保证结果。",
  },
  {
    question: "现在能在官方系统注册 EOI 吗？",
    answer:
      "EOI / e-Filing 是否开放以安省政府官网「2026 Ontario Immigrant Nominee Program Updates」最新公告为准。本工具不反映实时 Portal 开关状态。",
  },
  {
    question: "工资怎么填？",
    answer:
      "按 Job Offer 时薪选择官方时薪档。若你只有年薪，可先用本站年薪/时薪转换器估算时薪，再回来选档。请勿用非官方「行业平均工资」代替 Job Offer 工资。",
  },
  {
    question: "语言分怎么填？",
    answer:
      "先用 CLB 转换器把 IELTS General Training 换成四项 CLB，再按四项中的最低 CLB 选择语言能力档。若选择两种官方语言，须满足官方对双语的 CLB 门槛（两门测试均至少 CLB 6）。",
  },
  {
    question: "安省工作经验如何计分？",
    answer:
      "若你目前在 Job Offer 岗位工作且累计至少 6 个月，使用在岗经验档；否则使用安省一般工作经验档。两档互斥，不会相加。本工具不支持 self-employed physician 路径。",
  },
  {
    question: "地区怎么选？",
    answer:
      "按 Job Offer 中的工作地点，选择官方区域档（Northern / Eastern / Central outside GTA / Southwestern / Inside GTA except Toronto / Toronto）。本版本不提供城市自动对照。",
  },
  {
    question: "旧的 Employer Job Offer 流还能用吗？",
    answer:
      "不能。官方已关闭旧的多流 Employer Job Offer 等路径。本工具仅估算现行 Ontario Workforce Priority（OWP）Job Offer 路径的公开 EOI 评分因素。",
  },
  {
    question: "结果是官方分数吗？",
    answer:
      "不是。结果仅为依据 Ontario.ca 公开评分因素的估算，非正式 OINP / IRCC 计算器，不构成移民或法律建议。",
  },
] as const;

export const OWP_RELATED_TOOLS = [
  {
    title: "CLB 语言成绩转换器",
    description: "将 IELTS General Training 成绩转换为 CLB，便于填写语言能力档。",
    href: "/tools/clb-calculator",
  },
  {
    title: "年薪 / 时薪转换器",
    description: "把年薪换算成时薪后，再对照 OWP 时薪评分档。",
    href: "/tools/salary-calculator",
  },
  {
    title: "CRS Calculator",
    description: "Express Entry CRS 综合评分估算。",
    comingSoon: true,
  },
  {
    title: "职业方向测试",
    description: "3 分钟了解更适合你的加拿大职业方向（职业方向参考）。",
    href: "/",
  },
] as const;

export const OWP_FORMULA_NOTES = [
  "估算总分 = 各适用评分因素得分之和（Job Offer 路径）。",
  "NOC TEER 与职业大类分别计分后相加；语言能力与官方语言数量分别计分后相加。",
  "安省工作经验：在岗档与安省一般经验档互斥，只计其中一条。",
  "评分因素 ≠ 申请资格 ≠ 获邀保证；Portal 开放状态以官方 Updates 为准。",
  "本工具不包含 self-employed physician 完整计分路径。",
] as const;
