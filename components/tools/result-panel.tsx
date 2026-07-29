import { cn } from "@/lib/utils";

/**
 * Universal result panel shell.
 * Renders title, optional description, primary/secondary result slots,
 * actions, or an error alert. Domain formatting stays in the tool client.
 */
export function ResultPanel({
  title,
  description,
  children,
  actions,
  error,
  className,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  error?: string | null;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      ) : null}

      {error ? (
        <p
          className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="alert"
        >
          {error}
        </p>
      ) : (
        <>
          {children ? <div className="mt-4">{children}</div> : null}
          {actions ? (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">{actions}</div>
          ) : null}
        </>
      )}
    </section>
  );
}
