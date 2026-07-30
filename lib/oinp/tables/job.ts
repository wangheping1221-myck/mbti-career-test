/**
 * Job offer occupation factors (NOC TEER + broad occupational category).
 *
 * P2.3.1 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables remain pending.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.1 Job Factor Human Verify against ontario.ca. */
const JOB_FACTOR_RETRIEVED_ON = "2026-07-29";

const JOB_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedJobOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: JOB_OPTION_SOURCE,
    retrievedOn: JOB_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors →
 * Employment / labour market factors →
 * NOC TEER category + NOC broad occupational category.
 */
export const OINP_JOB_TABLE_OPTIONS: readonly OfficialTableOption[] = [
  // —— NOC TEER category ——
  verifiedJobOption({
    id: "teer-0-1",
    label: "NOC TEER 0 or 1",
    description: "NOC TEER category",
    points: 9,
    notes: "Official subsection: NOC TEER category.",
  }),
  verifiedJobOption({
    id: "teer-2-3",
    label: "NOC TEER 2 or 3",
    description: "NOC TEER category",
    points: 6,
    notes: "Official subsection: NOC TEER category.",
  }),
  verifiedJobOption({
    id: "teer-4",
    label: "NOC TEER 4",
    description: "NOC TEER category",
    points: 0,
    notes: "Official subsection: NOC TEER category.",
  }),
  verifiedJobOption({
    id: "teer-5",
    label: "NOC TEER 5",
    description: "NOC TEER category",
    points: 0,
    notes: "Official subsection: NOC TEER category.",
  }),
  // —— NOC broad occupational category ——
  verifiedJobOption({
    id: "broad-3",
    label: "Occupational Category 3",
    description: "NOC broad occupational category",
    points: 10,
    notes: "Official subsection: NOC broad occupational category.",
  }),
  verifiedJobOption({
    id: "broad-7",
    label: "Occupational Category 7",
    description: "NOC broad occupational category",
    points: 8,
    notes: "Official subsection: NOC broad occupational category.",
  }),
  verifiedJobOption({
    id: "broad-2",
    label: "Occupational Category 2",
    description: "NOC broad occupational category",
    points: 6,
    notes: "Official subsection: NOC broad occupational category.",
  }),
  verifiedJobOption({
    id: "broad-0-1-4-8-9",
    label: "Occupational Category 0, 1, 4, 8, 9",
    description: "NOC broad occupational category",
    points: 4,
    notes: "Official subsection: NOC broad occupational category. Single published band covering categories 0, 1, 4, 8, and 9.",
  }),
  verifiedJobOption({
    id: "broad-5-6",
    label: "Occupational Category 5, 6",
    description: "NOC broad occupational category",
    points: 2,
    notes: "Official subsection: NOC broad occupational category. Single published band covering categories 5 and 6.",
  }),
] as const;

export const OINP_JOB_TABLE: OfficialFactorTable = {
  factorId: "job",
  title: "Job offer — NOC TEER / broad occupational category",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
    retrievedOn: JOB_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.1 Human Verify complete for Job Factor only. Values from OWP stream Scoring factors → NOC TEER category and NOC broad occupational category. Checklist is documentary context only — not used for points.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors) on 2026-07-29. TEER (4 rows) + broad occupational category (5 rows). No historical EJO values used.",
  },
  options: OINP_JOB_TABLE_OPTIONS,
};
