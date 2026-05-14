# Handoff · woori-media.com Redesign

> 빈 페이지처럼 보이던 기존 사이트를 14개 섹션이 흐르는 모노크롬 마케팅 사이트로 리뉴얼한 디자인입니다.

---

## About the design files

이 폴더의 HTML/CSS 파일은 **디자인 레퍼런스**예요 — 실제 프로덕션 코드가 아닌, 최종 룩과 동작을 보여주는 프로토타입입니다.

목표: 이 HTML 디자인을 **타깃 코드베이스의 기존 환경(예: React + Tailwind, Next.js, Astro, SvelteKit 등)에 맞춰 구현**. 기존 컴포넌트 패턴·디자인 시스템이 있다면 거기에 맞춰주세요. 아직 없다면 정적 사이트로 **Astro** 또는 **Next.js App Router** 추천(이미지·폰트 최적화 + 다국어 라우팅 용이).

`design/woori-media.com Redesign.html` 파일을 브라우저에서 열어서 최종 모습을 확인하세요.

## Fidelity

**High-fidelity** — 픽셀 단위로 마감된 mocks입니다. 컬러, 타이포그래피, 간격, 인터랙션이 모두 최종 의도. 코드베이스의 기존 라이브러리·패턴으로 그대로 재현해주세요.

---

## Tech stack 권장

| 항목         | 권장                                                                          |
| ----------- | ----------------------------------------------------------------------------- |
| Framework   | **Astro** (정적 사이트, 가벼움, MDX·다국어) 또는 **Next.js App Router**         |
| Styling     | **CSS Modules** 또는 **Tailwind** (현재 디자인은 plain CSS — Tailwind로 변환 시 토큰화 가능) |
| 컴포넌트     | React or Astro `.astro` 컴포넌트 — 섹션별로 분리                                  |
| 폰트         | Space Grotesk + Pretendard Variable (둘 다 무료 · 아래 CDN 참고)               |
| 이미지       | `<picture>` + `width/height`로 CLS 방지. 발매 카드는 추후 실제 커버아트 들어갈 자리. |
| 애니메이션   | CSS scroll-snap·fade-in 정도면 충분 (현재 디자인엔 marquee 1개만 active)         |

---

## Design tokens

### Colors

```css
:root {
  --ink: #0A0A0A;          /* primary text + mark */
  --paper: #F6F4EF;        /* default warm cream surface */
  --paper-soft: #ECE9E1;   /* manifesto, library section background */
  --paper-warm: #FBFAF6;   /* card surfaces */
  
  --rule: rgba(10,10,10,0.10);
  --rule-strong: rgba(10,10,10,0.22);
  --sub: rgba(10,10,10,0.62);
  --mute: rgba(10,10,10,0.42);
  
  /* dark-section variants */
  --rule-d: rgba(246,244,239,0.10);
  --sub-d: rgba(246,244,239,0.60);
  --mute-d: rgba(246,244,239,0.38);
}
```

**그라데이션·드롭섀도우·기타 액센트 컬러 사용 금지** — 모노크롬 시스템이 브랜드 정체성.

### Typography

```css
/* fonts */
font-family-display: 'Space Grotesk', sans-serif;     /* 영문, 숫자, 사이즈 큰 헤드라인 */
font-family-body:    'Pretendard Variable', sans-serif; /* 한글, 본문 */
font-family-mono:    'Space Grotesk', monospace;       /* 시리얼·라벨·번호 */
```

**font-weight 사용 영역**
- `300` (Light) — 큰 디스플레이 타이포 (h1·hero)
- `400` (Regular) — 본문, 대부분 텍스트
- `500` (Medium) — 라벨, 강조, 버튼, 카드 제목

**type scale (px)**

| 토큰              | 사이즈                          | 용도                      |
| ----------------- | ------------------------------ | ------------------------- |
| `text-hero`       | `clamp(64px, 8.5vw, 152px)`    | hero headline             |
| `text-section`    | `80px`                         | section h2                |
| `text-cta`        | `clamp(48px, 5.5vw, 88px)`     | CTA strip h2              |
| `text-manifesto`  | `clamp(40px, 4.4vw, 64px)`     | 인용구                    |
| `text-h3`         | `40px`                         | 보조 헤드라인             |
| `text-faq`        | `26px`                         | FAQ 질문                  |
| `text-feature`    | `26px`                         | feature 카드 제목         |
| `text-platform`   | `22px`                         | 플랫폼 카드 이름          |
| `text-lede`       | `22px`                         | hero 본문                 |
| `text-quote`      | `22px`                         | press 인용                |
| `text-kicker`     | `18px`                         | 섹션 부제목               |
| `text-body`       | `16-17px`                      | 일반 본문                 |
| `text-cap`        | `14px`                         | 캡션·메뉴                 |
| `text-label`      | `12-13px`                      | 라벨 (letter-spacing 0.22em uppercase) |
| `text-eyebrow`    | `12px`                         | 섹션 위 작은 라벨         |
| `text-meta`       | `11-12px`                      | 푸터 메타                 |

### Spacing

| 토큰              | 값                         |
| ----------------- | -------------------------- |
| `--pad-x`         | `clamp(24px, 5vw, 80px)`   |
| section padding   | `120-160px` 상/하          |
| section gap       | `80px` (head → content)    |
| grid gap          | `24px` (cards), `1px` (rule cells) |
| card padding      | `32-48px`                  |

### Radius

| 용도          | 값        |
| ------------ | --------- |
| 버튼·pill    | `999px`   |
| 작은 배지    | `4px`     |
| 카드 (없음)  | `0`       |

> 카드에 둥근 모서리 없음 — 직각 모서리가 브랜드 시그니처. 버튼만 pill 모양.

### Mark (헤어라인 로고)

100×100 viewBox, 두 path:
```html
<svg viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="2.6"/>
  <polyline points="28,34 38,68 50,48 62,68 72,34"
    stroke="currentColor" stroke-width="3"
    stroke-linejoin="miter" stroke-linecap="butt"/>
</svg>
```

`fill="none"`로 SVG 래퍼 만들고, `<svg>` 안 stroke는 `currentColor` — 부모 `color`로 색 제어. React 컴포넌트화 권장:

```tsx
export const Mark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.6"/>
    <polyline points="28,34 38,68 50,48 62,68 72,34"
      stroke="currentColor" strokeWidth="3"
      strokeLinejoin="miter" strokeLinecap="butt"/>
  </svg>
);
```

`logo/` 폴더의 SVG/PNG 마스터 파일도 같이 사용 가능 (path outline, 폰트 의존성 없음).

---

## Page sections

페이지는 위에서 아래로 14개 섹션. 디자인 파일을 같이 보면서 작업 권장.

### 1. Nav (`<nav class="top">`)

- **Position**: sticky top, z-index 50
- **Background**: `rgba(246,244,239,0.85)` + `backdrop-filter: blur(14px)`
- **Border-bottom**: `1px solid var(--rule)`
- **Height**: `72px`
- **왼쪽**: Mark (30×30) + "WooriMedia" (Space Grotesk 500 17px) + "우리미디어" (Pretendard 400 11px, letter-spacing 0.14em, --sub)
- **중앙**: 메뉴 5개 — What · Platforms · Library · For Partners · FAQ (14px, --sub)
- **오른쪽**: "시작하기" CTA — 검정 pill 버튼 (10px 18px)
- **반응형**: mobile에서 `.links` hidden

### 2. Hero (`<section class="hero">`)

- **Padding**: 80px 0 120px
- **Layout**: 2-col grid (1.4fr / 1fr), bottom-aligned, min-height 76vh
- **왼쪽**:
  - eyebrow "WooriMedia · Streaming · Studio Audio · Cinema Vision"
  - Headline "USB 한 번, 평생 재생." — Space Grotesk 300, `clamp(64px, 8.5vw, 152px)`, letter-spacing -0.04em
    - "한 번" 부분만 Pretendard 400 (em 태그)
  - Lede paragraph (max-width 380px)
  - CTAs: "앱 다운로드" (primary) + "우리미디어란 →" (ghost)
- **오른쪽**:
  - 통계 3개 right-aligned: "8 Platforms", "96kHz Studio audio", "4K Cinema vision"
- **배경 데코**: 오른쪽 상단에 거대 Mark (720×720, opacity 0.05, position absolute)

### 3. Marquee (`<div class="marquee">`)

- Border top + bottom, 28px padding
- 무한 가로 스크롤 텍스트 — 50s linear infinite
- 콘텐츠: 8개 플랫폼 이름 + 기술 사양 + 도트(`·`) 구분자
- **중요**: 텍스트를 2번 복제해서 `translateX(-50%)`로 끊김 없는 루프

```css
.marquee-track { animation: marquee 50s linear infinite; }
@keyframes marquee { to { transform: translateX(-50%); } }
```

### 4. Manifesto (`<section class="manifesto">`)

- **Background**: `var(--paper-soft)` (#ECE9E1)
- **Padding**: 160px 0
- 큰 인용구 (Pretendard 300, `clamp(40px, 4.4vw, 64px)`, max-width 1100px)
  - 일부 단어에 `<span class="acc">` (--mute 컬러) 적용
- 아래 라벨 + 우측 링크 (border-top: 1px var(--rule))

### 5. Features (`<section id="what" class="bay">`)

- Section head: eyebrow + h2 + kicker
- **4-cell grid**: `gap: 1px; background: var(--rule)` (grid line이 hairline rule 역할)
- 각 cell: 48px 32px padding, min-height 320px
  - 번호 (mono, 0.2em letter-spacing)
  - 커스텀 라인 아이콘 (56×56, stroke 1.5)
  - h4 (Pretendard 500 26px)
  - p (16px, --sub)

### 6. How it works (`<section class="how">`)

3-step horizontal layout:
- Grid: `1fr 40px 1fr 40px 1fr`
- 각 step: border-top 1.5px solid ink, 36px padding-top
  - 번호 (mono)
  - h4 (Pretendard 500 28px)
  - p
  - **`.visual`**: aspect-ratio 5/3, `margin-top: auto`로 카드 하단 정렬, paper-soft 배경 + 1px rule border, 안에 라인 일러스트 SVG
- 화살표 컬럼: "→" 36px --mute

### 7. Platforms (`<section id="platforms" class="platforms">`) **[DARK]**

- **Background**: var(--ink), color var(--paper)
- 8 platform cards in 4-col grid
- Card: rgba(255,255,255,0.04) + 1px border
  - 상태 배지 right-top (LIVE = 흰 테두리 흰 글자, SOON = mute)
  - 글리프 아이콘 (40×40, opacity 0.85)
  - 이름 (Pretendard 500 22px)
  - 설명 (Space Grotesk 14px, --sub-d, margin-top: auto)
- hover: background 살짝 밝게

### 8. Quality Compare (`<section class="compare">`)

- 큰 테이블 (margin-top 64px)
- 헤더: Space Grotesk 14px uppercase, letter-spacing 0.16em
- 우리미디어 컬럼: `<th class="us">` `<td class="us">` — 배경 살짝 어두움 + bold
- 행 라벨: uppercase mono style 14px

### 9. Library (`<section id="library" class="library">`)

- **Background**: var(--paper-soft)
- 4 release cards in 4-col grid
- 카드:
  - cover (aspect 1:1) — `linear-gradient`로 검정 톤 다양화 (`.cover-v1` ~ `.cover-v8` 클래스)
  - 우상단 워터마크 Mark (opacity 0.6, 30×30)
  - 좌하단 카테고리 배지 (paper 배경, mono 10px)
  - meta: 제목 (Pretendard 500 18px) + 서브 + 가격 라인
- hover: translateY(-3px)

### 10. For Partners (`<section id="partners" class="partners">`)

- 2-col: 1fr / 1.2fr
- 왼쪽: section head + 큰 h2 + lede + 링크 ("파트너 데크 요청 →")
- 오른쪽: 4개 포인트를 `gap: 1px` rule-grid로 (Feature 섹션과 같은 기법)
  - 각 row: 50px 1fr auto — 번호 / 제목·설명 / 화살표

### 11. Press (`<section class="press">`) **[DARK]**

- 3 quote cards (background var(--ink), border rule-d)
- 인용구 자동으로 큰따옴표 추가 (CSS `::before "` / `::after "`)
- 하단 reference logo 라인 — uppercase letter-spacing 0.18em

### 12. FAQ (`<section id="faq" class="faq">`)

- 6개 아코디언 (HTML `<details>` 사용 — JS 필요 없음)
- 각 details: border-bottom 1px rule, 28px padding
- summary: Pretendard 400 26px + 우측 `+` toggle (open 시 45° 회전)
- 답변: Pretendard 400 17px, --sub, max-width 880px

### 13. CTA Strip (`<section id="cta" class="cta-strip">`)

- Background paper-soft, text-align center
- 큰 h2 + lede + 두 버튼

### 14. Footer (`<footer class="site">`) **[DARK]**

- 5-col grid: brand / Product / For Partners / Resources / Contact
- 거대한 페이드 워드마크 (`.megamark` — clamp(100px, 18vw, 280px), opacity 0.06)
- 하단 메타: © · Privacy · Terms · 도메인

---

## Interactions

### 인터랙티브 요소

| Element     | Behavior                                                  |
| ----------- | --------------------------------------------------------- |
| Nav links   | 같은 페이지 anchor 스크롤 (`#what`, `#platforms` 등)         |
| Marquee     | CSS animation infinite scroll                              |
| FAQ details | 네이티브 `<details>` 토글 — JS 불필요                       |
| Lib card    | hover: `translateY(-3px) transition: transform .25s`       |
| Platform    | hover: background 살짝 밝아짐                              |
| CTAs        | hover: `background: #1f1f1f` (primary), border 진해짐 (ghost) |

### 추후 추가 가능

- Scroll-triggered fade-in (Intersection Observer)
- Hero mark drift parallax (transform on scroll)
- Library 카드 — 클릭 시 모달 / 상세 페이지
- 다국어 토글 (KO / EN)

---

## Assets needed

### 로고 (이미 `logo/` 폴더에 포함)

- `woorimedia-mark-only.svg` — favicon, nav, footer mark
- `woorimedia-mark-only-paper.svg` — dark section에서 사용 가능
- `woorimedia-logo-master.svg` — 전체 lockup 필요한 경우
- `woorimedia-horizontal.svg` — 가로 lockup
- 자세한 사용법은 `logo/README.md` · 컬러 토큰은 `logo/COLORS.md`

### 폰트 (CDN 또는 self-host)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
```

production self-host 권장 — Pretendard는 GitHub release에서 woff2 다운로드 가능.

### 추후 실제 콘텐츠 자리

- Library 4개 카드의 cover 그라데이션 → 실제 앨범/콘텐츠 커버 아트
- Press section의 reference 로고 텍스트 → 실제 미디어 로고 SVG
- 추후 Hero에 실제 USB 제품 사진 또는 짧은 영상 루프 추가 고려

---

## Files

```
handoff_woorimedia_site/
├── README.md                              ← (this file)
├── design/
│   ├── woori-media.com Redesign.html      ← 메인 디자인 레퍼런스
│   └── site.css                           ← 모든 스타일
└── logo/                                  ← 로고 마스터 파일들
    ├── README.md
    ├── COLORS.md
    ├── woorimedia-mark-only.svg           ← 권장 사용
    ├── woorimedia-logo-master.svg
    ├── woorimedia-horizontal.svg
    └── ... (다크/라이트 변형 + PNG)
```

---

## Implementation checklist

1. **셋업**
   - [ ] 프레임워크 결정 (Astro / Next.js / 기존 코드베이스)
   - [ ] 폰트 로드 (Google Fonts + Pretendard CDN 또는 self-host)
   - [ ] design tokens을 CSS variables 또는 Tailwind config로 추출
   - [ ] `<Mark />` 컴포넌트 작성

2. **공통 컴포넌트**
   - [ ] `<Section>` wrapper (light / dark 변형)
   - [ ] `<SectionHead>` (eyebrow + h2 + kicker)
   - [ ] `<Button>` (primary / ghost)
   - [ ] `<Lockup>` (mark + WooriMedia + 우리미디어)

3. **섹션별 구현** — 1번부터 14번까지 순서대로

4. **반응형**
   - [ ] mobile에서 4-col → 2-col, 2-col → 1-col
   - [ ] hero 그리드 1-col로
   - [ ] how-grid 화살표 90° 회전

5. **마무리**
   - [ ] favicon (`logo/woorimedia-mark-only.svg`)
   - [ ] meta tags (OG image · description · title)
   - [ ] sitemap · robots.txt
   - [ ] accessibility — aria-labels, focus rings, semantic html

---

## Open questions / decisions for the developer

- 실제 콘텐츠(앨범 커버, 아티스트 이름) 자리 — CMS 연결 또는 정적 데이터?
- 다국어 지원 범위 (KO + EN?)
- 결제·구매 플로우는 별도 백엔드 필요 — 이 사이트는 마케팅 + 다운로드 게이트만
- Web Player(play.woori-media.com)는 별도 앱 — 이 사이트는 링크 아웃만

## Contact

발주·문의: 박용훈 상무 / yonghonp@naver.com / 010-9790-4127
