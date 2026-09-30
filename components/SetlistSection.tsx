"use client";

import { motion } from "framer-motion";
import { BONUS_CLIP, SETLIST_TRACKS, getBonusClipUrl } from "@/data/setlist";
import SetlistCard from "./SetlistCard";

/**
 * 예전 THREE SONGS(공연 전 티저)를 대체하는 실제 공연 기록 섹션. 더 이상
 * 공연 당일 여부에 따라 나타났다 사라지는 게 아니라(useConcertPhase 미사용),
 * 항상 노출되는 SETLIST + BONUS MOMENT로 구성된다.
 */
export default function SetlistSection() {
  return (
    <section className="relative bg-cyan-pale px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-10"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="font-display text-sm tracking-[0.4em] text-ink-cool">GOOD BYE SUMMER</h2>
          <p className="font-display text-xs tracking-[0.3em] text-ink-cool-soft">SETLIST</p>
          <p className="font-serif-kr mt-3 max-w-sm text-sm leading-relaxed text-ink-cool-soft">
            우리의 마지막 여름을 채워준
            <br />
            워니의 노래들을 다시 만나보세요.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {SETLIST_TRACKS.map((track) => (
            <SetlistCard key={track.number} track={track} />
          ))}
        </div>

        <div className="mt-4 flex w-full max-w-sm flex-col items-center gap-3 border-t border-white/50 pt-10 text-center">
          <span className="font-display text-xs tracking-[0.3em] text-ink-cool-soft">
            BONUS MOMENT
          </span>
          <span className="font-serif-kr text-lg text-ink-cool">{BONUS_CLIP.title}</span>
          <p className="text-sm text-ink-cool-soft">{BONUS_CLIP.description}</p>
          <a
            href={getBonusClipUrl(BONUS_CLIP.soopClipId)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-2 border border-ink-cool/25 bg-white/40 px-6 py-2.5 text-xs tracking-[0.25em] text-ink-cool transition-colors hover:bg-white/70"
          >
            WATCH BONUS CLIP ↗
          </a>
        </div>
      </motion.div>
    </section>
  );
}
