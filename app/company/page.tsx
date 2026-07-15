export default function CompanyPage() {
  return (
    <main className="bg-white">
      <section className="bg-navy-gradient">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-light">
            COMPANY
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            미디어의 미래를
            <br />
            USB로 정의합니다.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
          OUR VISION
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-navy-deep">
          제3의 길.
        </h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-text-muted">
          <p>
            우리는 미디어의 미래가 <strong className="text-navy-deep">스트리밍 vs CD·DVD</strong>가 아니라
            <strong className="text-gold-deep"> USB + 평생 액세스 + 어디서든</strong>이라는
            <strong className="text-navy-deep"> 제3의 길</strong>이라고 믿습니다.
          </p>
          <p>
            사용자는 좋아하는 음악·영상을 평생 소장하고 싶어합니다. 그러나
            지금은 두 가지 선택지밖에 없습니다 — 매월 구독하거나, 디지털
            파일을 사거나. 둘 다 "물리적 소유"의 만족을 주지 못합니다.
          </p>
          <p>
            USB 미디어는 손에 쥘 수 있는 실물이면서, 동시에 모든
            디바이스의 영구 액세스 키입니다. 한정판도 같은 인프라로 운영됩니다. 우리는 이 컨셉을 만들고 운영하는
            플랫폼입니다.
          </p>
        </div>
      </section>

      <section className="bg-bg-soft">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
            MILESTONES
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-navy-deep">
            우리미디어의 길.
          </h2>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                phase: "Phase 1",
                title: "Android · macOS MVP",
                date: "완료",
                desc: "USB 시리얼 인증, 무손실 재생, 글로벌 미니/풀플레이어, 라이브러리, 다운로드.",
              },
              {
                phase: "Phase 2",
                title: "Windows · 첫 USB 출시",
                date: "1~2개월",
                desc: "Windows 빌드, 제작사 파트너 1곳 계약, 첫 USB 미디어 1,000장 발행.",
              },
              {
                phase: "Phase 3",
                title: "Web · TV · 백엔드",
                date: "3~6개월",
                desc: "웹 플레이어 + TV OS 출시, 클라우드 백엔드 구축, 글로벌 확장.",
              },
            ].map((m) => (
              <li
                key={m.phase}
                className="rounded-2xl border border-divider bg-white p-7"
              >
                <p className="text-xs font-extrabold tracking-widest text-gold-deep">
                  {m.phase} · {m.date}
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-navy-deep">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {m.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
          CONTACT
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-navy-deep">
          이야기 나누시죠.
        </h2>
        <div className="mt-8 space-y-3 text-sm">
          <p>
            <span className="font-bold text-navy-deep">파트너 발주 문의 · </span>
            <a
              href="mailto:support@woori-media.com"
              className="text-gold-deep underline-offset-4 hover:underline"
            >
              support@woori-media.com
            </a>
          </p>
          <p>
            <span className="font-bold text-navy-deep">사용자 지원 · </span>
            <a
              href="mailto:support@woori-media.com"
              className="text-gold-deep underline-offset-4 hover:underline"
            >
              support@woori-media.com
            </a>
          </p>
          <p>
            <span className="font-bold text-navy-deep">일반 문의 · </span>
            <a
              href="mailto:support@woori-media.com"
              className="text-gold-deep underline-offset-4 hover:underline"
            >
              support@woori-media.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
