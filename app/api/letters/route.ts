import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const NICKNAME_MAX = 30;
const CONTENT_MAX = 2000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { nickname, content } = body as { nickname?: unknown; content?: unknown };

  if (typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "편지 내용을 입력해주세요." }, { status: 400 });
  }
  if (content.length > CONTENT_MAX) {
    return NextResponse.json(
      { error: `편지 내용은 ${CONTENT_MAX}자 이내로 작성해주세요.` },
      { status: 400 }
    );
  }

  const trimmedNickname = typeof nickname === "string" ? nickname.trim() : "";
  if (trimmedNickname.length > NICKNAME_MAX) {
    return NextResponse.json(
      { error: `닉네임은 ${NICKNAME_MAX}자 이내로 입력해주세요.` },
      { status: 400 }
    );
  }
  // wony_letters.nickname은 DB에 DEFAULT '익명'이 있지만, 빈 문자열('')을 그대로
  // INSERT하면 DEFAULT가 적용되지 않으므로 여기서 명시적으로 대체한다.
  const finalNickname = trimmedNickname.length > 0 ? trimmedNickname : "익명";

  try {
    const sql = getSql();
    await sql`
      INSERT INTO wony_letters (nickname, content)
      VALUES (${finalNickname}, ${content.trim()})
    `;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/letters]", err);
    return NextResponse.json(
      { error: "편지를 등록하지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
