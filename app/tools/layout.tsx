import type { Metadata } from "next";

const SITE_URL = "https://mbti-career-test.vercel.app";
const canonicalPath = "/tools";

export const metadata: Metadata = {
  title: "加拿大职业工具中心 | Career Tools Canada",
  description:
    "免费加拿大职业实用工具：年薪时薪转换、IELTS GT 转 CLB、安省 OWP EOI 打分估算。面向华人新移民与工签持有人，结果仅供参考。",
  alternates: {
    canonical: `${SITE_URL}${canonicalPath}`,
  },
  openGraph: {
    title: "加拿大职业工具中心 | Career Tools Canada",
    description:
      "免费加拿大职业实用工具：年薪时薪转换、IELTS GT 转 CLB、安省 OWP EOI 打分估算。面向华人新移民与工签持有人，结果仅供参考。",
    url: `${SITE_URL}${canonicalPath}`,
    type: "website",
  },
};

export default function ToolsHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
