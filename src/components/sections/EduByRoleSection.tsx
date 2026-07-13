"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { roleTracks, type RoleId } from "@/content/edu-data";
import { Target, Megaphone, Briefcase, Settings, Code2, Palette, ChevronDown } from "lucide-react";

const roleIconMap: Record<string, React.ReactNode> = {
  plan: <Target className="w-5 h-5 text-white" />,
  marketing: <Megaphone className="w-5 h-5 text-white" />,
  sales: <Briefcase className="w-5 h-5 text-white" />,
  ops: <Settings className="w-5 h-5 text-white" />,
  dev: <Code2 className="w-5 h-5 text-white" />,
  design: <Palette className="w-5 h-5 text-white" />,
};

export function EduByRoleSection() {
  const [openRole, setOpenRole] = useState<RoleId | null>(null);

  return (
    <section id="by-role" className="py-24 bg-[#0B0B12]">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section Head */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-[#8D36EB] bg-[#8D36EB]/10 rounded-full border border-[#8D36EB]/20 mb-4">
            CURRICULUM BY ROLE
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            직무별로 다른 AI,
            <br />
            <span
              style={{
                background: "linear-gradient(120deg, #8D36EB 0%, #165CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              직무별로 다른 커리큘럼
            </span>
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            마케터의 AI는 디자이너의 AI와 다릅니다. 직무에 맞는 도구와
            워크플로우를 배웁니다.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {roleTracks.map((role) => {
            const isOpen = openRole === role.id;
            return (
              <div
                key={role.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#8D36EB]/40 bg-[#8D36EB]/5"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpenRole(isOpen ? null : role.id)}
                  className="w-full flex items-center gap-5 px-6 py-5 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8D36EB] to-[#165CFF] flex items-center justify-center flex-shrink-0">
                    {roleIconMap[role.id] || <Target className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-white text-base block">
                      {role.name}
                    </span>
                    <span className="text-white/50 text-sm line-clamp-1">
                      {role.summary}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#8D36EB]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 grid md:grid-cols-3 gap-6 border-t border-white/10 mt-0">
                        {/* Scenarios */}
                        <div className="md:col-span-2 pt-5">
                          <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">
                            실습 시나리오
                          </p>
                          <div className="space-y-2.5">
                            {role.scenarios.map((s, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span
                                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white mt-0.5"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #8D36EB, #165CFF)",
                                  }}
                                >
                                  {i + 1}
                                </span>
                                <p className="text-white/70 text-sm leading-relaxed">
                                  {s}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tools & Outcome */}
                        <div className="pt-5 space-y-4">
                          <div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">
                              주요 도구
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {role.tools.map((t) => (
                                <span
                                  key={t}
                                  className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs border border-white/10"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div
                            className="rounded-xl p-4 border border-[#8D36EB]/20"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(141,54,235,0.15), rgba(22,92,255,0.15))",
                            }}
                          >
                            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">
                              기대 성과
                            </p>
                            <p className="text-white font-bold text-sm">
                              {role.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white hover:opacity-90 transition-opacity"
            style={{ background: "#8D36EB" }}
          >
            직무별 커리큘럼 상담하기 →
          </button>
        </div>
      </div>
    </section>
  );
}
