import type { Career, Level, StudyTime } from "./career-data";

export interface CareerProfileTag {
  label: string;
  value: string;
}

const PHYSICAL_LABELS: Record<Level, string> = {
  1: "低体力（偏久坐）",
  2: "轻度活动",
  3: "中等强度",
  4: "较高强度",
  5: "高强度",
};

const NIGHT_SHIFT_LABELS: Record<Level, string> = {
  1: "基本无夜班",
  2: "极少夜班",
  3: "偶尔夜班/轮班",
  4: "经常轮班",
  5: "夜班普遍",
};

const ENGLISH_LABELS: Record<Level, string> = {
  1: "基础英语",
  2: "一般英语",
  3: "中等英语",
  4: "较好英语",
  5: "流利英语",
};

const STUDY_TIME_LABELS: Record<StudyTime, string> = {
  short: "3 个月以内",
  medium: "3 个月–2 年",
  long: "2 年以上",
};

const INCOME_LABELS: Record<Level, string> = {
  1: "收入上限偏低",
  2: "基本收入",
  3: "中等收入潜力",
  4: "较高收入潜力",
  5: "高收入潜力",
};

const STABILITY_LABELS: Record<Level, string> = {
  1: "稳定性较低",
  2: "稳定性一般",
  3: "比较稳定",
  4: "较稳定",
  5: "非常稳定",
};

/** 免费区注意事项一行摘要 */
export function getWarningTeaser(warningZh: string): string {
  const firstSentence = warningZh.split(/[。！？]/)[0]?.trim();
  if (!firstSentence) {
    return "解锁高级报告查看完整风险提示";
  }

  if (firstSentence.length <= 28) {
    return `${firstSentence}。解锁后查看完整说明。`;
  }

  return `${firstSentence.slice(0, 26)}… 解锁后查看完整说明。`;
}

export function getCareerProfileTags(career: Career): CareerProfileTag[] {
  return [
    { label: "体力要求", value: PHYSICAL_LABELS[career.physicalLevel] },
    { label: "夜班/轮班", value: NIGHT_SHIFT_LABELS[career.nightShiftLevel] },
    { label: "英语要求", value: ENGLISH_LABELS[career.englishLevel] },
    { label: "学习投入", value: STUDY_TIME_LABELS[career.studyTime] },
    { label: "收入潜力", value: INCOME_LABELS[career.incomePotential] },
    { label: "工作稳定性", value: STABILITY_LABELS[career.stability] },
  ];
}
