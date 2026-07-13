"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiqQuestions, aiqResults, type AIQGrade } from "@/content/edu-data";

const GRADE_COLORS: Record<AIQGrade, string> = {
  S: "from-[#7C4DFF] to-[#4F7CFF]",
  A: "from-[#00C896] to-[#4F7CFF]",
  B: "from-[#165CFF] to-[#4F7CFF]",
  C: "from-[#8D36EB] to-[#165CFF]",
};

export function EduAIQSection() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(aiqQuestions.length).fill(null)
  );
  const [grade, setGrade] = useState<AIQGrade | null>(null);

  const totalQ = aiqQuestions.length;
  const selectedAnswer = answers[currentQ];

  function selectOption(idx: number) {
    const next = [...answers];
    next[currentQ] = idx;
    setAnswers(next);
  }

  function goNext() {
    if (selectedAnswer === null) return;
    if (currentQ + 1 < totalQ) {
      setCurrentQ(currentQ + 1);
    } else {
      const total = answers.reduce<number>(
        (sum, idx, qIdx) =>
          sum + (idx !== null ? aiqQuestions[qIdx].options[idx].score : 0),
        0
      );
      const pct = (total / (totalQ * 4)) * 100;
      const g: AIQGrade =
        pct >= 80 ? "S" : pct >= 60 ? "A" : pct >= 40 ? "B" : "C";
      setGrade(g);
      setStep("result");
    }
  }

  function goPrev() {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  }

  function handleRestart() {
    setStep("intro");
    setCurrentQ(0);
    setAnswers(Array(aiqQuestions.length).fill(null));
    setGrade(null);
  }

  const result = grade ? aiqResults[grade] : null;

  return (
    <section
      id="aiq"
      className="py-28 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(141,54,235,0.06), transparent 70%), radial-gradient(ellipse 50% 60% at 20% 80%, rgba(22,92,255,0.04), transparent 70%), #F8F6FF",
      }}
    >
      {/* Radial decoration */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-150px",
          right: "-100px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(141,54,235,0.1), transparent 60%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Head */}
        <div className="mb-14">
          <span className="inline-block text-xs font-bold tracking-widest text-[#8D36EB] uppercase mb-4">
            FREE DIAGNOSIS
          </span>
          <h2
            className="text-3xl md:text-[44px] font-black text-[#0B0B12] mb-4 leading-tight"
            style={{ letterSpacing: "-1.5px" }}
          >
            우리 조직 AI 수준은?
            <br />
            <span
              style={{
                background: "linear-gradient(120deg, #8D36EB 0%, #165CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI-Q 무료 진단
            </span>
          </h2>
          <p className="text-[#3F3F4A] text-base" style={{ lineHeight: "1.7" }}>
            8문항으로 조직의 AI 성숙도를 진단합니다. 3분이면 충분합니다.
          </p>
        </div>

        <div
          className="grid lg:grid-cols-2 gap-14 items-start"
          style={{ gridTemplateColumns: "1fr 1.2fr" }}
        >
          {/* Left: Grade Descriptions */}
          <div className="space-y-3">
            {(["S", "A", "B", "C"] as AIQGrade[]).map((g) => {
              const r = aiqResults[g];
              const isActive = grade === g && step === "result";
              return (
                <motion.div
                  key={g}
                  animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                  className={`rounded-xl border bg-white flex items-center gap-4 px-5 py-4 transition-all duration-300 ${
                    isActive
                      ? "border-[#8D36EB]/40 shadow-md"
                      : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white bg-gradient-to-br ${GRADE_COLORS[g]} flex-shrink-0`}
                  >
                    {g}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B0B12] text-sm">
                      {r.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-snug mt-0.5">
                      {r.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Quiz Widget */}
          <div
            className="bg-white border border-gray-200 rounded-3xl p-9 shadow-xl"
            style={{ minHeight: "500px" }}
          >
            <AnimatePresence mode="wait">
              {/* Intro */}
              {step === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col"
                >
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#8D36EB] animate-pulse" />
                    <span className="text-xs font-semibold text-[#8D36EB]">
                      8문항 · 약 3분
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0B0B12] mb-3">
                    AI-Q 조직 역량 진단
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    총 8개 문항으로 구성된 진단입니다. 현재 우리 조직의 AI 도입
                    현황에 가장 가까운 보기를 선택해주세요. 진단 완료 후
                    등급(S/A/B/C)과 맞춤 추천 프로그램을 알려드립니다.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      { label: "문항 수", value: "8문항" },
                      { label: "소요 시간", value: "3분" },
                      { label: "진단 방식", value: "자기 평가" },
                      { label: "결과", value: "즉시 확인" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-gray-50 rounded-xl p-3 border border-gray-200"
                      >
                        <p className="text-gray-400 text-[10px] mb-1">
                          {item.label}
                        </p>
                        <p className="text-[#0B0B12] font-bold text-sm">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep("quiz")}
                    className="w-full py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity"
                    style={{
                      background: "#8D36EB",
                      boxShadow: "0 4px 14px rgba(141,54,235,0.28)",
                    }}
                  >
                    AI-Q 진단 시작하기 →
                  </button>
                </motion.div>
              )}

              {/* Quiz */}
              {step === "quiz" && (
                <motion.div
                  key={`q-${currentQ}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col"
                >
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="text-xs font-bold text-[#8D36EB]"
                        style={{ letterSpacing: "0.5px" }}
                      >
                        {currentQ + 1} / {totalQ}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">
                        AI-Q 진단
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #8D36EB, #165CFF)",
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(currentQ / totalQ) * 100}%`,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <p
                    className="text-[#0B0B12] font-bold text-lg leading-relaxed mb-5"
                    style={{ letterSpacing: "-0.4px", minHeight: "56px" }}
                  >
                    Q{currentQ + 1}. {aiqQuestions[currentQ].q}
                  </p>

                  {/* Options — radio-dot style */}
                  <div className="space-y-2.5 mb-7">
                    {aiqQuestions[currentQ].options.map((opt, idx) => {
                      const isSelected = selectedAnswer === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => selectOption(idx)}
                          className="w-full text-left flex items-start gap-3 px-5 py-4 rounded-xl border transition-all duration-150"
                          style={{
                            borderColor: isSelected ? "#8D36EB" : "#ECECF0",
                            background: isSelected ? "#F3ECFF" : "#FAFAFB",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#0B0B12",
                          }}
                        >
                          {/* Radio dot */}
                          <span
                            className="flex-shrink-0 mt-0.5 flex items-center justify-center"
                            style={{
                              width: "18px",
                              height: "18px",
                              border: `1.5px solid ${
                                isSelected ? "#8D36EB" : "#DCDCE2"
                              }`,
                              borderRadius: "50%",
                              background: isSelected ? "#8D36EB" : "transparent",
                            }}
                          >
                            {isSelected && (
                              <span
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  background: "#fff",
                                  borderRadius: "50%",
                                  display: "block",
                                }}
                              />
                            )}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-5 border-t border-gray-100">
                    <button
                      onClick={goPrev}
                      disabled={currentQ === 0}
                      className="text-sm font-semibold text-gray-400 px-3 py-2 rounded-lg transition-colors hover:text-gray-700 hover:bg-gray-50 disabled:opacity-35 disabled:cursor-not-allowed"
                    >
                      ← 이전
                    </button>
                    <button
                      onClick={goNext}
                      disabled={selectedAnswer === null}
                      className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: "#8D36EB" }}
                    >
                      {currentQ + 1 === totalQ ? "결과 확인 →" : "다음 →"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Result */}
              {step === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Grade letter */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.45, delay: 0.15 }}
                    className="font-black mb-2"
                    style={{
                      fontSize: "80px",
                      letterSpacing: "-3px",
                      lineHeight: 1,
                      background:
                        "linear-gradient(135deg, #8D36EB, #165CFF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {grade}
                  </motion.div>
                  <p className="text-gray-400 text-sm mb-1">우리 조직 AI 수준</p>
                  <h3
                    className="text-2xl font-black text-[#0B0B12] mb-3"
                    style={{ letterSpacing: "-0.5px" }}
                  >
                    {result.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
                    {result.desc}
                  </p>

                  {/* Recommendation box */}
                  <div
                    className="w-full rounded-2xl p-5 mb-6 text-left"
                    style={{
                      background:
                        "linear-gradient(135deg, #F3ECFF, #EDF2FF)",
                    }}
                  >
                    <p className="text-xs font-bold text-[#8D36EB] uppercase tracking-widest mb-2">
                      추천 프로그램
                    </p>
                    <p className="text-sm text-[#0B0B12] leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="w-full py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity"
                      style={{
                        background: "#8D36EB",
                        boxShadow: "0 4px 14px rgba(141,54,235,0.28)",
                      }}
                    >
                      교육 문의하기 →
                    </button>
                    <button
                      onClick={handleRestart}
                      className="text-sm font-semibold text-gray-400 py-2 hover:text-gray-700 transition-colors"
                    >
                      다시 진단하기
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
