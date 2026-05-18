"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// 홈(/) 과 플레이어(/play, /pair) 는 자체 footer 를 렌더 — 글로벌 footer 숨김.
const PLAYER_PATHS = ["/play", "/pair"];

export default function Footer() {
  const path = usePathname();
  const hideChrome =
    path === "/" ||
    PLAYER_PATHS.some((p) => path === p || path.startsWith(p + "/"));
  if (hideChrome) return null;

  // 헤딩·hover 톤은 ink 단색 + opacity 로 통일 (옛 gold/navy alias 제거).
  const headingStyle = {
    color: "var(--woori-ink)",
    letterSpacing: "0.22em",
  } as const;
  const linkClass =
    "transition hover:opacity-100 opacity-[0.62]";

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "var(--woori-ink-hairline)",
        background: "var(--woori-paper)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              src="/logo/woorimedia-horizontal.svg"
              alt="우리미디어"
              width={160}
              height={32}
              className="wm-logo-adaptive"
            />
            <p
              className="mt-5 max-w-xs text-sm leading-relaxed"
              style={{ color: "var(--woori-ink-subtle)" }}
            >
              Studio audio. Cinema vision. 원음 그대로, 시네마 그대로. USB
              1개로 인증, 어디서든 재생, 평생 소장.
            </p>
          </div>

          <div>
            <h4
              className="text-xs font-medium uppercase"
              style={headingStyle}
            >
              제품
            </h4>
            <ul
              className="mt-5 space-y-3 text-sm"
              style={{ color: "var(--woori-ink)" }}
            >
              <li>
                <Link href="/product" className={linkClass}>
                  제품 개요
                </Link>
              </li>
              <li>
                <a
                  href="https://play.woori-media.com"
                  className={linkClass}
                >
                  웹 플레이어
                </a>
              </li>
              <li>
                <Link href="/partners" className={linkClass}>
                  파트너 발주
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-medium uppercase"
              style={headingStyle}
            >
              회사
            </h4>
            <ul
              className="mt-5 space-y-3 text-sm"
              style={{ color: "var(--woori-ink)" }}
            >
              <li>
                <Link href="/company" className={linkClass}>
                  우리미디어 소개
                </Link>
              </li>
              <li>
                <Link href="/support" className={linkClass}>
                  고객 지원
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@woorimedia.com"
                  className={linkClass}
                >
                  contact@woorimedia.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs md:flex-row md:items-center"
          style={{
            borderColor: "var(--woori-ink-hairline)",
            color: "var(--woori-ink-subtle)",
          }}
        >
          <p>© 2026 WOORIMEDIA Co., Ltd.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
            <span>woori-media.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
