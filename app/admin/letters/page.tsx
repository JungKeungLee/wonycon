import type { Metadata } from "next";
import { getSql } from "@/lib/db";

export const metadata: Metadata = {
  title: "WONY LETTER BOX",
  // 검색엔진/일반 방문자에게 발견되지 않도록 - 방문자 공개 목록 기능은 아직 없다.
  robots: { index: false, follow: false },
};

/** 이 페이지는 요청마다 최신 편지를 그대로 보여줘야 하므로 캐시하지 않는다. */
export const dynamic = "force-dynamic";

interface LetterRow {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
    2,
    "0"
  )}`;
}

export default async function AdminLettersPage() {
  let letters: LetterRow[] = [];
  let loadError = false;

  try {
    const sql = getSql();
    letters = (await sql`
      SELECT id, nickname, content, created_at
      FROM wony_letters
      WHERE is_visible = true
      ORDER BY created_at DESC
    `) as LetterRow[];
  } catch (err) {
    console.error("[GET /admin/letters]", err);
    loadError = true;
  }

  return (
    <main className="min-h-svh bg-cream px-6 py-16 text-ink">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span aria-hidden className="text-2xl text-gold-deep">
            💌
          </span>
          <h1 className="font-display text-lg tracking-[0.3em] text-gold-deep">
            WONY LETTER BOX
          </h1>
          <p className="font-serif-kr text-sm text-ink-soft">워니에게 도착한 편지들 💌</p>
        </div>

        {loadError ? (
          <p className="text-center text-sm text-ink-soft">편지를 불러오지 못했습니다.</p>
        ) : letters.length === 0 ? (
          <p className="text-center text-sm text-ink-soft">아직 도착한 편지가 없어요.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {letters.map((letter) => (
              <article
                key={letter.id}
                className="border border-champagne/40 bg-white/70 px-6 py-8 shadow-[0_10px_30px_rgba(184,134,58,0.12)] sm:px-10 sm:py-10"
              >
                <p className="font-serif-kr whitespace-pre-wrap text-base leading-loose text-ink">
                  {letter.content}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-champagne/20 pt-4 text-xs text-ink-soft">
                  <span>From. {letter.nickname}</span>
                  <span>{formatDate(letter.created_at)}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
