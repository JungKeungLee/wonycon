/**
 * 콘서트 티켓 오프닝 연출 전용 데이터/설정. 이미지 경로, 절취선 위치, 사인 배치,
 * 세션 게이팅 설정을 이 파일 하나에서만 관리한다.
 */

export const TICKET_IMAGE_SRC =
  "/images/goodbye-summer/goodbye_summer_ticket_transparent_no_signature.png";
export const TICKET_IMAGE_WIDTH = 1873;
export const TICKET_IMAGE_HEIGHT = 840;
export const TICKET_ASPECT_RATIO = TICKET_IMAGE_WIDTH / TICKET_IMAGE_HEIGHT;

export const SIGNATURE_SVG_SRC =
  "/images/goodbye-summer/nanwony_signature_path_transparent.svg";
export const SIGNATURE_ASPECT_RATIO = 731 / 412;

/**
 * 절취선 기준 "메인 티켓" 폭이 전체 티켓 대비 차지하는 비율(나머지는 오른쪽
 * 절취권/Stub). 실제 이미지의 점선 위치를 눈대중으로 측정한 값이라, 이미지가
 * 바뀌면 이 값 하나만 다시 맞추면 된다.
 */
export const TICKET_MAIN_FRACTION = 0.775;

/** 사인 위치/크기 - "메인 티켓" 박스 기준 상대 좌표(%). 이미지가 바뀌어도 이 값만 조정하면 된다. */
export const SIGNATURE_POSITION = {
  left: "67%",
  bottom: "9%",
  width: "29%",
};

/** true면 세션과 무관하게 접속할 때마다 티켓 오프닝이 다시 재생된다(개발/테스트용). */
export const ALWAYS_SHOW_TICKET = false;
export const TICKET_SESSION_KEY = "goodbyeSummerTicketEntered";
