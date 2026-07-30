/**
 * Legal status in Canada factor.
 *
 * P2.3.5 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables unchanged.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.5 Legal Status Factor Human Verify against ontario.ca. */
const STATUS_FACTOR_RETRIEVED_ON = "2026-07-30";

const STATUS_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedStatusOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: STATUS_OPTION_SOURCE,
    retrievedOn: STATUS_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors →
 * Legal status in Canada.
 *
 * Official note: The work or study permit must confer legal status.
 * Eligibility-section legal-status text elsewhere on the page is not this
 * scoring grid.
 */
export const OINP_STATUS_TABLE_OPTIONS: readonly OfficialTableOption[] = [
  verifiedStatusOption({
    id: "status-valid-work-permit",
    label: "With valid work permit",
    description: "Legal status in Canada",
    points: 10,
    notes:
      "Official subsection: Legal status in Canada. Official note: The work or study permit must confer legal status.",
  }),
  verifiedStatusOption({
    id: "status-valid-study-permit",
    label: "With valid study permit",
    description: "Legal status in Canada",
    points: 5,
    notes:
      "Official subsection: Legal status in Canada. Official note: The work or study permit must confer legal status.",
  }),
  verifiedStatusOption({
    id: "status-without-valid-work-or-study-permit",
    label: "Without valid work or study permit",
    description: "Legal status in Canada",
    points: 0,
    notes:
      "Official subsection: Legal status in Canada. Official note: The work or study permit must confer legal status.",
  }),
] as const;

export const OINP_STATUS_TABLE: OfficialFactorTable = {
  factorId: "status",
  title: "Legal status in Canada",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
    retrievedOn: STATUS_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.5 Human Verify complete for Legal Status Factor only. Values from OWP stream Scoring factors → Legal status in Canada. Official page states the work or study permit must confer legal status. Applicant checklist is context only. Eligibility-section legal status text is not used for points.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors → Legal status in Canada) on 2026-07-30. Three published options. No historical EJO values used.",
  },
  options: OINP_STATUS_TABLE_OPTIONS,
};
