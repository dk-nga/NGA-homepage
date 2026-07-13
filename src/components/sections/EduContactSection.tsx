"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, GraduationCap, Flame, Rocket, Zap, Target, Lock, Coins, BarChart3, MessageCircle, Users, Gift } from "lucide-react";

type InquiryTab = "edu" | "trend" | "seminar";

/** 다른 섹션에서 문의 폼의 특정 탭을 열고 스크롤하기 위한 헬퍼 */
export function openContactTab(tab: InquiryTab) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("edu:contact-tab", { detail: tab }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

const schema = z.object({
  name: z.string().min(2, "이름을 입력해주세요"),
  position: z.string().min(1, "직책을 입력해주세요"),
  company: z.string().min(1, "회사명을 입력해주세요"),
  employee_count: z.string().min(1, "규모를 선택해주세요"),
  email: z.string().email("올바른 이메일 형식을 입력해주세요"),
  phone: z.string().optional(),
  topic: z.string().min(1, "관심 항목을 선택해주세요"),
  message: z.string().max(1000).optional(),
  privacy_agreed: z.literal(true, { error: "개인정보 처리방침에 동의해주세요" }),
});

type FormData = z.infer<typeof schema>;

const tabConfig: Record<InquiryTab, {
  label: string;
  icon: React.ReactNode;
  formTitle: string;
  formSub: string;
  submitLabel: string;
  inquiryType: string;
  topicOptions: { value: string; label: string }[];
  trustItems: { icon: React.ReactNode; text: string; sub: string }[];
  headTitle: string;
  headDesc: string;
}> = {
  edu: {
    label: "교육 도입 문의",
    icon: <GraduationCap className="w-4 h-4" />,
    formTitle: "교육 도입 문의",
    formSub: "정보를 입력해주시면 맞춤 제안서를 보내드립니다.",
    submitLabel: "교육 도입 문의하기 →",
    inquiryType: "edu_inquiry",
    topicOptions: [
      { value: "exec_workshop", label: "임원 AI 전략 워크숍" },
      { value: "leadership_12w", label: "리더십 12주 프로그램" },
      { value: "practitioner_bootcamp", label: "실무자 부트캠프" },
      { value: "chatgpt", label: "[범용 AI] ChatGPT 실무 활용" },
      { value: "claude", label: "[범용 AI] Claude 활용 & AI 비서 만들기" },
      { value: "gemini", label: "[범용 AI] Gemini의 모든 것" },
      { value: "copilot", label: "[범용 AI] Microsoft Copilot 실무 활용" },
      { value: "notebooklm", label: "[범용 AI] NotebookLM 문서 분석·지식베이스" },
      { value: "slides", label: "[범용 AI] AI 슬라이드·문서 디자인" },
      { value: "n8n", label: "[자동화·개발] n8n 업무 자동화" },
      { value: "vibe_coding", label: "[자동화·개발] 바이브코딩 — 노코드 웹앱" },
      { value: "claude_code", label: "[자동화·개발] AI 웹서비스 개발 — Claude Code" },
      { value: "ios_codex", label: "[자동화·개발] iOS 앱 제작·배포 — Codex" },
      { value: "img_ai", label: "[콘텐츠] AI 이미지 콘텐츠 제작" },
      { value: "video_ai", label: "[콘텐츠] AI 영상 콘텐츠 제작" },
      { value: "ai_agent", label: "[콘텐츠] AI 에이전트 실무 활용" },
      { value: "custom", label: "맞춤 트랙 설계 (13개 축 조합)" },
      { value: "consultation", label: "상담 후 결정" },
    ],
    trustItems: [
      { icon: <Zap className="w-4 h-4 text-[#8D36EB]" />, text: "영업일 1일 내 연락", sub: "빠른 초기 상담" },
      { icon: <Target className="w-4 h-4 text-[#8D36EB]" />, text: "AI-Q 진단 기반 맞춤 커리큘럼 제안", sub: "진단 결과 활용 시 더 정밀한 제안" },
      { icon: <Lock className="w-4 h-4 text-[#8D36EB]" />, text: "개인정보 철저 보호", sub: "수집 정보는 상담 목적으로만 사용" },
      { icon: <Coins className="w-4 h-4 text-[#8D36EB]" />, text: "도입 전 무료 상담", sub: "비용 부담 없이 시작하세요" },
    ],
    headTitle: "AI 교육 도입,\n함께 설계합니다",
    headDesc: "문의를 주시면 영업일 1일 내로 연락드립니다. AI-Q 진단 결과를 가져오시면 더욱 정확한 맞춤 제안이 가능합니다.",
  },
  trend: {
    label: "트렌드·도구 문의",
    icon: <Flame className="w-4 h-4" />,
    formTitle: "AI 트렌드 & 도구 문의",
    formSub: "최신 AI 도구와 트렌드에 대해 전문가가 직접 답변합니다.",
    submitLabel: "트렌드 문의하기 →",
    inquiryType: "trend_inquiry",
    topicOptions: [
      { value: "gpt_image2", label: "GPT Image 2.0 활용 방법" },
      { value: "higgsfield", label: "Higgsfield AI 도입 방법" },
      { value: "threads_marketing", label: "Threads 기반 AI 마케팅" },
      { value: "vibe_coding_trend", label: "바이브 코딩 / AI 개발 트렌드" },
      { value: "ai_agent", label: "AI 에이전트 & 자동화 트렌드" },
      { value: "ai_marketing_tools", label: "2025 AI 마케팅 도구 총정리" },
      { value: "other_trend", label: "기타 AI 트렌드 문의" },
    ],
    trustItems: [
      { icon: <Flame className="w-4 h-4 text-[#8D36EB]" />, text: "최신 AI 트렌드 주간 업데이트", sub: "GPT Image 2.0, Higgsfield 등 신규 도구 즉시 반영" },
      { icon: <Target className="w-4 h-4 text-[#8D36EB]" />, text: "우리 업무에 맞는 도구 추천", sub: "마케팅·영업·기획 직군별 최적 도구 안내" },
      { icon: <BarChart3 className="w-4 h-4 text-[#8D36EB]" />, text: "도구 비교 리포트 제공", sub: "주요 AI 도구 기능·비용·활용도 비교 자료 무료 제공" },
      { icon: <MessageCircle className="w-4 h-4 text-[#8D36EB]" />, text: "전문가 1:1 Q&A", sub: "도구 선택부터 활용 전략까지 전문가 직접 답변" },
    ],
    headTitle: "AI 트렌드,\n놓치지 마세요",
    headDesc: "GPT Image 2.0, Higgsfield, Threads 마케팅 등 최신 AI 도구와 전략을 전문가에게 직접 물어보세요. 지금 모르면 경쟁사에 뒤처집니다.",
  },
  seminar: {
    label: "AI 세미나 신청",
    icon: <Rocket className="w-4 h-4" />,
    formTitle: "AI 세미나 신청",
    formSub: "세미나는 선착순으로 마감됩니다. 지금 신청하세요.",
    submitLabel: "세미나 신청하기 →",
    inquiryType: "seminar_registration",
    topicOptions: [
      { value: "seminar_ai_marketing", label: "[무료] AI 마케팅 크리에이티브 세미나 (월 1회)" },
      { value: "seminar_gpt_image", label: "[무료] GPT Image 2.0 × Higgsfield 실습 세미나" },
      { value: "seminar_threads", label: "[무료] Threads AI 마케팅 전략 세미나" },
      { value: "seminar_vibe", label: "[무료] 바이브 코딩 입문 세미나" },
      { value: "seminar_ax", label: "[유료] AX 전략 임원 세미나" },
      { value: "seminar_custom", label: "우리 팀 맞춤 사내 세미나 요청" },
    ],
    trustItems: [
      { icon: <Rocket className="w-4 h-4 text-[#8D36EB]" />, text: "월 1회 무료 공개 세미나", sub: "GPT Image 2.0, Higgsfield, Threads 등 최신 도구 실습" },
      { icon: <Users className="w-4 h-4 text-[#8D36EB]" />, text: "소수 정예 20명 한정", sub: "질의응답 보장, 실습 중심 운영" },
      { icon: <Gift className="w-4 h-4 text-[#8D36EB]" />, text: "참가자 전원 실습 자료 제공", sub: "세미나 당일 프롬프트·템플릿 패키지 무료 제공" },
      { icon: <Zap className="w-4 h-4 text-[#8D36EB]" />, text: "신청 후 24시간 내 확인 메일", sub: "일정·장소·준비사항 안내" },
    ],
    headTitle: "AI 세미나,\n지금 신청하세요",
    headDesc: "매월 무료 AI 세미나를 운영합니다. GPT Image 2.0, Higgsfield, Threads 마케팅 등 지금 당장 쓸 수 있는 내용만 다룹니다. 자리가 한정되어 있습니다.",
  },
};

export function EduContactSection() {
  const [activeTab, setActiveTab] = useState<InquiryTab>("edu");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 외부 섹션(세미나 카드 등)에서 특정 탭 열기
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail as InquiryTab;
      if (tab === "edu" || tab === "trend" || tab === "seminar") {
        setActiveTab(tab);
        setSubmitted(false);
      }
    };
    window.addEventListener("edu:contact-tab", handler);
    return () => window.removeEventListener("edu:contact-tab", handler);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from("inquiries").insert({
        name: data.name,
        position: data.position,
        company: data.company,
        employee_count: data.employee_count,
        email: data.email,
        phone: data.phone ?? null,
        topic: data.topic,
        message: data.message ?? null,
        inquiry_type: tabConfig[activeTab].inquiryType,
        privacy_agreed: true,
        marketing_agreed: false,
        source_url: typeof window !== "undefined" ? window.location.href : null,
      });
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  const cfg = tabConfig[activeTab];

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(141,54,235,0.08), transparent 70%), radial-gradient(ellipse 50% 60% at 20% 80%, rgba(22,92,255,0.06), transparent 70%), #F8F6FF",
      }}
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm gap-1">
            {(["edu", "trend", "seminar"] as InquiryTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSubmitted(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === tab
                    ? "text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                style={activeTab === tab ? { background: "linear-gradient(135deg, #8D36EB, #165CFF)" } : {}}
              >
                {tabConfig[tab].icon}
                <span className="hidden sm:inline">{tabConfig[tab].label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Copy */}
          <motion.div
            key={activeTab + "-left"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-block text-xs font-bold tracking-widest text-[#8D36EB] uppercase mb-5">
              CONTACT US
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-[#0B0B12] mb-5 leading-tight whitespace-pre-line"
              style={{ letterSpacing: "-1.5px" }}
            >
              {cfg.headTitle.split("\n")[0]}
              <br />
              <span
                style={{
                  background: "linear-gradient(120deg, #8D36EB 0%, #165CFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {cfg.headTitle.split("\n")[1]}
              </span>
            </h2>
            <p className="text-[#3F3F4A] text-sm leading-relaxed mb-8">
              {cfg.headDesc}
            </p>

            {/* Trust signals */}
            <div className="space-y-4 mb-8">
              {cfg.trustItems.map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#8D36EB]/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#0B0B12] text-sm font-semibold">{item.text}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex gap-3">
                  <strong className="text-[#0B0B12] font-bold min-w-[56px]">이메일</strong>
                  <span>contact@nextgenai.kr</span>
                </div>
                <div className="flex gap-3">
                  <strong className="text-[#0B0B12] font-bold min-w-[56px]">응답</strong>
                  <span>영업일 기준 1일 이내</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            key={activeTab + "-form"}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg, #8D36EB, #165CFF)" }}
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-[#0B0B12] font-black text-xl mb-3">
                  {activeTab === "seminar" ? "세미나 신청 완료!" : "문의가 접수되었습니다!"}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {activeTab === "seminar"
                    ? "24시간 내로 일정 안내 메일을 보내드립니다.\n소수 정예로 진행되니 빠른 확인 부탁드립니다."
                    : "영업일 1일 내로 회신드립니다.\nAI-Q 진단을 아직 못하셨다면 위 섹션에서 먼저 진단해보세요."}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-2">
                  <h3 className="text-xl font-black text-[#0B0B12]" style={{ letterSpacing: "-0.5px" }}>
                    {cfg.formTitle}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{cfg.formSub}</p>
                </div>

                {/* Row 1: Name + Position */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#0B0B12] text-xs font-semibold mb-1.5">
                      이름 <span className="text-[#8D36EB]">*</span>
                    </label>
                    <input
                      {...register("name")}
                      placeholder="홍길동"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B0B12] placeholder-gray-400 text-sm focus:outline-none focus:border-[#8D36EB]/60 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#0B0B12] text-xs font-semibold mb-1.5">
                      직책 <span className="text-[#8D36EB]">*</span>
                    </label>
                    <input
                      {...register("position")}
                      placeholder="마케터"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B0B12] placeholder-gray-400 text-sm focus:outline-none focus:border-[#8D36EB]/60 transition-colors"
                    />
                    {errors.position && (
                      <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>
                    )}
                  </div>
                </div>

                {/* Company + Size */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#0B0B12] text-xs font-semibold mb-1.5">
                      회사명 <span className="text-[#8D36EB]">*</span>
                    </label>
                    <input
                      {...register("company")}
                      placeholder="주식회사 예시"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B0B12] placeholder-gray-400 text-sm focus:outline-none focus:border-[#8D36EB]/60 transition-colors"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#0B0B12] text-xs font-semibold mb-1.5">
                      규모 <span className="text-[#8D36EB]">*</span>
                    </label>
                    <select
                      {...register("employee_count")}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B0B12] text-sm focus:outline-none focus:border-[#8D36EB]/60 transition-colors"
                    >
                      <option value="">선택</option>
                      <option value="under_50">50명 미만</option>
                      <option value="50_200">50~200명</option>
                      <option value="200_1000">200~1000명</option>
                      <option value="over_1000">1000명 이상</option>
                    </select>
                    {errors.employee_count && (
                      <p className="text-red-500 text-xs mt-1">{errors.employee_count.message}</p>
                    )}
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#0B0B12] text-xs font-semibold mb-1.5">
                      이메일 <span className="text-[#8D36EB]">*</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="hong@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B0B12] placeholder-gray-400 text-sm focus:outline-none focus:border-[#8D36EB]/60 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#0B0B12] text-xs font-semibold mb-1.5">
                      전화번호
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B0B12] placeholder-gray-400 text-sm focus:outline-none focus:border-[#8D36EB]/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-[#0B0B12] text-xs font-semibold mb-1.5">
                    {activeTab === "seminar" ? "참가 희망 세미나" : activeTab === "trend" ? "문의 주제" : "관심 프로그램"}{" "}
                    <span className="text-[#8D36EB]">*</span>
                  </label>
                  <select
                    {...register("topic")}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B0B12] text-sm focus:outline-none focus:border-[#8D36EB]/60 transition-colors"
                  >
                    <option value="">선택해주세요</option>
                    {cfg.topicOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.topic && (
                    <p className="text-red-500 text-xs mt-1">{errors.topic.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[#0B0B12] text-xs font-semibold mb-1.5">
                    추가 문의사항
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder={
                      activeTab === "seminar"
                        ? "참가 인원, 팀 규모, 특별 요청사항을 적어주세요"
                        : activeTab === "trend"
                        ? "궁금한 AI 도구나 트렌드를 자유롭게 적어주세요"
                        : "교육 인원, 일정, 특이사항 등을 자유롭게 적어주세요"
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B0B12] placeholder-gray-400 text-sm focus:outline-none focus:border-[#8D36EB]/60 transition-colors resize-none"
                  />
                </div>

                {/* Privacy */}
                <div className="flex items-start gap-3">
                  <input
                    {...register("privacy_agreed")}
                    type="checkbox"
                    id="privacy"
                    className="mt-1 w-4 h-4 rounded flex-shrink-0"
                    style={{ accentColor: "#8D36EB" }}
                  />
                  <label htmlFor="privacy" className="text-gray-500 text-xs leading-relaxed">
                    <span className="text-[#0B0B12] font-semibold">개인정보 처리방침</span>에 동의합니다.
                    수집된 정보는 상담·세미나 운영 목적으로만 사용됩니다.
                  </label>
                </div>
                {errors.privacy_agreed && (
                  <p className="text-red-500 text-xs">{errors.privacy_agreed.message}</p>
                )}

                {error && (
                  <p className="text-red-500 text-xs text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #8D36EB, #165CFF)",
                    boxShadow: "0 4px 14px rgba(141,54,235,0.28)",
                  }}
                >
                  {submitting ? "제출 중..." : cfg.submitLabel}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
