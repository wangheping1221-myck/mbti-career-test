/**
 * Job offer occupation scoring — TEER + broad category (additive).
 */

import { OINP_JOB_TABLE_OPTIONS } from "../tables/job";
import type { OwpScoringInput } from "../types";
import {
  isFactorScoreFailure,
  lookupVerifiedOption,
} from "./lookups";
import type { FactorScoreBatchResult } from "./types";

const TEER_OPTIONS = OINP_JOB_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("teer-"),
);

const BROAD_OPTIONS = OINP_JOB_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("broad-"),
);

/**
 * Score NOC TEER and broad occupational category as two separate contributions.
 */
export function scoreJobFactor(
  input: OwpScoringInput,
): FactorScoreBatchResult {
  const teer = lookupVerifiedOption(
    TEER_OPTIONS,
    input.nocTeerOptionId,
    "job-teer",
    "NOC TEER category",
    "nocTeerOptionId",
  );
  if (isFactorScoreFailure(teer)) return teer;

  const broad = lookupVerifiedOption(
    BROAD_OPTIONS,
    input.nocBroadOptionId,
    "job-broad",
    "NOC broad occupational category",
    "nocBroadOptionId",
  );
  if (isFactorScoreFailure(broad)) return broad;

  return { ok: true, rows: [teer, broad] };
}
