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
    "Single Ontario Workforce Priority stream; former Employer Job Offer multi-stream pages are historical-do-not-score. Official Scoring factors primary URL is the OWP stream page. EOI / e-Filing availability is time-sensitive — see Updates and OINP_OWP_PORTAL_STATUS_CONTEXT. Factor tables Human-Verified in P2.3; package signed off in P2.4.",
} as const;

/**
 * Package Human Verify sign-off (P2.4).
 * True only after every active OWP Job Offer factor table is human-verified
 * against the OWP stream Scoring factors page.
 */
export const OINP_OWP_HUMAN_VERIFIED = true;

/**
 * Sign-off note for Human Verify package review.
 */
export const OINP_OWP_HUMAN_VERIFIED_NOTE =
  "P2.4 package sign-off 2026-07-30. All nine active OWP Job Offer factor tables (job, wage, ontario-work-experience, earnings, status, education, canadian-credential, language, region) verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream Scoring factors. No historical EJO values used. Calculator scorers / UI remain P3+.";

/**
 * Retained for audit trail. Package values are signed off; re-check ontario.ca
 * before production calculator release if the official page changes.
 */
export const OINP_OWP_HUMAN_VERIFY_TODO =
  "DONE (P2.4): Official OWP EOI scoring factor options and points Human-Verified against the OWP stream Scoring factors page. Re-verify if ontario.ca publishes scoring-factor changes before calculator release.";
