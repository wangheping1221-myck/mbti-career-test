/**
 * Career Test V2 — question type contracts (V2.4B).
 * Types only — no 26-question data bank.
 *
 * Option letter order a/b/c/d does not invent ordinal meaning.
 */

import type { OccupationFamilyIdV2, OptionIdV2, QuestionIdV2 } from "./ids";
import type {
  EntryPaceCategoryV2,
  SoftDimensionKeyV2,
  WorkStyleSubKeyV2,
} from "./dimensions";

export type QuestionSectionV2 =
  | "constraints"
  | "work-preferences"
  | "interests";

/**
 * Discriminated option signals. Soft dims use SoftDimensionKeyV2 (11 keys).
 * fieldInterestAffinity is never an option soft dimension — use interest-family.
 */
export type OptionSignalV2 =
  | {
      kind: "hard-constraint";
      constraint: "rejectsNightOrRotating" | "rejectsHeavyPhysical";
    }
  | {
      kind: "ordinal-soft";
      dimension: Exclude<
        SoftDimensionKeyV2,
        "workStyleFit" | "careerEntryPracticality"
      >;
      level: 0 | 1 | 2 | 3;
    }
  | {
      kind: "work-style-sub";
      subKey: WorkStyleSubKeyV2;
      level: 0 | 1 | 2 | 3;
    }
  | {
      kind: "entry-pace";
      category: EntryPaceCategoryV2;
    }
  | {
      kind: "tradeoff";
      dimension: "stabilityVersusUpside";
      pole: "stability" | "balance" | "upside";
    }
  | {
      kind: "interest-family";
      family: OccupationFamilyIdV2;
      polarity: "positive";
    }
  | { kind: "neutral" };

export interface AnswerOptionV2 {
  id: OptionIdV2;
  labelZh: string;
  labelEn?: string;
  ariaLabelZh?: string;
  signal: OptionSignalV2;
  copyTestingNote?: string;
}

export interface QuestionV2 {
  id: QuestionIdV2;
  section: QuestionSectionV2;
  promptZh: string;
  promptEn?: string;
  subtitleZh?: string;
  subtitleEn?: string;
  options: readonly [
    AnswerOptionV2,
    AnswerOptionV2,
    AnswerOptionV2,
    AnswerOptionV2,
  ];
}
