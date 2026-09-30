import { CONCERT_ENDED_HEADLINE_EN, CONCERT_ENDED_TAGLINE } from "@/data/concert";

/**
 * 공연이 이미 끝난 뒤라 더 이상 실시간 Countdown을 계산하지 않는다 - 언제
 * 방문하든 항상 이 회고형 문구만 고정으로 보여준다. 날짜/시각 기반 phase
 * 전환 로직(lib/useConcertPhase.ts)은 그대로 남겨두되 이 컴포넌트에서는
 * 더 이상 사용하지 않는다.
 */
export default function HeroCountdown() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="font-display text-2xl tracking-[0.15em] text-ink-cool sm:text-3xl">
        {CONCERT_ENDED_HEADLINE_EN}
      </span>
      <p className="font-serif-kr mt-1 text-base leading-relaxed text-ink-cool sm:text-lg">
        {CONCERT_ENDED_TAGLINE.map((line, i) => (
          <span key={i}>
            {line}
            {i < CONCERT_ENDED_TAGLINE.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
}
