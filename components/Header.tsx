"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "홈" },
  { href: "/product", label: "제품" },
  { href: "/partners", label: "파트너" },
  { href: "/company", label: "회사 소개" },
  { href: "/support", label: "지원" },
];

// 플레이어 영역 (/play, /pair) 은 자체 헤더 사용 — Header/Footer 숨김.
// 호스트 분기 (woori-media.com vs play.woori-media.com) 는 middleware 가 처리.
const PLAYER_PATHS = ["/play", "/pair"];

export default function Header() {
  const path = usePathname();
  const isPlayer = PLAYER_PATHS.some(
    (p) => path === p || path.startsWith(p + "/"),
  );
  if (isPlayer) return null;

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-md"
      style={{
        background: "rgba(246, 244, 239, 0.85)",
        borderBottom: "1px solid var(--woori-ink-hairline)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center" aria-label="우리미디어">
          {/* 가로 lockup — 마크 + "우리미디어" 한글 워드마크 일체 */}
          <Image
            src="/logo/woorimedia-horizontal.svg"
            alt="우리미디어"
            width={140}
            height={28}
            priority
            style={{ height: 28, width: "auto" }}
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold transition"
                style={{
                  color: active
                    ? "var(--woori-ink)"
                    : "var(--woori-ink-subtle)",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* 절대 URL — 마케팅(woori-media.com)에서 플레이어(play.woori-media.com)로 이동.
            middleware 가 cross-domain redirect 도 처리하지만, 처음부터 정확한 호스트로
            가서 1 hop 절약. */}
        <a
          href="https://play.woori-media.com/play"
          className="inline-flex h-10 items-center rounded-full px-5 text-sm font-bold transition"
          style={{
            background: "var(--woori-ink)",
            color: "var(--woori-paper)",
          }}
        >
          내 라이브러리 →
        </a>
      </div>
    </header>
  );
}
