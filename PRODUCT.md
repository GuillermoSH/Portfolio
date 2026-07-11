# Product

## Register

brand

## Users

Recruiters and engineering leads evaluating hire potential; fellow developers comparing craft and stack depth; occasional clients or collaborators checking credibility before outreach. They arrive from LinkedIn, GitHub, or a shared link—often on a phone between meetings or on a laptop after hours. The job: quickly understand who Guillermo is, what he ships, and whether to keep reading or reach out.

## Product Purpose

A personal portfolio for Guillermo Sicilia Hernández—a full-stack developer in Puerto de la Cruz (Tenerife) with corporate experience in Angular, React, Spring Boot, Oracle SQL, and integration work. Success means a clear professional signal in under 60 seconds: credible experience, real projects, current stack, and a direct path to LinkedIn or GitHub. The site is the product; first impression is the deliverable.

## Brand Personality

**Direct · Night-desk · Signal**

Voice is confident without hype—show the work, name the stack, skip filler. Copy is condensed per section; lists and tags carry proof. Orange-red accent marks action and emphasis; near-black canvas carries focus. Emotional goal: *trusted specialist you would pair with on a hard integration*, not *generic template developer*.

## Anti-references

- Cream/sand body backgrounds and teal-accent “developer portfolio” clichés.
- SaaS landing scaffolding: eyebrow on every section, numbered 01/02/03 markers, identical icon-card grids, hero-metric blocks.
- Long bullet paragraphs per section; card grids where a flat list suffices.
- Glassmorphism cards, gradient text, ghost-card border+heavy-shadow pairing, oversized 32px+ card radii.
- FontAwesome icon grids and decorative mono labels.

## Design Principles

1. **Direct signal** — One line per role, one line per project; tags for stack proof.
2. **Dark is home** — Default experience is dark off-black; light mode is a deliberate alternate.
3. **Accent sparingly** — Red-orange marks CTAs, active nav, featured project, timeline dots.
4. **Practice what you preach** — Performance (lazy Three.js hero), accessibility, reduced-motion respect.
5. **Bilingual parity** — ES/EN toggle with equivalent structure for screen readers.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**: body text ≥4.5:1 contrast on surfaces; large text and UI components ≥3:1. Respect `prefers-reduced-motion` (static hero fallback, instant GSAP/Framer). Theme toggle keyboard-operable with visible focus. Bilingual ES/EN with `lang` on `<html>`. Orange accent never sole state indicator.

## Motion

- **Three.js** — Hero only: particle field + wire grid; lazy-loaded; disabled when reduced-motion or no WebGL.
- **GSAP** — Hero stagger on load; subtle section fade on scroll (content visible without JS).
- **Framer Motion** — Nav indicator, project row hover, tag micro-scale.
