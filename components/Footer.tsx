"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();
  if (path.startsWith("/play")) return null;

  return (
    <footer className="border-t border-divider/60 bg-bg-soft">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="w-mark">W</span>
              <span className="text-base font-extrabold text-navy-deep">
                우리미디어
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              한정판 무손실 음원의 새로운 정의. USB 1개로 인증, 어디서든
              재생, 평생 소장.
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
                <Link href="/play" className="hover:text-navy-deep">
                  웹 플레이어
                </Link>
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
