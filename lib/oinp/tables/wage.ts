/**
 * Hourly wage factor — sources only (P2.2).
 */

import {
  createPendingOwpFactorSource,
  OWP_APPLICATION_PROCESS_TITLE,
  OWP_APPLICATION_PROCESS_URL,
  type OfficialFactorTable,
} from "./types";

export const OINP_WAGE_TABLE: OfficialFactorTable = {
  factorId: "wage",
  title: "Job offer — hourly wage",
  source: createPendingOwpFactorSource({
    effectiveNote:
      "Primary: OWP stream page → Scoring factors → Hourly wage (job-offer path; not applicable to self-employed physicians). Cross-check: application process notes NOC/wage prepopulated from employer job offer and points to stream-page scoring factors.",
    crossCheckUrl: OWP_APPLICATION_PROCESS_URL,
    crossCheckTitle: OWP_APPLICATION_PROCESS_TITLE,
    crossCheckStrength: "official-cross-check",
  }),
  options: [],
};
