import crypto from "node:crypto";

/**
 * /wony-letterbox 전용 비밀번호 게이트. 사용자가 따로 없는(방문자 계정 개념이
 * 없는) 단일 비밀번호 보호라, DB에 세션 테이블을 따로 만들지 않고 상태 없이
 * (stateless) 처리한다 - 쿠키에는 비밀번호 원문 대신 그 해시만 저장해서,
 * 쿠키 값만으로는 실제 비밀번호를 알 수 없다. 비밀번호(WONY_LETTERBOX_PASSWORD)를
 * 나중에 바꾸면 해시도 같이 바뀌므로 기존에 발급된 쿠키는 자동으로 무효화된다.
 *
 * 반드시 route.ts(Route Handler)나 Server Component에서만 import한다 -
 * process.env.WONY_LETTERBOX_PASSWORD는 NEXT_PUBLIC_ 접두사가 없어 원래도
 * 클라이언트 번들에 안 실리지만, node:crypto 자체도 브라우저에서 쓸 수 없다.
 */

export const LETTERBOX_COOKIE_NAME = "wony_letterbox_session";
/** 60일 - 새로고침/재방문마다 비밀번호를 다시 묻지 않도록 넉넉하게 유지한다. */
export const LETTERBOX_COOKIE_MAX_AGE = 60 * 60 * 24 * 60;

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/** 로그인 폼에서 입력한 비밀번호가 맞는지 확인한다. */
export function checkLetterboxPassword(input: string): boolean {
  const expected = process.env.WONY_LETTERBOX_PASSWORD;
  if (!expected) return false; // 비밀번호가 설정 안 됐으면 항상 거부(안전 기본값)
  return timingSafeStringEqual(input, expected);
}

/** 로그인 성공 시 쿠키에 저장할 토큰(비밀번호의 sha256 해시). */
export function computeLetterboxSessionToken(): string | null {
  const password = process.env.WONY_LETTERBOX_PASSWORD;
  if (!password) return null;
  return crypto.createHash("sha256").update(password).digest("hex");
}

/** 요청에 담긴 쿠키 값이 지금 설정된 비밀번호 기준으로 여전히 유효한지 확인한다. */
export function isLetterboxSessionValid(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const expected = computeLetterboxSessionToken();
  if (!expected) return false;
  return timingSafeStringEqual(cookieValue, expected);
}
