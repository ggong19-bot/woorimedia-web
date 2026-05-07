"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth_context";

const providers = [
  { id: "kakao", label: "카카오로 시작하기", bg: "#FEE500", fg: "#191919" },
  { id: "naver", label: "네이버로 시작하기", bg: "#03C75A", fg: "#FFFFFF" },
  { id: "google", label: "Google로 시작하기", bg: "#FFFFFF", fg: "#1F1F1F" },
  { id: "apple", label: "Apple로 시작하기", bg: "#000000", fg: "#FFFFFF" },
];

export default function PlayLoginPage() {
  const { signInWith, signInGuest, signInEmail } = useAuth();
  const [busy, setBusy] = useState<string | null>(null);
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState("");

  async function go(p: string) {
    if (busy) return;
    setBusy(p);
    try {
      if (p === "guest") await signInGuest();
      else await signInWith(p);
    } finally {
      setBusy(null);
    }
  }

  async function goEmail() {
    if (!email.trim() || busy) return;
    setBusy("email");
    try {
      await signInEmail(email.trim());
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="bg-navy-gradient flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="absolute right-8 top-8 h-2 w-2 rounded-full bg-gold-main" />

      <div className="w-full max-w-md text-center">
        <span className="bg-gold-gradient mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl font-extrabold text-navy-deep shadow-2xl shadow-gold-main/30">
          W
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white">
          우리미디어
        </h1>
        <p className="mt-2 text-sm text-white/70">
          한정판 무손실 음원 · 고화질 영상
        </p>

        <div className="mt-10 space-y-3">
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => go(p.id)}
              disabled={!!busy}
              className="flex h-12 w-full items-center justify-center rounded-xl text-sm font-extrabold transition hover:brightness-105 disabled:opacity-60"
              style={{ background: p.bg, color: p.fg }}
            >
              {busy === p.id ? "잠시만요…" : p.label}
            </button>
          ))}
        </div>

        <div className="my-6 flex items-center gap-3 text-xs font-bold tracking-widest text-white/50">
          <span className="h-px flex-1 bg-white/20" />
          또는
          <span className="h-px flex-1 bg-white/20" />
        </div>

        {emailMode ? (
          <div className="space-y-3">
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:border-gold-main"
            />
            <button
              onClick={goEmail}
              disabled={!email || busy === "email"}
              className="h-12 w-full rounded-xl bg-white/15 text-sm font-extrabold text-white transition hover:bg-white/25 disabled:opacity-60"
            >
              {busy === "email" ? "잠시만요…" : "이메일로 로그인"}
            </button>
            <button
              onClick={() => setEmailMode(false)}
              className="text-xs text-white/60 hover:text-white"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEmailMode(true)}
            className="text-sm font-bold text-white/70 hover:text-white"
          >
            ✉ 이메일로 로그인
          </button>
        )}

        <button
          onClick={() => go("guest")}
          className="mt-3 block w-full text-sm font-extrabold text-gold-light underline-offset-4 hover:underline"
        >
          둘러보기 (게스트로 시작)
        </button>

        <p className="mt-10 text-xs text-white/40">
          계속 진행 시 이용약관 및 개인정보처리방침에 동의합니다.
        </p>
      </div>
    </div>
  );
}
