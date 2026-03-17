import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./[locale]/globals.css";

export const metadata: Metadata = {
  title: "넥스트젠AI - AI 업무 자동화 전문 기업 | AX(AI Experience) 솔루션",
  description:
    "넥스트젠AI는 기업 맞춤형 AI 업무 자동화 솔루션을 제공합니다. 보고서 자동화, AI 챗봇, 데이터 분석 대시보드 등 실질적인 비즈니스 성과를 만들어냅니다.",
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
    </html>
  );
}
