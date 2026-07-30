/**
 * Canadian work experience — earnings history factor.
 *
 * P2.3.4 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables unchanged.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.4 Earnings Factor Human Verify against ontario.ca. */
const EARNINGS_FACTOR_RETRIEVED_ON = "2026-07-30";

const EARNINGS_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedEarningsOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: EARNINGS_OPTION_SOURCE,
    retrievedOn: EARNINGS_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors →
 * Employment / labour market factors → Canadian work experience: earnings history.
 *
 * Official note: Based on a Notice of Assessment issued by the Canada Revenue
 * Agency in the last 5 years.
 */
export const OINP_EARNINGS_TABLE_OPTIONS: readonly OfficialTableOption[] = [
  verifiedEarningsOption({
    id: "earnings-70k-plus",
    label: "$70k or more earnings in a year",
    description: "Canadian work experience: earnings history",
    points: 8,
    notes:
      "Official subsection: Canadian work experience: earnings history. Based on a CRA Notice of Assessment in the last 5 years.",
  }),
  verifiedEarningsOption({
    id: "earnings-50k-69999",
    label: "$50k to $69,999",
    description: "Canadian work experience: earnings history",
    points: 6,
    notes:
      "Official subsection: Canadian work experience: earnings history. Based on a CRA Notice of Assessment in the last 5 years.",
  }),
  verifiedEarningsOption({
    id: "earnings-30k-49999",
    label: "$30k to $49,999",
    description: "Canadian work experience: earnings history",
    points: 4,
    notes:
      "Official subsection: Canadian work experience: earnings history. Based on a CRA Notice of Assessment in the last 5 years.",
  }),
  verifiedEarningsOption({
    id: "earnings-under-30k",
    label: "Under $30k earnings in a year",
    description: "Canadian work experience: earnings history",
    points: 0,
    notes:
      "Official subsection: Canadian work experience: earnings history. Based on a CRA Notice of Assessment in the last 5 years.",
  }),
] as const;

export const OINP_EARNINGS_TABLE: OfficialFactorTable = {
  factorId: "earnings",
  title: "Canadian work experience — earnings history",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
    retrievedOn: EARNINGS_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.4 Human Verify complete for Earnings Factor only. Values from OWP stream Scoring factors → Canadian work experience: earnings history. Official page states bands are based on a CRA Notice of Assessment issued in the last 5 years. Applicant checklist is context only.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors → Canadian work experience: earnings history) on 2026-07-30. Four published bands. No historical EJO values used.",
  },
  options: OINP_EARNINGS_TABLE_OPTIONS,
};
