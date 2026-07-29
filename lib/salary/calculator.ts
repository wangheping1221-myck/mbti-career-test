import {
  MAX_HOURS_PER_WEEK,
  MAX_WEEKS_PER_YEAR,
} from "./constants";
import type {
  SalaryBreakdown,
  SalaryCalculationResult,
  SalaryInputValues,
} from "./types";

function isInvalidNumber(value: number): boolean {
  return !Number.isFinite(value) || Number.isNaN(value);
}

function validateSharedFields(
  hoursPerWeek: number,
  weeksPerYear: number,
): string | null {
  if (isInvalidNumber(hoursPerWeek) || hoursPerWeek <= 0) {
    return "每周工作小时数必须大于 0。";
  }

  if (hoursPerWeek > MAX_HOURS_PER_WEEK) {
    return `每周工作小时数不能超过 ${MAX_HOURS_PER_WEEK}。`;
  }

  if (isInvalidNumber(weeksPerYear) || weeksPerYear <= 0) {
    return "每年工作周数必须大于 0。";
  }

  if (weeksPerYear > MAX_WEEKS_PER_YEAR) {
    return `每年工作周数不能超过 ${MAX_WEEKS_PER_YEAR}。`;
  }

  return null;
}

function buildBreakdown(
  hourlyWage: number,
  annualSalary: number,
  hoursPerWeek: number,
): SalaryBreakdown {
  const weeklySalary = hourlyWage * hoursPerWeek;
  const biweeklySalary = weeklySalary * 2;
  const monthlySalary = annualSalary / 12;

  return {
    hourlyWage,
    weeklySalary,
    biweeklySalary,
    monthlySalary,
    annualSalary,
  };
}

/**
 * 税前年薪 / 时薪换算（纯函数）。
 * 派生项均由同一组标准化的时薪与年薪计算，保证两种模式一致。
 */
export function calculateSalary(
  inputs: SalaryInputValues,
): SalaryCalculationResult {
  const sharedError = validateSharedFields(
    inputs.hoursPerWeek,
    inputs.weeksPerYear,
  );

  if (sharedError) {
    return { ok: false, error: sharedError };
  }

  const { hoursPerWeek, weeksPerYear, mode } = inputs;

  if (mode === "annual-to-hourly") {
    const annualSalary = inputs.annualSalary;

    if (annualSalary === null) {
      return { ok: false, error: "请输入年薪。" };
    }

    if (isInvalidNumber(annualSalary) || annualSalary <= 0) {
      return { ok: false, error: "年薪必须大于 0。" };
    }

    const hourlyWage = annualSalary / hoursPerWeek / weeksPerYear;
    const values = buildBreakdown(hourlyWage, annualSalary, hoursPerWeek);

    return {
      ok: true,
      values,
      mode,
      hoursPerWeek,
      weeksPerYear,
    };
  }

  const hourlyWage = inputs.hourlyWage;

  if (hourlyWage === null) {
    return { ok: false, error: "请输入时薪。" };
  }

  if (isInvalidNumber(hourlyWage) || hourlyWage <= 0) {
    return { ok: false, error: "时薪必须大于 0。" };
  }

  const annualSalary = hourlyWage * hoursPerWeek * weeksPerYear;
  const values = buildBreakdown(hourlyWage, annualSalary, hoursPerWeek);

  return {
    ok: true,
    values,
    mode,
    hoursPerWeek,
    weeksPerYear,
  };
}
