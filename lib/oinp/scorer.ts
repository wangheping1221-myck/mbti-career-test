/**
 * Job Offer factor orchestration — deterministic breakdown order (P3.2.2).
 */

import type { OwpScoringInput } from "./types";
import {
  scoreCanadianCredentialFactor,
  scoreEarningsFactor,
  scoreEducationFactor,
  scoreJobFactor,
  scoreLanguageFactor,
  scoreOntarioWorkExperienceFactor,
  scoreRegionFactor,
  scoreStatusFactor,
  scoreWageFactor,
} from "./factors";
import type { FactorScoreBatchResult, FactorScoreOutput } from "./factors/types";

const FACTOR_RUNNERS: ReadonlyArray<(input: OwpScoringInput) => FactorScoreBatchResult> =
  [
    scoreJobFactor,
    scoreWageFactor,
    scoreOntarioWorkExperienceFactor,
    scoreEarningsFactor,
    scoreStatusFactor,
    scoreEducationFactor,
    scoreCanadianCredentialFactor,
    scoreLanguageFactor,
    scoreRegionFactor,
  ];

/**
 * Score all Job Offer factors. Assumes input already passed `validateOwpInput`
 * (defense-in-depth failures still possible).
 */
export function scoreOwpJobOfferFactors(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  const rows: FactorScoreOutput[] = [];

  for (const run of FACTOR_RUNNERS) {
    const result = run(input);
    if (!result.ok) return result;
    rows.push(...result.rows);
  }

  return { ok: true, rows };
}

export function sumFactorPoints(rows: readonly FactorScoreOutput[]): number {
  return rows.reduce((sum, row) => sum + row.points, 0);
}
