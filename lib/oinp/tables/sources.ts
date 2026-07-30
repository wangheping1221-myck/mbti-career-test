/**
 * P2.2 official source inventory for active OWP Job Offer factors.
 * No scoring values. Historical closed-stream pages are listed separately
 * and must not enter OINP_OWP_TABLE_REGISTRY as scoring sources.
 */

import { OINP_CANADIAN_CREDENTIAL_TABLE } from "./canadian-credential";
import { OINP_EARNINGS_TABLE } from "./earnings";
import { OINP_EDUCATION_TABLE } from "./education";
import { OINP_JOB_TABLE } from "./job";
import { OINP_LANGUAGE_TABLE } from "./language";
import { OINP_ONTARIO_WORK_EXPERIENCE_TABLE } from "./ontario-work-experience";
import { OINP_REGION_TABLE } from "./region";
import { OINP_STATUS_TABLE } from "./status";
import type { OfficialFactorTable, OfficialSourceStrength } from "./types";
import {
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
import { OINP_WAGE_TABLE } from "./wage";

const ACTIVE_TABLES: readonly OfficialFactorTable[] = [
  OINP_JOB_TABLE,
  OINP_WAGE_TABLE,
  OINP_ONTARIO_WORK_EXPERIENCE_TABLE,
  OINP_EARNINGS_TABLE,
  OINP_STATUS_TABLE,
  OINP_EDUCATION_TABLE,
  OINP_CANADIAN_CREDENTIAL_TABLE,
  OINP_LANGUAGE_TABLE,
  OINP_REGION_TABLE,
];

export interface OinpOwpFactorSourceInventoryEntry {
  factorId: string;
  primarySourceUrl: string;
  primarySourceTitle: string;
  primarySourceStrength: OfficialSourceStrength;
  crossCheckSourceUrl?: string;
  crossCheckSourceTitle?: string;
  crossCheckSourceStrength?: OfficialSourceStrength;
  /** Mirrors each table's `source.verificationStatus`. */
  sourceStatus: OfficialFactorTable["source"]["verificationStatus"];
  unresolved: boolean;
  optionCount: number;
}

/**
 * Per-factor inventory derived from active table metadata (structural).
 */
export const OINP_OWP_FACTOR_SOURCE_INVENTORY: readonly OinpOwpFactorSourceInventoryEntry[] =
  ACTIVE_TABLES.map((table) => ({
    factorId: table.factorId,
    primarySourceUrl: table.source.sourceUrl,
    primarySourceTitle: table.source.sourceTitle,
    primarySourceStrength: table.source.sourceStrength,
    crossCheckSourceUrl: table.source.crossCheckUrl,
    crossCheckSourceTitle: table.source.crossCheckTitle,
    crossCheckSourceStrength: table.source.crossCheckStrength,
    sourceStatus: table.source.verificationStatus,
    unresolved: Boolean(table.source.unresolvedSourceNote),
    optionCount: table.options.length,
  }));

/**
 * Official pages opened / recorded during P2.2 collection (context + primary).
 * Not a scoring registry.
 */
export const OINP_OWP_OFFICIAL_PAGES_OPENED = [
  {
    url: OWP_STREAM_SCORING_SOURCE_URL,
    title: OWP_STREAM_SCORING_SOURCE_TITLE,
    strength: "primary-rule-source" as const,
    role: "Published OWP Scoring factors (all active Job Offer EOI factors)",
  },
  {
    url: OWP_APPLICATION_PROCESS_URL,
    title: OWP_APPLICATION_PROCESS_TITLE,
    strength: "official-cross-check" as const,
    role: "EOI process; directs scoring factors to the OWP stream page",
  },
  {
    url: OWP_PROGRAM_UPDATES_URL,
    title: OWP_PROGRAM_UPDATES_TITLE,
    strength: "official-context-only" as const,
    role: "Program redesign / EOI portal timing — time-sensitive context only",
  },
  {
    url: OWP_APPLICANT_CHECKLIST_URL,
    title: OWP_APPLICANT_CHECKLIST_TITLE,
    strength: "official-context-only" as const,
    role: "Documents supporting claimed EOI scoring factors (not the points grid)",
  },
  {
    url: "https://www.ontario.ca/laws/regulation/170422",
    title: "O. Reg. 422/17 under the Ontario Immigration Act, 2015 — ontario.ca",
    strength: "official-context-only" as const,
    role: "Governing regulation context; scoring grid values taken from stream page in P2.3",
  },
] as const;

/**
 * Closed-stream / redesign pages — historical-do-not-score.
 * May explain history only; never copy into active OWP options/points.
 */
export const OINP_HISTORICAL_DO_NOT_SCORE_SOURCES = [
  {
    url: "https://www.ontario.ca/page/oinp-employer-job-offer-foreign-worker-stream",
    title: "OINP Employer Job Offer: Foreign Worker stream — ontario.ca",
    strength: "historical-do-not-score" as const,
    note: "Stream closed. Historical Scoring factors must not populate OWP tables.",
  },
  {
    url: "https://www.ontario.ca/page/oinp-employer-job-offer-international-student-stream",
    title: "OINP Employer Job Offer: International Student stream — ontario.ca",
    strength: "historical-do-not-score" as const,
    note: "Stream closed / archived. Historical Scoring factors must not populate OWP tables.",
  },
  {
    url: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-expression-interest-system-streams",
    title:
      "Ontario Immigrant Nominee Program expression of interest system streams — ontario.ca",
    strength: "historical-do-not-score" as const,
    note: "Former multi-stream EOI page; redesign banner. Not the active OWP points grid.",
  },
] as const;

/**
 * Time-sensitive EOI / e-Filing availability context (not scoring constants).
 * Do not treat as a permanent open/closed boolean for product logic.
 */
export const OINP_OWP_PORTAL_STATUS_CONTEXT = {
  retrievedOn: OWP_SOURCE_COLLECTION_RETRIEVED_ON,
  sourceUrl: OWP_PROGRAM_UPDATES_URL,
  sourceTitle: OWP_PROGRAM_UPDATES_TITLE,
  sourceStrength: "official-context-only" as const,
  note:
    "EOI / e-Filing availability is time-sensitive. As of source collection, official Updates describe former EOIs closed to new registrations and OWP EOI anticipated to open later (wording may change). Always re-check ontario.ca Updates before publishing portal status copy. Not a scoring input.",
} as const;
