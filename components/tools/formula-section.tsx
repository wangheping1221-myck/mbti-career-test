/**
 * Universal formula / scoring-rules summary.
 * Decoupled from a specific calculation run (unlike CalculationDetails).
 */
export function FormulaSection({
  title = "计算公式",
  formulas,
  notes,
  children,
}: {
  title?: string;
  formulas?: readonly string[];
  notes?: readonly string[];
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-12 max-w-3xl space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {formulas?.map((line) => (
        <p key={line} className="text-sm leading-relaxed text-slate-700">
          {line}
        </p>
      ))}
      {notes && notes.length > 0 ? (
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
      {children}
    </section>
  );
}
