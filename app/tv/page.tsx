"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { LibraryAlbum } from "@/lib/types";
import AlbumCover from "@/components/AlbumCover";
import { useAuth } from "@/lib/auth_context";

// TV 그리드 컬럼 수 (1920 기준). 리모컨 D-pad 상/하 이동량 = COLS.
const COLS = 5;

// QA/에뮬용 데모 — `?demo` 면 로그인 없이 TV 그리드+D-pad 를 검증할 수 있음
// (Windows Google TV 에뮬 테스트용: 계정 페어링 전에도 UI/리모컨 확인 가능).
const DEMO_ALBUMS: LibraryAlbum[] = Array.from({ length: 8 }).map(
  (_, i) =>
    ({
      id: `demo-${i}`,
      title: `데모 앨범 ${i + 1}`,
      artist: "우리미디어",
      coverUrl: "",
      audioSpec: { format: "FLAC", bitDepth: 24, sampleRateHz: 96000 },
    }) as LibraryAlbum,
);

export default function TvLibraryPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [albums, setAlbums] = useState<LibraryAlbum[] | null>(null);
  const [focus, setFocus] = useState(0);
  const [demo, setDemo] = useState(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setDemo(new URLSearchParams(window.location.search).has("demo"));
  }, []);

  // 라이브러리 로드(로그인 시) — `?demo` 면 샘플 데이터.
  useEffect(() => {
    if (demo) {
      setAlbums(DEMO_ALBUMS);
      return;
    }
    if (!ready || !user) return;
    let cancelled = false;
    api
      .library()
      .then((res) => {
        if (!cancelled) setAlbums(res.albums);
      })
      .catch(() => {
        if (!cancelled) setAlbums([]);
      });
    return () => {
      cancelled = true;
    };
  }, [ready, user, demo]);

  // focus 인덱스가 바뀌면 해당 카드에 DOM 포커스(리모컨 진입점 + 키 입력 수신).
  // 포커스 이동을 effect 로 분리 → move 는 순수 함수(updater 중복호출 시 2칸 점프 방지).
  useEffect(() => {
    if (albums && albums.length) cardRefs.current[focus]?.focus();
  }, [focus, albums]);

  // D-pad 이동(순수 — 경계 밖이면 현재 유지). 실제 포커스는 위 effect 가 처리.
  const move = useCallback(
    (delta: number) => {
      const n = albums?.length ?? 0;
      setFocus((cur) => {
        const next = cur + delta;
        return next < 0 || next >= n ? cur : next;
      });
    },
    [albums],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        move(1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        move(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        move(COLS);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(-COLS);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (albums?.[focus]) router.push(`/play/album/${albums[focus].id}`);
        break;
    }
  };

  // ── 상태별 화면 ──────────────────────────────────────────
  if (!ready) {
    return (
      <TvCenter>
        <p className="text-2xl opacity-60">불러오는 중…</p>
      </TvCenter>
    );
  }
  if (!user && !demo) {
    // TV 로그인/페어링(디바이스코드)은 다음 단계. 지금은 안내 스캐폴드.
    return (
      <TvCenter>
        <div className="text-center">
          <h1 className="text-6xl font-extrabold tracking-tight">우리미디어 TV</h1>
          <p className="mt-8 text-3xl" style={{ opacity: 0.75 }}>
            우리미디어 앱에서 이 TV를 연결해 주세요.
          </p>
          <p className="mt-3 text-xl" style={{ opacity: 0.45 }}>
            로그인 · 페어링(디바이스 코드)은 곧 지원됩니다.
          </p>
        </div>
      </TvCenter>
    );
  }

  return (
    <div className="px-16 py-14" onKeyDown={onKeyDown}>
      <header className="mb-12 flex items-end justify-between">
        <div>
          <p
            className="text-lg font-extrabold uppercase"
            style={{ letterSpacing: "0.32em", opacity: 0.5 }}
          >
            My Library
          </p>
          <h1 className="mt-3 text-6xl font-extrabold tracking-tight">
            내 라이브러리
          </h1>
        </div>
        <p className="text-2xl" style={{ opacity: 0.6 }}>
          {albums === null ? "…" : `앨범 · ${albums.length}개`}
        </p>
      </header>

      {albums === null ? (
        <p className="text-2xl" style={{ opacity: 0.6 }}>
          불러오는 중…
        </p>
      ) : albums.length === 0 ? (
        <div
          className="rounded-2xl py-28 text-center"
          style={{ border: "1px solid rgba(246,244,239,0.15)" }}
        >
          <h2 className="text-4xl font-bold">등록된 USB가 없습니다</h2>
          <p className="mt-5 text-2xl" style={{ opacity: 0.6 }}>
            우리미디어 앱에서 USB를 등록하면 여기에 나타납니다.
          </p>
        </div>
      ) : (
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {albums.map((a, i) => {
            const focused = i === focus;
            return (
              <div
                key={a.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                tabIndex={focused ? 0 : -1}
                onFocus={() => setFocus(i)}
                onClick={() => router.push(`/play/album/${a.id}`)}
                className="cursor-pointer rounded-2xl outline-none"
                style={{
                  transform: focused ? "scale(1.08)" : "scale(1)",
                  transition: "transform 160ms ease",
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    aspectRatio: "1 / 1",
                    boxShadow: focused
                      ? "0 0 0 5px #f6f4ef, 0 18px 50px rgba(0,0,0,0.65)"
                      : "0 6px 20px rgba(0,0,0,0.35)",
                    transition: "box-shadow 160ms ease",
                  }}
                >
                  <AlbumCover
                    className="absolute inset-0 h-full w-full"
                    coverUrl={a.coverUrl}
                    alt={a.title}
                    markSize={96}
                  />
                  <div
                    className="absolute bottom-3 right-3 inline-flex items-center px-2 py-1 text-xs font-bold leading-none"
                    style={{
                      border: "1px solid rgba(246,244,239,0.25)",
                      color: "#f6f4ef",
                      background: "rgba(0,0,0,0.45)",
                    }}
                  >
                    {a.audioSpec.format} · {a.audioSpec.bitDepth}/
                    {Math.round(a.audioSpec.sampleRateHz / 1000)}
                  </div>
                </div>
                <h3 className="mt-4 truncate text-2xl font-bold">{a.title}</h3>
                <p className="truncate text-lg" style={{ opacity: 0.6 }}>
                  {a.artist}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TvCenter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-16">
      {children}
    </div>
  );
}
