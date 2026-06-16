import Link from "next/link";

// 웹플레이어(450px 팝업) 내부 독립 다운로드 뷰.
// 마케팅 풀페이지(woori-media.com)로 나가지 않고, 스토어 링크만 노출 + 라이브러리 복귀.
// 각 스토어는 외부라 target=_blank(팝업 자기 자신 보존). PlayLayout 안에서 렌더돼 헤더 공유.

const apps = [
  { name: "iOS", desc: "App Store · iPhone · iPad", url: "https://apps.apple.com/app/id6768511630" },
  { name: "Android", desc: "Google Play", url: "https://play.google.com/store/apps/details?id=com.woorimedia.android" },
  { name: "macOS", desc: "Mac App Store · Apple Silicon", url: "https://apps.apple.com/app/id6768511630" },
  { name: "Windows", desc: "Microsoft Store · Windows 10+", url: "https://apps.microsoft.com/detail/9MXQD522RXZM" },
];

export default function PlayDownloadPage() {
  return (
    <div>
      <Link
        href="/play"
        className="inline-flex items-center gap-1 text-sm font-semibold"
        style={{ color: "var(--woori-ink-subtle)" }}
      >
        ← 라이브러리로
      </Link>

      <h1
        className="mt-4 text-2xl font-extrabold tracking-tight break-keep"
        style={{ color: "var(--woori-ink)" }}
      >
        앱 다운로드
      </h1>
      <p
        className="mt-2 text-sm break-keep"
        style={{ color: "var(--woori-ink-subtle)" }}
      >
        USB 시리얼 등록은 앱에서 합니다. 앱에서 한 번 등록하면 같은 계정으로 이
        웹 플레이어에서도 바로 재생돼요.
      </p>

      <div className="mt-6 space-y-3">
        {apps.map((a) => (
          <a
            key={a.name}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition hover:opacity-90"
            style={{
              borderColor: "var(--woori-ink-hairline)",
              background: "var(--woori-white)",
            }}
          >
            <span className="min-w-0">
              <span
                className="block text-base font-extrabold"
                style={{ color: "var(--woori-ink)" }}
              >
                {a.name}
              </span>
              <span
                className="block truncate text-xs"
                style={{ color: "var(--woori-ink-subtle)" }}
              >
                {a.desc}
              </span>
            </span>
            <span
              className="shrink-0 text-sm font-bold"
              style={{ color: "var(--woori-ink-subtle)" }}
            >
              열기 →
            </span>
          </a>
        ))}
      </div>

      <p
        className="mt-6 text-xs break-keep"
        style={{ color: "var(--woori-ink-subtle)" }}
      >
        LG webOS · 삼성 Tizen · Google TV 앱은 준비 중입니다.
      </p>
    </div>
  );
}
