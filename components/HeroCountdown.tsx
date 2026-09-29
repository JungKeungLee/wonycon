"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useConcertPhase } from "@/lib/useConcertPhase";
import {
  CONCERT_AFTER_TAGLINE,
  CONCERT_DATE_LABEL,
  CONCERT_DAY_TAGLINE,
  CONCERT_TIME_LABEL,
} from "@/data/concert";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const CROSSFADE = { duration: 0.7, ease: "easeOut" as const };

/**
 * Hero 전용 초소형 Countdown. 전자시계 느낌을 피하기 위해 테두리/배경 카드 없이
 * 숫자 Typography만으로 표현한다. CONCERT_DATE(2026-09-30 16:00 KST)에 도달하는
 * 순간 이 영역 자체가 "CONCERT DAY" 문구로, 그 다음날 자정 이후에는 "종료 이후"
 * 문구로 부드럽게 crossfade된다 - phase는 useConcertPhase 하나로 관리해서
 * THREE SONGS 섹션 노출 여부와 항상 같은 기준을 공유한다.
 */
export default function HeroCountdown() {
  const { phase, days, hours, minutes, seconds } = useConcertPhase();

  return (
    <AnimatePresence mode="wait">
      {phase === "today" ? (
        <motion.div
          key="today"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={CROSSFADE}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-display text-3xl tracking-[0.15em] text-ink-cool sm:text-4xl">
            CONCERT DAY
          </span>
          <span className="font-display text-base tracking-[0.3em] text-ink-cool-soft sm:text-lg">
            {CONCERT_DATE_LABEL} {CONCERT_TIME_LABEL}
          </span>
          <p className="font-serif-kr mt-2 text-base leading-relaxed text-ink-cool sm:text-lg">
            {CONCERT_DAY_TAGLINE.map((line, i) => (
              <span key={i}>
                {line}
                {i < CONCERT_DAY_TAGLINE.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>
      ) : phase === "after" ? (
        <motion.p
          key="after"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={CROSSFADE}
          className="font-serif-kr text-base text-ink-cool sm:text-lg"
        >
          {CONCERT_AFTER_TAGLINE}
        </motion.p>
      ) : (
        <motion.div
          key="before"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={CROSSFADE}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-baseline gap-2 sm:gap-4">
            {[
              { label: "DAYS", value: phase ? days : undefined },
              { label: "HOURS", value: phase ? hours : undefined },
              { label: "MIN", value: phase ? minutes : undefined },
              { label: "SEC", value: phase ? seconds : undefined },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-baseline gap-2 sm:gap-4">
                {i > 0 && (
                  <span aria-hidden className="font-display text-xl text-ink-cool/40 sm:text-3xl">
                    :
                  </span>
                )}
                <span className="font-display text-4xl tabular-nums text-ink-cool sm:text-6xl">
                  {unit.value !== undefined ? pad(unit.value) : "--"}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-6 sm:gap-10">
            {["DAYS", "HOURS", "MIN", "SEC"].map((label) => (
              <span
                key={label}
                className="w-9 text-center text-[10px] tracking-[0.25em] text-ink-cool-soft sm:w-12 sm:text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
