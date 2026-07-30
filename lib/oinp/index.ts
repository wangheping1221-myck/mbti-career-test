/**
 * Public `lib/oinp` exports for the OWP Job Offer domain pack.
 */

export {
  OINP_OWP_HUMAN_VERIFIED,
  OINP_OWP_HUMAN_VERIFIED_NOTE,
  OINP_OWP_HUMAN_VERIFY_TODO,
  OINP_OWP_SOURCE,
} from "./constants";

export { calculateOwpEoi } from "./calculator";

export { scoreOwpJobOfferFactors, sumFactorPoints } from "./scorer";

export { validateOwpInput } from "./validation";

export type { FactorScoreOutput } from "./factors/types";

export type {
  OwpApplicantKind,
  OwpCalculationResult,
  OwpInput,
  OwpInputField,
  OwpOntarioWorkExperienceMode,
  OwpResult,
  OwpScoringInput,
  OwpScoringInputField,
  OwpValidationFailure,
  OwpValidationResult,
  OwpValidationSuccess,
} from "./types";

export { OWP_ONTARIO_WORK_EXPERIENCE_MODES } from "./types";

export {
  OINP_OWP_TABLE_REGISTRY,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./tables";
