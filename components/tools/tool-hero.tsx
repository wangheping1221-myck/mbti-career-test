/**
 * Universal Hero for tool pages.
 * One H1, optional English eyebrow, short intro, optional feature chips.
 */
export function ToolHero({
  eyebrow,
  title,
  description,
  features,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  features?: readonly string[];
}) {
  return (
    <header className="mx-auto max-w-3xl space-y-4 text-center">
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
        {description}
      </p>
      {features && features.length > 0 ? (
        <ul className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
          {features.map((item) => (
            <li
              key={item}
              className="rounded-full border border-slate-200 bg-white px-3 py-1"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
