# WooriMedia · 우리미디어 site
# Implementation guidance for Claude Code

You are implementing the woori-media.com marketing-site redesign in this project.

## What to do FIRST

1. **Read `design_handoff_woorimedia_site/README.md` end-to-end.**
   It contains all design tokens, section-by-section specs, interactions, and assets. Do not start coding until you have read it.

2. **Open `design_handoff_woorimedia_site/design/woori-media.com Redesign.html` in a browser.**
   This is the visual source of truth — the actual final look. Scroll through every section before writing any code.

3. **Inspect `design_handoff_woorimedia_site/design/site.css`.**
   Same CSS the design uses. Lift exact values from here when porting to your framework's styling system. Don't re-derive numbers from screenshots — they're all in this file.

## Implementation rules

- **Brand colors are absolute.** Ink `#0A0A0A`, Paper `#F6F4EF`, the two soft variants, and rgba subtle steps documented in the README. No gradients, no shadows on the mark, no other accent colors.
- **The mark is a single, fixed SVG.** Use the React component shown in the README. Always pass color via `currentColor` — never hardcode a fill/stroke.
- **Cards have square corners.** Only buttons get the pill radius. This is a brand signature, not a stylistic accident.
- **Text outline is non-negotiable.** Stay within the type scale in the README — don't invent new sizes.
- **Two typefaces only:** Space Grotesk (Latin / numbers / display) and Pretendard Variable (Korean / body). Self-host for production.
- **Sections alternate light and dark** for visual rhythm. Don't merge them.

## Framework

- If the project already has a framework (React, Next.js, Astro, etc.), use it with its conventions.
- If empty, default to **Astro** with `.astro` components per section. Static-site output, easy MDX, native multilingual routing.
- Do not ship the HTML in `design/` to production — it's a reference.

## File structure suggestion

```
src/
  components/
    Mark.tsx
    Section.tsx
    SectionHead.tsx
    Button.tsx
    Lockup.tsx
    Nav.tsx
    Footer.tsx
  sections/
    Hero.tsx
    Marquee.tsx
    Manifesto.tsx
    Features.tsx
    HowItWorks.tsx
    Platforms.tsx
    QualityCompare.tsx
    Library.tsx
    Partners.tsx
    Press.tsx
    FAQ.tsx
    CTAStrip.tsx
  styles/
    tokens.css
    global.css
  pages/
    index.astro
public/
  logo/   (copy from handoff)
  fonts/  (self-hosted woff2)
```

## After implementation

- Test all anchor-scroll nav links work
- Check mobile breakpoint at 900px — grids should collapse cleanly
- Verify the marquee animation runs seamlessly (no jump on loop)
- Verify FAQ `<details>` toggles without JS
- Check the hero mark drift in background doesn't push hero content
- Confirm font-weight 300 renders correctly for the big display text

## Don't

- Don't add color outside the palette
- Don't add gradients or shadows to the mark
- Don't use rounded card corners
- Don't change the mark stroke widths (circle 2.6 / W 3.0)
- Don't introduce a third typeface
- Don't add unnecessary animation — the current design is intentionally still, with only the marquee in motion
