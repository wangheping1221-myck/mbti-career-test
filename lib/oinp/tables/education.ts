/**
 * Highest level of education factor — sources only (P2.2).
 */

import {
  createPendingOwpFactorSource,
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  type OfficialFactorTable,
} from "./types";

export const OINP_EDUCATION_TABLE: OfficialFactorTable = {
  factorId: "education",
  title: "Highest level of education",
  source: createPendingOwpFactorSource({
    effectiveNote:
      "Primary: OWP stream page → Scoring factors → Education → Highest level of education. Cross-check: applicant checklist EOI scoring documents for education. Education ladders and points deferred to P2.3.",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
  }),
  options: [],
};
