"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useHasMounted } from "@/lib/useHasMounted";
import { ALWAYS_SHOW_TICKET, TICKET_SESSION_KEY } from "@/data/opening";
import ConcertTicket, { type TicketPhase } from "./ConcertTicket";

const FLY_DURATION_MS = 1000;
const REDUCED_FADE_MS = 400;
const TEAR_DURATION_MS = 1100;

interface TicketOpeningProps {
  /** 오프닝이 끝났거나(입장 완료) 애초에 건너뛰기로 결정됐을 때 한 번 호출된다 - Hero 시작 신호. */
  onDone: () => void;
}

/**
 * 콘서트 티켓 오프닝 레이어. 기존 홈페이지(Hero 이하)는 이 컴포넌트와 무관하게
 * 처음부터 그대로 마운트되어 있고, 이 레이어는 그 위에 덮이는 별도 오버레이다 -
 * 티켓이 절취되며 사라지는 동안 배경 wash가 함께 옅어지면서 뒤에 이미 존재하던
 * 홈페이지가 틈 사이로 드러나는 것처럼 보인다.
 */
export default function TicketOpening({ onDone }: TicketOpeningProps) {
  const hasMounted = useHasMounted();
  const prefersReducedMotion = useReducedMotion();
  const [play, setPlay] = useState(false);
  const [phase, setPhase] = useState<TicketPhase>("flying");
  const doneRef = useRef(false);

  function complete() {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }

  // 마운트 직후 한 박자 늦춰서(setTimeout(0)) sessionStorage를 읽는다 - 렌더 중
  // 직접 읽지 않아 서버/최초 클라이언트 렌더 결과가 항상 일치한다.
  useEffect(() => {
    if (!hasMounted) return;
    const timer = setTimeout(() => {
      let alreadySeen = false;
      try {
        alreadySeen = window.sessionStorage.getItem(TICKET_SESSION_KEY) === "1";
      } catch {
        alreadySeen = false;
      }

      if (!ALWAYS_SHOW_TICKET && alreadySeen) {
        complete();
        return;
      }

      setPlay(true);
      try {
        window.sessionStorage.setItem(TICKET_SESSION_KEY, "1");
      } catch {
        // 시크릿 모드 등에서 저장이 안 되더라도 이번 진입에서는 정상 재생된다.
      }
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMounted]);

  // "flying" 단계는 고정 시간 후 자동으로 "signature" 단계로 넘어간다(reduced-motion이면
  // 비행 연출 없이 짧은 fade만).
  useEffect(() => {
    if (!play || phase !== "flying") return;
    const timer = setTimeout(
      () => setPhase("signature"),
      prefersReducedMotion ? REDUCED_FADE_MS : FLY_DURATION_MS
    );
    return () => clearTimeout(timer);
  }, [play, phase, prefersReducedMotion]);

  function handleSignatureDone() {
    setPhase((prev) => (prev === "signature" ? "ready" : prev));
  }

  function handleActivate() {
    setPhase((prev) => (prev === "ready" ? "tearing" : prev));
  }

  useEffect(() => {
    if (phase !== "tearing") return;
    const timer = setTimeout(
      complete,
      prefersReducedMotion ? 400 : TEAR_DURATION_MS
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <AnimatePresence>
      {play && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 overflow-hidden px-6"
        >
          {/* 밝은 Ivory/Cream 배경 wash - 절취가 시작되면 함께 옅어지며 뒤에 있던 홈페이지를 드러낸다 */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-cream"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "tearing" ? 0 : 1 }}
            transition={{
              duration: (prefersReducedMotion ? 400 : TEAR_DURATION_MS) / 1000,
              ease: "easeInOut",
            }}
          />

          <ConcertTicket
            phase={phase}
            reduced={!!prefersReducedMotion}
            onSignatureDone={handleSignatureDone}
            onActivate={handleActivate}
          />

          <motion.div
            className="relative flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={phase === "ready" ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="font-serif-kr text-base text-ink sm:text-lg">
              워니의 미니콘서트에 입장하시겠습니까?
            </p>
            <button
              type="button"
              disabled={phase !== "ready"}
              onClick={handleActivate}
              className="font-display text-sm tracking-[0.2em] text-gold-deep underline-offset-4 hover:underline"
            >
              입장하기 ♡
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
