---
name: Guillermo Sicilia — Portfolio
description: Minimal dark-first portfolio with red-orange accent and Three.js hero
colors:
  canvas-dark: "oklch(0.09 0.008 265)"
  surface-dark: "oklch(0.13 0.01 265)"
  canvas-light: "oklch(0.97 0.004 265)"
  surface-light: "oklch(0.99 0.002 265)"
  ink-dark: "oklch(0.93 0.006 265)"
  ink-light: "oklch(0.18 0.012 265)"
  muted-dark: "oklch(0.58 0.018 265)"
  muted-light: "oklch(0.48 0.018 265)"
  accent: "oklch(0.63 0.19 38)"
  accent-deep: "oklch(0.55 0.2 36)"
  accent-on: "oklch(0.14 0.02 38)"
typography:
  sans:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  display:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw + 1rem, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  section:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2vw + 1rem, 1.875rem)"
    fontWeight: 600
    letterSpacing: "-0.025em"
rounded:
  sm: "6px"
  md: "8px"
  pill: "9999px"
spacing:
  section: "clamp(5rem, 10vw, 7rem)"
  block: "max-width 48rem (max-w-3xl)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-on}"
    rounded: "{rounded.md}"
  tag:
    border: "1px solid border token"
    rounded: "{rounded.pill}"
---

# Design System: Guillermo Sicilia Portfolio (Minimal Rebuild)

## Overview

**Creative North Star: "Night Signal"**

Near-black canvas, near-white ink, one red-orange accent. Single sans family (Albert Sans) with weight contrast. No card grids, no section eyebrows—flat lists, timeline, tag rows. Hero carries a lazy-loaded Three.js particle field; everything else is typographic and direct.

Dark mode is default; light mode swaps CSS custom properties on `:root` / `.dark`.

## Colors

Palette character: *late-night screen, one warm accent line.*

| Token | Dark | Light |
|-------|------|-------|
| `--canvas` | `oklch(0.09 0.008 265)` | `oklch(0.97 0.004 265)` |
| `--surface` | `oklch(0.13 0.01 265)` | `oklch(0.99 0.002 265)` |
| `--ink` | `oklch(0.93 0.006 265)` | `oklch(0.18 0.012 265)` |
| `--muted` | `oklch(0.58 0.018 265)` | `oklch(0.48 0.018 265)` |
| `--accent` | `oklch(0.63 0.19 38)` | same |
| `--accent-deep` | `oklch(0.55 0.2 36)` | same |

Hero WebGL fallback uses radial accent gradient at ≤8% opacity on canvas.

## Typography

- **Albert Sans** only — weights 400–700 via Google Fonts.
- H1 max `3.75rem`; letter-spacing floor `-0.03em` (not tighter).
- Body max width ~65ch via `max-w-prose` on key lines.
- `text-wrap: balance` on headings; `pretty` on paragraphs.

## Layout

- Max content width `max-w-3xl`, centered, horizontal padding `px-5` / `sm:px-8`.
- Sections separated by `border-t border-border`, vertical rhythm `py-20` / `sm:py-28`.
- Experience: vertical timeline with accent dot + 1px border-left.
- Projects: divided list; featured project gets `border-l-2 border-accent`.
- Stack: definition list, label column + inline tags.

## Motion

| Layer | Tool | Behavior |
|-------|------|----------|
| Hero bg | Three.js (R3F) | Particles + grid; mouse parallax; lazy chunk |
| Hero copy | GSAP | Stagger fade-up `.hero-item` |
| Sections | GSAP ScrollTrigger | Subtle y+opacity from visible default |
| Nav / hover | Framer Motion | `layoutId` indicator; row nudge; tag scale |
| Reduced motion | CSS + guards | Static hero gradient; skip GSAP; Framer instant |

## Components

- **Nav** — Sticky, GS monogram, desktop anchor links, ES/EN + theme toggle.
- **Tag** — Pill, border only, no shadow.
- **LinkButton** — Filled accent or ghost border; external arrow SVG.
- **RevealSection** — GSAP scroll wrapper; semantic `<section>` + id.

## Do's and Don'ts

**Do**

- Condense copy at presentation layer (`present.ts`), not in `site.ts`.
- Lazy-load Three.js hero chunk.
- Keep featured project emphasis to one list item.

**Don't**

- Reintroduce Rajdhani/Source Sans / ember legacy tokens.
- Add card grids, FontAwesome, or long bullet lists in UI.
- Gate content visibility on animation classes.
