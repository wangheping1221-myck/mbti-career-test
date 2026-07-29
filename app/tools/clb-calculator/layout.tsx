import type { Metadata } from "next";

const SITE_URL = "https://mbti-career-test.vercel.app";
const canonicalPath = "/tools/clb-calculator";

export const metadata: Metadata = {
  title: "CLB Calculator Canada | IELTS General to CLB Converter",
  description:
    "Convert IELTS General Training scores to Canadian Language Benchmark levels for listening, reading, writing and speaking.",
  alternates: {
    canonical: `${SITE_URL}${canonicalPath}`,
  },
  openGraph: {
    title: "CLB Calculator Canada | IELTS General to CLB Converter",
    description:
      "Convert IELTS General Training scores to Canadian Language Benchmark levels for listening, reading, writing and speaking.",
    url: `${SITE_URL}${canonicalPath}`,
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
