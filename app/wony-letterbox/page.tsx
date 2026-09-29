import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getSql } from "@/lib/db";
import { isLetterboxSessionValid, LETTERBOX_COOKIE_NAME } from "@/lib/letterboxAuth";
import LetterboxLoginForm from "@/components/letterbox/LetterboxLoginForm";
import LetterReader, { type LetterboxLetter } from "@/components/letterbox/LetterReader";

export const metadata: Metadata = {
  title: "WONY LETTER BOX",
  // 검색엔진/일반 방문자에게 발견되지 않도록 - 메인 사이트 어디에도 이 URL을 노출하지 않는다.
  robots: { index: false, follow: false },
};

/** 매 요청마다 인증 쿠키/최신 편지를 다시 확인해야 하므로 캐시하지 않는다. */
export const dynamic = "force-dynamic";

export default async function WonyLetterboxPage() {
  const cookieStore = await cookies();
  const authenticated = isLetterboxSessionValid(cookieStore.get(LETTERBOX_COOKIE_NAME)?.value);

  if (!authenticated) {
    return <LetterboxLoginForm />;
  }

  let letters: LetterboxLetter[] = [];
  let loadError = false;

  try {
    const sql = getSql();
    letters = (await sql`
      SELECT id, nickname, content, created_at
      FROM wony_letters
      WHERE is_visible = true
      ORDER BY created_at ASC
    `) as LetterboxLetter[];
  } catch (err) {
    console.error("[GET /wony-letterbox]", err);
    loadError = true;
  }

  return <LetterReader letters={letters} loadError={loadError} />;
}
