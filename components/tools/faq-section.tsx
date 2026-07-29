export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({
  title = "常见问题",
  items,
}: {
  title?: string;
  items: readonly FaqItem[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm open:pb-4"
          >
            <summary className="cursor-pointer list-none text-sm font-medium text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                {item.question}
                <span className="mt-0.5 shrink-0 text-slate-400 group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
