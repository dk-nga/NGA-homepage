import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "넥스트젠AI - AI Transformation(AX) 전문 기업 | 기업 AI 전환 솔루션",
  description:
    "넥스트젠AI는 AI Transformation(AX)으로 기업의 업무 구조를 바꿉니다. 상품 기획·콘텐츠·마케팅·데이터 분석까지 AI 에이전트로 자동화하여 글로벌 확장을 가속합니다. AX 무료 진단 신청하세요.",
  keywords: [
    "AI Transformation",
    "AX",
    "AI 업무 자동화",
    "AI 도입",
    "생성형 AI",
    "기업 AI 솔루션",
    "AI 에이전트",
    "넥스트젠AI",
    "NextGen AI",
    "업무 자동화",
    "AI 챗봇",
    "RAG",
    "AI 컨설팅",
    "AI 교육",
    "이커머스 AI",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://nextgenai.kr",
    siteName: "넥스트젠AI",
    title: "넥스트젠AI — AI Transformation(AX) 전문 기업",
    description:
      "AI Transformation(AX)으로 기업의 업무 구조를 바꿉니다. AI 에이전트 자동화, AI 교육, 글로벌 이커머스 전환까지. 지금 무료 AX 진단 신청하세요.",
    images: [
      {
        url: "https://nextgenai.kr/og-image.png",
        width: 1200,
        height: 630,
        alt: "넥스트젠AI - AI Transformation(AX) 전문 기업",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "넥스트젠AI — AI Transformation(AX) 전문 기업",
    description:
      "AI Transformation(AX)으로 기업의 업무 구조를 바꿉니다. AI 에이전트 자동화, AI 교육, 글로벌 이커머스 전환까지.",
    images: ["https://nextgenai.kr/og-image.png"],
  },
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
