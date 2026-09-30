import { CONCERT_DATE_LABEL } from "@/data/concert";

/**
 * 별도 Nav 메뉴/햄버거 없이 워드마크와 날짜만 보여주는 얇은 헤더. 섹션이
 * 여러 개(SETLIST, Ending 등)로 늘어났지만 페이지 자체가 위에서 아래로
 * 쭉 훑어보는 기록 페이지라 앵커 내비게이션 없이도 자연스럽다.
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-champagne/20 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-sm tracking-[0.1em] text-ink sm:text-base">
          GOOD BYE SUMMER
        </a>

        <span className="font-display text-xs tracking-[0.15em] text-champagne sm:text-sm">
          {CONCERT_DATE_LABEL}
        </span>
      </div>
    </header>
  );
}
