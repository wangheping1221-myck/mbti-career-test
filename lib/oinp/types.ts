/**
 * Ontario immigration domain types — V2.4 OWP Job Offer pathway only.
 *
 * No React / UI. No scoring values, thresholds, or point ceilings.
 * Category IDs marked PROVISIONAL are scaffolding until Human Verify (P2).
 */

import type { BreakdownRow, ToolOutcome } from "@/lib/engine/types";

/** V2.4 MVP pathway — do not extend without a new phase. */
export type OwpApplicantKind = "job-offer";

/**
 * PROVISIONAL TEER bands for structural typing / validation only.
 * Final official option labels and scoring maps are confirmed in P2 Human Verify.
 */
export type OwpNocTeerCategory = "0-1" | "2-3" | "4" | "5";

export const PROVISIONAL_OWP_NOC_TEER_CATEGORIES = [
  "0-1",
  "2-3",
  "4",
  "5",
] as const satisfies readonly OwpNocTeerCategory[];

/**
 * PROVISIONAL opaque category ids (not official labels, not points).
 * Human Verify may replace, split, or rename these ids before scoring ships.
 */
export type OwpProvisionalCategoryId = string;

export type OwpOntarioWorkExperienceMode =
  | "in-offer-position"
  | "ontario-general";

export const PROVISIONAL_OWP_WORK_EXPERIENCE_MODES = [
  "in-offer-position",
  "ontario-general",
] as const satisfies readonly OwpOntarioWorkExperienceMode[];

export type OwpLegalStatusCategory =
  | "work-permit"
  | "study-permit"
  | "none";

export const PROVISIONAL_OWP_LEGAL_STATUS_CATEGORIES = [
  "work-permit",
  "study-permit",
  "none",
] as const satisfies readonly OwpLegalStatusCategory[];

export type OwpCanadianCredentialsCategory =
  | "none"
  | "one"
  | "more-than-one";

export const PROVISIONAL_OWP_CANADIAN_CREDENTIALS_CATEGORIES = [
  "none",
  "one",
  "more-than-one",
] as const satisfies readonly OwpCanadianCredentialsCategory[];

export type OwpOfficialLanguagesCategory = "one" | "two";

export const PROVISIONAL_OWP_OFFICIAL_LANGUAGES_CATEGORIES = [
  "one",
  "two",
] as const satisfies readonly OwpOfficialLanguagesCategory[];

/**
 * Structural input for the future OWP Job Offer EOI estimator.
 * All factor fields are category identifiers — never point values.
 */
export interface OwpInput {
  applicantKind: OwpApplicantKind;
  /** PROVISIONAL TEER grouping id */
  nocTeer: OwpNocTeerCategory;
  /** PROVISIONAL NOC broad occupational category id (pending HV) */
  nocBroadCategory: OwpProvisionalCategoryId;
  /** PROVISIONAL wage band id (pending HV) — not a dollar threshold */
  hourlyWageBand: OwpProvisionalCategoryId;
  ontarioWorkExperience: {
    mode: OwpOntarioWorkExperienceMode;
    /** PROVISIONAL duration / band id within the selected mode (pending HV) */
    band: OwpProvisionalCategoryId;
  };
  /** PROVISIONAL earnings-history band id (pending HV) */
  earningsHistoryBand: OwpProvisionalCategoryId;
  legalStatus: OwpLegalStatusCategory;
  /** PROVISIONAL highest-education band id (pending HV) */
  highestEducationBand: OwpProvisionalCategoryId;
  canadianCredentials: OwpCanadianCredentialsCategory;
  /** PROVISIONAL primary official-language ability band id (pending HV) */
  primaryLanguageBand: OwpProvisionalCategoryId;
  officialLanguages: OwpOfficialLanguagesCategory;
  /** PROVISIONAL work-location region id (pending HV) */
  workLocationRegion: OwpProvisionalCategoryId;
}

/** Keys of `OwpInput` usable as validation `field` (including nested experience). */
export type OwpInputField =
  | keyof OwpInput
  | "ontarioWorkExperience.mode"
  | "ontarioWorkExperience.band";

/**
 * Structural result shape for a future `calculateOwpEoi` (P3).
 * No calculation in P1.2 — types only.
 */
export interface OwpResult {
  stream: "ontario-workforce-priority";
  pathway: "job-offer";
  /** Estimated EOI total — populated only after Human-Verified scoring exists */
  total: number;
  breakdown: BreakdownRow[];
}

export type OwpCalculationResult = ToolOutcome<OwpInput, OwpResult>;

export interface OwpValidationSuccess {
  ok: true;
  input: OwpInput;
}

export interface OwpValidationFailure {
  ok: false;
  input: OwpInput;
  error: string;
  field?: OwpInputField;
}

export type OwpValidationResult = OwpValidationSuccess | OwpValidationFailure;
