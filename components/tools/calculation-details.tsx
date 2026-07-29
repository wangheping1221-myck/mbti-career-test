import { cn } from "@/lib/utils";

export interface CalculationDetailRow {
  label: string;
  value: string;
}

/**
 * Universal "this run" calculation details.
 * Shows input/output rows plus an optional human-readable equation string.
 * Works for salary, CLB, CRS, EOI, tax, EI — content is passed in.
 */
export function CalculationDetails({
  title = "计算过程",
  rows,
  equation,
  children,
  className,
}: {
  title?: string;
  rows?: readonly CalculationDetailRow[];
  equation?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6",
        className,
      )}
    >
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {rows && rows.length > 0 ? (
        <dl className="mt-3 space-y-2 text-sm text-slate-700">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt>{row.label}</dt>
              <dd className="font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {equation ? (
        <p className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-relaxed text-slate-700">
          {equation}
        </p>
      ) : null}
      {children}
    </section>
  );
}
