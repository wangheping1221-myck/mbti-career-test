export type SiteNavItem = {
  href: string;
  label: string;
};

/** Primary destinations shown in header, mobile nav, and footer. */
export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/career-test", label: "Career Test" },
  { href: "/tools", label: "Tools" },
];

export const SITE_BRAND = {
  href: "/",
  name: "Career Navigator Canada",
  shortName: "职业导航",
} as const;
