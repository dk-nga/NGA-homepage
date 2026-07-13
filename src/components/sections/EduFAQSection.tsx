"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/content/edu-data";
import { ChevronDown } from "lucide-react";

export function EduFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Section Head */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-[#8D36EB] bg-[#8D36EB]/8 rounded-full border border-[#8D36EB]/20 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0B0B12] mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-gray-500 text-base">
            도입 전 가장 많이 묻는 질문들을 모았습니다.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-[#8D36EB]/30 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-bold text-[#0B0B12] text-sm md:text-base leading-relaxed">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
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
                      <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">더 궁금한 점이 있으신가요?</p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
            style={{ background: "#8D36EB" }}
          >
            직접 문의하기 →
          </button>
        </div>
      </div>
    </section>
  );
}
