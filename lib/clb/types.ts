/**
 * CLB Calculator — Phase 1 types (IELTS General Training only).
 * No React / UI dependencies.
 *
 * Tool API response shape (shared convention for Salary / CLB / CRS / …):
 * `{ ok, input, result?, error?, field? }`
 */

/** CLB levels covered by the IRCC IELTS General Training charts used in V2.3. */
export type CLBLevel = 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** Four IELTS General Training band scores (0–9, typically in 0.5 steps). */
export interface IELTSGeneralScores {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

/** Successful conversion: per-skill CLB + Overall (minimum of the four). */
export interface CLBResult {
  listening: CLBLevel;
  reading: CLBLevel;
  writing: CLBLevel;
  speaking: CLBLevel;
  /** Overall CLB = min(listening, reading, writing, speaking) */
  overall: CLBLevel;
}

export type ClbSkill = keyof Pick<
  IELTSGeneralScores,
  "listening" | "reading" | "writing" | "speaking"
>;

export interface ClbValidationSuccess {
  ok: true;
  input: IELTSGeneralScores;
}

export interface ClbValidationFailure {
  ok: false;
  error: string;
  /** Which skill failed, when applicable */
  field?: ClbSkill | "all";
}

export type ClbValidationResult = ClbValidationSuccess | ClbValidationFailure;

/** Shared tool calculation success shape. */
export interface ClbCalculationSuccess {
  ok: true;
  input: IELTSGeneralScores;
  result: CLBResult;
}

/** Shared tool calculation failure shape. */
export interface ClbCalculationFailure {
  ok: false;
  input: IELTSGeneralScores;
  error: string;
  field?: ClbSkill | "all";
}

export type ClbCalculationResult = ClbCalculationSuccess | ClbCalculationFailure;
