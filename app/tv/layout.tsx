"use client";

import { AuthProvider } from "@/lib/auth_context";

// TV(웹 래퍼: LG webOS / Tizen / 큰 화면) 전용 레이아웃.
// /play 레이아웃의 max-w-[450px] 폰 너비·폰 헤더를 쓰지 않고 풀스크린 + 다크 TV 테마.
// D-pad/리모컨 네비게이션은 각 페이지가 처리(roving focus + 가시 하이라이트).
export default function TvLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div
        className="tv-root min-h-screen w-full"
        style={{
          background: "#0b0c10",
          color: "#f6f4ef",
          // TV 화면은 오버스캔이 있을 수 있어 safe-area 여백 권장(실기에서 미세조정).
          ["--tv-fg" as string]: "#f6f4ef",
        }}
      >
        {children}
      </div>
    </AuthProvider>
  );
}
