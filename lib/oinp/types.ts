/**
 * Ontario immigration domain types — V2.4 OWP Job Offer pathway.
 *
 * Canonical scorer input uses Human-Verified option IDs only (P3.2.1).
 * No React / UI. Points live only in `tables/` (read by scorers in P3.2.2+).
 */

import type { BreakdownRow, ToolOutcome } from "@/lib/engine/types";

/** V2.4 MVP pathway — do not extend without a new phase. */
export type OwpApplicantKind = "job-offer";

export type OwpOntarioWorkExperienceMode =
  | "in-offer-position"
  | "ontario-general";

export const OWP_ONTARIO_WORK_EXPERIENCE_MODES = [
  "in-offer-position",
  "ontario-general",
] as const satisfies readonly OwpOntarioWorkExperienceMode[];

/**
 * Canonical Job Offer scoring input.
 * Every `*OptionId` must be a verified id from the matching HV table family.
 */
export interface OwpScoringInput {
  applicantKind: OwpApplicantKind;

  nocTeerOptionId: string;
  nocBroadOptionId: string;

  wageOptionId: string;

  ontarioWorkExperience: {
    mode: OwpOntarioWorkExperienceMode;
    optionId: string;
  };

  earningsOptionId: string;
  statusOptionId: string;
  educationOptionId: string;
  canadianCredentialOptionId: string;

  languageAbilityOptionId: string;
  languageKnowledgeOptionId: string;

  regionOptionId: string;
}

/** @deprecated Use `OwpScoringInput`. Alias retained for call-site migration only. */
export type OwpInput = OwpScoringInput;

/** Keys usable as validation `field` (including nested experience). */
export type OwpScoringInputField =
  | keyof OwpScoringInput
  | "ontarioWorkExperience.mode"
  | "ontarioWorkExperience.optionId";

/** @deprecated Use `OwpScoringInputField`. */
export type OwpInputField = OwpScoringInputField;

/**
 * Estimated EOI result from Human-Verified factor tables.
 */
export interface OwpResult {
  stream: "ontario-workforce-priority";
  pathway: "job-offer";
  total: number;
  breakdown: BreakdownRow[];
  /**
   * `implemented` — factor scorers produced a real total (P3.2.2+).
   * `not_implemented` — retained for transitional typing only.
   */
  scoringStatus: "not_implemented" | "implemented";
}

export type OwpCalculationResult = ToolOutcome<OwpScoringInput, OwpResult>;

export interface OwpValidationSuccess {
  ok: true;
  input: OwpScoringInput;
}

export interface OwpValidationFailure {
  ok: false;
  /** Echo of the attempted input (may be partial / malformed). */
  input: OwpScoringInput;
  error: string;
  field?: OwpScoringInputField;
  /** Stable machine code for tests and UI mapping. */
  code: string;
}

export type OwpValidationResult = OwpValidationSuccess | OwpValidationFailure;
