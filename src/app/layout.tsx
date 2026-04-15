import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import "./[locale]/globals.css";

export const metadata: Metadata = {
  title: "넥스트젠AI - AI Transformation 전문 기업 | AX(AI Transformation) 솔루션",
  description:
    "넥스트젠AI는 기업 맞춤형 AI Transformation(AX) 솔루션을 제공합니다. AI 업무 자동화, AI 교육, RAG 챗봇, 데이터 분석까지 실질적인 비즈니스 성과를 만듭니다.",
  verification: {
    other: {
      "naver-site-verification": "0319f8749333b28ec48920ac74d25da2a1836715",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster richColors />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
