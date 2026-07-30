/**
 * Official language ability / knowledge of official languages factor.
 *
 * P2.3.8 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables unchanged.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.8 Language Factor Human Verify against ontario.ca. */
const LANGUAGE_FACTOR_RETRIEVED_ON = "2026-07-30";

const LANGUAGE_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedLanguageOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: LANGUAGE_OPTION_SOURCE,
    retrievedOn: LANGUAGE_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors → Language →
 * Official language ability (English or French), and
 * Knowledge of official languages.
 *
 * Official notes (ability): Points based on lowest CLB across reading, writing,
 * listening and speaking; if both English and French tests taken, use the test
 * with the higher CLB; Academic and One Skill Retake tests not accepted.
 *
 * Official notes (knowledge): To receive points for 2 official languages, at
 * least CLB 6 across all 4 areas for both tests.
 *
 * Stream-criteria language minima elsewhere on the page are eligibility
 * context, not this scoring grid.
 */
export const OINP_LANGUAGE_TABLE_OPTIONS: readonly OfficialTableOption[] = [
  // —— Official language ability (English or French) ——
  verifiedLanguageOption({
    id: "language-clb-9-or-higher",
    label: "CLB 9 or higher",
    description: "Official language ability (English or French)",
    points: 15,
    notes:
      "Official subsection: Official language ability (English or French). Points based on lowest CLB across 4 language areas. Dual-language tests use the higher CLB test. Academic / One Skill Retake not accepted.",
  }),
  verifiedLanguageOption({
    id: "language-clb-8",
    label: "CLB 8",
    description: "Official language ability (English or French)",
    points: 12,
    notes:
      "Official subsection: Official language ability (English or French). Points based on lowest CLB across 4 language areas. Dual-language tests use the higher CLB test. Academic / One Skill Retake not accepted.",
  }),
  verifiedLanguageOption({
    id: "language-clb-7",
    label: "CLB 7",
    description: "Official language ability (English or French)",
    points: 8,
    notes:
      "Official subsection: Official language ability (English or French). Points based on lowest CLB across 4 language areas. Dual-language tests use the higher CLB test. Academic / One Skill Retake not accepted.",
  }),
  verifiedLanguageOption({
    id: "language-clb-6",
    label: "CLB 6",
    description: "Official language ability (English or French)",
    points: 4,
    notes:
      "Official subsection: Official language ability (English or French). Points based on lowest CLB across 4 language areas. Dual-language tests use the higher CLB test. Academic / One Skill Retake not accepted.",
  }),
  verifiedLanguageOption({
    id: "language-clb-5-or-lower",
    label: "CLB 5 or lower",
    description: "Official language ability (English or French)",
    points: 0,
    notes:
      "Official subsection: Official language ability (English or French). Points based on lowest CLB across 4 language areas. Dual-language tests use the higher CLB test. Academic / One Skill Retake not accepted.",
  }),
  // —— Knowledge of official languages ——
  verifiedLanguageOption({
    id: "language-knowledge-two-official",
    label: "2 official languages",
    description: "Knowledge of official languages",
    points: 10,
    notes:
      "Official subsection: Knowledge of official languages. To receive points for 2 official languages, at least CLB 6 across the 4 language areas for both tests.",
  }),
  verifiedLanguageOption({
    id: "language-knowledge-one-official",
    label: "1 official language",
    description: "Knowledge of official languages",
    points: 5,
    notes:
      "Official subsection: Knowledge of official languages. To receive points for 2 official languages, at least CLB 6 across the 4 language areas for both tests.",
  }),
] as const;

export const OINP_LANGUAGE_TABLE: OfficialFactorTable = {
  factorId: "language",
  title: "Official language ability / knowledge of official languages",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
    retrievedOn: LANGUAGE_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.8 Human Verify complete for Language Factor only. Values from OWP stream Scoring factors → Language → Official language ability (English or French) and Knowledge of official languages. Ability points use lowest CLB across 4 areas; dual tests use higher CLB; Academic / One Skill Retake not accepted. Two-language knowledge requires at least CLB 6 on both tests. Applicant checklist is context only. Eligibility-section language minima are not used for points.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors → Language) on 2026-07-30. Five ability CLB bands + two knowledge-of-languages options. No historical EJO values used.",
  },
  options: OINP_LANGUAGE_TABLE_OPTIONS,
};
