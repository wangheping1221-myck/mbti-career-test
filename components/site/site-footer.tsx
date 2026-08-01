import Link from "next/link";

import { SITE_NAV_ITEMS } from "@/components/site/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
        <nav
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
          aria-label="Footer"
        >
          {SITE_NAV_ITEMS.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="max-w-2xl text-xs leading-relaxed text-slate-500">
          Career Navigator Canada provides general career and immigration-related
          information for educational purposes only. It is not legal, immigration,
          or employment advice.
        </p>
      </div>
    </footer>
  );
}
