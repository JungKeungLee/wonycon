"use client";

import { motion } from "framer-motion";
import { SIGNATURE_ASPECT_RATIO, SIGNATURE_SVG_SRC } from "@/data/opening";

interface SignatureRevealProps {
  /** true가 되는 순간부터 왼쪽 → 오른쪽으로 사인이 그려진다. */
  play: boolean;
  /** 사인이 다 그려지면 한 번 호출된다. */
  onComplete?: () => void;
  reduced?: boolean;
}

const SPARKLES = [
  { left: "88%", top: "10%", delay: 0 },
  { left: "78%", top: "70%", delay: 0.12 },
];

/**
 * 제공된 서명 실루엣(단일 fill path)을 stroke-dasharray로 "긋기" 애니메이션하면
 * 획 순서가 부자연스러워질 수 있어, mask-image + clip-path reveal 방식을 쓴다 -
 * SVG를 배경색을 칠할 도형의 mask로 사용하고, 그 도형을 왼쪽에서 오른쪽으로
 * clip-path로 드러낸다.
 */
export default function SignatureReveal({ play, onComplete, reduced }: SignatureRevealProps) {
  return (
    <div className="relative w-full" style={{ aspectRatio: SIGNATURE_ASPECT_RATIO }}>
      <motion.div
        aria-hidden
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={play ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={reduced ? { duration: 0.4, ease: "easeOut" } : { duration: 1.2, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
        className="absolute inset-0"
        style={{
          WebkitMaskImage: `url(${SIGNATURE_SVG_SRC})`,
          maskImage: `url(${SIGNATURE_SVG_SRC})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          backgroundColor: "var(--color-ink)",
        }}
      />

      {/* 사인이 끝나는 순간 아주 짧게 반짝이는 작은 sparkle 1~2개 - 지속되는 Glow는 아니다. */}
      {!reduced &&
        SPARKLES.map((sparkle, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute"
            style={{ left: sparkle.left, top: sparkle.top }}
          >
            <motion.span
              className="block text-[10px] text-champagne sm:text-xs"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={play ? { opacity: [0, 1, 0], scale: [0.4, 1, 0.6] } : undefined}
              transition={{ duration: 0.45, delay: 1.05 + sparkle.delay, ease: "easeOut" }}
            >
              ✦
            </motion.span>
          </span>
        ))}
    </div>
  );
}
