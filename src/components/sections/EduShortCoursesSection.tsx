"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shortCourses, type ShortCourseId } from "@/content/edu-data";
import { ChevronDown, Users } from "lucide-react";

export function EduShortCoursesSection() {
  const [expanded, setExpanded] = useState<ShortCourseId | null>(null);

  return (
    <section id="short" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Head */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-[#8D36EB] bg-[#8D36EB]/8 rounded-full border border-[#8D36EB]/20 mb-4">
            SHORT COURSES
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0B0B12] mb-4 leading-tight">
            4주 단기 과정
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            빠르게 배워 바로 쓰는 집중 과정. 월 1회, 회당 3시간, 4회 완성.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shortCourses.map((course) => {
            const isExpanded = expanded === course.id;
            return (
              <motion.div
                key={course.id}
                layout
                className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                  isExpanded ? "border-[#8D36EB]/30 shadow-lg shadow-[#8D36EB]/5" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Card Header with gradient */}
                <div className={`h-3 bg-gradient-to-r ${course.gradient}`} />

                <div className="p-6">
                  {/* Badge + Title */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-black text-[#0B0B12] text-lg leading-tight">
                      {course.title}
                    </h3>
                    {course.badge && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${
                          course.badge === "NEW"
                            ? "bg-[#8D36EB]/10 text-[#8D36EB]"
                            : course.badge === "HOT"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Short name */}
                  <p className="text-gray-600 text-sm font-semibold mb-3">{course.shortName}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{course.desc}</p>

                  {/* Capacity */}
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                    <Users className="w-3.5 h-3.5" />
                    <span>{course.capacity}</span>
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : course.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {isExpanded ? "접기" : "4주 커리큘럼 보기"}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expandable Curriculum */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3">
                          <div className="h-px bg-gray-100" />
                          {course.weeks.map((week) => (
                            <div key={week.num} className="flex gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${course.gradient}`}
                              >
                                <span className="text-white text-[10px] font-black">{week.num}</span>
                              </div>
                              <div>
                                <p className="font-bold text-[#0B0B12] text-xs mb-0.5">{week.title}</p>
                                <p className="text-gray-400 text-xs leading-relaxed">{week.desc}</p>
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className={`mt-2 w-full py-3 rounded-xl text-white text-sm font-bold bg-gradient-to-r ${course.gradient} hover:opacity-90 transition-opacity`}
                          >
                            수강 문의하기 →
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
