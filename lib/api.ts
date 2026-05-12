// lib/api.ts — 우리미디어 백엔드 API 클라이언트
// 환경변수: NEXT_PUBLIC_API_BASE_URL (e.g. https://api.woori-media.com)

import type {
  AuthResponse,
  ActivateResponse,
  LibraryAlbum,
  AlbumDetail,
  DecryptionKeyResponse,
} from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.woori-media.com";

const TOKEN_KEY = "wm_web_access_token_v1";

// ────────────────────────────────────────────────────────────
// 토큰 저장소 (localStorage)
// ────────────────────────────────────────────────────────────
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

// ────────────────────────────────────────────────────────────
// 핵심 fetch 헬퍼
// ────────────────────────────────────────────────────────────
type RequestOpts = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(status: number, code: string | undefined, message: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = "ApiError";
  }
}

async function request<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (opts.auth !== false) {
    const t = getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }
  const res = await fetch(url, {
    method: opts.method || "GET",
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const message =
      (typeof data === "object" && data && (data as any).message) ||
      (typeof data === "object" && data && (data as any).error) ||
      `HTTP ${res.status}`;
    const code = typeof data === "object" && data ? (data as any).error : undefined;
    throw new ApiError(res.status, code, message);
  }
  return data as T;
}

// ────────────────────────────────────────────────────────────
// 엔드포인트 래퍼
// ────────────────────────────────────────────────────────────
export const api = {
  // 헬스체크 (인증 불필요)
  health: () =>
    request<{ status: string; db: string; partnerCount: number }>(
      "/v1/health",
      { auth: false },
    ),

  // OAuth (인증 불필요)
  oauth: (provider: string, opts?: { email?: string; displayName?: string }) =>
    request<AuthResponse>("/v1/auth/oauth", {
      method: "POST",
      body: { provider, ...opts },
      auth: false,
    }),

  // 카카오 SDK가 발급한 access_token으로 우리 JWT 교환
  kakaoToken: (kakaoAccessToken: string) =>
    request<AuthResponse>("/v1/auth/kakao/token", {
      method: "POST",
      body: { accessToken: kakaoAccessToken },
      auth: false,
    }),

  // 이메일 회원가입 — bcrypt(scrypt) 해시 후 users 저장
  emailSignup: (email: string, password: string, displayName?: string) =>
    request<AuthResponse>("/v1/auth/email/signup", {
      method: "POST",
      body: { email, password, displayName },
      auth: false,
    }),

  // 이메일 로그인 — scrypt timing-safe verify
  emailLogin: (email: string, password: string) =>
    request<AuthResponse>("/v1/auth/email/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    }),

  // 시리얼 활성화 (인증 필요)
  activate: (serialNumber: string, device?: { platform?: string; appVersion?: string; deviceId?: string }) =>
    request<ActivateResponse>("/v1/serials/activate", {
      method: "POST",
      body: { serialNumber, device },
    }),

  // 내 라이브러리 (인증 필요)
  library: () =>
    request<{ albums: LibraryAlbum[] }>("/v1/me/library"),

  // 앨범 상세 (인증 필요)
  album: (albumId: string) =>
    request<AlbumDetail>(`/v1/albums/${albumId}`),

  // 복호화 키 (인증 필요)
  decryptionKey: (albumId: string) =>
    request<DecryptionKeyResponse>("/v1/content/decryption-key", {
      method: "POST",
      body: { albumId },
    }),

  // 음원 재생용 signed URL (인증 필요, TTL 5분)
  audioUrl: (albumId: string, trackId: string, format?: string) =>
    request<{
      url: string;
      expiresAt: string;
      mimeType: string;
      albumId: string;
      trackId: string;
      format: string;
    }>("/v1/content/audio-url", {
      method: "POST",
      body: { albumId, trackId, format },
    }),
};

export const API_BASE_URL = API_BASE;
