/**
 * Ontario work experience factor — sources only (P2.2).
 */

import {
  createPendingOwpFactorSource,
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  type OfficialFactorTable,
} from "./types";

export const OINP_ONTARIO_WORK_EXPERIENCE_TABLE: OfficialFactorTable = {
  factorId: "ontario-work-experience",
  title: "Ontario work experience",
  source: createPendingOwpFactorSource({
    effectiveNote:
      "Primary: OWP stream page → Scoring factors → Ontario work experience (job-offer applicants; separate physician medical-practice bands on the same page are out of V2.4 Job Offer MVP scope). Cross-check: applicant checklist EOI scoring documents for claimed work experience. Branching rules and points deferred to P2.3.",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
  }),
  options: [],
};
