import Link from "next/link";

/** 메인 페이지에서 누구나 비밀번호 없이 편지함(/wony-letterbox)으로 바로 이동하는 링크 버튼. */
export default function LetterboxLinkButton() {
  return (
    <Link
      href="/wony-letterbox"
      className="inline-flex min-h-11 items-center gap-2 border border-ink-cool/25 bg-white/40 px-6 py-2.5 text-xs tracking-[0.25em] text-ink-cool transition-colors hover:bg-white/70"
    >
      <span aria-hidden>💌</span> 편지 보러가기
    </Link>
  );
}
