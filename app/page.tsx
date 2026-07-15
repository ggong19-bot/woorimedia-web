import "./site.css";
import Mark from "@/components/Mark";
import WebPlayerLink from "@/components/WebPlayerLink";

// woori-media.com 랜딩 — 14섹션 모노크롬 리뉴얼.
// design_handoff_woorimedia_site 디자인 핸드오프 기준. 전 섹션 서버 컴포넌트
// (인터랙션은 CSS marquee + 네이티브 <details> 뿐 — JS 불필요).

const marqueeItems = [
  "iOS",
  "Android",
  "macOS",
  "Windows",
  "Web Player",
  "LG webOS",
  "Samsung Tizen",
  "Google TV",
  "24bit / 96kHz · WAV 무손실",
  "4K 원본 영상",
  "AES-256 암호화",
];

const platforms = [
  { name: "iOS", desc: "App Store · iPhone · iPad", live: true, glyph: "apple", url: "https://apps.apple.com/app/id6768511630" },
  { name: "Android", desc: "Play Store · 모든 Android", live: true, glyph: "android", url: "https://play.google.com/store/apps/details?id=com.woorimedia.android" },
  { name: "macOS", desc: "Mac App Store · Apple Silicon", live: true, glyph: "desktop", url: "https://apps.apple.com/app/id6768511630" },
  { name: "Windows", desc: "MS Store · Windows 10+", live: true, glyph: "windows", url: "https://apps.microsoft.com/detail/9MXQD522RXZM" },
  { name: "Web", desc: "play.woori-media.com", live: true, glyph: "web" },
  { name: "LG webOS", desc: "LG Smart TV", live: false, glyph: "tv-lg" },
  { name: "Samsung TV", desc: "Tizen Smart Hub", live: false, glyph: "tv-tizen" },
  { name: "Google TV", desc: "Android TV · Chromecast", live: false, glyph: "tv-google" },
] as const;

function PlatformGlyph({ kind }: { kind: string }) {
  switch (kind) {
    case "apple":
      return (
        <svg className="glyph" viewBox="0 0 40 40" fill="none">
          <path
            d="M27 28 C29 31 26 33 24 33 C20 33 18 30 14 30 C10 30 6 33 6 26 C6 21 10 18 14 18 C18 18 19 19 21 19 C23 19 25 17 28 17 C30 17 33 19 34 22 C30 23 28 26 28 28 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M22 14 C24 12 24 9 24 9 C22 9 20 11 19 13 C19 14 20 14 22 14 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      );
    case "android":
      return (
        <svg className="glyph" viewBox="0 0 40 40" fill="none">
          <circle cx="14" cy="14" r="2" fill="currentColor" />
          <circle cx="26" cy="14" r="2" fill="currentColor" />
          <path
            d="M6 22 L34 22 L34 30 C34 32 32 34 30 34 L10 34 C8 34 6 32 6 30 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
          <line x1="13" y1="6" x2="16" y2="11" stroke="currentColor" strokeWidth="1.4" />
          <line x1="27" y1="6" x2="24" y2="11" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "desktop":
      return (
        <svg className="glyph" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="8" width="28" height="20" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <line x1="14" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="1.4" />
          <line x1="20" y1="28" x2="20" y2="32" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "windows":
      return (
        <svg className="glyph" viewBox="0 0 40 40" fill="none">
          <path d="M6 12 L18 10 L18 20 L6 20 Z" fill="currentColor" />
          <path d="M20 10 L34 8 L34 20 L20 20 Z" fill="currentColor" />
          <path d="M6 20 L18 20 L18 30 L6 28 Z" fill="currentColor" />
          <path d="M20 20 L34 20 L34 32 L20 30 Z" fill="currentColor" />
        </svg>
      );
    case "web":
      return (
        <svg className="glyph" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <ellipse cx="20" cy="20" rx="6" ry="14" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "tv-lg":
    case "tv-tizen":
      return (
        <svg className="glyph" viewBox="0 0 40 40" fill="none">
          <rect x="4" y="8" width="32" height="22" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <line x1="14" y1="34" x2="26" y2="34" stroke="currentColor" strokeWidth="1.4" />
          <line x1="20" y1="30" x2="20" y2="34" stroke="currentColor" strokeWidth="1.4" />
          <text
            x="20"
            y="22"
            textAnchor="middle"
            fontFamily="'Space Grotesk'"
            fontSize={kind === "tv-lg" ? 7 : 6}
            fontWeight="500"
            fill="currentColor"
            letterSpacing={kind === "tv-lg" ? 1 : 0.5}
          >
            {kind === "tv-lg" ? "LG" : "TIZEN"}
          </text>
        </svg>
      );
    case "tv-google":
      return (
        <svg className="glyph" viewBox="0 0 40 40" fill="none">
          <rect x="4" y="8" width="32" height="22" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <line x1="14" y1="34" x2="26" y2="34" stroke="currentColor" strokeWidth="1.4" />
          <polygon points="17,15 17,23 25,19" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

const faqs = [
  {
    q: "USB가 깨지면 음원도 사라지나요?",
    a: "아니요. 한 번 활성화한 USB는 계정에 영구 귀속됩니다. USB가 물리적으로 손상되어도 모든 디바이스에서 동일한 라이브러리를 그대로 재생할 수 있습니다.",
    open: true,
  },
  {
    q: "지원하는 플랫폼은 몇 개인가요?",
    a: "iOS, Android, macOS, Windows, 웹 플레이어 — 5개 플랫폼이 정식 출시 상태이며, LG webOS, Samsung Tizen, Google TV 3종은 출시 대기 중입니다. 모든 플랫폼은 단일 코드베이스로 운영되어 동일한 사용 경험을 제공합니다.",
  },
  {
    q: "음질은 어느 정도인가요?",
    a: "24bit / 96kHz WAV 무손실. CD(16bit / 44.1kHz) 및 일반 스트리밍 서비스(MP3 / AAC 손실 압축)를 모두 상회하는 스튜디오 마스터 사양입니다. 영상은 4K 원본 그대로 수록됩니다.",
  },
  {
    q: "음원 외에 어떤 콘텐츠가 담길 수 있나요?",
    a: "USB 1개에 음원, 4K 영상(MV · 콘서트 · 다큐멘터리), 디지털 화보집, 인증서, 다국어 자막, 메타데이터까지 자유롭게 조합 가능합니다. 영상물 단독 USB(콘서트 라이브 · 메이킹) 발매도 가능합니다.",
  },
  {
    q: "음반사나 레이블에서 발주하려면?",
    a: "발주 문의는 박용훈 상무(support@woori-media.com · 010-9790-4127)로 연락 주시기 바랍니다. 최소 발주 수량 500장, 평균 1,000–3,000장, 출고까지 평균 8주가 소요됩니다.",
  },
  {
    q: "활성화는 어떻게 하나요?",
    a: "USB를 디바이스에 연결하고 우리미디어 앱을 실행한 뒤 시리얼 번호를 입력하면 즉시 활성화됩니다. 카카오 · 네이버 · 구글 · 애플 · 이메일 — 5가지 인증 방식을 지원합니다.",
  },
];

const partnerPoints = [
  {
    n: "01",
    h: "출시 사이클 8주",
    p: "발주 → 마스터 → 암호화 → 앱 노출까지 평균 8주. 외주 4단계가 1단계로.",
  },
  {
    n: "02",
    h: "단일 코드베이스 8 플랫폼",
    p: "1/4의 인력과 시간으로 모바일 · 데스크탑 · TV 동시 발매.",
  },
  {
    n: "03",
    h: "콘텐츠 발행 운영 통합",
    p: "일련번호 관리, 인증서 · 박스 · USB 케이스, 사후 활성화 · 재발급 · CS까지.",
  },
  {
    n: "04",
    h: "환경 윤리 부담 경감",
    p: "USB 1개로 가치 보존 — 양산형 CD 대비 폐기물 감소. ESG 캠페인 대응.",
  },
];

const releases = [
  {
    cover: "cover-v1",
    badge: "AUDIO",
    t: "데모 마스터 · 가칭",
    s: "Audio · 11 tracks · 24/96 WAV",
    price: ["2026 한정 발매", "시연 가능"],
  },
  {
    cover: "cover-v2",
    badge: "VIDEO",
    t: "콘서트 라이브 · 4K",
    s: "Video · 90 min · 4K 원본",
    price: ["발매 예정", "2026 Q3"],
  },
  {
    cover: "cover-v3",
    badge: "BUNDLE",
    t: "컬렉터스 에디션 USB",
    s: "음원 + 영상 + 화보집 + 인증서",
    price: ["거래처 발주 가능", "→"],
  },
  {
    cover: "cover-v4",
    badge: "SPECIAL",
    t: "비하인드 · 메이킹 영상 팩",
    s: "Video · 5 episodes · 4K",
    price: ["팬클럽 한정", "→"],
  },
];

export default function HomePage() {
  return (
    <div className="site-root">
      {/* ═══ NAV ═══ */}
      <nav className="top">
        <div className="inner">
          <a href="#" className="lockup">
            <Mark />
            <span>
              <div className="name">WooriMedia</div>
              <div className="kr">우리미디어</div>
            </span>
          </a>
          <div className="links">
            <a href="#what">What</a>
            <a href="#platforms">Platforms</a>
            <a href="#library">Library</a>
            <a href="#partners">For Partners</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#cta" className="cta">
            시작하기
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero hero--video">
        {/* 배경 영상 — 자동재생·무음·루프, 포스터 폴백. 시네마틱 클립 들어오면
            public/video/hero-bg.mp4 교체. aria-hidden(장식용). */}
        <video
          className="hero-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" aria-hidden="true" />
        <Mark className="drift" />
        <div className="wrap">
          <div className="inner">
            <div className="left">
              <div className="eyebrow" style={{ marginBottom: 40 }}>
                WooriMedia · Streaming · Studio Audio · Cinema Vision
              </div>
              <h1 className="headline">
                <em>프리미엄</em>
                <br />
                USB <em>앨범</em>
              </h1>
              <p className="lede" style={{ marginTop: 48 }}>
                24bit / 96kHz 무손실 음원과 4K 영상을 USB 1개에 <br />
                한 번 활성화하면 iOS · Android · macOS · Windows · Web · TV — 어디서든
              </p>
              <div className="ctas" style={{ marginTop: 36 }}>
                <WebPlayerLink className="primary">
                  웹 플레이어
                </WebPlayerLink>
                <a href="#what" className="ghost">
                  우리미디어란 →
                </a>
              </div>
            </div>
            <div className="right">
              <div className="stats">
                <div className="stat">
                  <div className="n">8</div>
                  <div className="l">Platforms</div>
                </div>
                <div className="stat">
                  <div className="n">
                    96<span style={{ fontSize: "0.42em", color: "rgba(255,255,255,0.6)", marginLeft: "0.04em" }}>kHz</span>
                  </div>
                  <div className="l">Studio audio</div>
                </div>
                <div className="stat">
                  <div className="n">4K</div>
                  <div className="l">Cinema vision</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((dup) =>
            marqueeItems.map((item, i) => (
              <span key={`${dup}-${i}`} style={{ display: "contents" }}>
                <span>{item}</span>
                <span className="dot">·</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* ═══ MANIFESTO ═══ */}
      <section className="manifesto">
        <div className="wrap">
          <div className="num-mono" style={{ marginBottom: 36 }}>
            01 · MANIFESTO
          </div>
          <p className="quote">
            스튜디오에서 만든 그대로의 음악, <span className="acc">손에 잡히는 한 장.</span>
            <br />
            디지털의 편의와 <span className="acc">소장의 무게</span>를 동시에 갖는 미디어.
          </p>
          <div className="meta">
            <div className="label-up">왜 우리는 다시 USB로 돌아갔나</div>
            <a href="#what" className="num-mono" style={{ color: "var(--ink)" }}>
              →&nbsp;&nbsp;자세히 보기
            </a>
          </div>
        </div>
      </section>

      {/* ═══ WHAT / FEATURES ═══ */}
      <section id="what" className="bay">
        <div className="wrap">
          <div className="head">
            <div className="left">
              <div className="eyebrow">02 · 우리미디어란</div>
              <h2 className="h">
                CD · DVD를 잇는
                <br />
                차세대 USB 미디어.
              </h2>
            </div>
            <p className="kicker right">
              무손실 음원, 4K 영상, 디지털 화보와 인증서를 USB 1개에. 한 번 활성화하면 모든
              디바이스에서 평생 재생됩니다.
            </p>
          </div>
          <div className="features">
            <div className="cell">
              <div className="pn">01</div>
              <svg className="ic" viewBox="0 0 56 56" fill="none">
                <rect x="6" y="6" width="44" height="44" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M14 28 L20 36 L26 24 L32 36 L38 28 L42 28"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                />
              </svg>
              <h4>스튜디오 마스터 그대로</h4>
              <p>24bit / 96kHz 무손실 WAV. 4K 원본 영상까지 압축 없이.</p>
            </div>
            <div className="cell">
              <div className="pn">02</div>
              <svg className="ic" viewBox="0 0 56 56" fill="none">
                <rect x="14" y="14" width="28" height="28" stroke="currentColor" strokeWidth="1.5" />
                <rect x="20" y="20" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="6" y1="28" x2="14" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="42" y1="28" x2="50" y2="28" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h4>USB 1개로 평생 소장</h4>
              <p>활성화 후 계정에 영구 귀속. USB 깨져도 음원은 계속됩니다.</p>
            </div>
            <div className="cell">
              <div className="pn">03</div>
              <svg className="ic" viewBox="0 0 56 56" fill="none">
                <rect x="6" y="12" width="20" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="30" y="8" width="20" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="40" x2="18" y2="40" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h4>어디서든 재생</h4>
              <p>iOS · Android · macOS · Windows · Web · TV 3종 — 단일 라이브러리.</p>
            </div>
            <div className="cell">
              <div className="pn">04</div>
              <svg className="ic" viewBox="0 0 56 56" fill="none">
                <path
                  d="M28 6 L46 14 L46 30 C46 40 28 50 28 50 C28 50 10 40 10 30 L10 14 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path d="M21 28 L26 33 L36 22" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
              <h4>위변조 차단</h4>
              <p>시리얼 번호 + AES-256 암호화로 진품을 보증합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="how">
        <div className="wrap">
          <div className="head">
            <div className="left">
              <div className="eyebrow">03 · 작동 방식</div>
              <h2 className="h">
                3단계로
                <br />
                활성화 완료.
              </h2>
            </div>
            <p className="kicker right">
              구매에서 재생까지 평균 3분. 한 번 등록한 USB는 계정에 영구 귀속됩니다.
            </p>
          </div>

          <div className="how-grid">
            <div className="step">
              <div className="n">01</div>
              <h4>구매 + 연결</h4>
              <p>USB를 컴퓨터 또는 휴대폰에 꽂고 우리미디어 앱을 실행합니다.</p>
              <div className="visual">
                <svg viewBox="0 0 240 160" fill="none" width="76%">
                  <rect x="36" y="54" width="140" height="52" rx="6" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="176" y="68" width="28" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <line x1="180" y1="76" x2="198" y2="76" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="180" y1="84" x2="198" y2="84" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="54" cy="80" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <text
                    x="72"
                    y="84"
                    fontFamily="'Space Grotesk', monospace"
                    fontSize="10"
                    fill="currentColor"
                    letterSpacing="1"
                  >
                    WM #0247/1000
                  </text>
                </svg>
              </div>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="n">02</div>
              <h4>시리얼 등록</h4>
              <p>USB의 고유 시리얼을 계정에 등록하면 즉시 클라우드에 귀속됩니다.</p>
              <div className="visual">
                <svg viewBox="0 0 240 160" fill="none" width="76%">
                  <rect x="40" y="40" width="160" height="80" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <line x1="40" y1="62" x2="200" y2="62" stroke="currentColor" strokeWidth="1" />
                  <text
                    x="52"
                    y="55"
                    fontFamily="'Space Grotesk', monospace"
                    fontSize="9"
                    fill="currentColor"
                    letterSpacing="2"
                  >
                    SERIAL · ACTIVATION
                  </text>
                  <text
                    x="52"
                    y="86"
                    fontFamily="'Space Grotesk', monospace"
                    fontSize="13"
                    fill="currentColor"
                    letterSpacing="3"
                  >
                    WM-0247-A8F2
                  </text>
                  <rect x="52" y="94" width="100" height="20" fill="currentColor" />
                  <text x="60" y="108" fontFamily="'Space Grotesk'" fontSize="11" fill="var(--paper-soft)" fontWeight="500">
                    ACTIVATE
                  </text>
                </svg>
              </div>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="n">03</div>
              <h4>어디서나 재생</h4>
              <p>모든 디바이스에서 같은 라이브러리. USB 없이도 평생 액세스.</p>
              <div className="visual">
                <svg viewBox="0 0 240 160" fill="none" width="76%">
                  <rect x="24" y="42" width="42" height="76" rx="6" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="82" y="56" width="62" height="48" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="160" y="46" width="56" height="56" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="188" y1="102" x2="188" y2="116" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="174" y1="116" x2="202" y2="116" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="45" cy="110" r="3" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PLATFORMS (DARK) ═══ */}
      <section id="platforms" className="platforms">
        <div className="wrap">
          <div className="head">
            <div className="left">
              <div className="eyebrow">04 · 멀티 플랫폼</div>
              <h2 className="h" style={{ color: "var(--paper)" }}>
                8 platforms.
                <br />
                One library.
              </h2>
            </div>
            <p className="kicker right" style={{ color: "var(--sub-d)" }}>
              단일 코드베이스로 동작하는 8개 앱. 어떤 디바이스에서도 동일한 재생 경험.
            </p>
          </div>

          <div className="platform-grid">
            {platforms.map((p) => {
              // 정식 게시된 플랫폼에는 url을 달아두고, 있으면 카드 전체를 외부 링크로 감싼다.
              // 현재는 Windows(MS Store)만 공개 링크 — 나머지는 출시 시점에 url 추가.
              const href = (p as { url?: string }).url;
              const body = (
                <>
                  <span className={p.live ? "status live" : "status"}>{p.live ? "LIVE" : "SOON"}</span>
                  <PlatformGlyph kind={p.glyph} />
                  <div className="name">{p.name}</div>
                  <div className="desc">{p.desc}</div>
                </>
              );
              return href ? (
                <a
                  className="p"
                  key={p.name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} 앱 다운로드 — 새 창에서 열기`}
                >
                  {body}
                </a>
              ) : (
                <div className="p" key={p.name}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUALITY COMPARE ═══ */}
      <section className="compare">
        <div className="wrap">
          <div className="head">
            <div className="left">
              <div className="eyebrow">05 · 품질</div>
              <h2 className="h">
                스튜디오 마스터
                <br />
                그대로.
              </h2>
            </div>
            <p className="kicker right">
              스트리밍 압축 없음. CD를 넘어선 사양. 영상은 4K 원본 그대로.
            </p>
          </div>

          <table className="compare-t">
            <thead>
              <tr>
                <th style={{ width: 180 }}></th>
                <th>스트리밍</th>
                <th>CD</th>
                <th>Blu-ray</th>
                <th className="us">우리미디어</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row">음원 포맷</td>
                <td>MP3 / AAC</td>
                <td>PCM 16bit</td>
                <td>PCM</td>
                <td className="us">WAV 24bit</td>
              </tr>
              <tr>
                <td className="row">샘플레이트</td>
                <td>44.1 kHz</td>
                <td>44.1 kHz</td>
                <td>48–96 kHz</td>
                <td className="us">96 kHz</td>
              </tr>
              <tr>
                <td className="row">압축</td>
                <td>손실 압축</td>
                <td>무압축</td>
                <td>무압축</td>
                <td className="us">무손실</td>
              </tr>
              <tr>
                <td className="row">영상 화질</td>
                <td>최대 1080p</td>
                <td style={{ color: "var(--mute)" }}>—</td>
                <td>1080p</td>
                <td className="us">4K 원본</td>
              </tr>
              <tr>
                <td className="row">소유권</td>
                <td>구독 종료 시 소멸</td>
                <td>디스크 영구</td>
                <td>디스크 영구</td>
                <td className="us">USB + 클라우드 영구</td>
              </tr>
              <tr>
                <td className="row">재생 디바이스</td>
                <td>온라인 의존</td>
                <td>전용 플레이어</td>
                <td>전용 플레이어</td>
                <td className="us">8개 플랫폼 어디서든</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ LIBRARY / RELEASES ═══ */}
      <section id="library" className="library">
        <div className="wrap">
          <div className="head">
            <div className="left">
              <div className="eyebrow">06 · LIBRARY</div>
              <h2 className="h kor">발매 라인업.</h2>
            </div>
            <p className="kicker right">
              음원, 영상, 화보, 콘서트 — 어떤 콘텐츠든 USB 1개에 담아 발매할 수 있습니다.
            </p>
          </div>

          <div className="lib-grid">
            {releases.map((r) => (
              <div className="card" key={r.t}>
                <div className={`cover ${r.cover}`}>
                  <Mark className="watermark" />
                  <span className="badge">{r.badge}</span>
                </div>
                <div className="meta">
                  <div className="t">{r.t}</div>
                  <div className="s">{r.s}</div>
                  <div className="price">
                    <span>{r.price[0]}</span>
                    <span className="p">{r.price[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOR PARTNERS ═══ */}
      <section id="partners" className="partners">
        <div className="wrap">
          <div className="inner">
            <div className="left">
              <div className="eyebrow">07 · FOR PARTNERS</div>
              <h2 className="h" style={{ marginTop: 22 }}>
                음반사 ·<br />
                레이블 ·<br />
                아티스트께.
              </h2>
              <p className="kicker" style={{ marginTop: 36, maxWidth: 360 }}>
                발주 한 번으로 음원 마스터링 · 암호화 · USB 패키징 · 8개 플랫폼 앱까지.
              </p>
              <a
                href="#cta"
                className="num-mono"
                style={{
                  marginTop: 40,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  color: "var(--ink)",
                }}
              >
                파트너 데크 요청&nbsp;&nbsp;→
              </a>
            </div>
            <div className="pts">
              {partnerPoints.map((pt) => (
                <div className="pt" key={pt.n}>
                  <div className="n">{pt.n}</div>
                  <div>
                    <h4>{pt.h}</h4>
                    <p>{pt.p}</p>
                  </div>
                  <div className="arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRESS / QUOTES (DARK) ═══ */}
      <section className="press">
        <div className="wrap">
          <div className="head">
            <div className="left">
              <div className="eyebrow" style={{ color: "var(--sub-d)" }}>
                08 · INDUSTRY VOICES
              </div>
              <h2 className="h" style={{ color: "var(--paper)" }}>
                팬덤은 디지털만으로
                <br />
                만족하지 않는다.
              </h2>
            </div>
            <p className="kicker right" style={{ color: "var(--sub-d)" }}>
              만지고, 모으고, 자랑할 무언가가 필요하다 — 음악업계 컨센서스.
            </p>
          </div>

          <div className="quotes">
            <div className="q">
              <div className="body">K-POP 앨범은 점점 굿즈에 가까워지고 있다.</div>
              <div className="src">
                <span>Korea Times</span>
                <span>음반업계 분석</span>
              </div>
            </div>
            <div className="q">
              <div className="body">
                팬덤은 디지털만으로 만족하지 않는다. 만지고, 모으고, 자랑할 무언가가 필요하다.
              </div>
              <div className="src">
                <span>Global Music Biz</span>
                <span>2024 Consensus</span>
              </div>
            </div>
            <div className="q">
              <div className="body">
                스트리밍이 시장을 점유했지만, 실물 음반에서는 K-POP이 독보적이다.
              </div>
              <div className="src">
                <span>IFPI</span>
                <span>Global Album Sales 2024</span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 80,
              paddingTop: 36,
              borderTop: "1px solid var(--rule-d)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <div className="num-mono" style={{ color: "var(--mute-d)" }}>
              FEATURED REFERENCES
            </div>
            <div
              style={{
                display: "flex",
                gap: 56,
                flexWrap: "wrap",
                font: "500 14px/1 'Space Grotesk'",
                letterSpacing: "0.18em",
                color: "var(--sub-d)",
              }}
            >
              <span>IFPI</span>
              <span>CIRCLE CHART</span>
              <span>KOREA TIMES</span>
              <span>MUSIC BUSINESS WORLDWIDE</span>
              <span>KPOP4PLANET</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="faq">
        <div className="wrap">
          <div className="head">
            <div className="left">
              <div className="eyebrow">09 · FAQ</div>
              <h2 className="h">자주 묻는 질문.</h2>
            </div>
            <p className="kicker right">더 궁금한 점이 있다면 언제든 문의해주세요.</p>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q} open={f.open}>
                <summary>
                  {f.q} <span className="toggle">+</span>
                </summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA STRIP ═══ */}
      <section id="cta" className="cta-strip">
        <div className="wrap">
          <div className="num-mono" style={{ marginBottom: 32 }}>
            10 · GET STARTED
          </div>
          <h2>
            <em>한 번 구매</em> —<br />
            평생 재생, 어디서든.
          </h2>
          <p className="kicker" style={{ maxWidth: 640, margin: "0 auto" }}>
            앱을 다운로드하고, USB를 연결하고, 시리얼을 등록하세요. 그 다음은 단순합니다 — 재생.
          </p>
          <div className="ctas">
            <WebPlayerLink className="primary">
              웹 플레이어
            </WebPlayerLink>
            <a href="#partners" className="ghost">
              파트너 문의
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER (DARK) ═══ */}
      <footer className="site">
        <div className="wrap">
          <div className="top">
            <div className="brand">
              <Mark />
              <span>
                <div className="name">WooriMedia</div>
                <div className="kr">우 리 미 디 어</div>
              </span>
              <p className="tag">
                Studio audio. Cinema vision.
                <br />
                한정판 음반·영상을 위한 USB 미디어 솔루션.
              </p>
            </div>
            <div className="col">
              <h5>Product</h5>
              <ul>
                <li>
                  <a href="#what">우리미디어란</a>
                </li>
                <li>
                  <a href="#platforms">지원 플랫폼</a>
                </li>
                <li>
                  <a href="#library">발매 라인업</a>
                </li>
                <li>
                  <WebPlayerLink>Web Player</WebPlayerLink>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>For Partners</h5>
              <ul>
                <li>
                  <a href="#partners">발주 안내</a>
                </li>
                <li>
                  <a href="#partners">파트너 데크</a>
                </li>
                <li>
                  <a href="#cta">미팅 요청</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>Resources</h5>
              <ul>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#cta">활성화 가이드</a>
                </li>
                <li>
                  <a href="mailto:support@woori-media.com">고객센터</a>
                </li>
                <li>
                  <a href="/logo/woorimedia-logo-master.svg">로고 다운로드</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>Contact</h5>
              <ul>
                <li>
                  <a href="mailto:support@woori-media.com">박용훈 상무</a>
                </li>
                <li>
                  <a href="mailto:support@woori-media.com">support@woori-media.com</a>
                </li>
                <li>
                  <a href="tel:01097904127">010·9790·4127</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="megamark">WOORIMEDIA · 우리미디어</div>

          <div className="bottom">
            <div>© 2026 WOORIMEDIA Co., Ltd.</div>
            <div className="meta">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <span>woori-media.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
