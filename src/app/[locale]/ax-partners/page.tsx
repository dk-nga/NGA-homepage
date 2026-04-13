import type { Metadata } from "next";
import { AXPartnersPage as AXPartnersContent } from "@/components/site/ax-partners-page";

export const metadata: Metadata = {
  title: "AX Partners — 12주 AI Transformation 실행 프로그램 | 넥스트젠AI",
  description:
    "6개월짜리 컨설팅 말고, 12주 안에 실제 돌아가는 AI Transformation(AX) 시스템을 만듭니다. 업무 진단 → 자동화 설계 → Co-Building → 내재화까지. 무료 AX 진단 신청하세요.",
  openGraph: {
    title: "AX Partners — 12주 AI Transformation 실행 프로그램",
    description:
      "12주 안에 한 부서를 'AI와 일하는 조직'으로 바꿉니다. PoC가 아닌, 실제 운영되는 AI Transformation(AX) 시스템.",
    images: [{ url: "https://nextgenai.kr/og-image.png", width: 1200, height: 630 }],
  },
};

export default async function AXPartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return <AXPartnersContent />;
}
