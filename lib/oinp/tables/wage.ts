/**
 * Job offer hourly wage factor.
 *
 * P2.3.2 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables unchanged.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICATION_PROCESS_TITLE,
  OWP_APPLICATION_PROCESS_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.2 Wage Factor Human Verify against ontario.ca. */
const WAGE_FACTOR_RETRIEVED_ON = "2026-07-30";

const WAGE_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedWageOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: WAGE_OPTION_SOURCE,
    retrievedOn: WAGE_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors →
 * Employment / labour market factors → Hourly wage.
 *
 * Official note: prepopulated in the EOI if applying with a job offer;
 * not applicable to self-employed physicians (out of V2.4 Job Offer MVP scoring path).
 */
export const OINP_WAGE_TABLE_OPTIONS: readonly OfficialTableOption[] = [
  verifiedWageOption({
    id: "wage-40-plus",
    label: "$40 per hour or higher",
    description: "Hourly wage",
    points: 15,
    notes: "Official subsection: Hourly wage.",
  }),
  verifiedWageOption({
    id: "wage-35-39.99",
    label: "$35 to $39.99 per hour",
    description: "Hourly wage",
    points: 12,
    notes: "Official subsection: Hourly wage.",
  }),
  verifiedWageOption({
    id: "wage-30-34.99",
    label: "$30 to $34.99 per hour",
    description: "Hourly wage",
    points: 10,
    notes: "Official subsection: Hourly wage.",
  }),
  verifiedWageOption({
    id: "wage-25-29.99",
    label: "$25 to $29.99 per hour",
    description: "Hourly wage",
    points: 8,
    notes: "Official subsection: Hourly wage.",
  }),
  verifiedWageOption({
    id: "wage-20-24.99",
    label: "$20 to $24.99 per hour",
    description: "Hourly wage",
    points: 5,
    notes: "Official subsection: Hourly wage.",
  }),
  verifiedWageOption({
    id: "wage-under-20",
    label: "Less than $20 per hour",
    description: "Hourly wage",
    points: 0,
    notes: "Official subsection: Hourly wage.",
  }),
] as const;

export const OINP_WAGE_TABLE: OfficialFactorTable = {
  factorId: "wage",
  title: "Job offer — hourly wage",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICATION_PROCESS_URL,
    crossCheckTitle: OWP_APPLICATION_PROCESS_TITLE,
    crossCheckStrength: "official-cross-check",
    retrievedOn: WAGE_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.2 Human Verify complete for Wage Factor only. Values from OWP stream Scoring factors → Hourly wage. Official page states factor is prepopulated from job offer EOI and is not applicable to self-employed physicians. Application process is cross-check context only.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors → Hourly wage) on 2026-07-30. Six published bands. No historical EJO values used.",
  },
  options: OINP_WAGE_TABLE_OPTIONS,
};
