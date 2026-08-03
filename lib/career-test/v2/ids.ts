/**
 * Career Test V2 — stable identifiers (V2.4B).
 * Types and const arrays only. No question/career data payloads.
 *
 * Chinese user-facing taxonomy labels use 职业大类 / 职业领域 only.
 */

export const CAREER_TEST_V2_VERSION = "v2" as const;
export const CAREER_TEST_V2_SCHEMA_VERSION = 1 as const;

export const QUESTION_IDS_V2 = [
  "v2-c01",
  "v2-c02",
  "v2-c03",
  "v2-c04",
  "v2-c05",
  "v2-c06",
  "v2-p01",
  "v2-p02",
  "v2-p03",
  "v2-p04",
  "v2-p05",
  "v2-p06",
  "v2-p07",
  "v2-p08",
  "v2-p09",
  "v2-p10",
  "v2-i01",
  "v2-i02",
  "v2-i03",
  "v2-i04",
  "v2-i05",
  "v2-i06",
  "v2-i07",
  "v2-i08",
  "v2-i09",
  "v2-i10",
] as const;

export type QuestionIdV2 = (typeof QUESTION_IDS_V2)[number];

export const OPTION_IDS_V2 = ["a", "b", "c", "d"] as const;
export type OptionIdV2 = (typeof OPTION_IDS_V2)[number];

export const OCCUPATION_FAMILY_IDS_V2 = [
  "skilled-trades",
  "building-operations-facilities",
  "healthcare-support",
  "transportation-logistics",
  "manufacturing-production",
  "office-administration",
  "technology",
  "sales-customer-service",
  "education-community-services",
  "hospitality-food-services",
  "public-sector-institutional",
  "self-employment-friendly",
] as const;

export type OccupationFamilyIdV2 = (typeof OCCUPATION_FAMILY_IDS_V2)[number];

/** Locked Chinese 职业大类 / 职业领域 display labels (one per family). */
export const OCCUPATION_FAMILY_LABELS_ZH = {
  "skilled-trades": "技工与工程技术",
  "building-operations-facilities": "楼宇运维与设施管理",
  "healthcare-support": "医疗与健康支持",
  "transportation-logistics": "运输与物流",
  "manufacturing-production": "制造与生产",
  "office-administration": "办公与行政",
  technology: "信息技术与数字领域",
  "sales-customer-service": "销售与客户服务",
  "education-community-services": "教育与社区服务",
  "hospitality-food-services": "酒店、餐饮与服务",
  "public-sector-institutional": "公共部门与机构岗位",
  "self-employment-friendly": "自雇与独立工作型",
} as const satisfies Record<OccupationFamilyIdV2, string>;

export const CAREER_IDS_V2 = [
  // Skilled trades (10)
  "v2-electrician",
  "v2-plumber",
  "v2-hvac-technician",
  "v2-millwright",
  "v2-welder",
  "v2-auto-service-technician",
  "v2-instrumentation-technician",
  "v2-power-engineer",
  "v2-carpenter",
  "v2-construction-labourer",
  // Building operations & facilities (7)
  "v2-building-operator",
  "v2-hospital-facilities-technician",
  "v2-property-maintenance-worker",
  "v2-commercial-custodian",
  "v2-groundskeeper",
  "v2-maintenance-helper",
  "v2-facilities-coordinator",
  // Healthcare support (6)
  "v2-psw",
  "v2-medical-office-assistant",
  "v2-pharmacy-assistant",
  "v2-dental-assistant",
  "v2-dietary-aide",
  "v2-medical-laboratory-assistant",
  // Transportation & logistics (6)
  "v2-truck-driver",
  "v2-local-delivery-driver",
  "v2-warehouse-associate",
  "v2-forklift-operator",
  "v2-warehouse-supervisor",
  "v2-transit-operator",
  // Manufacturing / production (4)
  "v2-assembler",
  "v2-machine-operator",
  "v2-quality-control-inspector",
  "v2-production-supervisor",
  // Office & administration (6)
  "v2-administrative-assistant",
  "v2-bookkeeper",
  "v2-project-coordinator",
  "v2-estimator",
  "v2-receptionist",
  "v2-payroll-clerk",
  // Technology (5)
  "v2-software-developer",
  "v2-data-analyst",
  "v2-it-support-specialist",
  "v2-network-technician",
  "v2-graphic-designer",
  // Sales & customer service (4)
  "v2-customer-service-representative",
  "v2-retail-sales-associate",
  "v2-inside-sales-representative",
  "v2-real-estate-salesperson",
  // Education & community services (4)
  "v2-early-childhood-educator",
  "v2-educational-assistant",
  "v2-community-support-worker",
  "v2-settlement-worker",
  // Hospitality & food services (4)
  "v2-commercial-cook",
  "v2-kitchen-helper",
  "v2-food-service-supervisor",
  "v2-hotel-front-desk-agent",
  // Public-sector & institutional (3)
  "v2-municipal-maintenance-worker",
  "v2-school-custodian",
  "v2-security-guard",
  // Self-employment-friendly (1)
  "v2-personal-trainer",
] as const;

export type CareerIdV2 = (typeof CAREER_IDS_V2)[number];

export const SIMILARITY_GROUP_IDS_V2 = [
  "sim-building-systems-maintenance",
  "sim-custodial-context",
  "sim-community-settlement",
  "sim-admin-vs-facilities-coord",
  "sim-kitchen-leadership",
  "sim-warehouse-ladder",
  "sim-software-vs-support",
  "sim-clinic-admin-vs-lab",
] as const;

export type SimilarityGroupIdV2 = (typeof SIMILARITY_GROUP_IDS_V2)[number];

/** Supporting ladder metadata only — no locked ladder diversity cap in initial V2. */
declare const careerLadderGroupIdBrand: unique symbol;
export type CareerLadderGroupIdV2 = string & {
  readonly [careerLadderGroupIdBrand]: "CareerLadderGroupIdV2";
};

type AssertLen<T extends readonly unknown[], N extends number> =
  T["length"] extends N ? true : never;

const _assertQuestionCount: AssertLen<typeof QUESTION_IDS_V2, 26> = true;
const _assertOptionCount: AssertLen<typeof OPTION_IDS_V2, 4> = true;
const _assertFamilyCount: AssertLen<typeof OCCUPATION_FAMILY_IDS_V2, 12> = true;
const _assertCareerCount: AssertLen<typeof CAREER_IDS_V2, 60> = true;
const _assertSimilarityCount: AssertLen<typeof SIMILARITY_GROUP_IDS_V2, 8> =
  true;

void _assertQuestionCount;
void _assertOptionCount;
void _assertFamilyCount;
void _assertCareerCount;
void _assertSimilarityCount;
