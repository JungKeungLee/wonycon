import { CONCERT_DATE_LABEL } from "@/data/concert";

/**
 * 오픈 전(PRE-OPEN) 단일 화면 티저라 스크롤로 이동할 다른 섹션이 없다 - 그래서
 * Nav 메뉴/햄버거 없이 워드마크와 날짜만 보여준다. 이후 섹션이 다시 생기면
 * 그때 메뉴를 추가하면 된다.
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
