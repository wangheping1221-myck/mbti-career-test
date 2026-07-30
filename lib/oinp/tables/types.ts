/**
 * Structural types for OWP official factor tables.
 * P2.2 records official sources only — no points or option lists.
 */

/** Lifecycle of a factor table relative to Human Verify. */
export type OfficialTableStatus =
  | "draft"
  | "pending-human-verify"
  | "human-verified"
  | "superseded";

/**
 * How strongly an ontario.ca / e-Laws reference supports scoring use.
 * - primary-rule-source: published Scoring factors (or equivalent) for active OWP
 * - official-cross-check: another official page that confirms / points to the rule
 * - official-context-only: process, eligibility, checklist, or portal context — not the points grid
 * - historical-do-not-score: closed-stream pages — never use for OWP points
 */
export type OfficialSourceStrength =
  | "primary-rule-source"
  | "official-cross-check"
  | "official-context-only"
  | "historical-do-not-score";

export interface OfficialTableSource {
  sourceUrl: string;
  sourceTitle: string;
  /** Strength of the primary `sourceUrl` for this factor. */
  sourceStrength: OfficialSourceStrength;
  crossCheckUrl?: string;
  crossCheckTitle?: string;
  /** Strength of the cross-check URL, when present. */
  crossCheckStrength?: OfficialSourceStrength;
  /** ISO date of source collection / retrieval (P2.2+). */
  retrievedOn: string;
  effectiveNote?: string;
  verificationStatus: OfficialTableStatus;
  verificationNote?: string;
  /** Set when primary scoring source is unclear — must be empty before P2.3 value entry. */
  unresolvedSourceNote?: string;
}

/**
 * One selectable scoring band / option.
 * `points` and per-option verification fields are filled only during Human Verify.
 */
export interface OfficialTableOption {
  id: string;
  label: string;
  description?: string;
  points?: number;
  /** Official page used for this option (usually the OWP stream Scoring factors URL). */
  sourceUrl?: string;
  /** ISO date when this option was transcribed / verified. */
  retrievedOn?: string;
  /** True only after value-by-value Human Verify for this option. */
  verified?: boolean;
  notes?: string;
}

export interface OfficialFactorTable<TOption extends OfficialTableOption = OfficialTableOption> {
  factorId: string;
  title: string;
  source: OfficialTableSource;
  options: readonly TOption[];
}

/** Canonical OWP stream Scoring factors URL (primary rule source for all active factors). */
export const OWP_STREAM_SCORING_SOURCE_URL =
  "https://www.ontario.ca/page/ontario-workforce-priority-stream" as const;

export const OWP_STREAM_SCORING_SOURCE_TITLE =
  "Ontario Workforce Priority stream — Scoring factors — ontario.ca" as const;

export const OWP_APPLICATION_PROCESS_URL =
  "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp-application-process" as const;

export const OWP_APPLICATION_PROCESS_TITLE =
  "Ontario Immigrant Nominee Program (OINP) application process — ontario.ca" as const;

export const OWP_PROGRAM_UPDATES_URL =
  "https://www.ontario.ca/page/2026-ontario-immigrant-nominee-program-updates" as const;

export const OWP_PROGRAM_UPDATES_TITLE =
  "2026 Ontario Immigrant Nominee Program Updates — ontario.ca" as const;

export const OWP_APPLICANT_CHECKLIST_URL =
  "https://www.ontario.ca/document/oinp-document-checklists/ontario-workforce-priority-stream-applicant-checklist" as const;

export const OWP_APPLICANT_CHECKLIST_TITLE =
  "Ontario Workforce Priority Stream — applicant checklist — ontario.ca" as const;

/** P2.2 source-collection date (ISO). */
export const OWP_SOURCE_COLLECTION_RETRIEVED_ON = "2026-07-29" as const;

/**
 * Build pending-HV source metadata for an active OWP Job Offer factor.
 * Does not attach options or points.
 */
export function createPendingOwpFactorSource(args: {
  effectiveNote: string;
  crossCheckUrl?: string;
  crossCheckTitle?: string;
  crossCheckStrength?: OfficialSourceStrength;
  unresolvedSourceNote?: string;
}): OfficialTableSource {
  return {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: args.crossCheckUrl ?? OWP_APPLICATION_PROCESS_URL,
    crossCheckTitle: args.crossCheckTitle ?? OWP_APPLICATION_PROCESS_TITLE,
    crossCheckStrength: args.crossCheckStrength ?? "official-cross-check",
    retrievedOn: OWP_SOURCE_COLLECTION_RETRIEVED_ON,
    effectiveNote: args.effectiveNote,
    verificationStatus: "pending-human-verify",
    verificationNote:
      "Official sources recorded (P2.2). Numeric options and points not yet entered or Human-Verified (P2.3+).",
    unresolvedSourceNote: args.unresolvedSourceNote,
  };
}
