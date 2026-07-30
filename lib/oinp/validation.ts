/**
 * OWP Job Offer input validation against Human-Verified option IDs (P3.2.1).
 *
 * Does not calculate points, infer bands from raw wage/CLB/city/NOC, or
 * implement normalization. Scorers (P3.2.2+) consume validated option IDs only.
 */

import { OINP_CANADIAN_CREDENTIAL_TABLE_OPTIONS } from "./tables/canadian-credential";
import { OINP_EARNINGS_TABLE_OPTIONS } from "./tables/earnings";
import { OINP_EDUCATION_TABLE_OPTIONS } from "./tables/education";
import { OINP_JOB_TABLE_OPTIONS } from "./tables/job";
import { OINP_LANGUAGE_TABLE_OPTIONS } from "./tables/language";
import { OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS } from "./tables/ontario-work-experience";
import { OINP_REGION_TABLE_OPTIONS } from "./tables/region";
import { OINP_STATUS_TABLE_OPTIONS } from "./tables/status";
import { OINP_WAGE_TABLE_OPTIONS } from "./tables/wage";
import {
  OWP_ONTARIO_WORK_EXPERIENCE_MODES,
  type OwpOntarioWorkExperienceMode,
  type OwpScoringInput,
  type OwpScoringInputField,
  type OwpValidationResult,
} from "./types";

const TEER_OPTION_IDS = OINP_JOB_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("teer-"),
).map((o) => o.id);

const BROAD_OPTION_IDS = OINP_JOB_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("broad-"),
).map((o) => o.id);

const WAGE_OPTION_IDS = OINP_WAGE_TABLE_OPTIONS.map((o) => o.id);

const IN_OFFER_OPTION_IDS = OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS.filter(
  (o) => o.id.startsWith("in-offer-"),
).map((o) => o.id);

const ONTARIO_GENERAL_OPTION_IDS =
  OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS.filter((o) =>
    o.id.startsWith("ontario-general-"),
  ).map((o) => o.id);

const PHYSICIAN_OPTION_IDS = OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS.filter(
  (o) => o.id.startsWith("physician-"),
).map((o) => o.id);

const EARNINGS_OPTION_IDS = OINP_EARNINGS_TABLE_OPTIONS.map((o) => o.id);
const STATUS_OPTION_IDS = OINP_STATUS_TABLE_OPTIONS.map((o) => o.id);
const EDUCATION_OPTION_IDS = OINP_EDUCATION_TABLE_OPTIONS.map((o) => o.id);
const CANADIAN_CREDENTIAL_OPTION_IDS = OINP_CANADIAN_CREDENTIAL_TABLE_OPTIONS.map(
  (o) => o.id,
);

const LANGUAGE_ABILITY_OPTION_IDS = OINP_LANGUAGE_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("language-clb-"),
).map((o) => o.id);

const LANGUAGE_KNOWLEDGE_OPTION_IDS = OINP_LANGUAGE_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("language-knowledge-"),
).map((o) => o.id);

const REGION_OPTION_IDS = OINP_REGION_TABLE_OPTIONS.map((o) => o.id);

const LANGUAGE_ABILITY_CLB_6_OR_HIGHER = new Set([
  "language-clb-6",
  "language-clb-7",
  "language-clb-8",
  "language-clb-9-or-higher",
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function includesId(list: readonly string[], value: string): boolean {
  return list.includes(value);
}

function fail(
  input: OwpScoringInput,
  error: string,
  code: string,
  field?: OwpScoringInputField,
): OwpValidationResult {
  return { ok: false, input, error, field, code };
}

function requireTrimmedId(
  input: OwpScoringInput,
  raw: unknown,
  field: OwpScoringInputField,
  emptyMessage: string,
): { ok: true; value: string } | OwpValidationResult {
  if (typeof raw !== "string") {
    return fail(input, emptyMessage, "invalid_option_id", field);
  }
  const value = raw.trim();
  if (value.length === 0) {
    return fail(input, emptyMessage, "empty_option_id", field);
  }
  return { ok: true, value };
}

function requireKnownId(
  input: OwpScoringInput,
  value: string,
  allowed: readonly string[],
  field: OwpScoringInputField,
  unknownMessage: string,
): OwpValidationResult | null {
  if (!includesId(allowed, value)) {
    return fail(input, unknownMessage, "unknown_option_id", field);
  }
  return null;
}

/**
 * Validate OWP Job Offer scoring input against Human-Verified option IDs.
 * Always echoes `input` on failure (may be partial). Success returns trimmed IDs.
 */
export function validateOwpInput(input: OwpScoringInput): OwpValidationResult {
  if (!isPlainObject(input)) {
    return {
      ok: false,
      input: input as OwpScoringInput,
      error: "输入必须是对象。",
      code: "invalid_input",
      field: undefined,
    };
  }

  if (input.applicantKind !== "job-offer") {
    return fail(
      input,
      "当前仅支持 Ontario Workforce Priority Job Offer 路径。",
      "invalid_applicant_kind",
      "applicantKind",
    );
  }

  const teer = requireTrimmedId(
    input,
    input.nocTeerOptionId,
    "nocTeerOptionId",
    "NOC TEER 选项不能为空。",
  );
  if (!("value" in teer)) return teer;
  const teerErr = requireKnownId(
    input,
    teer.value,
    TEER_OPTION_IDS,
    "nocTeerOptionId",
    "NOC TEER 选项无效。",
  );
  if (teerErr) return teerErr;

  const broad = requireTrimmedId(
    input,
    input.nocBroadOptionId,
    "nocBroadOptionId",
    "NOC 职业大类选项不能为空。",
  );
  if (!("value" in broad)) return broad;
  const broadErr = requireKnownId(
    input,
    broad.value,
    BROAD_OPTION_IDS,
    "nocBroadOptionId",
    "NOC 职业大类选项无效。",
  );
  if (broadErr) return broadErr;

  const wage = requireTrimmedId(
    input,
    input.wageOptionId,
    "wageOptionId",
    "时薪档选项不能为空。",
  );
  if (!("value" in wage)) return wage;
  const wageErr = requireKnownId(
    input,
    wage.value,
    WAGE_OPTION_IDS,
    "wageOptionId",
    "时薪档选项无效。",
  );
  if (wageErr) return wageErr;

  if (!isPlainObject(input.ontarioWorkExperience)) {
    return fail(
      input,
      "安省工作经验必须是包含 mode 与 optionId 的对象。",
      "owe_malformed",
      "ontarioWorkExperience",
    );
  }

  const oweModeRaw = input.ontarioWorkExperience.mode;
  if (
    typeof oweModeRaw !== "string" ||
    !(OWP_ONTARIO_WORK_EXPERIENCE_MODES as readonly string[]).includes(
      oweModeRaw,
    )
  ) {
    return fail(
      input,
      "安省工作经验 mode 无效。",
      "owe_invalid_mode",
      "ontarioWorkExperience.mode",
    );
  }
  const oweMode = oweModeRaw as OwpOntarioWorkExperienceMode;

  const oweOption = requireTrimmedId(
    input,
    input.ontarioWorkExperience.optionId,
    "ontarioWorkExperience.optionId",
    "安省工作经验选项不能为空。",
  );
  if (!("value" in oweOption)) return oweOption;

  if (includesId(PHYSICIAN_OPTION_IDS, oweOption.value)) {
    return fail(
      input,
      "Job Offer MVP 不支持 self-employed physician 工作经验选项。",
      "physician_excluded",
      "ontarioWorkExperience.optionId",
    );
  }

  const oweAllowed =
    oweMode === "in-offer-position"
      ? IN_OFFER_OPTION_IDS
      : ONTARIO_GENERAL_OPTION_IDS;

  if (!includesId(oweAllowed, oweOption.value)) {
    return fail(
      input,
      "安省工作经验 mode 与 optionId 不匹配。",
      "owe_mode_option_mismatch",
      "ontarioWorkExperience.optionId",
    );
  }

  const earnings = requireTrimmedId(
    input,
    input.earningsOptionId,
    "earningsOptionId",
    "收入历史选项不能为空。",
  );
  if (!("value" in earnings)) return earnings;
  const earningsErr = requireKnownId(
    input,
    earnings.value,
    EARNINGS_OPTION_IDS,
    "earningsOptionId",
    "收入历史选项无效。",
  );
  if (earningsErr) return earningsErr;

  const status = requireTrimmedId(
    input,
    input.statusOptionId,
    "statusOptionId",
    "法律身份选项不能为空。",
  );
  if (!("value" in status)) return status;
  const statusErr = requireKnownId(
    input,
    status.value,
    STATUS_OPTION_IDS,
    "statusOptionId",
    "法律身份选项无效。",
  );
  if (statusErr) return statusErr;

  const education = requireTrimmedId(
    input,
    input.educationOptionId,
    "educationOptionId",
    "最高学历选项不能为空。",
  );
  if (!("value" in education)) return education;
  const educationErr = requireKnownId(
    input,
    education.value,
    EDUCATION_OPTION_IDS,
    "educationOptionId",
    "最高学历选项无效。",
  );
  if (educationErr) return educationErr;

  const credential = requireTrimmedId(
    input,
    input.canadianCredentialOptionId,
    "canadianCredentialOptionId",
    "加拿大学历数量选项不能为空。",
  );
  if (!("value" in credential)) return credential;
  const credentialErr = requireKnownId(
    input,
    credential.value,
    CANADIAN_CREDENTIAL_OPTION_IDS,
    "canadianCredentialOptionId",
    "加拿大学历数量选项无效。",
  );
  if (credentialErr) return credentialErr;

  const languageAbility = requireTrimmedId(
    input,
    input.languageAbilityOptionId,
    "languageAbilityOptionId",
    "官方语言能力选项不能为空。",
  );
  if (!("value" in languageAbility)) return languageAbility;
  const languageAbilityErr = requireKnownId(
    input,
    languageAbility.value,
    LANGUAGE_ABILITY_OPTION_IDS,
    "languageAbilityOptionId",
    "官方语言能力选项无效。",
  );
  if (languageAbilityErr) return languageAbilityErr;

  const languageKnowledge = requireTrimmedId(
    input,
    input.languageKnowledgeOptionId,
    "languageKnowledgeOptionId",
    "官方语言数量选项不能为空。",
  );
  if (!("value" in languageKnowledge)) return languageKnowledge;
  const languageKnowledgeErr = requireKnownId(
    input,
    languageKnowledge.value,
    LANGUAGE_KNOWLEDGE_OPTION_IDS,
    "languageKnowledgeOptionId",
    "官方语言数量选项无效。",
  );
  if (languageKnowledgeErr) return languageKnowledgeErr;

  if (
    languageKnowledge.value === "language-knowledge-two-official" &&
    !LANGUAGE_ABILITY_CLB_6_OR_HIGHER.has(languageAbility.value)
  ) {
    return fail(
      input,
      "选择两种官方语言时，语言能力须至少为 CLB 6。",
      "language_combo_invalid",
      "languageKnowledgeOptionId",
    );
  }

  const region = requireTrimmedId(
    input,
    input.regionOptionId,
    "regionOptionId",
    "工作地区选项不能为空。",
  );
  if (!("value" in region)) return region;
  const regionErr = requireKnownId(
    input,
    region.value,
    REGION_OPTION_IDS,
    "regionOptionId",
    "工作地区选项无效。",
  );
  if (regionErr) return regionErr;

  return {
    ok: true,
    input: {
      applicantKind: "job-offer",
      nocTeerOptionId: teer.value,
      nocBroadOptionId: broad.value,
      wageOptionId: wage.value,
      ontarioWorkExperience: {
        mode: oweMode,
        optionId: oweOption.value,
      },
      earningsOptionId: earnings.value,
      statusOptionId: status.value,
      educationOptionId: education.value,
      canadianCredentialOptionId: credential.value,
      languageAbilityOptionId: languageAbility.value,
      languageKnowledgeOptionId: languageKnowledge.value,
      regionOptionId: region.value,
    },
  };
}
