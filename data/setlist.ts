/**
 * 이번 미니콘서트는 정확히 3곡만 부른다 - 배열 길이를 임의로 늘리지 않는다.
 * revealed가 false인 동안 title은 항상 "SECRET SONG"으로 둔다. 실제 곡이
 * 공개되면 title을 실제 제목으로, revealed를 true로 함께 바꾸면 된다.
 */
export interface SetListSong {
  number: string;
  title: string;
  revealed: boolean;
}

export const setList: SetListSong[] = [
  { number: "01", title: "SECRET SONG", revealed: false },
  { number: "02", title: "SECRET SONG", revealed: false },
  { number: "03", title: "SECRET SONG", revealed: false },
];
