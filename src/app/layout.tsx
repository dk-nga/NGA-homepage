import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "넥스트젠AI - AI 업무 자동화 전문 기업 | AX(AI Experience) 솔루션",
  description:
    "넥스트젠AI는 기업 맞춤형 AI 업무 자동화 솔루션을 제공합니다. 보고서 자동화, AI 챗봇, 데이터 분석 대시보드 등 실질적인 비즈니스 성과를 만들어냅니다. AX 무료 진단 신청하세요.",
  keywords: [
    "AI 업무 자동화",
    "AI 도입",
    "생성형 AI",
    "기업 AI 솔루션",
    "AX",
    "AI Experience",
    "넥스트젠AI",
    "NextGen AI",
    "업무 자동화",
    "AI 챗봇",
    "보고서 자동화",
    "RAG",
    "AI 컨설팅",
    "AI 교육",
    "맞춤형 AI 솔루션 개발",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
