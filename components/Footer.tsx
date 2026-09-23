import { CONCERT_DATE_LABEL, CONCERT_SUBTITLE_EN, CONCERT_TITLE_LINE_1, CONCERT_TITLE_LINE_2 } from "@/data/concert";

export default function Footer() {
  return (
    <footer className="border-t border-champagne/30 bg-cream px-6 py-10 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center gap-2">
        <p className="font-display text-lg tracking-[0.15em] text-ink">
          {CONCERT_TITLE_LINE_1} {CONCERT_TITLE_LINE_2}
        </p>
        <p className="font-display text-[11px] tracking-[0.3em] text-ink-soft">
          {CONCERT_SUBTITLE_EN.toUpperCase()}
        </p>
        <p className="font-display text-xs tracking-[0.2em] text-champagne">{CONCERT_DATE_LABEL}</p>
        <p className="font-serif-kr mt-2 text-sm text-gold-deep">♡ WONY</p>
        <p className="mt-2 text-[10px] tracking-[0.1em] text-ink-soft/70">
          © 2026 GOOD BYE SUMMER
        </p>
      </div>
    </footer>
  );
}
