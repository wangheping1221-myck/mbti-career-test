import {
  CAREERS,
  CATEGORY_LABELS_ZH,
  DAYTIME_CAREER_BOOST_IDS,
  EXTREME_LOW_PHYSICAL_REJECT_IDS,
  FACILITIES_STABLE_COMBO_BONUSES,
  FIELD_TRADE_NO_TECH_BOOST_IDS,
  HIGH_ENGLISH_CAREER_IDS,
  HOSPITALITY_COOK_COMBO_BONUSES,
  HOSPITALITY_FACILITIES_DEMOTE_PENALTIES,
  HOSPITALITY_OFFICE_DEMOTE_PENALTIES,
  HOSPITALITY_SERVICE_DEMOTE_PENALTIES,
  HOSPITALITY_STABILITY_BOOST_SKIP_IDS,
  INDUSTRIAL_FIELD_MISMATCH_IDS,
  LOW_PHYSICAL_HARD_BLOCK_IDS,
  LOW_PHYSICAL_MATCH_PERCENT_CAPS,
  LOW_PHYSICAL_REJECT_IDS,
  LOW_STABILITY_FIT_FOR_SEEKERS_IDS,
  MILD_NIGHT_SHIFT_REJECT_IDS,
  NIGHT_SHIFT_REJECT_MATCH_PERCENT_CAPS,
  OFFICE_TECH_DATA_COMBO_BONUSES,
  OFFICE_TECH_FACILITIES_DEMOTE_PENALTIES,
  OFFICE_TECH_STABILITY_BOOST_SKIP_IDS,
  STABILITY_BOOST_CAREER_IDS,
  STRICT_NIGHT_SHIFT_REJECT_IDS,
  STRICT_LOW_ENGLISH_BLOCK_IDS,
  STUDY_TIME_ORDER,
  TECHNICAL_INCOME_FACILITIES_DEMOTE_PENALTIES,
  TECHNICAL_INCOME_STABILITY_BOOST_SKIP_IDS,
  TECHNICAL_INCOME_TRADE_COMBO_BONUSES,
  TECHNICAL_TRADE_CAREER_IDS,
  type Career,
  type CareerCategory,
  type Level,
  type StudyTime,
  type WorkStyle,
} from "./career-data";

export interface UserAnswers {
  maxPhysicalLevel: Level;
  maxNightShiftLevel: Level;
  englishLevel: Level;
  availableStudyTime: StudyTime;
  preferredWorkStyle: WorkStyle;
  incomePriority: Level;
  stabilityPriority: Level;
  preferredCategories?: CareerCategory[];
}

export interface CareerRecommendation {
  career: Career;
  score: number;
  matchPercent: number;
  reasons: string[];
}

const WEIGHTS = {
  physical: 18,
  nightShift: 22,
  english: 18,
  studyTime: 12,
  workStyle: 14,
  income: 8,
  stability: 10,
  category: 8,
} as const;

const BONUS_WEIGHTS = {
  stabilityBoost: 18,
  technicalBoost: 10,
  daytimeBoost: 10,
  profileBoost: 14,
  facilitiesStableCore: 18,
  facilitiesStableAlternate: 14,
  warehouseStableBoost: 12,
} as const;

const PENALTY_WEIGHTS = {
  extremePhysical: 26,
  physical: 20,
  strictNight: 18,
  mildNight: 4,
  englishOffice: 16,
  estimatorModerateEnglish: 6,
  stabilityMismatch: 16,
  welderBlock: 42,
  hvacBlock: 44,
  electricianBlock: 42,
  autoMechanicBlock: 44,
  millwrightBlock: 46,
  plumberBlock: 38,
  truckDriverBlock: 36,
  industrialFieldMismatch: 36,
  strictEnglishBlock: 32,
  securityGuardBlock: 58,
} as const;

const STUDY_TIME_LABELS: Record<StudyTime, string> = {
  short: "3 个月以内",
  medium: "3 个月到 2 年",
  long: "2 年以上",
};

const MATCH_PERCENT_RANGES: [number, number][] = [
  [82, 92],
  [75, 85],
  [68, 78],
  [62, 72],
  [55, 65],
];

const POWER_ENGINEER = CAREERS.find((career) => career.id === "power-engineer")!;

const CAREER_SIGNATURE_REASONS: Record<string, string> = {
  "power-engineer":
    "Power Engineer 在加拿大是证照型岗位，负责锅炉和动力设备运行，收入不错但倒班普遍。",
  "building-operator":
    "楼宇运行维护员主要在公寓、商场做设备巡检，是华人常考虑的设施运维入门方向之一。",
  "hvac-technician":
    "暖通技师在加拿大全年都有需求，但夏天冬天都要跑现场，体力消耗不能低估。",
  electrician:
    "电工走学徒加考证路线，周期长，但拿牌后收入和就业面在技工里很有竞争力。",
  plumber:
    "水管工缺口大、收入好，但钻墙搬运多，不适合只想轻体力工作的人。",
  "instrumentation-technician":
    "仪表控制技师偏工业自动化，负责现场仪表、控制系统和设备诊断，在加拿大工厂和能源行业有稳定需求。",
  millwright:
    "工业机械维修技师在工厂车间作业，体力消耗大、环境嘈杂，不适合低体力、求稳定的求职者。",
  welder:
    "焊工上手相对快，但高温烟尘和高强度现场作业是这行的常态。",
  "truck-driver":
    "卡车司机考证后入行较快，不过作息不规律、久坐久驾是长期挑战。",
  "auto-mechanic":
    "汽车维修技师要在车间长时间站立、弯腰搬件，对体力要求不低，不适合只想轻体力工作的人。",
  "government-maintenance-worker":
    "政府设施维护员走公共部门招聘，节奏慢一些，但稳定性和福利通常更好。",
  "school-custodian":
    "学校清洁与设施维护英语门槛相对低，是很多新移民会先考虑的稳妥选项。",
  "hospital-facilities-technician":
    "医院设施岗属于机构技术维护，稳定感强，部分岗位可能有轮班，申请前要看清班表。",
  "data-analyst":
    "数据分析师以办公室工作为主，但简历竞争强，英语和项目作品都很关键。",
  "software-developer":
    "软件开发收入上限高，几乎全程英文沟通，适合技术和语言都在提升的人。",
  "project-coordinator":
    "项目协调员要在工地和办公室之间跑，邮件会议多，英语组织能力很重要。",
  estimator:
    "造价估算员要读英文图纸、核对报价、和客户沟通，英语和细心程度缺一不可。",
  psw: "PSW 培训后入行路径明确，但扶抱老人和轮班是日常工作的一部分。",
  "security-guard":
    "保安培训短、上岗快，但夜班多、收入上限低，更适合短期过渡，不适合作为主要职业路线。",
  "warehouse-supervisor":
    "仓库主管偏现场管理，需要协调团队和排班，部分仓库会有早晚班，申请前建议问清楚。",
  bookkeeper:
    "簿记员以办公室记账为主，适合想先进稳定文职、英语中等的人，不少华人会从小企业簿记起步。",
  "early-childhood-educator":
    "幼教老师在 daycare 和幼儿园需求稳定，但需完成 ECE 课程并考取省级注册。",
  "customer-service-representative":
    "客服代表入行相对快，是积累本地办公室经验和英语沟通的常见过渡岗位。",
  "local-delivery-driver":
    "本地配送比长途卡车更偏短途路线，入行较快，但旺季和平台岗位收入会有波动。",
  "commercial-cook":
    "商业厨师可走餐饮技工路线，但厨房环境辛苦、晚班多，适合能吃苦的人。",
  "real-estate-agent":
    "房产经纪收入上限高，但依赖成交和英语营销能力，前期通常不稳定。",
  "graphic-designer":
    "平面设计师以作品集为核心，可进公司也可接单，适合有审美和软件基础的人。",
  "personal-trainer":
    "健身教练需要自身体能和证照，客户积累决定收入，适合热爱健身的人。",
};

function rejectsNightShift(answers: UserAnswers): boolean {
  return answers.maxNightShiftLevel <= 2;
}

function prefersLowPhysical(answers: UserAnswers): boolean {
  return answers.maxPhysicalLevel <= 2;
}

function hasLowEnglish(answers: UserAnswers): boolean {
  return answers.englishLevel <= 2;
}

function hasModerateEnglish(answers: UserAnswers): boolean {
  return answers.englishLevel === 2;
}

function hasGoodEnglish(answers: UserAnswers): boolean {
  return answers.englishLevel >= 4;
}

function prefersOfficeTechDataWork(answers: UserAnswers): boolean {
  const categories = answers.preferredCategories ?? [];

  return (
    categories.includes("technology") ||
    categories.includes("office-construction") ||
    categories.includes("creative") ||
    answers.preferredWorkStyle === "independent"
  );
}

function prefersTechDataDirection(answers: UserAnswers): boolean {
  if (answers.preferredCategories?.includes("technology")) {
    return true;
  }

  return matchesOfficeTechDataProfile(answers);
}

/** 电脑/数据/办公室 + 英语较好 + 高收入 + 长期学习 */
function matchesOfficeTechDataProfile(answers: UserAnswers): boolean {
  return (
    hasGoodEnglish(answers) &&
    prefersOfficeTechDataWork(answers) &&
    answers.incomePriority >= 4 &&
    answers.availableStudyTime === "long"
  );
}

function valuesStability(answers: UserAnswers): boolean {
  return answers.stabilityPriority >= 4;
}

function prefersTechnicalWork(answers: UserAnswers): boolean {
  return answers.preferredWorkStyle === "technical";
}

function prefersFacilities(answers: UserAnswers): boolean {
  return answers.preferredCategories?.includes("facilities") ?? false;
}

function prefersHospitality(answers: UserAnswers): boolean {
  return answers.preferredCategories?.includes("hospitality") ?? false;
}

/** 餐饮酒店 + 能接受中等以上体力（含 kitchen helper 快速入行） */
function matchesHospitalityCookProfile(answers: UserAnswers): boolean {
  return prefersHospitality(answers) && answers.maxPhysicalLevel >= 3;
}

function isWelderCandidate(answers: UserAnswers): boolean {
  return (
    answers.maxPhysicalLevel >= 4 &&
    prefersTechnicalWork(answers) &&
    answers.incomePriority >= 4
  );
}

function isHvacCandidate(answers: UserAnswers): boolean {
  return (
    answers.maxPhysicalLevel >= 3 &&
    prefersTechnicalWork(answers) &&
    answers.incomePriority >= 4
  );
}

function isElectricianCandidate(answers: UserAnswers): boolean {
  return (
    answers.maxPhysicalLevel >= 3 &&
    prefersTechnicalWork(answers) &&
    answers.incomePriority >= 4 &&
    answers.availableStudyTime !== "short"
  );
}

function matchesFacilitiesStableProfile(answers: UserAnswers): boolean {
  return (
    valuesStability(answers) &&
    rejectsNightShift(answers) &&
    prefersLowPhysical(answers) &&
    prefersFacilities(answers) &&
    answers.availableStudyTime !== "short"
  );
}

/** 技术动手 + 收入优先 + 愿意学证书/技术的技工导向画像 */
function matchesTechnicalIncomeTradeProfile(answers: UserAnswers): boolean {
  return (
    answers.maxPhysicalLevel >= 3 &&
    prefersTechnicalWork(answers) &&
    answers.incomePriority >= 4 &&
    answers.availableStudyTime !== "short"
  );
}

function isSecurityGuardCandidate(answers: UserAnswers): boolean {
  return (
    answers.availableStudyTime === "short" &&
    answers.maxNightShiftLevel >= 3 &&
    answers.incomePriority <= 2 &&
    answers.stabilityPriority <= 3 &&
    !prefersFacilities(answers)
  );
}

function isMillwrightCandidate(answers: UserAnswers): boolean {
  return (
    answers.maxPhysicalLevel >= 4 &&
    prefersTechnicalWork(answers) &&
    answers.incomePriority >= 4 &&
    answers.availableStudyTime !== "short"
  );
}

function matchesStableLowPhysicalDaytimeProfile(answers: UserAnswers): boolean {
  return (
    valuesStability(answers) &&
    rejectsNightShift(answers) &&
    prefersLowPhysical(answers)
  );
}

function matchesGovernmentMaintenanceProfile(answers: UserAnswers): boolean {
  return matchesFacilitiesStableProfile(answers);
}

function matchesBuildingOperatorProfile(answers: UserAnswers): boolean {
  if (matchesFacilitiesStableProfile(answers)) {
    return true;
  }

  return (
    valuesStability(answers) &&
    answers.maxPhysicalLevel >= 2 &&
    answers.maxPhysicalLevel <= 3 &&
    (answers.availableStudyTime === "medium" ||
      answers.availableStudyTime === "long" ||
      prefersTechnicalWork(answers))
  );
}

function scorePhysical(career: Career, answers: UserAnswers): number {
  let points: number;

  if (career.physicalLevel <= answers.maxPhysicalLevel) {
    const fit =
      1 -
      ((career.physicalLevel - 1) / Math.max(answers.maxPhysicalLevel, 1)) *
        0.15;
    points = Math.round(WEIGHTS.physical * Math.min(1, fit));
  } else {
    const gap = career.physicalLevel - answers.maxPhysicalLevel;
    points = Math.max(0, WEIGHTS.physical - gap * 10);
  }

  if (prefersLowPhysical(answers) && LOW_PHYSICAL_REJECT_IDS.has(career.id)) {
    if (EXTREME_LOW_PHYSICAL_REJECT_IDS.has(career.id)) {
      points = Math.max(0, points - PENALTY_WEIGHTS.extremePhysical);
    } else {
      points = Math.max(0, points - PENALTY_WEIGHTS.physical);
    }
  }

  if (
    matchesOfficeTechDataProfile(answers) &&
    career.id === "warehouse-supervisor" &&
    prefersLowPhysical(answers)
  ) {
    points = Math.max(points, Math.round(WEIGHTS.physical * 0.55));
  }

  return points;
}

function scoreNightShift(career: Career, answers: UserAnswers): number {
  let points: number;

  if (career.nightShiftLevel <= answers.maxNightShiftLevel) {
    points = WEIGHTS.nightShift;
  } else {
    const gap = career.nightShiftLevel - answers.maxNightShiftLevel;
    points = Math.max(0, WEIGHTS.nightShift - gap * 9);
  }

  if (rejectsNightShift(answers)) {
    if (STRICT_NIGHT_SHIFT_REJECT_IDS.has(career.id)) {
      points = Math.max(0, points - PENALTY_WEIGHTS.strictNight);
    } else if (MILD_NIGHT_SHIFT_REJECT_IDS.has(career.id)) {
      points = Math.max(0, points - PENALTY_WEIGHTS.mildNight);
    } else if (career.nightShiftLevel >= 4) {
      points = Math.min(points, 4);
    }
  }

  if (
    matchesTechnicalIncomeTradeProfile(answers) &&
    career.id === "power-engineer" &&
    answers.maxNightShiftLevel >= 3
  ) {
    points = Math.max(points, Math.round(WEIGHTS.nightShift * 0.72));
  }

  if (
    matchesOfficeTechDataProfile(answers) &&
    career.id === "warehouse-supervisor" &&
    rejectsNightShift(answers)
  ) {
    points = Math.max(points, Math.round(WEIGHTS.nightShift * 0.52));
  }

  return points;
}

function scoreEnglish(career: Career, answers: UserAnswers): number {
  let points: number;

  if (answers.englishLevel >= career.englishLevel) {
    points = WEIGHTS.english;
  } else {
    const gap = career.englishLevel - answers.englishLevel;
    points = Math.max(0, WEIGHTS.english - gap * 9);
  }

  if (hasLowEnglish(answers) && HIGH_ENGLISH_CAREER_IDS.has(career.id)) {
    if (career.id === "estimator" && hasModerateEnglish(answers)) {
      points = Math.max(0, points - PENALTY_WEIGHTS.estimatorModerateEnglish);
    } else {
      points = Math.max(0, points - PENALTY_WEIGHTS.englishOffice);
    }
  }

  if (
    matchesTechnicalIncomeTradeProfile(answers) &&
    career.id === "power-engineer" &&
    hasModerateEnglish(answers)
  ) {
    points = Math.max(points, Math.round(WEIGHTS.english * 0.78));
  }

  if (
    matchesTechnicalIncomeTradeProfile(answers) &&
    career.id === "instrumentation-technician" &&
    hasModerateEnglish(answers)
  ) {
    points = Math.max(points, Math.round(WEIGHTS.english * 0.82));
  }

  return points;
}

function scoreStrictEnglishBlock(career: Career, answers: UserAnswers): number {
  if (!hasLowEnglish(answers)) {
    return 0;
  }

  if (STRICT_LOW_ENGLISH_BLOCK_IDS.has(career.id)) {
    return -PENALTY_WEIGHTS.strictEnglishBlock;
  }

  return 0;
}

function scoreEstimatorStableBoost(career: Career, answers: UserAnswers): number {
  if (
    career.id !== "estimator" ||
    matchesFacilitiesStableProfile(answers) ||
    matchesOfficeTechDataProfile(answers)
  ) {
    return 0;
  }

  if (
    hasModerateEnglish(answers) &&
    valuesStability(answers) &&
    answers.availableStudyTime === "medium"
  ) {
    return 10;
  }

  return 0;
}

function scoreFacilitiesStableComboBoost(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesFacilitiesStableProfile(answers)) {
    return 0;
  }

  return FACILITIES_STABLE_COMBO_BONUSES[career.id] ?? 0;
}

/** 设施稳定画像下，非核心设施岗应降权 */
function scoreFacilitiesStableNonCoreDemote(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesFacilitiesStableProfile(answers)) {
    return 0;
  }

  const demotes: Partial<Record<string, number>> = {
    bookkeeper: 20,
    "early-childhood-educator": 18,
    "customer-service-representative": 16,
    "graphic-designer": 14,
  };

  const penalty = demotes[career.id];
  return penalty ? -penalty : 0;
}

function scoreHospitalityCookComboBoost(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesHospitalityCookProfile(answers)) {
    return 0;
  }

  const bonus = HOSPITALITY_COOK_COMBO_BONUSES[career.id] ?? 0;
  if (!bonus) {
    return 0;
  }

  // 希望尽快上岗时仍推荐厨师，但加成略低（prep cook / kitchen helper 路线）
  if (answers.availableStudyTime === "short") {
    return Math.round(bonus * 0.75);
  }

  return bonus;
}

function scoreHospitalityFacilitiesDemote(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesHospitalityCookProfile(answers)) {
    return 0;
  }

  const penalty = HOSPITALITY_FACILITIES_DEMOTE_PENALTIES[career.id];
  return penalty ? -penalty : 0;
}

function scoreHospitalityServiceDemote(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesHospitalityCookProfile(answers)) {
    return 0;
  }

  const penalty = HOSPITALITY_SERVICE_DEMOTE_PENALTIES[career.id];
  return penalty ? -penalty : 0;
}

function scoreHospitalityOfficeDemote(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesHospitalityCookProfile(answers)) {
    return 0;
  }

  const penalty = HOSPITALITY_OFFICE_DEMOTE_PENALTIES[career.id];
  return penalty ? -penalty : 0;
}

function scoreTechnicalIncomeTradeComboBoost(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesTechnicalIncomeTradeProfile(answers)) {
    return 0;
  }

  return TECHNICAL_INCOME_TRADE_COMBO_BONUSES[career.id] ?? 0;
}

function scoreTechnicalIncomeFacilitiesDemote(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesTechnicalIncomeTradeProfile(answers)) {
    return 0;
  }

  const penalty = TECHNICAL_INCOME_FACILITIES_DEMOTE_PENALTIES[career.id];
  return penalty ? -penalty : 0;
}

function scoreOfficeTechDataComboBoost(
  career: Career,
  answers: UserAnswers,
): number {
  if (!matchesOfficeTechDataProfile(answers)) {
    return 0;
  }

  return OFFICE_TECH_DATA_COMBO_BONUSES[career.id] ?? 0;
}

function scoreOfficeTechFacilitiesDemote(
  career: Career,
  answers: UserAnswers,
): number {
  if (!prefersTechDataDirection(answers)) {
    return 0;
  }

  const penalty = OFFICE_TECH_FACILITIES_DEMOTE_PENALTIES[career.id];
  return penalty ? -penalty : 0;
}

function scoreSecurityGuardBlock(career: Career, answers: UserAnswers): number {
  if (career.id !== "security-guard" || isSecurityGuardCandidate(answers)) {
    return 0;
  }

  let penalty = -PENALTY_WEIGHTS.securityGuardBlock;

  if (matchesFacilitiesStableProfile(answers)) {
    penalty -= 20;
  }

  if (rejectsNightShift(answers)) {
    penalty -= 12;
  }

  return penalty;
}

function resolveMatchPercentCap(
  careerId: string,
  answers: UserAnswers,
): number | null {
  const caps: number[] = [];

  if (
    prefersLowPhysical(answers) &&
    careerId in LOW_PHYSICAL_MATCH_PERCENT_CAPS
  ) {
    caps.push(LOW_PHYSICAL_MATCH_PERCENT_CAPS[careerId]);
  }

  if (
    rejectsNightShift(answers) &&
    careerId in NIGHT_SHIFT_REJECT_MATCH_PERCENT_CAPS
  ) {
    caps.push(NIGHT_SHIFT_REJECT_MATCH_PERCENT_CAPS[careerId]);
  }

  return caps.length > 0 ? Math.min(...caps) : null;
}

function scoreStudyTime(career: Career, answers: UserAnswers): number {
  const userCapacity = STUDY_TIME_ORDER[answers.availableStudyTime];
  const careerNeed = STUDY_TIME_ORDER[career.studyTime];

  if (userCapacity >= careerNeed) {
    return WEIGHTS.studyTime;
  }

  const gap = careerNeed - userCapacity;
  let points = Math.max(0, WEIGHTS.studyTime - gap * 8);

  if (
    matchesTechnicalIncomeTradeProfile(answers) &&
    career.id === "power-engineer" &&
    answers.availableStudyTime === "medium" &&
    career.studyTime === "long"
  ) {
    points = Math.max(points, Math.round(WEIGHTS.studyTime * 0.8));
  }

  if (
    matchesTechnicalIncomeTradeProfile(answers) &&
    career.id === "electrician" &&
    answers.availableStudyTime === "medium" &&
    career.studyTime === "long"
  ) {
    points = Math.max(points, Math.round(WEIGHTS.studyTime * 0.85));
  }

  return points;
}

function scoreWorkStyle(career: Career, answers: UserAnswers): number {
  if (
    (matchesFacilitiesStableProfile(answers) ||
      matchesStableLowPhysicalDaytimeProfile(answers)) &&
    INDUSTRIAL_FIELD_MISMATCH_IDS.has(career.id)
  ) {
    return 0;
  }

  if (prefersLowPhysical(answers) && LOW_PHYSICAL_HARD_BLOCK_IDS.has(career.id)) {
    return 0;
  }

  if (career.workStyle === answers.preferredWorkStyle) {
    return WEIGHTS.workStyle;
  }

  const relatedStyles: Partial<Record<WorkStyle, WorkStyle[]>> = {
    technical: ["structured", "independent"],
    independent: ["technical", "structured"],
    team: ["service", "structured"],
    structured: ["technical", "team"],
    service: ["team"],
  };

  if (relatedStyles[answers.preferredWorkStyle]?.includes(career.workStyle)) {
    return Math.round(WEIGHTS.workStyle * 0.55);
  }

  if (
    matchesOfficeTechDataProfile(answers) &&
    career.id === "warehouse-supervisor"
  ) {
    return Math.round(WEIGHTS.workStyle * 0.6);
  }

  return 0;
}

function scoreIncome(career: Career, answers: UserAnswers): number {
  const alignment =
    1 - Math.abs(career.incomePotential / 5 - answers.incomePriority / 5);
  return Math.round(WEIGHTS.income * alignment);
}

function scoreStability(career: Career, answers: UserAnswers): number {
  const alignment =
    1 - Math.abs(career.stability / 5 - answers.stabilityPriority / 5);
  return Math.round(WEIGHTS.stability * alignment);
}

function scoreCategory(career: Career, answers: UserAnswers): number {
  if (
    prefersLowPhysical(answers) &&
    LOW_PHYSICAL_HARD_BLOCK_IDS.has(career.id)
  ) {
    return 0;
  }

  if (!answers.preferredCategories?.length) {
    return Math.round(WEIGHTS.category * 0.5);
  }

  if (answers.preferredCategories.includes(career.category)) {
    return WEIGHTS.category;
  }

  if (
    matchesOfficeTechDataProfile(answers) &&
    career.id === "warehouse-supervisor"
  ) {
    return Math.round(WEIGHTS.category * 0.65);
  }

  return 0;
}

function scoreStabilityBoost(career: Career, answers: UserAnswers): number {
  if (!valuesStability(answers)) {
    return 0;
  }

  if (
    matchesTechnicalIncomeTradeProfile(answers) &&
    TECHNICAL_INCOME_STABILITY_BOOST_SKIP_IDS.has(career.id)
  ) {
    return 0;
  }

  if (
    matchesOfficeTechDataProfile(answers) &&
    OFFICE_TECH_STABILITY_BOOST_SKIP_IDS.has(career.id)
  ) {
    return 0;
  }

  if (
    matchesHospitalityCookProfile(answers) &&
    HOSPITALITY_STABILITY_BOOST_SKIP_IDS.has(career.id)
  ) {
    return 0;
  }

  if (STABILITY_BOOST_CAREER_IDS.has(career.id)) {
    return BONUS_WEIGHTS.stabilityBoost;
  }

  return 0;
}

function scoreStabilityMismatch(career: Career, answers: UserAnswers): number {
  if (!valuesStability(answers)) {
    return 0;
  }

  if (
    matchesTechnicalIncomeTradeProfile(answers) &&
    career.id in TECHNICAL_INCOME_TRADE_COMBO_BONUSES
  ) {
    return 0;
  }

  if (LOW_STABILITY_FIT_FOR_SEEKERS_IDS.has(career.id)) {
    return -PENALTY_WEIGHTS.stabilityMismatch;
  }

  return 0;
}

function scoreDaytimeBoost(career: Career, answers: UserAnswers): number {
  if (!rejectsNightShift(answers)) {
    return 0;
  }

  if (
    matchesOfficeTechDataProfile(answers) &&
    career.id in OFFICE_TECH_FACILITIES_DEMOTE_PENALTIES
  ) {
    return 0;
  }

  if (DAYTIME_CAREER_BOOST_IDS.has(career.id)) {
    return BONUS_WEIGHTS.daytimeBoost;
  }

  return 0;
}

function scoreTechnicalBoost(career: Career, answers: UserAnswers): number {
  if (!prefersTechnicalWork(answers)) {
    return 0;
  }

  if (prefersLowPhysical(answers) && FIELD_TRADE_NO_TECH_BOOST_IDS.has(career.id)) {
    return 0;
  }

  if (career.id === "hvac-technician" && !isHvacCandidate(answers)) {
    return 0;
  }

  if (career.id === "electrician" && !isElectricianCandidate(answers)) {
    return 0;
  }

  if (career.id === "millwright" && !isMillwrightCandidate(answers)) {
    return 0;
  }

  if (
    matchesFacilitiesStableProfile(answers) &&
    career.id === "instrumentation-technician"
  ) {
    return 0;
  }

  if (TECHNICAL_TRADE_CAREER_IDS.has(career.id)) {
    return BONUS_WEIGHTS.technicalBoost;
  }

  return 0;
}

function scoreProfileBoost(career: Career, answers: UserAnswers): number {
  if (
    matchesFacilitiesStableProfile(answers) ||
    matchesTechnicalIncomeTradeProfile(answers) ||
    matchesOfficeTechDataProfile(answers)
  ) {
    return 0;
  }

  if (
    career.id === "government-maintenance-worker" &&
    matchesGovernmentMaintenanceProfile(answers)
  ) {
    return BONUS_WEIGHTS.profileBoost + 4;
  }

  if (
    career.id === "school-custodian" &&
    matchesGovernmentMaintenanceProfile(answers)
  ) {
    return BONUS_WEIGHTS.profileBoost;
  }

  if (
    career.id === "building-operator" &&
    matchesBuildingOperatorProfile(answers)
  ) {
    return BONUS_WEIGHTS.profileBoost;
  }

  return 0;
}

function scoreIndustrialFieldMismatch(
  career: Career,
  answers: UserAnswers,
): number {
  if (!INDUSTRIAL_FIELD_MISMATCH_IDS.has(career.id)) {
    return 0;
  }

  if (matchesFacilitiesStableProfile(answers)) {
    return -PENALTY_WEIGHTS.industrialFieldMismatch;
  }

  if (matchesStableLowPhysicalDaytimeProfile(answers)) {
    return -Math.round(PENALTY_WEIGHTS.industrialFieldMismatch * 0.85);
  }

  if (
    prefersLowPhysical(answers) &&
    valuesStability(answers) &&
    rejectsNightShift(answers) &&
    career.id === "instrumentation-technician"
  ) {
    return -Math.round(PENALTY_WEIGHTS.industrialFieldMismatch * 0.75);
  }

  return 0;
}

function scoreAutoMechanicBlock(career: Career, answers: UserAnswers): number {
  if (career.id !== "auto-mechanic" || !prefersLowPhysical(answers)) {
    return 0;
  }

  return -PENALTY_WEIGHTS.autoMechanicBlock;
}

function scorePlumberBlock(career: Career, answers: UserAnswers): number {
  if (career.id !== "plumber" || !prefersLowPhysical(answers)) {
    return 0;
  }

  return -PENALTY_WEIGHTS.plumberBlock;
}

function scoreTruckDriverBlock(career: Career, answers: UserAnswers): number {
  if (!prefersLowPhysical(answers)) {
    return 0;
  }

  if (career.id === "truck-driver") {
    return -PENALTY_WEIGHTS.truckDriverBlock;
  }

  if (career.id === "local-delivery-driver") {
    return -Math.round(PENALTY_WEIGHTS.truckDriverBlock * 0.55);
  }

  return 0;
}

function scoreTradeBlockPenalties(career: Career, answers: UserAnswers): number {
  if (career.id === "welder" && !isWelderCandidate(answers)) {
    return -PENALTY_WEIGHTS.welderBlock;
  }

  if (career.id === "millwright" && !isMillwrightCandidate(answers)) {
    return -PENALTY_WEIGHTS.millwrightBlock;
  }

  if (career.id === "hvac-technician" && !isHvacCandidate(answers)) {
    return -PENALTY_WEIGHTS.hvacBlock;
  }

  if (career.id === "electrician" && !isElectricianCandidate(answers)) {
    return -PENALTY_WEIGHTS.electricianBlock;
  }

  return 0;
}

function buildPhysicalReason(career: Career, answers: UserAnswers): string | null {
  if (prefersLowPhysical(answers) && LOW_PHYSICAL_REJECT_IDS.has(career.id)) {
    return null;
  }

  if (career.physicalLevel <= 2 && prefersLowPhysical(answers)) {
    return `${career.titleZh}日常以室内或办公室环境为主，和你「尽量久坐、少体力活」的偏好比较合拍。`;
  }

  if (career.physicalLevel <= answers.maxPhysicalLevel) {
    return `${career.titleZh}的体力强度在你可接受范围内，不用一开始就挑战高强度现场岗。`;
  }

  return null;
}

function buildEnglishReason(career: Career, answers: UserAnswers): string | null {
  if (career.id === "estimator" && hasModerateEnglish(answers)) {
    return "估算员需要读英文图纸、报价单和材料清单，你英语一般可以先了解方向，但建议同步提升读写和数字敏感度。";
  }

  if (hasLowEnglish(answers) && HIGH_ENGLISH_CAREER_IDS.has(career.id)) {
    if (career.id === "estimator") {
      return null;
    }
    return null;
  }

  if (career.englishLevel <= 2 && hasLowEnglish(answers)) {
    return `不少${career.titleZh}岗位日常以简单英文指令和流程为主，对英语还在提升阶段的华人相对友好。`;
  }

  if (answers.englishLevel >= career.englishLevel) {
    if (HIGH_ENGLISH_CAREER_IDS.has(career.id)) {
      return `做${career.titleZh}需要较多英文沟通，以你目前的英语水平，入行后学习成本会可控一些。`;
    }
    return `该岗位对英语要求不算高，你现在的水平基本能应付日常工作场景。`;
  }

  return null;
}

function buildNightShiftReason(career: Career, answers: UserAnswers): string | null {
  if (rejectsNightShift(answers) && STRICT_NIGHT_SHIFT_REJECT_IDS.has(career.id)) {
    return null;
  }

  if (career.id === "hospital-facilities-technician" && rejectsNightShift(answers)) {
    return "医院设施维护岗整体偏机构稳定，但部分岗位可能有轮班，申请前务必看清班表和值班要求。";
  }

  if (
    career.id === "power-engineer" &&
    matchesTechnicalIncomeTradeProfile(answers)
  ) {
    return "动力工程师不少岗位需要轮班值守，更适合能接受锅炉、机房和设备运行环境的人；考证周期长，但收入和稳定性潜力都不错。";
  }

  if (rejectsNightShift(answers) && DAYTIME_CAREER_BOOST_IDS.has(career.id)) {
    return `${career.titleZh}以日班岗位为主，更符合你不接受夜班的作息要求。`;
  }

  if (!rejectsNightShift(answers) && career.nightShiftLevel <= answers.maxNightShiftLevel) {
    return `${career.titleZh}的排班节奏在你能接受的范围内，不用一开始就硬扛高频夜班。`;
  }

  if (rejectsNightShift(answers) && career.nightShiftLevel <= 2) {
    return `你不太接受夜班，${career.titleZh}比${POWER_ENGINEER.titleZh}更容易找到偏日班的岗位。`;
  }

  if (rejectsNightShift(answers) && MILD_NIGHT_SHIFT_REJECT_IDS.has(career.id)) {
    return `物业和医院都有白班岗，${career.titleZh}仍值得了解，但建议面试时直接问清楚班表。`;
  }

  return null;
}

function buildStudyReason(career: Career, answers: UserAnswers): string | null {
  const userCapacity = STUDY_TIME_ORDER[answers.availableStudyTime];
  const careerNeed = STUDY_TIME_ORDER[career.studyTime];

  if (userCapacity >= careerNeed) {
    return `你愿意投入${STUDY_TIME_LABELS[answers.availableStudyTime]}来学习，走${career.titleZh}这条路在时间上比较现实。`;
  }

  return null;
}

function buildStabilityReason(career: Career, answers: UserAnswers): string | null {
  if (!valuesStability(answers)) {
    return null;
  }

  const notes: Partial<Record<string, string>> = {
    "government-maintenance-worker":
      "你重视稳定，政府设施维护岗福利和规范度通常更好，适合作为长期方向来规划。",
    "school-custodian":
      "学校后勤岗节奏相对固定，是很多新移民会先考虑的稳妥起步选项。",
    "hospital-facilities-technician":
      "医院属于大型机构，设施维护岗在稳定性和福利上通常优于一般小公司。",
    "building-operator":
      "商业地产和公寓物业持续需要运行维护人员，你重视稳定的话，这个方向值得认真了解。",
    bookkeeper:
      "簿记员属于办公室文职，节奏相对稳定，适合重视稳定、想先进常规公司环境的人。",
    "early-childhood-educator":
      "幼教岗位在 daycare 和幼儿园需求持续，机构工作通常比零工更稳定。",
  };

  return notes[career.id] ?? null;
}

function buildTechnicalReason(career: Career, answers: UserAnswers): string | null {
  if (!prefersTechnicalWork(answers)) {
    return null;
  }

  if (
    (matchesFacilitiesStableProfile(answers) ||
      matchesStableLowPhysicalDaytimeProfile(answers)) &&
    INDUSTRIAL_FIELD_MISMATCH_IDS.has(career.id)
  ) {
    return null;
  }

  if (career.id === "hvac-technician" && !isHvacCandidate(answers)) {
    return null;
  }

  if (career.id === "electrician" && !isElectricianCandidate(answers)) {
    return null;
  }

  if (career.id === "millwright" && !isMillwrightCandidate(answers)) {
    return null;
  }

  const isComboTrade =
    matchesTechnicalIncomeTradeProfile(answers) &&
    career.id in TECHNICAL_INCOME_TRADE_COMBO_BONUSES;

  if (!TECHNICAL_TRADE_CAREER_IDS.has(career.id) && !isComboTrade) {
    return null;
  }

  const notes: Partial<Record<string, string>> = {
    "power-engineer":
      "你偏好动手技术、又看重收入，动力工程师走证照路线，适合愿意长期在锅炉和动力设备领域深耕的人。",
    "hvac-technician":
      "你能接受中等以上体力、又看重收入，暖通是加拿大很实在的技工方向，但要做好外出跑现场的准备。",
    electrician:
      "你愿意走长期学徒、又看重收入，电工在加拿大拿牌后竞争力强，但现场作业强度不低。",
    "instrumentation-technician":
      "仪表控制偏工业自动化，适合喜欢仪表、控制和设备诊断的人；日常要接触英文技术资料，读写能力值得同步提升。",
    millwright:
      "你能接受较高体力、又看重工厂机械维修收入，工业机械维修在加拿大制造业城市需求稳定，但现场强度不低。",
    plumber:
      "水管工收入上限高、技工缺口大，你愿意吃苦学手艺的话，这是很有竞争力的证书路线。",
    "auto-mechanic":
      "汽车维修偏车间动手技术，适合能接受站立弯腰、愿意从 helper 做起的人。",
    welder:
      "焊工上手相对快，适合想尽快靠手艺吃饭、能接受高温和现场环境的人。",
    "commercial-cook":
      "你选了餐饮方向、也能接受厨房体力强度，商业厨师是入行路径比较清晰的选项，但晚班和周末班要心里有数。",
  };

  return notes[career.id] ?? null;
}

function buildWarehouseReason(career: Career, answers: UserAnswers): string | null {
  if (career.id !== "warehouse-supervisor") {
    return null;
  }

  if (matchesOfficeTechDataProfile(answers)) {
    return "仓库主管更偏现场协调和管理，需要和员工、供应商频繁沟通，部分仓库会有早晚班，适合想从基层管理过渡、暂时不挑纯办公室岗位的人。";
  }

  if (!matchesFacilitiesStableProfile(answers)) {
    return null;
  }

  return "仓库主管可作为稳定过渡方向，但日常要协调员工和排班，部分仓库会有早晚班，面试时务必确认。";
}

function buildOfficeTechReason(career: Career, answers: UserAnswers): string | null {
  if (!matchesOfficeTechDataProfile(answers)) {
    return null;
  }

  const notes: Partial<Record<string, string>> = {
    "software-developer":
      "你英语较好、也愿意长期投入学习，软件开发在加拿大收入上限高，但面试和日常协作几乎全程英文，项目作品很关键。",
    "data-analyst":
      "你偏好办公室和数据方向，数据分析师以 Excel、SQL 和 BI 工具为主，适合愿意做业务分析、持续补技能的人。",
    estimator:
      "估算员偏办公室与图纸报价，和你想走脑力型、高收入路线比较合拍，但读英文图纸和核对数字的细心程度很重要。",
    "project-coordinator":
      "项目协调员多在办公室处理排期、资料和多方沟通，适合英语好、做事有条理、愿意在工程行业里做协调角色的人。",
    "graphic-designer":
      "你偏好电脑和创意方向，平面设计以作品集为核心，适合愿意持续打磨视觉作品的人。",
    bookkeeper:
      "簿记员偏办公室和数字处理，和你想走脑力型、稳定路线比较合拍，适合英语中等以上的人。",
  };

  return notes[career.id] ?? null;
}

function buildCategoryReason(career: Career, answers: UserAnswers): string | null {
  if (!answers.preferredCategories?.includes(career.category)) {
    return null;
  }

  return `你自己也选了「${CATEGORY_LABELS_ZH[career.category]}」方向，${career.titleZh}正好落在这个范畴里。`;
}

function buildSignatureReason(career: Career): string {
  return CAREER_SIGNATURE_REASONS[career.id] ?? career.descriptionZh;
}

function buildReasons(career: Career, answers: UserAnswers): string[] {
  const contextual = [
    buildPhysicalReason(career, answers),
    buildEnglishReason(career, answers),
    buildNightShiftReason(career, answers),
    buildStudyReason(career, answers),
    buildStabilityReason(career, answers),
    buildWarehouseReason(career, answers),
    buildOfficeTechReason(career, answers),
    buildTechnicalReason(career, answers),
    buildCategoryReason(career, answers),
  ].filter((reason): reason is string => Boolean(reason));

  const signature = buildSignatureReason(career);
  const merged = [signature, ...contextual.filter((reason) => reason !== signature)];
  const unique = [...new Set(merged)];

  return unique.slice(0, 4);
}

function scoreCareer(
  career: Career,
  answers: UserAnswers,
): CareerRecommendation {
  const score =
    scorePhysical(career, answers) +
    scoreNightShift(career, answers) +
    scoreEnglish(career, answers) +
    scoreStudyTime(career, answers) +
    scoreWorkStyle(career, answers) +
    scoreIncome(career, answers) +
    scoreStability(career, answers) +
    scoreCategory(career, answers) +
    scoreStabilityBoost(career, answers) +
    scoreStabilityMismatch(career, answers) +
    scoreDaytimeBoost(career, answers) +
    scoreTechnicalBoost(career, answers) +
    scoreProfileBoost(career, answers) +
    scoreFacilitiesStableComboBoost(career, answers) +
    scoreFacilitiesStableNonCoreDemote(career, answers) +
    scoreHospitalityCookComboBoost(career, answers) +
    scoreHospitalityFacilitiesDemote(career, answers) +
    scoreHospitalityServiceDemote(career, answers) +
    scoreHospitalityOfficeDemote(career, answers) +
    scoreTechnicalIncomeTradeComboBoost(career, answers) +
    scoreTechnicalIncomeFacilitiesDemote(career, answers) +
    scoreOfficeTechDataComboBoost(career, answers) +
    scoreOfficeTechFacilitiesDemote(career, answers) +
    scoreSecurityGuardBlock(career, answers) +
    scoreStrictEnglishBlock(career, answers) +
    scoreEstimatorStableBoost(career, answers) +
    scoreIndustrialFieldMismatch(career, answers) +
    scoreAutoMechanicBlock(career, answers) +
    scorePlumberBlock(career, answers) +
    scoreTruckDriverBlock(career, answers) +
    scoreTradeBlockPenalties(career, answers);

  return {
    career,
    score,
    matchPercent: 0,
    reasons: buildReasons(career, answers),
  };
}

function calibrateMatchPercents(
  recommendations: CareerRecommendation[],
  answers: UserAnswers,
): CareerRecommendation[] {
  if (recommendations.length === 0) {
    return recommendations;
  }

  const topScore = recommendations[0].score;
  let previousPercent = 101;

  return recommendations.map((recommendation, index) => {
    const [minPercent, maxPercent] = MATCH_PERCENT_RANGES[index] ?? [50, 55];
    const scoreRatio = topScore > 0 ? recommendation.score / topScore : 1;
    let matchPercent = Math.round(
      minPercent + (maxPercent - minPercent) * scoreRatio,
    );

    if (
      recommendation.career.id === "estimator" &&
      hasModerateEnglish(answers)
    ) {
      matchPercent = Math.min(matchPercent, 70);
    }

    if (
      recommendation.career.id === "warehouse-supervisor" &&
      matchesFacilitiesStableProfile(answers)
    ) {
      matchPercent = Math.min(matchPercent, 68);
    }

    const hardCap = resolveMatchPercentCap(recommendation.career.id, answers);
    if (hardCap !== null) {
      matchPercent = Math.min(matchPercent, hardCap);
    }

    matchPercent = Math.min(matchPercent, previousPercent - 1);
    matchPercent = Math.max(minPercent, Math.min(maxPercent, matchPercent));
    previousPercent = matchPercent;

    return { ...recommendation, matchPercent };
  });
}

export function recommendCareers(
  answers: UserAnswers,
  limit = 5,
): CareerRecommendation[] {
  const ranked = CAREERS.map((career) => scoreCareer(career, answers))
    .filter((recommendation) => {
      if (
        recommendation.career.id === "security-guard" &&
        !isSecurityGuardCandidate(answers)
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.career.titleZh.localeCompare(b.career.titleZh, "zh-CN");
    });

  const top = ranked.slice(0, limit);
  return calibrateMatchPercents(top, answers);
}
