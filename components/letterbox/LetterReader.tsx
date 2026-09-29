"use client";

import { useState } from "react";

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

/** 편지를 한 장씩 넘겨보는 리더 - 목록형 관리자 화면이 아니라 실제로 편지를 열어보는 느낌. */
export default function LetterReader({ letters, loadError }: LetterReaderProps) {
  const [index, setIndex] = useState(0);
  const total = letters.length;
  const current = letters[index];

  return (
    <main className="flex min-h-svh flex-col items-center bg-cream px-6 py-16 text-ink">
      <div className="flex w-full max-w-lg flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <span aria-hidden className="text-2xl text-gold-deep">
            💌
          </span>
          <h1 className="font-display text-lg tracking-[0.3em] text-gold-deep">
            WONY LETTER BOX
          </h1>
          <p className="font-serif-kr text-sm text-ink-soft">
            {loadError ? "편지를 불러오지 못했습니다." : `${total}개의 편지가 도착했어요.`}
          </p>
        </div>

        {!loadError && total === 0 && (
          <p className="py-16 text-center text-sm text-ink-soft">아직 도착한 편지가 없어요.</p>
        )}

        {!loadError && total > 0 && current && (
          <>
            <div className="flex w-full flex-col gap-6 border border-champagne/40 bg-white/70 px-6 py-10 shadow-[0_10px_30px_rgba(184,134,58,0.12)] sm:px-12 sm:py-12">
              <span className="font-display text-xs tracking-[0.3em] text-champagne">
                TO. WONY
              </span>
              <p className="font-serif-kr whitespace-pre-wrap text-base leading-loose text-ink">
                {current.content}
              </p>
              <div className="flex flex-col gap-1 border-t border-champagne/20 pt-5 text-right">
                <span className="font-serif-kr text-sm text-ink">FROM. {current.nickname}</span>
                <span className="text-xs text-ink-soft">{formatDate(current.created_at)}</span>
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-4">
              <span className="text-xs tracking-[0.2em] text-ink-soft">
                {index + 1} / {total}
              </span>
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                  className="inline-flex min-h-11 items-center border border-ink/15 bg-white/40 px-4 py-2 text-xs tracking-[0.1em] text-ink transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:tracking-[0.15em]"
                >
                  ← 이전 편지
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
                  disabled={index === total - 1}
                  className="inline-flex min-h-11 items-center border border-ink/15 bg-white/40 px-4 py-2 text-xs tracking-[0.1em] text-ink transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:tracking-[0.15em]"
                >
                  다음 편지 →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
