import type { CareerCategory, Level, StudyTime, WorkStyle } from "./career-data";
import type { UserAnswers } from "./recommend-careers";

export type QuestionKey =
  | "physical"
  | "nightShift"
  | "english"
  | "studyTime"
  | "workStyle"
  | "income"
  | "stability"
  | "categoryPrimary"
  | "categorySecondary"
  | "careerGoal";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface Question {
  id: QuestionKey;
  title: string;
  subtitle?: string;
  options: QuestionOption[];
}

export const CATEGORY_LABELS: Record<CareerCategory, string> = {
  "skilled-trades": "技工与证照",
  facilities: "设施运维",
  transportation: "运输驾驶",
  technology: "科技与数据",
  healthcare: "医疗照护",
  security: "安保",
  logistics: "仓储物流",
  "office-construction": "工程协调与估算",
  hospitality: "餐饮酒店",
  education: "教育幼教",
  "sales-service": "销售与客户服务",
  creative: "创意设计",
};

const CATEGORY_OPTIONS: QuestionOption[] = (
  Object.entries(CATEGORY_LABELS) as [CareerCategory, string][]
).map(([id, label]) => ({ id, label }));

export const QUESTIONS: Question[] = [
  {
    id: "physical",
    title: "你能接受多大强度的体力工作？",
    subtitle: "包括长时间站立、搬运、户外作业等",
    options: [
      { id: "1", label: "尽量久坐办公", description: "偏好室内、低体力消耗" },
      { id: "2", label: "偶尔走动即可", description: "轻度活动可以接受" },
      { id: "3", label: "中等强度", description: "经常走动或部分体力活" },
      { id: "4", label: "较高强度", description: "较多体力投入" },
      { id: "5", label: "高强度也可以", description: "完全不介意体力工作" },
    ],
  },
  {
    id: "nightShift",
    title: "你能接受夜班或倒班吗？",
    subtitle: "部分加拿大岗位需要轮班或夜间工作",
    options: [
      { id: "1", label: "完全不接受", description: "只考虑白天固定作息" },
      { id: "2", label: "极少可以", description: "偶尔加班能接受" },
      { id: "3", label: "偶尔夜班", description: "每月几次可以接受" },
      { id: "4", label: "经常轮班", description: "轮班制问题不大" },
      { id: "5", label: "完全没问题", description: "夜班或倒班都可以" },
    ],
  },
  {
    id: "english",
    title: "你的英语水平如何？",
    subtitle: "诚实评估有助于匹配更合适的方向",
    options: [
      { id: "1", label: "基础水平", description: "日常简单交流" },
      { id: "2", label: "一般水平", description: "能应对基本工作场景" },
      { id: "3", label: "中等水平", description: "可完成大部分工作任务" },
      { id: "4", label: "较好水平", description: "能流利沟通与写作" },
      { id: "5", label: "接近母语", description: "商务或专业场合无障碍" },
    ],
  },
  {
    id: "studyTime",
    title: "你愿意为入行投入多长时间学习？",
    subtitle: "包括课程、考证或职业培训",
    options: [
      { id: "short", label: "3 个月以内", description: "希望尽快上岗" },
      { id: "medium", label: "3 个月到 2 年", description: "愿意中期投入" },
      { id: "long", label: "2 年以上", description: "可以接受长期学习" },
    ],
  },
  {
    id: "workStyle",
    title: "你更喜欢哪种工作方式？",
    options: [
      { id: "independent", label: "独立工作", description: "自主安排、少被打扰" },
      { id: "team", label: "团队协作", description: "与同事密切配合" },
      { id: "technical", label: "动手技术", description: "设备维修、现场操作" },
      { id: "structured", label: "流程规范", description: "按标准流程执行" },
      { id: "service", label: "服务他人", description: "直接帮助客户或患者" },
    ],
  },
  {
    id: "income",
    title: "收入对你有多重要？",
    options: [
      { id: "1", label: "不太重要", description: "更看重其他因素" },
      { id: "2", label: "略微重要", description: "有基本收入即可" },
      { id: "3", label: "比较重要", description: "希望收入稳步提升" },
      { id: "4", label: "很重要", description: "高收入是主要目标之一" },
      { id: "5", label: "非常重要", description: "收入是最优先考虑" },
    ],
  },
  {
    id: "stability",
    title: "工作稳定性对你有多重要？",
    options: [
      { id: "1", label: "不太重要", description: "愿意尝试变化较大的机会" },
      { id: "2", label: "略微重要", description: "能接受一定波动" },
      { id: "3", label: "比较重要", description: "希望工作相对稳定" },
      { id: "4", label: "很重要", description: "偏好长期稳定岗位" },
      { id: "5", label: "非常重要", description: "稳定性是首要考虑" },
    ],
  },
  {
    id: "categoryPrimary",
    title: "你最感兴趣的职业领域是？",
    subtitle: "选择最吸引你的方向",
    options: CATEGORY_OPTIONS,
  },
  {
    id: "categorySecondary",
    title: "你还有第二个感兴趣的领域吗？",
    subtitle: "可选，帮助扩大匹配范围",
    options: [{ id: "none", label: "没有第二个偏好", description: "只关注上一题的选择" }, ...CATEGORY_OPTIONS],
  },
  {
    id: "careerGoal",
    title: "你的长期职业目标更接近？",
    subtitle: "用于进一步优化推荐结果",
    options: [
      { id: "skilled-trades", label: "成为持证技工", description: "电工、暖通、焊接等" },
      { id: "facilities", label: "从事设施运维", description: "楼宇、学校、医院后勤" },
      { id: "transportation", label: "从事运输驾驶", description: "卡车司机等" },
      { id: "technology", label: "转向科技或数据", description: "软件开发、数据分析" },
      { id: "healthcare", label: "从事医疗照护", description: "PSW 等照护岗位" },
      { id: "logistics", label: "从事仓储物流", description: "仓库管理与运营" },
      { id: "office-construction", label: "从事工程协调或估算", description: "项目协调、造价估算" },
      { id: "hospitality", label: "从事餐饮烹饪", description: "餐厅、中央厨房等" },
      { id: "education", label: "从事教育幼教", description: "幼儿园、daycare 等" },
      { id: "sales-service", label: "从事销售或客服", description: "房产经纪、客服等" },
      { id: "creative", label: "从事创意设计", description: "平面设计、视觉设计等" },
      { id: "security", label: "先从安保岗位入手", description: "入行快、作为过渡" },
    ],
  },
];

function toLevel(value: string): Level {
  return Number(value) as Level;
}

function collectCategories(
  answers: Partial<Record<QuestionKey, string>>,
): CareerCategory[] {
  const categories: CareerCategory[] = [];

  const addCategory = (value?: string) => {
    if (!value || value === "none") {
      return;
    }
    if (!categories.includes(value as CareerCategory)) {
      categories.push(value as CareerCategory);
    }
  };

  addCategory(answers.categoryPrimary);
  addCategory(answers.categorySecondary);
  addCategory(answers.careerGoal);

  return categories;
}

/**
 * 将 10 道题的选项答案转换为 recommendCareers() 所需的 UserAnswers。
 */
export function buildUserAnswers(
  answers: Partial<Record<QuestionKey, string>>,
): UserAnswers {
  return {
    maxPhysicalLevel: toLevel(answers.physical!),
    maxNightShiftLevel: toLevel(answers.nightShift!),
    englishLevel: toLevel(answers.english!),
    availableStudyTime: answers.studyTime as StudyTime,
    preferredWorkStyle: answers.workStyle as WorkStyle,
    incomePriority: toLevel(answers.income!),
    stabilityPriority: toLevel(answers.stability!),
    preferredCategories: collectCategories(answers),
  };
}
