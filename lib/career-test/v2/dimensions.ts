/**
 * Career Test V2 — soft dimensions and scoring-component keys (V2.4B).
 *
 * V2.4A supersedes V2.3's 12-key SoftDimensionKeyV2 that included
 * fieldInterestAffinity. SoftDimensionKeyV2 is exactly 11 non-affinity keys.
 * fieldInterestAffinity is a computed ScoringComponentKeyV2 only.
 */

export const SOFT_DIMENSION_KEYS_V2 = [
  "workStyleFit",
  "physicalDemandTolerance",
  "indoorOutdoorPreference",
  "customerFacingTolerance",
  "englishReadiness",
  "trainingDurationTolerance",
  "formalEntryWillingness",
  "shiftScheduleTolerance",
  "stabilityVersusUpside",
  "detailVersusCoordination",
  "careerEntryPracticality",
] as const;

export type SoftDimensionKeyV2 = (typeof SOFT_DIMENSION_KEYS_V2)[number];

export const SCORING_COMPONENT_KEYS_V2 = [
  ...SOFT_DIMENSION_KEYS_V2,
  "fieldInterestAffinity",
] as const;

export type ScoringComponentKeyV2 = (typeof SCORING_COMPONENT_KEYS_V2)[number];

/**
 * Integer fixed-point level in conceptual range 0..FIXED_POINT_SCALE (10000).
 * Brand is compile-time only; runtime range checks belong to V2.4C/V2.4D.
 */
declare const dimensionLevelBrand: unique symbol;
export type DimensionLevelV2 = number & {
  readonly [dimensionLevelBrand]: "DimensionLevelV2";
};

export const WORK_STYLE_SUB_KEYS_V2 = [
  "independentTeam",
  "handsOnDesk",
  "structureJudgment",
  "routineVariety",
  "leadershipResponsibility",
] as const;

export type WorkStyleSubKeyV2 = (typeof WORK_STYLE_SUB_KEYS_V2)[number];

/** Five sub-levels owned by career/user workStyleFit — not independent global weights. */
export type WorkStyleProfileV2 = Record<WorkStyleSubKeyV2, DimensionLevelV2>;

/** Categorical entry-pace — not a continuous DimensionLevelV2 ordinal. */
export const ENTRY_PACE_CATEGORIES_V2 = [
  "learn-on-job",
  "short-prep",
  "study-first",
] as const;

export type EntryPaceCategoryV2 = (typeof ENTRY_PACE_CATEGORIES_V2)[number];

type AssertLen<T extends readonly unknown[], N extends number> =
  T["length"] extends N ? true : never;

const _assertSoftCount: AssertLen<typeof SOFT_DIMENSION_KEYS_V2, 11> = true;
const _assertScoringCount: AssertLen<typeof SCORING_COMPONENT_KEYS_V2, 12> =
  true;
const _assertWorkStyleSubCount: AssertLen<typeof WORK_STYLE_SUB_KEYS_V2, 5> =
  true;

/** Compile-time: fieldInterestAffinity must not be a SoftDimensionKeyV2. */
type _FieldInterestNotSoft = "fieldInterestAffinity" extends SoftDimensionKeyV2
  ? never
  : true;
const _assertNoAffinityInSoft: _FieldInterestNotSoft = true;

void _assertSoftCount;
void _assertScoringCount;
void _assertWorkStyleSubCount;
void _assertNoAffinityInSoft;
