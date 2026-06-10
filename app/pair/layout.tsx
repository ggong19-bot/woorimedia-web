"use client";

// /pair (TV 페어링 승인) — useAuth() 를 쓰므로 AuthProvider 필수.
// (/play, /tv 와 달리 레이아웃이 없어 Provider 부재 → 클라이언트 크래시였음.)
import { AuthProvider } from "@/lib/auth_context";

export default function PairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
