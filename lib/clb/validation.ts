/**
 * IELTS General Training input validation (pure functions).
 */

import {
  CLB_SKILLS,
  IELTS_BAND_MAX,
  IELTS_BAND_MIN,
  IELTS_BAND_STEP,
} from "./constants";
import type {
  ClbSkill,
  ClbValidationResult,
  IELTSGeneralScores,
} from "./types";

const SKILL_LABEL: Record<ClbSkill, string> = {
  listening: "听力（Listening）",
  reading: "阅读（Reading）",
  writing: "写作（Writing）",
  speaking: "口语（Speaking）",
};

function isInvalidNumber(value: number): boolean {
  return !Number.isFinite(value) || Number.isNaN(value);
}

/**
 * IELTS bands use 0.5 steps (e.g. 6.0, 6.5). Allow tiny float noise.
 */
export function isValidIeltsBandStep(score: number): boolean {
  if (isInvalidNumber(score)) {
    return false;
  }
  const scaled = score / IELTS_BAND_STEP;
  return Math.abs(scaled - Math.round(scaled)) < 1e-8;
}

export type IeltsBandValidationResult =
  | { ok: true }
  | { ok: false; error: string; field: ClbSkill };

export function validateIeltsBand(
  score: number,
  skill: ClbSkill,
): IeltsBandValidationResult {
  if (isInvalidNumber(score)) {
    return {
      ok: false,
      field: skill,
      error: `${SKILL_LABEL[skill]}必须是有效数字。`,
    };
  }

  if (score < IELTS_BAND_MIN || score > IELTS_BAND_MAX) {
    return {
      ok: false,
      field: skill,
      error: `${SKILL_LABEL[skill]}必须在 ${IELTS_BAND_MIN}–${IELTS_BAND_MAX} 之间。`,
    };
  }

  if (!isValidIeltsBandStep(score)) {
    return {
      ok: false,
      field: skill,
      error: `${SKILL_LABEL[skill]}必须符合 IELTS 0.5 分步进（例如 6.0、6.5）。`,
    };
  }

  return { ok: true };
}

/**
 * Validate all four IELTS General Training scores.
 * Returns a unified `{ ok, error?, field? }` shape.
 */
export function validateIeltsGeneralScores(
  input: IELTSGeneralScores,
): ClbValidationResult {
  for (const skill of CLB_SKILLS) {
    const single = validateIeltsBand(input[skill], skill);
    if (!single.ok) {
      return single;
    }
  }

  return {
    ok: true,
    input: {
      listening: input.listening,
      reading: input.reading,
      writing: input.writing,
      speaking: input.speaking,
    },
  };
}
