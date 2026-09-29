"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useHasMounted } from "@/lib/useHasMounted";

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * PosterLightbox와 같은 배경(어두운 blur + 아주 은은한 보라/골드 노을 glow)을
 * 쓰는 범용 Modal 껍데기. 편지/SUMMER TALK 두 곳에서 재사용한다 - PosterLightbox
 * 자체는 잘 동작하고 있어 건드리지 않고, 같은 시각 언어만 여기 새로 옮겨왔다.
 *
 * document.body에 Portal로 그리는 이유는 PosterLightbox와 동일하다: Hero
 * 섹션의 isolate(새 stacking context) 안에 fixed 오버레이가 갇히면 z-index를
 * 아무리 높여도 Header보다 아래로 깔린다.
 */
export default function ModalShell({ open, onClose, children }: ModalShellProps) {
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!hasMounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(ellipse_at_20%_15%,rgba(155,92,172,0.18),transparent_55%),radial-gradient(ellipse_at_82%_80%,rgba(201,163,92,0.15),transparent_50%),linear-gradient(rgba(10,15,25,0.78),rgba(10,15,25,0.78))] p-4 backdrop-blur-[13px] sm:p-6"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="fixed right-5 top-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-ivory transition-colors hover:bg-white/25 sm:right-7 sm:top-6"
          >
            ✕
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[85svh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-white/40 bg-cyan-pale shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:max-h-[88vh] sm:max-w-lg"
          >
            <div className="overflow-y-auto p-6 sm:p-8">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
