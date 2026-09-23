"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pseudoRandom } from "@/lib/motion";
import {
  CONCERT_DATE_LABEL,
  CONCERT_TITLE_LINE_1,
  CONCERT_TITLE_LINE_2,
  HERO_SUBTITLE_EN,
  HERO_TAGLINE,
} from "@/data/concert";
import HeroCountdown from "./HeroCountdown";
import PosterButton from "./PosterButton";

/** Hero 등장 순서(초): 배경 → GOOD BYE → SUMMER → 서브타이틀 → 감성 문구 → 날짜 → Countdown → 포스터 버튼. */
const TIMING = {
  background: { delay: 0, duration: 0.8 },
  line1: { delay: 0.3, duration: 0.6 },
  line2: { delay: 0.55, duration: 0.6 },
  subtitle: { delay: 0.85, duration: 0.55 },
  tagline: { delay: 1.05, duration: 0.55 },
  date: { delay: 1.3, duration: 0.55 },
  countdown: { delay: 1.55, duration: 0.55 },
  poster: { delay: 1.8, duration: 0.5 },
};

const DUST_COUNT = 10;
const DUST_COLORS = ["bg-white/70", "bg-aqua/70", "bg-sky/80"];
const LIGHT_DUST = Array.from({ length: DUST_COUNT }, (_, i) => ({
  left: Number((pseudoRandom(i * 1.9 + 1) * 100).toFixed(2)),
  top: Number((8 + pseudoRandom(i * 2.7 + 4) * 70).toFixed(2)),
  size: Number((3 + pseudoRandom(i * 3.3 + 7) * 3.5).toFixed(2)),
  delay: Number((pseudoRandom(i * 4.1 + 2) * 5).toFixed(2)),
  duration: Number((6 + pseudoRandom(i * 5.7 + 3) * 5).toFixed(2)),
  color: DUST_COLORS[i % DUST_COLORS.length],
}));

/** 아주 천천히 흘러가는 얇은 구름 두 조각. */
const CLOUDS = [
  { top: "16%", left: "-15%", width: 280, height: 64, duration: 75, delay: 0 },
  { top: "30%", left: "50%", width: 200, height: 50, duration: 92, delay: 10 },
];

interface HeroProps {
  /** false인 동안 제목/날짜/Countdown 등 전경 텍스트는 initial 상태로 멈춰 있는다 - 오프닝 티켓
   * 모션이 끝나는 순간 true로 바뀌면서 그때부터 기존 등장 시퀀스가 시작된다. 배경/구름/빛 입자는
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
      className="relative isolate flex h-svh min-h-[640px] flex-col items-center justify-center overflow-hidden bg-sky px-6 text-center"
    >
      {/* 맑은 여름 하늘 - 햇살 글로우(우측 상단) + 물빛 반사(좌측 하단) + Sky→Cyan→Lemon 그라데이션 */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_12%,rgba(255,255,255,0.9),transparent_45%),radial-gradient(ellipse_at_12%_88%,rgba(246,248,201,0.65),transparent_55%),linear-gradient(180deg,#bfe6f7_0%,#ddf5f2_48%,#f6f8c9_100%)]"
        initial={{ opacity: 0.5, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...t(TIMING.background), ease: "easeOut" }}
      />

      {/* 매우 천천히 흘러가는 얇은 구름 */}
      {CLOUDS.map((cloud, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute -z-10 rounded-full bg-white/70 blur-2xl"
          style={{ top: cloud.top, left: cloud.left, width: cloud.width, height: cloud.height }}
          animate={prefersReducedMotion ? { x: "0%" } : { x: ["0%", "160%"] }}
          transition={
            prefersReducedMotion
              ? { duration: 0.3 }
              : { duration: cloud.duration, delay: cloud.delay, repeat: Infinity, ease: "linear" }
          }
        />
      ))}

      {/* 바람에 떠다니는 작은 빛 입자 - 위치/크기는 정적인 일반 span에, motion.span은 애니메이션
          값만 다뤄 SSR과 framer-motion의 스타일 표현 차이로 인한 hydration mismatch를 피한다. */}
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
                ? { opacity: 0.4 }
                : { y: [0, -14, 0], x: [0, 6, 0], opacity: [0.25, 0.8, 0.25] }
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
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={reveal({ opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
            transition={{ ...t(TIMING.line1), ease: "easeOut" }}
            className="font-display text-5xl tracking-[0.08em] text-ink-cool sm:text-7xl md:text-8xl"
          >
            {CONCERT_TITLE_LINE_1}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={reveal({ opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
            transition={{ ...t(TIMING.line2), ease: "easeOut" }}
            className="font-display text-6xl italic tracking-[0.05em] sm:text-8xl md:text-9xl"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--color-aqua-deep) 35%, #ffffff 50%, var(--color-aqua-deep) 65%)",
              backgroundSize: "220% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              // prefersReducedMotion으로 이 값을 분기하면 서버(항상 false 취급)와 클라이언트가
              // 구조적으로 다른 style을 렌더링해 hydration mismatch가 난다 - 대신 항상 켜두고
              // globals.css의 전역 prefers-reduced-motion 규칙(animation-duration 0.01ms 강제)이
              // 알아서 사실상 무효화하도록 맡긴다.
              animation: "shimmer-sweep 6s ease-in-out infinite",
            }}
          >
            {CONCERT_TITLE_LINE_2}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={reveal({ opacity: 0, y: 10 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.subtitle), ease: "easeOut" }}
          className="font-display mt-1 text-xs tracking-[0.35em] text-ink-cool-soft sm:text-sm"
        >
          {HERO_SUBTITLE_EN}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={reveal({ opacity: 0, y: 8 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.tagline), ease: "easeOut" }}
          className="font-serif-kr mt-2 text-base leading-relaxed text-ink-cool sm:text-lg"
        >
          {HERO_TAGLINE.map((line, i) => (
            <span key={i}>
              {line}
              {i < HERO_TAGLINE.length - 1 && <br />}
            </span>
          ))}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={reveal({ opacity: 0, y: 8 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.date), ease: "easeOut" }}
          className="font-display mt-3 text-2xl tracking-[0.2em] text-ink-cool sm:text-3xl"
        >
          {CONCERT_DATE_LABEL}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={reveal({ opacity: 0, y: 10 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.countdown), ease: "easeOut" }}
          className="mt-6"
        >
          <HeroCountdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={reveal({ opacity: 0, y: 10 }, { opacity: 1, y: 0 })}
          transition={{ ...t(TIMING.poster), ease: "easeOut" }}
          className="mt-8"
        >
          <PosterButton />
        </motion.div>
      </div>
    </section>
  );
}
