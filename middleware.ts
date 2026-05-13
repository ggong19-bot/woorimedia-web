// 호스트 기반 라우트 분기 — 같은 코드베이스, 두 도메인.
//
//   woori-media.com / www.woori-media.com  →  마케팅만 (홈/제품/회사/파트너/지원)
//   play.woori-media.com                    →  플레이어만 (/play, /pair)
//
// 잘못된 호스트에서 진입하면 올바른 도메인으로 cross-domain redirect.
// localhost / Vercel preview (woorimedia-*.vercel.app) 는 분기 적용 안 함.

import { NextResponse, type NextRequest } from "next/server";

const MARKETING_HOSTS = ["woori-media.com", "www.woori-media.com"];
const PLAYER_HOST = "play.woori-media.com";

// 플레이어 도메인이 노출해도 되는 경로
const PLAYER_PATHS = ["/play", "/pair"];

function isPlayerPath(path: string): boolean {
  return PLAYER_PATHS.some((p) => path === p || path.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").toLowerCase();
  const path = req.nextUrl.pathname;

  const isPlayerHost = host === PLAYER_HOST;
  const isMarketingHost = MARKETING_HOSTS.includes(host);

  // 로컬/프리뷰 등은 분기 적용 안 함 (전체 라우트 그대로 노출)
  if (!isPlayerHost && !isMarketingHost) return NextResponse.next();

  // 플레이어 호스트에서 루트 진입 → /play 로 이동 (앱처럼)
  if (isPlayerHost && path === "/") {
    const target = req.nextUrl.clone();
    target.pathname = "/play";
    return NextResponse.redirect(target, 308);
  }

  // 플레이어 호스트인데 마케팅 경로로 왔으면 → 마케팅 도메인으로 보냄
  if (isPlayerHost && !isPlayerPath(path)) {
    const target = req.nextUrl.clone();
    target.host = MARKETING_HOSTS[0];
    target.protocol = "https:";
    target.port = "";
    return NextResponse.redirect(target, 308);
  }

  // 마케팅 호스트인데 플레이어 경로로 왔으면 → 플레이어 도메인으로 보냄
  // (구 링크 보존 — 기존 woori-media.com/play 즐겨찾기 사용자도 자동 이동)
  if (isMarketingHost && isPlayerPath(path)) {
    const target = req.nextUrl.clone();
    target.host = PLAYER_HOST;
    target.protocol = "https:";
    target.port = "";
    return NextResponse.redirect(target, 308);
  }

  return NextResponse.next();
}

// _next, api, public asset 등은 middleware 건너뜀.
export const config = {
  matcher: ["/((?!_next/|api/|favicon|logo/|.*\\..*).*)"],
};
