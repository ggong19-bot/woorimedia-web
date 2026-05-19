"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { AuthProvider, useAuth } from "@/lib/auth_context";
import { PlayerProvider, usePlayer } from "@/lib/player_context";
import MiniPlayer from "@/components/MiniPlayer";
import FullPlayer from "@/components/FullPlayer";
import TvBackHandler from "@/components/TvBackHandler";

function PlayInner({ children }: { children: React.ReactNode }) {
  const { user, ready, signOut } = useAuth();
  const player = usePlayer();
  const path = usePathname();
  const router = useRouter();
  const prevUser = useRef(user);

  useEffect(() => {
    if (!ready) return;
    if (!user && !path.startsWith("/play/login")) {
      router.replace("/play/login");
    }
    if (user && path.startsWith("/play/login")) {
      router.replace("/play");
    }
  }, [ready, user, path, router]);

  // 로그아웃(또는 토큰 만료) 시 재생 중단 — auth 와 player 가 분리돼 있어
  // 명시적으로 stop 안 하면 로그아웃 후에도 음악이 계속 재생됨.
  useEffect(() => {
    if (prevUser.current && !user) {
      player.stop();
    }
    prevUser.current = user;
  }, [user, player]);

  if (!ready) return null;

  // 로그인 화면은 자체 레이아웃 사용
  if (path.startsWith("/play/login") || !user) {
    return <main className="min-h-screen bg-bg-soft">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-bg-soft pb-20">
      <header className="sticky top-0 z-20 border-b border-divider bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/play" className="flex items-center gap-3" aria-label="우리미디어">
            <Image
              src="/logo/woorimedia-horizontal.svg"
              alt="우리미디어"
              width={130}
              height={26}
              priority
              className="wm-logo-adaptive"
            />
            <span
              className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-widest"
              style={{
                background: "var(--woori-ink)",
                color: "var(--woori-paper)",
              }}
            >
              PLAY
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm font-semibold transition hover:opacity-100 md:inline-block"
              style={{ color: "var(--woori-ink-subtle)" }}
            >
              홈으로
            </Link>
            <div
              className="flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                background: "var(--woori-white)",
                border: "1px solid var(--woori-ink-hairline)",
              }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold"
                style={{
                  background: "var(--woori-ink)",
                  color: "var(--woori-paper)",
                }}
              >
                {user?.initial || "W"}
              </span>
              <span
                className="hidden text-sm font-semibold md:inline-block"
                style={{ color: "var(--woori-ink)" }}
              >
                {user?.displayName}
              </span>
            </div>
            <button
              onClick={async () => {
                await signOut();
              }}
              className="rounded-full border px-3 py-1.5 text-xs font-bold transition hover:opacity-90"
              style={{
                borderColor: "var(--woori-ink-hairline)",
                color: "var(--woori-ink-subtle)",
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

      <MiniPlayer />
      <FullPlayer />
      <TvBackHandler />
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
