import type { Metadata } from "next";

const SITE_URL = "https://mbti-career-test.vercel.app";
const canonicalPath = "/tools/oinp-eoi-calculator";

export const metadata: Metadata = {
  title:
    "安省 OWP EOI 打分计算器 | Ontario Workforce Priority Calculator",
  description:
    "免费估算 Ontario Workforce Priority（OWP）EOI 总分与分项，依据 Ontario.ca 公开评分因素，仅供参考。",
  alternates: {
    canonical: `${SITE_URL}${canonicalPath}`,
  },
  openGraph: {
    title:
      "安省 OWP EOI 打分计算器 | Ontario Workforce Priority Calculator",
    description:
      "免费估算 Ontario Workforce Priority（OWP）EOI 总分与分项，依据 Ontario.ca 公开评分因素，仅供参考。",
    url: `${SITE_URL}${canonicalPath}`,
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
