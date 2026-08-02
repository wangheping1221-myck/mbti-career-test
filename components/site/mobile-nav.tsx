"use client";

import Link from "next/link";
import { useEffect, useId } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SITE_NAV_ITEMS, type SiteNavItem } from "@/components/site/nav";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

/** Mobile-only labels — desktop / footer keep SITE_NAV_ITEMS English labels. */
const MOBILE_NAV_LABELS: Record<string, string> = {
  "/": "首页",
  "/career-test": "职业测试",
  "/tools": "工具",
};

function isNavActive(pathname: string, item: SiteNavItem): boolean {
  if (item.href === "/") {
    return pathname === "/";
  }
  if (item.href === "/career-test") {
    return pathname === "/career-test";
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function MobileNav({ open, onClose, pathname }: MobileNavProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn("md:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      {/* Backdrop: below panel, above page content */}
      <button
        type="button"
        className={cn(
          "fixed inset-x-0 bottom-0 top-14 z-40 bg-slate-900/45 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      {/* Full-width solid panel directly below sticky header */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "fixed inset-x-0 top-14 z-50 border-b border-slate-200 bg-white shadow-lg transition-all duration-200 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="flex items-center justify-end px-3 pt-2">
          <p id={titleId} className="sr-only">
            网站导航
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="size-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 px-4 pb-5 pt-1" aria-label="Mobile">
          {SITE_NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item);
            const label = MOBILE_NAV_LABELS[item.href] ?? item.label;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                  active
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-800 hover:bg-slate-50",
                )}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
