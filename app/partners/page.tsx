import Link from "next/link";

export default function PartnersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-gradient">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-light">
            FOR PARTNERS
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            USB 미디어,
            <br />
            우리가 통째로 운영합니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            음원 수령 · 암호화 · 패키징 · 멀티플랫폼 앱 · 시리얼 인증 시스템 —
            한 곳에서.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
          WHY US
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-navy-deep">
          왜 우리에게 발주해야 하는가
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              num: "01",
              title: "출시 사이클 6개월 → 8주",
              desc: "USB 제조·암호화·앱·인증 4가지를 따로 외주하지 않고 한 곳에서 통합. 평균 6개월 → 8주로 단축.",
            },
            {
              num: "02",
              title: "이미 검증된 멀티플랫폼",
              desc: "Android · macOS · Windows · Web · TV 단일 코드베이스로 동작. 팬덤이 어디 있든 동일한 경험.",
            },
            {
              num: "03",
              title: "USB 라인업 운영",
              desc: "일반판 양산부터 한정판 #N/M 일련번호까지. 인증서·박스·케이스 디자인, 활성화·재발급 시스템.",
            },
            {
              num: "04",
              title: "오프라인 · 평생 컨셉",
              desc: '"평생 소장" 마케팅 메시지를 기술이 뒷받침. 클라우드 의존 모델과 차별화.',
            },
          ].map((p) => (
            <div
              key={p.num}
              className="rounded-2xl border border-divider bg-white p-8 transition hover:border-gold-main hover:shadow-lg hover:shadow-gold-main/10"
            >
              <p className="text-xs font-extrabold tracking-widest text-gold-deep">
                {p.num}
              </p>
              <h3 className="mt-3 text-xl font-extrabold text-navy-deep">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Service streams */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
            WHAT WE PROVIDE
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-navy-deep">
            제공 범위
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "USB 생산 · 암호화",
                desc: "음원 수령 후 AES-256 암호화 + 시리얼 부여 + 패키징. 1,000~10,000장 단위 발주.",
                kpi: "장당 수수료 + 발주 마진",
              },
              {
                title: "멀티플랫폼 앱",
                desc: "5개 OS·웹용 앱을 white-label 또는 우리미디어 브랜드로 동시 제공.",
                kpi: "발주 패키지 동반 또는 구독",
              },
              {
                title: "시리얼 활성화 운영",
                desc: "USB 시리얼 등록·검증, 사용자 라이브러리 동기화, 재발급, 고객 지원.",
                kpi: "월 운영 수수료 (Phase 3)",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-navy-gradient rounded-2xl p-7 text-white shadow-xl shadow-navy-deep/20"
              >
                <h3 className="text-xl font-extrabold">{s.title}</h3>
                <span className="mt-3 block h-[2px] w-8 bg-gold-main" />
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  {s.desc}
                </p>
                <p className="mt-6 text-xs font-bold italic text-gold-light">
                  {s.kpi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-extrabold tracking-[0.3em] text-gold-deep">
          PROCESS
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-navy-deep">
          발주부터 출시까지 8주
        </h2>

        <ol className="mt-12 space-y-4">
          {[
            {
              week: "Week 1",
              title: "기획 미팅 · 견적",
              desc: "수량 · 디자인 방향 · 콘텐츠 범위 협의. 마스터 음원 전달 받음.",
            },
            {
              week: "Week 2-3",
              title: "음원 수령 · 암호화",
              desc: "제작사로부터 마스터 음원 수령. AES-256 암호화 + 트랙별 시리얼 부여.",
            },
            {
              week: "Week 4-5",
              title: "USB 패키징 · 케이스",
              desc: "USB 케이스 · 박스 · 인증서 디자인 시안 → 양산. (라인업별로 다른 패키지)",
            },
            {
              week: "Week 6-7",
              title: "앱 white-label · 테스트",
              desc: "파트너 브랜딩 적용된 앱 빌드. 시리얼 인증 · 재생 통합 테스트.",
            },
            {
              week: "Week 8",
              title: "출시 · 운영 인계",
              desc: "양산품 납품. 시리얼 활성화 시스템 가동. 사후 운영 시작.",
            },
          ].map((p, i) => (
            <li
              key={p.week}
              className="flex gap-6 rounded-2xl border border-divider bg-white p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-deep text-xs font-extrabold text-gold-light">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <p className="text-xs font-extrabold tracking-widest text-gold-deep">
                  {p.week}
                </p>
                <h3 className="mt-1 text-lg font-extrabold text-navy-deep">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
            시작은 30분 미팅으로.
          </h2>
          <p className="mt-4 text-base text-white/75">
            제품 시연 · 견적 · 출시 일정. 다음 USB 출시는 우리미디어와 함께.
          </p>
          <a
            href="mailto:partners@woorimedia.com?subject=우리미디어 발주 문의"
            className="mt-8 inline-flex h-14 items-center rounded-full bg-gold-gradient px-8 text-base font-extrabold text-navy-deep transition hover:brightness-110"
          >
            발주 문의 메일 보내기 →
          </a>
        </div>
      </section>
    </main>
  );
}
