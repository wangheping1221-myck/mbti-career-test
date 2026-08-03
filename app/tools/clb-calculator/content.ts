/**
 * Page-level copy for CLB Calculator UI (Phase 2).
 * Mapping data stays in lib/clb/constants.ts — do not put score tables here.
 */

export const CLB_FAQ_ITEMS = [
  {
    question: "什么是 CLB？",
    answer:
      "CLB（Canadian Language Benchmarks）是加拿大用来描述英语能力等级的标准。本工具按听说读写分别对照 IRCC 公开表格换算。",
  },
  {
    question: "IELTS General 和 Academic 一样吗？",
    answer:
      "不一样。本工具仅支持 IELTS General Training。IELTS Academic 不在本换算范围内，请勿把 Academic 成绩当作 General 输入。",
  },
  {
    question: "Overall CLB 是怎么显示的？",
    answer:
      "本工具的 Overall CLB 等于四项 CLB 中的最低一项，用于快速查看短板。它不是四项平均分，也不代表所有移民项目只看这一项。",
  },
  {
    question: "为什么听说读写对应的分数不一样？",
    answer:
      "IRCC 对照表对 Listening、Reading、Writing、Speaking 分别规定了达到某一 CLB 所需的最低 IELTS 分数，因此同一 CLB 在不同技能上的分数门槛可能不同。",
  },
  {
    question: "CLB 7 / CLB 9 常见用途是什么？",
    answer:
      "许多联邦或省提名项目会在语言要求中提到类似 CLB 7、CLB 9 等门槛。具体以各项目当期官方说明为准；本工具不判断你是否符合某一项目资格。",
  },
  {
    question: "数据来源是什么？",
    answer:
      "换算依据 Immigration, Refugees and Citizenship Canada（IRCC）在 Canada.ca 公布的 IELTS General Training 与 CLB 对照信息。申请前请再次核对最新官方页面。",
  },
  {
    question: "支持 CELPIP 吗？",
    answer:
      "本版本暂不支持 CELPIP。CELPIP 计划在后续版本加入；当前请使用 IELTS General Training 成绩。",
  },
  {
    question: "结果可以用于正式申请吗？",
    answer:
      "结果仅供参考，帮助你理解成绩对应的 CLB 等级。正式申请请以考试机构成绩单、IRCC 账户填写要求及政府审核为准，本工具不构成移民或法律建议。",
  },
] as const;

/** Page-local Career Test link — not part of the calculator catalog. */
export const CAREER_TEST_RELATED_LINK = {
  title: "职业方向测试",
  description: "3 分钟了解更适合你的加拿大职业方向（职业方向参考）。",
  href: "/career-test",
} as const;

export const CLB_FORMULA_NOTES = [
  "换算依据 IRCC 官方成绩 ↔ CLB 对照表，逐项查表，不是把四项 IELTS 分数做数学平均。",
  "本工具展示的 Overall CLB = 四项 CLB 中的最低项，便于查看短板。",
  "不同移民项目可能对听说读写分别设置最低 CLB 要求，请以官方项目说明为准。",
  "本版本仅支持 IELTS General Training，不支持 IELTS Academic。",
] as const;
