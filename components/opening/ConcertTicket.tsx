"use client";

import { motion } from "framer-motion";
import {
  SIGNATURE_POSITION,
  TICKET_ASPECT_RATIO,
  TICKET_IMAGE_SRC,
  TICKET_MAIN_FRACTION,
} from "@/data/opening";
import SignatureReveal from "./SignatureReveal";

export type TicketPhase = "flying" | "signature" | "ready" | "tearing";

interface ConcertTicketProps {
  phase: TicketPhase;
  reduced: boolean;
  onSignatureDone: () => void;
  onActivate: () => void;
}

const STUB_FRACTION = 1 - TICKET_MAIN_FRACTION;

export default function ConcertTicket({
  phase,
  reduced,
  onSignatureDone,
  onActivate,
}: ConcertTicketProps) {
  const isReady = phase === "ready";
  const isTearing = phase === "tearing";
  const clickable = isReady;

  return (
    <motion.div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? "티켓으로 입장하기" : undefined}
      onClick={clickable ? onActivate : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onActivate();
              }
            }
          : undefined
      }
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, x: "36vw", y: "-24vh", rotate: 9, scale: 0.94 }
      }
      animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      transition={
        reduced
          ? { duration: 0.4, ease: "easeOut" }
          : {
              x: { duration: 0.95, ease: "easeOut" },
              y: { duration: 0.95, ease: "easeOut" },
              scale: { duration: 0.95, ease: "easeOut" },
              opacity: { duration: 0.5 },
              rotate: { type: "spring", stiffness: 130, damping: 11, delay: 0.45 },
            }
      }
      whileHover={clickable && !reduced ? { scale: 1.02, rotate: -0.6 } : undefined}
      className={clickable ? "cursor-pointer outline-none" : ""}
      style={{ width: "clamp(300px, 88vw, 560px)" }}
    >
      <div
        className={`relative w-full drop-shadow-[0_25px_50px_rgba(69,50,63,0.28)] transition-[filter] ${
          clickable ? "hover:drop-shadow-[0_30px_60px_rgba(69,50,63,0.35)]" : ""
        }`}
        style={{ aspectRatio: TICKET_ASPECT_RATIO }}
      >
        {/* 메인 티켓 조각 */}
        <motion.div
          aria-hidden
          className="absolute inset-y-0 left-0"
          style={{
            width: `${TICKET_MAIN_FRACTION * 100}%`,
            backgroundImage: `url(${TICKET_IMAGE_SRC})`,
            backgroundSize: `${100 / TICKET_MAIN_FRACTION}% 100%`,
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
          }}
          animate={
            isTearing
              ? reduced
                ? { opacity: 0 }
                : { x: "-6%", scale: 0.95, opacity: 0 }
              : { x: 0, scale: 1, opacity: 1 }
          }
          transition={
            isTearing
              ? reduced
                ? { duration: 0.4, ease: "easeInOut" }
                : { duration: 1.1, ease: "easeInOut", delay: 0.05 }
              : { duration: 0.01 }
          }
        >
          <div
            className="absolute"
            style={{ left: SIGNATURE_POSITION.left, bottom: SIGNATURE_POSITION.bottom, width: SIGNATURE_POSITION.width }}
          >
            <SignatureReveal play={phase !== "flying"} onComplete={onSignatureDone} reduced={reduced} />
          </div>
        </motion.div>

        {/* 오른쪽 절취권(Stub) 조각 */}
        <motion.div
          aria-hidden
          className="absolute inset-y-0 right-0"
          style={{
            width: `${STUB_FRACTION * 100}%`,
            backgroundImage: `url(${TICKET_IMAGE_SRC})`,
            backgroundSize: `${100 / STUB_FRACTION}% 100%`,
            backgroundPosition: "right top",
            backgroundRepeat: "no-repeat",
          }}
          animate={
            isTearing
              ? reduced
                ? { opacity: 0 }
                : { x: "10%", y: "65%", rotate: 16, opacity: 0 }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={
            isTearing
              ? reduced
                ? { duration: 0.4, ease: "easeInOut" }
                : { duration: 1.1, ease: "easeInOut" }
              : { duration: 0.01 }
          }
        />
      </div>
    </motion.div>
  );
}
