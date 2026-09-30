/**
 * GOOD BYE SUMMER 실제 공연 SETLIST. 콘서트가 끝난 뒤 실제로 부른 4곡과
 * 보너스 클립 1개를 다시 볼 수 있도록 SOOP(숲) 클립 링크와 연결한다.
 *
 * SOOP 클립 URL 형식은 실제 sooplive.co.kr 공개 링크 사례로 확인한 값이다:
 * - 일반 클립: https://vod.sooplive.co.kr/player/{클립ID}
 * - 캐치(Catch): https://vod.sooplive.co.kr/player/{클립ID}/catch
 */

export interface SetlistTrack {
  number: string;
  title: string;
  artist: string;
  soopClipId: string;
  /** public/setlist/ 아래에 실제 SOOP 클립 썸네일 이미지를 넣어야 보인다. */
  thumbnail: string;
  isLive?: boolean;
}

export function getSetlistClipUrl(clipId: string): string {
  return `https://vod.sooplive.co.kr/player/${clipId}`;
}

export function getBonusClipUrl(clipId: string): string {
  return `https://vod.sooplive.co.kr/player/${clipId}/catch`;
}

export const SETLIST_TRACKS: SetlistTrack[] = [
  {
    number: "01",
    title: "냉면",
    artist: "명카드라이브",
    soopClipId: "208491759",
    thumbnail: "/setlist/01.jpg",
  },
  {
    number: "02",
    title: "여름이었다",
    artist: "H1-KEY",
    soopClipId: "208492467",
    thumbnail: "/setlist/02.jpg",
  },
  {
    number: "03",
    title: "여름아 부탁해",
    artist: "인디고",
    soopClipId: "208493421",
    thumbnail: "/setlist/03.jpg",
  },
  {
    number: "04",
    title: "소문의 낙원",
    artist: "악동뮤지션",
    soopClipId: "208494087",
    thumbnail: "/setlist/04.jpg",
    isLive: true,
  },
];

export const BONUS_CLIP = {
  title: "고세구 챌린지",
  description: "그날의 또 다른 순간을 만나보세요.",
  soopClipId: "208493155",
};
