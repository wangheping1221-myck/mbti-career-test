/**
 * Career Test V2 — canonical 26-question bank (V2.4C1).
 * Question text and OptionSignalV2 metadata only.
 * No weights, scoring formulas, normalization, or validation runtime.
 *
 * Hard-filter soft dual-write is applied in normalization (later), not here.
 * Chinese taxonomy wording uses 职业大类 / 职业领域 only where applicable.
 */

import { OPTION_IDS_V2, QUESTION_IDS_V2, type QuestionIdV2 } from "./ids";
import type { AnswerOptionV2, OptionSignalV2, QuestionV2 } from "./questions";

function opt(
  id: AnswerOptionV2["id"],
  labelZh: string,
  signal: OptionSignalV2,
  extras?: Pick<AnswerOptionV2, "labelEn" | "ariaLabelZh" | "copyTestingNote">,
): AnswerOptionV2 {
  return { id, labelZh, signal, ...extras };
}

export const QUESTION_BANK_V2 = [
  {
    id: "v2-c01",
    section: "constraints",
    promptZh: "夜班或轮班（倒班）对你来说可以接受吗？",
    promptEn: "How acceptable are night shifts or rotating shifts for you?",
    subtitleZh:
      "轮班指日夜班交替或班次不固定。本题不讨论单纯的周末或晚间加班（见后续题目）。",
    options: [
      opt("a", "不能接受夜班或轮班，这类岗位不考虑。", {
        kind: "hard-constraint",
        constraint: "rejectsNightOrRotating",
      }),
      opt("b", "尽量避免；极偶尔可以商量", {
        kind: "ordinal-soft",
        dimension: "shiftScheduleTolerance",
        level: 0,
      }),
      opt("c", "偶尔夜班或轮班可以接受", {
        kind: "ordinal-soft",
        dimension: "shiftScheduleTolerance",
        level: 1,
      }),
      opt("d", "经常夜班或轮班也可以", {
        kind: "ordinal-soft",
        dimension: "shiftScheduleTolerance",
        level: 2,
      }),
    ],
  },
  {
    id: "v2-c02",
    section: "constraints",
    promptZh: "需要频繁搬抬重物或持续高强度体力的工作，你能接受吗？",
    promptEn:
      "Can you accept work that needs frequent heavy lifting or sustained high-intensity physical effort?",
    subtitleZh: "普通站立、走路或偶尔弯腰，单独不构成本题的硬性排除。",
    options: [
      opt("a", "不能接受需要频繁搬抬重物或持续高强度体力的工作。", {
        kind: "hard-constraint",
        constraint: "rejectsHeavyPhysical",
      }),
      opt("b", "只能接受很轻的体力负担", {
        kind: "ordinal-soft",
        dimension: "physicalDemandTolerance",
        level: 0,
      }),
      opt("c", "中等体力可以，重体力尽量避免", {
        kind: "ordinal-soft",
        dimension: "physicalDemandTolerance",
        level: 1,
      }),
      opt("d", "较高或持续重体力也可以", {
        kind: "ordinal-soft",
        dimension: "physicalDemandTolerance",
        level: 2,
      }),
    ],
  },
  {
    id: "v2-c03",
    section: "constraints",
    promptZh: "目前用英语完成工作时，下面哪项更接近你的情况？",
    promptEn: "Which option best matches your current English use at work?",
    subtitleZh: "评估的是**当前**工作沟通，不是永久能力，也与个人价值无关。",
    options: [
      opt("a", "简单指令仍常需要协助才能完成", {
        kind: "ordinal-soft",
        dimension: "englishReadiness",
        level: 0,
      }),
      opt("b", "常规工作沟通大体可以，复杂讨论较吃力", {
        kind: "ordinal-soft",
        dimension: "englishReadiness",
        level: 1,
      }),
      opt("c", "电话、邮件和一般说明沟通较顺畅", {
        kind: "ordinal-soft",
        dimension: "englishReadiness",
        level: 2,
      }),
      opt("d", "复杂讨论或偏专业的沟通也比较自如", {
        kind: "ordinal-soft",
        dimension: "englishReadiness",
        level: 3,
      }),
    ],
  },
  {
    id: "v2-c04",
    section: "constraints",
    promptZh: "为进入一个新方向，你愿意投入多长时间准备或培训？",
    promptEn:
      "How long are you willing to prepare or train before entering a new direction?",
    subtitleZh: "选项表达意愿区间，不代表任何职业的官方培训时长。",
    options: [
      opt("a", "希望尽快上手，只做很短的准备", {
        kind: "ordinal-soft",
        dimension: "trainingDurationTolerance",
        level: 0,
      }),
      opt("b", "可以接受约一年内的准备或培训", {
        kind: "ordinal-soft",
        dimension: "trainingDurationTolerance",
        level: 1,
      }),
      opt("c", "可以接受更长时间的系统学习", {
        kind: "ordinal-soft",
        dimension: "trainingDurationTolerance",
        level: 2,
      }),
      opt("d", "不确定，取决于具体方向", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-c05",
    section: "constraints",
    promptZh:
      "如果某个方向可能涉及证书、考试、执照或学徒/系统资质路径，你的态度是？",
    promptEn:
      "How do you feel if a direction may involve certificates, exams, licences, or apprenticeship / structured qualification paths?",
    subtitleZh:
      "本题只问态度。是否真的需要证件，须经后续 Human Verify，本题不作事实断言。",
    options: [
      opt("a", "更希望路径尽量少正式证件要求", {
        kind: "ordinal-soft",
        dimension: "formalEntryWillingness",
        level: 0,
      }),
      opt("b", "短期证书或考试可以；长期学徒较犹豫", {
        kind: "ordinal-soft",
        dimension: "formalEntryWillingness",
        level: 1,
      }),
      opt("c", "愿意走可能需要正式证件或学徒的路径", {
        kind: "ordinal-soft",
        dimension: "formalEntryWillingness",
        level: 2,
      }),
      opt("d", "不确定，要看投入与时间安排", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-c06",
    section: "constraints",
    promptZh: "你更希望以什么节奏进入一个新的职业方向？",
    promptEn: "What pace do you prefer when entering a new career direction?",
    subtitleZh: "中性描述起步节奏，不是移民评分，也不是“急需用钱”的判断。",
    options: [
      opt("a", "先从基础岗位开始，边做边学", {
        kind: "entry-pace",
        category: "learn-on-job",
      }),
      opt("b", "做一些短期准备后再进入", {
        kind: "entry-pace",
        category: "short-prep",
      }),
      opt("c", "愿意先系统学习，再进入更匹配的方向", {
        kind: "entry-pace",
        category: "study-first",
      }),
      opt("d", "取决于具体职业，目前保持灵活", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p01",
    section: "work-preferences",
    promptZh: "日常完成任务时，你更偏好哪种方式？",
    promptEn: "How do you prefer to get work done day to day?",
    options: [
      opt("a", "偏独立完成，少打断", {
        kind: "work-style-sub",
        subKey: "independentTeam",
        level: 0,
      }),
      opt("b", "小范围配合即可", {
        kind: "work-style-sub",
        subKey: "independentTeam",
        level: 1,
      }),
      opt("c", "喜欢紧密团队协作", {
        kind: "work-style-sub",
        subKey: "independentTeam",
        level: 2,
      }),
      opt("d", "都可以，看岗位", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p02",
    section: "work-preferences",
    promptZh: "你更想把时间花在哪类任务上？",
    promptEn: "What kind of tasks do you prefer spending time on?",
    options: [
      opt("a", "动手操作工具、设备或现场任务", {
        kind: "work-style-sub",
        subKey: "handsOnDesk",
        level: 0,
      }),
      opt("b", "动手与案头工作大约各一半", {
        kind: "work-style-sub",
        subKey: "handsOnDesk",
        level: 1,
      }),
      opt("c", "电脑、流程、文件等案头工作", {
        kind: "work-style-sub",
        subKey: "handsOnDesk",
        level: 2,
      }),
      opt("d", "不确定", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p03",
    section: "work-preferences",
    promptZh: "工作环境上，你更偏好？",
    promptEn: "Which work environment do you prefer?",
    options: [
      opt("a", "主要在室内", {
        kind: "ordinal-soft",
        dimension: "indoorOutdoorPreference",
        level: 0,
      }),
      opt("b", "室内为主，偶尔户外", {
        kind: "ordinal-soft",
        dimension: "indoorOutdoorPreference",
        level: 1,
      }),
      opt("c", "经常户外或露天也可以", {
        kind: "ordinal-soft",
        dimension: "indoorOutdoorPreference",
        level: 2,
      }),
      opt("d", "无所谓", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p04",
    section: "work-preferences",
    promptZh: "需要经常面对顾客、病人或公众时，你更倾向？",
    promptEn:
      "When work involves frequent contact with customers, patients, or the public, what fits you better?",
    options: [
      opt("a", "更希望少接触陌生公众", {
        kind: "ordinal-soft",
        dimension: "customerFacingTolerance",
        level: 0,
      }),
      opt("b", "短暂接触可以", {
        kind: "ordinal-soft",
        dimension: "customerFacingTolerance",
        level: 1,
      }),
      opt("c", "经常沟通服务也可以", {
        kind: "ordinal-soft",
        dimension: "customerFacingTolerance",
        level: 2,
      }),
      opt("d", "喜欢高频对客互动", {
        kind: "ordinal-soft",
        dimension: "customerFacingTolerance",
        level: 3,
      }),
    ],
  },
  {
    id: "v2-p05",
    section: "work-preferences",
    promptZh: "你更适应哪种任务推进方式？",
    promptEn: "Which way of working suits you better?",
    options: [
      opt("a", "流程清晰，按标准一步步执行", {
        kind: "work-style-sub",
        subKey: "structureJudgment",
        level: 0,
      }),
      opt("b", "有框架，但可灵活调整", {
        kind: "work-style-sub",
        subKey: "structureJudgment",
        level: 1,
      }),
      opt("c", "变化多，常要临场判断", {
        kind: "work-style-sub",
        subKey: "structureJudgment",
        level: 2,
      }),
      opt("d", "都可以", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p06",
    section: "work-preferences",
    promptZh: "一天中的工作内容，你更希望？",
    promptEn: "How much variety do you want in a typical workday?",
    options: [
      opt("a", "稳定重复、熟悉节奏", {
        kind: "work-style-sub",
        subKey: "routineVariety",
        level: 0,
      }),
      opt("b", "有一定变化", {
        kind: "work-style-sub",
        subKey: "routineVariety",
        level: 1,
      }),
      opt("c", "经常换任务或场景", {
        kind: "work-style-sub",
        subKey: "routineVariety",
        level: 2,
      }),
      opt("d", "不确定", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p07",
    section: "work-preferences",
    promptZh: "如果必须做个权衡，你更接近哪一边？",
    promptEn: "If you had to choose a trade-off, which side is closer to you?",
    subtitleZh: "不涉及具体薪资数字，也不承诺收入结果。",
    options: [
      opt("a", "更看重稳定、可预期，接受上升空间可能有限", {
        kind: "tradeoff",
        dimension: "stabilityVersusUpside",
        pole: "stability",
      }),
      opt("b", "希望两者尽量平衡", {
        kind: "tradeoff",
        dimension: "stabilityVersusUpside",
        pole: "balance",
      }),
      opt("c", "可接受更多不确定，换取更大发展或上升空间", {
        kind: "tradeoff",
        dimension: "stabilityVersusUpside",
        pole: "upside",
      }),
      opt("d", "目前说不清，要看具体方向", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p08",
    section: "work-preferences",
    promptZh: "你更擅长并更愿意把精力放在哪类工作上？",
    promptEn: "Where would you rather focus your effort?",
    options: [
      opt("a", "把细节、记录、标准或固定流程做准确", {
        kind: "ordinal-soft",
        dimension: "detailVersusCoordination",
        level: 0,
      }),
      opt("b", "细节与协调各一半", {
        kind: "ordinal-soft",
        dimension: "detailVersusCoordination",
        level: 1,
      }),
      opt("c", "协调多人、行程、任务或多项优先级", {
        kind: "ordinal-soft",
        dimension: "detailVersusCoordination",
        level: 2,
      }),
      opt("d", "不确定", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p09",
    section: "work-preferences",
    promptZh: "你对带人、排班或做现场/小组负责人的兴趣如何？",
    promptEn:
      "How interested are you in leading people, scheduling, or taking charge of a team/site?",
    options: [
      opt("a", "暂时不想带人", {
        kind: "work-style-sub",
        subKey: "leadershipResponsibility",
        level: 0,
      }),
      opt("b", "可以协助负责人", {
        kind: "work-style-sub",
        subKey: "leadershipResponsibility",
        level: 1,
      }),
      opt("c", "愿意逐步承担管理责任", {
        kind: "work-style-sub",
        subKey: "leadershipResponsibility",
        level: 2,
      }),
      opt("d", "不确定", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-p10",
    section: "work-preferences",
    promptZh: "在**不是**夜班/轮班的前提下，周末或晚上工作对你来说？",
    promptEn:
      "Aside from night or rotating shifts, how do you feel about weekend or evening work?",
    options: [
      opt("a", "尽量只要常规工作日白天", {
        kind: "ordinal-soft",
        dimension: "shiftScheduleTolerance",
        level: 0,
      }),
      opt("b", "偶尔周末或晚上可以", {
        kind: "ordinal-soft",
        dimension: "shiftScheduleTolerance",
        level: 1,
      }),
      opt("c", "经常周末或晚上也可以", {
        kind: "ordinal-soft",
        dimension: "shiftScheduleTolerance",
        level: 2,
      }),
      opt("d", "看安排，保持灵活", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i01",
    section: "interests",
    promptZh: "下面哪种工作日更吸引你？",
    promptEn: "Which kind of workday appeals to you more?",
    options: [
      opt("a", "用工具在现场安装、维修或加工（如水电暖通、焊接相关任务）", {
        kind: "interest-family",
        family: "skilled-trades",
        polarity: "positive",
      }),
      opt("b", "巡检楼宇设备、机房与设施报警并做运行记录", {
        kind: "interest-family",
        family: "building-operations-facilities",
        polarity: "positive",
      }),
      opt("c", "在工厂流水线装配产品或操作生产设备", {
        kind: "interest-family",
        family: "manufacturing-production",
        polarity: "positive",
      }),
      opt("d", "说不清，几种都可能", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i02",
    section: "interests",
    promptZh: "如果工作常要帮助别人，你更想出现在哪种场景？",
    promptEn: "If work often means helping people, which setting appeals more?",
    options: [
      opt("a", "协助日常照护，或配合诊所/检验相关支持流程", {
        kind: "interest-family",
        family: "healthcare-support",
        polarity: "positive",
      }),
      opt("b", "协助孩子学习，或支持社区成员处理生活事务", {
        kind: "interest-family",
        family: "education-community-services",
        polarity: "positive",
      }),
      opt("c", "在餐厅厨房备餐，或在酒店为客人办理入住接待", {
        kind: "interest-family",
        family: "hospitality-food-services",
        polarity: "positive",
      }),
      opt("d", "暂时说不清", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i03",
    section: "interests",
    promptZh: "下面哪类任务更让你有兴趣动手？",
    promptEn: "Which of these tasks interests you more?",
    options: [
      opt("a", "驾驶车辆完成货运或城际运送", {
        kind: "interest-family",
        family: "transportation-logistics",
        polarity: "positive",
      }),
      opt("b", "在仓库分拣、打包、装卸并处理出入库", {
        kind: "interest-family",
        family: "transportation-logistics",
        polarity: "positive",
      }),
      opt("c", "在市政、学校等机构场地做维护或后勤巡查", {
        kind: "interest-family",
        family: "public-sector-institutional",
        polarity: "positive",
      }),
      opt("d", "都可以了解一下", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i04",
    section: "interests",
    promptZh: "面对信息和规则时，你更想做哪类事？",
    promptEn: "When working with information and rules, what appeals more?",
    options: [
      opt("a", "用电脑写程序、查数据或做图表分析", {
        kind: "interest-family",
        family: "technology",
        polarity: "positive",
      }),
      opt("b", "整理日程、文件流转和办公室日常协调", {
        kind: "interest-family",
        family: "office-administration",
        polarity: "positive",
      }),
      opt("c", "按标准检查产品或工序是否合格并做记录", {
        kind: "interest-family",
        family: "manufacturing-production",
        polarity: "positive",
      }),
      opt("d", "不确定", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i05",
    section: "interests",
    promptZh: "和“外部的人”打交道时，你更想承担哪类角色？",
    promptEn:
      "When dealing with people outside your immediate team, which role appeals more?",
    options: [
      opt("a", "通过电话或在线聊天处理咨询与投诉", {
        kind: "interest-family",
        family: "sales-customer-service",
        polarity: "positive",
      }),
      opt("b", "在门店介绍商品并促成购买", {
        kind: "interest-family",
        family: "sales-customer-service",
        polarity: "positive",
      }),
      opt("c", "为个人客户提供一对一服务，安排预约并跟进需求", {
        kind: "interest-family",
        family: "self-employment-friendly",
        polarity: "positive",
      }),
      opt("d", "不确定，想先了解具体工作内容", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i06",
    section: "interests",
    promptZh: "下面哪种“动手解决问题”的方式更吸引你？",
    promptEn: "Which way of solving problems hands-on appeals more?",
    options: [
      opt("a", "完成现场技工类任务（切割、安装、调试工具设备）", {
        kind: "interest-family",
        family: "skilled-trades",
        polarity: "positive",
      }),
      opt("b", "处理公寓或物业里的报修与小修", {
        kind: "interest-family",
        family: "building-operations-facilities",
        polarity: "positive",
      }),
      opt("c", "协助牙科/药房/实验室等医疗支持环节（非医生执业）", {
        kind: "interest-family",
        family: "healthcare-support",
        polarity: "positive",
      }),
      opt("d", "说不清", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i07",
    section: "interests",
    promptZh: "你更想把一周的主要精力放在哪类成果上？",
    promptEn: "What kind of weekly outcomes appeal more?",
    options: [
      opt("a", "搭好可用的软件功能，或理顺网络/系统问题", {
        kind: "interest-family",
        family: "technology",
        polarity: "positive",
      }),
      opt("b", "帮学生跟上课堂，或组织社区活动支持", {
        kind: "interest-family",
        family: "education-community-services",
        polarity: "positive",
      }),
      opt("c", "维护场所秩序与安全巡查（门岗、巡视、出入管理）", {
        kind: "interest-family",
        family: "public-sector-institutional",
        polarity: "positive",
      }),
      opt("d", "还没想好", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i08",
    section: "interests",
    promptZh: "如果要选一个“练得起来的本事”，你更靠近？",
    promptEn:
      "If you were building a practical skill, which direction feels closer?",
    options: [
      opt("a", "沿着技工手艺把现场活越做越稳", {
        kind: "interest-family",
        family: "skilled-trades",
        polarity: "positive",
      }),
      opt("b", "在仓储现场安排货位、节奏并协调同事接手", {
        kind: "interest-family",
        family: "transportation-logistics",
        polarity: "positive",
      }),
      opt("c", "把发票、流水和对账做清楚", {
        kind: "interest-family",
        family: "office-administration",
        polarity: "positive",
      }),
      opt("d", "都可以再看看", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i09",
    section: "interests",
    promptZh: "下面哪种日常节奏更合你心意？",
    promptEn: "Which daily rhythm feels more like you?",
    options: [
      opt("a", "一个个解决同事的电脑或账号问题", {
        kind: "interest-family",
        family: "technology",
        polarity: "positive",
      }),
      opt("b", "在高温厨房按单出餐或备料", {
        kind: "interest-family",
        family: "hospitality-food-services",
        polarity: "positive",
      }),
      opt("c", "按预约表独立带训练或类似一对一服务", {
        kind: "interest-family",
        family: "self-employment-friendly",
        polarity: "positive",
      }),
      opt("d", "暂时没有明确偏好", { kind: "neutral" }),
    ],
  },
  {
    id: "v2-i10",
    section: "interests",
    promptZh: "最后看工作落点：你更想人在哪里、事偏什么？",
    promptEn:
      "Where would you rather be grounded, doing what kind of work?",
    options: [
      opt("a", "在医疗相关环境做支持（行政、标本流转协助等，非医师）", {
        kind: "interest-family",
        family: "healthcare-support",
        polarity: "positive",
      }),
      opt("b", "在办公室做前台、项目协调或行政枢纽", {
        kind: "interest-family",
        family: "office-administration",
        polarity: "positive",
      }),
      opt("c", "在商场/写字楼做清洁巡查与设施后勤", {
        kind: "interest-family",
        family: "building-operations-facilities",
        polarity: "positive",
      }),
      opt("d", "保持开放", { kind: "neutral" }),
    ],
  },
] as const satisfies readonly QuestionV2[];

export type QuestionBankV2 = typeof QUESTION_BANK_V2;

/** Deterministic lookup map keyed by QuestionIdV2. */
export const QUESTION_BANK_BY_ID_V2: {
  readonly [K in QuestionIdV2]: Extract<(typeof QUESTION_BANK_V2)[number], { id: K }>;
} = Object.fromEntries(
  QUESTION_BANK_V2.map((q) => [q.id, q]),
) as {
  readonly [K in QuestionIdV2]: Extract<(typeof QUESTION_BANK_V2)[number], { id: K }>;
};

export function getQuestionV2(id: QuestionIdV2): QuestionV2 {
  return QUESTION_BANK_BY_ID_V2[id];
}

export function getAnswerOptionV2(
  questionId: QuestionIdV2,
  optionId: (typeof OPTION_IDS_V2)[number],
): AnswerOptionV2 {
  const question = getQuestionV2(questionId);
  const found = question.options.find((o) => o.id === optionId);
  if (!found) {
    throw new Error(`Option ${optionId} not found on ${questionId}`);
  }
  return found;
}

/** Structural bank checks (IDs/options only — not scoring). */
export function assertQuestionBankStructureV2(): void {
  if (QUESTION_BANK_V2.length !== QUESTION_IDS_V2.length) {
    throw new Error("QUESTION_BANK_V2 length mismatch");
  }
  const seen = new Set<string>();
  let optionCount = 0;
  let hardFilterCount = 0;
  for (const q of QUESTION_BANK_V2) {
    if (seen.has(q.id)) throw new Error(`Duplicate question id ${q.id}`);
    seen.add(q.id);
    if (q.options.length !== 4) {
      throw new Error(`${q.id} must have exactly 4 options`);
    }
    const optionIds = q.options.map((o) => o.id);
    if (optionIds.join(",") !== "a,b,c,d") {
      throw new Error(`${q.id} options must be a,b,c,d in order`);
    }
    optionCount += q.options.length;
    for (const o of q.options) {
      if (o.signal.kind === "hard-constraint") {
        hardFilterCount += 1;
        if (
          !(
            (q.id === "v2-c01" &&
              o.id === "a" &&
              o.signal.constraint === "rejectsNightOrRotating") ||
            (q.id === "v2-c02" &&
              o.id === "a" &&
              o.signal.constraint === "rejectsHeavyPhysical")
          )
        ) {
          throw new Error(`Unexpected hard-filter on ${q.id}(${o.id})`);
        }
      }
      if (
        q.section === "interests" &&
        o.id === "d" &&
        o.signal.kind !== "neutral"
      ) {
        throw new Error(`${q.id}(d) must be neutral with no family mapping`);
      }
    }
  }
  for (const id of QUESTION_IDS_V2) {
    if (!seen.has(id)) throw new Error(`Missing question ${id}`);
  }
  if (optionCount !== 104) {
    throw new Error(`Expected 104 options, got ${optionCount}`);
  }
  if (hardFilterCount !== 2) {
    throw new Error(`Expected exactly 2 hard-filter options, got ${hardFilterCount}`);
  }
}

type AssertLen<T extends readonly unknown[], N extends number> =
  T["length"] extends N ? true : never;

const _assertBankLen: AssertLen<typeof QUESTION_BANK_V2, 26> = true;
void _assertBankLen;
