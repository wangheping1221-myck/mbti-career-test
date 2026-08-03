/**
 * Career Test V2 — user and career profile contracts (V2.4B).
 *
 * V2.4A supersession: CareerDimensionProfileV2 has exactly 11 top-level keys.
 * fieldInterestAffinity is computed at scoring time as
 * familyAffinity[career.primaryFamily] — never stored here.
 */

import {
  CAREER_TEST_V2_SCHEMA_VERSION,
  CAREER_TEST_V2_VERSION,
  type CareerIdV2,
  type CareerLadderGroupIdV2,
  type OccupationFamilyIdV2,
  type SimilarityGroupIdV2,
} from "./ids";
import type {
  DimensionLevelV2,
  EntryPaceCategoryV2,
  SoftDimensionKeyV2,
  WorkStyleProfileV2,
  WorkStyleSubKeyV2,
} from "./dimensions";
import type {
  CareerConstraintProfileV2,
  HardConstraintsV2,
} from "./constraints";
import type {
  CareerVerificationV2,
  VerificationArtifactV2,
} from "./verification";

export type FamilyAffinityV2 = Record<OccupationFamilyIdV2, DimensionLevelV2>;

/**
 * Normalized user soft profile — complete 11 keys.
 * Inactive / no-evidence values are explicit null (never omitted keys, never 0.5 fill).
 */
export interface UserSoftProfileV2 {
  workStyleFit: Record<WorkStyleSubKeyV2, DimensionLevelV2 | null>;
  physicalDemandTolerance: DimensionLevelV2 | null;
  indoorOutdoorPreference: DimensionLevelV2 | null;
  customerFacingTolerance: DimensionLevelV2 | null;
  englishReadiness: DimensionLevelV2 | null;
  trainingDurationTolerance: DimensionLevelV2 | null;
  formalEntryWillingness: DimensionLevelV2 | null;
  shiftScheduleTolerance: DimensionLevelV2 | null;
  stabilityVersusUpside: DimensionLevelV2 | null;
  detailVersusCoordination: DimensionLevelV2 | null;
  careerEntryPracticality: EntryPaceCategoryV2 | null;
}

/** Optional active-component metadata shape — calculation deferred to V2.4C. */
export type ActiveScoringComponentsV2 = ReadonlySet<
  SoftDimensionKeyV2 | "fieldInterestAffinity"
>;

export interface UserProfileV2 {
  constraints: HardConstraintsV2;
  soft: UserSoftProfileV2;
  familyAffinity: FamilyAffinityV2;
  meta: {
    careerTestVersion: typeof CAREER_TEST_V2_VERSION;
    schemaVersion: typeof CAREER_TEST_V2_SCHEMA_VERSION;
  };
  /** Optional; not computed in V2.4B. */
  activeComponents?: ActiveScoringComponentsV2;
}

/**
 * Complete career soft profile — explicit 11-key shape (not Partial).
 * workStyleFit owns five required sub-levels (no separate workStyleSubProfile).
 * careerEntryPracticality is categorical.
 * Must not contain fieldInterestAffinity.
 */
export interface CareerDimensionProfileV2 {
  workStyleFit: WorkStyleProfileV2;
  physicalDemandTolerance: DimensionLevelV2;
  indoorOutdoorPreference: DimensionLevelV2;
  customerFacingTolerance: DimensionLevelV2;
  englishReadiness: DimensionLevelV2;
  trainingDurationTolerance: DimensionLevelV2;
  formalEntryWillingness: DimensionLevelV2;
  shiftScheduleTolerance: DimensionLevelV2;
  stabilityVersusUpside: DimensionLevelV2;
  detailVersusCoordination: DimensionLevelV2;
  careerEntryPracticality: EntryPaceCategoryV2;
}

/** Compile-time: SoftDimensionKeyV2 keys match CareerDimensionProfileV2 keys. */
type _CareerDimKeysMatch = SoftDimensionKeyV2 extends keyof CareerDimensionProfileV2
  ? keyof CareerDimensionProfileV2 extends SoftDimensionKeyV2
    ? true
    : never
  : never;
const _assertCareerDimKeys: _CareerDimKeysMatch = true;
void _assertCareerDimKeys;

export interface PremiumFieldsV2 {
  entryPathZh?: string;
  licensingSummaryZh?: string;
  suitabilityRiskZh?: string;
  nextStepsZh?: string;
}

export interface CareerProfileV2 {
  id: CareerIdV2;
  titleEn: string;
  titleZh: string;
  primaryFamily: OccupationFamilyIdV2;
  crossCuttingTags: readonly string[];
  constraints: CareerConstraintProfileV2;
  dimensionProfile: CareerDimensionProfileV2;
  descriptionZh: string;
  verification: CareerVerificationV2;
  mismatchNotesZh?: string;
  entryPathZh?: string;
  nextStepsZh?: string;
  premium?: PremiumFieldsV2;
  sources?: readonly VerificationArtifactV2[];
  similarityGroupId?: SimilarityGroupIdV2;
  careerLadderGroupId?: CareerLadderGroupIdV2;
}

/**
 * Computed scoring-component boundary (documentation for later phases).
 * fieldInterestAffinity fit = user.familyAffinity[career.primaryFamily]
 * — never stored on CareerProfileV2 / UserSoftProfileV2 / UserProfileV2.
 */
export type ComputedFieldInterestAffinityFitV2 = DimensionLevelV2;
