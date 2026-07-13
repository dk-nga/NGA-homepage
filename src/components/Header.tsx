"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ArrowRight, ChevronDown, Zap } from "lucide-react";
import logoFull from "@/assets/nextgen_ai_corporate_education_transparent.png";
import { Link, usePathname } from "@/i18n/navigation";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useContactWidget } from "@/contexts/ContactWidgetContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

function AnnouncementBanner() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAXPartners = pathname === "/ax-partners";
  const isEducation = pathname === "/education";
  const isCases = pathname === "/cases";
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  const getBannerContent = () => {
    if (isHome) {
      return {
        badge: "New",
        text: (
          <>
            실무자가 직접 만드는{" "}
            <span className="font-bold text-[#fbbf24]">AI 자동화 교육</span>, 커리큘럼 확인하기
          </>
        ),
        badgeStyle: "bg-gradient-to-r from-[#8D36EB] to-[#165CFF]",
        href: "/education",
      };
    }
    if (isAXPartners) {
      return {
        badge: "2026",
        text: (
          <>
            우리 조직{" "}
            <span className="bg-gradient-to-r from-[#8D36EB] to-[#165CFF] bg-clip-text font-bold text-transparent">
              AX
            </span>{" "}
            수준은? 무료 진단
          </>
        ),
        badgeStyle: "bg-gradient-to-r from-[#8D36EB] to-[#165CFF]",
        href: "#diagnosis-form",
      };
    }
    if (isEducation) {
      return {
        badge: "New",
        text: (
          <>
            실무자가 직접 만드는 자동화 교육
            <span className="hidden md:inline">, 커리큘럼 확인하기</span>
          </>
        ),
        badgeStyle: "bg-gradient-to-r from-[#8D36EB] to-[#165CFF]",
        href: "#curriculum",
      };
    }
    if (isCases) {
      return {
        badge: "2026",
        text: (
          <>
            &quot;우리도 가능할까?&quot; 무료 진단
            <span className="hidden md:inline">으로 확인하세요</span>
          </>
        ),
        badgeStyle: "bg-[#dc2626]",
        href: "#",
      };
    }
    if (isBlog) {
      return {
        badge: "New",
        text: (
          <>
            <span className="hidden md:inline">이 글, </span>우리 회사에 적용할 수 있을까? 무료{" "}
            <span className="bg-gradient-to-r from-[#8D36EB] to-[#165CFF] bg-clip-text font-bold text-transparent">
              AX
            </span>{" "}
            진단
          </>
        ),
        badgeStyle: "bg-gradient-to-r from-[#8D36EB] to-[#165CFF]",
        href: "/ax-partners",
      };
    }
    return {
      badge: "New",
      text: t("banner.announcement"),
      badgeStyle: "bg-[#ff3b5c]",
      href: "#",
    };
  };

  const bannerContent = getBannerContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="bg-[#0a0a0a] border-b border-white/10"
    >
      <a
        href={bannerContent.href}
        className="group flex items-center justify-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/5"
      >
        <span className={`${bannerContent.badgeStyle} rounded px-2 py-0.5 text-xs font-bold text-white`}>
          {bannerContent.badge}
        </span>
        <span className="text-sm font-medium text-white/90">{bannerContent.text}</span>
        <ArrowRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

// 교육 섹션 네비게이션 데이터
const EDU_NAV = [
  {
    label: "직급별 교육",
    items: [
      { title: "임원 AI 전략 워크숍", desc: "1~2일 집중", hash: "#by-level" },
      { title: "리더십 12주 프로그램", desc: "팀장·중간관리자", hash: "#by-level" },
      { title: "실무자 부트캠프", desc: "4주 집중 실습", hash: "#by-level" },
    ],
  },
  {
    label: "직무별 교육",
    items: [
      { title: "기획·전략", desc: "보고서·기획서 3배 빠르게", hash: "#by-role" },
      { title: "마케팅·콘텐츠", desc: "소재 양산 워크플로우", hash: "#by-role" },
      { title: "영업·CS", desc: "제안서·CS 자동화", hash: "#by-role" },
      { title: "운영·HR", desc: "n8n 반복 업무 자동화", hash: "#by-role" },
      { title: "개발·데이터", desc: "바이브 코딩·분석 2배", hash: "#by-role" },
      { title: "디자인·크리에이티브", desc: "이미지·영상 AI 양산", hash: "#by-role" },
    ],
  },
  {
    label: "단기 과정",
    items: [
      { title: "이미지 AI 4주", desc: "Midjourney·Ideogram", hash: "#short" },
      { title: "영상 AI 4주", desc: "Runway·Kling·HeyGen", hash: "#short" },
      { title: "ChatGPT × Claude 4주", desc: "전 직군 필수", hash: "#short" },
      { title: "n8n 자동화 4주", desc: "코딩 없는 자동화", hash: "#short" },
      { title: "바이브 코딩 4주", desc: "AI로 서비스 만들기", hash: "#short" },
      { title: "프롬프트 엔지니어링 4주", desc: "AI를 제대로 부리는 기술", hash: "#short" },
    ],
  },
];

// Hover Dropdown 컴포넌트
function NavDropdown({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { title: string; desc: string; hash: string }[];
  onNavigate: (hash: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button className="group flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/60 transition-colors hover:bg-black/5 hover:text-foreground">
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
            onMouseEnter={show}
            onMouseLeave={hide}
          >
            <div
              className="min-w-[240px] rounded-2xl border border-black/8 p-1.5 shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(20px)",
              }}
            >
              {items.map((item) => (
                <button
                  key={item.title}
                  onClick={() => { onNavigate(item.hash); setOpen(false); }}
                  className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left transition-colors hover:bg-[#8D36EB]/8 group"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#0B0B12] group-hover:text-[#8D36EB] transition-colors leading-tight">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{item.desc}</p>
                  </div>
                  <ArrowRight className="h-3 w-3 text-gray-300 group-hover:text-[#8D36EB] transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const isEducation = pathname === "/education";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 섹션으로 스크롤 (같은 페이지면 smooth scroll, 다른 페이지면 navigate)
  function scrollToSection(hash: string) {
    if (isEducation) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/education${hash}`;
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <AnnouncementBanner />

      <div className={`border-b transition-all duration-200 backdrop-blur-md ${isScrolled ? "border-black/10 bg-background/95 shadow-sm" : "border-black/5 bg-background/80"}`}>
        <div className="container mx-auto px-6 py-3.5">
          <div className="flex items-center justify-between gap-4">

            {/* 로고 → /education */}
            <Link href="/education">
              <motion.div
                className="flex cursor-pointer items-center flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={logoFull.src} alt="NextGen AI" className="h-6 w-auto md:h-8" />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-2 lg:flex">
              {EDU_NAV.map((group) => (
                <NavDropdown
                  key={group.label}
                  label={group.label}
                  items={group.items}
                  onNavigate={scrollToSection}
                />
              ))}
              <button
                onClick={() => scrollToSection("#cases")}
                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/60 hover:bg-black/5 hover:text-foreground transition-colors"
              >
                도입 사례
              </button>
              <button
                onClick={() => scrollToSection("#faq")}
                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/60 hover:bg-black/5 hover:text-foreground transition-colors"
              >
                FAQ
              </button>
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-black text-white"
                    style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
                    whileHover={{
                      background: "linear-gradient(135deg, #8D36EB, #165CFF)",
                      scale: 1.08,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="h-4 w-4" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="z-[100] min-w-[140px] overflow-hidden rounded-xl border-0 p-1 shadow-2xl"
                  style={{
                    background: "rgba(15, 15, 25, 0.9)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                      style={language === lang.code ? { background: "rgba(141,54,235,0.2)", color: "#c084fc" } : {}}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* AI-Q 진단 — pulse */}
              <motion.button
                onClick={() => scrollToSection("#aiq")}
                className="relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold"
                style={{ background: "rgba(141,54,235,0.1)", color: "#a855f7" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a855f7] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a855f7]" />
                </span>
                AI-Q 진단
              </motion.button>

              {/* 교육 문의 — primary */}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="rounded-xl bg-gradient-to-r from-[#8D36EB] to-[#165CFF] px-5 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                교육 문의
              </motion.button>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => scrollToSection("#contact")}
                className="rounded-lg bg-gradient-to-r from-[#8D36EB] to-[#165CFF] px-4 py-2 text-sm font-bold text-white"
              >
                교육 문의
              </button>
              <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="flex flex-col gap-1 pt-4 pb-3 border-t border-border/50 mt-3">
                  {EDU_NAV.map((group) => (
                    <div key={group.label}>
                      <button
                        onClick={() => setMobileExpandedGroup(mobileExpandedGroup === group.label ? null : group.label)}
                        className="flex w-full items-center justify-between px-2 py-2.5 text-sm font-semibold text-foreground/70"
                      >
                        {group.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpandedGroup === group.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpandedGroup === group.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-3"
                          >
                            {group.items.map((item) => (
                              <button
                                key={item.title}
                                onClick={() => { scrollToSection(item.hash); setIsOpen(false); }}
                                className="flex items-center gap-2.5 w-full px-2 py-2 text-sm text-foreground/60 hover:text-foreground"
                              >
                                {item.title}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {[{ label: "도입 사례", hash: "#cases" }, { label: "FAQ", hash: "#faq" }].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { scrollToSection(item.hash); setIsOpen(false); }}
                      className="px-2 py-2.5 text-sm font-semibold text-foreground/70 text-left hover:text-foreground"
                    >
                      {item.label}
                    </button>
                  ))}

                  <button
                    onClick={() => { scrollToSection("#aiq"); setIsOpen(false); }}
                    className="mt-2 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-[#a855f7] bg-[#8D36EB]/8"
                  >
                    <Zap className="h-4 w-4" /> AI-Q 무료 진단
                  </button>

                  {/* Language */}
                  <div className="flex gap-2 pt-3 border-t border-border/30 mt-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
                          language === lang.code ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
