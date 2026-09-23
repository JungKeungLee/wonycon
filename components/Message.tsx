"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { MESSAGE_INTRO } from "@/data/concert";
import { cheerMessages } from "@/data/messages";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Message() {
  return (
    <section id="message" className="relative scroll-mt-20 bg-cream px-6 py-20 sm:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto flex max-w-5xl flex-col gap-8"
      >
        <motion.div variants={cardVariant} className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-serif-kr text-lg tracking-[0.05em] text-gold-deep">TO WONY 💌</h2>
          <p className="font-serif-kr whitespace-pre-line text-sm text-ink-soft">{MESSAGE_INTRO}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cheerMessages.map((message) => (
            <motion.div
              key={message.id}
              variants={cardVariant}
              className="flex flex-col gap-3 border border-white bg-white/80 p-6 shadow-[0_10px_26px_rgba(69,50,63,0.1)]"
              style={{ borderTop: "3px solid var(--color-peach)" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif-kr text-sm text-ink">{message.nickname}</span>
                <span className="text-[10px] text-ink-soft/70">{message.timeAgo}</span>
              </div>
              <p className="font-serif-kr flex-1 text-sm leading-relaxed text-ink-soft">
                {message.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <span className="text-xs text-gold-deep">♡ {message.likes}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
