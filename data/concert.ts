/**
 * GOOD BYE SUMMER · 난워니 미니콘서트(2026.09.30) 마이크로사이트 전역 데이터.
 * 날짜/타이틀/문구는 전부 이 파일에서만 관리한다.
 *
 * 오픈 전(PRE-OPEN) 페이지라 확정된 정보가 날짜뿐이라, 현재 화면에서 실제로
 * 쓰는 값만 남겨둔다 - 공연 시작 시간/Set List/응원 메시지처럼 아직 확정되지
 * 않은 정보에 대한 문구는 만들지 않는다.
 */

export const CONCERT_TITLE_LINE_1 = "GOOD BYE";
export const CONCERT_TITLE_LINE_2 = "SUMMER";
export const CONCERT_SUBTITLE_EN = "nanwony mini concert";

/**
 * 현재 확정된 정보는 "날짜"뿐이라, 공연 시작 시각을 임의로 만들지 않고
 * 2026-09-30 하루의 시작(00:00 KST)을 카운트다운 기준으로 삼는다. 실제 시작
 * 시각이 확정되면 이 값만 그 시각으로 바꾸면 Countdown/문구가 전부 따라간다.
 */
export const CONCERT_DATE = new Date("2026-09-30T00:00:00+09:00");
/** 2026-09-30 하루가 끝나는 경계(=10/1 00:00 KST). 이 시각 이후를 "공연 종료 이후"로 본다. */
export const CONCERT_END_DATE = new Date("2026-10-01T00:00:00+09:00");
export const CONCERT_DATE_LABEL = "2026.09.30";

/** 티켓 절취 직후 첫 화면(Hero)에서만 쓰는 문구. */
export const HERO_SUBTITLE_EN = "THE LAST SUMMER FESTIVAL";
export const HERO_TAGLINE = ["여름의 마지막 페이지에서", "다시 만나요."];
