"use client";

import { useEffect, useState } from "react";
import { useHasMounted } from "./useHasMounted";
import { CONCERT_DATE, CONCERT_END_DATE } from "@/data/concert";

const CONCERT_START = CONCERT_DATE.getTime();
const CONCERT_END = CONCERT_END_DATE.getTime();
const DAY_MS = 24 * 60 * 60 * 1000;

export type ConcertPhase = "before" | "today" | "after";

export interface ConcertPhaseState {
  /** 마운트 전(서버/최초 렌더)에는 null - 이 값으로 Countdown 등을 게이트한다. */
  phase: ConcertPhase | null;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * CONCERT_DATE(2026-09-30 16:00 KST)를 기준으로 한 실시간 phase/D-day 계산을
 * 한 곳에서 관리한다. Hero의 Countdown 영역과 THREE SONGS 섹션 노출 여부가
 * 모두 이 훅 하나를 공유해서, "지금이 콘서트 당일인지"를 서로 다르게 판단하는
 * 일이 없게 한다.
 *
 * CONCERT_DATE는 ISO 문자열에 +09:00(KST)을 명시해서 만든 값이라, 여기서
 * `Date.now()`(절대 시각, timezone 개념이 없는 epoch ms)와 비교하는 것만으로
 * 이미 방문자의 시스템 시간대와 무관하게 항상 "한국 시간 기준 2026-09-30
 * 16:00"과 정확히 비교된다 - 별도의 시간대 변환이 필요 없다. 다만 방문자의
 * PC 시계 자체가 틀려 있는 경우까지는 클라이언트 코드로 보정할 수 없다.
 */
export function useConcertPhase(): ConcertPhaseState {
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

  if (now === null) {
    return { phase: null, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const phase: ConcertPhase = now < CONCERT_START ? "before" : now < CONCERT_END ? "today" : "after";
  const diff = Math.max(0, CONCERT_START - now);

  return {
    phase,
    days: Math.floor(diff / DAY_MS),
    hours: Math.floor((diff % DAY_MS) / (60 * 60 * 1000)),
    minutes: Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000)),
    seconds: Math.floor((diff % (60 * 1000)) / 1000),
  };
}
