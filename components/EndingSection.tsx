"use client";

import { motion } from "framer-motion";
import { CONCERT_DATE_LABEL, CONCERT_TITLE_LINE_1, CONCERT_TITLE_LINE_2 } from "@/data/concert";

/** SETLIST/BONUS 다음, Footer 앞에 오는 마지막 회고 문구 - 쿨톤(cyan-pale)에서
 * 따뜻한 cream으로 서서히 번지며 Footer로 자연스럽게 이어지도록 한다. */
export default function EndingSection() {
  return (
    <section className="bg-gradient-to-b from-cyan-pale to-cream px-6 py-24 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex max-w-md flex-col items-center gap-8 text-center"
      >
        <p className="font-serif-kr text-base leading-loose text-ink-cool sm:text-lg">
          뜨거웠던 우리의 여름 끝에서
        </p>

        <p className="font-serif-kr text-base leading-loose text-ink-cool sm:text-lg">
          함께 웃고,
          <br />
          함께 듣고,
          <br />
          함께 기억한 밤.
        </p>

        <p className="font-serif-kr text-base leading-loose text-ink-cool sm:text-lg">
          우리의 마지막 여름은
          <br />
          이렇게 하나의 추억이 되었습니다.
        </p>

        <div className="mt-4 flex flex-col items-center gap-2">
          <span className="font-display text-xs tracking-[0.3em] text-ink-cool-soft">
            {CONCERT_DATE_LABEL}
          </span>
          <span className="font-display text-lg tracking-[0.15em] text-ink-cool">
            {CONCERT_TITLE_LINE_1} {CONCERT_TITLE_LINE_2}
          </span>
          <span className="font-serif-kr text-sm text-gold-deep">♡ WONY</span>
        </div>
      </motion.div>
    </section>
  );
}
