export type ConversionMode = "annual-to-hourly" | "hourly-to-annual";

export interface SalaryInputValues {
  mode: ConversionMode;
  /** 年薪（年薪转时薪模式必填） */
  annualSalary: number | null;
  /** 时薪（时薪转年薪模式必填） */
  hourlyWage: number | null;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface SalaryBreakdown {
  hourlyWage: number;
  weeklySalary: number;
  biweeklySalary: number;
  monthlySalary: number;
  annualSalary: number;
}

export interface SalaryCalculationSuccess {
  ok: true;
  values: SalaryBreakdown;
  mode: ConversionMode;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface SalaryCalculationFailure {
  ok: false;
  error: string;
}

export type SalaryCalculationResult =
  | SalaryCalculationSuccess
  | SalaryCalculationFailure;
