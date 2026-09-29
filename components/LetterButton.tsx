"use client";

import { useState } from "react";
import LetterModal from "./LetterModal";

export default function LetterButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 border border-ink-cool/25 bg-white/40 px-6 py-2.5 text-xs tracking-[0.25em] text-ink-cool transition-colors hover:bg-white/70"
      >
        WONY에게 편지 쓰기 <span aria-hidden>💌</span>
      </button>

      <LetterModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
