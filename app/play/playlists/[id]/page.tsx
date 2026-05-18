"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import { usePlayer, fmt } from "@/lib/player_context";
import { PlaylistStore, type Playlist } from "@/lib/playlist_store";
import type { Track } from "@/lib/types";

export default function PlaylistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const player = usePlayer();

  useEffect(() => {
    return PlaylistStore.subscribe((list) => {
      setPlaylist(list.find((p) => p.id === id) ?? null);
    });
  }, [id]);

  if (!playlist) {
    return (
      <div
        className="rounded-md border p-12 text-center"
        style={{
          borderColor: "var(--woori-ink-hairline)",
          background: "var(--woori-white)",
          color: "var(--woori-ink-subtle)",
        }}
      >
        <p className="text-sm">플레이리스트를 찾을 수 없어요.</p>
        <Link
          href="/play/playlists"
          className="mt-4 inline-block text-sm font-bold underline"
          style={{ color: "var(--woori-ink)" }}
        >
          ← 목록으로
        </Link>
      </div>
    );
  }

  // PlaylistEntry → Track 변환. sourceAlbumId 로 마킹해서 player_context 가
  // 트랙별로 정확한 앨범의 stream URL 을 가져오도록.
  const tracks: Track[] = playlist.entries.map((e, i) => ({
    id: e.trackId,
    trackNumber: i + 1,
    title: e.titleSnapshot,
    artist: e.artistSnapshot,
    durationSeconds: e.durationSecondsSnapshot,
    sourceAlbumId: e.albumId,
  }));
  const totalDur = tracks.reduce((s, t) => s + (t.durationSeconds || 0), 0);

  function play(startIndex: number, shuffle: boolean) {
    if (tracks.length === 0) return;
    // shuffle 모드를 큐 set 후 토글 — toggleShuffle 가 이미 ref 기반
    player.setPlaylistQueue(
      { id: playlist!.id, name: playlist!.name },
      tracks,
      startIndex,
    );
    if (shuffle !== player.shuffle) player.toggleShuffle();
    player.openFull();
  }

  function removeAt(index: number) {
    PlaylistStore.removeEntry(playlist!.id, index);
  }

  return (
    <div>
      <div className="mb-2">
        <Link
          href="/play/playlists"
          className="text-xs font-bold uppercase"
          style={{
            color: "var(--woori-ink-subtle)",
            letterSpacing: "0.18em",
          }}
        >
          ← 플레이리스트 목록
        </Link>
      </div>

      <div
        className="mt-3 mb-8 border-b pb-6"
        style={{ borderColor: "var(--woori-ink-hairline)" }}
      >
        <h1
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: "var(--woori-ink)" }}
        >
          {playlist.name}
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--woori-ink-subtle)" }}
        >
          {playlist.entries.length} 곡 · 총 {fmt(totalDur)}
        </p>

        {tracks.length > 0 && (
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => play(0, false)}
              className="inline-flex h-10 items-center rounded-full px-5 text-sm font-bold transition hover:opacity-90"
              style={{
                background: "var(--woori-ink)",
                color: "var(--woori-paper)",
              }}
            >
              ▶ 전체 재생
            </button>
            <button
              onClick={() => play(Math.floor(Math.random() * tracks.length), true)}
              className="inline-flex h-10 items-center rounded-full border px-5 text-sm font-bold transition"
              style={{
                borderColor: "var(--woori-ink)",
                color: "var(--woori-ink)",
              }}
            >
              ⇄ 셔플 재생
            </button>
          </div>
        )}
      </div>

      {tracks.length === 0 ? (
        <div
          className="rounded-md border p-12 text-center"
          style={{
            borderColor: "var(--woori-ink-hairline)",
            background: "var(--woori-white)",
            color: "var(--woori-ink-subtle)",
          }}
        >
          <p className="text-sm">
            아직 트랙이 없어요.
            <br />
            앨범 상세 화면의 트랙 우측 메뉴(⋮)에서 추가해주세요.
          </p>
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "var(--woori-ink-hairline)" }}>
          {tracks.map((t, i) => {
            const isCur =
              player.album?.id === `playlist:${playlist.id}` &&
              player.currentIndex === i;
            return (
              <li
                key={`${t.sourceAlbumId}:${t.id}:${i}`}
                className="flex items-center gap-4 py-3"
                style={{ borderColor: "var(--woori-ink-hairline)" }}
              >
                <button
                  onClick={() => play(i, false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:opacity-80"
                  style={{
                    background: isCur ? "var(--woori-ink)" : "var(--woori-paper-soft, #ECE9E1)",
                    color: isCur ? "var(--woori-paper)" : "var(--woori-ink)",
                  }}
                  aria-label="이 트랙부터 재생"
                >
                  {isCur ? (player.isPlaying ? "▶" : "⏸") : i + 1}
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-base font-semibold"
                    style={{ color: "var(--woori-ink)" }}
                  >
                    {t.title}
                  </p>
                  <p
                    className="mt-0.5 truncate text-xs"
                    style={{ color: "var(--woori-ink-subtle)" }}
                  >
                    {t.artist}
                  </p>
                </div>
                <span
                  className="text-xs tabular-nums"
                  style={{ color: "var(--woori-ink-subtle)" }}
                >
                  {fmt(t.durationSeconds)}
                </span>
                <button
                  onClick={() => removeAt(i)}
                  className="rounded-full px-2 py-1 text-xs transition hover:opacity-100"
                  style={{
                    color: "var(--woori-ink-subtle)",
                    opacity: 0.6,
                  }}
                  aria-label="플레이리스트에서 제거"
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
