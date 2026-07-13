"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { levelPrograms, type LevelTab } from "@/content/edu-data";
import { CheckCircle2 } from "lucide-react";

const tabLabels: Record<LevelTab, string> = {
  exec: "임원 워크숍",
  leader: "리더십 12주",
  practitioner: "실무자 부트캠프",
};

export function EduByLevelSection() {
  const [active, setActive] = useState<LevelTab>("leader");
  const program = levelPrograms.find((p) => p.id === active)!;

  return (
    <section id="by-level" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Head */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-[#8D36EB] bg-[#8D36EB]/8 rounded-full border border-[#8D36EB]/20 mb-4">
            CURRICULUM BY LEVEL
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0B0B12] mb-4 leading-tight">
            직급별로 다른 교육,
            <br />
            <span
              style={{
                background: "linear-gradient(120deg, #8D36EB 0%, #165CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              같은 방향
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            임원은 전략을, 리더는 실행력을, 실무자는 현장 적용을. 직급에 맞게
            설계된 AI 교육입니다.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-10 p-1.5 bg-gray-100 rounded-2xl max-w-md mx-auto">
          {(["exec", "leader", "practitioner"] as LevelTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                active === tab
                  ? "bg-white text-[#0B0B12] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left: Meta Card */}
            <div className="bg-[#0B0B12] rounded-3xl p-8 text-white flex flex-col">
              <span className="text-[#8D36EB] text-xs font-bold tracking-wider uppercase mb-3">
                {program.pretitle}
              </span>
              <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
                {program.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                {program.desc}
              </p>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {program.meta.map((m) => (
                  <div
                    key={m.key}
                    className="bg-white/5 rounded-xl p-3 border border-white/10"
                  >
                    <p className="text-white/40 text-xs mb-1">{m.key}</p>
                    <p className="text-white font-bold text-sm">{m.val}</p>
                  </div>
                ))}
              </div>

              {/* Outcomes */}
              <div className="mt-auto">
                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">
                  기대 성과
                </p>
                <div className="space-y-2">
                  {program.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8D36EB] flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-8 w-full py-4 rounded-2xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                style={{ background: "#8D36EB" }}
              >
                교육 문의하기 →
              </button>
            </div>

            {/* Right: Curriculum */}
            <div className="space-y-4">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                {program.sectionTitle}
              </p>
              {program.curriculum.map((c, i) => (
                <motion.div
                  key={c.num}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-[#8D36EB]/20 hover:bg-[#8D36EB]/5 transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #8D36EB, #165CFF)",
                    }}
                  >
                    <span className="text-white text-xs font-black">
                      {c.num}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B0B12] text-sm mb-1 group-hover:text-[#8D36EB] transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
