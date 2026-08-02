import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "加拿大年薪时薪转换器 | Salary Calculator Canada",
  description:
    "免费加拿大工资换算工具。快速将年薪转换为时薪，或将时薪换算成年薪，并查看周薪、双周薪和月薪，支持自定义每周工时。",
  alternates: {
    canonical: absoluteUrl("/tools/salary-calculator"),
  },
  openGraph: {
    title: "加拿大年薪时薪转换器 | Salary Calculator Canada",
    description:
      "免费加拿大工资换算工具。快速将年薪转换为时薪，或将时薪换算成年薪，并查看周薪、双周薪和月薪，支持自定义每周工时。",
    url: absoluteUrl("/tools/salary-calculator"),
    type: "website",
  },
};

export default function SalaryCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
