"use client";

import { motion } from "framer-motion";

const PARTNER_STORAGE_URL = "https://rsigybhusvrnkllhurhv.supabase.co/storage/v1/object/public/education-partners";

const partners = [
  { name: "삼성금융네트웍스", logo: `${PARTNER_STORAGE_URL}/samsung_finance.png` },
  { name: "대법원", logo: `${PARTNER_STORAGE_URL}/court.svg` },
  { name: "EBS", logo: `${PARTNER_STORAGE_URL}/ebs-2.png` },
  { name: "SK경영경제연구소", logo: `${PARTNER_STORAGE_URL}/sk_research.jpg` },
  { name: "에듀윌", logo: `${PARTNER_STORAGE_URL}/eduwill.png` },
  { name: "서울대학교", logo: `${PARTNER_STORAGE_URL}/seoul_univ.png` },
  { name: "중소벤처기업진흥공단", logo: `${PARTNER_STORAGE_URL}/kosme.svg` },
  { name: "한국콘텐츠진흥원", logo: `${PARTNER_STORAGE_URL}/kca.png` },
  { name: "CJ", logo: `${PARTNER_STORAGE_URL}/cj.png` },
  { name: "수원지법", logo: `${PARTNER_STORAGE_URL}/suwon_court.png` },
  { name: "OP.GG", logo: `${PARTNER_STORAGE_URL}/op.gg.png` },
  { name: "서울옥션", logo: `${PARTNER_STORAGE_URL}/seoul_auction.png` },
];

export function EduPartnerLogosSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold text-[#8D36EB] uppercase tracking-widest mb-3">Our Partners</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            각 산업을 대표하는 기업들이{" "}
            <span className="bg-gradient-to-r from-[#8D36EB] to-[#165CFF] bg-clip-text text-transparent">
              선택했습니다
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            상세 도입 사례 및 성과 데이터는 미팅 시 별도로 공유드립니다
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md hover:shadow-gray-100 border border-transparent hover:border-gray-200 transition-all duration-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-10 max-w-[80px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<span class="text-xs font-semibold text-gray-500 text-center leading-tight">${partner.name}</span>`;
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center py-8 bg-gradient-to-r from-[#8D36EB]/5 to-[#165CFF]/5 rounded-2xl border border-[#8D36EB]/10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground mb-2">
            도입 기업 <span className="font-bold text-foreground">43개+</span> · 재계약률 <span className="font-bold text-[#8D36EB]">92%</span>
          </p>
          <p className="text-xs text-muted-foreground/70">
            귀사의 상황에 맞는 도입 사례는 미팅 시 PDF로 제공됩니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
