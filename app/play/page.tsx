"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { LibraryAlbum } from "@/lib/types";
import Mark from "@/components/Mark";
import AlbumCover from "@/components/AlbumCover";

export default function PlayLibraryPage() {
  const [albums, setAlbums] = useState<LibraryAlbum[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // mount 시 1회 로드 — albums/error 초기값이 이미 null 이라 별도 리셋 불필요.
    api
      .library()
      .then((res) => {
        if (!cancelled) setAlbums(res.albums);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const msg =
          e instanceof ApiError
            ? `${e.message}`
            : "라이브러리를 불러오지 못했습니다.";
        setError(msg);
        setAlbums([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p
            className="text-xs font-extrabold uppercase"
            style={{
              color: "var(--woori-ink-subtle)",
              letterSpacing: "0.28em",
            }}
          >
            My Library
          </p>
          <h1
            className="mt-2 text-3xl font-extrabold tracking-tight"
            style={{ color: "var(--woori-ink)" }}
          >
            내 라이브러리
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--woori-ink-subtle)" }}
          >
            {albums === null
              ? "불러오는 중…"
              : `등록된 한정판 USB · ${albums.length}장`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/play/playlists"
            className="inline-flex h-10 items-center rounded-full border px-4 text-sm font-bold transition hover:opacity-90"
            style={{
              borderColor: "var(--woori-ink-hairline)",
              color: "var(--woori-ink)",
            }}
          >
            ▶ 내 플레이리스트
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {albums === null ? (
        <LibrarySkeleton />
      ) : albums.length === 0 ? (
        <EmptyLibrary />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((a) => (
            <Link
              key={a.id}
              href={`/play/album/${a.id}`}
              className="group overflow-hidden border transition hover:opacity-95"
              style={{
                borderColor: "var(--woori-ink-hairline)",
                background: "var(--woori-white)",
              }}
            >
              <div className="relative aspect-square" style={{ aspectRatio: "1 / 1" }}>
                <AlbumCover
                  className="absolute inset-0 h-full w-full"
                  coverUrl={a.coverUrl}
                  alt={a.title}
                  markSize={80}
                />
                {Boolean(a.edition?.number && a.edition?.total) && (
                  <span
                    className="absolute right-3 top-3 inline-flex items-center px-2 py-1 text-[10px] font-medium uppercase"
                    style={{
                      background: "var(--woori-paper)",
                      color: "var(--woori-ink)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    #{a.edition.number}/{a.edition.total}
                  </span>
                )}
                <div
                  className="absolute bottom-3 right-3 inline-flex items-center px-2 py-0.5 text-[10px] font-bold leading-none"
                  style={{
                    border: "1px solid rgba(246,244,239,0.2)",
                    color: "var(--woori-paper)",
                    background: "rgba(0,0,0,0.3)",
                  }}
                >
                  {a.audioSpec.format} · {a.audioSpec.bitDepth}/
                  {Math.round(a.audioSpec.sampleRateHz / 1000)}
                </div>
              </div>

              <div className="p-5">
                <h3
                  className="truncate text-base font-bold"
                  style={{ color: "var(--woori-ink)" }}
                >
                  {a.title}
                </h3>
                <p
                  className="mt-1 truncate text-xs"
                  style={{ color: "var(--woori-ink-subtle)" }}
                >
                  {a.artist}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function LibrarySkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden border"
          style={{
            borderColor: "var(--woori-ink-hairline)",
            background: "var(--woori-white)",
          }}
        >
          <div
            className="aspect-square animate-pulse"
            style={{ background: "var(--woori-paper-soft, #ECE9E1)" }}
          />
          <div className="p-5">
            <div
              className="h-4 w-3/4 animate-pulse"
              style={{ background: "var(--woori-paper-soft, #ECE9E1)" }}
            />
            <div
              className="mt-2 h-3 w-1/2 animate-pulse"
              style={{ background: "var(--woori-paper-soft, #ECE9E1)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyLibrary() {
  return (
    <div
      className="border border-dashed py-16 text-center"
      style={{
        borderColor: "var(--woori-ink-hairline)",
        background: "var(--woori-white)",
      }}
    >
      <div
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center"
        style={{ color: "var(--woori-ink)" }}
      >
        <span style={{ width: 48, height: 48 }}>
          <Mark />
        </span>
      </div>
      <h2
        className="text-lg font-bold"
        style={{ color: "var(--woori-ink)" }}
      >
        등록된 USB가 없습니다
      </h2>
      <p
        className="mx-auto mt-2 max-w-md text-sm"
        style={{ color: "var(--woori-ink-subtle)" }}
      >
        USB 시리얼 등록은 <strong>Windows · Android · Mac 우리미디어 앱</strong>에서
        가능합니다. 앱에서 한 번 등록하시면, 같은 계정으로 로그인한 이 웹 플레이어에서도
        무손실 음원과 4K 영상을 바로 재생하실 수 있습니다.
      </p>
      <Link
        href="/product"
        className="mt-6 inline-flex h-11 items-center rounded-full px-6 text-sm font-bold transition hover:opacity-90"
        style={{
          background: "var(--woori-ink)",
          color: "var(--woori-paper)",
        }}
      >
        앱 다운로드 안내
      </Link>
    </div>
  );
}
