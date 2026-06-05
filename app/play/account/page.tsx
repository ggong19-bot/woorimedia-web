"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";

const PROVIDER_META: Record<string, { label: string; bg: string; fg: string }> = {
  kakao: { label: "카카오", bg: "#FEE500", fg: "#191919" },
  naver: { label: "네이버", bg: "#03C75A", fg: "#FFFFFF" },
  google: { label: "Google", bg: "#FFFFFF", fg: "#1F1F1F" },
  apple: { label: "Apple", bg: "#000000", fg: "#FFFFFF" },
};

type Identity = {
  provider: string;
  maskedEmail: string | null;
  linkedAt: string;
  lastSeenAt: string;
};

export default function AccountPage() {
  const [identities, setIdentities] = useState<Identity[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function load() {
    try {
      const res = await api.identities();
      setIdentities(res.identities);
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "연결 정보를 불러오지 못했습니다.");
      setIdentities([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function unlink(provider: string) {
    if (busy) return;
    const label = PROVIDER_META[provider]?.label || provider;
    if (!window.confirm(`${label} 연결을 해제할까요?`)) return;
    setBusy(provider);
    try {
      await api.unlinkIdentity(provider);
      await load();
    } catch (e: unknown) {
      window.alert(e instanceof ApiError ? e.message : "해제에 실패했습니다.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto max-w-[450px]">
      <div className="mb-8">
        <p
          className="text-xs font-extrabold uppercase"
          style={{ color: "var(--woori-ink-subtle)", letterSpacing: "0.28em" }}
        >
          Account
        </p>
        <h1
          className="mt-2 text-3xl font-extrabold tracking-tight"
          style={{ color: "var(--woori-ink)" }}
        >
          연결된 로그인
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--woori-ink-subtle)" }}>
          이 계정에 연결된 소셜 로그인입니다. 어느 것으로 로그인해도 같은
          라이브러리가 열립니다.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {identities === null ? (
        <p className="text-sm" style={{ color: "var(--woori-ink-subtle)" }}>
          불러오는 중…
        </p>
      ) : identities.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--woori-ink-subtle)" }}>
          연결된 소셜 로그인이 없습니다.
        </p>
      ) : (
        <div className="space-y-3">
          {identities.map((it) => {
            const meta = PROVIDER_META[it.provider] || {
              label: it.provider,
              bg: "#E5E5E5",
              fg: "#111111",
            };
            const isLast = identities.length <= 1;
            return (
              <div
                key={it.provider}
                className="flex items-center justify-between rounded-xl border p-4"
                style={{
                  borderColor: "var(--woori-ink-hairline)",
                  background: "var(--woori-white)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold"
                    style={{ background: meta.bg, color: meta.fg }}
                  >
                    {meta.label.slice(0, 1)}
                  </span>
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: "var(--woori-ink)" }}
                    >
                      {meta.label}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--woori-ink-subtle)" }}
                    >
                      {it.maskedEmail || "이메일 비공개"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => unlink(it.provider)}
                  disabled={!!busy || isLast}
                  title={isLast ? "마지막 로그인 수단은 해제할 수 없습니다" : undefined}
                  className="rounded-full border px-3 py-1.5 text-xs font-bold transition hover:opacity-80 disabled:opacity-40"
                  style={{
                    borderColor: "var(--woori-ink-hairline)",
                    color: "var(--woori-ink)",
                  }}
                >
                  {busy === it.provider ? "…" : "해제"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <p
        className="mt-8 text-xs leading-relaxed"
        style={{ color: "var(--woori-ink-subtle)" }}
      >
        다른 소셜 계정 추가 연결은 <strong>우리미디어 앱</strong>에서 가능합니다.
        (웹 추가 연결 기능은 곧 지원 예정)
      </p>
    </div>
  );
}
