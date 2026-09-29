export type SongStatus = "coming-soon" | "revealed";

/**
 * 콘서트에서 부를 3곡의 정보. 지금은 제목이 확정되지 않아 title은 비워두고
 * status만 "coming-soon"으로 둔다 - 실제 곡이 정해지면 title을 채우고 status를
 * "revealed"로 바꾸는 것만으로 카드가 자동으로 COMING SOON 대신 제목을 보여준다.
 *
 * coverImage/playUrl/videoUrl은 추후 확장을 대비한 자리만 잡아둔 것으로, 지금은
 * 값이 있어도 화면에 노출하지 않는다(SongCard가 status === "revealed"일 때만
 * 참고하도록 만들어져 있다).
 */
export interface Song {
  number: string;
  title: string;
  status: SongStatus;
  coverImage?: string;
  playUrl?: string;
  videoUrl?: string;
}

export const songs: Song[] = [
  { number: "01", title: "", status: "coming-soon" },
  { number: "02", title: "", status: "coming-soon" },
  { number: "03", title: "", status: "coming-soon" },
];
