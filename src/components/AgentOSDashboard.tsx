"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const AGENTS = [
  {
    id: "product", num: 1, icon: "🛍️",
    shortName: "상품 기획", name: "상품 기획 Agent",
    color: "#8D36EB", bg: "rgba(141,54,235,0.06)",
    tasks: [
      { text: "경쟁사 78개 상품 가격 비교 완료", done: true },
      { text: "추천 카테고리 → 뷰티/스킨케어 ✓", done: true },
      { text: "기획서 생성 중...", done: false },
    ],
    gauge: { value: 78, label: "기획 완성도", peakLabel: "추천 정확도", peakValue: "98.2%" },
    cards: [
      { label: "분석 상품수", value: "1,847", sub: "+12%↑", up: true },
      { label: "추천 정확도", value: "98.2%", sub: "+2.1%↑", up: true },
      { label: "예상 마진율", value: "42%", sub: "목표 45%", up: false },
      { label: "절감 시간", value: "4.3h", sub: "오늘", up: true },
    ],
  },
  {
    id: "content", num: 2, icon: "✍️",
    shortName: "콘텐츠 생성", name: "콘텐츠 생성 Agent",
    color: "#165CFF", bg: "rgba(22,92,255,0.06)",
    tasks: [
      { text: "SEO 키워드 23개 자동 삽입 완료", done: true },
      { text: "네이버·쿠팡 양식 변환 완료 ✓", done: true },
      { text: "썸네일 프롬프트 3종 생성 중...", done: false },
    ],
    gauge: { value: 94, label: "콘텐츠 품질", peakLabel: "품질 점수", peakValue: "9.4 / 10" },
    cards: [
      { label: "생성 건수", value: "312", sub: "오늘", up: true },
      { label: "품질 점수", value: "9.4", sub: "/10.0", up: true },
      { label: "SEO 키워드", value: "23개", sub: "자동 삽입", up: true },
      { label: "절감 시간", value: "6.1h", sub: "오늘", up: true },
    ],
  },
  {
    id: "marketing", num: 3, icon: "📣",
    shortName: "마케팅", name: "마케팅 Agent",
    color: "#7c3aed", bg: "rgba(124,58,237,0.06)",
    tasks: [
      { text: "광고 소재 A/B 3종 생성 완료 ✓", done: true },
      { text: "카카오 알림톡 최적화 완료 ✓", done: true },
      { text: "이메일 캠페인 스케줄 수립 중...", done: false },
    ],
    gauge: { value: 84, label: "캠페인 효율", peakLabel: "예측 ROAS", peakValue: "4.2x" },
    cards: [
      { label: "예상 도달", value: "52K", sub: "이번 캠페인", up: true },
      { label: "예측 ROAS", value: "4.2x", sub: "+0.8x↑", up: true },
      { label: "광고 소재", value: "3종", sub: "A/B 완성", up: true },
      { label: "절감 시간", value: "7.2h", sub: "오늘", up: true },
    ],
  },
  {
    id: "analytics", num: 4, icon: "📊",
    shortName: "데이터 분석", name: "데이터 분석 Agent",
    color: "#0ea5e9", bg: "rgba(14,165,233,0.06)",
    tasks: [
      { text: "30일 판매 데이터 수집 및 정제 완료 ✓", done: true },
      { text: "전환율 개선 구간 탐지 +17%p 확인", done: true },
      { text: "수요 예측 리포트 생성 중...", done: false },
    ],
    gauge: { value: 62, label: "분석 진행률", peakLabel: "매출 증가율", peakValue: "+38%" },
    cards: [
      { label: "전환율", value: "+52%", sub: "전월 대비", up: true },
      { label: "매출 증가", value: "+38%", sub: "전월 대비", up: true },
      { label: "세그먼트", value: "12그룹", sub: "8→12 확장", up: true },
      { label: "절감 시간", value: "5.8h", sub: "오늘", up: true },
    ],
  },
];

interface GaugeProps {
  value: number;
  color: string;
  label: string;
  peakValue: string;
  peakLabel: string;
}

function GaugeMeter({ value, color, label, peakValue, peakLabel }: GaugeProps) {
  const cx = 100, cy = 88, r = 68;
  const arcPath = `M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-full max-w-[196px]">
        <svg viewBox="0 0 200 100" className="w-full">
          {/* Tick marks */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const angle = Math.PI - t * Math.PI;
            const x1 = cx + (r - 6) * Math.cos(angle);
            const y1 = cy - (r - 6) * Math.sin(angle);
            const x2 = cx + (r + 6) * Math.cos(angle);
            const y2 = cy - (r + 6) * Math.sin(angle);
            return (
              <line key={t} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
            );
          })}
          {/* Track */}
          <path d={arcPath} fill="none" stroke="#e9ecef" strokeWidth="14" strokeLinecap="round" />
          {/* Value arc */}
          <motion.path
            key={`arc-${value}-${color}`}
            d={arcPath}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: value / 100 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          {/* Center value */}
          <text x="100" y="76" textAnchor="middle" fontSize="26" fontWeight="900"
            fill="#111827" fontFamily="system-ui, sans-serif">
            {value}%
          </text>
          <text x="100" y="93" textAnchor="middle" fontSize="9.5" fill="#9ca3af"
            fontFamily="system-ui, sans-serif" letterSpacing="0.02em">
            {label}
          </text>
        </svg>
      </div>
      {/* Peak info card */}
      <div
        className="w-full rounded-lg px-3 py-2 flex items-center justify-between border"
        style={{ background: `${color}08`, borderColor: `${color}22` }}
      >
        <p className="text-[10px] text-gray-400">{peakLabel}</p>
        <p className="text-sm font-black" style={{ color }}>{peakValue}</p>
      </div>
    </div>
  );
}

function Toggle({ on, color }: { on: boolean; color: string }) {
  return (
    <motion.div
      className="relative h-[18px] rounded-full cursor-pointer shrink-0"
      style={{ width: 34 }}
      animate={{ backgroundColor: on ? color : "#d1d5db" }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute top-[3px] h-3 w-3 rounded-full bg-white shadow"
        animate={{ left: on ? 17 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.div>
  );
}

export function AgentOSDashboard() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % AGENTS.length), 4500);
    return () => clearInterval(id);
  }, []);

  const agent = AGENTS[idx];

  return (
    <div
      className="w-full overflow-hidden rounded-2xl select-none"
      style={{
        background: "#ffffff",
        boxShadow: "0 24px 64px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05), 0 1px 0 rgba(0,0,0,0.04)",
        border: "1px solid #e9ecef",
      }}
    >
      {/* ── Title bar ── */}
      <div className="flex items-center gap-2 px-4 py-[11px] bg-[#f9fafb] border-b border-gray-100">
        <div className="flex gap-[5px]">
          <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center text-[11px] font-medium text-gray-400 tracking-wide">
          NGA Commerce OS &nbsp;·&nbsp; Agent Hub
        </div>
        <div className="flex gap-1.5 items-center">
          {AGENTS.map((a, i) => (
            <motion.div key={a.id} className="h-[5px] rounded-full"
              animate={{ width: i === idx ? 18 : 5, backgroundColor: i === idx ? a.color : "#d1d5db" }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex" style={{ minHeight: 354 }}>

        {/* ── Left: Agent list ── */}
        <div className="flex flex-col" style={{ width: "52%", borderRight: "1px solid #f3f4f6" }}>
          {/* Panel header */}
          <div className="px-4 pt-3 pb-2 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-gray-800">Agent 설정</span>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(34,197,94,0.10)", color: "#16a34a" }}>
                ● 4 실행중
              </span>
            </div>
            <div className="flex items-center mt-2.5 text-[9px] text-gray-400 uppercase tracking-widest">
              <span className="w-5 shrink-0">순서</span>
              <span className="flex-1 ml-3">에이전트명</span>
              <span className="w-9 text-center">상태</span>
              <span className="w-5 text-right">관리</span>
            </div>
          </div>

          {/* Rows */}
          <div className="flex-1">
            {AGENTS.map((a, i) => {
              const isActive = i === idx;
              const isDone = i < idx;
              const isWaiting = i > idx;
              return (
                <motion.div key={a.id}
                  animate={{ backgroundColor: isActive ? a.bg : "transparent" }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center px-4 border-b border-gray-50 last:border-0"
                  style={{
                    paddingTop: isActive ? 9 : 7,
                    paddingBottom: isActive ? 9 : 7,
                    borderLeft: `3px solid ${isActive ? a.color : "transparent"}`,
                  }}
                >
                  <span className="w-5 text-[11px] font-medium text-gray-400 shrink-0">{a.num}</span>
                  <div className="flex-1 ml-3 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] leading-none">{a.icon}</span>
                      <p className="text-[12px] font-semibold truncate"
                        style={{ color: isActive ? a.color : isDone ? "#374151" : "#9ca3af" }}>
                        {a.shortName}
                      </p>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[9.5px] text-gray-400 mt-0.5 truncate"
                        >
                          {a.tasks.find((t) => !t.done)?.text ?? a.tasks[a.tasks.length - 1].text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="w-9 flex justify-center shrink-0">
                    <Toggle on={!isWaiting} color={a.color} />
                  </div>
                  <div className="w-5 flex justify-end shrink-0">
                    <span className="text-[11px] text-gray-300">···</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom summary */}
          <div className="px-4 py-3 bg-[#f9fafb] border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Today 절감 시간</p>
                <p className="text-lg font-black text-gray-800 leading-tight">24.7h</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-400">전월 대비</p>
                <p className="text-sm font-bold text-green-500">+18% ↑</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Preview panel ── */}
        <AnimatePresence mode="wait">
          <motion.div key={agent.id}
            className="flex-1 flex flex-col gap-3 p-3.5"
            style={{ background: "#f8fafc" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Top: Gauge card */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-gray-700">실행 미리보기</p>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-md tracking-widest"
                  style={{ background: `${agent.color}12`, color: agent.color }}>
                  {agent.id.toUpperCase()}
                </span>
              </div>
              <GaugeMeter
                value={agent.gauge.value}
                color={agent.color}
                label={agent.gauge.label}
                peakValue={agent.gauge.peakValue}
                peakLabel={agent.gauge.peakLabel}
              />
            </div>

            {/* Bottom: Metric grid */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-2">성과 지표</p>
              <div className="grid grid-cols-2 gap-1.5">
                {agent.cards.map((c, i) => (
                  <motion.div key={`${agent.id}-${c.label}`}
                    className="rounded-lg p-2 border border-gray-50"
                    style={{ background: "#f9fafb" }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <p className="text-[8.5px] text-gray-400 truncate">{c.label}</p>
                    <p className="text-[13px] font-black text-gray-800 leading-tight mt-0.5">{c.value}</p>
                    <p className="text-[8px] mt-0.5 font-medium"
                      style={{ color: c.up ? "#22c55e" : "#f59e0b" }}>{c.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
