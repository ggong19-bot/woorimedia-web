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

      <MergeSection onMerged={load} />

      <p
        className="mt-6 text-xs leading-relaxed"
        style={{ color: "var(--woori-ink-subtle)" }}
      >
        소셜 <strong>추가 연결</strong>(카카오·구글 등 한 번에 묶기)은{" "}
        <strong>우리미디어 앱</strong>에서 가능합니다.
      </p>
    </div>
  );
}

function MergeSection({ onMerged }: { onMerged: () => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function mergeErr(e: unknown): string {
    if (e instanceof ApiError) {
      switch (e.code) {
        case "ACCOUNT_NOT_FOUND":
          return "그 이메일로 가입된 계정이 없습니다.";
        case "SAME_ACCOUNT":
          return "지금 로그인한 계정과 같은 계정입니다.";
        case "EMAIL_SEND_FAILED":
          return "메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.";
        case "INVALID_OR_EXPIRED_CODE":
          return "코드가 틀리거나 만료됐습니다. 다시 받아주세요.";
      }
      return e.message;
    }
    return "처리 중 오류가 발생했습니다.";
  }

  async function sendCode() {
    const em = email.trim();
    if (!em.includes("@")) {
      setError("이메일을 정확히 입력해주세요.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await api.requestMergeCode(em);
      const usb = r.otherAccount?.usbCount ?? 0;
      setInfo(
        `USB ${usb}장이 연결된 계정입니다. ${r.maskedEmail || "메일"}(으)로 보낸 6자리 코드를 입력해주세요.`,
      );
      setCodeSent(true);
    } catch (e: unknown) {
      setError(mergeErr(e));
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    if (code.trim().length < 4) {
      setError("코드를 입력해주세요.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await api.verifyMergeCode(email.trim(), code.trim());
      setDone(true);
      onMerged();
    } catch (e: unknown) {
      setError(mergeErr(e));
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div
        className="mt-8 rounded-xl border p-4 text-sm"
        style={{
          borderColor: "var(--woori-ink-hairline)",
          background: "var(--woori-white)",
          color: "var(--woori-ink)",
        }}
      >
        ✅ 계정을 통합했습니다. 상대 계정의 USB·기록을 이 계정으로 가져왔어요.
      </div>
    );
  }

  return (
    <div
      className="mt-8 rounded-xl border p-4"
      style={{
        borderColor: "var(--woori-ink-hairline)",
        background: "var(--woori-white)",
      }}
    >
      <h2 className="text-sm font-bold" style={{ color: "var(--woori-ink)" }}>
        다른 계정과 통합
      </h2>
      <p className="mt-1 text-xs" style={{ color: "var(--woori-ink-subtle)" }}>
        다른 계정의 이메일로 인증코드를 받아, 그 계정의 USB·기록을 이 계정으로
        가져옵니다.
      </p>

      {!codeSent ? (
        <div className="mt-3 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
            placeholder="상대 계정 이메일"
            className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--woori-ink-hairline)",
              color: "var(--woori-ink)",
            }}
          />
          <button
            onClick={sendCode}
            disabled={busy}
            className="rounded-lg px-3 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-40"
            style={{ background: "var(--woori-ink)" }}
          >
            {busy ? "…" : "코드 받기"}
          </button>
        </div>
      ) : (
        <div className="mt-3">
          {info && (
            <p
              className="mb-2 text-xs"
              style={{ color: "var(--woori-ink-subtle)" }}
            >
              {info}
            </p>
          )}
          <div className="flex gap-2">
            <input
              inputMode="numeric"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              disabled={busy}
              placeholder="인증코드 6자리"
              className="flex-1 rounded-lg border px-3 py-2 text-sm tracking-widest outline-none"
              style={{
                borderColor: "var(--woori-ink-hairline)",
                color: "var(--woori-ink)",
              }}
            />
            <button
              onClick={verify}
              disabled={busy}
              className="rounded-lg px-3 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-40"
              style={{ background: "var(--woori-ink)" }}
            >
              {busy ? "…" : "통합하기"}
            </button>
          </div>
          <p
            className="mt-2 text-[11px]"
            style={{ color: "var(--woori-ink-subtle)" }}
          >
            이 계정으로 USB·기록이 옮겨지고, 상대 계정은 삭제됩니다.
          </p>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs" style={{ color: "#D9534F" }}>
          {error}
        </p>
      )}
    </div>
  );
}
