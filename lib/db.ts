import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Neon Postgres 클라이언트 - 반드시 app/api/**\/route.ts(Route Handler)에서만
 * import한다. Route Handler는 Next.js App Router 구조상 항상 서버에서만
 * 실행되고 클라이언트 번들에 포함되지 않으므로, 이 모듈을 "use client"
 * 컴포넌트나 그쪽에서 import하는 다른 모듈에서 가져오지만 않으면
 * DATABASE_URL이 브라우저에 노출될 일이 없다.
 *
 * DATABASE_URL이 없을 때는 모듈을 import하는 시점(=매 라우트 등록 시점)이
 * 아니라 실제로 쿼리를 실행하려는 시점에만 에러를 던진다 - 이렇게 해야
 * DATABASE_URL이 아직 설정되지 않은 상태에서도 빌드/다른 라우트가 죽지 않는다.
 */
let cached: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (cached) return cached;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL 환경변수가 설정되어 있지 않습니다.");
  }

  cached = neon(connectionString);
  return cached;
}
