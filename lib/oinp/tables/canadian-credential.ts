/**
 * Canadian education credentials factor — sources only (P2.2).
 */

import {
  createPendingOwpFactorSource,
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  type OfficialFactorTable,
} from "./types";

export const OINP_CANADIAN_CREDENTIAL_TABLE: OfficialFactorTable = {
  factorId: "canadian-credential",
  title: "Number of Canadian education credentials",
  source: createPendingOwpFactorSource({
    effectiveNote:
      "Primary: OWP stream page → Scoring factors → Education → Number of Canadian education credentials (eligible institutions listed on the same stream page — lists are context for P2.3, not copied here). Cross-check: applicant checklist EOI scoring documents.",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
  }),
  options: [],
};
