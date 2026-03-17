import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
