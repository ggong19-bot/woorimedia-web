"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/lib/auth_context";
import { PlayerProvider } from "@/lib/player_context";
import MiniPlayer from "@/components/MiniPlayer";

function PlayInner({ children }: { children: React.ReactNode }) {
  const { user, ready, signOut } = useAuth();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user && !path.startsWith("/play/login")) {
      router.replace("/play/login");
    }
    if (user && path.startsWith("/play/login")) {
      router.replace("/play");
    }
  }, [ready, user, path, router]);

  if (!ready) return null;

  // 로그인 화면은 자체 레이아웃 사용
  if (path.startsWith("/play/login") || !user) {
    return <main className="min-h-screen bg-bg-soft">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-bg-soft pb-20">
      <header className="sticky top-0 z-20 border-b border-divider bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/play" className="flex items-center gap-3">
            <span className="w-mark">W</span>
            <span className="text-base font-extrabold text-navy-deep">
              우리미디어
            </span>
            <span className="ml-2 rounded-full bg-bg-soft px-2 py-0.5 text-[10px] font-extrabold tracking-widest text-gold-deep">
              PLAY
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm font-semibold text-text-muted hover:text-navy-deep md:inline-block"
            >
              홈으로
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-divider bg-white px-3 py-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-deep text-xs font-extrabold text-gold-light">
                {user?.initial || "W"}
              </span>
              <span className="hidden text-sm font-semibold text-navy-deep md:inline-block">
                {user?.displayName}
              </span>
            </div>
            <button
              onClick={async () => {
                await signOut();
              }}
              className="rounded-full border border-divider px-3 py-1.5 text-xs font-bold text-text-muted hover:border-navy-deep hover:text-navy-deep"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

      <MiniPlayer />
    </div>
  );
}

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <PlayerProvider>
        <PlayInner>{children}</PlayInner>
      </PlayerProvider>
    </AuthProvider>
  );
}
