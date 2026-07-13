"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/content/edu-data";
import { X, ArrowRight } from "lucide-react";
import { Tilt3D } from "@/components/Tilt3D";


function CaseCard({ c, onOpen }: { c: CaseStudy; onOpen: () => void }) {
  return (
    <Tilt3D max={6} scale={1.015} className="h-full">
    <div
      onClick={onOpen}
      className="rounded-2xl border border-gray-200 bg-white overflow-hidden cursor-pointer hover:border-[#8D36EB]/30 hover:shadow-lg hover:shadow-[#8D36EB]/5 transition-all duration-300 group h-full flex flex-col"
    >
      {/* Top gradient band */}
      <div className={`h-28 bg-gradient-to-br ${c.imageBg} relative flex items-center justify-center`}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg"
          style={{ background: c.logoBg }}
        >
          {c.logo}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-black text-[#0B0B12] text-base">{c.name}</h3>
            <p className="text-gray-400 text-xs">{c.size} · {c.industry}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#8D36EB] group-hover:translate-x-1 transition-all" />
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{c.cardBody}</p>

        <div className="flex gap-3 mt-auto">
          {c.results.map((r) => (
            <div key={r.label} className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center">
              <p className="font-black text-[#8D36EB] text-sm">{r.num}</p>
              <p className="text-gray-400 text-[10px] leading-tight">{r.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Tilt3D>
  );
}

function CaseModal({ c, onClose }: { c: CaseStudy; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className={`h-32 bg-gradient-to-br ${c.imageBg} rounded-t-3xl relative flex items-end px-8 pb-6`}>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg"
              style={{ background: c.logoBg }}
            >
              {c.logo}
            </div>
            <div>
              <h3 className="font-black text-white text-xl">{c.name}</h3>
              <p className="text-white/70 text-sm">{c.size} · {c.industry}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-8">
          {/* Quote */}
          <blockquote className="text-gray-600 italic text-base leading-relaxed mb-8 pl-4 border-l-4 border-[#8D36EB]/30">
            {c.quote}
          </blockquote>

          {/* Before / Intervention / After */}
          <div className="space-y-4 mb-8">
            {[
              { label: "교육 전 상황", value: c.before, color: "bg-red-50 border-red-100 text-red-800" },
              { label: "교육 내용", value: c.intervention, color: "bg-blue-50 border-blue-100 text-blue-800" },
              { label: "교육 후 변화", value: c.after, color: "bg-green-50 border-green-100 text-green-800" },
            ].map((item) => (
              <div key={item.label} className={`p-4 rounded-xl border ${item.color}`}>
                <p className="text-xs font-bold mb-1.5 opacity-70 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Results */}
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">성과 지표</p>
            <div className="grid grid-cols-3 gap-3">
              {c.results.map((r) => (
                <div key={r.label} className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                  <p className="font-black text-[#8D36EB] text-2xl mb-1">{r.num}</p>
                  <p className="text-gray-500 text-xs leading-tight">{r.label}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300);
            }}
            className="mt-8 w-full py-4 rounded-2xl font-bold text-white hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #8D36EB, #165CFF)", boxShadow: "0 4px 14px rgba(141,54,235,0.28)" }}
          >
            우리 회사도 도입 문의하기 →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EduCasesSection() {
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);

  return (
    <section id="cases" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Head */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-[#8D36EB] bg-[#8D36EB]/8 rounded-full border border-[#8D36EB]/20 mb-4">
            CASE STUDIES
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0B0B12] mb-4 leading-tight">
            기업들이 증명한
            <br />
            <span
              style={{
                background: "linear-gradient(120deg, #8D36EB 0%, #165CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              실제 교육 효과
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            이커머스부터 공공기관, 금융까지. 업종과 규모를 초월한 AI 교육 성과.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((c) => (
            <CaseCard key={c.id} c={c} onOpen={() => setOpenCase(c)} />
          ))}
        </div>

        {/* Case Modal */}
        <AnimatePresence>
          {openCase && (
            <CaseModal c={openCase} onClose={() => setOpenCase(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
