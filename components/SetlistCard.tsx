import { getSetlistClipUrl, type SetlistTrack } from "@/data/setlist";

interface SetlistCardProps {
  track: SetlistTrack;
}

/**
 * SETLIST 카드 1개. 전체가 링크라서 클릭/탭하면 실제 SOOP 클립이 새 탭으로
 * 열린다. "PLAY CLIP ↗"는 PC에서는 썸네일 위 hover 오버레이로, 모바일에서는
 * hover가 없으므로 텍스트 아래 항상 보이는 작은 라벨로 보여준다.
 *
 * 실제로 전달받은 썸네일 이미지 자체에 트랙 번호와 LIVE 배지가 이미
 * 디자인되어 있어서, 여기서 별도로 번호/LIVE 배지를 겹쳐 그리지 않는다
 * (겹쳐 그리면 같은 정보가 두 번 보인다).
 */
export default function SetlistCard({ track }: SetlistCardProps) {
  return (
    <a
      href={getSetlistClipUrl(track.soopClipId)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden border border-white/50 bg-white/30 shadow-[0_10px_30px_rgba(35,64,73,0.1)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-cyan-pale">
        <img
          src={track.thumbnail}
          alt={`${track.title} 클립 썸네일${track.isLive ? " (라이브)" : ""}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 hidden items-center justify-center bg-ink-cool/0 opacity-0 transition-all duration-300 group-hover:bg-ink-cool/35 group-hover:opacity-100 sm:flex">
          <span className="font-display text-xs tracking-[0.25em] text-white">PLAY CLIP ↗</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 px-5 py-4 text-center">
        <span className="font-serif-kr text-base text-ink-cool">{track.title}</span>
        <span className="text-xs tracking-[0.05em] text-ink-cool-soft">{track.artist}</span>
        <span className="font-display mt-1.5 text-[10px] tracking-[0.2em] text-aqua-deep sm:hidden">
          PLAY CLIP ↗
        </span>
      </div>
    </a>
  );
}
