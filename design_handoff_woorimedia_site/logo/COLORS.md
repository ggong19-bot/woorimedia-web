# WooriMedia Logo · Color Spec

Production color tokens for code / design tooling. All values verified accessible on the intended ground.

---

## Primary palette

| Name        | Hex       | Role                                          |
| ----------- | --------- | --------------------------------------------- |
| **Ink**     | `#0A0A0A` | Primary brand color · mark + wordmark         |
| **Paper**   | `#F6F4EF` | Default surface · warm cream                  |
| **White**   | `#FFFFFF` | Mark on photography / video overlays only     |

### RGB / HSL

| Token  | HEX       | RGB                | HSL                 |
| ------ | --------- | ------------------ | ------------------- |
| Ink    | `#0A0A0A` | rgb(10, 10, 10)    | hsl(0, 0%, 4%)      |
| Paper  | `#F6F4EF` | rgb(246, 244, 239) | hsl(43, 30%, 95%)   |
| White  | `#FFFFFF` | rgb(255, 255, 255) | hsl(0, 0%, 100%)    |

---

## Secondary (UI / supporting copy)

| Name              | Hex                        | Role                                  |
| ----------------- | -------------------------- | ------------------------------------- |
| Ink subtle        | `rgba(10, 10, 10, 0.55)`   | Body / secondary text on light        |
| Paper subtle      | `rgba(246, 244, 239, 0.55)`| Body / secondary text on dark         |
| Ink hairline      | `rgba(10, 10, 10, 0.10)`   | Dividers · table rules on light       |
| Paper hairline    | `rgba(246, 244, 239, 0.10)`| Dividers · table rules on dark        |

---

## Logo variant → Background pairing

| Background context           | Use this variant suffix |
| ---------------------------- | ----------------------- |
| Light · Paper · white        | (none — default Ink)    |
| Dark · Ink · charcoal        | `-paper`                |
| Photography · video · busy   | `-white`                |

Example: on dark TV background → `woorimedia-horizontal-paper.svg`.

---

## Forbidden

- No gradients on the mark or wordmark
- No drop-shadow / glow / outer-stroke on the mark
- No tinting outside the three primary colors above
- Don't recolor individual paths (mark stroke + wordmark fill must share one color)

---

## Token names (suggested for tailwind / theme files)

```css
:root {
  --woori-ink: #0A0A0A;
  --woori-paper: #F6F4EF;
  --woori-white: #FFFFFF;
  --woori-ink-subtle: rgba(10, 10, 10, 0.55);
  --woori-paper-subtle: rgba(246, 244, 239, 0.55);
}
```

```js
// JS / TS
export const wooriColors = {
  ink:    '#0A0A0A',
  paper:  '#F6F4EF',
  white:  '#FFFFFF',
};
```

```yaml
# Android colors.xml equivalent
woori_ink:    "#FF0A0A0A"
woori_paper:  "#FFF6F4EF"
woori_white:  "#FFFFFFFF"
```
