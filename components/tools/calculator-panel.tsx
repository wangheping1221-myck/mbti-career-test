import { cn } from "@/lib/utils";

/**
 * Universal input panel shell for calculator forms.
 * Holds mode controls and fields; contains no domain formulas.
 */
export function CalculatorPanel({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      <div className="mb-5 space-y-1.5">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
