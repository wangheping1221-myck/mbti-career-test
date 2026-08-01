export type SiteNavItem = {
  href: string;
  label: string;
};

/** Primary destinations shown in header, mobile nav, and footer. */
export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { href: "/", label: "Home" },
  // Career Test still lives on `/` until P5.6 route migration.
  { href: "/", label: "Career Test" },
  { href: "/tools", label: "Tools" },
];

export const SITE_CTA = {
  href: "/",
  label: "Start Test",
} as const;

export const SITE_BRAND = {
  href: "/",
  name: "Career Navigator Canada",
  shortName: "职业导航",
} as const;
