import { NextResponse } from "next/server";
import {
  checkLetterboxPassword,
  computeLetterboxSessionToken,
  LETTERBOX_COOKIE_MAX_AGE,
  LETTERBOX_COOKIE_NAME,
} from "@/lib/letterboxAuth";

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

  const { password } = body as { password?: unknown };
  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "비밀번호를 입력해주세요." }, { status: 400 });
  }

  if (!checkLetterboxPassword(password)) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const token = computeLetterboxSessionToken();
  if (!token) {
    // checkLetterboxPassword가 이미 이 경우 false를 줬어야 하므로 사실상 도달하지
    // 않지만, WONY_LETTERBOX_PASSWORD 자체가 없는 상태를 한 번 더 방어한다.
    return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(LETTERBOX_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: LETTERBOX_COOKIE_MAX_AGE,
  });
  return res;
}
