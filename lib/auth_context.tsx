"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, getToken, setToken, ApiError, API_BASE_URL } from "./api";
import type { WmUser } from "./types";

type AuthContextValue = {
  user: WmUser | null;
  ready: boolean;
  signInWith: (provider: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  signInEmail: (email: string) => Promise<void>;
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
    if (provider === "kakao" || provider === "naver" || provider === "google") {
      window.location.href = `${API_BASE_URL}/v1/auth/${provider}`;
      return; // navigate away
    }
    // apple 등 미구현 + 그 외 provider: mock OAuth (백엔드)
    await callOAuth(provider);
  }

  async function signInGuest() {
    await callOAuth("guest", { displayName: "게스트" });
  }

  async function signInEmail(email: string) {
    await callOAuth("email", {
      email,
      displayName: email.split("@")[0],
    });
  }

  async function signOut() {
    persist(null, null);
  }

  return (
    <AuthContext.Provider
      value={{ user, ready, signInWith, signInGuest, signInEmail, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
