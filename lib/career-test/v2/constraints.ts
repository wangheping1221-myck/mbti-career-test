/**
 * Career Test V2 — hard-constraint and graded-exposure contracts (V2.4B).
 * Types and activator constants only — no evaluation implementation.
 *
 * Activators: v2-c01(a), v2-c02(a) only. English never hard-filters.
 * Exclusion boundary (V2.4A): common-or-required / frequent-high;
 * possible / moderate remain caution-only.
 */

import type { OptionIdV2, QuestionIdV2 } from "./ids";

export interface HardConstraintsV2 {
  /** True iff validated answer v2-c01 === "a". */
  rejectsNightOrRotating: boolean;
  /** True iff validated answer v2-c02 === "a". */
  rejectsHeavyPhysical: boolean;
}

export type NightRotatingExposureV2 =
  | "not-typical"
  | "possible"
  | "common-or-required";

export type HeavyPhysicalExposureV2 = "low" | "moderate" | "frequent-high";

export interface CareerConstraintProfileV2 {
  nightRotatingExposure: NightRotatingExposureV2;
  heavyPhysicalExposure: HeavyPhysicalExposureV2;
}

export type ConstraintExclusionCodeV2 = "night_or_rotating" | "heavy_physical";

export interface ConstraintEvaluationV2 {
  eligible: boolean;
  exclusionReasons: Array<{
    code: ConstraintExclusionCodeV2;
    questionId: "v2-c01" | "v2-c02";
    optionId: "a";
  }>;
}

export type HardFilterActivatorV2 = {
  readonly questionId: Extract<QuestionIdV2, "v2-c01" | "v2-c02">;
  readonly optionId: Extract<OptionIdV2, "a">;
};

/**
 * Exact hard-filter activators. No other question/option pair is a hard filter.
 * English (v2-c03) is intentionally absent.
 */
export const HARD_FILTER_ACTIVATORS_V2 = [
  { questionId: "v2-c01", optionId: "a" },
  { questionId: "v2-c02", optionId: "a" },
] as const satisfies readonly HardFilterActivatorV2[];

type AssertLen<T extends readonly unknown[], N extends number> =
  T["length"] extends N ? true : never;

const _assertActivatorCount: AssertLen<typeof HARD_FILTER_ACTIVATORS_V2, 2> =
  true;
void _assertActivatorCount;

/** Documented exclusion thresholds (types only — evaluation in V2.4F). */
export type NightHardExcludeExposureV2 = Extract<
  NightRotatingExposureV2,
  "common-or-required"
>;
export type HeavyHardExcludeExposureV2 = Extract<
  HeavyPhysicalExposureV2,
  "frequent-high"
>;
export type NightCautionExposureV2 = Extract<NightRotatingExposureV2, "possible">;
export type HeavyCautionExposureV2 = Extract<
  HeavyPhysicalExposureV2,
  "moderate"
>;
