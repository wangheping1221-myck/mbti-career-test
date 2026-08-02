import type { Metadata } from "next";

const SITE_URL = "https://mbti-career-test.vercel.app";
const canonicalPath = "/career-test";

export const metadata: Metadata = {
  title: "加拿大职业方向测试｜Career Navigator Canada",
  description:
    "3分钟完成加拿大职业方向测试，免费查看 Top 5 职业推荐；输入解锁码可查看完整高级报告。面向华人、新移民与留学生。",
  alternates: {
    canonical: `${SITE_URL}${canonicalPath}`,
  },
  openGraph: {
    title: "加拿大职业方向测试｜Career Navigator Canada",
    description:
      "3分钟完成加拿大职业方向测试，免费查看 Top 5 职业推荐；输入解锁码可查看完整高级报告。面向华人、新移民与留学生。",
    url: `${SITE_URL}${canonicalPath}`,
    type: "website",
  },
};

export default function CareerTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
