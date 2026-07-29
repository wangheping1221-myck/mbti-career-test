import { cn } from "@/lib/utils";

export function ResultCard({
  label,
  value,
  highlighted = false,
  className,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        highlighted
          ? "border-emerald-300 bg-emerald-50/80"
          : "border-slate-200 bg-slate-50/60",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-medium",
          highlighted ? "text-emerald-700" : "text-slate-500",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-lg font-semibold tracking-tight sm:text-xl",
          highlighted ? "text-emerald-900" : "text-slate-900",
        )}
      >
        {value}
      </p>
    </div>
  );
}
