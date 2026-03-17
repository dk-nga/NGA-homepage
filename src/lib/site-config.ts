export type NavItem = {
  href: string;
  label: string;
};

export type SiteConfig = {
  brand: string;
  domainLabel: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  accentClassName: string;
  panelClassName: string;
  navItems: NavItem[];
  footerText: string;
};

export const siteConfig: SiteConfig = {
  brand: "NextGenAI",
  domainLabel: "nextgenai",
  tagline: "Enterprise AI operations, built for measurable execution.",
  heroTitle: "기업 AX를 실제 운영 구조로 전환하는 NextGenAI",
  heroDescription:
    "기존 Vite 기반 홈페이지를 Next.js App Router 기준으로 재구성하는 1차 골격입니다. 공개 라우트와 관리자 진입점을 모두 살리고, 이후 섹션 단위 마이그레이션이 가능한 구조로 정리했습니다.",
  accentClassName:
    "from-cyan-400 via-sky-500 to-blue-700 text-white shadow-[0_24px_80px_rgba(6,182,212,0.28)]",
  panelClassName:
    "border-sky-200/70 bg-white/75 supports-[backdrop-filter]:bg-white/60",
  navItems: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/cases", label: "Cases" },
    { href: "/education", label: "Education" },
    { href: "/ax-partners", label: "AX Partners" },
  ],
  footerText:
    "NextGenAI migration baseline. Public routes, admin routes, and locale-aware page composition are prepared for the next implementation phases.",
};
