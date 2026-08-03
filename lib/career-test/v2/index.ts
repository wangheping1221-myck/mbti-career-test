/**
 * Career Test V2 — public barrel (V2.4B).
 * Re-exports only. Do not import this module from sibling v2 modules.
 */

export {
  CAREER_TEST_V2_VERSION,
  CAREER_TEST_V2_SCHEMA_VERSION,
  QUESTION_IDS_V2,
  OPTION_IDS_V2,
  OCCUPATION_FAMILY_IDS_V2,
  OCCUPATION_FAMILY_LABELS_ZH,
  CAREER_IDS_V2,
  SIMILARITY_GROUP_IDS_V2,
  type QuestionIdV2,
  type OptionIdV2,
  type OccupationFamilyIdV2,
  type CareerIdV2,
  type SimilarityGroupIdV2,
  type CareerLadderGroupIdV2,
} from "./ids";

export {
  SOFT_DIMENSION_KEYS_V2,
  SCORING_COMPONENT_KEYS_V2,
  WORK_STYLE_SUB_KEYS_V2,
  ENTRY_PACE_CATEGORIES_V2,
  type SoftDimensionKeyV2,
  type ScoringComponentKeyV2,
  type DimensionLevelV2,
  type WorkStyleSubKeyV2,
  type WorkStyleProfileV2,
  type EntryPaceCategoryV2,
} from "./dimensions";

export type {
  QuestionSectionV2,
  OptionSignalV2,
  AnswerOptionV2,
  QuestionV2,
} from "./questions";

export type {
  PartialAnswersV2,
  ValidatedAnswersV2,
  AnswerValidationErrorV2,
  ValidateAnswersResultV2,
  ValidateAnswersV2Fn,
} from "./answers";

export {
  HARD_FILTER_ACTIVATORS_V2,
  type HardConstraintsV2,
  type NightRotatingExposureV2,
  type HeavyPhysicalExposureV2,
  type CareerConstraintProfileV2,
  type ConstraintExclusionCodeV2,
  type ConstraintEvaluationV2,
  type HardFilterActivatorV2,
  type NightHardExcludeExposureV2,
  type HeavyHardExcludeExposureV2,
  type NightCautionExposureV2,
  type HeavyCautionExposureV2,
} from "./constraints";

export type {
  VerificationStatusV2,
  VerificationArtifactV2,
  CareerVerificationV2,
} from "./verification";

export type {
  FamilyAffinityV2,
  UserSoftProfileV2,
  ActiveScoringComponentsV2,
  UserProfileV2,
  CareerDimensionProfileV2,
  PremiumFieldsV2,
  CareerProfileV2,
  ComputedFieldInterestAffinityFitV2,
} from "./profiles";

export type {
  ReasonKindV2,
  ReasonCodeV2,
  ReasonDefV2,
  ReasonBundleV2,
} from "./reasons";

export {
  FIXED_POINT_SCALE,
  type FixedPointWeightV2,
  type FixedPointScoreV2,
  type ScoringConfigV2,
  type MatchBandV2,
  type MatchDisplayV2,
  type CareerScoreV2,
  type NoScoringEvidenceV2,
  type ScoreCareerResultV2,
  type RankedCareerV2,
  type RecommendationOutcomeV2,
  type CareerRecommendationV2,
} from "./scoring";
