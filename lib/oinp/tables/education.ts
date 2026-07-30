/**
 * Highest level of education factor.
 *
 * P2.3.6 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables unchanged.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.6 Education Factor Human Verify against ontario.ca. */
const EDUCATION_FACTOR_RETRIEVED_ON = "2026-07-30";

const EDUCATION_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedEducationOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: EDUCATION_OPTION_SOURCE,
    retrievedOn: EDUCATION_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors →
 * Education → Highest level of education.
 *
 * Official note: Canadian credential or ECA required.
 * Number of Canadian education credentials is a separate factor table.
 */
export const OINP_EDUCATION_TABLE_OPTIONS: readonly OfficialTableOption[] = [
  verifiedEducationOption({
    id: "education-doctorate-or-professional-health",
    label:
      "Doctorate or degree in medicine, dentistry, veterinary medicine or optometry",
    description: "Highest level of education",
    points: 10,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
  verifiedEducationOption({
    id: "education-masters",
    label: "Masters degree",
    description: "Highest level of education",
    points: 8,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
  verifiedEducationOption({
    id: "education-univ-cert-above-bachelor",
    label: "University certificate or diploma above a bachelor level",
    description: "Highest level of education",
    points: 6,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
  verifiedEducationOption({
    id: "education-bachelors",
    label: "Bachelors degree or equivalent",
    description: "Highest level of education",
    points: 6,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
  verifiedEducationOption({
    id: "education-ontario-college-grad-cert",
    label: "Ontario College Graduate Certificate",
    description: "Highest level of education",
    points: 5,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
  verifiedEducationOption({
    id: "education-univ-cert-below-bachelor",
    label: "University certificate or diploma below a bachelor level",
    description: "Highest level of education",
    points: 5,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
  verifiedEducationOption({
    id: "education-college-cegep-other",
    label:
      "College, CEGEP or other non-university certificate or diploma that is not an Ontario College Graduate Certificate",
    description: "Highest level of education",
    points: 5,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
  verifiedEducationOption({
    id: "education-apprenticeship-trades",
    label: "Apprenticeship or trades certificate or diploma",
    description: "Highest level of education",
    points: 5,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
  verifiedEducationOption({
    id: "education-less-than-college-or-trade",
    label: "Less than college or trade certificate",
    description: "Highest level of education",
    points: 0,
    notes:
      "Official subsection: Highest level of education. Official note: Canadian credential or ECA required.",
  }),
] as const;

export const OINP_EDUCATION_TABLE: OfficialFactorTable = {
  factorId: "education",
  title: "Highest level of education",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
    retrievedOn: EDUCATION_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.6 Human Verify complete for Highest Level of Education Factor only. Values from OWP stream Scoring factors → Education → Highest level of education. Official page states Canadian credential or ECA required. Applicant checklist is context only. Number of Canadian education credentials is a separate factor.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors → Highest level of education) on 2026-07-30. Nine published options. No historical EJO values used.",
  },
  options: OINP_EDUCATION_TABLE_OPTIONS,
};
