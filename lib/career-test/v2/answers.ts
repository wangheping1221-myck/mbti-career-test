/**
 * Career Test V2 — answer state and validation contracts (V2.4B).
 * Types and function signature only — no runtime validation body.
 */

import type { OptionIdV2, QuestionIdV2 } from "./ids";

/** UI / in-progress quiz state — Partial is allowed only here. */
export type PartialAnswersV2 = Partial<Record<QuestionIdV2, OptionIdV2>>;

declare const validatedAnswersBrand: unique symbol;

/**
 * Opaque scoring input. Only a future validateAnswersV2 implementation may
 * construct this brand. Scorers accept ValidatedAnswersV2 only.
 */
export type ValidatedAnswersV2 = {
  readonly [validatedAnswersBrand]: "ValidatedAnswersV2";
  readonly answers: Readonly<Record<QuestionIdV2, OptionIdV2>>;
};

export type AnswerValidationErrorV2 =
  | { code: "missing-question"; questionId: QuestionIdV2 }
  | { code: "unknown-question-id"; questionId: string }
  | { code: "unknown-option-id"; questionId?: string; optionId: string }
  | {
      code: "option-not-in-question";
      questionId: QuestionIdV2;
      optionId: OptionIdV2;
    }
  | { code: "malformed-input" };

export type ValidateAnswersResultV2 =
  | { ok: true; value: ValidatedAnswersV2 }
  | { ok: false; errors: AnswerValidationErrorV2[] };

/** Signature for V2.4C — not implemented in V2.4B. */
export type ValidateAnswersV2Fn = (
  raw: unknown,
) => ValidateAnswersResultV2;
