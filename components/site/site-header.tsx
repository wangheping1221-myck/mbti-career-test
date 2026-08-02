"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { MobileNav } from "@/components/site/mobile-nav";
import {
  SITE_BRAND,
  SITE_NAV_ITEMS,
  type SiteNavItem,
} from "@/components/site/nav";

function isNavActive(pathname: string, item: SiteNavItem): boolean {
  if (item.href === "/") {
    return pathname === "/";
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] border-b border-slate-200/80",
        // Solid white on mobile so opened menu never blends with page content.
        "bg-white md:bg-white/90 md:backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={SITE_BRAND.href}
          className="min-w-0 shrink truncate text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
        >
          <span className="sm:hidden">{SITE_BRAND.shortName}</span>
          <span className="hidden sm:inline">{SITE_BRAND.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {SITE_NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item);
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="site-mobile-nav"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </Button>
      </div>

      <div id="site-mobile-nav">
        <MobileNav
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          pathname={pathname}
        />
      </div>
    </header>
  );
}
