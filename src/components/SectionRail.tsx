import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS, NAV_LINKS_EN } from "../data/site";
import { useSectionProgress } from "../hooks/useSectionProgress";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

type SectionRailProps = {
  locale: Locale;
};

const ES_HREFS = NAV_LINKS.map((l) => l.href);
const EN_HREFS = NAV_LINKS_EN.map((l) => l.href);

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+";

function ScrambleLabel({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);
  const wasActive = useRef(false);

  useEffect(() => {
    const becameActive = active && !wasActive.current;
    wasActive.current = active;

    if (!becameActive) {
      setDisplay(text);
      return;
    }

    const timers: number[] = [];
    const intervals: number[] = [];

    text.split("").forEach((char, index) => {
      if (char === " ") return;
      const ticks = 5 + Math.floor(Math.random() * 3);
      const delay = index * 70;

      const timeoutId = window.setTimeout(() => {
        let tick = 0;
        const intervalId = window.setInterval(() => {
          setDisplay((prev) => {
            const chars = prev.split("");
            chars[index] =
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            return chars.join("");
          });
          tick += 1;
          if (tick >= ticks) {
            window.clearInterval(intervalId);
            setDisplay((prev) => {
              const chars = prev.split("");
              chars[index] = char;
              return chars.join("");
            });
          }
        }, 45);
        intervals.push(intervalId);
      }, delay);
      timers.push(timeoutId);
    });

    return () => {
      timers.forEach(window.clearTimeout);
      intervals.forEach(window.clearInterval);
    };
  }, [active, text]);

  return <span className="section-rail__label">{display}</span>;
}

const FOOTER_CLEARANCE_PX = 32;

export function SectionRail({ locale }: SectionRailProps) {
  const links = locale === "en" ? NAV_LINKS_EN : NAV_LINKS;
  const hrefs = locale === "en" ? EN_HREFS : ES_HREFS;
  const { activeIndex, progress, scrollPercent, gapPx } = useSectionProgress(hrefs);
  const last = links.length - 1;
  const total = links.length;
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const syncFooterClearance = () => {
      rafId = null;
      const rail = railRef.current;
      const footer = document.querySelector<HTMLElement>(".site-footer");
      if (!rail || !footer) return;

      const naturalBottom = window.innerHeight / 2 + rail.offsetHeight / 2;
      const limit = footer.getBoundingClientRect().top - FOOTER_CLEARANCE_PX;
      const lift = Math.max(0, naturalBottom - limit);
      rail.style.setProperty("--rail-lift", `${lift}px`);
      rail.classList.toggle("section-rail--away", lift > window.innerHeight * 0.28);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(syncFooterClearance);
    };

    syncFooterClearance();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    ScrollTrigger.addEventListener("refresh", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ScrollTrigger.removeEventListener("refresh", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [gapPx]);

  return (
    <nav
      ref={railRef}
      className="section-rail"
      aria-label={tr(locale, "Secciones", "Sections")}
    >
      <span className="section-rail__counter" aria-hidden="true">
        <span className="section-rail__counter-digits">
          {String(activeIndex + 1)
            .padStart(2, "0")
            .split("")
            .map((digit, index) => (
              <span key={`${index}-${digit}`} className="section-rail__digit">
                {digit}
              </span>
            ))}
        </span>
        <span className="section-rail__counter-sep">/</span>
        {String(total).padStart(2, "0")}
      </span>

      <div className="section-rail__track-wrap">
        <span className="section-rail__track" aria-hidden="true" />
        <span
          className="section-rail__fill"
          style={{ height: `${progress * 100}%` }}
          aria-hidden="true"
        />
        <ul className="flex flex-col items-end">
          {links.map((link, index) => {
            const isActive = index === activeIndex;
            const isPassed = index < activeIndex;
            const mix = last > 0 ? (index / last) * 100 : 0;
            return (
              <li
                key={link.href}
                style={index < last ? { marginBottom: gapPx[index] } : undefined}
              >
                <a
                  href={link.href}
                  className={`section-rail__link ${
                    isActive ? "section-rail__link--active" : ""
                  } ${isPassed ? "section-rail__link--passed" : ""}`}
                  style={
                    {
                      "--node-color": `color-mix(in oklab, var(--secondary), var(--accent) ${mix}%)`,
                    } as CSSProperties
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  <ScrambleLabel text={link.label} active={isActive} />
                  <span className="section-rail__node" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <span className="section-rail__percent" aria-hidden="true">
        {Math.round(scrollPercent * 100)}%
      </span>
    </nav>
  );
}
