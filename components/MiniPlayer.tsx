"use client";

import Link from "next/link";
import { fmt, usePlayer } from "@/lib/player_context";

export default function MiniPlayer() {
  const p = usePlayer();
  const cur = p.current();

  if (!cur || !p.album) return null;

  const progress =
    p.duration > 0 ? Math.min(1, p.currentTime / p.duration) : 0;

  function onSeek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    p.seek(ratio * p.duration);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-divider bg-white/95 shadow-lg backdrop-blur-md">
      {/* 진행 막대 */}
      <div
        className="group h-1 cursor-pointer bg-divider"
        onClick={onSeek}
        aria-label="재생 위치 이동"
      >
        <div
          className="bg-gold-gradient h-full transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <Link
          href={`/play/album/${p.album.id}`}
          className="bg-navy-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-lg shadow-md"
          aria-label="앨범으로 이동"
        >
          <span className="text-xl text-gold-main">♪</span>
        </Link>

        <div className="flex-1 truncate">
          <p className="truncate text-sm font-extrabold text-navy-deep">
            {cur.title}
          </p>
          <p className="truncate text-xs text-text-muted">
            {cur.artist} · {p.album.title} ·{" "}
            <span className="font-mono">
              {fmt(p.currentTime)} / {fmt(p.duration || cur.durationSeconds)}
            </span>
            {p.isLoading && <span className="ml-2 text-gold-deep">로딩…</span>}
            {p.error && (
              <span className="ml-2 text-red-600">⚠ {p.error}</span>
            )}
          </p>
        </div>

        {/* 셔플/리핏 토글 */}
        <div className="hidden items-center gap-1 md:flex">
          <button
            onClick={() => p.toggleShuffle()}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-base transition ${
              p.shuffle
                ? "bg-gold-main/15 text-gold-deep"
                : "text-text-muted hover:bg-bg-soft hover:text-navy-deep"
            }`}
            aria-label="셔플"
            title="셔플"
          >
            ⇄
          </button>
          <button
            onClick={() => p.cycleRepeat()}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
              p.repeat !== "off"
                ? "bg-gold-main/15 text-gold-deep"
                : "text-text-muted hover:bg-bg-soft hover:text-navy-deep"
            }`}
            aria-label={`반복: ${p.repeat}`}
            title={`반복: ${p.repeat}`}
          >
            {p.repeat === "one" ? "🔂" : "🔁"}
          </button>
        </div>

        {/* 메인 컨트롤 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => p.prev()}
            className="hidden h-9 w-9 items-center justify-center rounded-full text-navy-deep hover:bg-bg-soft md:flex"
            aria-label="이전"
          >
            ⏮
          </button>
          <button
            onClick={() => p.togglePlay()}
            className="bg-gold-gradient flex h-11 w-11 items-center justify-center rounded-full text-navy-deep shadow-md transition hover:brightness-110 disabled:opacity-50"
            aria-label={p.isPlaying ? "일시정지" : "재생"}
            disabled={p.isLoading}
          >
            <span className="text-lg">{p.isPlaying ? "⏸" : "▶"}</span>
          </button>
          <button
            onClick={() => p.next()}
            className="hidden h-9 w-9 items-center justify-center rounded-full text-navy-deep hover:bg-bg-soft md:flex"
            aria-label="다음"
          >
            ⏭
          </button>
        </div>

        <button
          onClick={() => p.stop()}
          className="ml-2 hidden h-9 w-9 items-center justify-center rounded-full text-text-muted hover:text-navy-deep md:flex"
          aria-label="재생 종료"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
