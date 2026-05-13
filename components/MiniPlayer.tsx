"use client";

import Link from "next/link";
import { fmt, usePlayer } from "@/lib/player_context";

// 미니플레이어 — Ink/Paper 톤. 모든 컨트롤 inline SVG (stroke 기반).
// 활성화 표시는 배경 박스 없이 색 진하기 + 아래 작은 점으로만.

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
    <div
      className="fixed inset-x-0 bottom-0 z-30 backdrop-blur-md"
      style={{
        background: "rgba(246, 244, 239, 0.96)",
        borderTop: "1px solid var(--woori-ink-hairline)",
        boxShadow: "0 -4px 16px rgba(10, 10, 10, 0.04)",
      }}
    >
      {/* 진행 막대 */}
      <div
        className="group h-1 cursor-pointer"
        onClick={onSeek}
        aria-label="재생 위치 이동"
        style={{ background: "var(--woori-ink-hairline)" }}
      >
        <div
          className="h-full transition-[width] duration-150"
          style={{
            width: `${progress * 100}%`,
            background: "var(--woori-ink)",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        {/* 앨범 커버 / 마크 */}
        <Link
          href={`/play/album/${p.album.id}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
          style={{ background: "var(--woori-ink)" }}
          aria-label="앨범으로 이동"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--woori-paper)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 8 L11 16 L13 11 L15 16 L17 8" />
          </svg>
        </Link>

        {/* 곡 정보 */}
        <div className="flex-1 truncate">
          <p
            className="truncate text-sm font-extrabold"
            style={{ color: "var(--woori-ink)" }}
          >
            {cur.title}
          </p>
          <p
            className="truncate text-xs"
            style={{ color: "var(--woori-ink-subtle)" }}
          >
            {cur.artist} · {p.album.title} ·{" "}
            <span className="font-mono">
              {fmt(p.currentTime)} / {fmt(p.duration || cur.durationSeconds)}
            </span>
            {p.isLoading && <span className="ml-2">로딩…</span>}
            {p.error && (
              <span className="ml-2" style={{ color: "#B3261E" }}>
                ⚠ {p.error}
              </span>
            )}
          </p>
        </div>

        {/* 셔플 / 반복 — 활성화 표시는 색 + 아래 작은 점 */}
        <div className="hidden items-center gap-1 md:flex">
          <ToggleIconButton
            active={p.shuffle}
            onClick={() => p.toggleShuffle()}
            ariaLabel="셔플"
          >
            <ShuffleIcon />
          </ToggleIconButton>
          <ToggleIconButton
            active={p.repeat !== "off"}
            onClick={() => p.cycleRepeat()}
            ariaLabel={`반복: ${p.repeat}`}
          >
            {p.repeat === "one" ? <RepeatOneIcon /> : <RepeatIcon />}
          </ToggleIconButton>
        </div>

        {/* 메인 컨트롤 */}
        <div className="flex items-center gap-1">
          <IconButton
            onClick={() => p.prev()}
            ariaLabel="이전"
            className="hidden md:flex"
          >
            <PrevIcon />
          </IconButton>
          <button
            onClick={() => p.togglePlay()}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:brightness-95 disabled:opacity-50"
            style={{
              background: "var(--woori-ink)",
              color: "var(--woori-paper)",
            }}
            aria-label={p.isPlaying ? "일시정지" : "재생"}
            disabled={p.isLoading}
          >
            {p.isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <IconButton
            onClick={() => p.next()}
            ariaLabel="다음"
            className="hidden md:flex"
          >
            <NextIcon />
          </IconButton>
        </div>

        <IconButton
          onClick={() => p.stop()}
          ariaLabel="재생 종료"
          className="ml-2 hidden md:flex"
          subtle
        >
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
}

// ─── 공통 버튼 ────────────────────────────────────────────────

function IconButton({
  onClick,
  ariaLabel,
  className,
  subtle,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  subtle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5 ${className || ""}`}
      style={{
        color: subtle
          ? "var(--woori-ink-subtle)"
          : "var(--woori-ink)",
      }}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function ToggleIconButton({
  active,
  onClick,
  ariaLabel,
  children,
}: {
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5"
      style={{
        color: active ? "var(--woori-ink)" : "var(--woori-ink-subtle)",
      }}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {children}
      {active && (
        <span
          className="absolute"
          style={{
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "var(--woori-ink)",
          }}
        />
      )}
    </button>
  );
}

// ─── 아이콘 (inline SVG, Tabler 스타일) ─────────────────────

const sw = 1.8;

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17l5 0l9 -10l3 0" />
      <path d="M4 7l5 0l1.5 1.7" />
      <path d="M14.5 14.3l1.5 1.7l3 0" />
      <path d="M18 4l3 3l-3 3" />
      <path d="M18 20l3 -3l-3 -3" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
      <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
    </svg>
  );
}

function RepeatOneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
      <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
      <path d="M11 11l1 -1v4" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M6 5h2v14H6V5zm12 0v14L8 12 18 5z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M16 5h2v14h-2V5zM6 5v14l10-7L6 5z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}
