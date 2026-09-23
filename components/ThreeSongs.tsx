"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { THREE_SONGS_TAGLINE } from "@/data/concert";
import { setList } from "@/data/setlist";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function ThreeSongs() {
  return (
    <section id="songs" className="relative scroll-mt-20 overflow-hidden bg-cream px-6 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-lavender blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-peach blur-3xl"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="relative mx-auto flex max-w-4xl flex-col gap-10"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.h2 variants={cardVariant} className="flex flex-col items-center gap-1">
            <span className="font-display text-sm tracking-[0.4em] text-gold-deep">THREE SONGS</span>
            <span className="font-display text-xs tracking-[0.3em] text-champagne">
              ONE SPECIAL NIGHT
            </span>
          </motion.h2>
          <motion.p
            variants={cardVariant}
            className="font-serif-kr text-sm italic leading-relaxed text-ink-soft"
          >
            {THREE_SONGS_TAGLINE.map((line, i) =>
              line === "" ? <br key={i} /> : (
                <span key={i}>
                  {line}
                  <br />
                </span>
              )
            )}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {setList.map((song) => (
            <motion.div
              key={song.number}
              variants={cardVariant}
              className={`group relative flex flex-col items-center gap-2 overflow-hidden border px-6 py-12 text-center shadow-[0_10px_30px_rgba(201,163,92,0.12)] ${
                song.revealed ? "border-champagne bg-white" : "border-champagne/40 bg-white/70"
              }`}
            >
              <span className="font-display text-[11px] tracking-[0.35em] text-champagne">SONG</span>
              <span className="font-display text-5xl text-ink sm:text-6xl">{song.number}</span>
              <span
                className={`font-serif-kr text-base tracking-[0.15em] sm:text-lg ${
                  song.revealed ? "text-gold-deep" : "text-ink-soft"
                }`}
              >
                {song.revealed ? song.title : "SECRET"}
              </span>
              <span aria-hidden className="mt-1 text-sm text-peach">
                ♡
              </span>

              {!song.revealed && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cream/95 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-display text-xs tracking-[0.3em] text-gold-deep">
                    Coming 09.30
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
