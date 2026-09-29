"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useConcertPhase } from "@/lib/useConcertPhase";
import { songs } from "@/data/songs";
import SongCard from "./SongCard";

/**
 * CONCERT_DATE(콘서트 당일)에 도달한 이후에만 페이지에 나타나는 섹션 - 그 전에는
 * 아예 렌더링하지 않는다(공연 세부 진행 순서 등 미확정 정보를 미리 보여주지
 * 않기 위해). phase는 Hero의 Countdown과 동일한 useConcertPhase를 공유한다.
 */
export default function ThreeSongsTeaser() {
  const { phase } = useConcertPhase();
  const isVisible = phase === "today" || phase === "after";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-cyan-pale px-6 py-20 sm:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto flex max-w-4xl flex-col items-center gap-10"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h2 className="font-display text-sm tracking-[0.4em] text-ink-cool">THREE SONGS</h2>
              <p className="font-display text-xs tracking-[0.3em] text-ink-cool-soft">
                ONE SPECIAL NIGHT
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              {songs.map((song) => (
                <SongCard key={song.number} song={song} />
              ))}
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
