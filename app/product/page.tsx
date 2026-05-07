import Link from "next/link";

export default function ProductPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-navy-gradient">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-light">
            PRODUCT
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            모바일 · PC · 웹 · TV에서
            <br />
            동일한 라이브러리.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            USB 미디어 한 장의 콘텐츠를 등록 후 가능한 모든 디바이스에서.
          </p>
        </div>
      </section>

      {/* Platforms grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            { tag: "PHASE 1", platform: "Android", note: "출시 준비 완료" },
            { tag: "PHASE 1", platform: "macOS", note: "출시 준비 완료" },
            { tag: "PHASE 2", platform: "Windows", note: "빌드 중" },
            { tag: "PHASE 3", platform: "Web", note: "출시 준비 중" },
            { tag: "PHASE 3", platform: "TV OS", note: "Tizen · WebOS" },
          ].map((p) => (
            <div
              key={p.platform}
              className="rounded-2xl border border-divider bg-bg-soft p-6 text-center"
            >
              <p className="text-[10px] font-extrabold tracking-widest text-gold-deep">
                {p.tag}
              </p>
              <h3 className="mt-3 text-2xl font-extrabold text-navy-deep">
                {p.platform}
              </h3>
              <p className="mt-2 text-xs text-text-muted">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature deep-dive */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-6xl space-y-20 px-6 py-20">
          {[
            {
              num: "01",
              title: "글로벌 미니플레이어 + 풀플레이어",
              desc: "어떤 화면에 있든 하단 미니플레이어로 끊김 없는 청취. 탭하면 풀플레이어로 확장 — 재생목록, 셔플, 반복, 가사까지.",
              highlights: ["글로벌 오버레이", "재생목록 큐", "셔플 / 반복 모드", "동기 가사"],
            },
            {
              num: "02",
              title: "USB 시리얼 인증",
              desc: "AES-256 + USB 시리얼에서 유도된 키로 .wm 파일 복호화. 인증된 사용자만 콘텐츠 액세스. 시리얼 위·변조 불가.",
              highlights: ["AES-256 CTR", "Rust 코어", "오프라인 작동", "DRM-Ready"],
            },
            {
              num: "03",
              title: "로컬 다운로드 + 평생 액세스",
              desc: "USB 콘텐츠를 로컬에 다운로드 후 USB 없이도 청취 가능. 단, 로그인된 사용자에게만 키 발급 — 분실·도난 시 안전.",
              highlights: ["오프라인 캐시", "로그인 게이트", "다중 디바이스", "재발급"],
            },
          ].map((f, i) => (
            <div
              key={f.num}
              className={`grid items-center gap-10 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="md:[direction:ltr]">
                <p className="text-xs font-extrabold tracking-widest text-gold-deep">
                  FEATURE {f.num}
                </p>
                <h3 className="mt-3 text-3xl font-extrabold leading-tight text-navy-deep">
                  {f.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text-muted">
                  {f.desc}
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {f.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-sm font-semibold text-navy-deep"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-main" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mock device frame */}
              <div className="md:[direction:ltr]">
                <div className="bg-navy-gradient relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-navy-deep/20">
                  <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-gold-main" />
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-10">
                    <span className="w-mark scale-150" />
                    <p className="text-base font-extrabold tracking-wide text-white">
                      WooriMedia
                    </p>
                    <p className="text-xs text-gold-light">
                      Limited Demo · #001 / 100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-navy-deep md:text-4xl">
          웹 플레이어로 직접 들어보세요.
        </h2>
        <p className="mt-4 text-base text-text-muted">
          데모 계정으로 로그인하면 데모 라이브러리 청취가 가능합니다.
        </p>
        <Link
          href="/play"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-navy-deep px-8 text-sm font-extrabold text-white transition hover:bg-navy-mid"
        >
          웹 플레이어 시작 →
        </Link>
      </section>
    </main>
  );
}
