"use client";

import { motion } from "framer-motion";
import { seminars } from "@/content/edu-data";
import { Clock, Users, MapPin, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { openContactTab } from "@/components/sections/EduContactSection";
import { Tilt3D } from "@/components/Tilt3D";

const badgeStyle: Record<string, string> = {
  FREE: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  HOT: "bg-red-50 text-red-600 border border-red-200",
  NEW: "bg-[#8D36EB]/10 text-[#8D36EB] border border-[#8D36EB]/20",
  BEST: "bg-amber-50 text-amber-600 border border-amber-200",
};

export function EduSeminarsSection() {
  return (
    <section id="seminars" className="py-24 bg-white relative overflow-hidden">
      {/* soft bg accents */}
      <div className="absolute top-0 right-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-[#8D36EB]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-[#165CFF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Head */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-[#8D36EB] bg-[#8D36EB]/8 rounded-full border border-[#8D36EB]/20 mb-4">
            SEMINARS &amp; WORKSHOPS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0B0B12] mb-4 leading-tight">
            정규 과정이 부담된다면,
            <br />
            <span
              style={{
                background: "linear-gradient(120deg, #8D36EB 0%, #165CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              세미나·특강으로 시작하세요
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            1~2시간 특강부터 반일 워크숍까지. 가볍게 시작해서 조직의 AI 온도를 확인한 뒤 정규 과정으로 확장하는 기업이 가장 많습니다.
          </p>
        </div>

        {/* Seminar Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {seminars.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
            <Tilt3D max={5} scale={1.01} className="h-full">
            <div
              className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 flex flex-col h-full ${
                s.featured
                  ? "border-emerald-300 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-200"
                  : "border-gray-200 hover:border-[#8D36EB]/30 hover:shadow-lg hover:shadow-[#8D36EB]/5"
              }`}
            >
              {/* gradient top band */}
              <div className={`h-1.5 bg-gradient-to-r ${s.gradient}`} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold text-gray-400 tracking-wide uppercase">
                    {s.category}
                  </span>
                  {s.badge && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${badgeStyle[s.badge]}`}>
                      {s.badge}
                    </span>
                  )}
                  {s.featured && (
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <Sparkles className="w-3 h-3" />
                      이번 달 모집 중
                    </span>
                  )}
                </div>

                <h3 className="font-black text-[#0B0B12] text-lg md:text-xl mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>

                {/* meta row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-[#8D36EB]" />
                    {s.meta.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <Users className="w-3.5 h-3.5 text-[#8D36EB]" />
                    {s.meta.target}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-[#8D36EB]" />
                    {s.meta.format}
                  </span>
                </div>

                {/* highlights */}
                <ul className="space-y-1.5 mb-5">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openContactTab("seminar")}
                  className={`mt-auto w-full py-3 rounded-xl text-sm font-bold transition-all ${
                    s.featured
                      ? "text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 shadow-md shadow-emerald-500/20"
                      : "text-[#0B0B12] border border-gray-200 hover:border-[#8D36EB]/40 hover:bg-[#8D36EB]/5"
                  }`}
                >
                  {s.featured ? "무료 세미나 신청하기 →" : "세미나 문의하기 →"}
                </button>
              </div>
            </div>
            </Tilt3D>
            </motion.div>
          ))}
        </div>

        {/* Ladder strip: 세미나 → 4주 → 12주 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center"
        >
          <p className="text-sm text-gray-500">
            <span className="font-bold text-[#0B0B12]">추천 도입 경로</span>
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center text-xs md:text-sm font-semibold text-gray-600">
            <span className="px-3 py-1.5 rounded-full bg-white border border-gray-200">세미나·특강 (Lv1 · 3H)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8D36EB]" />
            <span className="px-3 py-1.5 rounded-full bg-white border border-gray-200">기본형 (Lv1+2 · 6H)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8D36EB]" />
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#8D36EB]/10 to-[#165CFF]/10 border border-[#8D36EB]/20 text-[#8D36EB]">
              풀패키지 (Lv1–3) · 전사 AX
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
