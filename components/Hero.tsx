"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pseudoRandom } from "@/lib/motion";
import {
  CONCERT_DATE_LABEL,
  CONCERT_SUBTITLE_EN,
  CONCERT_SUBTITLE_KO,
  CONCERT_TITLE_LINE_1,
  CONCERT_TITLE_LINE_2,
  HERO_EYEBROW,
} from "@/data/concert";

/** Hero 등장 순서(초): 배경 → GOOD BYE → SUMMER → 난워니 미니콘서트 → 날짜 → 버튼. */
const TIMING = {
  background: { delay: 0, duration: 0.8 },
  eyebrow: { delay: 0.2, duration: 0.6 },
  line1: { delay: 0.4, duration: 0.6 },
  line2: { delay: 0.65, duration: 0.6 },
  subtitle: { delay: 0.95, duration: 0.55 },
  date: { delay: 1.2, duration: 0.55 },
  button: { delay: 1.45, duration: 0.5 },
};

const DUST_COUNT = 14;
const DUST_COLORS = ["bg-champagne/50", "bg-lavender", "bg-peach/70"];
const LIGHT_DUST = Array.from({ length: DUST_COUNT }, (_, i) => ({
  left: Number((pseudoRandom(i * 1.9 + 1) * 100).toFixed(2)),
  top: Number((10 + pseudoRandom(i * 2.7 + 4) * 75).toFixed(2)),
  size: Number((3 + pseudoRandom(i * 3.3 + 7) * 4).toFixed(2)),
  delay: Number((pseudoRandom(i * 4.1 + 2) * 5).toFixed(2)),
  duration: Number((6 + pseudoRandom(i * 5.7 + 3) * 5).toFixed(2)),
  color: DUST_COLORS[i % DUST_COLORS.length],
}));

interface HeroProps {
  /** false인 동안 제목/버튼 등 전경 텍스트는 initial 상태로 멈춰 있는다 - 오프닝 티켓 모션이
   * 끝나는 순간 true로 바뀌면서 그때부터 기존 등장 시퀀스가 시작된다. 배경/빛가루는
   * 오프닝 오버레이에 가려져 있으므로 이 값과 무관하게 항상 바로 페이드인한다. */
  start?: boolean;
}

export default function Hero({ start = true }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = (timing: { delay: number; duration: number }) =>
    prefersReducedMotion ? { delay: 0, duration: 0.3 } : timing;
  const reveal = (hidden: Record<string, number>, visible: Record<string, number>) =>
    start ? visible : hidden;

  return (
    <section
      id="top"
      className="relative isolate flex h-svh min-h-[640px] flex-col items-center justify-center overflow-hidden bg-ivory px-6 text-center"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_15%,rgba(255,222,192,0.9),transparent_55%),radial-gradient(ellipse_at_85%_20%,rgba(236,226,251,0.85),transparent_55%),radial-gradient(ellipse_at_50%_100%,rgba(255,242,194,0.7),transparent_60%),linear-gradient(180deg,#fffaf3_0%,#fdf1e4_50%,#f8ecd9_100%)]"
        initial={{ opacity: 0.5, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...t(TIMING.background), ease: "easeOut" }}
      />

      {/* 천천히 떠다니는 작은 빛가루 - 과한 Glow 대신 은은한 반짝임만.
          위치/크기는 정적인 일반 span에 두고, motion.span은 애니메이션 값만
          다뤄 SSR과 framer-motion의 스타일 표현 방식 차이로 인한 hydration
          mismatch를 피한다. prefersReducedMotion은 서버에서 알 수 없는 값이라
          - span 자체를 조건부로 렌더링하면(구조가 달라져) 마운트 직후 다시
          hydration mismatch가 나므로, 항상 렌더링하되 애니메이션 유무만
          분기한다. */}
      {LIGHT_DUST.map((dust, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute -z-10"
          style={{ left: `${dust.left}%`, top: `${dust.top}%`, width: `${dust.size}px`, height: `${dust.size}px` }}
        >
          <motion.span
            className={`block h-full w-full rounded-full ${dust.color}`}
            animate={
              prefersReducedMotion
                ? { opacity: 0.35 }
                : { y: [0, -14, 0], opacity: [0.2, 0.7, 0.2] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.3 }
                : { duration: dust.duration, delay: dust.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </span>
      ))}

      <div className="relative flex flex-col items-center gap-4">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={reveal({ opacity: 0, y: 8 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.eyebrow), ease: "easeOut" }}
          className="font-serif-kr text-xs leading-relaxed text-ink-soft sm:text-sm"
        >
          {HERO_EYEBROW.map((line, i) => (
            <span key={i}>
              {line}
              {i < HERO_EYEBROW.length - 1 && <br />}
            </span>
          ))}
        </motion.p>

        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={reveal({ opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
            transition={{ ...t(TIMING.line1), ease: "easeOut" }}
            className="font-display text-5xl tracking-[0.08em] text-ink sm:text-7xl md:text-8xl"
          >
            {CONCERT_TITLE_LINE_1}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={reveal({ opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
            transition={{ ...t(TIMING.line2), ease: "easeOut" }}
            className="font-display text-6xl italic tracking-[0.05em] text-gold-deep sm:text-8xl md:text-9xl"
          >
            {CONCERT_TITLE_LINE_2}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={reveal({ opacity: 0, y: 10 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.subtitle), ease: "easeOut" }}
          className="mt-2 flex flex-col items-center gap-1"
        >
          <p className="font-serif-kr text-lg text-ink sm:text-xl">{CONCERT_SUBTITLE_KO}</p>
          <p className="font-display text-[10px] tracking-[0.35em] text-ink-soft sm:text-xs">
            {CONCERT_SUBTITLE_EN}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={reveal({ opacity: 0, y: 8 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.date), ease: "easeOut" }}
          className="font-display mt-3 text-2xl tracking-[0.2em] text-ink sm:text-3xl"
        >
          {CONCERT_DATE_LABEL}
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 10 }}
          animate={reveal({ opacity: 0, y: 10 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.button), ease: "easeOut" }}
          className="mt-6 inline-flex min-h-11 items-center gap-2 border border-champagne bg-white/60 px-8 py-3 text-sm tracking-[0.2em] text-gold-deep shadow-sm transition-colors hover:bg-peach/40"
        >
          미니콘서트 알아보기 <span aria-hidden>↓</span>
        </motion.a>
      </div>
    </section>
  );
}
