import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { HeroScene } from "../components/HeroScene";
import { heroScrollRef, resetHeroScroll } from "../lib/heroScroll";
import { useTypewriter } from "../hooks/useTypewriter";
import { ToolIcon } from "../components/ToolIcon";

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

  const typedPhrases = useMemo(() => {
    const firstName = SITE.name.split(" ")[0];
    return [
      tr(locale, `¡Hola! Soy ${firstName}`, `Hi! I'm ${firstName}`),
      tr(locale, "Desarrollador Full-stack", "Full-stack Developer"),
    ];
  }, [locale]);
  const { text: typedText, phase: typedPhase } = useTypewriter(typedPhrases);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="hero-section relative"
      aria-label={tr(locale, "Inicio", "Home")}
    >
      <div
        ref={stickyRef}
        className="hero-sticky sticky top-0 hero-sticky__panel overflow-hidden"
      >
        <HeroScene />
        <div className="hero-vignette pointer-events-none" aria-hidden="true" />

        <div
          ref={contentRef}
          className="relative z-10 flex h-full items-end pb-32 md:items-center md:pb-0"
        >
          <div className="section-block w-full !max-w-6xl !py-0">
            <div className="max-w-xl">
              <p className="hero-item text-[11px] font-semibold uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.14em]">
                {SITE.location}
              </p>

              <span
                className="hero-line mt-4 block h-px w-10 origin-left bg-accent sm:mt-5 sm:w-12"
                aria-hidden="true"
              />

              <h1 className="hero-item mt-4 min-h-[1.3em] whitespace-nowrap text-[clamp(1.2rem,5.3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:mt-6">
                <span aria-hidden="true" className="hero-typed-row">
                  {typedText}
                  <span
                    className={`hero-caret ${typedPhase !== "idle" ? "hero-caret--solid" : ""}`}
                    aria-hidden="true"
                  />
                </span>
                <span className="sr-only">
                  {tr(
                    locale,
                    `¡Hola! Soy ${SITE.fullName}, desarrollador full-stack.`,
                    `Hi! I'm ${SITE.fullName}, a full-stack developer.`,
                  )}
                </span>
              </h1>

              <p className="hero-item mt-4 text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg">
                {tr(
                  locale,
                  "Integración, backend y frontend.",
                  "Integration, backend and frontend.",
                )}
              </p>

              <div className="hero-item mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta hero-cta--primary group"
                >
                  <ToolIcon
                    label="LinkedIn"
                    className="hero-cta__icon transition-transform group-hover:scale-110"
                  />
                  LinkedIn
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta hero-cta--secondary group"
                >
                  <ToolIcon
                    label="GitHub"
                    className="hero-cta__icon transition-transform group-hover:scale-110"
                  />
                  GitHub
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
