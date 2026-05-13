"use client";

// TV/헤드리스 디바이스 페어링 — 폰 측 승인 페이지.
// TV 가 발급한 userCode (예: ABCD-EFGH) 를 사용자가 폰에서 입력하거나
// QR 로 ?code= 파라미터로 도착. 로그인된 상태여야 승인 가능.

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth_context";
import { api, ApiError } from "@/lib/api";

type PreviewState = {
  clientName?: string | null;
  expiresAt?: string;
};

export default function PairPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, ready } = useAuth();

  // ?code=ABCD-EFGH 로 들어온 경우 자동 채움. 없으면 사용자 입력.
  const initialCode = useMemo(
    () => (params.get("code") || "").toUpperCase(),
    [params],
  );
  const [code, setCode] = useState(initialCode);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [status, setStatus] = useState<
    "idle" | "previewing" | "approving" | "approved" | "denied" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  // 로그인 안 됐으면 로그인 → 돌아옴 redirect 유지
  useEffect(() => {
    if (!ready) return;
    if (!user) {
      const back = `/pair${initialCode ? `?code=${encodeURIComponent(initialCode)}` : ""}`;
      router.replace(`/play/login?redirect=${encodeURIComponent(back)}`);
    }
  }, [ready, user, router, initialCode]);

  // 자동 미리보기 — code 가 형식 갖추면 backend 에 페어링 정보 요청
  useEffect(() => {
    if (!user) return;
    const normalized = code.replace(/[^A-Z0-9-]/g, "").toUpperCase();
    if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(normalized)) {
      setPreview(null);
      return;
    }
    let cancelled = false;
    setStatus("previewing");
    setError(null);
    api
      .verifyDeviceCode(normalized)
      .then((res) => {
        if (cancelled) return;
        setPreview({
          clientName: res.clientName ?? null,
          expiresAt: res.expiresAt,
        });
        setStatus("idle");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setPreview(null);
        setStatus("error");
        setError(friendlyError(e));
      });
    return () => {
      cancelled = true;
    };
  }, [code, user]);

  async function approve() {
    if (status === "approving") return;
    setStatus("approving");
    setError(null);
    try {
      await api.verifyDeviceCode(code, true);
      setStatus("approved");
    } catch (e) {
      setStatus("error");
      setError(friendlyError(e));
    }
  }

  async function deny() {
    if (status === "approving") return;
    setStatus("approving");
    setError(null);
    try {
      await api.verifyDeviceCode(code, false);
      setStatus("denied");
    } catch (e) {
      setStatus("error");
      setError(friendlyError(e));
    }
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#0A0A0A",
        color: "white",
        padding: "32px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: "#F6F4EF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 26,
              color: "#0A0A0A",
            }}
          >
            W
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>우리미디어</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
              TV 연결
            </div>
          </div>
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 900,
            marginTop: 28,
            marginBottom: 6,
          }}
        >
          TV 에 로그인
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: 0 }}>
          TV 화면에 표시된 연결 코드를 입력하면 같은 계정으로 TV 가 자동 로그인
          됩니다.
        </p>

        {status === "approved" ? (
          <SuccessCard onClose={() => router.push("/play")} />
        ) : status === "denied" ? (
          <DeniedCard onClose={() => router.push("/play")} />
        ) : (
          <Form
            code={code}
            onChange={(v) => setCode(v.toUpperCase())}
            preview={preview}
            status={status}
            error={error}
            user={user}
            onApprove={approve}
            onDeny={deny}
          />
        )}

        <div
          style={{
            marginTop: 32,
            paddingTop: 18,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.4)",
            fontSize: 11,
            lineHeight: 1.7,
          }}
        >
          승인하면 현재 로그인된 계정의 라이브러리가 TV 에서 보입니다. 공용
          TV·호텔 객실 등에서는 다 본 후 TV 측 마이페이지 → 로그아웃 으로
          세션을 종료해 주세요.
        </div>
      </div>
    </main>
  );
}

function Form({
  code,
  onChange,
  preview,
  status,
  error,
  user,
  onApprove,
  onDeny,
}: {
  code: string;
  onChange: (v: string) => void;
  preview: PreviewState | null;
  status: string;
  error: string | null;
  user: { displayName?: string; email: string } | null;
  onApprove: () => void;
  onDeny: () => void;
}) {
  const valid = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code);
  return (
    <div style={{ marginTop: 24 }}>
      <label
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.5)",
          fontWeight: 700,
          letterSpacing: 1.2,
        }}
      >
        연결 코드
      </label>
      <input
        type="text"
        inputMode="text"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder="ABCD-EFGH"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        style={{
          marginTop: 8,
          width: "100%",
          padding: "16px 18px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 12,
          color: "white",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 4,
          fontFamily: "ui-monospace, monospace",
          textAlign: "center",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      {error && (
        <div
          style={{
            marginTop: 12,
            padding: "12px 14px",
            background: "rgba(255, 80, 80, 0.12)",
            border: "1px solid rgba(255, 80, 80, 0.3)",
            color: "#FFB0B0",
            borderRadius: 10,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {preview && status !== "approving" && (
        <div
          style={{
            marginTop: 18,
            padding: 16,
            background: "rgba(246, 244, 239, 0.08)",
            border: "1px solid rgba(246, 244, 239, 0.30)",
            borderRadius: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: 1.2,
              fontWeight: 700,
            }}
          >
            연결 대기 중인 기기
          </div>
          <div style={{ marginTop: 6, fontSize: 16, fontWeight: 800 }}>
            {preview.clientName || "우리미디어 TV"}
          </div>
          {user && (
            <div
              style={{
                marginTop: 14,
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.45)" }}>로그인 계정 ·</span>{" "}
              {user.displayName || user.email}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
        <button
          disabled={!valid || status === "approving"}
          onClick={onApprove}
          style={{
            flex: 1,
            padding: "16px 18px",
            background:
              !valid || status === "approving"
                ? "rgba(246, 244, 239, 0.35)"
                : "#F6F4EF",
            color: "#0A0A0A",
            border: "none",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 900,
            cursor: !valid ? "not-allowed" : "pointer",
          }}
        >
          {status === "approving" ? "처리 중..." : "TV 에 로그인"}
        </button>
        <button
          disabled={!valid || status === "approving"}
          onClick={onDeny}
          style={{
            padding: "16px 18px",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: !valid ? "not-allowed" : "pointer",
          }}
        >
          거부
        </button>
      </div>
    </div>
  );
}

function SuccessCard({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        marginTop: 24,
        padding: 28,
        background: "rgba(80, 220, 130, 0.08)",
        border: "1px solid rgba(80, 220, 130, 0.35)",
        borderRadius: 16,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 44 }}>✓</div>
      <div
        style={{
          marginTop: 8,
          fontSize: 20,
          fontWeight: 900,
        }}
      >
        TV 로그인 완료
      </div>
      <div
        style={{
          marginTop: 6,
          color: "rgba(255,255,255,0.6)",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        TV 화면이 곧 라이브러리로 전환됩니다.
        <br />
        이 페이지는 닫으셔도 됩니다.
      </div>
      <button
        onClick={onClose}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        확인
      </button>
    </div>
  );
}

function DeniedCard({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        marginTop: 24,
        padding: 28,
        background: "rgba(255, 120, 120, 0.08)",
        border: "1px solid rgba(255, 120, 120, 0.3)",
        borderRadius: 16,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 44 }}>✕</div>
      <div style={{ marginTop: 8, fontSize: 20, fontWeight: 900 }}>
        TV 연결을 거부했습니다
      </div>
      <button
        onClick={onClose}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        확인
      </button>
    </div>
  );
}

function friendlyError(e: unknown): string {
  if (e instanceof ApiError) {
    if (e.code === "USER_CODE_NOT_FOUND") return "유효하지 않은 코드입니다.";
    if (e.code === "expired_token") return "코드가 만료되었습니다. TV 에서 새 코드를 발급해 주세요.";
    if (e.code === "ALREADY_RESOLVED")
      return "이미 처리된 코드입니다. TV 에서 새 코드를 발급해 주세요.";
    if (e.status === 401) return "로그인이 필요합니다.";
    return e.message;
  }
  return e instanceof Error ? e.message : String(e);
}
