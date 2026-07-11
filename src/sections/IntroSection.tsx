import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CHIPS, SITE } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { HeroScene } from "../components/HeroScene";
import { heroScrollRef, resetHeroScroll } from "../lib/heroScroll";

gsap.registerPlugin(ScrollTrigger);

type IntroSectionProps = {
  locale: Locale;
};

export function IntroSection({ locale }: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetHeroScroll();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const content = contentRef.current;
    const cue = cueRef.current;
    if (!section || !sticky) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      section.classList.remove("hero-section--scroll");
      return;
    }

    section.classList.add("hero-section--scroll");

    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        scaleX: 0,
        duration: 0.7,
        ease: "power3.out",
        transformOrigin: "left center",
      });
      gsap.from(".hero-item", {
        y: 14,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.12,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        onUpdate: (self) => {
          heroScrollRef.current = self.progress;
        },
        onLeave: () => {
          heroScrollRef.current = 1;
        },
        onLeaveBack: () => {
          heroScrollRef.current = 0;
        },
      });

      if (content) {
        gsap.to(content, {
          y: -48,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
          },
        });
      }

      if (cue) {
        gsap.to(cue, {
          opacity: 0,
          y: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "30% bottom",
            scrub: true,
          },
        });
      }
    }, section);

    return () => {
      ctx.revert();
      resetHeroScroll();
    };
  }, []);

  const stackLine = HERO_CHIPS.join(" · ");

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="hero-section relative"
      aria-label={tr(locale, "Inicio", "Home")}
    >
      <div
        ref={stickyRef}
        className="hero-sticky sticky top-14 h-[calc(100dvh-3.5rem)] overflow-hidden"
      >
        <HeroScene />
        <div className="hero-vignette pointer-events-none" aria-hidden="true" />

        <div
          ref={contentRef}
          className="relative z-10 flex h-full items-end pb-20 md:items-center md:pb-0"
        >
          <div className="section-block w-full !py-0">
            <div className="max-w-xl">
              <p className="hero-item text-[11px] font-semibold uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.14em]">
                {SITE.location}
              </p>

              <span
                className="hero-line mt-4 block h-px w-10 origin-left bg-accent sm:mt-5 sm:w-12"
                aria-hidden="true"
              />

              <h1 className="hero-item mt-4 text-[clamp(2.25rem,11vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-ink sm:mt-6">
                {SITE.name.split(" ").map((part, i) => (
                  <span key={part} className="block">
                    {i === 1 ? (
                      <span className="text-accent">{part}</span>
                    ) : (
                      part
                    )}
                  </span>
                ))}
              </h1>

              <p className="hero-item mt-4 text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg">
                <span className="font-semibold text-ink">{SITE.title}</span>
                {" — "}
                {tr(
                  locale,
                  "integración, backend y frontend.",
                  "integration, backend and frontend.",
                )}
              </p>

              <ul
                className="hero-item mt-4 flex flex-wrap gap-2 sm:mt-5 md:hidden"
                aria-label={tr(locale, "Stack principal", "Core stack")}
              >
                {HERO_CHIPS.map((chip) => (
                  <li key={chip}>
                    <span className="inline-block rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted">
                      {chip}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="hero-item mt-5 hidden text-sm leading-relaxed text-muted/90 md:block">
                {stackLine}
              </p>

              <div className="hero-item mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-10 sm:gap-x-6">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-deep"
                >
                  LinkedIn
                  <span
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
                >
                  GitHub
                  <span
                    className="text-muted transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={cueRef}
          className="hero-scroll-cue pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-2 md:bottom-8"
          aria-hidden="true"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            {tr(locale, "Desplazar", "Scroll")}
          </span>
          <span className="hero-scroll-cue__line" />
        </div>
      </div>
    </section>
  );
}
