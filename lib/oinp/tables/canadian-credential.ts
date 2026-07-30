/**
 * Number of Canadian education credentials factor.
 *
 * P2.3.7 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables unchanged.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.7 Canadian Credential Factor Human Verify against ontario.ca. */
const CANADIAN_CREDENTIAL_FACTOR_RETRIEVED_ON = "2026-07-30";

const CANADIAN_CREDENTIAL_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedCanadianCredentialOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: CANADIAN_CREDENTIAL_OPTION_SOURCE,
    retrievedOn: CANADIAN_CREDENTIAL_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors →
 * Education → Number of Canadian education credentials.
 *
 * Official note: Credential must be a post-secondary education credential from
 * an eligible Canadian institution that takes at least one year to complete on
 * a full-time basis. Eligible-institution lists on the stream page are context
 * only and are not copied into this table.
 */
export const OINP_CANADIAN_CREDENTIAL_TABLE_OPTIONS: readonly OfficialTableOption[] =
  [
    verifiedCanadianCredentialOption({
      id: "canadian-credential-more-than-one",
      label: "More than one Canadian credential",
      description: "Number of Canadian education credentials",
      points: 10,
      notes:
        "Official subsection: Number of Canadian education credentials. Credential must be a post-secondary education credential from an eligible Canadian institution that takes at least one year to complete on a full-time basis.",
    }),
    verifiedCanadianCredentialOption({
      id: "canadian-credential-one",
      label: "One Canadian credential",
      description: "Number of Canadian education credentials",
      points: 5,
      notes:
        "Official subsection: Number of Canadian education credentials. Credential must be a post-secondary education credential from an eligible Canadian institution that takes at least one year to complete on a full-time basis.",
    }),
    verifiedCanadianCredentialOption({
      id: "canadian-credential-none",
      label: "No Canadian credential",
      description: "Number of Canadian education credentials",
      points: 0,
      notes:
        "Official subsection: Number of Canadian education credentials. Credential must be a post-secondary education credential from an eligible Canadian institution that takes at least one year to complete on a full-time basis.",
    }),
  ] as const;

export const OINP_CANADIAN_CREDENTIAL_TABLE: OfficialFactorTable = {
  factorId: "canadian-credential",
  title: "Number of Canadian education credentials",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
    retrievedOn: CANADIAN_CREDENTIAL_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.7 Human Verify complete for Number of Canadian Education Credentials Factor only. Values from OWP stream Scoring factors → Education → Number of Canadian education credentials. Official page requires a post-secondary credential from an eligible Canadian institution taking at least one year full-time. Eligible-institution lists are context only. Applicant checklist is context only.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors → Number of Canadian education credentials) on 2026-07-30. Three published options. No historical EJO values used.",
  },
  options: OINP_CANADIAN_CREDENTIAL_TABLE_OPTIONS,
};
