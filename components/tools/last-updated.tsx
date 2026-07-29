/**
 * Universal Last Updated stamp for tool / policy content.
 * Policy tools should always pass an official source when available.
 */
export function LastUpdated({
  date,
  label = "最后更新",
  sourceLabel,
  sourceHref,
}: {
  date: string;
  label?: string;
  sourceLabel?: string;
  sourceHref?: string;
}) {
  return (
    <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-slate-500">
      {label}：{date}
      {sourceLabel && sourceHref ? (
        <>
          {" · "}
          <a
            href={sourceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-slate-300 underline-offset-2 hover:text-slate-700"
          >
            {sourceLabel}
          </a>
        </>
      ) : null}
    </p>
  );
}
