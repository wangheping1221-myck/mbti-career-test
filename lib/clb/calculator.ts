/**
 * IELTS General Training → CLB conversion (pure functions).
 * No React / page dependencies.
 */

import {
  CLB_LEVELS_DESC,
  CLB_SKILLS,
  IELTS_GT_CLB_MINIMUMS,
} from "./constants";
import type {
  CLBLevel,
  CLBResult,
  ClbCalculationResult,
  ClbSkill,
  IELTSGeneralScores,
} from "./types";
import { validateIeltsGeneralScores } from "./validation";

const SKILL_LABEL: Record<ClbSkill, string> = {
  listening: "听力（Listening）",
  reading: "阅读（Reading）",
  writing: "写作（Writing）",
  speaking: "口语（Speaking）",
};

/**
 * Map one IELTS band to the highest CLB whose IRCC minimum it meets.
 * Returns null if below CLB 4 minimum for that skill.
 */
export function mapIeltsBandToClb(
  score: number,
  skill: ClbSkill,
): CLBLevel | null {
  for (const level of CLB_LEVELS_DESC) {
    if (score >= IELTS_GT_CLB_MINIMUMS[level][skill]) {
      return level;
    }
  }
  return null;
}

function buildOverall(levels: {
  listening: CLBLevel;
  reading: CLBLevel;
  writing: CLBLevel;
  speaking: CLBLevel;
}): CLBLevel {
  return Math.min(
    levels.listening,
    levels.reading,
    levels.writing,
    levels.speaking,
  ) as CLBLevel;
}

/**
 * Convert IELTS General Training scores to per-skill CLB and Overall CLB.
 *
 * Response shape (tool-wide convention):
 * `{ ok, input, result }` on success, or `{ ok: false, input, error, field? }`.
 *
 * `overall` = minimum of listening / reading / writing / speaking CLB.
 */
export function calculateCLB(input: IELTSGeneralScores): ClbCalculationResult {
  const validated = validateIeltsGeneralScores(input);
  if (!validated.ok) {
    return {
      ok: false,
      input,
      error: validated.error,
      field: validated.field,
    };
  }

  const levels: Partial<Record<ClbSkill, CLBLevel>> = {};

  for (const skill of CLB_SKILLS) {
    const clb = mapIeltsBandToClb(validated.input[skill], skill);
    if (clb === null) {
      return {
        ok: false,
        input: validated.input,
        field: skill,
        error: `${SKILL_LABEL[skill]}成绩未达到 IRCC 对照表中的最低 CLB 4 档，无法换算。`,
      };
    }
    levels[skill] = clb;
  }

  const result: CLBResult = {
    listening: levels.listening!,
    reading: levels.reading!,
    writing: levels.writing!,
    speaking: levels.speaking!,
    overall: buildOverall({
      listening: levels.listening!,
      reading: levels.reading!,
      writing: levels.writing!,
      speaking: levels.speaking!,
    }),
  };

  return {
    ok: true,
    input: validated.input,
    result,
  };
}
