"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePlayer } from "@/lib/player_context";

/**
 * TV 래퍼(Tizen/webOS) 의 BACK 키 처리.
 *
 * 동작 흐름:
 *   1. 래퍼가 BACK 키 입력 받음 (Tizen 10009 / webOS 461 / Esc 27)
 *   2. 래퍼가 iframe(= 우리 웹앱) 에 `postMessage({ type: 'wm-back' })` 전송
 *   3. 우리는 내부 네비게이션 가능 여부 판단:
 *      - 풀플레이어 열려있음   → 닫고 `wm-back-handled` 응답
 *      - 앨범 상세 / 로그인 등 → router.back() + `wm-back-handled` 응답
 *      - 라이브러리 최상위      → 응답 안 함 → 래퍼가 250ms 후 앱 종료
 *
 * 보안: TV 래퍼는 iframe 의 부모(window.parent) — 다른 origin 의 메시지는 무시.
 *       래퍼 src 가 동일 origin 으로 우리 사이트를 띄우므로 ev.source === window.parent
 *       체크면 충분 (3rd-party iframe 가능성 0).
 */
export default function TvBackHandler() {
  const router = useRouter();
  const path = usePathname();
  const { fullOpen, closeFull } = usePlayer();

  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      // 부모 프레임에서 온 메시지만 처리 (TV 래퍼 = 부모)
      if (ev.source !== window.parent) return;
      const data = ev.data as { type?: string } | null;
      if (!data || data.type !== "wm-back") return;

      // 1) 풀플레이어 → 닫기
      if (fullOpen) {
        closeFull();
        window.parent.postMessage({ type: "wm-back-handled" }, "*");
        return;
      }

      // 2) 하위 라우트 (앨범 상세 등) → 뒤로
      //    /play 또는 /play/login 같은 최상위는 응답 안 함 (래퍼가 종료)
      const topLevel =
        path === "/play" || path === "/play/login" || path === "/";
      if (!topLevel) {
        router.back();
        window.parent.postMessage({ type: "wm-back-handled" }, "*");
        return;
      }

      // 3) 최상위 라이브러리 — 응답 안 함 → 래퍼가 250ms 후 앱 종료 (의도된 UX)
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router, path, fullOpen, closeFull]);

  return null;
}
