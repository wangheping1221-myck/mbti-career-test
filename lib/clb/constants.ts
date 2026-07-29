/**
 * IELTS General Training → CLB mapping constants.
 *
 * Implementation Rule:
 * - Data must come from IRCC / Canada.ca official pages (or official PDF).
 * - No third-party sites.
 * - This file is the only place band→CLB thresholds may live for V2.3.
 *
 * IMPORTANT:
 * - Concrete numbers below were transcribed from IRCC pages listed in
 *   `IELTS_GT_CLB_SOURCE`. They must be re-checked by a human before treating
 *   production results as final.
 */

import type { CLBLevel, ClbSkill } from "./types";

export const IELTS_GT_CLB_SOURCE = {
  languageScale: "CLB" as const,
  exam: "IELTS General Training",
  /**
   * Primary chart used for full CLB 4–10 conversion
   * (page explicitly labels “IELTS (General Training)”).
   */
  sourceUrl:
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility/language-results.html",
  sourceTitle:
    "Post-graduation work permit: How to find your language level based on your test results — Canada.ca",
  /**
   * Cross-check chart on Express Entry language page
   * (Federal Skilled Trades — IELTS ability table; same band floors for CLB 4–10).
   */
  crossCheckUrl:
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html",
  crossCheckTitle:
    "Express Entry: Language test results — Canada.ca (Federal Skilled Trades / IELTS)",
  /** ISO date when this file was transcribed from the official pages. */
  retrievedOn: "2026-07-29",
  effectiveNote:
    "Thresholds are the minimum IELTS band for each CLB level per ability. A score maps to the highest CLB whose minimum it meets. Scores below CLB 4 minima do not map.",
} as const;

/**
 * TODO(human-verify): Before production release, open both `sourceUrl` and
 * `crossCheckUrl` and confirm every Listening / Reading / Writing / Speaking
 * minimum for CLB 4–10 still matches this table. Do not update from memory,
 * blogs, or AI suggestions.
 */
export const IELTS_GT_CLB_HUMAN_VERIFY_TODO =
  "TODO: Human must re-verify IRCC IELTS General Training ↔ CLB thresholds on Canada.ca before production sign-off.";

/**
 * Minimum IELTS General Training band required for each CLB level, per skill.
 * Source: IRCC PGWP language-results table (IELTS General Training),
 * cross-checked against Express Entry FST IELTS ability table (2026-07-29).
 *
 * Lookup rule: for a given skill score S, CLB = max { L | S >= minimum[L][skill] }.
 */
export const IELTS_GT_CLB_MINIMUMS: Readonly<
  Record<CLBLevel, Readonly<Record<ClbSkill, number>>>
> = {
  10: { listening: 8.5, reading: 8.0, writing: 7.5, speaking: 7.5 },
  9: { listening: 8.0, reading: 7.0, writing: 7.0, speaking: 7.0 },
  8: { listening: 7.5, reading: 6.5, writing: 6.5, speaking: 6.5 },
  7: { listening: 6.0, reading: 6.0, writing: 6.0, speaking: 6.0 },
  6: { listening: 5.5, reading: 5.0, writing: 5.5, speaking: 5.5 },
  5: { listening: 5.0, reading: 4.0, writing: 5.0, speaking: 5.0 },
  4: { listening: 4.5, reading: 3.5, writing: 4.0, speaking: 4.0 },
};

/** Descending CLB levels for highest-match lookup. */
export const CLB_LEVELS_DESC: readonly CLBLevel[] = [
  10, 9, 8, 7, 6, 5, 4,
];

export const IELTS_BAND_MIN = 0;
export const IELTS_BAND_MAX = 9;
/** IELTS bands are reported in 0.5 increments. */
export const IELTS_BAND_STEP = 0.5;

export const CLB_SKILLS: readonly ClbSkill[] = [
  "listening",
  "reading",
  "writing",
  "speaking",
] as const;
