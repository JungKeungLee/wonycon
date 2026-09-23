/**
 * TO WONY 응원 메시지. 초기 버전은 UI만 구현하며(별도 DB 없음) 이 배열이
 * 유일한 데이터 소스다. 실제 등록/조회 기능이 필요해지면 이 배열을
 * API 응답으로 교체하면 된다.
 */
export interface CheerMessage {
  id: string;
  nickname: string;
  content: string;
  timeAgo: string;
  likes: number;
}

export const cheerMessages: CheerMessage[] = [
  {
    id: "1",
    nickname: "여름바람",
    content: "워니의 노래는 언제나\n내 계절을 특별하게 만들어줘요.\n이번에도 함께할게요 ♡",
    timeAgo: "3시간 전",
    likes: 127,
  },
  {
    id: "2",
    nickname: "달빛냥이",
    content: "좋은 음악으로 다시 만나게 해줘서 고마워요.\n9월 30일 기다리고 있을게요!",
    timeAgo: "5시간 전",
    likes: 89,
  },
  {
    id: "3",
    nickname: "워니만의별",
    content: "여름이 끝나도\n워니와 함께라면\n새로운 계절도 기대될 것 같아요 ♡",
    timeAgo: "9시간 전",
    likes: 156,
  },
];
