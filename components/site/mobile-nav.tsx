"use client";

import Link from "next/link";
import { useEffect, useId } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SITE_CTA, SITE_NAV_ITEMS, type SiteNavItem } from "@/components/site/nav";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

function isNavActive(pathname: string, item: SiteNavItem): boolean {
  if (item.href === "/") {
    return pathname === "/";
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
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-slate-900/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col border-l border-slate-200 bg-white shadow-xl transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <p id={titleId} className="text-sm font-semibold text-slate-900">
            Menu
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Mobile">
          {SITE_NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item);
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-700 hover:bg-slate-50",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <Link
            href={SITE_CTA.href}
            onClick={onClose}
            className={cn(
              "flex h-11 w-full items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white",
              "transition-colors hover:bg-emerald-700",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
            )}
          >
            {SITE_CTA.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
