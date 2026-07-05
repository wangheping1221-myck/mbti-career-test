"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  buildUserAnswers,
  CATEGORY_LABELS,
  QUESTIONS,
  type QuestionKey,
} from "@/lib/questions";
import {
  getCareerProfileTags,
  getWarningTeaser,
} from "@/lib/career-display";
import {
  readPremiumUnlocked,
  verifyUnlockCode,
} from "@/lib/premium-unlock";
import {
  recommendCareers,
  type CareerRecommendation,
} from "@/lib/recommend-careers";
import { cn } from "@/lib/utils";

type Phase = "home" | "quiz" | "results";

function CareerProfileGrid({ career }: { career: CareerRecommendation["career"] }) {
  const tags = getCareerProfileTags(career);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {tags.map((tag) => (
        <div
          key={tag.label}
          className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2"
        >
          <p className="text-[11px] font-medium text-slate-400">{tag.label}</p>
          <p className="mt-0.5 text-xs font-medium leading-snug text-slate-700">
            {tag.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function PremiumReportSection({
  unlocked,
  career,
}: {
  unlocked: boolean;
  career: CareerRecommendation["career"];
}) {
  const sections = [
    { title: "职业简介", content: career.descriptionZh },
    { title: "适合人群", content: career.pathZh },
    { title: "下一步建议", content: career.nextStepZh },
  ];

  if (!unlocked) {
    return (
      <div className="relative mt-4 overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
        <div className="space-y-4 blur-[2px] select-none">
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-400">岗位画像</p>
            <CareerProfileGrid career={career} />
          </div>
          {sections.map((section) => (
            <div key={section.title} className="space-y-1">
              <p className="text-xs font-medium text-slate-400">{section.title}</p>
              <p className="text-sm text-slate-500">{section.content}</p>
            </div>
          ))}
          <div className="space-y-1">
            <p className="text-xs font-medium text-amber-600">完整风险提示</p>
            <p className="text-sm text-slate-500">{career.warningZh}</p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/55">
          <p className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
            解锁高级报告后查看
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          岗位画像
        </p>
        <CareerProfileGrid career={career} />
      </div>

      {sections.map((section) => (
        <div key={section.title} className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            {section.title}
          </p>
          <p className="text-sm leading-relaxed text-slate-600">{section.content}</p>
        </div>
      ))}

      <div className="space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
          完整风险提示
        </p>
        <p className="text-sm leading-relaxed text-slate-600">{career.warningZh}</p>
      </div>
    </div>
  );
}

function WarningTeaser({ warningZh }: { warningZh: string }) {
  return (
    <div className="mt-4 rounded-lg border border-amber-100 bg-amber-50/60 px-3 py-2.5">
      <p className="text-xs font-medium text-amber-700">注意事项（摘要）</p>
      <p className="mt-1 text-sm leading-relaxed text-amber-900/80">
        {getWarningTeaser(warningZh)}
      </p>
    </div>
  );
}

function PremiumUnlockPanel({
  unlocked,
  onUnlocked,
}: {
  unlocked: boolean;
  onUnlocked: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUnlock = useCallback(async () => {
    setError(null);
    setLoading(true);

    const result = await verifyUnlockCode(code);
    setLoading(false);

    if (result.valid) {
      onUnlocked();
      setCode("");
      return;
    }

    setError(result.error ?? "解锁码无效，请核对后重试");
  }, [code, onUnlocked]);

  return (
    <section className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">高级职业报告</h3>
          {unlocked && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              已解锁
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          {unlocked
            ? "你已解锁完整报告：每个职业包含岗位画像、入行分析与完整风险提示。"
            : "免费版含 Top 5 与推荐理由。输入解锁码后可查看完整高级报告。"}
        </p>
        {!unlocked && (
          <>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                6 项岗位画像标签（体力、夜班、英语等）
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                职业简介、适合人群与下一步建议
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                完整风险提示（免费版仅显示摘要）
              </li>
            </ul>
            <div className="space-y-2 pt-1">
              <label
                htmlFor="unlock-code"
                className="text-xs font-medium text-slate-500"
              >
                输入解锁码
              </label>
              <input
                id="unlock-code"
                type="text"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  if (error) {
                    setError(null);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !loading) {
                    void handleUnlock();
                  }
                }}
                placeholder="例如 CANADA-9X7K2M"
                autoComplete="off"
                className={cn(
                  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm",
                  "placeholder:text-slate-400",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
                )}
              />
              {error && (
                <p className="text-xs text-red-600" role="alert">
                  {error}
                </p>
              )}
              <Button
                size="lg"
                className="h-11 w-full"
                disabled={loading || !code.trim()}
                onClick={() => void handleUnlock()}
              >
                {loading ? "验证中…" : "解锁高级报告"}
              </Button>
              <p className="text-center text-xs text-slate-400">
                在小红书购买后，自动发货消息中会提供解锁码
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<
    Partial<Record<QuestionKey, string>>
  >({});
  const [results, setResults] = useState<CareerRecommendation[]>([]);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  useEffect(() => {
    if (readPremiumUnlocked()) {
      setPremiumUnlocked(true);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get("unlock");
    if (!codeFromUrl) {
      return;
    }

    void verifyUnlockCode(codeFromUrl).then((result) => {
      if (!result.valid) {
        return;
      }

      setPremiumUnlocked(true);
      params.delete("unlock");
      const nextQuery = params.toString();
      const nextUrl = nextQuery
        ? `${window.location.pathname}?${nextQuery}`
        : window.location.pathname;
      window.history.replaceState({}, "", nextUrl);
    });
  }, []);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const filteredOptions = useMemo(() => {
    if (currentQuestion?.id !== "categorySecondary") {
      return currentQuestion?.options ?? [];
    }

    const primary = selections.categoryPrimary;
    return currentQuestion.options.filter((option) => option.id !== primary);
  }, [currentQuestion, selections.categoryPrimary]);

  const startTest = () => {
    setPhase("quiz");
    setCurrentIndex(0);
    setSelections({});
    setResults([]);
  };

  const handleSelect = (optionId: string) => {
    const questionId = currentQuestion.id;
    const nextSelections = { ...selections, [questionId]: optionId };

    setSelections(nextSelections);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    const userAnswers = buildUserAnswers(nextSelections);
    setResults(recommendCareers(userAnswers));
    setPhase("results");
  };

  const restart = () => {
    setPhase("home");
    setCurrentIndex(0);
    setSelections({});
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-4 py-8 sm:px-6">
        {phase === "home" && (
          <main className="flex flex-1 flex-col justify-center gap-8">
            <div className="space-y-4 text-center">
              <p className="text-sm font-medium tracking-wide text-emerald-700">
                Career Navigator Canada
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                加拿大职业导航
              </h1>
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                3分钟找到适合你的加拿大工作方向
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  10 道简单选择题，约 3 分钟完成
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  根据你的偏好匹配适合的职业方向
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  免费查看 Top 5；解锁码可开启完整高级报告
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              className="h-12 w-full text-base"
              onClick={startTest}
            >
              开始测试
            </Button>
          </main>
        )}

        {phase === "quiz" && currentQuestion && (
          <main className="flex flex-1 flex-col gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>
                  第 {currentIndex + 1} / {QUESTIONS.length} 题
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                {currentQuestion.title}
              </h2>
              {currentQuestion.subtitle && (
                <p className="text-sm text-slate-500">
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3">
              {filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  className={cn(
                    "rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all",
                    "hover:border-emerald-300 hover:bg-emerald-50/50 active:scale-[0.99]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
                  )}
                >
                  <p className="font-medium text-slate-900">{option.label}</p>
                  {option.description && (
                    <p className="mt-1 text-sm text-slate-500">
                      {option.description}
                    </p>
                  )}
                </button>
              ))}
            </div>

            {currentIndex > 0 && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setCurrentIndex((index) => index - 1)}
              >
                返回上一题
              </Button>
            )}
          </main>
        )}

        {phase === "results" && (
          <main className="flex flex-1 flex-col gap-6">
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium text-emerald-700">测试完成</p>
              <h2 className="text-2xl font-bold text-slate-900">
                为你推荐的方向
              </h2>
              <p className="text-sm text-slate-500">
                免费版展示最匹配的 5 个职业与推荐理由
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {results.map((item, index) => (
                <article
                  key={item.career.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-400">
                        推荐 #{index + 1}
                      </p>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.career.titleZh}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {item.career.title}
                      </p>
                      <p className="text-xs text-slate-400">
                        {CATEGORY_LABELS[item.career.category]}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                      {item.matchPercent}%
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      推荐理由
                    </p>
                    <ul className="space-y-1.5">
                      {item.reasons.map((reason) => (
                        <li
                          key={reason}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!premiumUnlocked && (
                    <WarningTeaser warningZh={item.career.warningZh} />
                  )}

                  <PremiumReportSection
                    unlocked={premiumUnlocked}
                    career={item.career}
                  />
                </article>
              ))}
            </div>

            <PremiumUnlockPanel
              unlocked={premiumUnlocked}
              onUnlocked={() => setPremiumUnlocked(true)}
            />

            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full"
              onClick={restart}
            >
              重新测试
            </Button>
          </main>
        )}
      </div>
    </div>
  );
}
