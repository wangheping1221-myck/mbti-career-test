/**
 * Domain-internal factor score row (P3.2.2).
 * Mapped to `BreakdownRow` at the calculator boundary only.
 */

export interface FactorScoreOutput {
  factorId: string;
  label: string;
  points: number;
  selectedOptionIds: string[];
  note?: string;
}

export type FactorScoreFailure = {
  ok: false;
  error: string;
  code: string;
  field?: string;
};

export type FactorScoreBatchResult =
  | { ok: true; rows: FactorScoreOutput[] }
  | FactorScoreFailure;
