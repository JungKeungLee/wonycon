/**
 * GOOD BYE SUMMER · 난워니 미니콘서트(2026.09.30) 마이크로사이트 전역 데이터.
 * 날짜/타이틀/문구는 전부 이 파일에서만 관리한다.
 *
 * 공연이 끝난 뒤에는 이 사이트가 "공연을 기다리는 홍보 페이지"가 아니라
 * "그날의 기록을 다시 보는 페이지"로 쓰인다 - Countdown/Coming Soon류 문구
 * 대신 회고형 문구(CONCERT_ENDED_*)를 사용한다.
 */

export const CONCERT_TITLE_LINE_1 = "GOOD BYE";
export const CONCERT_TITLE_LINE_2 = "SUMMER";
export const CONCERT_SUBTITLE_EN = "nanwony mini concert";
export const CONCERT_SUBTITLE_KR = "난워니 미니콘서트";

/**
 * 공연 시작 시각(운영 기준: 2026-09-30 16:00 KST). Countdown/문구가 전부 이
 * 값을 기준으로 계산된다 - 운영용 값이므로 여기서 직접 바꾸지 않는다.
 *
 * Local에서 16:00까지 기다리지 않고 전환을 테스트하고 싶다면, .env.local에
 * `NEXT_PUBLIC_EVENT_START_OVERRIDE=2026-09-29T20:30:00+09:00`처럼 넣어두면
 * `next dev`에서만 그 시각을 기준으로 계산된다. `NODE_ENV === "production"`
 * (Vercel 배포 빌드 포함)일 때는 이 override를 절대 읽지 않고 항상 운영
 * 시각만 쓴다 - .env.local 자체도 .gitignore에 걸려 있어 배포에 올라가지
 * 않지만, 혹시 실수로 값이 들어가더라도 이 이중 방어로 운영 시각이 바뀌지
 * 않는다. CONCERT_DATE_LABEL/CONCERT_TIME_LABEL(화면 표시용 문자열)은 이
 * override와 무관하게 항상 실제 공연 날짜/시각을 그대로 보여준다.
 */
const PRODUCTION_CONCERT_START = "2026-09-30T16:00:00+09:00";

function resolveConcertStart(): Date {
  const override = process.env.NEXT_PUBLIC_EVENT_START_OVERRIDE;
  if (process.env.NODE_ENV !== "production" && override) {
    const overrideDate = new Date(override);
    if (!Number.isNaN(overrideDate.getTime())) {
      return overrideDate;
    }
    console.warn(
      `[concert] NEXT_PUBLIC_EVENT_START_OVERRIDE 값("${override}")을 날짜로 해석할 수 없어 무시합니다.`
    );
  }
  return new Date(PRODUCTION_CONCERT_START);
}

export const CONCERT_DATE = resolveConcertStart();
/** 2026-09-30 하루가 끝나는 경계(=10/1 00:00 KST). 이 시각 이후를 "공연 종료 이후"로 본다. */
export const CONCERT_END_DATE = new Date("2026-10-01T00:00:00+09:00");
export const CONCERT_DATE_LABEL = "2026.09.30";
export const CONCERT_TIME_LABEL = "16:00";

/** 공연이 끝난 뒤 HeroCountdown 자리에 고정으로 보여주는 회고형 문구. */
export const CONCERT_ENDED_HEADLINE_EN = "OUR LAST SUMMER NIGHT";
export const CONCERT_ENDED_TAGLINE = ["우리의 마지막 여름,", "그날의 노래를 다시 만나보세요."];

/** 티켓 절취 직후 첫 화면(Hero)에서만 쓰는 문구. */
export const HERO_SUBTITLE_EN = "THE LAST SUMMER FESTIVAL";
export const HERO_TAGLINE = ["뜨거웠던 여름의 마지막 밤,", "우리는 함께였습니다."];
