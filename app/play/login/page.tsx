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
  const { signInWith, signInEmail, signUpEmail } = useAuth();
  const [busy, setBusy] = useState<string | null>(null);
  const [emailMode, setEmailMode] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function go(p: string) {
    if (busy) return;
    setBusy(p);
    try {
      await signInWith(p);
    } finally {
      setBusy(null);
    }
  }

  async function goEmail() {
    if (busy) return;
    setErrMsg(null);
    const e = email.trim();
    if (!e || !password) {
      setErrMsg("이메일과 비밀번호를 입력해주세요");
      return;
    }
    if (signUp) {
      if (password.length < 8) {
        setErrMsg("비밀번호는 8자 이상이어야 합니다");
        return;
      }
      if (password !== pwConfirm) {
        setErrMsg("비밀번호 확인이 일치하지 않습니다");
        return;
      }
    }
    setBusy("email");
    try {
      if (signUp) {
        await signUpEmail(e, password, displayName.trim() || undefined);
      } else {
        await signInEmail(e, password);
      }
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "로그인 실패");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-16"
      style={{ background: "var(--woori-ink)" }}
    >
      <div className="w-full max-w-md text-center">
        {/* 마스터 로고 (paper 톤) — ink 배경 위. 마크 + Latin + 한글 stack. */}
        <img
          src="/logo/woorimedia-logo-master-paper.svg"
          alt="우리미디어"
          className="mx-auto"
          style={{ width: 220, height: "auto" }}
        />
        <p
          className="mt-7 text-base font-semibold"
          style={{ color: "var(--woori-paper)" }}
        >
          Studio audio. Cinema vision.
        </p>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--woori-paper-subtle)" }}
        >
          원음 그대로, 시네마 그대로
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
          <div className="space-y-3 text-left">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:border-gold-main"
            />
            <input
              type="password"
              placeholder={signUp ? "비밀번호 (8자 이상)" : "비밀번호"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:border-gold-main"
            />
            {signUp && (
              <>
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={pwConfirm}
                  onChange={(e) => setPwConfirm(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:border-gold-main"
                />
                <input
                  type="text"
                  placeholder="닉네임 (선택)"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:border-gold-main"
                />
              </>
            )}
            {errMsg && (
              <div className="rounded-lg bg-red-500/15 px-3 py-2 text-xs text-red-200">
                {errMsg}
              </div>
            )}
            <button
              onClick={goEmail}
              disabled={!email || busy === "email"}
              className="h-12 w-full rounded-xl bg-gold-main text-sm font-extrabold text-navy-deep transition hover:brightness-105 disabled:opacity-60"
            >
              {busy === "email"
                ? "잠시만요…"
                : signUp
                  ? "가입하고 시작"
                  : "이메일로 로그인"}
            </button>
            <div className="flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setSignUp((s) => !s);
                  setErrMsg(null);
                }}
                className="text-gold-light hover:underline"
              >
                {signUp
                  ? "이미 계정이 있어요 — 로그인"
                  : "계정이 없어요 — 회원가입"}
              </button>
              <button
                onClick={() => {
                  setEmailMode(false);
                  setErrMsg(null);
                }}
                className="text-white/60 hover:text-white"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setEmailMode(true);
                setSignUp(false);
              }}
              className="text-sm font-bold text-white/70 hover:text-white"
            >
              ✉ 이메일 로그인
            </button>
            <span className="text-white/30">·</span>
            <button
              onClick={() => {
                setEmailMode(true);
                setSignUp(true);
              }}
              className="text-sm font-extrabold text-gold-light hover:underline"
            >
              회원가입
            </button>
          </div>
        )}

        <p className="mt-10 text-xs text-white/40">
          계속 진행 시 이용약관 및 개인정보처리방침에 동의합니다.
        </p>
      </div>
    </div>
  );
}
