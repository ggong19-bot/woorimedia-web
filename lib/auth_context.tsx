"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, getToken, setToken, ApiError, API_BASE_URL } from "./api";
import type { WmUser } from "./types";

type AuthContextValue = {
  user: WmUser | null;
  ready: boolean;
  signInWith: (provider: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_KEY = "wm_web_auth_user_v1";

const PROVIDER_LABELS: Record<string, string> = {
  kakao: "카카오",
  naver: "네이버",
  google: "Google",
  apple: "Apple",
  email: "이메일",
  guest: "게스트",
};

function toWmUser(u: {
  uid: string;
  email: string;
  displayName: string;
  provider: string;
}): WmUser {
  const label = PROVIDER_LABELS[u.provider] || u.provider;
  const initial =
    u.displayName?.[0] ||
    label[0] ||
    u.email[0]?.toUpperCase() ||
    "W";
  return {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName || label + " 사용자",
    provider: u.provider,
    initial,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<WmUser | null>(null);
  const [ready, setReady] = useState(false);
  // 소셜 로그인 직후 계정연동 안내(검증 이메일로 기존계정 자동연결됨). 콜백 쿼리에서 받음.
  const [linkNotice, setLinkNotice] = useState<string | null>(null);
  const dismissNotice = useCallback(() => setLinkNotice(null), []);

  useEffect(() => {
    // 1) 카카오 redirect 콜백 처리 — URL에 ?token=...&uid=... 있으면 캐치
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const uid = params.get("uid");
      if (token && uid) {
        const incoming = toWmUser({
          uid,
          email: params.get("email") || `${uid}@unknown.local`,
          displayName: params.get("displayName") || "",
          provider: params.get("provider") || "kakao",
        });
        setUser(incoming);
        localStorage.setItem(USER_KEY, JSON.stringify(incoming));
        setToken(token);
        // 계정연동: 백엔드가 검증 이메일로 기존계정에 자동 연결했으면 안내.
        const suggestedName = params.get("suggestedName");
        if (suggestedName) setLinkNotice(suggestedName);
        // URL 정리 (token 노출 제거)
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, "", cleanUrl);
        setReady(true);
        return;
      }
    }
    // 2) 평소: 저장된 토큰+유저 복원
    try {
      const token = getToken();
      const raw = localStorage.getItem(USER_KEY);
      if (token && raw) setUser(JSON.parse(raw));
      else if (!token && raw) localStorage.removeItem(USER_KEY);
    } catch {}
    setReady(true);
  }, []);

  function persist(u: WmUser | null, token: string | null) {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
      else localStorage.removeItem(USER_KEY);
    }
    setToken(token);
  }

  async function callOAuth(
    provider: string,
    opts?: { email?: string; displayName?: string },
  ) {
    try {
      const res = await api.oauth(provider, opts);
      persist(toWmUser(res.user), res.tokens.accessToken);
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? `로그인 실패 (${e.code || e.status})`
          : "로그인 실패 — 네트워크를 확인해주세요";
      console.error("[auth] oauth error", e);
      throw new Error(msg);
    }
  }

  async function signInWith(provider: string) {
    // OAuth Redirect 흐름 — 백엔드가 IdP로 보낸 후 callback에서
    // frontend로 ?token=...&uid=...&email=... 와 함께 돌아옴.
    // useEffect가 query 캐치해서 persist.
    //
    // Apple 도 같은 패턴 — backend `/v1/auth/apple` 가 Apple authorize 로 redirect.
    // 응답은 form_post 방식이지만 backend 가 처리해서 frontend 로 query string 으로 돌려줌.
    if (
      provider === "kakao" ||
      provider === "naver" ||
      provider === "google" ||
      provider === "apple"
    ) {
      window.location.href = `${API_BASE_URL}/v1/auth/${provider}`;
      return; // navigate away
    }
    // 그 외 provider: mock OAuth (백엔드)
    await callOAuth(provider);
  }

  async function signInGuest() {
    await callOAuth("guest", { displayName: "게스트" });
  }

  async function signInEmail(email: string, password: string) {
    try {
      const res = await api.emailLogin(email, password);
      persist(toWmUser(res.user), res.tokens.accessToken);
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? _emailErrorMessage(e)
          : "로그인 실패 — 네트워크를 확인해주세요";
      throw new Error(msg);
    }
  }

  async function signUpEmail(
    email: string,
    password: string,
    displayName?: string,
  ) {
    try {
      const res = await api.emailSignup(email, password, displayName);
      persist(toWmUser(res.user), res.tokens.accessToken);
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? _emailErrorMessage(e)
          : "회원가입 실패 — 네트워크를 확인해주세요";
      throw new Error(msg);
    }
  }

  async function signOut() {
    persist(null, null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        signInWith,
        signInGuest,
        signInEmail,
        signUpEmail,
        signOut,
      }}
    >
      {linkNotice && (
        <AccountLinkBanner name={linkNotice} onClose={dismissNotice} />
      )}
      {children}
    </AuthContext.Provider>
  );
}

function _emailErrorMessage(e: ApiError): string {
  switch (e.code) {
    case "EMAIL_TAKEN":
      return "이미 가입된 이메일입니다. 로그인해주세요.";
    case "INVALID_EMAIL":
      return "올바른 이메일 형식이 아닙니다.";
    case "WEAK_PASSWORD":
      return "비밀번호는 8자 이상이어야 합니다.";
    case "INVALID_CREDENTIALS":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    default:
      return `오류 (${e.code || e.status})`;
  }
}

/** 소셜 로그인 직후 "기존 계정에 연결됐어요" 토스트 (8초 후 자동 사라짐). */
function AccountLinkBanner({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 8000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        maxWidth: "min(92vw, 440px)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 18px",
        background: "var(--woori-ink)",
        color: "var(--woori-paper)",
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
      }}
    >
      <span style={{ lineHeight: 1.45 }}>
        {name} 님 계정에 연결됐어요. 같은 라이브러리를 그대로 사용할 수 있어요.
      </span>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        style={{
          flexShrink: 0,
          background: "transparent",
          border: "none",
          color: "var(--woori-paper)",
          fontSize: 16,
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
