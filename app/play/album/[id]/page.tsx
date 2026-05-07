"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { fmt, usePlayer } from "@/lib/player_context";
import type { AlbumDetail } from "@/lib/types";

export default function PlayAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
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
        <p className="text-sm text-text-muted">{error}</p>
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
      {/* Hero */}
      <section className="bg-navy-gradient -mx-6 mb-8 px-6 py-12 md:-mx-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end">
          <div className="bg-gold-gradient flex aspect-square w-48 shrink-0 items-center justify-center rounded-2xl shadow-2xl shadow-navy-deep/40 md:w-56">
            <span className="text-7xl text-navy-deep">♪</span>
          </div>
          <div className="flex-1">
            {album.edition?.label && (
              <span className="inline-flex items-center gap-1 rounded bg-gold-gradient px-2 py-1 text-[11px] font-extrabold text-navy-deep">
                ★ {album.edition.label} #{album.edition.number}/
                {album.edition.total}
              </span>
            )}
            <p className="mt-3 text-sm font-semibold text-white/85">
              {album.artist}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              {album.title}
            </h1>
            <p className="mt-3 text-sm text-white/60">
              {album.audioSpec.format} · {album.audioSpec.bitDepth}-bit ·{" "}
              {Math.round(album.audioSpec.sampleRateHz / 1000)}kHz ·{" "}
              {album.tracks.length}곡
              {album.videoResolution ? ` · ${album.videoResolution} 영상` : ""}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => play(0)}
                className="bg-gold-gradient inline-flex h-11 items-center rounded-full px-6 text-sm font-extrabold text-navy-deep shadow-lg shadow-gold-main/30 transition hover:brightness-110"
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
                className="inline-flex h-11 items-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20"
              >
                ⇄ 셔플 재생
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Track list */}
      <section>
        <ul className="overflow-hidden rounded-2xl border border-divider bg-white">
          {album.tracks.map((t) => {
            const isCur = playing?.id === t.id;
            return (
              <li
                key={t.id}
                className={`flex cursor-pointer items-center gap-4 border-b border-divider px-5 py-3 last:border-b-0 transition ${
                  isCur ? "bg-gold-main/10" : "hover:bg-bg-soft"
                }`}
                onClick={() =>
                  play(album.tracks.findIndex((x) => x.id === t.id))
                }
              >
                <span
                  className={`w-7 text-center font-mono text-sm font-bold ${
                    isCur ? "text-gold-deep" : "text-text-muted"
                  }`}
                >
                  {isCur ? (player.isPlaying ? "▶" : "⏸") : t.trackNumber}
                </span>
                <div className="flex-1 truncate">
                  <p
                    className={`truncate text-sm font-extrabold ${
                      isCur ? "text-gold-deep" : "text-navy-deep"
                    }`}
                  >
                    {t.title}
                  </p>
                  <p className="truncate text-xs text-text-muted">{t.artist}</p>
                </div>
                <span className="font-mono text-xs text-text-muted">
                  {fmt(t.durationSeconds)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-8 rounded-xl border border-divider bg-white p-5 text-xs text-text-muted">
        <strong className="text-navy-deep">스트리밍 안내:</strong> 음원 데이터는
        백엔드의 활성화 검증을 통과한 사용자에게만 발급됩니다. 현재 프리뷰는
        메타데이터 + 미니플레이어 시뮬레이션으로 구성되어 있으며, 실제 오디오
        디코딩은 다음 단계에서 추가됩니다.
      </div>
    </div>
  );
}

function AlbumSkeleton() {
  return (
    <div>
      <section className="bg-navy-gradient -mx-6 mb-8 px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end">
          <div className="aspect-square w-48 shrink-0 animate-pulse rounded-2xl bg-white/10 md:w-56" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-32 animate-pulse rounded bg-white/15" />
            <div className="h-10 w-2/3 animate-pulse rounded bg-white/15" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </section>
      <ul className="overflow-hidden rounded-2xl border border-divider bg-white">
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center gap-4 border-b border-divider px-5 py-3 last:border-b-0"
          >
            <div className="h-4 w-4 animate-pulse rounded bg-bg-soft" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-1/2 animate-pulse rounded bg-bg-soft" />
              <div className="h-2 w-1/3 animate-pulse rounded bg-bg-soft" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
