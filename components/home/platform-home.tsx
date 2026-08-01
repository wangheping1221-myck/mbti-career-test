import Link from "next/link";

import { Disclaimer } from "@/components/tools/disclaimer";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { getLiveTools } from "@/lib/tools/catalog";

export function PlatformHome({ onStartTest }: { onStartTest: () => void }) {
  const tools = getLiveTools();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto max-w-3xl space-y-6 text-center">
        <p className="text-sm font-medium tracking-wide text-emerald-700">
          Career Navigator Canada
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          加拿大职业导航
        </h1>
        <div className="space-y-2">
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            3 分钟职业方向测试
          </p>
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            工资计算器 · CLB 转换 · 安省 OWP EOI 打分
            <br />
            专为加拿大华人打造
          </p>
        </div>
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button
            size="lg"
            className="h-12 text-base sm:min-w-48"
            onClick={onStartTest}
          >
            Start Career Test
          </Button>
          <Link
            href="/tools"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-w-40"
          >
            浏览工具
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-3xl space-y-5">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            职业方向测试
          </h2>
          <p className="text-sm font-medium tracking-wide text-emerald-700">
            Career Test
          </p>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            旗舰产品：根据你的偏好匹配更适合的加拿大职业方向。
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
      </section>

      <section className="mx-auto mt-14 max-w-3xl space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              实用工具
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              免费计算器，帮助你比较工资、换算 CLB、估算安省 OWP EOI 分数。
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
          >
            查看全部工具
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
            />
          ))}
        </div>
      </section>

      <Disclaimer>
        <p>
          本站提供一般性职业与移民相关信息，仅供教育与自我评估参考，不构成法律、移民或就业建议。正式申请请以加拿大联邦与省政府官方信息为准。
        </p>
      </Disclaimer>
    </main>
  );
}
