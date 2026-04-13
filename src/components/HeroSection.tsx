"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AXDiagnosisModal } from "@/components/AXDiagnosisModal";
import { DownloadModal } from "@/components/DownloadModal";
import { AgentOSDashboard } from "@/components/AgentOSDashboard";
import { useLanguage } from "@/contexts/LanguageContext";


export function HeroSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { amount: 0.3, once: false });
  const { t } = useLanguage();
  const [diagnosisOpen, setDiagnosisOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-start overflow-hidden px-0 pt-36 sm:pt-40 lg:justify-center lg:overflow-visible lg:pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden lg:overflow-visible">
        <motion.div
          className="absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-[#8D36EB]/10 blur-3xl"
          animate={{ opacity: [0.5, 0.3, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-20 h-80 w-80 rounded-full bg-[#165CFF]/10 blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-8 lg:pl-8 xl:pl-16">

          {/* ── Left ── */}
          <div className="flex min-h-[calc(100vh-12rem)] flex-col gap-7 lg:min-h-0">

            {/* Headline */}
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <h1 className="text-[2rem] font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.4rem] xl:text-[4rem]">
                <span className="text-foreground">{t("hero.title1")} </span>
                <span className="bg-gradient-to-r from-[#8D36EB] to-[#165CFF] bg-clip-text text-transparent">
                  AX
                </span>
                <br />
                <span className="text-foreground">{t("hero.title2")}</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="max-w-[480px] text-base leading-relaxed text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              {t("hero.subtitle1")}
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-[#8D36EB] to-[#165CFF] bg-clip-text font-semibold text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                AX(AI Transformation)
              </motion.span>
              <span className="whitespace-nowrap">{t("hero.subtitle2")}</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <motion.button
                type="button"
                onClick={() => setDiagnosisOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8D36EB] to-[#165CFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8D36EB]/20 transition-all hover:opacity-90 hover:scale-105 md:px-8 md:py-4 md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setDownloadOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border/25 bg-background px-6 py-3 text-sm font-semibold transition-all hover:scale-105 hover:border-[#8D36EB]/30 md:px-8 md:py-4 md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("hero.cta2")}
              </motion.button>
            </motion.div>

            {/* Mobile dashboard */}
            <motion.div
              className="w-full overflow-visible pb-24 pt-2 lg:hidden"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <AgentOSDashboard />
            </motion.div>
          </div>

          {/* ── Right ── */}
          <motion.div
            className="relative hidden items-center justify-center lg:flex"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="w-full max-w-[540px]">
              <AgentOSDashboard />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="text-sm font-medium text-muted-foreground/20">{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}>
          <ChevronDown className="h-6 w-6 text-muted-foreground/20" />
        </motion.div>
      </motion.div>

      <AXDiagnosisModal open={diagnosisOpen} onOpenChange={setDiagnosisOpen} />
      <DownloadModal open={downloadOpen} onOpenChange={setDownloadOpen} />
    </section>
  );
}
