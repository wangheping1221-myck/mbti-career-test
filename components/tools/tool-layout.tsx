import { cn } from "@/lib/utils";

/**
 * Content-width shell for /tools/* pages.
 * Site chrome (header/footer) lives in the root layout.
 */
export function ToolLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-gradient-to-b from-slate-50 to-white",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </div>
    </div>
  );
}
