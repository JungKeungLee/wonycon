"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useHasMounted } from "@/lib/useHasMounted";
import { CONCERT_DATE, CONCERT_DATE_LABEL, CONCERT_END_DATE } from "@/data/concert";

const CONCERT_START = CONCERT_DATE.getTime();
const CONCERT_END = CONCERT_END_DATE.getTime();
const DAY_MS = 24 * 60 * 60 * 1000;

interface Remaining {
  dDay: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeRemaining(now: number): Remaining {
  const diff = Math.max(0, CONCERT_START - now);
  const days = Math.floor(diff / DAY_MS);
  const hours = Math.floor((diff % DAY_MS) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);
  return { dDay: days, days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Phase = "before" | "today" | "after";

export default function Countdown() {
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

  const isReady = now !== null;
  const remaining = isReady ? computeRemaining(now) : null;
  const phase: Phase | null = !isReady
    ? null
    : now < CONCERT_START
      ? "before"
      : now < CONCERT_END
        ? "today"
        : "after";

  return (
    <section className="relative overflow-hidden bg-peach px-6 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,242,194,0.6),transparent_60%)]"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <span className="font-display text-xs tracking-[0.4em] text-gold-deep">COUNTDOWN</span>

        <div className="flex w-full flex-col items-center gap-6 border border-white/80 bg-white/70 px-6 py-10 shadow-[0_10px_30px_rgba(201,163,92,0.15)] backdrop-blur-md sm:px-12">
          {phase === "after" ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col items-center gap-3 py-4"
            >
              <p className="font-display text-2xl tracking-[0.15em] text-gold-deep sm:text-3xl">
                THANK YOU FOR
                <br />
                OUR SUMMER ♡
              </p>
              <p className="font-display text-sm tracking-[0.2em] text-champagne">
                {CONCERT_DATE_LABEL}
              </p>
              <p className="font-serif-kr text-base text-ink">GOOD BYE SUMMER</p>
              <p className="font-serif-kr text-sm text-ink-soft">함께해줘서 고마워요.</p>
            </motion.div>
          ) : phase === "today" ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col items-center gap-3 py-4"
            >
              <p className="font-serif-kr text-lg text-ink">TODAY ♡</p>
              <p className="font-display text-3xl tracking-[0.15em] text-gold-deep sm:text-4xl">
                GOOD BYE SUMMER
              </p>
              <p className="font-serif-kr text-sm leading-relaxed text-ink-soft">
                오늘,
                <br />
                우리의 여름 마지막 페이지가 시작됩니다.
              </p>
            </motion.div>
          ) : (
            <>
              <p className="font-display text-6xl tracking-[0.05em] text-gold-deep sm:text-7xl">
                {remaining ? `D-${remaining.dDay}` : "D-–"}
              </p>
              <div className="grid w-full grid-cols-4 gap-2 sm:gap-4">
                {[
                  { label: "DAYS", value: remaining?.days },
                  { label: "HOURS", value: remaining?.hours },
                  { label: "MINUTES", value: remaining?.minutes },
                  { label: "SECONDS", value: remaining?.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="flex flex-col items-center gap-1">
                    <span className="font-display text-2xl text-ink sm:text-3xl">
                      {unit.value !== undefined ? pad(unit.value) : "--"}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] text-ink-soft">{unit.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {phase === "before" && (
          <p className="font-serif-kr text-sm text-ink-soft">
            {CONCERT_DATE_LABEL} GOOD BYE SUMMER가 시작됩니다.
          </p>
        )}
      </div>
    </section>
  );
}
