import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "CLB Calculator Canada | IELTS General to CLB Converter",
  description:
    "Convert IELTS General Training scores to Canadian Language Benchmark levels for listening, reading, writing and speaking.",
  alternates: {
    canonical: absoluteUrl("/tools/clb-calculator"),
  },
  openGraph: {
    title: "CLB Calculator Canada | IELTS General to CLB Converter",
    description:
      "Convert IELTS General Training scores to Canadian Language Benchmark levels for listening, reading, writing and speaking.",
    url: absoluteUrl("/tools/clb-calculator"),
    type: "website",
  },
};

export default function ClbCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
