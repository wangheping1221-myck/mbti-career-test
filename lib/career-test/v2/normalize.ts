/**
 * Career Test V2 — answer normalization / buildUserProfileV2 (V2.4C3).
 * Pure profile construction only — no scoring weights, ranking, or career data.
 */

import type { ValidatedAnswersV2 } from "./answers";
import type { HardConstraintsV2 } from "./constraints";
import {
  OCCUPATION_FAMILY_IDS_V2,
  QUESTION_IDS_V2,
  CAREER_TEST_V2_SCHEMA_VERSION,
  CAREER_TEST_V2_VERSION,
  type OccupationFamilyIdV2,
  type QuestionIdV2,
} from "./ids";
import {
  SCORING_COMPONENT_KEYS_V2,
  WORK_STYLE_SUB_KEYS_V2,
  type DimensionLevelV2,
  type EntryPaceCategoryV2,
  type ScoringComponentKeyV2,
  type WorkStyleSubKeyV2,
} from "./dimensions";
import { getAnswerOptionV2, getQuestionV2 } from "./question-bank";
import type {
  ActiveScoringComponentsV2,
  FamilyAffinityV2,
  UserProfileV2,
  UserSoftProfileV2,
} from "./profiles";
import { FIXED_POINT_SCALE } from "./scoring";
import type { OptionSignalV2 } from "./questions";

/** Locked appearance denominators (CTV2.4-D8 / CTV2.4C-D6). */
const FAMILY_APPEARANCE_OPPORTUNITIES_V2 = {
  "skilled-trades": 3,
  "building-operations-facilities": 3,
  "healthcare-support": 3,
  "transportation-logistics": 3,
  "office-administration": 3,
  technology: 3,
  "manufacturing-production": 2,
  "sales-customer-service": 2,
  "education-community-services": 2,
  "hospitality-food-services": 2,
  "public-sector-institutional": 2,
  "self-employment-friendly": 2,
} as const satisfies Record<OccupationFamilyIdV2, number>;

/** roundHalfUp(numerator / denominator) for non-negative integers. */
function roundHalfUp(numerator: number, denominator: number): number {
  return Math.floor((2 * numerator + denominator) / (2 * denominator));
}

function asDimensionLevel(value: number): DimensionLevelV2 {
  return value as DimensionLevelV2;
}

/**
 * Max explicit signal.level for ordinal-soft options on this question/dimension.
 * Never derived from option-letter order.
 */
function maxOrdinalLevelForQuestion(
  questionId: QuestionIdV2,
  dimension: Extract<
    OptionSignalV2,
    { kind: "ordinal-soft" }
  >["dimension"],
): number {
  let max = 0;
  for (const option of getQuestionV2(questionId).options) {
    const signal = option.signal;
    if (
      signal.kind === "ordinal-soft" &&
      signal.dimension === dimension &&
      signal.level > max
    ) {
      max = signal.level;
    }
  }
  return max;
}

/**
 * Max explicit signal.level for work-style-sub options on this question/subKey.
 */
function maxWorkStyleLevelForQuestion(
  questionId: QuestionIdV2,
  subKey: WorkStyleSubKeyV2,
): number {
  let max = 0;
  for (const option of getQuestionV2(questionId).options) {
    const signal = option.signal;
    if (
      signal.kind === "work-style-sub" &&
      signal.subKey === subKey &&
      signal.level > max
    ) {
      max = signal.level;
    }
  }
  return max;
}

function mapOrdinalLevel(
  level: 0 | 1 | 2 | 3,
  maxLevel: number,
): DimensionLevelV2 {
  if (maxLevel <= 0) {
    throw new Error("maxLevelForThatQuestionSignal must be > 0");
  }
  return asDimensionLevel(
    roundHalfUp(level * FIXED_POINT_SCALE, maxLevel),
  );
}

function mapTradeoffPole(
  pole: "stability" | "balance" | "upside",
): DimensionLevelV2 {
  switch (pole) {
    case "stability":
      return asDimensionLevel(0);
    case "balance":
      return asDimensionLevel(5000);
    case "upside":
      return asDimensionLevel(FIXED_POINT_SCALE);
  }
}

function mergeShiftSchedule(
  c01HardReject: boolean,
  c01Soft: DimensionLevelV2 | null,
  p10Soft: DimensionLevelV2 | null,
): DimensionLevelV2 | null {
  if (c01HardReject) {
    return asDimensionLevel(0);
  }
  if (c01Soft !== null && p10Soft !== null) {
    return asDimensionLevel(
      roundHalfUp(c01Soft + p10Soft, 2),
    );
  }
  if (c01Soft !== null) return c01Soft;
  if (p10Soft !== null) return p10Soft;
  return null;
}

function emptyFamilyHits(): Record<OccupationFamilyIdV2, number> {
  const hits = {} as Record<OccupationFamilyIdV2, number>;
  for (const family of OCCUPATION_FAMILY_IDS_V2) {
    hits[family] = 0;
  }
  return hits;
}

function buildFamilyAffinity(
  hits: Record<OccupationFamilyIdV2, number>,
): FamilyAffinityV2 {
  const affinity = {} as FamilyAffinityV2;
  for (const family of OCCUPATION_FAMILY_IDS_V2) {
    const denominator = FAMILY_APPEARANCE_OPPORTUNITIES_V2[family];
    const raw = roundHalfUp(
      hits[family] * FIXED_POINT_SCALE,
      denominator,
    );
    affinity[family] = asDimensionLevel(
      Math.min(FIXED_POINT_SCALE, raw),
    );
  }
  return affinity;
}

function buildActiveComponents(args: {
  soft: UserSoftProfileV2;
  interestSubstantive: boolean;
}): ActiveScoringComponentsV2 {
  const active = new Set<ScoringComponentKeyV2>();
  const { soft, interestSubstantive } = args;

  for (const key of SCORING_COMPONENT_KEYS_V2) {
    switch (key) {
      case "workStyleFit": {
        const anySub = WORK_STYLE_SUB_KEYS_V2.some(
          (sub) => soft.workStyleFit[sub] !== null,
        );
        if (anySub) active.add(key);
        break;
      }
      case "physicalDemandTolerance":
        if (soft.physicalDemandTolerance !== null) active.add(key);
        break;
      case "indoorOutdoorPreference":
        if (soft.indoorOutdoorPreference !== null) active.add(key);
        break;
      case "customerFacingTolerance":
        if (soft.customerFacingTolerance !== null) active.add(key);
        break;
      case "englishReadiness":
        if (soft.englishReadiness !== null) active.add(key);
        break;
      case "trainingDurationTolerance":
        if (soft.trainingDurationTolerance !== null) active.add(key);
        break;
      case "formalEntryWillingness":
        if (soft.formalEntryWillingness !== null) active.add(key);
        break;
      case "shiftScheduleTolerance":
        if (soft.shiftScheduleTolerance !== null) active.add(key);
        break;
      case "stabilityVersusUpside":
        if (soft.stabilityVersusUpside !== null) active.add(key);
        break;
      case "detailVersusCoordination":
        if (soft.detailVersusCoordination !== null) active.add(key);
        break;
      case "careerEntryPracticality":
        if (soft.careerEntryPracticality !== null) active.add(key);
        break;
      case "fieldInterestAffinity":
        if (interestSubstantive) active.add(key);
        break;
    }
  }

  return active;
}

/**
 * Build a complete UserProfileV2 from validated answers.
 * Dual-write and ordinal mapping live here — not in the question bank.
 */
export function buildUserProfileV2(
  answers: ValidatedAnswersV2,
): UserProfileV2 {
  const rawAnswers = answers.answers;

  const constraints: HardConstraintsV2 = {
    rejectsNightOrRotating: false,
    rejectsHeavyPhysical: false,
  };

  const workStyleFit: Record<WorkStyleSubKeyV2, DimensionLevelV2 | null> = {
    independentTeam: null,
    handsOnDesk: null,
    structureJudgment: null,
    routineVariety: null,
    leadershipResponsibility: null,
  };

  let physicalDemandTolerance: DimensionLevelV2 | null = null;
  let indoorOutdoorPreference: DimensionLevelV2 | null = null;
  let customerFacingTolerance: DimensionLevelV2 | null = null;
  let englishReadiness: DimensionLevelV2 | null = null;
  let trainingDurationTolerance: DimensionLevelV2 | null = null;
  let formalEntryWillingness: DimensionLevelV2 | null = null;
  let stabilityVersusUpside: DimensionLevelV2 | null = null;
  let detailVersusCoordination: DimensionLevelV2 | null = null;
  let careerEntryPracticality: EntryPaceCategoryV2 | null = null;

  /** Active soft contribution from c01 (before final merge). */
  let c01SoftContribution: DimensionLevelV2 | null = null;
  let c01HardReject = false;
  /** Active soft contribution from p10. */
  let p10SoftContribution: DimensionLevelV2 | null = null;

  const familyHits = emptyFamilyHits();
  let interestSubstantive = false;

  // Process all 26 answers via canonical bank signals (QUESTION_IDS_V2 order).
  for (const questionId of QUESTION_IDS_V2) {
    const optionId = rawAnswers[questionId];
    const signal = getAnswerOptionV2(questionId, optionId).signal;

    switch (signal.kind) {
      case "hard-constraint": {
        if (signal.constraint === "rejectsNightOrRotating") {
          constraints.rejectsNightOrRotating = true;
          c01HardReject = true;
          // Dual-write soft contribution 0 (D1 / D5); final merge ignores p10.
          c01SoftContribution = asDimensionLevel(0);
        } else if (signal.constraint === "rejectsHeavyPhysical") {
          constraints.rejectsHeavyPhysical = true;
          // Dual-write physicalDemandTolerance = 0 (D5).
          physicalDemandTolerance = asDimensionLevel(0);
        }
        break;
      }
      case "ordinal-soft": {
        const maxLevel = maxOrdinalLevelForQuestion(
          questionId,
          signal.dimension,
        );
        const mapped = mapOrdinalLevel(signal.level, maxLevel);
        switch (signal.dimension) {
          case "shiftScheduleTolerance":
            if (questionId === "v2-c01") {
              c01SoftContribution = mapped;
            } else if (questionId === "v2-p10") {
              p10SoftContribution = mapped;
            }
            break;
          case "physicalDemandTolerance":
            physicalDemandTolerance = mapped;
            break;
          case "englishReadiness":
            englishReadiness = mapped;
            break;
          case "trainingDurationTolerance":
            trainingDurationTolerance = mapped;
            break;
          case "formalEntryWillingness":
            formalEntryWillingness = mapped;
            break;
          case "indoorOutdoorPreference":
            indoorOutdoorPreference = mapped;
            break;
          case "customerFacingTolerance":
            customerFacingTolerance = mapped;
            break;
          case "stabilityVersusUpside":
            // Tradeoff uses pole mapping, not ordinal-soft in the bank.
            break;
          case "detailVersusCoordination":
            detailVersusCoordination = mapped;
            break;
        }
        break;
      }
      case "work-style-sub": {
        const maxLevel = maxWorkStyleLevelForQuestion(
          questionId,
          signal.subKey,
        );
        workStyleFit[signal.subKey] = mapOrdinalLevel(signal.level, maxLevel);
        break;
      }
      case "entry-pace": {
        careerEntryPracticality = signal.category;
        break;
      }
      case "tradeoff": {
        if (signal.dimension === "stabilityVersusUpside") {
          stabilityVersusUpside = mapTradeoffPole(signal.pole);
        }
        break;
      }
      case "interest-family": {
        interestSubstantive = true;
        familyHits[signal.family] += 1;
        break;
      }
      case "neutral":
        // Explicit inactive — leave destination null / no family hit.
        break;
    }
  }

  const shiftScheduleTolerance = mergeShiftSchedule(
    c01HardReject,
    c01SoftContribution,
    p10SoftContribution,
  );

  const soft: UserSoftProfileV2 = {
    workStyleFit,
    physicalDemandTolerance,
    indoorOutdoorPreference,
    customerFacingTolerance,
    englishReadiness,
    trainingDurationTolerance,
    formalEntryWillingness,
    shiftScheduleTolerance,
    stabilityVersusUpside,
    detailVersusCoordination,
    careerEntryPracticality,
  };

  const familyAffinity = buildFamilyAffinity(familyHits);
  const activeComponents = buildActiveComponents({
    soft,
    interestSubstantive,
  });

  return {
    constraints,
    soft,
    familyAffinity,
    meta: {
      careerTestVersion: CAREER_TEST_V2_VERSION,
      schemaVersion: CAREER_TEST_V2_SCHEMA_VERSION,
    },
    activeComponents,
  };
}
