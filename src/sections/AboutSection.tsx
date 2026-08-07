import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealSection } from "../components/RevealSection";
import { NAV_LINKS, NAV_LINKS_EN } from "../data/site";
import type { Locale } from "../lib/i18n";
import { aboutIntro, aboutKeywords, type AboutKeyword } from "../lib/present";

gsap.registerPlugin(ScrollTrigger);

type AboutSectionProps = {
  locale: Locale;
};

const NOTE_COLORS = ["var(--accent)", "var(--secondary)"];

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#sobre-mi",
  )!.label;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type HighlightState = {
  variantCounter: number;
  usedOnce: Set<string>;
};

function highlightKeywords(
  text: string,
  keywords: AboutKeyword[],
  state: HighlightState,
): ReactNode[] {
  const present = keywords.filter((keyword) => {
    if (!text.toLowerCase().includes(keyword.text.toLowerCase())) return false;
    if (keyword.once && state.usedOnce.has(keyword.text.toLowerCase())) return false;
    return true;
  });
  if (present.length === 0) return [text];

  const pattern = new RegExp(`(${present.map((k) => escapeRegExp(k.text)).join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const matched = present.find((keyword) => keyword.text.toLowerCase() === part.toLowerCase());
    if (!matched) return part;

    if (matched.once) {
      if (state.usedOnce.has(matched.text.toLowerCase())) return part;
      state.usedOnce.add(matched.text.toLowerCase());
    }

    const variant = state.variantCounter++;
    const style = {
      "--note-color": NOTE_COLORS[variant % NOTE_COLORS.length],
    } as CSSProperties;

    return (
      <span key={index} className="about-keyword" style={style}>
        <span className="about-keyword__note" aria-hidden="true">
          {part}
        </span>
        {part}
      </span>
    );
  });
}

export function AboutSection({ locale }: AboutSectionProps) {
  const titleId = "about-title";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const keywords = gsap.utils.toArray<HTMLElement>(".about-keyword", container);
    if (keywords.length === 0) return;

    const lineAlignedRect = (node: Node | null, lineTop: number): DOMRect | null => {
      if (!node) return null;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = Array.from(range.getClientRects());
      return rects.find((rect) => Math.abs(rect.top - lineTop) < 4) ?? null;
    };

    const fitNotes = () => {
      keywords.forEach((el) => {
        const note = el.querySelector<HTMLElement>(".about-keyword__note");
        if (!note) return;
        const wordRect = el.getBoundingClientRect();
        const noteWidth = note.scrollWidth;
        if (!wordRect.width || !noteWidth) return;

        const prevRect = lineAlignedRect(el.previousSibling, wordRect.top);
        const nextRect = lineAlignedRect(el.nextSibling, wordRect.top);
        const center = (wordRect.left + wordRect.right) / 2;
        const leftGap = center - (prevRect ? prevRect.right : wordRect.left - wordRect.width);
        const rightGap = (nextRect ? nextRect.left : wordRect.right + wordRect.width) - center;
        const available = Math.max(wordRect.width, Math.min(leftGap, rightGap) * 2 * 0.94);

        const scale = Math.min(1, available / noteWidth);
        el.style.setProperty("--note-fit-scale", scale.toFixed(3));
      });
    };

    fitNotes();
    document.fonts?.ready.then(fitNotes).catch(() => {});

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      keywords.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(keywords, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((el, index) => {
            gsap.delayedCall(index * 0.12, () => el.classList.add("is-visible"));
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [locale]);

  const keywords = aboutKeywords(locale);
  const highlightState: HighlightState = { variantCounter: 0, usedOnce: new Set() };

  return (
    <RevealSection
      id="sobre-mi"
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28 md:px-8"
      ariaLabelledBy={titleId}
    >
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center"
      >
        <h2 id={titleId} className="section-title">
          {sectionTitle(locale)}
        </h2>

        <div className="max-w-2xl space-y-6">
          {aboutIntro(locale).map((paragraph, index) => (
            <p key={index} className="text-sm leading-loose text-ink/90 sm:text-base">
              {highlightKeywords(paragraph, keywords, highlightState)}
            </p>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
