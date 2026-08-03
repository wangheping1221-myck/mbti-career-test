/**
 * Career Test V2 — answer state, validation contracts, and validateAnswersV2 (V2.4C2).
 * Validation only — no normalization, scoring, or career data.
 */

import {
  OPTION_IDS_V2,
  QUESTION_IDS_V2,
  type OptionIdV2,
  type QuestionIdV2,
} from "./ids";
import { getQuestionV2 } from "./question-bank";

/** UI / in-progress quiz state — Partial is allowed only here. */
export type PartialAnswersV2 = Partial<Record<QuestionIdV2, OptionIdV2>>;

/** Runtime unique symbol — required so branding works outside the type system. */
const validatedAnswersBrand: unique symbol = Symbol("ValidatedAnswersV2");

/**
 * Opaque scoring input. Only validateAnswersV2 may construct this brand.
 * Scorers accept ValidatedAnswersV2 only.
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

export type ValidateAnswersV2Fn = (
  raw: unknown,
) => ValidateAnswersResultV2;

const QUESTION_ID_SET_V2: ReadonlySet<string> = new Set(QUESTION_IDS_V2);
const OPTION_ID_SET_V2: ReadonlySet<string> = new Set(OPTION_IDS_V2);

function isPlainObject(raw: unknown): raw is Record<string, unknown> {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return false;
  }
  const proto = Object.getPrototypeOf(raw);
  return proto === Object.prototype || proto === null;
}

function optionIdDescriptor(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string") return value;
  return typeof value;
}

function isOptionIdV2(value: unknown): value is OptionIdV2 {
  return typeof value === "string" && OPTION_ID_SET_V2.has(value);
}

/**
 * Strict JSON-like answer validation. No coercion. Brands only on full success.
 */
export const validateAnswersV2: ValidateAnswersV2Fn = (raw) => {
  if (!isPlainObject(raw)) {
    return { ok: false, errors: [{ code: "malformed-input" }] };
  }

  const errors: AnswerValidationErrorV2[] = [];

  // A. Unknown question IDs (lexicographic ascending)
  const unknownKeys = Object.keys(raw)
    .filter((key) => !QUESTION_ID_SET_V2.has(key))
    .sort();
  for (const questionId of unknownKeys) {
    errors.push({ code: "unknown-question-id", questionId });
  }

  // B. Missing questions (QUESTION_IDS_V2 order)
  for (const questionId of QUESTION_IDS_V2) {
    if (!Object.prototype.hasOwnProperty.call(raw, questionId)) {
      errors.push({ code: "missing-question", questionId });
    }
  }

  // C. Option errors for known, present questions (QUESTION_IDS_V2 order)
  for (const questionId of QUESTION_IDS_V2) {
    if (!Object.prototype.hasOwnProperty.call(raw, questionId)) {
      continue;
    }
    const value = raw[questionId];
    if (!isOptionIdV2(value)) {
      errors.push({
        code: "unknown-option-id",
        questionId,
        optionId: optionIdDescriptor(value),
      });
      continue;
    }
    const question = getQuestionV2(questionId);
    const onQuestion = question.options.some((option) => option.id === value);
    if (!onQuestion) {
      errors.push({
        code: "option-not-in-question",
        questionId,
        optionId: value,
      });
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const answers = {} as Record<QuestionIdV2, OptionIdV2>;
  for (const questionId of QUESTION_IDS_V2) {
    // Present and validated above — copy only canonical IDs.
    answers[questionId] = raw[questionId] as OptionIdV2;
  }

  const value: ValidatedAnswersV2 = {
    [validatedAnswersBrand]: "ValidatedAnswersV2",
    answers,
  };

  return { ok: true, value };
};
