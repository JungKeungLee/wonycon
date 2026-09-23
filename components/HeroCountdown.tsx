"use client";

import { useEffect, useState } from "react";
import { useHasMounted } from "@/lib/useHasMounted";
import { CONCERT_DATE, CONCERT_END_DATE } from "@/data/concert";

const CONCERT_START = CONCERT_DATE.getTime();
const CONCERT_END = CONCERT_END_DATE.getTime();
const DAY_MS = 24 * 60 * 60 * 1000;

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeRemaining(now: number): Remaining {
  const diff = Math.max(0, CONCERT_START - now);
  return {
    days: Math.floor(diff / DAY_MS),
    hours: Math.floor((diff % DAY_MS) / (60 * 60 * 1000)),
    minutes: Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000)),
    seconds: Math.floor((diff % (60 * 1000)) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Phase = "before" | "today" | "after";

/**
 * Hero 전용 초소형 Countdown. 전자시계 느낌을 피하기 위해 테두리/배경 카드 없이
 * 숫자 Typography만으로 표현한다. 공연 시작 시각이 아직 확정되지 않아
 * 2026-09-30 "하루" 단위로만 카운트한다(자정 기준) - lib/CONCERT_DATE 참고.
 */
export default function HeroCountdown() {
  const hasMounted = useHasMounted();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!hasMounted) return;
    const timer = setTimeout(() => setNow(Date.now()), 0);
    return () => clearTimeout(timer);
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [hasMounted]);

  const remaining = now !== null ? computeRemaining(now) : null;
  const phase: Phase | null =
    now === null ? null : now < CONCERT_START ? "before" : now < CONCERT_END ? "today" : "after";

  if (phase === "today") {
    return (
      <p className="font-serif-kr text-base text-ink-cool sm:text-lg">
        TODAY ♡ 오늘, 여름의 마지막 페이지가 시작됩니다.
      </p>
    );
  }

  if (phase === "after") {
    return (
      <p className="font-serif-kr text-base text-ink-cool sm:text-lg">
        함께해줘서 고마워요. GOOD BYE SUMMER ♡
      </p>
    );
  }

  const units = [
    { label: "DAYS", value: remaining?.days },
    { label: "HOURS", value: remaining?.hours },
    { label: "MIN", value: remaining?.minutes },
    { label: "SEC", value: remaining?.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-baseline gap-2 sm:gap-4">
        {units.map((unit, i) => (
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
        {units.map((unit) => (
          <span
            key={unit.label}
            className="w-9 text-center text-[10px] tracking-[0.25em] text-ink-cool-soft sm:w-12 sm:text-xs"
          >
            {unit.label}
          </span>
        ))}
      </div>
    </div>
  );
}
