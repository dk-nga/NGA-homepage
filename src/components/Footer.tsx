import logoFull from "@/assets/logo-full.svg";
import { Link } from "@/i18n/navigation";

export function Footer() {
  return (
    <footer className="snap-start overflow-hidden bg-foreground py-12 text-background/80">
      <div className="container mx-auto overflow-hidden px-4 md:px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logoFull.src} alt="NextGen AI" className="mb-4 h-8 brightness-0 invert" />
            <p className="mb-4 max-w-md whitespace-pre-line text-background/60">
              AI Experience를 혁신하는 NextGen AI입니다.
              {"\n"}기업의 AI 도입부터 활용까지 전 과정을 함께합니다.
            </p>
            <div className="space-y-1 text-sm text-background/50">
              <p>(주) 넥스트젠에이아이</p>
              <p>사업자번호 : 557-86-03716</p>
              <p>대표이사 : 강민서, 김도경</p>
              <p>주소 : 서울시 영등포구 양산로91 리드원센터 914호</p>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-background">서비스</h4>
            <ul className="space-y-2 text-background/60">
              <li>AI 컨설팅</li>
              <li>AI 교육</li>
              <li>AI 솔루션</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-background">회사</h4>
            <ul className="space-y-2 text-background/60">
              <li>회사소개</li>
              <li>블로그</li>
              <li>Contact : contact@nextgenai.kr</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="text-xs text-background/40">© Copyrights by NextGen AI. All Rights Reserved.</p>
          <div className="flex gap-2 text-xs text-background/40">
            <Link href="/privacy" className="transition-colors hover:text-background">
              개인정보 처리방침
            </Link>
            <span>|</span>
            <Link href="/terms" className="transition-colors hover:text-background">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
