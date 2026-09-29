import type { Song } from "@/data/songs";

interface SongCardProps {
  song: Song;
}

/**
 * 곡 1개를 나타내는 카드. 지금은 status === "coming-soon"만 실제로 쓰이지만,
 * 나중에 제목이 공개되면(song.title + status: "revealed") 별도 구조 변경 없이
 * 바로 제목이 보이고, 그 다음 단계로 coverImage/playUrl/videoUrl을 여기 하나씩
 * 추가해서 커버 이미지·재생 버튼·영상 링크를 확장하면 된다 - 지금은 그 정보가
 * 없으므로 아무것도 임의로 노출하지 않는다.
 */
export default function SongCard({ song }: SongCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 border border-white/50 bg-white/30 px-6 py-10 text-center shadow-[0_10px_30px_rgba(35,64,73,0.1)] backdrop-blur-sm">
      <span aria-hidden className="text-sm text-aqua-deep">
        ♫
      </span>
      <span className="font-display text-[11px] tracking-[0.3em] text-ink-cool-soft">
        SONG {song.number}
      </span>
      <span className="font-serif-kr text-lg tracking-[0.05em] text-ink-cool">
        {song.status === "revealed" && song.title ? song.title : "COMING SOON"}
      </span>
    </div>
  );
}
