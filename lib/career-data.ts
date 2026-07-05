export type Level = 1 | 2 | 3 | 4 | 5;

export type StudyTime = "short" | "medium" | "long";

export type WorkStyle =
  | "independent"
  | "team"
  | "structured"
  | "service"
  | "technical";

export type CareerCategory =
  | "skilled-trades"
  | "facilities"
  | "transportation"
  | "technology"
  | "healthcare"
  | "security"
  | "logistics"
  | "office-construction"
  | "hospitality"
  | "education"
  | "sales-service"
  | "creative";

export interface Career {
  id: string;
  title: string;
  titleZh: string;
  category: CareerCategory;
  physicalLevel: Level;
  nightShiftLevel: Level;
  englishLevel: Level;
  studyTime: StudyTime;
  workStyle: WorkStyle;
  incomePotential: Level;
  stability: Level;
  descriptionZh: string;
  warningZh: string;
  pathZh: string;
  nextStepZh: string;
}

export const STUDY_TIME_ORDER: Record<StudyTime, number> = {
  short: 1,
  medium: 2,
  long: 3,
};

export const CATEGORY_LABELS_ZH: Record<CareerCategory, string> = {
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

/** 用户不接受夜班时需明显扣分 */
export const STRICT_NIGHT_SHIFT_REJECT_IDS = new Set([
  "power-engineer",
  "security-guard",
]);

/** 用户不接受夜班时仅轻微扣分（部分岗位有白班或班表因岗而异） */
export const MILD_NIGHT_SHIFT_REJECT_IDS = new Set([
  "building-operator",
  "hospital-facilities-technician",
  "customer-service-representative",
]);

/** 用户偏好低体力时需明显扣分 */
export const LOW_PHYSICAL_REJECT_IDS = new Set([
  "hvac-technician",
  "electrician",
  "plumber",
  "welder",
  "millwright",
  "auto-mechanic",
  "truck-driver",
  "commercial-cook",
  "personal-trainer",
]);

/** 低体力用户扣分最重（现场技工） */
export const EXTREME_LOW_PHYSICAL_REJECT_IDS = new Set([
  "welder",
  "plumber",
  "hvac-technician",
  "electrician",
  "auto-mechanic",
  "millwright",
  "truck-driver",
  "commercial-cook",
]);

/** 低体力用户需硬性拦截、不应进前五的现场技工 */
export const LOW_PHYSICAL_HARD_BLOCK_IDS = new Set([
  "millwright",
  "welder",
  "auto-mechanic",
  "plumber",
  "hvac-technician",
  "electrician",
  "truck-driver",
  "commercial-cook",
  "personal-trainer",
]);

/** 低体力时即使偏好技术动手也不应加分的现场技工 */
export const FIELD_TRADE_NO_TECH_BOOST_IDS = new Set([
  "hvac-technician",
  "electrician",
  "millwright",
  "auto-mechanic",
  "instrumentation-technician",
]);

/** 设施稳定画像下不应优先推荐的工业现场岗 */
export const INDUSTRIAL_FIELD_MISMATCH_IDS = new Set([
  "auto-mechanic",
  "instrumentation-technician",
  "millwright",
  "welder",
  "truck-driver",
]);

/** 设施运维 + 稳定 + 不夜班 + 低体力 组合强加分 */
export const FACILITIES_STABLE_COMBO_BONUSES: Record<string, number> = {
  "government-maintenance-worker": 20,
  "school-custodian": 18,
  "building-operator": 15,
  "hospital-facilities-technician": 12,
  estimator: 8,
  "warehouse-supervisor": 6,
};

/** 技术动手 + 收入优先 + 愿意学证书 组合强加分 */
export const TECHNICAL_INCOME_TRADE_COMBO_BONUSES: Record<string, number> = {
  "hvac-technician": 18,
  electrician: 18,
  "power-engineer": 16,
  "instrumentation-technician": 15,
  millwright: 12,
  plumber: 10,
  "auto-mechanic": 8,
  welder: 6,
};

/** 技术动手 + 收入优先时，机构/后勤岗应降权（扣分值） */
export const TECHNICAL_INCOME_FACILITIES_DEMOTE_PENALTIES: Record<string, number> =
  {
    "government-maintenance-worker": 30,
    "school-custodian": 28,
    "building-operator": 18,
    "hospital-facilities-technician": 14,
    "warehouse-supervisor": 22,
    "security-guard": 32,
    "bookkeeper": 14,
    "early-childhood-educator": 12,
    "customer-service-representative": 16,
    "commercial-cook": 12,
    "personal-trainer": 10,
  };

/** 技术动手 + 收入优先时，不应获得稳定性加分的设施类岗位 */
export const TECHNICAL_INCOME_STABILITY_BOOST_SKIP_IDS = new Set([
  "government-maintenance-worker",
  "school-custodian",
  "building-operator",
  "hospital-facilities-technician",
]);

/** 电脑/数据/办公室 + 英语较好 + 高收入 + 长期学习 组合强加分 */
export const OFFICE_TECH_DATA_COMBO_BONUSES: Record<string, number> = {
  "software-developer": 20,
  "data-analyst": 20,
  estimator: 14,
  "project-coordinator": 12,
  "warehouse-supervisor": 10,
  "graphic-designer": 12,
  "bookkeeper": 10,
};

/** 餐饮酒店 + 能接受体力 组合强加分 */
export const HOSPITALITY_COOK_COMBO_BONUSES: Record<string, number> = {
  "commercial-cook": 22,
};

/** 餐饮导向时，设施/后勤岗应降权（扣分值） */
export const HOSPITALITY_FACILITIES_DEMOTE_PENALTIES: Record<string, number> = {
  "government-maintenance-worker": 24,
  "school-custodian": 22,
  "building-operator": 16,
  "hospital-facilities-technician": 14,
};

/** 餐饮导向时，其他服务岗降权（避免盖过厨师） */
export const HOSPITALITY_SERVICE_DEMOTE_PENALTIES: Record<string, number> = {
  psw: 18,
  "personal-trainer": 14,
  "early-childhood-educator": 12,
};

/** 餐饮导向时，办公室/估算岗降权 */
export const HOSPITALITY_OFFICE_DEMOTE_PENALTIES: Record<string, number> = {
  bookkeeper: 16,
  estimator: 14,
  "project-coordinator": 12,
};

/** 餐饮导向时，不应因「重视稳定」给设施岗额外加分 */
export const HOSPITALITY_STABILITY_BOOST_SKIP_IDS = new Set([
  "government-maintenance-worker",
  "school-custodian",
  "hospital-facilities-technician",
  "building-operator",
]);

/** 电脑/数据导向时，设施运维岗应降权（扣分值） */
export const OFFICE_TECH_FACILITIES_DEMOTE_PENALTIES: Record<string, number> = {
  "government-maintenance-worker": 32,
  "school-custodian": 30,
  "building-operator": 22,
  "hospital-facilities-technician": 18,
};

/** 电脑/数据导向时，不应获得稳定性加分的设施类岗位 */
export const OFFICE_TECH_STABILITY_BOOST_SKIP_IDS = new Set([
  "government-maintenance-worker",
  "school-custodian",
  "building-operator",
  "hospital-facilities-technician",
]);

/** 低体力用户匹配度硬性封顶（%） */
export const LOW_PHYSICAL_MATCH_PERCENT_CAPS: Record<string, number> = {
  welder: 55,
  millwright: 55,
  "auto-mechanic": 58,
  plumber: 58,
  "truck-driver": 58,
  "hvac-technician": 68,
  electrician: 65,
  "commercial-cook": 58,
  "personal-trainer": 62,
  "local-delivery-driver": 65,
};

/** 不接受夜班用户匹配度硬性封顶（%） */
export const NIGHT_SHIFT_REJECT_MATCH_PERCENT_CAPS: Record<string, number> = {
  "security-guard": 55,
  "power-engineer": 65,
  "hospital-facilities-technician": 75,
  "building-operator": 78,
  "customer-service-representative": 72,
  "commercial-cook": 68,
};

/** 稳定 + 低体力 + 不要夜班时的核心设施运维岗 */
export const FACILITIES_STABLE_CORE_IDS = new Set([
  "government-maintenance-worker",
  "school-custodian",
  "building-operator",
  "hospital-facilities-technician",
]);

/** 用户不接受夜班时明显加分（偏日班机构岗） */
export const DAYTIME_CAREER_BOOST_IDS = new Set([
  "government-maintenance-worker",
  "school-custodian",
]);

/** 重视稳定时不应靠稳定性排名靠前的职业 */
export const LOW_STABILITY_FIT_FOR_SEEKERS_IDS = new Set([
  "welder",
  "truck-driver",
  "hvac-technician",
  "auto-mechanic",
  "instrumentation-technician",
  "millwright",
  "plumber",
  "real-estate-agent",
  "commercial-cook",
]);

/** 对英语要求较高的办公类职业 */
export const HIGH_ENGLISH_CAREER_IDS = new Set([
  "data-analyst",
  "software-developer",
  "project-coordinator",
  "estimator",
  "real-estate-agent",
]);

/** 英语较低时几乎不应推荐的办公类职业 */
export const STRICT_LOW_ENGLISH_BLOCK_IDS = new Set([
  "data-analyst",
  "software-developer",
  "project-coordinator",
  "real-estate-agent",
]);

/** 偏好稳定时明显加分 */
export const STABILITY_BOOST_CAREER_IDS = new Set([
  "government-maintenance-worker",
  "school-custodian",
  "hospital-facilities-technician",
  "building-operator",
]);

/** 动手技术类技工，技术偏好加分 */
export const TECHNICAL_TRADE_CAREER_IDS = new Set([
  "hvac-technician",
  "electrician",
  "power-engineer",
  "instrumentation-technician",
  "millwright",
]);

export const CAREERS: Career[] = [
  {
    id: "power-engineer",
    title: "Power Engineer",
    titleZh: "动力工程师 / 锅炉与设备运行员",
    category: "skilled-trades",
    physicalLevel: 3,
    nightShiftLevel: 5,
    englishLevel: 3,
    studyTime: "long",
    workStyle: "technical",
    incomePotential: 5,
    stability: 4,
    descriptionZh:
      "在加拿大负责锅炉、冷冻、压缩空气等动力设备的运行与监控，需考取省级 Power Engineering 证照。",
    warningZh:
      "轮班和夜班非常普遍，考证周期长，不适合希望固定白班或快速入行的人。",
    pathZh:
      "适合能接受倒班、愿意长期考证、对设备运行和动手技术有兴趣的求职者。",
    nextStepZh:
      "了解所在省份 TSSA 或相应机构的 Power Engineering 分级考试要求，并查询本地 college 夜校或学徒项目。",
  },
  {
    id: "building-operator",
    title: "Building Operator",
    titleZh: "楼宇运行维护员",
    category: "facilities",
    physicalLevel: 2,
    nightShiftLevel: 3,
    englishLevel: 2,
    studyTime: "medium",
    workStyle: "technical",
    incomePotential: 4,
    stability: 5,
    descriptionZh:
      "负责公寓、商场、写字楼等建筑的暖通、水泵、电气等日常运行与巡检。",
    warningZh:
      "部分大楼有白班岗，但也有物业需要轮值；入行前建议问清楚具体班表。",
    pathZh:
      "适合想先进设施运维、英语一般但愿意学设备知识、追求相对稳定的人。",
    nextStepZh:
      "搜索本地 Building Operator 证书课程，或从物业公司的 maintenance helper 岗位做起积累经验。",
  },
  {
    id: "hvac-technician",
    title: "HVAC Technician",
    titleZh: "暖通空调技师",
    category: "skilled-trades",
    physicalLevel: 4,
    nightShiftLevel: 2,
    englishLevel: 2,
    studyTime: "medium",
    workStyle: "technical",
    incomePotential: 4,
    stability: 4,
    descriptionZh:
      "安装与维修供暖、通风、空调系统，加拿大技工需求长期存在。",
    warningZh:
      "夏天冬天都可能在屋顶或机房作业，体力要求不低，需一定现场经验。",
    pathZh:
      "适合愿意吃苦、喜欢动手、能接受户外和现场作业的人。",
    nextStepZh:
      "查询本地 HVAC 学徒项目或 Red Seal 相关路径，先从 helper 岗位接触设备。",
  },
  {
    id: "electrician",
    title: "Electrician",
    titleZh: "电工",
    category: "skilled-trades",
    physicalLevel: 4,
    nightShiftLevel: 2,
    englishLevel: 2,
    studyTime: "long",
    workStyle: "technical",
    incomePotential: 5,
    stability: 4,
    descriptionZh:
      "加拿大紧缺技工之一，负责住宅、商业或工业电气安装与维护。",
    warningZh:
      "学徒制通常需要 4–5 年，前期收入不高，且现场作业有一定风险。",
    pathZh:
      "适合有耐心走完学徒、愿意考证、能接受工地或厂房环境的人。",
    nextStepZh:
      "在 Ontario College of Trades 或本省技工监管机构网站注册，寻找 licensed electrician 做学徒。",
  },
  {
    id: "plumber",
    title: "Plumber",
    titleZh: "水管工",
    category: "skilled-trades",
    physicalLevel: 4,
    nightShiftLevel: 2,
    englishLevel: 2,
    studyTime: "long",
    workStyle: "technical",
    incomePotential: 5,
    stability: 4,
    descriptionZh:
      "负责供水、排水、燃气管道等安装维修，在住房与基建需求下岗位较稳。",
    warningZh:
      "需要弯腰、搬运、钻墙等体力活，学徒期较长，不适合只想坐办公室的人。",
    pathZh:
      "适合不怕脏累、愿意长期学手艺、希望靠技工拿稳定收入的人。",
    nextStepZh:
      "了解本省 plumber 学徒注册流程，从 helper 或 rough-in 相关岗位入行。",
  },
  {
    id: "instrumentation-technician",
    title: "Instrumentation Technician",
    titleZh: "仪表控制技师",
    category: "skilled-trades",
    physicalLevel: 3,
    nightShiftLevel: 3,
    englishLevel: 3,
    studyTime: "medium",
    workStyle: "technical",
    incomePotential: 5,
    stability: 4,
    descriptionZh:
      "维护工厂、能源设施中的自动化仪表与控制系统，偏技术型蓝领。",
    warningZh:
      "多集中在工业城市，岗位不如电工普及，部分厂区需要轮班。",
    pathZh:
      "适合有理工基础、愿意在工厂环境工作、对自动化设备感兴趣的人。",
    nextStepZh:
      "查看本地 college 的 Instrumentation 或 Industrial Maintenance 课程，并关注 Alberta、BC 等工业省份招聘。",
  },
  {
    id: "millwright",
    title: "Millwright",
    titleZh: "工业机械维修技师",
    category: "skilled-trades",
    physicalLevel: 5,
    nightShiftLevel: 2,
    englishLevel: 2,
    studyTime: "long",
    workStyle: "technical",
    incomePotential: 5,
    stability: 4,
    descriptionZh:
      "安装与维修工厂里的机床、传送带、泵机等重型设备。",
    warningZh:
      "体力要求高，常在嘈杂车间作业，对腰力和耐力是考验。",
    pathZh:
      "适合力气好、不怕工厂环境、愿意走 Red Seal 技工路线的人。",
    nextStepZh:
      "搜索 Millwright apprenticeship 名额，或先从 machine shop helper 了解行业。",
  },
  {
    id: "welder",
    title: "Welder",
    titleZh: "焊工",
    category: "skilled-trades",
    physicalLevel: 5,
    nightShiftLevel: 2,
    englishLevel: 2,
    studyTime: "medium",
    workStyle: "technical",
    incomePotential: 4,
    stability: 3,
    descriptionZh:
      "金属焊接与加工，在制造、基建、维修行业都有需求。",
    warningZh:
      "现场烟尘和高温环境多，对身体要求高，部分项目节奏不稳定。",
    pathZh:
      "适合能接受高强度作业、培训周期相对可控、想快速掌握一门手艺的人。",
    nextStepZh:
      "报名 welding certificate 课程，考取 CWB 等基础证照，从 fabrication shop 入行。",
  },
  {
    id: "truck-driver",
    title: "Truck Driver",
    titleZh: "卡车司机",
    category: "transportation",
    physicalLevel: 3,
    nightShiftLevel: 4,
    englishLevel: 2,
    studyTime: "short",
    workStyle: "independent",
    incomePotential: 4,
    stability: 3,
    descriptionZh:
      "负责货运驾驶，入行相对快，但需考取相应驾照类别。",
    warningZh:
      "长途驾驶作息不规律，久坐久驾对身体有负担，部分线路夜间发车。",
    pathZh:
      "适合需要较快上岗、能接受独立工作和不规律作息的人。",
    nextStepZh:
      "了解 AZ/DZ 等驾照要求，报名驾校并积累 clean driving record。",
  },
  {
    id: "auto-mechanic",
    title: "Auto Mechanic",
    titleZh: "汽车维修技师",
    category: "skilled-trades",
    physicalLevel: 4,
    nightShiftLevel: 2,
    englishLevel: 2,
    studyTime: "medium",
    workStyle: "technical",
    incomePotential: 4,
    stability: 4,
    descriptionZh:
      "车辆检测、保养与维修，技工路径在加拿大比较清晰。",
    warningZh:
      "车间环境油腻、需长时间站立弯腰，对体力有一定要求。",
    pathZh:
      "适合喜欢汽车、愿意从 lube technician 或 helper 做起的人。",
    nextStepZh:
      "查询 Automotive Service Technician 学徒项目，或先在连锁快修店积累基础。",
  },
  {
    id: "government-maintenance-worker",
    title: "Government Maintenance Worker",
    titleZh: "政府设施维护员",
    category: "facilities",
    physicalLevel: 3,
    nightShiftLevel: 1,
    englishLevel: 2,
    studyTime: "medium",
    workStyle: "structured",
    incomePotential: 4,
    stability: 5,
    descriptionZh:
      "为政府办公楼、场馆等公共设施做日常维护，岗位竞争存在但稳定性好。",
    warningZh:
      "招聘节奏慢、流程正规，需要耐心等待职位开放并通过笔试面试。",
    pathZh:
      "适合重视福利和稳定、愿意走公共部门招聘流程的新移民。",
    nextStepZh:
      "定期查看 municipal、provincial 或 federal jobs 网站，准备 maintenance 相关经验说明。",
  },
  {
    id: "school-custodian",
    title: "School Custodian / Maintenance",
    titleZh: "学校清洁与设施维护",
    category: "facilities",
    physicalLevel: 3,
    nightShiftLevel: 2,
    englishLevel: 1,
    studyTime: "short",
    workStyle: "service",
    incomePotential: 3,
    stability: 5,
    descriptionZh:
      "负责学校清洁、简单维修与后勤，英语门槛相对较低。",
    warningZh:
      "收入上限一般，工作重复度高，更适合作为过渡或稳定起步。",
    pathZh:
      "适合英语还在提升、希望先进公共机构、能接受体力劳动的人。",
    nextStepZh:
      "关注 school board 招聘网站，可先从 custodian 或 caretaker 投递开始。",
  },
  {
    id: "hospital-facilities-technician",
    title: "Hospital Facilities Technician",
    titleZh: "医院设施维护技师",
    category: "facilities",
    physicalLevel: 3,
    nightShiftLevel: 4,
    englishLevel: 2,
    studyTime: "medium",
    workStyle: "technical",
    incomePotential: 4,
    stability: 5,
    descriptionZh:
      "维护医院空调、电气、管道等基础设施，属于机构技术岗。",
    warningZh:
      "医院 24 小时运转，应急值班和夜班较常见，入职前务必确认排班。",
    pathZh:
      "适合有设施或技工背景、能接受医院环境、看重机构稳定性的人。",
    nextStepZh:
      "查看医院 careers 页面中 Facilities / Plant Operations 类岗位，补充基础机电经验。",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    titleZh: "数据分析师",
    category: "technology",
    physicalLevel: 1,
    nightShiftLevel: 1,
    englishLevel: 4,
    studyTime: "medium",
    workStyle: "structured",
    incomePotential: 4,
    stability: 4,
    descriptionZh:
      "用 Excel、SQL、BI 工具做业务数据分析，偏办公室岗位。",
    warningZh:
      "简历竞争强，英语书面表达和本地项目经验很重要。",
    pathZh:
      "适合英语较好、有商科或理工背景、愿意补数据分析技能的人。",
    nextStepZh:
      "做一个本地行业相关的数据分析 portfolio，并考取 SQL 或 Power BI 基础证书。",
  },
  {
    id: "software-developer",
    title: "Software Developer",
    titleZh: "软件开发工程师",
    category: "technology",
    physicalLevel: 1,
    nightShiftLevel: 1,
    englishLevel: 4,
    studyTime: "long",
    workStyle: "independent",
    incomePotential: 5,
    stability: 4,
    descriptionZh:
      "编写和维护软件系统，收入上限高，但学习曲线陡。",
    warningZh:
      "面试和技术沟通几乎全程英语，没有项目作品很难脱颖而出。",
    pathZh:
      "适合英语好、能持续自学编程、有一定项目或实习经验的人。",
    nextStepZh:
      "完善 GitHub 项目，针对 junior developer 岗位定制英文简历，并练习技术面试。",
  },
  {
    id: "project-coordinator",
    title: "Project Coordinator",
    titleZh: "项目协调员",
    category: "office-construction",
    physicalLevel: 1,
    nightShiftLevel: 1,
    englishLevel: 4,
    studyTime: "medium",
    workStyle: "team",
    incomePotential: 4,
    stability: 4,
    descriptionZh:
      "协助工程项目排期、资料整理和多方沟通，多在办公室或工地现场协作。",
    warningZh:
      "日常邮件会议多，对英语口语和书面组织能力要求高。",
    pathZh:
      "适合沟通能力强、细心、有工程或建筑相关背景的人。",
    nextStepZh:
      "在简历中突出 scheduling、documentation 经验，可先从 construction admin assistant 入行。",
  },
  {
    id: "estimator",
    title: "Estimator",
    titleZh: "工程造价估算员",
    category: "office-construction",
    physicalLevel: 1,
    nightShiftLevel: 1,
    englishLevel: 4,
    studyTime: "medium",
    workStyle: "structured",
    incomePotential: 4,
    stability: 3,
    descriptionZh:
      "为建筑或装修项目测算材料与人工成本，需要熟悉图纸和行业价格。",
    warningZh:
      "要对数字敏感，需读懂英文图纸和报价单，行业波动时岗位也会受影响。",
    pathZh:
      "适合有建筑、造价或工程背景、英语读写不错、做事细致的人。",
    nextStepZh:
      "学习本地造价软件与计量规范，从 estimator assistant 或 quantity surveyor 助理做起。",
  },
  {
    id: "psw",
    title: "PSW",
    titleZh: "个人支持工作者",
    category: "healthcare",
    physicalLevel: 4,
    nightShiftLevel: 4,
    englishLevel: 2,
    studyTime: "medium",
    workStyle: "service",
    incomePotential: 3,
    stability: 4,
    descriptionZh:
      "照护老人或病患的日常生活，培训后入行相对明确。",
    warningZh:
      "需要扶抱、久站，夜班和周末班常见，情绪消耗也不小。",
    pathZh:
      "适合有耐心和体力、愿意做照护服务、培训周期中等的人。",
    nextStepZh:
      "报名 PSW certificate 课程，完成后关注 long-term care 和 home care 机构招聘。",
  },
  {
    id: "security-guard",
    title: "Security Guard",
    titleZh: "保安",
    category: "security",
    physicalLevel: 3,
    nightShiftLevel: 5,
    englishLevel: 2,
    studyTime: "short",
    workStyle: "structured",
    incomePotential: 2,
    stability: 3,
    descriptionZh:
      "入行快、培训短，适合作为短期过渡或兼职选项。",
    warningZh:
      "保安入门快，但夜班多、收入上限低、长期发展有限，更适合作为短期过渡，不建议作为主要职业规划。",
    pathZh:
      "适合需要快速上岗、暂时过渡、能接受夜间值守的人。",
    nextStepZh:
      "完成 Security Guard License 培训，先投 condo、商场等基础岗位积累经验。",
  },
  {
    id: "warehouse-supervisor",
    title: "Warehouse Supervisor",
    titleZh: "仓库主管",
    category: "logistics",
    physicalLevel: 3,
    nightShiftLevel: 3,
    englishLevel: 3,
    studyTime: "medium",
    workStyle: "team",
    incomePotential: 4,
    stability: 3,
    descriptionZh:
      "管理仓库收发、排班和团队，需要一定现场经验。",
    warningZh:
      "旺季加班多，要协调工人排班，英语沟通能力不足会比较吃力。",
    pathZh:
      "适合有物流或仓储经验、能带团队、愿意从 supervisor 助理做起的人。",
    nextStepZh:
      "先从 warehouse associate 或 team lead 做起，积累 WMS 系统和排班管理经验。",
  },
  {
    id: "bookkeeper",
    title: "Bookkeeper",
    titleZh: "簿记员",
    category: "office-construction",
    physicalLevel: 1,
    nightShiftLevel: 1,
    englishLevel: 3,
    studyTime: "medium",
    workStyle: "structured",
    incomePotential: 3,
    stability: 4,
    descriptionZh:
      "负责日常记账、发票、银行对账和基础财务报表，多在办公室完成。",
    warningZh:
      "需要数字敏感度和一定英语读写，部分岗位会要求 QuickBooks 或相关证书。",
    pathZh:
      "适合细心、英语中等、希望做稳定办公室工作的人，不少华人会从兼职或小公司簿记起步。",
    nextStepZh:
      "学习 QuickBooks 或 Sage，考取 bookkeeping certificate，并积累本地小企业记账案例。",
  },
  {
    id: "early-childhood-educator",
    title: "Early Childhood Educator",
    titleZh: "幼教老师",
    category: "education",
    physicalLevel: 2,
    nightShiftLevel: 1,
    englishLevel: 3,
    studyTime: "medium",
    workStyle: "service",
    incomePotential: 3,
    stability: 4,
    descriptionZh:
      "在幼儿园、daycare 负责幼儿照护与早期教育，加拿大各省均需相应证照。",
    warningZh:
      "需要耐心和情绪管理，英语要能和家长沟通，部分岗位对本地经验有要求。",
    pathZh:
      "适合喜欢孩子、重视稳定、愿意读 college 课程并考取 ECE 证照的人。",
    nextStepZh:
      "查询所在省份 ECE 注册要求，报名 college 的 Early Childhood Education 文凭课程。",
  },
  {
    id: "customer-service-representative",
    title: "Customer Service Representative",
    titleZh: "客服代表",
    category: "sales-service",
    physicalLevel: 1,
    nightShiftLevel: 3,
    englishLevel: 3,
    studyTime: "short",
    workStyle: "service",
    incomePotential: 2,
    stability: 3,
    descriptionZh:
      "通过电话、邮件或在线聊天处理客户咨询，常见于银行、电信、电商等机构。",
    warningZh:
      "部分呼叫中心有早晚班，重复性较高，英语口语和听力要求不能太低。",
    pathZh:
      "适合想先进办公室、英语中等、愿意从基础客服岗位积累本地工作经验的人。",
    nextStepZh:
      "优化英文电话沟通表达，投递 bank、telecom、retail 等公司的 customer service 岗位。",
  },
  {
    id: "local-delivery-driver",
    title: "Local Delivery Driver",
    titleZh: "本地配送司机",
    category: "transportation",
    physicalLevel: 2,
    nightShiftLevel: 3,
    englishLevel: 2,
    studyTime: "short",
    workStyle: "independent",
    incomePotential: 3,
    stability: 3,
    descriptionZh:
      "负责本地包裹、食品或建材配送，比长途卡车更偏城市短途路线。",
    warningZh:
      "旺季和恶劣天气工作强度会上升，部分平台岗位按单计酬，收入会有波动。",
    pathZh:
      "适合需要较快上岗、能接受开车跑腿、不想做长途跨城运输的人。",
    nextStepZh:
      "确认 G 牌或更高驾照要求，可先从 courier、food delivery 或 local delivery 公司入行。",
  },
  {
    id: "commercial-cook",
    title: "Commercial Cook",
    titleZh: "商业厨师",
    category: "hospitality",
    physicalLevel: 4,
    nightShiftLevel: 4,
    englishLevel: 2,
    studyTime: "medium",
    workStyle: "technical",
    incomePotential: 3,
    stability: 3,
    descriptionZh:
      "在餐厅、食堂或中央厨房负责备餐和烹饪，可走 Red Seal 厨师路线。",
    warningZh:
      "厨房高温、站立时间长，晚班和周末班常见，对体力要求不低。",
    pathZh:
      "适合能吃苦、喜欢餐饮、愿意从 kitchen helper 或 prep cook 做起的人。",
    nextStepZh:
      "报名 culinary 基础课程，寻找 commercial kitchen 的 prep cook 岗位积累工时。",
  },
  {
    id: "real-estate-agent",
    title: "Real Estate Agent",
    titleZh: "房产经纪",
    category: "sales-service",
    physicalLevel: 2,
    nightShiftLevel: 2,
    englishLevel: 4,
    studyTime: "medium",
    workStyle: "independent",
    incomePotential: 5,
    stability: 2,
    descriptionZh:
      "帮助客户买卖或租赁房产，收入与成交挂钩，在华人社区有一定市场需求。",
    warningZh:
      "收入波动大，几乎全程英文沟通和营销，考证和前期获客都需要时间。",
    pathZh:
      "适合英语较好、沟通能力强、能承受业绩压力、对本地房市有兴趣的人。",
    nextStepZh:
      "了解所在省份 real estate licensing 课程，完成 pre-registration 培训并准备执照考试。",
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    titleZh: "平面设计师",
    category: "creative",
    physicalLevel: 1,
    nightShiftLevel: 1,
    englishLevel: 3,
    studyTime: "medium",
    workStyle: "independent",
    incomePotential: 3,
    stability: 3,
    descriptionZh:
      "为品牌、网站或营销物料做视觉设计，可进公司也可自由接单。",
    warningZh:
      "作品集比学历更重要，自由职业收入不稳定，客户沟通通常需要英文。",
    pathZh:
      "适合有审美、会用设计软件、愿意持续更新作品集的人。",
    nextStepZh:
      "整理 Behance 或个人网站作品集，学习 Figma/Adobe 套件，并投递 junior designer 岗位。",
  },
  {
    id: "personal-trainer",
    title: "Personal Trainer",
    titleZh: "健身教练",
    category: "healthcare",
    physicalLevel: 4,
    nightShiftLevel: 2,
    englishLevel: 3,
    studyTime: "medium",
    workStyle: "service",
    incomePotential: 3,
    stability: 3,
    descriptionZh:
      "在健身房或工作室指导客户训练，需考取相应 fitness certification。",
    warningZh:
      "需要自身体能和示范能力，部分岗位早晚班都有，客户积累影响收入。",
    pathZh:
      "适合热爱健身、体能不错、愿意考证并慢慢积累客户的人。",
    nextStepZh:
      "考取 CPR/First Aid 和 personal training certification，先从 gym floor staff 或 assistant trainer 做起。",
  },
];
