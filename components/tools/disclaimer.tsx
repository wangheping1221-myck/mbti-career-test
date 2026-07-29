/**
 * Universal compliance disclaimer footer for tool pages.
 */
export function Disclaimer({
  title = "免责声明",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <footer className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm leading-relaxed text-slate-600">
      <p className="font-medium text-slate-800">{title}</p>
      <div className="mt-2 space-y-2">{children}</div>
    </footer>
  );
}
