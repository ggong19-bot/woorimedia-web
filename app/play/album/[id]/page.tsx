"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { fmt, usePlayer } from "@/lib/player_context";
import type { AlbumDetail, Track } from "@/lib/types";
import { PlaylistStore, type Playlist } from "@/lib/playlist_store";
import Mark from "@/components/Mark";
import AlbumCover from "@/components/AlbumCover";

export default function PlayAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addToPlaylistTrack, setAddToPlaylistTrack] = useState<Track | null>(null);
  const player = usePlayer();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    setAlbum(null);
    setError(null);
    api
      .album(id)
      .then((res) => {
        if (!cancelled) setAlbum(res);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const msg =
          e instanceof ApiError
            ? e.code === "NOT_ACTIVATED"
              ? "이 앨범에 대한 등록 기록이 없습니다. 시리얼을 먼저 등록해주세요."
              : e.code === "ALBUM_NOT_FOUND"
                ? "앨범을 찾을 수 없습니다."
                : e.message
            : "앨범을 불러오지 못했습니다.";
        setError(msg);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="py-20 text-center">
        <p
          className="text-sm"
          style={{ color: "var(--woori-ink-subtle)" }}
        >
          {error}
        </p>
        <button
          onClick={() => router.push("/play")}
          className="mt-4 rounded-full border border-divider px-4 py-2 text-sm"
        >
          라이브러리로
        </button>
      </div>
    );
  }

  if (!album) {
    return <AlbumSkeleton />;
  }

  const playing = player.current();

  function play(idx: number) {
    if (album) player.setQueue(album, idx);
  }

  return (
    <div>
      {/* 앨범 → 라이브러리 뒤로가기 (좌상단) */}
      <button
        onClick={() => router.push("/play")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
        style={{ color: "var(--woori-ink-subtle)" }}
      >
        <span aria-hidden>←</span> 라이브러리
      </button>
      {/* Hero — dark 톤 (ink bg + paper text) — 라이트/다크 모드 동일 */}
      <section
        className="-mx-6 mb-8 px-6 py-12 md:-mx-6"
        style={{ background: "var(--woori-ink)", color: "var(--woori-paper)" }}
      >
        <div className="flex flex-col gap-6">
          {/* 커버 — coverUrl 있으면 이미지, 없으면 마크 placeholder */}
          <AlbumCover
            coverUrl={album.coverUrl}
            alt={album.title}
            className="w-44 shrink-0"
            markSize={96}
          />
          <div className="min-w-0 flex-1">
            {album.edition?.label && (
              <span
                className="inline-flex items-center gap-1 whitespace-nowrap px-2 py-1 text-[11px] font-medium uppercase"
                style={{
                  background: "var(--woori-paper)",
                  color: "var(--woori-ink)",
                  letterSpacing: "0.16em",
                }}
              >
                {album.edition.label} #{album.edition.number}/
                {album.edition.total}
              </span>
            )}
            <p
              className="mt-3 truncate text-sm font-semibold"
              style={{ color: "rgba(246,244,239,0.85)" }}
            >
              {album.artist}
            </p>
            <h1
              className="text-2xl font-extrabold leading-tight tracking-tight break-keep"
              style={{ color: "var(--woori-paper)" }}
            >
              {album.title}
            </h1>
            <p
              className="mt-3 text-sm"
              style={{ color: "rgba(246,244,239,0.6)" }}
            >
              {album.audioSpec.format} · {album.audioSpec.bitDepth}-bit ·{" "}
              {Math.round(album.audioSpec.sampleRateHz / 1000)}kHz ·{" "}
              {album.tracks.length}곡
              {album.videoResolution ? ` · ${album.videoResolution} 영상` : ""}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => play(0)}
                className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-bold transition hover:opacity-90"
                style={{
                  background: "var(--woori-paper)",
                  color: "var(--woori-ink)",
                }}
              >
                ▶ 처음부터 재생
              </button>
              <button
                onClick={() => {
                  if (!album) return;
                  player.setQueue(
                    album,
                    Math.floor(Math.random() * album.tracks.length),
                  );
                  if (!player.shuffle) player.toggleShuffle();
                }}
                className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-full border px-4 text-sm font-bold transition hover:opacity-90"
                style={{
                  borderColor: "rgba(246,244,239,0.3)",
                  background: "rgba(246,244,239,0.05)",
                  color: "var(--woori-paper)",
                }}
              >
                ⇄ 셔플 재생
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Track list */}
      <section>
        <ul
          className="overflow-hidden border"
          style={{
            borderColor: "var(--woori-ink-hairline)",
            background: "var(--woori-white)",
          }}
        >
          {album.tracks.map((t) => {
            const isCur = playing?.id === t.id;
            return (
              <li
                key={t.id}
                className="flex cursor-pointer items-center gap-4 border-b px-5 py-3 transition last:border-b-0"
                style={{
                  borderColor: "var(--woori-ink-hairline)",
                  background: isCur
                    ? "rgba(10,10,10,0.04)"
                    : "transparent",
                }}
                onClick={() =>
                  play(album.tracks.findIndex((x) => x.id === t.id))
                }
              >
                <span
                  className="w-7 text-center font-mono text-sm font-bold"
                  style={{
                    color: isCur
                      ? "var(--woori-ink)"
                      : "var(--woori-ink-subtle)",
                  }}
                >
                  {isCur ? (player.isPlaying ? "▶" : "⏸") : t.trackNumber}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-sm font-bold"
                    style={{ color: "var(--woori-ink)" }}
                  >
                    {t.title}
                  </p>
                  <p
                    className="truncate text-xs"
                    style={{ color: "var(--woori-ink-subtle)" }}
                  >
                    {t.artist}
                  </p>
                </div>
                <span
                  className="shrink-0 font-mono text-xs"
                  style={{ color: "var(--woori-ink-subtle)" }}
                >
                  {fmt(t.durationSeconds)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddToPlaylistTrack(t);
                  }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition hover:opacity-100"
                  style={{
                    color: "var(--woori-ink-subtle)",
                    opacity: 0.6,
                  }}
                  aria-label="플레이리스트에 추가"
                  title="플레이리스트에 추가"
                >
                  +
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {addToPlaylistTrack && (
        <AddToPlaylistSheet
          albumId={album.id}
          track={addToPlaylistTrack}
          onClose={() => setAddToPlaylistTrack(null)}
        />
      )}
    </div>
  );
}

// 플레이리스트 추가 시트 — 기존 목록 선택 or 새로 만들기.
function AddToPlaylistSheet({
  albumId,
  track,
  onClose,
}: {
  albumId: string;
  track: Track;
  onClose: () => void;
}) {
  const [list, setList] = useState<Playlist[]>([]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    return PlaylistStore.subscribe(setList);
  }, []);

  function addTo(playlistId: string) {
    PlaylistStore.addEntry(playlistId, {
      albumId,
      trackId: track.id,
      titleSnapshot: track.title,
      artistSnapshot: track.artist,
      durationSecondsSnapshot: track.durationSeconds,
    });
    onClose();
  }

  function createAndAdd() {
    const n = name.trim();
    if (!n) return;
    const p = PlaylistStore.create(n);
    addTo(p.id);
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-white p-5 sm:rounded-2xl"
        style={{ background: "var(--woori-paper)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-lg font-extrabold"
          style={{ color: "var(--woori-ink)" }}
        >
          플레이리스트에 추가
        </h2>
        <p
          className="mt-1 truncate text-xs"
          style={{ color: "var(--woori-ink-subtle)" }}
        >
          {track.title} · {track.artist}
        </p>

        {creating ? (
          <div className="mt-4">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") createAndAdd();
                if (e.key === "Escape") {
                  setCreating(false);
                  setName("");
                }
              }}
              placeholder="새 플레이리스트 이름"
              className="w-full border-b bg-transparent py-2 text-base outline-none"
              style={{
                borderColor: "var(--woori-ink-hairline)",
                color: "var(--woori-ink)",
              }}
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => {
                  setCreating(false);
                  setName("");
                }}
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{ color: "var(--woori-ink-subtle)" }}
              >
                취소
              </button>
              <button
                onClick={createAndAdd}
                disabled={!name.trim()}
                className="rounded-full px-4 py-1.5 text-sm font-bold disabled:opacity-40"
                style={{
                  background: "var(--woori-ink)",
                  color: "var(--woori-paper)",
                }}
              >
                만들고 추가
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => setCreating(true)}
              className="mt-4 w-full rounded-md border-2 border-dashed py-3 text-sm font-bold transition hover:opacity-80"
              style={{
                borderColor: "var(--woori-ink-hairline)",
                color: "var(--woori-ink)",
              }}
            >
              + 새 플레이리스트 만들기
            </button>
            {list.length > 0 && (
              <ul
                className="mt-4 max-h-80 divide-y overflow-y-auto"
                style={{ borderColor: "var(--woori-ink-hairline)" }}
              >
                {list.map((p) => (
                  <li
                    key={p.id}
                    style={{ borderColor: "var(--woori-ink-hairline)" }}
                  >
                    <button
                      onClick={() => addTo(p.id)}
                      className="flex w-full items-center justify-between py-3 text-left transition hover:opacity-80"
                    >
                      <span
                        className="truncate text-sm font-semibold"
                        style={{ color: "var(--woori-ink)" }}
                      >
                        {p.name}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--woori-ink-subtle)" }}
                      >
                        {p.entries.length} 곡
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-full py-2.5 text-sm font-bold"
              style={{ color: "var(--woori-ink-subtle)" }}
            >
              닫기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function AlbumSkeleton() {
  return (
    <div>
      <section
        className="-mx-6 mb-8 px-6 py-12"
        style={{ background: "var(--woori-ink)" }}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end">
          <div
            className="aspect-square w-48 shrink-0 animate-pulse md:w-56"
            style={{ background: "rgba(246,244,239,0.1)" }}
          />
          <div className="flex-1 space-y-3">
            <div
              className="h-5 w-32 animate-pulse"
              style={{ background: "rgba(246,244,239,0.15)" }}
            />
            <div
              className="h-10 w-2/3 animate-pulse"
              style={{ background: "rgba(246,244,239,0.15)" }}
            />
            <div
              className="h-3 w-1/2 animate-pulse"
              style={{ background: "rgba(246,244,239,0.1)" }}
            />
          </div>
        </div>
      </section>
      <ul
        className="overflow-hidden border"
        style={{
          borderColor: "var(--woori-ink-hairline)",
          background: "var(--woori-white)",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center gap-4 border-b px-5 py-3 last:border-b-0"
            style={{ borderColor: "var(--woori-ink-hairline)" }}
          >
            <div
              className="h-4 w-4 animate-pulse"
              style={{ background: "var(--woori-paper-soft, #ECE9E1)" }}
            />
            <div className="flex-1 space-y-1">
              <div
                className="h-3 w-1/2 animate-pulse"
                style={{ background: "var(--woori-paper-soft, #ECE9E1)" }}
              />
              <div
                className="h-2 w-1/3 animate-pulse"
                style={{ background: "var(--woori-paper-soft, #ECE9E1)" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
