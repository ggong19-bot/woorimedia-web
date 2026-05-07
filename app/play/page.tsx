"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { LibraryAlbum } from "@/lib/types";

export default function PlayLibraryPage() {
  const [albums, setAlbums] = useState<LibraryAlbum[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showActivate, setShowActivate] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setAlbums(null);
    setError(null);
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
  }, [reloadKey]);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
            MY LIBRARY
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-deep">
            내 라이브러리
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            {albums === null
              ? "불러오는 중…"
              : `등록된 한정판 USB · ${albums.length}장`}
          </p>
        </div>
        <button
          onClick={() => setShowActivate(true)}
          className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-extrabold text-navy-deep transition hover:brightness-110"
        >
          + 시리얼 등록
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {albums === null ? (
        <LibrarySkeleton />
      ) : albums.length === 0 ? (
        <EmptyLibrary onActivate={() => setShowActivate(true)} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((a) => (
            <Link
              key={a.id}
              href={`/play/album/${a.id}`}
              className="group overflow-hidden rounded-2xl border border-divider bg-white transition hover:border-gold-main hover:shadow-lg hover:shadow-gold-main/10"
            >
              <div className="bg-navy-gradient relative aspect-square">
                {a.edition?.number && a.edition?.total && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-1 text-[10px] font-extrabold text-navy-deep">
                    ★ #{a.edition.number}/{a.edition.total}
                  </div>
                )}
                <div className="flex h-full items-center justify-center">
                  <span className="bg-gold-gradient flex h-20 w-20 items-center justify-center rounded-full text-4xl text-navy-deep">
                    ♪
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/30 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                  {a.audioSpec.format} · {a.audioSpec.bitDepth}/
                  {Math.round(a.audioSpec.sampleRateHz / 1000)}
                </div>
              </div>

              <div className="p-5">
                <h3 className="truncate text-base font-extrabold text-navy-deep">
                  {a.title}
                </h3>
                <p className="mt-1 truncate text-xs text-text-muted">
                  {a.artist}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showActivate && (
        <ActivateModal
          onClose={() => setShowActivate(false)}
          onSuccess={() => {
            setShowActivate(false);
            setReloadKey((k) => k + 1);
          }}
        />
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
          className="overflow-hidden rounded-2xl border border-divider bg-white"
        >
          <div className="aspect-square animate-pulse bg-bg-soft" />
          <div className="p-5">
            <div className="h-4 w-3/4 animate-pulse rounded bg-bg-soft" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-bg-soft" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyLibrary({ onActivate }: { onActivate: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-divider bg-white py-16 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-soft text-3xl">
        💿
      </div>
      <h2 className="text-lg font-extrabold text-navy-deep">
        등록된 USB가 없습니다
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
        제품에 동봉된 시리얼 코드를 입력하시면 무손실 음원과 4K 영상을
        스트리밍하실 수 있습니다.
      </p>
      <button
        onClick={onActivate}
        className="mt-6 rounded-full bg-gold-gradient px-6 py-3 text-sm font-extrabold text-navy-deep"
      >
        + 시리얼 등록하기
      </button>
    </div>
  );
}

function ActivateModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [serial, setSerial] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!serial.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      await api.activate(serial.trim().toUpperCase(), {
        platform: "web",
        appVersion: "0.1.0",
      });
      onSuccess();
    } catch (e: unknown) {
      const msg =
        e instanceof ApiError
          ? e.code === "SERIAL_NOT_FOUND"
            ? "유효하지 않은 시리얼입니다."
            : e.code === "SERIAL_ALREADY_ACTIVATED"
              ? "이미 다른 계정에 등록된 USB입니다."
              : e.message
          : "등록 실패 — 네트워크를 확인해주세요.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-extrabold text-navy-deep">USB 시리얼 등록</h2>
        <p className="mt-1 text-xs text-text-muted">
          제품에 동봉된 16자리 코드를 입력해주세요. (예: WMD-DEMO-0001)
        </p>
        <input
          type="text"
          value={serial}
          onChange={(e) => setSerial(e.target.value.toUpperCase())}
          placeholder="WMD-XXXX-XXXX"
          className="mt-4 h-12 w-full rounded-xl border border-divider bg-bg-soft px-4 font-mono text-sm uppercase tracking-widest outline-none focus:border-gold-main"
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          disabled={busy}
          autoFocus
        />
        {error && (
          <p className="mt-3 text-xs font-bold text-red-600">{error}</p>
        )}
        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            disabled={busy}
            className="flex-1 rounded-full border border-divider px-4 py-2.5 text-sm font-extrabold text-text-muted hover:border-navy-deep hover:text-navy-deep disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={submit}
            disabled={busy || !serial.trim()}
            className="flex-1 rounded-full bg-gold-gradient px-4 py-2.5 text-sm font-extrabold text-navy-deep disabled:opacity-60"
          >
            {busy ? "등록 중…" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
