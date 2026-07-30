"use client";

import { useId, useMemo, useRef, useState } from "react";

import { CalculationDetails } from "@/components/tools/calculation-details";
import { CalculatorPanel } from "@/components/tools/calculator-panel";
import { ResultCard } from "@/components/tools/result-card";
import { ResultPanel } from "@/components/tools/result-panel";
import { Button } from "@/components/ui/button";
import { calculateOwpEoi } from "@/lib/oinp/calculator";
import { OINP_CANADIAN_CREDENTIAL_TABLE_OPTIONS } from "@/lib/oinp/tables/canadian-credential";
import { OINP_EARNINGS_TABLE_OPTIONS } from "@/lib/oinp/tables/earnings";
import { OINP_EDUCATION_TABLE_OPTIONS } from "@/lib/oinp/tables/education";
import { OINP_JOB_TABLE_OPTIONS } from "@/lib/oinp/tables/job";
import { OINP_LANGUAGE_TABLE_OPTIONS } from "@/lib/oinp/tables/language";
import { OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS } from "@/lib/oinp/tables/ontario-work-experience";
import { OINP_REGION_TABLE_OPTIONS } from "@/lib/oinp/tables/region";
import { OINP_STATUS_TABLE_OPTIONS } from "@/lib/oinp/tables/status";
import { OINP_WAGE_TABLE_OPTIONS } from "@/lib/oinp/tables/wage";
import type {
  OwpCalculationResult,
  OwpOntarioWorkExperienceMode,
  OwpScoringInput,
} from "@/lib/oinp/types";
import { cn } from "@/lib/utils";

type OwePath = "" | OwpOntarioWorkExperienceMode;

type FormState = {
  nocTeerOptionId: string;
  nocBroadOptionId: string;
  wageOptionId: string;
  owePath: OwePath;
  oweOptionId: string;
  earningsOptionId: string;
  statusOptionId: string;
  educationOptionId: string;
  canadianCredentialOptionId: string;
  languageAbilityOptionId: string;
  languageKnowledgeOptionId: string;
  regionOptionId: string;
};

const EMPTY_FORM: FormState = {
  nocTeerOptionId: "",
  nocBroadOptionId: "",
  wageOptionId: "",
  owePath: "",
  oweOptionId: "",
  earningsOptionId: "",
  statusOptionId: "",
  educationOptionId: "",
  canadianCredentialOptionId: "",
  languageAbilityOptionId: "",
  languageKnowledgeOptionId: "",
  regionOptionId: "",
};

const TEER_OPTIONS = OINP_JOB_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("teer-"),
);
const BROAD_OPTIONS = OINP_JOB_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("broad-"),
);
/** In-offer primary path: exclude under-6 (guides user to ontario-general). */
const IN_OFFER_DURATION_OPTIONS =
  OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS.filter(
    (o) => o.id.startsWith("in-offer-") && o.id !== "in-offer-under-6-or-not",
  );
const ONTARIO_GENERAL_OPTIONS =
  OINP_ONTARIO_WORK_EXPERIENCE_TABLE_OPTIONS.filter((o) =>
    o.id.startsWith("ontario-general-"),
  );
const LANGUAGE_ABILITY_OPTIONS = OINP_LANGUAGE_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("language-clb-"),
);
const LANGUAGE_KNOWLEDGE_OPTIONS = OINP_LANGUAGE_TABLE_OPTIONS.filter((o) =>
  o.id.startsWith("language-knowledge-"),
);

const selectClassName = cn(
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 shadow-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
);

function isFormComplete(form: FormState): boolean {
  return (
    form.nocTeerOptionId !== "" &&
    form.nocBroadOptionId !== "" &&
    form.wageOptionId !== "" &&
    form.owePath !== "" &&
    form.oweOptionId !== "" &&
    form.earningsOptionId !== "" &&
    form.statusOptionId !== "" &&
    form.educationOptionId !== "" &&
    form.canadianCredentialOptionId !== "" &&
    form.languageAbilityOptionId !== "" &&
    form.languageKnowledgeOptionId !== "" &&
    form.regionOptionId !== ""
  );
}

function toScoringInput(form: FormState): OwpScoringInput | null {
  if (!isFormComplete(form) || form.owePath === "") return null;
  return {
    applicantKind: "job-offer",
    nocTeerOptionId: form.nocTeerOptionId,
    nocBroadOptionId: form.nocBroadOptionId,
    wageOptionId: form.wageOptionId,
    ontarioWorkExperience: {
      mode: form.owePath,
      optionId: form.oweOptionId,
    },
    earningsOptionId: form.earningsOptionId,
    statusOptionId: form.statusOptionId,
    educationOptionId: form.educationOptionId,
    canadianCredentialOptionId: form.canadianCredentialOptionId,
    languageAbilityOptionId: form.languageAbilityOptionId,
    languageKnowledgeOptionId: form.languageKnowledgeOptionId,
    regionOptionId: form.regionOptionId,
  };
}

function FieldSelect({
  id,
  label,
  english,
  help,
  value,
  onChange,
  options,
  disabledOptionIds,
  invalid,
}: {
  id: string;
  label: string;
  english: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { id: string; label: string }[];
  disabledOptionIds?: ReadonlySet<string>;
  invalid?: boolean;
}) {
  const helpId = `${id}-help`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        <span className="mt-0.5 block text-xs font-normal text-slate-500">
          {english}
        </span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClassName}
        aria-invalid={invalid || undefined}
        aria-describedby={help ? helpId : undefined}
      >
        <option value="">请选择</option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            disabled={disabledOptionIds?.has(option.id)}
          >
            {option.label}
          </option>
        ))}
      </select>
      {help ? (
        <p id={helpId} className="mt-1.5 text-xs leading-relaxed text-slate-500">
          {help}
        </p>
      ) : null}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b border-slate-200 pb-2 text-sm font-semibold tracking-wide text-slate-800 uppercase">
      {children}
    </h3>
  );
}

export function OinpEoiCalculator() {
  const formId = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [outcome, setOutcome] = useState<OwpCalculationResult | null>(null);
  const [incompleteMessage, setIncompleteMessage] = useState<string | null>(
    null,
  );

  const twoLanguagesDisabled =
    form.languageAbilityOptionId === "language-clb-5-or-lower";

  const disabledKnowledgeIds = useMemo(() => {
    if (!twoLanguagesDisabled) return undefined;
    return new Set(["language-knowledge-two-official"]);
  }, [twoLanguagesDisabled]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };

      if (key === "owePath") {
        next.oweOptionId = "";
      }

      if (
        key === "languageAbilityOptionId" &&
        value === "language-clb-5-or-lower" &&
        current.languageKnowledgeOptionId === "language-knowledge-two-official"
      ) {
        next.languageKnowledgeOptionId = "";
      }

      return next;
    });
    setOutcome(null);
    setIncompleteMessage(null);
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setOutcome(null);
    setIncompleteMessage(null);
  };

  const handleCalculate = () => {
    const input = toScoringInput(form);
    if (!input) {
      setOutcome(null);
      setIncompleteMessage("请先完整填写所有必填项，再计算分数。");
      errorSummaryRef.current?.focus();
      return;
    }

    const result = calculateOwpEoi(input);
    setIncompleteMessage(null);
    setOutcome(result);

    if (!result.ok) {
      window.requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
        if (result.field && typeof result.field === "string") {
          const el = document.getElementById(`owp-${result.field}`);
          el?.focus();
        }
      });
    }
  };

  const fieldError =
    outcome && !outcome.ok && outcome.field
      ? String(outcome.field)
      : undefined;

  const oweDurationOptions =
    form.owePath === "in-offer-position"
      ? IN_OFFER_DURATION_OPTIONS
      : form.owePath === "ontario-general"
        ? ONTARIO_GENERAL_OPTIONS
        : [];

  return (
    <div className="space-y-6">
      <div
        ref={errorSummaryRef}
        tabIndex={-1}
        className="outline-none"
        aria-live="polite"
      >
        {incompleteMessage ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {incompleteMessage}
          </p>
        ) : null}
        {outcome && !outcome.ok ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {outcome.error}
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <CalculatorPanel
          title="OWP Job Offer 评分输入"
          description="请按官方评分档选择选项。本工具仅支持 Ontario Workforce Priority Job Offer 路径，不包含医师自雇路径。"
        >
          <p className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
            提示：选项对应 Ontario.ca 公开评分因素；表单不显示分值。估算分 ≠
            申请资格 ≠ 获邀保证。旧 Employer Job Offer 流已关闭。
          </p>

          <div className="space-y-6">
            <section className="space-y-4" aria-labelledby={`${formId}-job`}>
              <SectionHeading>
                <span id={`${formId}-job`}>就业 / 劳动力市场</span>
              </SectionHeading>

              <FieldSelect
                id="owp-nocTeerOptionId"
                label="NOC TEER 类别"
                english="NOC TEER category"
                help="根据 Job Offer NOC 的 TEER（职业代码第二位）选择。"
                value={form.nocTeerOptionId}
                onChange={(value) => setField("nocTeerOptionId", value)}
                options={TEER_OPTIONS}
                invalid={fieldError === "nocTeerOptionId"}
              />

              <FieldSelect
                id="owp-nocBroadOptionId"
                label="NOC 职业大类"
                english="NOC broad occupational category"
                help="与 TEER 分别计分后相加，请同时选择。"
                value={form.nocBroadOptionId}
                onChange={(value) => setField("nocBroadOptionId", value)}
                options={BROAD_OPTIONS}
                invalid={fieldError === "nocBroadOptionId"}
              />

              <FieldSelect
                id="owp-wageOptionId"
                label="时薪（加元）"
                english="Hourly wage (CAD)"
                help="以 Job Offer 时薪为准。若只有年薪，可先使用年薪/时薪转换器。"
                value={form.wageOptionId}
                onChange={(value) => setField("wageOptionId", value)}
                options={OINP_WAGE_TABLE_OPTIONS}
                invalid={fieldError === "wageOptionId"}
              />

              <fieldset className="space-y-3">
                <legend className="mb-1.5 block text-sm font-medium text-slate-700">
                  安省工作经验
                  <span className="mt-0.5 block text-xs font-normal text-slate-500">
                    Ontario work experience
                  </span>
                </legend>
                <p className="text-xs leading-relaxed text-slate-500">
                  两档互斥：在岗满 6 个月用在岗档；否则用安省一般工作经验档。不会把两档分数相加。
                </p>
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800">
                    <input
                      type="radio"
                      name="owp-owe-path"
                      className="mt-1"
                      checked={form.owePath === "in-offer-position"}
                      onChange={() =>
                        setField("owePath", "in-offer-position")
                      }
                    />
                    <span>
                      目前在 Job Offer 岗位工作，且累计至少 6 个月
                      <span className="mt-0.5 block text-xs text-slate-500">
                        In job-offer position ≥ 6 months
                      </span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800">
                    <input
                      type="radio"
                      name="owp-owe-path"
                      className="mt-1"
                      checked={form.owePath === "ontario-general"}
                      onChange={() => setField("owePath", "ontario-general")}
                    />
                    <span>
                      未在该岗位工作，或在岗不足 6 个月 → 安省一般工作经验
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Not in position or &lt; 6 months → Ontario-general
                      </span>
                    </span>
                  </label>
                </div>

                {form.owePath ? (
                  <FieldSelect
                    id="owp-ontarioWorkExperience.optionId"
                    label="工作经验时长档"
                    english="Duration band"
                    help={
                      form.owePath === "ontario-general"
                        ? "按你在安省累计工作经验选择官方档。"
                        : "按在 Job Offer 岗位的累计时长选择。"
                    }
                    value={form.oweOptionId}
                    onChange={(value) => setField("oweOptionId", value)}
                    options={oweDurationOptions}
                    invalid={
                      fieldError === "ontarioWorkExperience.optionId" ||
                      fieldError === "ontarioWorkExperience"
                    }
                  />
                ) : null}
              </fieldset>

              <FieldSelect
                id="owp-earningsOptionId"
                label="加拿大收入历史"
                english="Earnings history (CRA NOA)"
                help="依据近 5 年内加拿大税务局 Notice of Assessment 的年收入档。"
                value={form.earningsOptionId}
                onChange={(value) => setField("earningsOptionId", value)}
                options={OINP_EARNINGS_TABLE_OPTIONS}
                invalid={fieldError === "earningsOptionId"}
              />

              <FieldSelect
                id="owp-statusOptionId"
                label="在加法律身份"
                english="Legal status in Canada"
                help="工作许可或学习许可须能 confer legal status。"
                value={form.statusOptionId}
                onChange={(value) => setField("statusOptionId", value)}
                options={OINP_STATUS_TABLE_OPTIONS}
                invalid={fieldError === "statusOptionId"}
              />
            </section>

            <section
              className="space-y-4"
              aria-labelledby={`${formId}-education`}
            >
              <SectionHeading>
                <span id={`${formId}-education`}>教育</span>
              </SectionHeading>

              <FieldSelect
                id="owp-educationOptionId"
                label="最高学历"
                english="Highest level of education"
                help="通常需要加拿大文凭或 ECA；以官方档位描述为准。"
                value={form.educationOptionId}
                onChange={(value) => setField("educationOptionId", value)}
                options={OINP_EDUCATION_TABLE_OPTIONS}
                invalid={fieldError === "educationOptionId"}
              />

              <FieldSelect
                id="owp-canadianCredentialOptionId"
                label="加拿大学历数量"
                english="Number of Canadian education credentials"
                help="合资格机构、至少一年制一年的专上学历；请按你符合条件的数量选择。"
                value={form.canadianCredentialOptionId}
                onChange={(value) =>
                  setField("canadianCredentialOptionId", value)
                }
                options={OINP_CANADIAN_CREDENTIAL_TABLE_OPTIONS}
                invalid={fieldError === "canadianCredentialOptionId"}
              />
            </section>

            <section
              className="space-y-4"
              aria-labelledby={`${formId}-language`}
            >
              <SectionHeading>
                <span id={`${formId}-language`}>语言</span>
              </SectionHeading>

              <FieldSelect
                id="owp-languageAbilityOptionId"
                label="官方语言能力"
                english="Official language ability"
                help="按听说读写四项最低 CLB 选择。可先使用 CLB 转换器。"
                value={form.languageAbilityOptionId}
                onChange={(value) =>
                  setField("languageAbilityOptionId", value)
                }
                options={LANGUAGE_ABILITY_OPTIONS}
                invalid={fieldError === "languageAbilityOptionId"}
              />

              <FieldSelect
                id="owp-languageKnowledgeOptionId"
                label="官方语言数量"
                english="Knowledge of official languages"
                help={
                  twoLanguagesDisabled
                    ? "当前语言能力为 CLB 5 或更低时，不可选择两种官方语言（官方要求双语均至少 CLB 6）。"
                    : "选择两种官方语言时，两门测试均须至少 CLB 6。"
                }
                value={form.languageKnowledgeOptionId}
                onChange={(value) =>
                  setField("languageKnowledgeOptionId", value)
                }
                options={LANGUAGE_KNOWLEDGE_OPTIONS}
                disabledOptionIds={disabledKnowledgeIds}
                invalid={fieldError === "languageKnowledgeOptionId"}
              />
            </section>

            <section className="space-y-4" aria-labelledby={`${formId}-region`}>
              <SectionHeading>
                <span id={`${formId}-region`}>地区</span>
              </SectionHeading>

              <FieldSelect
                id="owp-regionOptionId"
                label="工作地点所属地区"
                english="Location of work in job offer"
                help="以 Job Offer 工作地点为准，选择官方区域档。本版本不提供城市自动对照。"
                value={form.regionOptionId}
                onChange={(value) => setField("regionOptionId", value)}
                options={OINP_REGION_TABLE_OPTIONS}
                invalid={fieldError === "regionOptionId"}
              />
            </section>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              className="h-11 min-w-32 bg-emerald-700 text-white hover:bg-emerald-800"
              onClick={handleCalculate}
            >
              计算分数
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={reset}
            >
              重置
            </Button>
          </div>
        </CalculatorPanel>

        <div className="space-y-4">
          <ResultPanel
            title="估算结果"
            description="Estimated OWP EOI Score（Job Offer 路径）"
            error={null}
          >
            <div aria-live="polite">
              {outcome?.ok && outcome.result.scoringStatus === "implemented" ? (
                <div className="space-y-3">
                  <ResultCard
                    label="估算 OWP EOI 总分"
                    value={String(outcome.result.total)}
                    highlighted
                  />
                  <p className="text-xs leading-relaxed text-slate-500">
                    此为公开评分因素估算值，非正式邀请分数线，也不代表申请资格。
                  </p>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-slate-600">
                  请完整填写左侧各项后，点击「计算分数」查看估算总分与分项明细。未完成填写时不会显示分数，以免产生误导。
                </p>
              )}
            </div>
          </ResultPanel>

          {outcome?.ok && outcome.result.scoringStatus === "implemented" ? (
            <CalculationDetails
              title="分数明细"
              rows={outcome.result.breakdown.map((row) => ({
                label: row.label,
                value: `${row.note ?? "—"} · ${row.value} 分`,
              }))}
              equation={`估算总分 = 各分项之和 = ${outcome.result.total} 分。TEER 与职业大类、语言能力与语言数量分别计分；安省工作经验仅计当前所选分支。`}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
