"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "홈" },
  { href: "/product", label: "제품" },
  { href: "/partners", label: "파트너" },
  { href: "/company", label: "회사 소개" },
  { href: "/support", label: "지원" },
];

export default function Header() {
  const path = usePathname();
  const isPlay = path.startsWith("/play");
  if (isPlay) return null; // 웹 플레이어 자체 헤더 사용

  return (
    <header className="sticky top-0 z-40 w-full border-b border-divider/60 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="w-mark">W</span>
          <span className="text-base font-extrabold tracking-tight text-navy-deep">
            우리미디어
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-semibold transition ${
                  active
                    ? "text-navy-deep"
                    : "text-text-muted hover:text-navy-deep"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/play"
          className="inline-flex h-10 items-center rounded-full bg-navy-deep px-5 text-sm font-bold text-white transition hover:bg-navy-mid"
        >
          내 라이브러리 →
        </Link>
      </div>
    </header>
  );
}
