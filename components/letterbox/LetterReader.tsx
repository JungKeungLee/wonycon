"use client";

import { useState } from "react";
import ModalShell from "../ModalShell";

export interface LetterboxLetter {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
}

interface LetterReaderProps {
  letters: LetterboxLetter[];
  loadError: boolean;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/**
 * 편지를 한 장씩 넘겨보는 대신, 도착한 편지를 카드 Grid로 한 번에 모두
 * 보여주고 클릭한 편지만 Modal로 크게 펼쳐본다 - "여름의 마지막 날 받은
 * 편지들을 모아놓은 편지함" 느낌을 위해 관리자 게시판 스타일은 피한다.
 */
export default function LetterReader({ letters, loadError }: LetterReaderProps) {
  const [selected, setSelected] = useState<LetterboxLetter | null>(null);
  const total = letters.length;

  return (
    <main className="min-h-svh bg-cream px-6 py-16 text-ink">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-1 text-center">
          <span aria-hidden className="text-2xl text-gold-deep">
            💌
          </span>
          <h1 className="font-display text-lg tracking-[0.3em] text-gold-deep">WONY LETTER BOX</h1>
          <p className="font-serif-kr text-sm text-ink-soft">워니에게 도착한 편지들을 확인해보세요.</p>
          {!loadError && total > 0 && (
            <p className="mt-1 text-xs tracking-[0.15em] text-ink-soft/70">{total}통의 편지가 도착했어요.</p>
          )}
        </div>

        {loadError && (
          <p className="py-16 text-center text-sm text-ink-soft">편지를 불러오지 못했습니다.</p>
        )}

        {!loadError && total === 0 && (
          <p className="py-16 text-center text-sm text-ink-soft">아직 도착한 편지가 없어요.</p>
        )}

        {!loadError && total > 0 && (
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {letters.map((letter) => (
              <button
                key={letter.id}
                type="button"
                onClick={() => setSelected(letter)}
                className="flex flex-col gap-4 border border-champagne/30 bg-white/60 px-5 py-6 text-left shadow-[0_6px_20px_rgba(184,134,58,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(184,134,58,0.16)]"
              >
                <span className="font-display text-[11px] tracking-[0.3em] text-champagne">
                  TO. WONY
                </span>
                <p className="font-serif-kr line-clamp-4 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                  {letter.content}
                </p>
                <div className="flex flex-col gap-0.5 border-t border-champagne/20 pt-3 text-right">
                  <span className="font-serif-kr text-xs text-ink">FROM. {letter.nickname}</span>
                  <span className="text-[10px] text-ink-soft">{formatDate(letter.created_at)}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <ModalShell
        open={selected !== null}
        onClose={() => setSelected(null)}
        contentClassName="border-champagne/40 bg-cream"
      >
        {selected && (
          <div className="flex flex-col gap-6 py-2 text-center">
            <span className="font-display text-xs tracking-[0.35em] text-champagne">TO. WONY</span>
            <p className="font-serif-kr whitespace-pre-wrap text-left text-base leading-loose text-ink">
              {selected.content}
            </p>
            <div className="flex flex-col items-end gap-1 border-t border-champagne/20 pt-5">
              <span className="font-serif-kr text-sm text-ink">FROM. {selected.nickname}</span>
              <span className="text-xs text-ink-soft">{formatDate(selected.created_at)}</span>
            </div>
          </div>
        )}
      </ModalShell>
    </main>
  );
}
