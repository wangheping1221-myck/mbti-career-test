/**
 * OINP / OWP package metadata (V2.4).
 *
 * Official scoring tables live under `tables/` and remain empty of points until
 * Human Verify (P2.3+). Portal / e-Filing open status is time-sensitive context
 * only — see `tables/sources.ts` → `OINP_OWP_PORTAL_STATUS_CONTEXT`.
 */

import {
  OWP_APPLICATION_PROCESS_TITLE,
  OWP_APPLICATION_PROCESS_URL,
  OWP_PROGRAM_UPDATES_TITLE,
  OWP_PROGRAM_UPDATES_URL,
  OWP_SOURCE_COLLECTION_RETRIEVED_ON,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./tables/types";

/**
 * Package-level official source pointers for Ontario Workforce Priority
 * (Job Offer pathway). Factor-level detail: `tables/` + `tables/sources.ts`.
 */
export const OINP_OWP_SOURCE = {
  stream: "ontario-workforce-priority",
  pathway: "job-offer",
  sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
  sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
  crossCheckUrl: OWP_PROGRAM_UPDATES_URL,
  crossCheckTitle: OWP_PROGRAM_UPDATES_TITLE,
  applicationProcessUrl: OWP_APPLICATION_PROCESS_URL,
  applicationProcessTitle: OWP_APPLICATION_PROCESS_TITLE,
  /** ISO date of P2.2 official source collection (not value verification). */
  retrievedOn: OWP_SOURCE_COLLECTION_RETRIEVED_ON,
  effectiveNote:
    "Single Ontario Workforce Priority stream; former Employer Job Offer multi-stream pages are historical-do-not-score. Official Scoring factors primary URL is the OWP stream page. EOI / e-Filing availability is time-sensitive — see Updates and OINP_OWP_PORTAL_STATUS_CONTEXT. Scoring option points not entered until P2.3 Human Verify.",
} as const;

/**
 * Sign-off flag. Remains false until official scoring tables are verified (P2.4/P5).
 */
export const OINP_OWP_HUMAN_VERIFIED = false;

/**
 * Placeholder note until Sign-off.
 */
export const OINP_OWP_HUMAN_VERIFIED_NOTE =
  "Not verified yet. P2.2 recorded official sources only. Numeric OWP EOI scoring factors must be Human-Verified against ontario.ca before treating calculator results as production-ready.";

/**
 * Build-time reminder: enter and verify band→points on ontario.ca (P2.3+).
 */
export const OINP_OWP_HUMAN_VERIFY_TODO =
  "TODO: Human must enter and verify Ontario Workforce Priority EOI scoring factor options and points from the OWP stream Scoring factors page (value-by-value) before calculator use. Sources collected in P2.2; values not yet verified.";
