/**
 * Structural validation shell for OWP Job Offer input (P1.2).
 *
 * Checks presence, non-empty category ids, and declared provisional unions only.
 * Does NOT validate official wage/CLB/region thresholds, work-experience scoring
 * rules, or eligibility.
 */

import {
  PROVISIONAL_OWP_CANADIAN_CREDENTIALS_CATEGORIES,
  PROVISIONAL_OWP_LEGAL_STATUS_CATEGORIES,
  PROVISIONAL_OWP_NOC_TEER_CATEGORIES,
  PROVISIONAL_OWP_OFFICIAL_LANGUAGES_CATEGORIES,
  PROVISIONAL_OWP_WORK_EXPERIENCE_MODES,
  type OwpInput,
  type OwpInputField,
  type OwpValidationResult,
} from "./types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function includesValue<T extends string>(
  list: readonly T[],
  value: unknown,
): value is T {
  return typeof value === "string" && (list as readonly string[]).includes(value);
}

function fail(
  input: OwpInput,
  error: string,
  field?: OwpInputField,
): OwpValidationResult {
  return { ok: false, input, error, field };
}

/**
 * Validate OWP Job Offer input structure.
 * Always echoes `input` on both success and failure (CLB-like shell with input).
 */
export function validateOwpInput(input: OwpInput): OwpValidationResult {
  if (!isPlainObject(input)) {
    return {
      ok: false,
      input,
      error: "输入必须是对象。",
      field: undefined,
    };
  }

  if (input.applicantKind !== "job-offer") {
    return fail(
      input,
      "当前仅支持 Ontario Workforce Priority Job Offer 路径。",
      "applicantKind",
    );
  }

  if (!includesValue(PROVISIONAL_OWP_NOC_TEER_CATEGORIES, input.nocTeer)) {
    return fail(input, "NOC TEER 分类无效。", "nocTeer");
  }

  if (!isNonEmptyString(input.nocBroadCategory)) {
    return fail(input, "职业大类分类不能为空。", "nocBroadCategory");
  }

  if (!isNonEmptyString(input.hourlyWageBand)) {
    return fail(input, "工资档分类不能为空。", "hourlyWageBand");
  }

  if (!isPlainObject(input.ontarioWorkExperience)) {
    return fail(
      input,
      "安省工作经验必须是包含 mode 与 band 的对象。",
      "ontarioWorkExperience",
    );
  }

  if (
    !includesValue(
      PROVISIONAL_OWP_WORK_EXPERIENCE_MODES,
      input.ontarioWorkExperience.mode,
    )
  ) {
    return fail(
      input,
      "安省工作经验 mode 无效。",
      "ontarioWorkExperience.mode",
    );
  }

  if (!isNonEmptyString(input.ontarioWorkExperience.band)) {
    return fail(
      input,
      "安省工作经验 band 不能为空。",
      "ontarioWorkExperience.band",
    );
  }

  if (!isNonEmptyString(input.earningsHistoryBand)) {
    return fail(input, "收入历史分类不能为空。", "earningsHistoryBand");
  }

  if (!includesValue(PROVISIONAL_OWP_LEGAL_STATUS_CATEGORIES, input.legalStatus)) {
    return fail(input, "身份 / 许可状态分类无效。", "legalStatus");
  }

  if (!isNonEmptyString(input.highestEducationBand)) {
    return fail(input, "最高学历分类不能为空。", "highestEducationBand");
  }

  if (
    !includesValue(
      PROVISIONAL_OWP_CANADIAN_CREDENTIALS_CATEGORIES,
      input.canadianCredentials,
    )
  ) {
    return fail(input, "加拿大学历数量分类无效。", "canadianCredentials");
  }

  if (!isNonEmptyString(input.primaryLanguageBand)) {
    return fail(input, "主语言能力分类不能为空。", "primaryLanguageBand");
  }

  if (
    !includesValue(
      PROVISIONAL_OWP_OFFICIAL_LANGUAGES_CATEGORIES,
      input.officialLanguages,
    )
  ) {
    return fail(input, "官方语言数量分类无效。", "officialLanguages");
  }

  if (!isNonEmptyString(input.workLocationRegion)) {
    return fail(input, "工作地点区域分类不能为空。", "workLocationRegion");
  }

  return {
    ok: true,
    input: {
      applicantKind: "job-offer",
      nocTeer: input.nocTeer,
      nocBroadCategory: input.nocBroadCategory.trim(),
      hourlyWageBand: input.hourlyWageBand.trim(),
      ontarioWorkExperience: {
        mode: input.ontarioWorkExperience.mode,
        band: input.ontarioWorkExperience.band.trim(),
      },
      earningsHistoryBand: input.earningsHistoryBand.trim(),
      legalStatus: input.legalStatus,
      highestEducationBand: input.highestEducationBand.trim(),
      canadianCredentials: input.canadianCredentials,
      primaryLanguageBand: input.primaryLanguageBand.trim(),
      officialLanguages: input.officialLanguages,
      workLocationRegion: input.workLocationRegion.trim(),
    },
  };
}
