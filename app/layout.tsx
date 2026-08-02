import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { absoluteUrl } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "加拿大职业导航 | Career Navigator Canada",
  description:
    "免费加拿大职业方向测试，以及年薪时薪转换、IELTS GT 转 CLB、安省 OWP EOI 打分等实用工具。面向华人新移民、留学生与工签持有人，结果仅供参考。",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "加拿大职业导航 | Career Navigator Canada",
    description:
      "免费加拿大职业方向测试，以及年薪时薪转换、IELTS GT 转 CLB、安省 OWP EOI 打分等实用工具。面向华人新移民、留学生与工签持有人，结果仅供参考。",
    url: absoluteUrl("/"),
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
