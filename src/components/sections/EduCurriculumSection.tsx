"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  curriculumTracks,
  curriculumGroups,
  curriculumPackages,
  curriculumLevelSystem,
  customTracks,
  type CurriculumGroup,
  type CurriculumTrack,
} from "@/content/edu-data";
import { ChevronDown, Clock, Users, Target, Package, Sparkles } from "lucide-react";
import { openContactTab } from "@/components/sections/EduContactSection";

type GroupFilter = "all" | CurriculumGroup;

const groupColor: Record<CurriculumGroup, string> = {
  general: "from-[#8D36EB] to-[#165CFF]",
  dev: "from-amber-500 to-orange-500",
  content: "from-pink-500 to-rose-500",
};

const groupBadge: Record<CurriculumGroup, string> = {
  general: "bg-[#8D36EB]/8 text-[#8D36EB] border-[#8D36EB]/20",
  dev: "bg-amber-50 text-amber-600 border-amber-200",
  content: "bg-pink-50 text-pink-600 border-pink-200",
};

const lvColor: Record<string, string> = {
  LV1: "bg-emerald-500",
  LV2: "bg-[#165CFF]",
  LV3: "bg-[#8D36EB]",
};

function TrackCard({ track }: { track: CurriculumTrack }) {
  const [open, setOpen] = useState(false);
  const [activeLv, setActiveLv] = useState(0);
  const lv = track.levels[activeLv];

  return (
    <motion.div
      layout
      className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
        open ? "border-[#8D36EB]/30 shadow-lg shadow-[#8D36EB]/5 md:col-span-2" : "border-gray-200 hover:border-gray-300 hover:shadow-md"
      }`}
    >
      {/* Header */}
      <button onClick={() => setOpen(!open)} className="w-full text-left p-6 group">
        <div className="flex items-start gap-4">
          {/* Number chip */}
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${groupColor[track.group]} flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <span className="text-white text-sm font-black">{track.num}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-black text-[#0B0B12] text-base md:text-lg leading-tight">{track.name}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${groupBadge[track.group]}`}>
                {curriculumGroups[track.group].label}
              </span>
            </div>
            <p className={`text-gray-500 text-xs leading-relaxed ${open ? "" : "line-clamp-2"}`}>{track.desc}</p>

            {/* tools */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {track.tools.map((tool) => (
                <span key={tool} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-medium rounded-full">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:text-[#8D36EB] ${open ? "rotate-180" : ""}`}
          />
        </div>

        {/* meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pl-[60px]">
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <Users className="w-3 h-3" /> {track.capacity}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <Package className="w-3 h-3" /> 풀패키지 {track.fullPackage}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <Target className="w-3 h-3" /> {track.target}
          </span>
        </div>
      </button>

      {/* Expanded: level tabs + curriculum */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-gray-100 mb-5" />

              {/* Level tabs */}
              <div className="flex gap-2 mb-5">
                {track.levels.map((l, i) => (
                  <button
                    key={l.lv}
                    onClick={() => setActiveLv(i)}
                    className={`flex-1 rounded-xl px-3 py-2.5 text-left transition-all border ${
                      activeLv === i
                        ? "border-[#8D36EB]/40 bg-[#8D36EB]/5 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${lvColor[l.lv]}`} />
                      <span className={`text-xs font-black ${activeLv === i ? "text-[#8D36EB]" : "text-gray-600"}`}>{l.lv}</span>
                      <span className="text-[10px] text-gray-400 ml-auto">{l.hours}</span>
                    </div>
                    <p className={`text-[11px] font-semibold mt-1 leading-tight ${activeLv === i ? "text-[#0B0B12]" : "text-gray-500"}`}>
                      {l.title}
                    </p>
                  </button>
                ))}
              </div>

              {/* Active level detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLv}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-bold text-[#0B0B12] mb-3">
                    <span className="text-[#8D36EB]">GOAL</span>&nbsp; {lv.goal}
                  </p>

                  <div className="space-y-2 mb-4">
                    {lv.modules.map((m) => (
                      <div key={m.name} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
                        <span className="text-xs text-gray-700 font-medium flex-1">{m.name}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 whitespace-nowrap">
                          <Clock className="w-3 h-3" /> {m.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* output */}
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 mb-5">
                    <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <p className="text-xs text-emerald-800">
                      <span className="font-black">수료 산출물</span>&nbsp; {lv.output}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => openContactTab("edu")}
                className={`w-full py-3 rounded-xl text-white text-sm font-bold bg-gradient-to-r ${groupColor[track.group]} hover:opacity-90 transition-opacity`}
              >
                이 과정 도입 문의하기 →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function EduCurriculumSection() {
  const [filter, setFilter] = useState<GroupFilter>("all");

  const filtered = filter === "all" ? curriculumTracks : curriculumTracks.filter((t) => t.group === filter);

  return (
    <section id="curriculum" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Head */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-[#8D36EB] bg-[#8D36EB]/8 rounded-full border border-[#8D36EB]/20 mb-4">
            2026 CURRICULUM CATALOG
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0B0B12] mb-4 leading-tight">
            13개 툴 축 ×{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #8D36EB 0%, #165CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              레벨제 커리큘럼
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            2026년 실무 검증을 마친 13개 AI 툴 축을 Lv1 입문 – Lv2 실무 – Lv3 심화 레벨제로 설계했습니다.
            모든 레벨은 회당 3H, 실습 60% 중심이며 과정마다 수강생이 직접 만든 산출물이 남습니다.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto mb-12">
          {[
            { num: "13", label: "툴 축" },
            { num: "39", label: "레벨 과정" },
            { num: "3H", label: "회당 시간" },
            { num: "60%", label: "실습 비중" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 py-4 text-center">
              <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#8D36EB] to-[#165CFF] bg-clip-text text-transparent">
                {s.num}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Level system explainer */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {curriculumLevelSystem.map((l, i) => (
            <motion.div
              key={l.lv}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-200 p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${["bg-emerald-500", "bg-[#165CFF]", "bg-[#8D36EB]"][i]}`} />
                <span className="font-black text-sm text-[#0B0B12]">{l.lv}</span>
                <span className="text-[10px] font-bold text-gray-400 ml-auto">{l.hours}</span>
              </div>
              <p className="text-xs font-bold text-[#8D36EB] mb-1.5">{l.tag}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{l.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Package chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {curriculumPackages.map((p) => (
            <div key={p.name} className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
              <span className="text-xs font-black text-[#0B0B12]">{p.name}</span>
              <span className="text-[11px] font-semibold text-[#8D36EB]">{p.spec}</span>
              <span className="text-[11px] text-gray-400">— {p.desc}</span>
            </div>
          ))}
        </div>

        {/* Group filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1.5 gap-1 flex-wrap justify-center">
            {([
              { key: "all", label: `전체 (${curriculumTracks.length})` },
              { key: "general", label: "범용 AI" },
              { key: "dev", label: "자동화·개발" },
              { key: "content", label: "콘텐츠·에이전트" },
            ] as { key: GroupFilter; label: string }[]).map((g) => (
              <button
                key={g.key}
                onClick={() => setFilter(g.key)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  filter === g.key ? "text-white shadow-md" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                style={filter === g.key ? { background: "linear-gradient(135deg, #8D36EB, #165CFF)" } : {}}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* group sub description */}
        {filter !== "all" && (
          <p className="text-center text-xs text-gray-400 -mt-4 mb-8">{curriculumGroups[filter].sub}</p>
        )}

        {/* Track cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>

        {/* Custom tracks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-[#8D36EB]/15 bg-white p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <p className="text-xs font-bold text-[#8D36EB] tracking-wider mb-1.5">CUSTOM TRACK</p>
              <h3 className="font-black text-[#0B0B12] text-lg mb-1.5">13개 축을 조합해 우리 조직 맞춤 트랙으로</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                대상별 과정은 별도 커리큘럼이 아니라 위 13개 축의 레벨을 조합한 맞춤 패키지로 구성합니다.
                수강생 수준 진단(AI-Q) 후 Lv2부터 진입하는 것도 가능합니다.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {customTracks.map((c) => (
                  <span key={c.name} className="text-[11px] bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                    <span className="font-bold text-[#0B0B12]">{c.name}</span>
                    <span className="text-gray-400"> · {c.combo}</span>
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => openContactTab("edu")}
              className="px-6 py-3.5 rounded-xl text-white text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #8D36EB, #165CFF)", boxShadow: "0 4px 14px rgba(141,54,235,0.28)" }}
            >
              맞춤 트랙 설계 문의 →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
