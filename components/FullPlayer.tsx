"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { fmt, usePlayer } from "@/lib/player_context";
import AlbumCover from "@/components/AlbumCover";

// 전체 화면 플레이어 — 미니플레이어 탭 시 확장. Ink/Paper 톤, 그라데이션/그림자 없음.
// 맥(Flutter) full_player.dart 구조 미러링: 상단바 / 커버 마크 / 트랙정보 /
// 진행바 / 큰 컨트롤 / 셔플·반복 / UP NEXT 큐.
// 트랙 변경 시 슬라이드+페이드 전환 (Flutter v22 와 동일 UX) — globals.css 의
// wm-swipe-in-{right,left} 키프레임 + cur.id 키 변경으로 remount 트리거.

// 스와이프 임계값: 가로 60px 이상 이동 + 세로 변동 50% 미만이면 horizontal swipe 인정.
// Flutter onHorizontalDragEnd 의 velocity 300 px/s 와 체감 유사 (터치 ~0.2s 기준).
const SWIPE_THRESHOLD = 60;

export default function FullPlayer() {
  const p = usePlayer();
  const cur = p.current();
  // Pointer Events 로 마우스·터치·펜 통합 처리. 'touch' / 'mouse' / 'pen' 모두 동일
  // 코드로 작동 — macOS Chrome 마우스 드래그, iPhone Safari 터치, Windows pen 입력 등.
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null);
  // 1 = 다음(좌→우 슬라이드 인), -1 = 이전. 자동 진행도 1 로 기본.
  const [swipeDir, setSwipeDir] = useState<1 | -1>(1);
  // 가사 — lyricsUrl(공개 텍스트) on-demand fetch.
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [lyricsState, setLyricsState] = useState<{ url: string; text: string } | null>(null);
  const [lyricsLoading, setLyricsLoading] = useState(false);

  if (!p.fullOpen || !cur || !p.album) return null;

  const total = p.duration || cur.durationSeconds || 0;
  const progress = total > 0 ? Math.min(1, p.currentTime / total) : 0;

  function onSeek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    p.seek(ratio * (p.duration || total));
  }

  // 스와이프 — 좌측 (dx <= -threshold) → next, 우측 (>= threshold) → prev.
  // Pointer Events 라 마우스(드래그) + 터치 둘 다 동일 처리. seek 슬라이더와 버튼은
  // 자식이라 이벤트가 wrapper 로도 버블 — 단순 클릭은 dx 가 작아 threshold 통과 못해
  // 스와이프 트리거 안 됨 (자연스러운 충돌 회피).
  function onPointerDown(e: React.PointerEvent) {
    // 마우스 좌클릭만 (가운데/오른쪽 버튼 무시), 터치/펜은 그대로
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerStart.current = {
      x: e.clientX,
      y: e.clientY,
      id: e.pointerId,
    };
  }
  function onPointerUp(e: React.PointerEvent) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    // 세로 변동이 가로의 절반 이상이면 수직 스크롤로 간주 — 무시
    if (Math.abs(dy) > Math.abs(dx) * 0.5) return;
    if (dx <= -SWIPE_THRESHOLD) {
      setSwipeDir(1);
      p.next();
    } else if (dx >= SWIPE_THRESHOLD) {
      setSwipeDir(-1);
      p.prev();
    }
  }
  // pointercancel 도 처리 — 브라우저가 제스처 가로채는 경우 start 정리
  function onPointerCancel() {
    pointerStart.current = null;
  }

  async function toggleLyrics() {
    if (lyricsOpen) {
      setLyricsOpen(false);
      return;
    }
    setLyricsOpen(true);
    const lyricsUrl = cur && cur.lyricsUrl;
    if (lyricsUrl && lyricsState?.url !== lyricsUrl) {
      setLyricsLoading(true);
      try {
        const res = await fetch(lyricsUrl);
        setLyricsState({ url: lyricsUrl, text: res.ok ? await res.text() : "" });
      } catch {
        setLyricsState({ url: lyricsUrl, text: "" });
      } finally {
        setLyricsLoading(false);
      }
    }
  }

  const upcoming = p.queue.length - p.currentIndex - 1;

  return (
    <div
      className="fixed inset-0 z-40 overflow-y-auto"
      style={{ background: "var(--woori-paper)" }}
      role="dialog"
      aria-label="전체 화면 플레이어"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="mx-auto flex min-h-full max-w-xl flex-col px-6 pb-16">
        {/* ─── 상단 바 ─── */}
        <div className="flex h-14 items-center">
          <IconButton onClick={() => p.closeFull()} ariaLabel="미니 플레이어로">
            <ChevronDownIcon />
          </IconButton>
          <span
            className="flex-1 text-center text-[11px] font-semibold"
            style={{
              color: "var(--woori-ink-subtle)",
              letterSpacing: "2.2px",
            }}
          >
            NOW PLAYING
          </span>
          {/* 컨텍스트 보기 — 일반 앨범이면 /play/album/<id>, 플레이리스트면
              /play/playlists/<id> 로. id 가 'playlist:' prefix 면 playlist 페이지. */}
          <Link
            href={
              p.album.id.startsWith("playlist:")
                ? `/play/playlists/${encodeURIComponent(
                    p.album.id.slice("playlist:".length),
                  )}`
                : `/play/album/${p.album.id}`
            }
            onClick={() => p.closeFull()}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5"
            style={{ color: "var(--woori-ink)" }}
            aria-label={
              p.album.id.startsWith("playlist:")
                ? "플레이리스트 보기"
                : "앨범 보기"
            }
          >
            <AlbumIcon />
          </Link>
          <IconButton onClick={() => p.stop()} ariaLabel="재생 종료" subtle>
            <CloseIcon />
          </IconButton>
        </div>

        {/* ─── 커버 + 트랙 정보 — cur.id 키로 트랙 변경 시 슬라이드+페이드 ─── */}
        <div
          key={cur.id}
          className={swipeDir === 1 ? "wm-swipe-in-right" : "wm-swipe-in-left"}
        >
          <div className="flex justify-center px-2 pb-6 pt-4">
            <AlbumCover
              coverUrl={p.album.coverUrl}
              alt={p.album.title}
              className="w-full max-w-[280px]"
              markSize={96}
            />
          </div>

          {/* ─── 트랙 정보 ─── */}
          <div className="px-2 text-center">
            <h1
              className="truncate text-xl font-extrabold"
              style={{ color: "var(--woori-ink)" }}
            >
              {cur.title}
            </h1>
            <p
              className="mt-1 truncate text-sm"
              style={{ color: "var(--woori-ink-subtle)" }}
            >
              {cur.artist} · {p.album.title}
            </p>
            {cur.hasLyrics && cur.lyricsUrl && (
              <button
                onClick={toggleLyrics}
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase transition hover:opacity-100"
                style={{ color: "var(--woori-ink-subtle)", letterSpacing: "0.18em", opacity: 0.7 }}
              >
                {lyricsOpen ? "가사 닫기 ▲" : "가사 ▾"}
              </button>
            )}
          </div>

          {/* ─── 가사 패널 ─── */}
          {lyricsOpen && (
            <div
              className="mx-2 mt-3 max-h-72 overflow-y-auto whitespace-pre-wrap px-4 py-4 text-center text-sm leading-relaxed"
              style={{
                background: "var(--woori-white)",
                border: "1px solid var(--woori-ink-hairline)",
                color: "var(--woori-ink)",
              }}
            >
              {lyricsLoading
                ? "불러오는 중…"
                : lyricsState?.text && lyricsState.text.trim()
                  ? lyricsState.text
                  : "가사를 불러오지 못했습니다."}
            </div>
          )}
        </div>

        {/* ─── 진행 바 + 시간 ─── */}
        <div className="px-2 pt-6">
          <div
            className="h-1.5 cursor-pointer rounded-full"
            onClick={onSeek}
            aria-label="재생 위치 이동"
            style={{ background: "var(--woori-ink-hairline)" }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-150"
              style={{
                width: `${progress * 100}%`,
                background: "var(--woori-ink)",
              }}
            />
          </div>
          <div
            className="mt-2 flex justify-between font-mono text-xs"
            style={{ color: "var(--woori-ink-subtle)" }}
          >
            <span>{fmt(p.currentTime)}</span>
            <span>
              {p.isLoading ? (
                "로딩…"
              ) : p.error ? (
                <span style={{ color: "#B3261E" }}>⚠ {p.error}</span>
              ) : (
                fmt(total)
              )}
            </span>
          </div>
        </div>

        {/* ─── 메인 컨트롤 ─ swipeDir 셋팅으로 버튼 클릭도 동일 슬라이드 효과 ─── */}
        <div className="flex items-center justify-center gap-6 pt-6">
          <IconButton
            onClick={() => {
              setSwipeDir(-1);
              p.prev();
            }}
            ariaLabel="이전"
            big
          >
            <PrevIcon />
          </IconButton>
          <button
            onClick={() => p.togglePlay()}
            disabled={p.isLoading}
            className="flex h-16 w-16 items-center justify-center rounded-full transition hover:brightness-95 disabled:opacity-50"
            style={{
              background: "var(--woori-ink)",
              color: "var(--woori-paper)",
            }}
            aria-label={p.isPlaying ? "일시정지" : "재생"}
          >
            {p.isPlaying ? <PauseIcon big /> : <PlayIcon big />}
          </button>
          <IconButton
            onClick={() => {
              setSwipeDir(1);
              p.next();
            }}
            ariaLabel="다음"
            big
          >
            <NextIcon />
          </IconButton>
        </div>

        {/* ─── 셔플 / 반복 ─── */}
        <div className="flex items-center justify-center gap-3 pt-6">
          <ModeChip
            active={p.shuffle}
            onClick={() => p.toggleShuffle()}
            label={p.shuffle ? "SHUFFLE" : "IN ORDER"}
          >
            <ShuffleIcon />
          </ModeChip>
          <ModeChip
            active={p.repeat !== "off"}
            onClick={() => p.cycleRepeat()}
            label={
              p.repeat === "one"
                ? "REPEAT ONE"
                : p.repeat === "all"
                  ? "REPEAT ALL"
                  : "REPEAT OFF"
            }
          >
            {p.repeat === "one" ? <RepeatOneIcon /> : <RepeatIcon />}
          </ModeChip>
        </div>

        {/* ─── UP NEXT 큐 ─── */}
        <div className="flex items-baseline gap-3 px-2 pb-2 pt-10">
          <span
            className="text-[11px] font-extrabold"
            style={{ color: "var(--woori-ink)", letterSpacing: "2.2px" }}
          >
            UP NEXT
          </span>
          <span
            className="text-[10px] font-medium"
            style={{
              color: "var(--woori-ink-subtle)",
              letterSpacing: "1.4px",
            }}
          >
            {p.currentIndex + 1} / {p.queue.length}
            {upcoming > 0 ? `  ·  next ${upcoming}` : ""}
          </span>
        </div>
        <div
          className="h-px w-full"
          style={{ background: "var(--woori-ink-hairline)" }}
        />
        <ul>
          {p.queue.map((t, i) => {
            const isCur = i === p.currentIndex;
            return (
              <li key={t.id}>
                <button
                  onClick={() => p.jumpTo(i)}
                  className="flex w-full items-center gap-3 py-3 text-left transition hover:bg-black/[0.03]"
                  style={{
                    borderBottom: "1px solid var(--woori-ink-hairline)",
                  }}
                >
                  <span
                    className="w-6 shrink-0 text-center font-mono text-xs"
                    style={{
                      color: isCur
                        ? "var(--woori-ink)"
                        : "var(--woori-ink-subtle)",
                    }}
                  >
                    {isCur && p.isPlaying ? "▶" : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block truncate text-sm"
                      style={{
                        color: "var(--woori-ink)",
                        fontWeight: isCur ? 800 : 600,
                      }}
                    >
                      {t.title}
                    </span>
                    <span
                      className="block truncate text-xs"
                      style={{ color: "var(--woori-ink-subtle)" }}
                    >
                      {t.artist}
                    </span>
                  </span>
                  <span
                    className="shrink-0 font-mono text-xs"
                    style={{ color: "var(--woori-ink-subtle)" }}
                  >
                    {fmt(t.durationSeconds)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ─── 공통 버튼 ────────────────────────────────────────────────

function IconButton({
  onClick,
  ariaLabel,
  subtle,
  big,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  subtle?: boolean;
  big?: boolean;
  children: React.ReactNode;
}) {
  const size = big ? "h-12 w-12" : "h-9 w-9";
  return (
    <button
      onClick={onClick}
      className={`flex ${size} items-center justify-center rounded-full transition hover:bg-black/5`}
      style={{
        color: subtle ? "var(--woori-ink-subtle)" : "var(--woori-ink)",
      }}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function ModeChip({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full px-4 py-2 transition"
      style={{
        border: "1px solid var(--woori-ink-hairline)",
        background: active ? "var(--woori-ink)" : "transparent",
        color: active ? "var(--woori-paper)" : "var(--woori-ink-subtle)",
      }}
      aria-label={label}
      title={label}
    >
      {children}
      <span
        className="text-[10px] font-bold"
        style={{ letterSpacing: "1.2px" }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── 아이콘 (inline SVG) ─────────────────────────────────────

const sw = 1.8;

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}

function AlbumIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M6 5h2v14H6V5zm12 0v14L8 12 18 5z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M16 5h2v14h-2V5zM6 5v14l10-7L6 5z" />
    </svg>
  );
}

function PlayIcon({ big }: { big?: boolean }) {
  const d = big ? 26 : 18;
  return (
    <svg viewBox="0 0 24 24" width={d} height={d} fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ big }: { big?: boolean }) {
  const d = big ? 26 : 18;
  return (
    <svg viewBox="0 0 24 24" width={d} height={d} fill="currentColor">
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
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
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
      <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
    </svg>
  );
}

function RepeatOneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
      <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
      <path d="M11 11l1 -1v4" />
    </svg>
  );
}
