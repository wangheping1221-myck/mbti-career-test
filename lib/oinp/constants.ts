/**
 * OINP / OWP metadata only (V2.4 P1.2).
 *
 * Official scoring tables, thresholds, and band→points maps are forbidden here
 * until Human Verify (P2). Portal / e-Filing open status is time-sensitive UI
 * copy — do not store a permanent reopening date in this file.
 */

/**
 * Official source pointers for Ontario Workforce Priority (Job Offer pathway).
 * `retrievedOn` remains empty until Human Verify records a retrieval date.
 */
export const OINP_OWP_SOURCE = {
  stream: "ontario-workforce-priority",
  pathway: "job-offer",
  sourceUrl:
    "https://www.ontario.ca/page/ontario-workforce-priority-stream",
  sourceTitle: "Ontario Workforce Priority stream — ontario.ca",
  crossCheckUrl:
    "https://www.ontario.ca/page/2026-ontario-immigrant-nominee-program-updates",
  crossCheckTitle: "2026 Ontario Immigrant Nominee Program Updates — ontario.ca",
  applicationProcessUrl:
    "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp-application-process",
  applicationProcessTitle:
    "Ontario Immigrant Nominee Program (OINP) application process — ontario.ca",
  /** ISO date filled during P2 Human Verify; empty until then. */
  retrievedOn: "" as string,
  effectiveNote:
    "Single Ontario Workforce Priority stream; former multi-stream Employer Job Offer pathways are closed. EOI / e-Filing availability is time-sensitive — follow ontario.ca Updates. Scoring tables are not loaded until Human Verify.",
} as const;

/**
 * Sign-off flag. Remains false until official scoring tables are verified and
 * Sign-off replaces the TODO (P5).
 */
export const OINP_OWP_HUMAN_VERIFIED = false;

/**
 * Placeholder note until Sign-off.
 */
export const OINP_OWP_HUMAN_VERIFIED_NOTE =
  "Not verified yet. Official OWP EOI scoring factors must be checked against ontario.ca before treating calculator results as production-ready.";

/**
 * Build-time reminder: open official OWP Scoring factors and record tables in P2.
 */
export const OINP_OWP_HUMAN_VERIFY_TODO =
  "TODO: Human must verify Ontario Workforce Priority EOI scoring factors on ontario.ca (stream page + Updates cross-check) before writing band→points tables or claiming official scoring.";
