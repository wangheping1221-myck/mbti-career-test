/**
 * OWP Job Offer EOI calculator (P3.2.2).
 *
 * validate → score HV tables → deterministic breakdown → total.
 * No normalization, eligibility, invitation prediction, or improvement hints.
 */

import type { BreakdownRow } from "@/lib/engine/types";
import { scoreOwpJobOfferFactors, sumFactorPoints } from "./scorer";
import type { FactorScoreOutput } from "./factors/types";
import type {
  OwpCalculationResult,
  OwpScoringInput,
  OwpScoringInputField,
} from "./types";
import { validateOwpInput } from "./validation";

function toBreakdownRow(row: FactorScoreOutput): BreakdownRow {
  return {
    id: row.factorId,
    label: row.label,
    value: row.points,
    note: row.note,
  };
}

/**
 * Calculate Estimated OWP EOI Score from verified option IDs.
 */
export function calculateOwpEoi(input: OwpScoringInput): OwpCalculationResult {
  const validated = validateOwpInput(input);
  if (!validated.ok) {
    return {
      ok: false,
      input: validated.input,
      error: validated.error,
      field: validated.field,
    };
  }

  const scored = scoreOwpJobOfferFactors(validated.input);
  if (!scored.ok) {
    return {
      ok: false,
      input: validated.input,
      error: scored.error,
      field: scored.field as OwpScoringInputField | undefined,
    };
  }

  const breakdown = scored.rows.map(toBreakdownRow);
  const total = sumFactorPoints(scored.rows);

  return {
    ok: true,
    input: validated.input,
    result: {
      stream: "ontario-workforce-priority",
      pathway: "job-offer",
      total,
      breakdown,
      scoringStatus: "implemented",
    },
  };
}
