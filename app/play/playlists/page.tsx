"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PlaylistStore, type Playlist } from "@/lib/playlist_store";

export default function PlaylistsPage() {
  const [list, setList] = useState<Playlist[]>([]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    return PlaylistStore.subscribe(setList);
  }, []);

  function onCreate() {
    const n = name.trim();
    if (!n) return;
    PlaylistStore.create(n);
    setName("");
    setCreating(false);
  }

  function onDelete(id: string, name: string) {
    if (!window.confirm(`"${name}" 플레이리스트를 삭제하시겠어요?`)) return;
    PlaylistStore.remove(id);
  }

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
            My Playlists
          </p>
          <h1
            className="mt-2 text-3xl font-extrabold tracking-tight"
            style={{ color: "var(--woori-ink)" }}
          >
            내 플레이리스트
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--woori-ink-subtle)" }}
          >
            구매한 앨범의 트랙들을 모아 플레이리스트로 만드세요.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex h-10 items-center rounded-full px-5 text-sm font-bold transition hover:opacity-90"
          style={{
            background: "var(--woori-ink)",
            color: "var(--woori-paper)",
          }}
        >
          + 새 플레이리스트
        </button>
      </div>

      {creating && (
        <div
          className="mb-8 rounded-md border p-4"
          style={{
            borderColor: "var(--woori-ink-hairline)",
            background: "var(--woori-white)",
          }}
        >
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onCreate();
              if (e.key === "Escape") {
                setCreating(false);
                setName("");
              }
            }}
            placeholder="플레이리스트 이름"
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
              onClick={onCreate}
              disabled={!name.trim()}
              className="rounded-full px-4 py-1.5 text-sm font-bold transition disabled:opacity-40"
              style={{
                background: "var(--woori-ink)",
                color: "var(--woori-paper)",
              }}
            >
              만들기
            </button>
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <div
          className="rounded-md border p-12 text-center"
          style={{
            borderColor: "var(--woori-ink-hairline)",
            background: "var(--woori-white)",
            color: "var(--woori-ink-subtle)",
          }}
        >
          <p className="text-sm">
            아직 만든 플레이리스트가 없어요.
            <br />
            앨범 상세 화면에서 트랙을 추가하거나 위 버튼으로 새로 만드세요.
          </p>
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "var(--woori-ink-hairline)" }}>
          {list.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-3 py-4"
              style={{ borderColor: "var(--woori-ink-hairline)" }}
            >
              <Link
                href={`/play/playlists/${encodeURIComponent(p.id)}`}
                className="min-w-0 flex-1"
              >
                <p
                  className="truncate text-base font-semibold"
                  style={{ color: "var(--woori-ink)" }}
                >
                  {p.name}
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--woori-ink-subtle)" }}
                >
                  {p.entries.length} 곡
                </p>
              </Link>
              <button
                onClick={() => onDelete(p.id, p.name)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold transition hover:opacity-100"
                style={{
                  color: "var(--woori-ink-subtle)",
                  opacity: 0.6,
                }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
