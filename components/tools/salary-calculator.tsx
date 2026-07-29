"use client";

import { useMemo, useState } from "react";

import { CalculationDetails } from "@/components/tools/calculation-details";
import { CalculatorPanel } from "@/components/tools/calculator-panel";
import { ResultCard } from "@/components/tools/result-card";
import { ResultPanel } from "@/components/tools/result-panel";
import { Button } from "@/components/ui/button";
import { calculateSalary } from "@/lib/salary/calculator";
import {
  DEFAULT_HOURS_PER_WEEK,
  DEFAULT_WEEKS_PER_YEAR,
  EXAMPLE_ANNUAL_SALARY,
  HOURS_PRESETS,
} from "@/lib/salary/constants";
import { formatCad, parseNumericInput } from "@/lib/salary/format";
import type { ConversionMode } from "@/lib/salary/types";
import { cn } from "@/lib/utils";

const inputClassName = cn(
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 shadow-sm",
  "placeholder:text-slate-400",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
);

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-slate-700"
    >
      {children}
    </label>
  );
}

export function SalaryCalculator() {
  const [mode, setMode] = useState<ConversionMode>("annual-to-hourly");
  const [annualInput, setAnnualInput] = useState(
    String(EXAMPLE_ANNUAL_SALARY),
  );
  const [hourlyInput, setHourlyInput] = useState("");
  const [hoursPreset, setHoursPreset] = useState<number | "custom">(
    DEFAULT_HOURS_PER_WEEK,
  );
  const [customHours, setCustomHours] = useState("");
  const [weeksInput, setWeeksInput] = useState(
    String(DEFAULT_WEEKS_PER_YEAR),
  );
  const [copied, setCopied] = useState(false);

  const hoursPerWeek =
    hoursPreset === "custom"
      ? (parseNumericInput(customHours) ?? NaN)
      : hoursPreset;

  const weeksPerYear = parseNumericInput(weeksInput) ?? NaN;
  const annualSalary = parseNumericInput(annualInput);
  const hourlyWage = parseNumericInput(hourlyInput);

  const result = useMemo(
    () =>
      calculateSalary({
        mode,
        annualSalary: mode === "annual-to-hourly" ? annualSalary : null,
        hourlyWage: mode === "hourly-to-annual" ? hourlyWage : null,
        hoursPerWeek,
        weeksPerYear,
      }),
    [mode, annualSalary, hourlyWage, hoursPerWeek, weeksPerYear],
  );

  const reset = () => {
    setMode("annual-to-hourly");
    setAnnualInput(String(EXAMPLE_ANNUAL_SALARY));
    setHourlyInput("");
    setHoursPreset(DEFAULT_HOURS_PER_WEEK);
    setCustomHours("");
    setWeeksInput(String(DEFAULT_WEEKS_PER_YEAR));
    setCopied(false);
  };

  const copyResult = async () => {
    if (!result.ok) {
      return;
    }

    const { values } = result;
    const text = [
      "加拿大年薪 / 时薪换算结果（税前）",
      `时薪：${formatCad(values.hourlyWage)}`,
      `周薪：${formatCad(values.weeklySalary)}`,
      `双周薪：${formatCad(values.biweeklySalary)}`,
      `月薪：${formatCad(values.monthlySalary)}`,
      `年薪：${formatCad(values.annualSalary)}`,
      `每周 ${result.hoursPerWeek} 小时 · 每年 ${result.weeksPerYear} 周`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const highlightHourly = mode === "annual-to-hourly";
  const highlightAnnual = mode === "hourly-to-annual";

  const detailRows =
    result.ok && mode === "annual-to-hourly"
      ? [
          { label: "年薪", value: formatCad(result.values.annualSalary) },
          { label: "每年工作周数", value: String(result.weeksPerYear) },
          { label: "每周工作小时数", value: String(result.hoursPerWeek) },
          { label: "时薪", value: formatCad(result.values.hourlyWage) },
        ]
      : result.ok
        ? [
            { label: "时薪", value: formatCad(result.values.hourlyWage) },
            { label: "每周工作小时数", value: String(result.hoursPerWeek) },
            { label: "每年工作周数", value: String(result.weeksPerYear) },
            { label: "年薪", value: formatCad(result.values.annualSalary) },
          ]
        : [];

  const equation = result.ok
    ? mode === "annual-to-hourly"
      ? `${formatCad(result.values.annualSalary)} ÷ ${result.weeksPerYear} ÷ ${result.hoursPerWeek} = ${formatCad(result.values.hourlyWage)}/小时`
      : `${formatCad(result.values.hourlyWage)} × ${result.hoursPerWeek} × ${result.weeksPerYear} = ${formatCad(result.values.annualSalary)}/年`
    : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <CalculatorPanel
        title="工资换算"
        description="支持年薪转时薪、时薪转年薪，并可查看周薪、双周薪与月薪。"
      >
        <div
          role="tablist"
          aria-label="换算模式"
          className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1"
        >
          {(
            [
              ["annual-to-hourly", "年薪转时薪"],
              ["hourly-to-annual", "时薪转年薪"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              className={cn(
                "h-10 rounded-lg text-sm font-medium transition",
                mode === value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900",
              )}
              onClick={() => setMode(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {mode === "annual-to-hourly" ? (
            <div>
              <FieldLabel htmlFor="annual-salary">年薪（Annual Salary）</FieldLabel>
              <input
                id="annual-salary"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="例如 65000"
                value={annualInput}
                onChange={(event) => setAnnualInput(event.target.value)}
                className={inputClassName}
                aria-invalid={
                  result.ok === false && annualInput.trim() !== ""
                    ? true
                    : undefined
                }
              />
            </div>
          ) : (
            <div>
              <FieldLabel htmlFor="hourly-wage">时薪（Hourly Wage）</FieldLabel>
              <input
                id="hourly-wage"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="例如 30"
                value={hourlyInput}
                onChange={(event) => setHourlyInput(event.target.value)}
                className={inputClassName}
                aria-invalid={
                  result.ok === false && hourlyInput.trim() !== ""
                    ? true
                    : undefined
                }
              />
            </div>
          )}

          <div>
            <p className="mb-1.5 text-sm font-medium text-slate-700">
              每周工作小时数（Hours per Week）
            </p>
            <div className="flex flex-wrap gap-2">
              {HOURS_PRESETS.map((preset) => {
                const selected = hoursPreset === preset;
                const label = preset === "custom" ? "自定义" : String(preset);
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setHoursPreset(preset)}
                    className={cn(
                      "h-9 rounded-lg border px-3 text-sm font-medium transition",
                      selected
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {hoursPreset === "custom" ? (
              <div className="mt-3">
                <FieldLabel htmlFor="custom-hours">自定义每周小时数</FieldLabel>
                <input
                  id="custom-hours"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="例如 37.5"
                  value={customHours}
                  onChange={(event) => setCustomHours(event.target.value)}
                  className={inputClassName}
                />
              </div>
            ) : null}
          </div>

          <div>
            <FieldLabel htmlFor="weeks-per-year">
              每年工作周数（Weeks per Year）
            </FieldLabel>
            <input
              id="weeks-per-year"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={weeksInput}
              onChange={(event) => setWeeksInput(event.target.value)}
              className={inputClassName}
            />
            <p className="mt-1.5 text-xs text-slate-500">
              默认 52 周；不得超过 52。
            </p>
          </div>
        </div>
      </CalculatorPanel>

      <div className="space-y-4">
        <ResultPanel
          title="换算结果"
          description="以下均为税前估算，单位为加元（CAD）。"
          error={result.ok ? null : result.error}
          actions={
            result.ok ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10"
                  onClick={reset}
                >
                  重置
                </Button>
                <Button
                  type="button"
                  className="h-10 bg-emerald-700 text-white hover:bg-emerald-800"
                  onClick={() => void copyResult()}
                >
                  {copied ? "已复制" : "复制结果"}
                </Button>
              </>
            ) : null
          }
        >
          {result.ok ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <ResultCard
                label="时薪"
                value={formatCad(result.values.hourlyWage)}
                highlighted={highlightHourly}
              />
              <ResultCard
                label="年薪"
                value={formatCad(result.values.annualSalary)}
                highlighted={highlightAnnual}
              />
              <ResultCard
                label="周薪"
                value={formatCad(result.values.weeklySalary)}
              />
              <ResultCard
                label="双周薪"
                value={formatCad(result.values.biweeklySalary)}
              />
              <ResultCard
                label="月薪"
                value={formatCad(result.values.monthlySalary)}
                className="sm:col-span-2"
              />
            </div>
          ) : null}
        </ResultPanel>

        {result.ok ? (
          <CalculationDetails rows={detailRows} equation={equation} />
        ) : null}
      </div>
    </div>
  );
}
