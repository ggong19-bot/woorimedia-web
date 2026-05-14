# WooriMedia · Logo Master Files

Production-ready logo assets for the **우리미디어 (WooriMedia)** brand.
All vector files are **pure `<path>` SVG with text already outlined** — no font dependency, no embedded raster, no background boxes.

---

## Files

### Master logo (mark + Latin wordmark + Korean wordmark, stacked)

| File                                       | Use on                |
| ------------------------------------------ | --------------------- |
| `woorimedia-logo-master.svg`               | Light backgrounds     |
| `woorimedia-logo-master-paper.svg`         | Dark backgrounds      |
| `woorimedia-logo-master-white.svg`         | Photography / video   |
| `woorimedia-logo-1024.png`                 | 1024×1024 transparent |
| `woorimedia-logo-512.png` · `-256.png`     | Smaller PNG sizes     |

### Mark only (square)

| File                                       | Use on                |
| ------------------------------------------ | --------------------- |
| `woorimedia-mark-only.svg`                 | Light backgrounds     |
| `woorimedia-mark-only-paper.svg`           | Dark backgrounds      |
| `woorimedia-mark-only-white.svg`           | Photography / video   |

### Horizontal lockup (mark + Korean wordmark)

| File                                       | Use on                |
| ------------------------------------------ | --------------------- |
| `woorimedia-horizontal.svg`                | Light backgrounds     |
| `woorimedia-horizontal-paper.svg`          | Dark backgrounds      |
| `woorimedia-horizontal-white.svg`          | Photography / video   |

### Dark mode (gradient baked into SVG · ready-to-use tile)

| File                                       | Use on                |
| ------------------------------------------ | --------------------- |
| `woorimedia-logo-master-dark.svg`          | Dark mode splash / hero · master |
| `woorimedia-mark-only-dark.svg`            | Dark mode mark tile   |
| `woorimedia-horizontal-dark.svg`           | Dark mode header tile |
| `woorimedia-logo-1024-dark.png`            | 1024 · dark · PNG     |
| `woorimedia-logo-512-dark.png`             | 512 · dark · PNG      |

The dark-mode variants ship the gradient background **inside** the SVG (135°, `#4A4A4A` → `#1A1A1A`). Use them where you want the gradient pre-composed — splash screens, dark-mode hero tiles, share-card backgrounds. For most UI surfaces, prefer the `-paper` variant on a flat ground.

### TV launcher banner (320×180)

| File                                       | Use on                |
| ------------------------------------------ | --------------------- |
| `woorimedia-tv-banner.png`                 | Android TV · launcher |
| `woorimedia-tv-banner-2x.png`              | Retina source         |
| `woorimedia-tv-banner.svg`                 | Vector source         |

### Color spec

| File                                       | Notes                 |
| ------------------------------------------ | --------------------- |
| `COLORS.md`                                | HEX · RGB · token names |

---

## Specs

- **Mark geometry**: 100-unit grid · circle r=45 stroke 2.6 · W polyline stroke 3.0
- **Typeface (Latin)**: Space Grotesk Regular · tracking +0.18em (caps) — outlined to path
- **Typeface (Korean)**: Pretendard Medium · tracking +0.36em (master) / 0 (horizontal) — outlined to path
- **Colors**: see `COLORS.md`. Default is Ink `#0A0A0A`; variants suffixed `-paper` (cream) and `-white`.
- **No raster embedded**: SVGs are 100% vector path data
- **No fonts required at runtime**: text was converted to outlined paths via opentype.js
- **No Korean characters in file names or viewBox**: safe for any build pipeline
- **No background fill** on the SVG canvas (except the TV banner, which is intended to ship with a dark ground)

---

## Clear space & minimum size

- **Clear space around mark**: 25% of mark width on all sides
- **Mark minimum**: 16px (favicon) · 24px (UI) · 120px (print)
- **Horizontal lockup minimum**: 88px wide
- **Master logo minimum**: 160px wide

---

## Quick reference (HTML / React)

```html
<!-- inline SVG · light bg -->
<img src="/logo/woorimedia-horizontal.svg" alt="WooriMedia" height="32"/>

<!-- inline SVG · dark bg -->
<img src="/logo/woorimedia-horizontal-paper.svg" alt="WooriMedia" height="32"/>

<!-- favicon -->
<link rel="icon" type="image/svg+xml" href="/logo/woorimedia-mark-only.svg"/>
```

```jsx
// React — use the SVG via require / import as a component for theming
import LogoMark from './woorimedia-mark-only.svg';
<LogoMark style={{ color: 'var(--woori-ink)', width: 32 }} />
```

Need a variant that's not in this pack (filled mark? outlined Latin wordmark? specific app-icon size?) → ping design.
