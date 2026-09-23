"use client";

import { motion } from "framer-motion";
import { pseudoRandom } from "@/lib/motion";
import { CONCERT_DATE_LABEL, CONCERT_TITLE_LINE_1, CONCERT_TITLE_LINE_2, ENDING_LINES } from "@/data/concert";

const STAR_COUNT = 10;
const DUSK_STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  left: Number((pseudoRandom(i * 2.3 + 1) * 100).toFixed(2)),
  top: Number((pseudoRandom(i * 3.1 + 2) * 45).toFixed(2)),
  delay: Number((pseudoRandom(i * 4.5 + 3) * 4).toFixed(2)),
  duration: Number((3 + pseudoRandom(i * 5.7 + 4) * 3).toFixed(2)),
}));

export default function Ending() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-peach px-6 py-24 text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(255,242,194,0.8),transparent_55%),radial-gradient(ellipse_at_20%_70%,rgba(236,226,251,0.7),transparent_55%),radial-gradient(ellipse_at_85%_75%,rgba(255,222,192,0.6),transparent_55%),linear-gradient(180deg,#fff2c2_0%,#ffdec0_45%,#ece2fb_100%)]"
      />

      {DUSK_STARS.map((star, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute h-1.5 w-1.5"
          style={{ left: `${star.left}%`, top: `${star.top}%` }}
        >
          <motion.span
            className="block h-full w-full rounded-full bg-champagne"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-6"
      >
        <p className="font-serif-kr text-lg leading-relaxed text-ink sm:text-xl">
          {ENDING_LINES.map((line, i) =>
            line === "" ? <br key={i} /> : (
              <span key={i}>
                {line}
                <br />
              </span>
            )
          )}
        </p>
        <span className="h-px w-10 bg-champagne" />
        <p className="font-display text-xl tracking-[0.2em] text-gold-deep sm:text-2xl">
          {CONCERT_DATE_LABEL}
        </p>
        <p className="font-display text-2xl tracking-[0.1em] text-ink sm:text-3xl">
          {CONCERT_TITLE_LINE_1} <span className="italic text-gold-deep">{CONCERT_TITLE_LINE_2}</span>
        </p>
        <p className="font-serif-kr mt-2 text-sm tracking-[0.15em] text-ink-soft">♡ WONY</p>
      </motion.div>
    </section>
  );
}
