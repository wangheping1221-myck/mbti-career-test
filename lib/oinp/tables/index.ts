/**
 * Active OWP Job Offer factor-table registry (structural only).
 * Do not mix historical closed-stream tables into this registry.
 */

import { OINP_CANADIAN_CREDENTIAL_TABLE } from "./canadian-credential";
import { OINP_EARNINGS_TABLE } from "./earnings";
import { OINP_EDUCATION_TABLE } from "./education";
import { OINP_JOB_TABLE } from "./job";
import { OINP_LANGUAGE_TABLE } from "./language";
import { OINP_ONTARIO_WORK_EXPERIENCE_TABLE } from "./ontario-work-experience";
import { OINP_REGION_TABLE } from "./region";
import { OINP_STATUS_TABLE } from "./status";
import type { OfficialFactorTable } from "./types";
import { OINP_WAGE_TABLE } from "./wage";

export type {
  OfficialFactorTable,
  OfficialSourceStrength,
  OfficialTableOption,
  OfficialTableSource,
  OfficialTableStatus,
} from "./types";
export {
  createPendingOwpFactorSource,
  OWP_APPLICATION_PROCESS_TITLE,
  OWP_APPLICATION_PROCESS_URL,
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_PROGRAM_UPDATES_TITLE,
  OWP_PROGRAM_UPDATES_URL,
  OWP_SOURCE_COLLECTION_RETRIEVED_ON,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

export { OINP_JOB_TABLE, OINP_JOB_TABLE_OPTIONS } from "./job";
export { OINP_WAGE_TABLE, OINP_WAGE_TABLE_OPTIONS } from "./wage";
export {
  OINP_ONTARIO_WORK_EXPERIENCE_TABLE,
  OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS,
} from "./ontario-work-experience";
export { OINP_EARNINGS_TABLE, OINP_EARNINGS_TABLE_OPTIONS } from "./earnings";
export { OINP_STATUS_TABLE, OINP_STATUS_TABLE_OPTIONS } from "./status";
export { OINP_EDUCATION_TABLE, OINP_EDUCATION_TABLE_OPTIONS } from "./education";
export { OINP_CANADIAN_CREDENTIAL_TABLE } from "./canadian-credential";
export { OINP_LANGUAGE_TABLE } from "./language";
export { OINP_REGION_TABLE } from "./region";

export type { OinpOwpFactorSourceInventoryEntry } from "./sources";
export {
  OINP_HISTORICAL_DO_NOT_SCORE_SOURCES,
  OINP_OWP_FACTOR_SOURCE_INVENTORY,
  OINP_OWP_OFFICIAL_PAGES_OPENED,
  OINP_OWP_PORTAL_STATUS_CONTEXT,
} from "./sources";

/**
 * Readonly registry of active OWP Job Offer factor tables.
 * Structural references only — no totals or theoretical maximum.
 */
export const OINP_OWP_TABLE_REGISTRY: readonly OfficialFactorTable[] = [
  OINP_JOB_TABLE,
  OINP_WAGE_TABLE,
  OINP_ONTARIO_WORK_EXPERIENCE_TABLE,
  OINP_EARNINGS_TABLE,
  OINP_STATUS_TABLE,
  OINP_EDUCATION_TABLE,
  OINP_CANADIAN_CREDENTIAL_TABLE,
  OINP_LANGUAGE_TABLE,
  OINP_REGION_TABLE,
] as const;
