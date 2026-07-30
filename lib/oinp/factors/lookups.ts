/**
 * Safe single-option lookup + simple factor scorers (HV tables).
 * Never sums a whole table; never mutates tables; never invents points.
 */

import { OINP_CANADIAN_CREDENTIAL_TABLE_OPTIONS } from "../tables/canadian-credential";
import { OINP_EARNINGS_TABLE_OPTIONS } from "../tables/earnings";
import { OINP_EDUCATION_TABLE_OPTIONS } from "../tables/education";
import { OINP_REGION_TABLE_OPTIONS } from "../tables/region";
import { OINP_STATUS_TABLE_OPTIONS } from "../tables/status";
import type { OfficialTableOption } from "../tables/types";
import { OINP_WAGE_TABLE_OPTIONS } from "../tables/wage";
import type { OwpScoringInput } from "../types";
import type {
  FactorScoreBatchResult,
  FactorScoreFailure,
  FactorScoreOutput,
} from "./types";

export function lookupVerifiedOption(
  options: readonly OfficialTableOption[],
  optionId: string,
  factorId: string,
  label: string,
  field: string,
): FactorScoreOutput | FactorScoreFailure {
  const match = options.find((o) => o.id === optionId);
  if (!match) {
    return {
      ok: false,
      error: `${label} 选项无效。`,
      code: "unknown_option_id",
      field,
    };
  }
  if (typeof match.points !== "number") {
    return {
      ok: false,
      error: `${label} 缺少已核验分值。`,
      code: "missing_points",
      field,
    };
  }
  return {
    factorId,
    label,
    points: match.points,
    selectedOptionIds: [match.id],
    note: match.label,
  };
}

export function isFactorScoreFailure(
  value: FactorScoreOutput | FactorScoreFailure,
): value is FactorScoreFailure {
  return "ok" in value && value.ok === false;
}

function single(
  result: FactorScoreOutput | FactorScoreFailure,
): FactorScoreBatchResult {
  if (isFactorScoreFailure(result)) return result;
  return { ok: true, rows: [result] };
}

export function scoreWageFactor(input: OwpScoringInput): FactorScoreBatchResult {
  return single(
    lookupVerifiedOption(
      OINP_WAGE_TABLE_OPTIONS,
      input.wageOptionId,
      "wage",
      "Hourly wage",
      "wageOptionId",
    ),
  );
}

export function scoreEarningsFactor(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  return single(
    lookupVerifiedOption(
      OINP_EARNINGS_TABLE_OPTIONS,
      input.earningsOptionId,
      "earnings",
      "Canadian work experience: earnings history",
      "earningsOptionId",
    ),
  );
}

export function scoreStatusFactor(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  return single(
    lookupVerifiedOption(
      OINP_STATUS_TABLE_OPTIONS,
      input.statusOptionId,
      "status",
      "Legal status in Canada",
      "statusOptionId",
    ),
  );
}

export function scoreEducationFactor(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  return single(
    lookupVerifiedOption(
      OINP_EDUCATION_TABLE_OPTIONS,
      input.educationOptionId,
      "education",
      "Highest level of education",
      "educationOptionId",
    ),
  );
}

export function scoreCanadianCredentialFactor(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  return single(
    lookupVerifiedOption(
      OINP_CANADIAN_CREDENTIAL_TABLE_OPTIONS,
      input.canadianCredentialOptionId,
      "canadian-credential",
      "Number of Canadian education credentials",
      "canadianCredentialOptionId",
    ),
  );
}

export function scoreRegionFactor(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  return single(
    lookupVerifiedOption(
      OINP_REGION_TABLE_OPTIONS,
      input.regionOptionId,
      "region",
      "Regionalization — location of work",
      "regionOptionId",
    ),
  );
}
