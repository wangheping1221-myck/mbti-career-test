"use client";

import { useMemo, useState } from "react";

import { CalculationDetails } from "@/components/tools/calculation-details";
import { CalculatorPanel } from "@/components/tools/calculator-panel";
import { ResultCard } from "@/components/tools/result-card";
import { ResultPanel } from "@/components/tools/result-panel";
import { Button } from "@/components/ui/button";
import { calculateCLB } from "@/lib/clb/calculator";
import {
  CLB_SKILLS,
  IELTS_BAND_MAX,
  IELTS_BAND_MIN,
  IELTS_BAND_STEP,
} from "@/lib/clb/constants";
import type { ClbSkill, IELTSGeneralScores } from "@/lib/clb/types";
import { cn } from "@/lib/utils";

type BandValue = "" | `${number}`;

type BandState = Record<ClbSkill, BandValue>;

const EMPTY_BANDS: BandState = {
  listening: "",
  reading: "",
  writing: "",
  speaking: "",
};

const SKILL_META: Record<
  ClbSkill,
  { label: string; english: string; inputId: string }
> = {
  listening: {
    label: "听力",
    english: "Listening",
    inputId: "clb-ielts-listening",
  },
  reading: {
    label: "阅读",
    english: "Reading",
    inputId: "clb-ielts-reading",
  },
  writing: {
    label: "写作",
    english: "Writing",
    inputId: "clb-ielts-writing",
  },
  speaking: {
    label: "口语",
    english: "Speaking",
    inputId: "clb-ielts-speaking",
  },
};

/** Legal IELTS band choices: 0, 0.5, …, 9 */
const IELTS_BAND_OPTIONS: number[] = (() => {
  const options: number[] = [];
  for (
    let value = IELTS_BAND_MIN;
    value <= IELTS_BAND_MAX + 1e-9;
    value += IELTS_BAND_STEP
  ) {
    options.push(Number(value.toFixed(1)));
  }
  return options;
})();

const selectClassName = cn(
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 shadow-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
);

function parseBands(state: BandState): IELTSGeneralScores | null {
  for (const skill of CLB_SKILLS) {
    if (state[skill] === "") {
      return null;
    }
  }

  return {
    listening: Number(state.listening),
    reading: Number(state.reading),
    writing: Number(state.writing),
    speaking: Number(state.speaking),
  };
}

function formatBand(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function ClbCalculator() {
  const [bands, setBands] = useState<BandState>(EMPTY_BANDS);

  const parsed = useMemo(() => parseBands(bands), [bands]);

  const outcome = useMemo(
    () => (parsed ? calculateCLB(parsed) : null),
    [parsed],
  );

  const reset = () => {
    setBands(EMPTY_BANDS);
  };

  const setSkill = (skill: ClbSkill, value: string) => {
    setBands((current) => ({
      ...current,
      [skill]: value as BandValue,
    }));
  };

  const incomplete = parsed === null;

  const lowestSkill: ClbSkill =
    outcome?.ok
      ? (CLB_SKILLS.find(
          (skill) => outcome.result[skill] === outcome.result.overall,
        ) ?? "listening")
      : "listening";
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <CalculatorPanel
        title="IELTS General Training"
        description="请选择听说读写四项成绩。本工具仅支持 General Training，不支持 Academic。"
      >
        <p className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
          提示：请使用 IELTS{" "}
          <span className="font-medium text-slate-800">General Training</span>{" "}
          成绩单上的分数。Academic 成绩不可直接用于本换算。
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {CLB_SKILLS.map((skill) => {
            const meta = SKILL_META[skill];
            return (
              <div key={skill}>
                <label
                  htmlFor={meta.inputId}
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  {meta.label}（{meta.english}）
                </label>
                <select
                  id={meta.inputId}
                  value={bands[skill]}
                  onChange={(event) => setSkill(skill, event.target.value)}
                  className={selectClassName}
                  aria-invalid={
                    outcome && !outcome.ok && outcome.field === skill
                      ? true
                      : undefined
                  }
                >
                  <option value="">请选择</option>
                  {IELTS_BAND_OPTIONS.map((band) => (
                    <option key={band} value={String(band)}>
                      {formatBand(band)}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          <Button
            type="button"
            variant="outline"
            className="h-10"
            onClick={reset}
          >
            重置
          </Button>
        </div>
      </CalculatorPanel>

      <div className="space-y-4">
        <ResultPanel
          title="换算结果"
          description="Overall CLB 为四项中的最低 CLB，不是平均分。"
          error={
            incomplete
              ? null
              : outcome && !outcome.ok
                ? outcome.error
                : null
          }
        >
          {outcome?.ok ? (
            <div className="space-y-3">
              <ResultCard
                label="Overall CLB（最低单项）"
                value={`CLB ${outcome.result.overall}`}
                highlighted
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <ResultCard
                  label="Listening CLB"
                  value={`CLB ${outcome.result.listening}`}
                />
                <ResultCard
                  label="Reading CLB"
                  value={`CLB ${outcome.result.reading}`}
                />
                <ResultCard
                  label="Writing CLB"
                  value={`CLB ${outcome.result.writing}`}
                />
                <ResultCard
                  label="Speaking CLB"
                  value={`CLB ${outcome.result.speaking}`}
                />
              </div>
            </div>
          ) : incomplete ? (
            <p className="text-sm leading-relaxed text-slate-600">
              请先选择四项 IELTS General Training 成绩，结果将即时显示。
            </p>
          ) : null}
        </ResultPanel>

        {outcome?.ok ? (
          <CalculationDetails
            title="计算过程"
            rows={[
              {
                label: "Listening",
                value: `${formatBand(outcome.input.listening)} → CLB ${outcome.result.listening}`,
              },
              {
                label: "Reading",
                value: `${formatBand(outcome.input.reading)} → CLB ${outcome.result.reading}`,
              },
              {
                label: "Writing",
                value: `${formatBand(outcome.input.writing)} → CLB ${outcome.result.writing}`,
              },
              {
                label: "Speaking",
                value: `${formatBand(outcome.input.speaking)} → CLB ${outcome.result.speaking}`,
              },
              {
                label: "最低项",
                value: `${SKILL_META[lowestSkill].english}（CLB ${outcome.result.overall}）`,
              },
              {
                label: "Overall CLB",
                value: `CLB ${outcome.result.overall}`,
              },
            ]}
            equation={`Overall CLB = min(听, 读, 写, 说) = CLB ${outcome.result.overall}。此汇总便于查看短板，不代表所有移民项目只看最低项。`}
          />
        ) : null}
      </div>
    </div>
  );
}
