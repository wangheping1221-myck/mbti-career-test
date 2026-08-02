import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "安省 OWP EOI 打分计算器 | Ontario Workforce Priority Calculator",
  description:
    "免费估算 Ontario Workforce Priority（OWP）EOI 总分与分项，依据 Ontario.ca 公开评分因素，仅供参考。",
  alternates: {
    canonical: absoluteUrl("/tools/oinp-eoi-calculator"),
  },
  openGraph: {
    title:
      "安省 OWP EOI 打分计算器 | Ontario Workforce Priority Calculator",
    description:
      "免费估算 Ontario Workforce Priority（OWP）EOI 总分与分项，依据 Ontario.ca 公开评分因素，仅供参考。",
    url: absoluteUrl("/tools/oinp-eoi-calculator"),
    type: "website",
  },
};

export default function OinpEoiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
