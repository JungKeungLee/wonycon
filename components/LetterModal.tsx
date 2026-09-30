"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";

const NICKNAME_MAX = 30;
const CONTENT_MAX = 2000;

interface LetterModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success";

export default function LetterModal({ open, onClose }: LetterModalProps) {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function handleClose() {
    onClose();
    // 닫힘 애니메이션이 끝난 뒤 보이지 않는 상태에서 폼을 초기화한다.
    setTimeout(() => {
      setNickname("");
      setContent("");
      setStatus("idle");
      setError(null);
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (content.trim().length === 0) {
      setError("편지 내용을 입력해주세요.");
      return;
    }

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, content }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "편지를 등록하지 못했습니다. 잠시 후 다시 시도해주세요.");
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setError("편지를 등록하지 못했습니다. 잠시 후 다시 시도해주세요.");
      setStatus("idle");
    }
  }

  return (
    <ModalShell open={open} onClose={handleClose}>
      {status === "success" ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span aria-hidden className="text-2xl text-gold-deep">
            💌
          </span>
          <p className="font-serif-kr text-lg text-ink-cool">편지가 도착했어요 ♡</p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-2 inline-flex min-h-11 items-center border border-ink-cool/25 bg-white/40 px-6 py-2 text-xs tracking-[0.2em] text-ink-cool transition-colors hover:bg-white/70"
          >
            닫기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="font-display text-sm tracking-[0.4em] text-ink-cool">TO. WONY</h2>
            <p className="font-serif-kr text-sm leading-relaxed text-ink-cool-soft">
              오늘의 미니콘,
              <br />
              워니에게 전하고 싶은 이야기를 남겨주세요.
            </p>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[0.2em] text-ink-cool-soft">닉네임</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={NICKNAME_MAX}
              placeholder="익명"
              className="border border-white/60 bg-white/50 px-3 py-2.5 text-sm text-ink-cool outline-none placeholder:text-ink-cool-soft/60 focus:border-aqua-deep"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[0.2em] text-ink-cool-soft">편지 내용</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={CONTENT_MAX}
              rows={6}
              required
              placeholder="워니에게 하고 싶은 이야기를 자유롭게 남겨주세요."
              className="resize-none border border-white/60 bg-white/50 px-3 py-2.5 text-sm text-ink-cool outline-none placeholder:text-ink-cool-soft/60 focus:border-aqua-deep"
            />
          </label>

          {error && <p className="text-xs text-gold-deep">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-1 inline-flex min-h-11 items-center justify-center border border-ink-cool/25 bg-white/40 px-6 py-2.5 text-xs tracking-[0.25em] text-ink-cool transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "보내는 중..." : "편지 보내기"}
          </button>
        </form>
      )}
    </ModalShell>
  );
}
