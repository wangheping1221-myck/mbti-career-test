/**
 * Language scoring — ability + knowledge (additive).
 * Does not derive CLB from raw skills; combo defense mirrors validation.
 */

import { OINP_LANGUAGE_TABLE_OPTIONS } from "../tables/language";
import type { OwpScoringInput } from "../types";
import {
  isFactorScoreFailure,
  lookupVerifiedOption,
} from "./lookups";
import type { FactorScoreBatchResult } from "./types";

const ABILITY_OPTIONS = OINP_LANGUAGE_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("language-clb-"),
);

const KNOWLEDGE_OPTIONS = OINP_LANGUAGE_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("language-knowledge-"),
);

const CLB_6_OR_HIGHER = new Set([
  "language-clb-6",
  "language-clb-7",
  "language-clb-8",
  "language-clb-9-or-higher",
]);

export function scoreLanguageFactor(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  if (
    input.languageKnowledgeOptionId === "language-knowledge-two-official" &&
    !CLB_6_OR_HIGHER.has(input.languageAbilityOptionId)
  ) {
    return {
      ok: false,
      error: "选择两种官方语言时，语言能力须至少为 CLB 6。",
      code: "language_combo_invalid",
      field: "languageKnowledgeOptionId",
    };
  }

  const ability = lookupVerifiedOption(
    ABILITY_OPTIONS,
    input.languageAbilityOptionId,
    "language-ability",
    "Official language ability",
    "languageAbilityOptionId",
  );
  if (isFactorScoreFailure(ability)) return ability;

  const knowledge = lookupVerifiedOption(
    KNOWLEDGE_OPTIONS,
    input.languageKnowledgeOptionId,
    "language-knowledge",
    "Knowledge of official languages",
    "languageKnowledgeOptionId",
  );
  if (isFactorScoreFailure(knowledge)) return knowledge;

  return { ok: true, rows: [ability, knowledge] };
}
