"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { CONCERT_DATE_LABEL, INTRO_EYEBROW, INTRO_INVITATION, INTRO_LINES } from "@/data/concert";

export default function ConcertIntro() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden bg-cream px-6 py-24 sm:py-32">
      {/* 잡지/포스터 느낌의 큰 워터마크 숫자 - 여백을 지배하되 본문을 가리지 않는다 */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[26vw] leading-none text-ink/[0.03] sm:text-[18vw]"
      >
        0930
      </span>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="relative mx-auto flex max-w-xl flex-col items-center gap-8 text-center"
      >
        <span className="font-display text-xs tracking-[0.5em] text-gold-deep">{INTRO_EYEBROW}</span>

        <p className="font-serif-kr text-lg leading-loose text-ink sm:text-xl">
          {INTRO_LINES.map((line, i) =>
            line === "" ? <br key={i} /> : (
              <span key={i}>
                {line}
                <br />
              </span>
            )
          )}
        </p>

        <span className="h-px w-10 bg-champagne" />

        <p className="font-display text-2xl tracking-[0.15em] text-champagne sm:text-3xl">
          {CONCERT_DATE_LABEL}
        </p>

        <p className="font-serif-kr text-base leading-relaxed text-ink-soft sm:text-lg">
          {INTRO_INVITATION.map((line, i) => (
            <span key={i}>
              {line}
              {i < INTRO_INVITATION.length - 1 && <br />}
            </span>
          ))}
        </p>
      </motion.div>
    </section>
  );
}
