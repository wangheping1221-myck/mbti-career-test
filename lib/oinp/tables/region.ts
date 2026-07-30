/**
 * Regionalization / work location factor — sources only (P2.2).
 */

import {
  createPendingOwpFactorSource,
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  type OfficialFactorTable,
} from "./types";

export const OINP_REGION_TABLE: OfficialFactorTable = {
  factorId: "region",
  title: "Regionalization — location of work in job offer",
  source: createPendingOwpFactorSource({
    effectiveNote:
      "Primary: OWP stream page → Scoring factors → Regionalization → Regional immigration: location of work location in job offer (region definitions on the same page). Cross-check: applicant checklist EOI scoring documents. Region lists and points deferred to P2.3.",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
  }),
  options: [],
};
