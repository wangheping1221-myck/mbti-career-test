/**
 * Regionalization — location of work in job offer factor.
 *
 * P2.3.9 Human Verify — values transcribed from the active OWP stream
 * Scoring factors page only. Other factor tables unchanged.
 *
 * Geographic membership is recorded only as official Census Division /
 * regional municipality wording on the stream page. Municipality-level
 * membership is not inferred beyond that published text.
 */

import type { OfficialFactorTable, OfficialTableOption } from "./types";
import {
  OWP_APPLICANT_CHECKLIST_TITLE,
  OWP_APPLICANT_CHECKLIST_URL,
  OWP_STREAM_SCORING_SOURCE_TITLE,
  OWP_STREAM_SCORING_SOURCE_URL,
} from "./types";

/** Date of P2.3.9 Region Factor Human Verify against ontario.ca. */
const REGION_FACTOR_RETRIEVED_ON = "2026-07-30";

const REGION_OPTION_SOURCE = OWP_STREAM_SCORING_SOURCE_URL;

function verifiedRegionOption(
  option: Omit<OfficialTableOption, "sourceUrl" | "retrievedOn" | "verified"> & {
    points: number;
  },
): OfficialTableOption {
  return {
    ...option,
    sourceUrl: REGION_OPTION_SOURCE,
    retrievedOn: REGION_FACTOR_RETRIEVED_ON,
    verified: true,
  };
}

/**
 * Official options from:
 * Ontario Workforce Priority stream → Scoring factors →
 * Regionalization → Regional immigration: location of work location in job offer.
 *
 * Official process notes (not separate point rows):
 * - Job-offer EOIs: regionalization from the work location in the job offer
 *   entered by the employer.
 * - Self-employed physicians: regionalization from Ontario practice address
 *   per OHIP billing number registration (out of V2.4 Job Offer MVP path).
 *
 * Official region definitions (same page, after the point bands) are recorded
 * in each option's notes. Eligible Ontario/Canadian institution lists that
 * follow on the page belong to education-credential context, not this factor.
 */
export const OINP_REGION_TABLE_OPTIONS: readonly OfficialTableOption[] = [
  verifiedRegionOption({
    id: "region-northern-ontario",
    label: "Northern Ontario",
    description:
      "Regional immigration: location of work location in job offer",
    points: 15,
    notes:
      "Official scoring label: Northern Ontario. Official definition: Northern Ontario — includes the following Census Divisions: Muskoka, Haliburton, Nipissing, Parry Sound, Manitoulin, Sudbury, Greater Sudbury/Grand Sudbury, Timiskaming, Cochrane, Algoma, Thunder Bay, Rainy River and Kenora.",
  }),
  verifiedRegionOption({
    id: "region-eastern-ontario",
    label: "Eastern Ontario",
    description:
      "Regional immigration: location of work location in job offer",
    points: 10,
    notes:
      "Official scoring label: Eastern Ontario. Official definition: Eastern Ontario — includes the following Census Divisions: Frontenac, Hastings, Kawartha Lakes, Lanark, Leeds and Grenville, Lennox and Addington, Northumberland, Ottawa, Peterborough, Prescott and Russell, Prince Edward, Renfrew, Stormont, Dundas and Glengarry.",
  }),
  verifiedRegionOption({
    id: "region-central-ontario-outside-gta",
    label: "Central Ontario outside GTA",
    description:
      "Regional immigration: location of work location in job offer",
    points: 10,
    notes:
      "Official scoring label: Central Ontario outside GTA. Official definition wording: Central Ontario (excluding Greater Toronto Area) — includes the following Census Divisions: Dufferin, Grey, Simcoe, Waterloo and Wellington.",
  }),
  verifiedRegionOption({
    id: "region-southwestern-ontario",
    label: "Southwestern Ontario",
    description:
      "Regional immigration: location of work location in job offer",
    points: 10,
    notes:
      "Official scoring label: Southwestern Ontario. Official definition: Southwestern Ontario — includes the following Census Divisions: Brant, Bruce, Chatham-Kent, Elgin, Essex, Haldimand-Norfolk, Hamilton, Huron, Lambton, Middlesex, Niagara, Oxford and Perth.",
  }),
  verifiedRegionOption({
    id: "region-inside-gta-except-toronto",
    label: "Inside GTA (except Toronto)",
    description:
      "Regional immigration: location of work location in job offer",
    points: 5,
    notes:
      "Official scoring label: Inside GTA (except Toronto). Official definition wording: Inside Greater Toronto Area (except Toronto) — includes the regional municipalities of Durham, Halton, Peel and York.",
  }),
  verifiedRegionOption({
    id: "region-toronto",
    label: "Toronto",
    description:
      "Regional immigration: location of work location in job offer",
    points: 0,
    notes:
      "Official scoring label: Toronto. Official definition: Toronto — includes the City of Toronto.",
  }),
] as const;

export const OINP_REGION_TABLE: OfficialFactorTable = {
  factorId: "region",
  title: "Regionalization — location of work in job offer",
  source: {
    sourceUrl: OWP_STREAM_SCORING_SOURCE_URL,
    sourceTitle: OWP_STREAM_SCORING_SOURCE_TITLE,
    sourceStrength: "primary-rule-source",
    crossCheckUrl: OWP_APPLICANT_CHECKLIST_URL,
    crossCheckTitle: OWP_APPLICANT_CHECKLIST_TITLE,
    crossCheckStrength: "official-context-only",
    retrievedOn: REGION_FACTOR_RETRIEVED_ON,
    effectiveNote:
      "P2.3.9 Human Verify complete for Regionalization Factor only. Values from OWP stream Scoring factors → Regional immigration: location of work location in job offer. Six published bands. Region definitions are Census Divisions / regional municipalities / City of Toronto as published on the same page — municipality membership beyond that text was not inferred. Job-offer path uses employer-entered work location; physician OHIP-address path recorded as context only. Applicant checklist is context only. Eligible institution lists on the same page are not part of this factor.",
    verificationStatus: "human-verified",
    verificationNote:
      "Verified value-by-value against https://www.ontario.ca/page/ontario-workforce-priority-stream (Scoring factors → Regional immigration: location of work location in job offer) on 2026-07-30. Six published region bands with official Census Division / regional municipality definitions transcribed into option notes. No historical EJO values used. No city-level membership inferred from memory.",
  },
  options: OINP_REGION_TABLE_OPTIONS,
};
