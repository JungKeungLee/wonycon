"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useHasMounted } from "@/lib/useHasMounted";
import { POSTER_IMAGE_HEIGHT, POSTER_IMAGE_SRC, POSTER_IMAGE_WIDTH } from "@/data/poster";

interface PosterLightboxProps {
  open: boolean;
  onClose: () => void;
}

export default function PosterLightbox({ open, onClose }: PosterLightboxProps) {
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

  // document.body에 직접 Portal로 그린다 - Hero 섹션의 isolate(새 stacking context)
  // 안에 이 fixed 오버레이가 그대로 있으면, z-index를 아무리 높여도 그 stacking
  // context 밖에 있는 Header(z-40)보다 아래로 깔려버린다. Portal로 완전히 빠져나가야
  // 페이지의 어떤 조상 요소가 나중에 transform/filter/isolate를 갖게 되어도 항상
  // 최상단에 뜬다.
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
          // 뒤에 있는 실제 Hero를 backdrop-blur로 흐릿하게 비쳐 보이게 하고(완전한
          // 단색 슬랩이 아니라 "기존 화면 위에 어두운 유리를 얹은" 느낌), 그 위에
          // 포스터 원본(콘서트 포스터)의 보랏빛 노을·골드 톤을 아주 은은한 radial
          // gradient 두 개로만 얹는다 - 포스터 자체보다 절대 눈에 띄면 안 되므로
          // opacity를 낮게 유지한다.
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(ellipse_at_20%_15%,rgba(155,92,172,0.18),transparent_55%),radial-gradient(ellipse_at_82%_80%,rgba(201,163,92,0.15),transparent_50%),linear-gradient(rgba(10,15,25,0.78),rgba(10,15,25,0.78))] p-6 backdrop-blur-[13px]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="fixed right-7 top-6 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-ivory transition-colors hover:bg-white/25"
          >
            ✕
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* width/height를 실제 픽셀 크기로 주고 h-auto/w-auto + max-h/max-w로 감싸면,
                브라우저가 세로 비율을 유지한 채 높이/폭 중 더 빡빡한 쪽에 자동으로
                맞춰준다 - 별도 계산 없이 모바일에서도 안전하다. */}
            <Image
              src={POSTER_IMAGE_SRC}
              alt="GOOD BYE SUMMER 난워니 미니콘서트 공식 포스터"
              width={POSTER_IMAGE_WIDTH}
              height={POSTER_IMAGE_HEIGHT}
              className="h-auto max-h-[85svh] w-auto max-w-[92vw] rounded-xl border border-white/25 object-contain shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:max-h-[88vh] sm:max-w-[90vw]"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
