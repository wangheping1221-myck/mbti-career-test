/**
 * Career Test V2 — office-administration pilot career profiles (V2.4D pilot).
 *
 * Pilot subset only. Not the full 60-career catalog.
 * Do not rename to CAREERS_V2 until the full catalog is authorized.
 */

import type { DimensionLevelV2 } from "./dimensions";
import type { CareerProfileV2 } from "./profiles";

/** Local brand helper — not exported. */
function lvl(value: 0 | 2500 | 5000 | 7500 | 10000): DimensionLevelV2 {
  return value as DimensionLevelV2;
}

/**
 * Exact six office-administration pilot records in canonical CAREER_IDS_V2 order
 * for this family. Incomplete catalog — do not treat as CAREERS_V2.
 */
export const OFFICE_ADMINISTRATION_PILOT_CAREERS_V2 = [
  {
    id: "v2-administrative-assistant",
    titleEn: "Administrative Assistant",
    titleZh: "行政助理",
    primaryFamily: "office-administration",
    crossCuttingTags: [],
    constraints: {
      nightRotatingExposure: "not-typical",
      heavyPhysicalExposure: "low",
    },
    dimensionProfile: {
      workStyleFit: {
        independentTeam: lvl(5000),
        handsOnDesk: lvl(0),
        structureJudgment: lvl(5000),
        routineVariety: lvl(5000),
        leadershipResponsibility: lvl(2500),
      },
      physicalDemandTolerance: lvl(0),
      indoorOutdoorPreference: lvl(0),
      customerFacingTolerance: lvl(5000),
      englishReadiness: lvl(7500),
      trainingDurationTolerance: lvl(2500),
      formalEntryWillingness: lvl(2500),
      shiftScheduleTolerance: lvl(0),
      stabilityVersusUpside: lvl(5000),
      detailVersusCoordination: lvl(7500),
      careerEntryPracticality: "learn-on-job",
    },
    descriptionZh:
      "提供办公室日常支持，包括日程安排、文档处理和一般事务协调。",
    verification: { status: "editorial-only" },
    mismatchNotesZh:
      "与设施协调员不同：偏综合行政，而非设施工单或供应商协调。",
    similarityGroupId: "sim-admin-vs-facilities-coord",
  },
  {
    id: "v2-bookkeeper",
    titleEn: "Bookkeeper",
    titleZh: "簿记员",
    primaryFamily: "office-administration",
    crossCuttingTags: [],
    constraints: {
      nightRotatingExposure: "not-typical",
      heavyPhysicalExposure: "low",
    },
    dimensionProfile: {
      workStyleFit: {
        independentTeam: lvl(7500),
        handsOnDesk: lvl(0),
        structureJudgment: lvl(2500),
        routineVariety: lvl(2500),
        leadershipResponsibility: lvl(0),
      },
      physicalDemandTolerance: lvl(0),
      indoorOutdoorPreference: lvl(0),
      customerFacingTolerance: lvl(2500),
      englishReadiness: lvl(7500),
      trainingDurationTolerance: lvl(5000),
      formalEntryWillingness: lvl(5000),
      shiftScheduleTolerance: lvl(0),
      stabilityVersusUpside: lvl(5000),
      detailVersusCoordination: lvl(0),
      careerEntryPracticality: "short-prep",
    },
    descriptionZh: "负责日常簿记与对账等财务记录工作。",
    verification: { status: "editorial-only" },
  },
  {
    id: "v2-project-coordinator",
    titleEn: "Project Coordinator",
    titleZh: "项目协调员",
    primaryFamily: "office-administration",
    crossCuttingTags: [],
    constraints: {
      nightRotatingExposure: "not-typical",
      heavyPhysicalExposure: "low",
    },
    dimensionProfile: {
      workStyleFit: {
        independentTeam: lvl(5000),
        handsOnDesk: lvl(0),
        structureJudgment: lvl(7500),
        routineVariety: lvl(7500),
        leadershipResponsibility: lvl(5000),
      },
      physicalDemandTolerance: lvl(0),
      indoorOutdoorPreference: lvl(0),
      customerFacingTolerance: lvl(5000),
      englishReadiness: lvl(7500),
      trainingDurationTolerance: lvl(5000),
      formalEntryWillingness: lvl(5000),
      shiftScheduleTolerance: lvl(0),
      stabilityVersusUpside: lvl(5000),
      detailVersusCoordination: lvl(10000),
      careerEntryPracticality: "short-prep",
    },
    descriptionZh: "协调项目日程、相关方沟通与项目文档。",
    verification: { status: "editorial-only" },
  },
  {
    id: "v2-estimator",
    titleEn: "Construction Estimator",
    titleZh: "工程造价估算员",
    primaryFamily: "office-administration",
    crossCuttingTags: [],
    constraints: {
      nightRotatingExposure: "not-typical",
      heavyPhysicalExposure: "low",
    },
    dimensionProfile: {
      workStyleFit: {
        independentTeam: lvl(7500),
        handsOnDesk: lvl(0),
        structureJudgment: lvl(7500),
        routineVariety: lvl(5000),
        leadershipResponsibility: lvl(0),
      },
      physicalDemandTolerance: lvl(0),
      indoorOutdoorPreference: lvl(0),
      customerFacingTolerance: lvl(2500),
      englishReadiness: lvl(7500),
      trainingDurationTolerance: lvl(5000),
      formalEntryWillingness: lvl(5000),
      shiftScheduleTolerance: lvl(0),
      stabilityVersusUpside: lvl(5000),
      detailVersusCoordination: lvl(0),
      careerEntryPracticality: "short-prep",
    },
    descriptionZh: "根据图纸与报价资料估算工程造价。",
    verification: { status: "editorial-only" },
  },
  {
    id: "v2-receptionist",
    titleEn: "Receptionist",
    titleZh: "前台接待",
    primaryFamily: "office-administration",
    crossCuttingTags: [],
    constraints: {
      nightRotatingExposure: "not-typical",
      heavyPhysicalExposure: "low",
    },
    dimensionProfile: {
      workStyleFit: {
        independentTeam: lvl(5000),
        handsOnDesk: lvl(0),
        structureJudgment: lvl(5000),
        routineVariety: lvl(5000),
        leadershipResponsibility: lvl(0),
      },
      physicalDemandTolerance: lvl(0),
      indoorOutdoorPreference: lvl(0),
      customerFacingTolerance: lvl(10000),
      englishReadiness: lvl(7500),
      trainingDurationTolerance: lvl(0),
      formalEntryWillingness: lvl(0),
      shiftScheduleTolerance: lvl(0),
      stabilityVersusUpside: lvl(5000),
      detailVersusCoordination: lvl(5000),
      careerEntryPracticality: "learn-on-job",
    },
    descriptionZh: "接待来访人员，处理前台来电与到访事务。",
    verification: { status: "editorial-only" },
  },
  {
    id: "v2-payroll-clerk",
    titleEn: "Payroll Clerk",
    titleZh: "薪资文员",
    primaryFamily: "office-administration",
    crossCuttingTags: [],
    constraints: {
      nightRotatingExposure: "not-typical",
      heavyPhysicalExposure: "low",
    },
    dimensionProfile: {
      workStyleFit: {
        independentTeam: lvl(7500),
        handsOnDesk: lvl(0),
        structureJudgment: lvl(0),
        routineVariety: lvl(0),
        leadershipResponsibility: lvl(0),
      },
      physicalDemandTolerance: lvl(0),
      indoorOutdoorPreference: lvl(0),
      customerFacingTolerance: lvl(0),
      englishReadiness: lvl(7500),
      trainingDurationTolerance: lvl(5000),
      formalEntryWillingness: lvl(5000),
      shiftScheduleTolerance: lvl(0),
      stabilityVersusUpside: lvl(5000),
      detailVersusCoordination: lvl(0),
      careerEntryPracticality: "short-prep",
    },
    descriptionZh: "在办公财务流程中处理薪资相关录入与流程事务。",
    verification: { status: "editorial-only" },
  },
] as const satisfies readonly CareerProfileV2[];
