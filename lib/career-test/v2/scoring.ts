/**
 * Career Test V2 — scoring / ranking / display contracts (V2.4B).
 * Structural types and FIXED_POINT_SCALE only.
 * No default config, production weights, thresholds, or score formulas.
 *
 * fieldInterestAffinity is a ScoringComponentKeyV2 computed as
 * user.familyAffinity[career.primaryFamily] — not stored on profiles.
 */

import type { CareerIdV2, OccupationFamilyIdV2 } from "./ids";
import type { ScoringComponentKeyV2 } from "./dimensions";
import type { ReasonBundleV2, ReasonCodeV2 } from "./reasons";

export const FIXED_POINT_SCALE = 10_000 as const;

declare const fixedPointWeightBrand: unique symbol;
/** Non-negative integer weight units; calibrated configs sum to FIXED_POINT_SCALE. */
export type FixedPointWeightV2 = number & {
  readonly [fixedPointWeightBrand]: "FixedPointWeightV2";
};

declare const fixedPointScoreBrand: unique symbol;
export type FixedPointScoreV2 = number & {
  readonly [fixedPointScoreBrand]: "FixedPointScoreV2";
};

/**
 * Structural scoring config. Do not instantiate with production values here.
 * Once calibrated (later phase), weights must sum to FIXED_POINT_SCALE and
 * fieldInterestAffinity weight must be <= 0.20 * FIXED_POINT_SCALE.
 */
export interface ScoringConfigV2 {
  schemaVersion: number;
  dataVersion: string;
  weights: Record<ScoringComponentKeyV2, FixedPointWeightV2>;
  workStyleSubWeights?: Record<
    | "independentTeam"
    | "handsOnDesk"
    | "structureJudgment"
    | "routineVariety"
    | "leadershipResponsibility",
    FixedPointWeightV2
  >;
  familyAppearanceOpportunities: Record<OccupationFamilyIdV2, number>;
  fixedPointScale: typeof FIXED_POINT_SCALE;
  matchBands: {
    highMin: FixedPointScoreV2;
    moderateMin: FixedPointScoreV2;
  };
  bandEvidenceGates?: {
    highMinCoverage: number;
    moderateMinCoverage: number;
  };
  similarityCapPerGroupInTop5: 1;
}

export type MatchBandV2 = "high" | "moderate" | "explore";

/** Initial V2 — bands only; no percentage field. */
export type MatchDisplayV2 = {
  mode: "band";
  band: MatchBandV2;
};

export interface CareerScoreV2 {
  careerId: CareerIdV2;
  rawScoreFixed: FixedPointScoreV2;
  /** 0–1 coverage; not part of rawScore; not a tie-breaker. */
  evidenceCoverage: number;
  componentNotes?: readonly string[];
}

export type NoScoringEvidenceV2 = {
  ok: false;
  code: "no_scoring_evidence";
};

export type ScoreCareerResultV2 = CareerScoreV2 | NoScoringEvidenceV2;

export interface RankedCareerV2 {
  careerId: CareerIdV2;
  rawScoreFixed: FixedPointScoreV2;
  rank: number;
  hardFilterStatus: "eligible";
  reasonCodes: readonly ReasonCodeV2[];
  reasonsZh: readonly string[];
  warningsZh?: readonly string[];
  matchDisplay: MatchDisplayV2;
  evidenceCoverage: number;
  reasons?: ReasonBundleV2;
}

export type RecommendationOutcomeV2 =
  | "top5"
  | "partial"
  | "no_exact_match"
  | "no_scoring_evidence";

export interface CareerRecommendationV2 {
  top: readonly RankedCareerV2[];
  eligibleCount: number;
  outcome: RecommendationOutcomeV2;
  runnersUpInternal?: readonly RankedCareerV2[];
}

type _MatchDisplayHasNoPercent = MatchDisplayV2 extends {
  relativePercent?: unknown;
}
  ? never
  : MatchDisplayV2 extends { percent?: unknown }
    ? never
    : true;
const _assertBandsOnly: _MatchDisplayHasNoPercent = true;
void _assertBandsOnly;

type _FixedPointScaleIs10000 = typeof FIXED_POINT_SCALE extends 10000
  ? true
  : never;
const _assertScale: _FixedPointScaleIs10000 = true;
void _assertScale;
