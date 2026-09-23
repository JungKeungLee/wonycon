"use client";

import { useState } from "react";
import PosterLightbox from "./PosterLightbox";

/**
 * 메인 화면에는 포스터 이미지를 직접 보여주지 않는다 - 보고 싶은 사람만 이
 * 버튼으로 열어보는 추가 콘텐츠로 취급한다(핵심은 어디까지나 타이틀/날짜/Countdown).
 */
export default function PosterButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 border border-ink-cool/25 bg-white/40 px-6 py-2.5 text-xs tracking-[0.25em] text-ink-cool transition-colors hover:bg-white/70"
      >
        OFFICIAL POSTER <span aria-hidden>↗</span>
      </button>

      <PosterLightbox open={open} onClose={() => setOpen(false)} />
    </>
  );
}
