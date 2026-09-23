import type { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

/**
 * 정수 연산만 쓰는 해시 기반 의사난수(mulberry32 변형). Math.sin 기반 방식은
 * 인자가 커질수록 서버(Node)와 클라이언트(브라우저)의 부동소수점 argument
 * reduction 결과가 마지막 몇 자리에서 어긋날 수 있어 SSR hydration mismatch로
 * 이어질 수 있다 - Math.imul/비트 연산은 IEEE754 규격상 항상 정확히 같은
 * 결과를 내므로 장식용 랜덤 배치(빛가루 등)에 안전하게 쓸 수 있다.
 */
export function pseudoRandom(seed: number) {
  let t = (Math.floor(seed * 1000) ^ 0x6d2b79f5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
