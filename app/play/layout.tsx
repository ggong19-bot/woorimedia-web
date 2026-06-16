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
      // ?redirect= 가 있으면 로그인 후 그쪽으로 (예: /pair?code=... TV 페어링 복귀).
      // 같은 사이트 상대경로만 허용 — "//host" 류 open-redirect 차단.
      const r = new URLSearchParams(window.location.search).get("redirect");
      const safe = r && r.startsWith("/") && !r.startsWith("//") ? r : "/play";
      router.replace(safe);
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
        <div className="mx-auto flex h-16 max-w-[450px] items-center justify-between gap-2 px-4">
          <Link href="/play" className="flex min-w-0 shrink items-center gap-2" aria-label="우리미디어">
            <Image
              src="/logo/woorimedia-horizontal.svg"
              alt="우리미디어"
              width={130}
              height={26}
              priority
              className="wm-logo-adaptive min-w-0"
            />
            <span
              className="ml-1 shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-widest"
              style={{
                background: "var(--woori-ink)",
                color: "var(--woori-paper)",
              }}
            >
              PLAY
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
              style={{
                background: "var(--woori-ink)",
                color: "var(--woori-paper)",
              }}
              title={user?.displayName}
            >
              {user?.initial || "W"}
            </span>
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

      <main className="mx-auto max-w-[450px] px-6 py-10">{children}</main>

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
