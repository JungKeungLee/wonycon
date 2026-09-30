import type { Metadata } from "next";
import { getSql } from "@/lib/db";
import LetterReader, { type LetterboxLetter } from "@/components/letterbox/LetterReader";

export const metadata: Metadata = {
  title: "WONY LETTER BOX",
};

/** 새로 도착한 편지가 바로 보이도록 캐시하지 않는다. */
export const dynamic = "force-dynamic";

/**
 * 누구나 비밀번호 없이 바로 볼 수 있는 편지함이다 - 조회 전용 페이지라
 * 인증이 없어도 안전하다(편지 삭제/수정/관리 기능은 애초에 이 프로젝트에
 * 없다). WONY_LETTERBOX_PASSWORD는 더 이상 이 페이지에서 쓰지 않는다.
 */
export default async function WonyLetterboxPage() {
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
