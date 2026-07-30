/**
 * Ontario work experience factor.
 *
 * P2.3.3 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables unchanged.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.3 Ontario Work Experience Human Verify against ontario.ca. */
const OWE_FACTOR_RETRIEVED_ON = "2026-07-30";

const OWE_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedOweOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: OWE_OPTION_SOURCE,
    retrievedOn: OWE_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors →
 * Employment / labour market factors → Ontario work experience.
 *
 * Includes Job offer applicants bands, the published alternate Ontario-general
 * bands when under 6 months in the job offer position, and Self-employed
 * physicians medical-practice bands (recorded for completeness; V2.4 Job Offer
 * MVP calculator path does not use physician options).
 */
export const OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS: readonly OfficialTableOption[] =
  [
    // —— Job offer applicants ——
    verifiedOweOption({
      id: "in-offer-over-24",
      label: "Over 24 months working in job offer position",
      description: "Ontario work experience — Job offer applicants",
      points: 18,
      notes: "Official subsection: Job offer applicants.",
    }),
    verifiedOweOption({
      id: "in-offer-13-24",
      label: "13 to 24 months working in job offer position",
      description: "Ontario work experience — Job offer applicants",
      points: 15,
      notes: "Official subsection: Job offer applicants.",
    }),
    verifiedOweOption({
      id: "in-offer-6-12",
      label: "6 to 12 months working in job offer position",
      description: "Ontario work experience — Job offer applicants",
      points: 12,
      notes: "Official subsection: Job offer applicants.",
    }),
    verifiedOweOption({
      id: "in-offer-under-6-or-not",
      label:
        "Less than 6 months working in job offer position or not currently working in position",
      description: "Ontario work experience — Job offer applicants",
      points: 0,
      notes:
        "Official subsection: Job offer applicants. Official page then publishes alternate Ontario-general bands when the applicant has less than 6 months in the job offer position.",
    }),
    // —— Alternate bands when < 6 months in job offer position ——
    verifiedOweOption({
      id: "ontario-general-over-24",
      label: "Over 24 months working in Ontario",
      description:
        "Ontario work experience — alternate when less than 6 months in job offer position",
      points: 12,
      notes:
        "Official text: If the applicant has less than 6 months work experience in the job offer position, the scoring is as follows.",
    }),
    verifiedOweOption({
      id: "ontario-general-13-24",
      label: "13 to 24 months working in Ontario",
      description:
        "Ontario work experience — alternate when less than 6 months in job offer position",
      points: 9,
      notes:
        "Official text: If the applicant has less than 6 months work experience in the job offer position, the scoring is as follows.",
    }),
    verifiedOweOption({
      id: "ontario-general-6-12",
      label: "6 to 12 months working in Ontario",
      description:
        "Ontario work experience — alternate when less than 6 months in job offer position",
      points: 6,
      notes:
        "Official text: If the applicant has less than 6 months work experience in the job offer position, the scoring is as follows.",
    }),
    verifiedOweOption({
      id: "ontario-general-under-6-or-not",
      label:
        "Less than 6 months working in Ontario or not currently working in Ontario",
      description:
        "Ontario work experience — alternate when less than 6 months in job offer position",
      points: 0,
      notes:
        "Official text: If the applicant has less than 6 months work experience in the job offer position, the scoring is as follows.",
    }),
    // —— Self-employed physicians (recorded; not Job Offer MVP calculator path) ——
    verifiedOweOption({
      id: "physician-over-24",
      label:
        "Over 24 months (2 years or more) cumulative medical practice in Ontario",
      description: "Ontario work experience — Self-employed physicians",
      points: 18,
      notes:
        "Official subsection: Self-employed physicians. Out of V2.4 Job Offer MVP calculator path; recorded for complete factor transcription.",
    }),
    verifiedOweOption({
      id: "physician-13-24",
      label:
        "13 months up to 24 months cumulative medical practice in Ontario",
      description: "Ontario work experience — Self-employed physicians",
      points: 15,
      notes:
        "Official subsection: Self-employed physicians. Out of V2.4 Job Offer MVP calculator path; recorded for complete factor transcription.",
    }),
    verifiedOweOption({
      id: "physician-6-12",
      label: "6 months up to 12 months cumulative medical practice in Ontario",
      description: "Ontario work experience — Self-employed physicians",
      points: 12,
      notes:
        "Official subsection: Self-employed physicians. Out of V2.4 Job Offer MVP calculator path; recorded for complete factor transcription.",
    }),
    verifiedOweOption({
      id: "physician-under-6",
      label: "Less than 6 months cumulative medical practice in Ontario",
      description: "Ontario work experience — Self-employed physicians",
      points: 0,
      notes:
        "Official subsection: Self-employed physicians. Out of V2.4 Job Offer MVP calculator path; recorded for complete factor transcription.",
    }),
  ] as const;

export const OINP_ONTARIO_WORK_EXPERIENCE_TABLE: OfficialFactorTable = {
  factorId: "ontario-work-experience",
  title: "Ontario work experience",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
    retrievedOn: OWE_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.3 Human Verify complete for Ontario Work Experience only. Values from OWP stream Scoring factors → Ontario work experience (Job offer applicants, alternate Ontario-general bands when under 6 months in job offer position, and Self-employed physicians). Physician bands recorded for completeness; V2.4 Job Offer MVP calculator will not score them. Checklist is documentary context only.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors → Ontario work experience) on 2026-07-30. Twelve published rows across three official subsections. No historical EJO values used.",
  },
  options: OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS,
};
