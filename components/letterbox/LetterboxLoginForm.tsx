"use client";

import { useState } from "react";

export default function LetterboxLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/wony-letterbox/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "비밀번호가 올바르지 않습니다.");
        setSubmitting(false);
        return;
      }
      // 쿠키가 심어졌으니 새로고침해서 Server Component가 인증된 화면을 그리게 한다.
      window.location.reload();
    } catch {
      setError("접속에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-cream px-6 text-ink">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col items-center gap-5 text-center"
      >
        <span aria-hidden className="text-2xl text-gold-deep">
          💌
        </span>
        <h1 className="font-display text-sm tracking-[0.3em] text-gold-deep">
          WONY LETTER BOX
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          autoFocus
          className="w-full border border-champagne/50 bg-white/70 px-4 py-3 text-center text-sm text-ink outline-none focus:border-gold-deep"
        />
        {error && <p className="text-xs text-gold-deep">{error}</p>}
        <button
          type="submit"
          disabled={submitting || password.length === 0}
          className="inline-flex min-h-11 w-full items-center justify-center border border-ink/20 bg-white/50 px-6 py-2.5 text-xs tracking-[0.25em] text-ink transition-colors hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "확인하는 중..." : "입장하기"}
        </button>
      </form>
    </main>
  );
}
