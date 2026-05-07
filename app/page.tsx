import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="absolute right-12 top-12 h-2 w-2 rounded-full bg-gold-main" />
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold tracking-[0.4em] text-gold-light">
              WOORIMEDIA · LIMITED EDITION AUDIO PLATFORM
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
              CD·DVD를 잇는
              <br />
              차세대 USB 미디어.
            </h1>
            <span className="mt-8 block h-[2px] w-12 bg-gold-main" />
            <p className="mt-6 max-w-xl text-lg text-white/85">
              WAV 무손실 음원 + 4K 영상, USB 한 개로 어디서든. 제작사·기획사를 위한
              USB 미디어 발주 통합 플랫폼.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/partners"
                className="inline-flex h-12 items-center rounded-full bg-gold-gradient px-7 text-sm font-extrabold text-navy-deep shadow-lg shadow-black/20 transition hover:brightness-110"
              >
                파트너 발주 안내 →
              </Link>
              <Link
                href="/play"
                className="inline-flex h-12 items-center rounded-full border border-white/30 bg-white/5 px-7 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/10"
              >
                웹 플레이어 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 핵심 가치 ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
          WHAT WE BUILD
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-navy-deep">
          기존의 어디에도 없던
          <br />
          <span className="text-gold-deep">제3의 길.</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              num: "01",
              title: "물리적 미디어",
              desc: "CD·DVD를 잇는 새 표준. 박스 · 케이스 · 시리얼까지 실물 소장 + 영구 액세스.",
            },
            {
              num: "02",
              title: "오프라인 우선",
              desc: "USB만 꽂으면 작동. 인터넷·계정 의존성 0. 폐업해도 평생 재생.",
            },
            {
              num: "03",
              title: "최상위 화질·음질",
              desc: "WAV 무손실 음원 + 4K 영상 + AES-256 암호화. 원본 마스터 그대로.",
            },
          ].map((v) => (
            <div
              key={v.num}
              className="group rounded-2xl border border-divider bg-bg-soft p-7 transition hover:border-gold-main hover:shadow-lg hover:shadow-gold-main/10"
            >
              <p className="text-xs font-extrabold tracking-widest text-gold-deep">
                {v.num}
              </p>
              <h3 className="mt-4 text-xl font-extrabold text-navy-deep">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 이렇게 작동합니다 ─────────────────────────── */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="md:grid md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
                HOW IT WORKS
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-navy-deep">
                구매 한 번,
                <br />
                평생 모든 디바이스.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted">
                팬은 한 번만 구매하면 모바일·PC·웹·TV 어디서든 같은
                라이브러리에 접근합니다. USB는 영구 액세스 키이자 콜렉터블.
              </p>
            </div>
            <ol className="mt-10 space-y-6 md:mt-0">
              {[
                {
                  step: "1",
                  title: "USB 활성화",
                  desc: "USB 미디어를 모바일/PC 앱에 한 번 등록. 계정에 영구 귀속.",
                },
                {
                  step: "2",
                  title: "어디서든 청취",
                  desc: "Android · macOS · Windows · 웹 · TV — 동일 라이브러리.",
                },
                {
                  step: "3",
                  title: "평생 소장",
                  desc: "USB 분실해도 계정에 기록. 새 디바이스 추가 자유.",
                },
              ].map((s) => (
                <li
                  key={s.step}
                  className="flex gap-5 rounded-xl border border-divider bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-deep text-sm font-extrabold text-gold-light">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-navy-deep">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── B2B CTA ─────────────────────────────────── */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-extrabold tracking-[0.3em] text-gold-light">
              FOR LABELS · MANAGEMENT · STUDIOS
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              USB 미디어 출시,
              <br />
              우리가 통째로 운영합니다.
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/75">
              음원 수령 · 암호화 · 패키징 · 인증 · 멀티플랫폼 앱까지.
              따로 외주하지 마세요.
            </p>
          </div>
          <div className="mt-8 flex md:mt-0">
            <Link
              href="/partners"
              className="inline-flex h-14 items-center rounded-full bg-gold-gradient px-8 text-base font-extrabold text-navy-deep transition hover:brightness-110"
            >
              발주 문의 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
