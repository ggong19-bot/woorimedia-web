// lib/kakao.ts — 카카오 JavaScript SDK 로더 + 로그인 헬퍼
//
// 사용:
//   const { accessToken } = await kakaoLogin();  // popup 로그인
//   → 그 accessToken을 백엔드 /v1/auth/kakao/token 에 보내 우리 JWT 받음

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || "";
const SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

declare global {
  interface Window {
    Kakao?: any;
  }
}

let sdkPromise: Promise<void> | null = null;

/** 카카오 JS SDK를 1회 로드 + init. 동시 호출 안전. */
export function ensureKakaoSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Kakao SDK는 브라우저에서만 사용 가능"));
  }
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    const finish = () => {
      try {
        if (!KAKAO_JS_KEY) {
          reject(new Error("NEXT_PUBLIC_KAKAO_JS_KEY 환경변수가 비어있습니다"));
          return;
        }
        if (!window.Kakao!.isInitialized()) {
          window.Kakao!.init(KAKAO_JS_KEY);
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    };

    if (window.Kakao) {
      finish();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SDK_URL}"]`,
    );
    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", () =>
        reject(new Error("Kakao SDK 로드 실패")),
      );
      return;
    }
    const s = document.createElement("script");
    s.src = SDK_URL;
    s.async = true;
    s.crossOrigin = "anonymous";
    s.onload = finish;
    s.onerror = () => reject(new Error("Kakao SDK 로드 실패"));
    document.head.appendChild(s);
  });

  return sdkPromise;
}

/** 카카오 로그인 → access_token 반환 (popup) */
export async function kakaoLogin(): Promise<{ accessToken: string }> {
  await ensureKakaoSdk();
  return new Promise((resolve, reject) => {
    window.Kakao!.Auth.login({
      scope: "profile_nickname",
      success: (authObj: { access_token: string }) => {
        resolve({ accessToken: authObj.access_token });
      },
      fail: (err: unknown) => {
        reject(new Error(`카카오 로그인 실패: ${JSON.stringify(err)}`));
      },
    });
  });
}

/** 카카오 로그아웃 (선택 — 우리 JWT만 끊어도 됨) */
export async function kakaoLogout(): Promise<void> {
  if (typeof window === "undefined" || !window.Kakao) return;
  if (!window.Kakao.Auth.getAccessToken()) return;
  return new Promise((resolve) => {
    window.Kakao!.Auth.logout(() => resolve());
  });
}
