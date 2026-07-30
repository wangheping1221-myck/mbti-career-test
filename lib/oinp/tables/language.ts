/**
 * Official language factors — sources only (P2.2).
 */

import {
  createPendingOwpFactorSource,
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  type OfficialFactorTable,
} from "./types";

export const OINP_LANGUAGE_TABLE: OfficialFactorTable = {
  factorId: "language",
  title: "Official language ability / knowledge of official languages",
  source: createPendingOwpFactorSource({
    effectiveNote:
      "Primary: OWP stream page → Scoring factors → Language → Official language ability and Knowledge of official languages. Cross-check: applicant checklist EOI scoring documents for language. CLB bands and points deferred to P2.3. Stream-criteria language minima elsewhere on the page are eligibility context, not this scoring grid.",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
  }),
  options: [],
};
