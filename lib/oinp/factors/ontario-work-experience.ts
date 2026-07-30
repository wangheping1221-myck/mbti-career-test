/**
 * Ontario work experience — mutually exclusive branch scoring.
 *
 * Job Offer MVP: in-offer-* OR ontario-general-* only. Physician excluded.
 * `in-offer-under-6-or-not` may score 0 points for table fidelity; UI should
 * guide users to the Ontario-general branch when appropriate (no dual score).
 */

import { OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS } from "../tables/ontario-work-experience";
import type { OwpScoringInput } from "../types";
import {
  isFactorScoreFailure,
  lookupVerifiedOption,
} from "./lookups";
import type { FactorScoreBatchResult } from "./types";

const IN_OFFER_OPTIONS = OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("in-offer-"),
);

const ONTARIO_GENERAL_OPTIONS =
  OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS.filter((o) =>
    o.id.startsWith("ontario-general-"),
  );

export function scoreOntarioWorkExperienceFactor(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  const { mode, optionId } = input.ontarioWorkExperience;

  if (optionId.startsWith("physician-")) {
    return {
      ok: false,
      error: "Job Offer MVP 不支持 self-employed physician 工作经验选项。",
      code: "physician_excluded",
      field: "ontarioWorkExperience.optionId",
    };
  }

  const family =
    mode === "in-offer-position" ? IN_OFFER_OPTIONS : ONTARIO_GENERAL_OPTIONS;

  if (!family.some((o) => o.id === optionId)) {
    return {
      ok: false,
      error: "安省工作经验 mode 与 optionId 不匹配。",
      code: "owe_mode_option_mismatch",
      field: "ontarioWorkExperience.optionId",
    };
  }

  const row = lookupVerifiedOption(
    family,
    optionId,
    "ontario-work-experience",
    "Ontario work experience",
    "ontarioWorkExperience.optionId",
  );
  if (isFactorScoreFailure(row)) return row;

  if (optionId === "in-offer-under-6-or-not") {
    row.note = [
      row.note,
      "Official in-offer under-6 band (0 pts). UI should guide Ontario-general branch when applicable; never dual-score.",
    ]
      .filter(Boolean)
      .join(" — ");
  }

  return { ok: true, rows: [row] };
}
