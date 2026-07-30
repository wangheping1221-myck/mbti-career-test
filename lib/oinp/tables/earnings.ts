/**
 * Canadian earnings history factor — sources only (P2.2).
 */

import {
  createPendingOwpFactorSource,
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  type OfficialFactorTable,
} from "./types";

export const OINP_EARNINGS_TABLE: OfficialFactorTable = {
  factorId: "earnings",
  title: "Canadian work experience — earnings history",
  source: createPendingOwpFactorSource({
    effectiveNote:
      "Primary: OWP stream page → Scoring factors → Canadian work experience: earnings history (CRA Notice of Assessment). Cross-check: applicant checklist EOI scoring documents for earnings history. Numeric income bands deferred to P2.3.",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
  }),
  options: [],
};
