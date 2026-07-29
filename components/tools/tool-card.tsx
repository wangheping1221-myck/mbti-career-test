import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ToolCard({
  title,
  description,
  href,
  comingSoon = false,
}: {
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
}) {
  const content = (
    <div
      className={cn(
        "flex h-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        comingSoon && "opacity-75",
        href && !comingSoon && "transition hover:border-emerald-300 hover:bg-emerald-50/40",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {comingSoon ? (
          <Badge variant="secondary" className="shrink-0">
            即将推出
          </Badge>
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );

  if (!href || comingSoon) {
    return (
      <div aria-disabled={comingSoon || undefined} className="h-full">
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
