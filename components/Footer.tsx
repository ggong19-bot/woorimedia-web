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

  return (
    <footer className="border-t border-divider/60 bg-bg-soft">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              src="/logo/woorimedia-horizontal.svg"
              alt="우리미디어"
              width={160}
              height={32}
              className="wm-logo-adaptive"
              style={{ height: 32, width: "auto" }}
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
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-deep">
              제품
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              <li>
                <Link href="/product" className="hover:text-navy-deep">
                  제품 개요
                </Link>
              </li>
              <li>
                <a
                  href="https://play.woori-media.com"
                  className="hover:text-navy-deep"
                >
                  웹 플레이어
                </a>
              </li>
              <li>
                <Link href="/partners" className="hover:text-navy-deep">
                  파트너 발주
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-deep">
              회사
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              <li>
                <Link href="/company" className="hover:text-navy-deep">
                  우리미디어 소개
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-navy-deep">
                  고객 지원
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@woorimedia.com"
                  className="hover:text-navy-deep"
                >
                  contact@woorimedia.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-divider/60 pt-6 text-xs text-text-dim md:flex-row md:items-center">
          <p>© 2026 WooriMedia. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/support#terms" className="hover:text-navy-deep">
              이용약관
            </Link>
            <Link href="/support#privacy" className="hover:text-navy-deep">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
