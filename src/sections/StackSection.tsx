import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  NAV_LINKS,
  NAV_LINKS_EN,
  PIPELINE_STEPS,
} from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { stackLead } from "../lib/present";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const STEP_COUNT = PIPELINE_STEPS.length;
const STEP_TRAVEL = 0.55;
/** Irregular checkpoints; last stop is 100 so Deploy→Ops lerps instead of jumping. */
const LAUNCH_STOPS = [11, 38, 64, 100] as const;
const DENSEST_STEP = PIPELINE_STEPS.reduce((best, current) =>
  current.tools.length > best.tools.length ? current : best,
);

function launchPctAtProgress(progress: number) {
  const max = Math.max(STEP_COUNT - 1, 1);
  const pos = gsap.utils.clamp(0, max, progress * max);
  const i = Math.min(Math.floor(pos), STEP_COUNT - 2);
  const t = pos - i;
  const a = LAUNCH_STOPS[i] ?? LAUNCH_STOPS[0];
  const b = LAUNCH_STOPS[i + 1] ?? LAUNCH_STOPS[STEP_COUNT - 1];
  return Math.round(a + (b - a) * t);
}

function launchPctAtStep(index: number) {
  return (
    LAUNCH_STOPS[gsap.utils.clamp(0, STEP_COUNT - 1, index)] ?? LAUNCH_STOPS[0]
  );
}

type StackSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#stack",
  )!.label;
}

function readCssPx(el: HTMLElement, name: string, fallback: number) {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

function CheckIcon() {
  return (
    <svg
      className="pipeline__check-icon"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StackSection({ locale }: StackSectionProps) {
  const reduced = useReducedMotion();
  const titleId = "stack-title";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [launchPct, setLaunchPct] = useState<number>(LAUNCH_STOPS[0]);
  const [launched, setLaunched] = useState(false);
  const activeIndexRef = useRef(0);
  const launchedRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const stage = stageRef.current;
    if (!scroller || !stage || reduced) return;

    const syncFromProgress = (progress: number) => {
      const next = Math.round(progress * (STEP_COUNT - 1));
      if (next !== activeIndexRef.current) {
        activeIndexRef.current = next;
        setActiveIndex(next);
      }

      // Complete on the last snap (Ops), not on pin leave — avoids 58→100 skip.
      if (progress >= 0.998) {
        if (!launchedRef.current) {
          launchedRef.current = true;
          setLaunched(true);
        }
        setLaunchPct(100);
        return;
      }

      if (launchedRef.current) {
        launchedRef.current = false;
        setLaunched(false);
      }
      setLaunchPct(launchPctAtProgress(progress));
    };

    const ctx = gsap.context(() => {
      const header = readCssPx(scroller, "--pipeline-header", 56);
      const panel = Math.max(
        stage.offsetHeight,
        window.innerHeight - header,
        280,
      );
      const travelRaw = getComputedStyle(scroller)
        .getPropertyValue("--pipeline-step-travel")
        .trim();
      const travelFactor = Number.parseFloat(travelRaw) || STEP_TRAVEL;
      const travel = Math.max(panel * travelFactor, 180) * (STEP_COUNT - 1);

      const trigger = ScrollTrigger.create({
        trigger: scroller,
        start: `top top+=${header}`,
        end: `+=${travel}`,
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        snap: {
          snapTo: (value) => {
            const step = 1 / Math.max(STEP_COUNT - 1, 1);
            return gsap.utils.clamp(0, 1, Math.round(value / step) * step);
          },
          duration: { min: 0.18, max: 0.42 },
          ease: "power2.out",
          delay: 0,
        },
        onUpdate: (self) => {
          syncFromProgress(self.progress);
        },
      });

      triggerRef.current = trigger;
    }, scroller);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      triggerRef.current = null;
      launchedRef.current = false;
      ctx.revert();
    };
  }, [reduced]);

  const scrollToStep = (index: number) => {
    const trigger = triggerRef.current;
    const atEnd = index >= STEP_COUNT - 1;

    if (!trigger) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      launchedRef.current = atEnd;
      setLaunched(atEnd);
      setLaunchPct(launchPctAtStep(index));
      return;
    }

    const progress = index / Math.max(STEP_COUNT - 1, 1);
    const top = trigger.start + (trigger.end - trigger.start) * progress;

    window.scrollTo({
      top,
      behavior: reduced ? "auto" : "smooth",
    });
    activeIndexRef.current = index;
    setActiveIndex(index);
    launchedRef.current = atEnd;
    setLaunched(atEnd);
    setLaunchPct(launchPctAtStep(index));
  };

  const step = PIPELINE_STEPS[activeIndex];
  const displayPct = reduced
    ? launchPctAtStep(activeIndex)
    : launchPct;
  const fillProgress = Math.max(displayPct / 100, 0.02);
  const isComplete = launched || displayPct >= 100;
  const statusLabel = isComplete
    ? tr(locale, "Listo para lanzar", "Ready to launch")
    : tr(locale, "Secuencia de lanzamiento", "Launch sequence");
  const stageLabel = tr(
    locale,
    step.labelEs,
    step.labelEn,
  );

  return (
    <section
      id="stack"
      className="pipeline-section border-t border-border"
      aria-labelledby={titleId}
    >
      <div
        ref={scrollerRef}
        className="pipeline-scroll"
        style={{ ["--pipeline-steps" as string]: STEP_COUNT }}
      >
        <div ref={stageRef} className="pipeline-scroll__stage">
          <div className="pipeline-scroll__frame">
            <header className="pipeline__header">
              <div className="pipeline__header-row">
                <h2 id={titleId} className="pipeline__title">
                  {sectionTitle(locale)}
                </h2>
                <p
                  className={`pipeline__pct ${isComplete ? "pipeline__pct--ready" : ""}`}
                  aria-live="polite"
                >
                  {displayPct}%
                </p>
              </div>
              <p className="pipeline__lead">{stackLead(locale)}</p>
              <p className="pipeline__status">
                <span className="pipeline__status-label">{statusLabel}</span>
                <span className="pipeline__status-sep" aria-hidden="true">
                  ·
                </span>
                <span className="pipeline__status-stage">
                  {isComplete
                    ? tr(locale, "Todos los checks", "All checks")
                    : tr(
                        locale,
                        `En curso · ${stageLabel}`,
                        `Running · ${stageLabel}`,
                      )}
                </span>
              </p>
            </header>

            <div className="pipeline">
              <div
                className="pipeline__track"
                role="tablist"
                aria-label={tr(locale, "Etapas del pipeline", "Pipeline stages")}
              >
                {PIPELINE_STEPS.map((s, index) => {
                  const done = launched || index < activeIndex;
                  const active = !launched && activeIndex === index;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={`pipeline__step ${active ? "pipeline__step--active" : ""} ${done ? "pipeline__step--done" : ""}`}
                      onClick={() => scrollToStep(index)}
                    >
                      <span className="pipeline__step-index" aria-hidden="true">
                        {done ? (
                          <CheckIcon />
                        ) : active ? (
                          <span className="pipeline__step-pulse">{index + 1}</span>
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span className="pipeline__step-label">
                        {tr(locale, s.labelEs, s.labelEn)}
                      </span>
                      <span className="pipeline__step-state">
                        {done
                          ? tr(locale, "OK", "OK")
                          : active
                            ? tr(locale, "Check…", "Check…")
                            : tr(locale, "Pendiente", "Pending")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className={`pipeline__flow ${isComplete ? "pipeline__flow--ready" : ""}`}
                aria-hidden="true"
              >
                <div className="pipeline__flow-track" />
                <motion.div
                  className="pipeline__flow-fill"
                  animate={{ scaleX: fillProgress }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  style={{ transformOrigin: "left center" }}
                />
                {!reduced && !isComplete ? (
                  <span
                    className="pipeline__flow-shimmer"
                    style={{
                      ["--flow-progress" as string]: `${displayPct}%`,
                    }}
                  />
                ) : null}
                <motion.span
                  className="pipeline__flow-head"
                  animate={{ left: `calc(${displayPct}% - 0.25rem)` }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                />
              </div>

              <div className="pipeline__drawer" role="tabpanel">
                <div className="pipeline__drawer-sizer" aria-hidden="true">
                  <div className="pipeline__drawer-top">
                    <p className="pipeline__drawer-hint">
                      {tr(locale, DENSEST_STEP.hintEs, DENSEST_STEP.hintEn)}
                    </p>
                    <span className="pipeline__drawer-badge">
                      {tr(locale, "Checklist", "Checklist")}
                    </span>
                  </div>
                  <ul className="pipeline__tools">
                    {DENSEST_STEP.tools.map((tool) => (
                      <li key={tool}>
                        <span className="pipeline__chip">
                          <span
                            className="pipeline__chip-check"
                            aria-hidden="true"
                          >
                            <CheckIcon />
                          </span>
                          {tool}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  key={step.id}
                  className="pipeline__drawer-live"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                >
                  <div className="pipeline__drawer-top">
                    <p className="pipeline__drawer-hint">
                      {tr(locale, step.hintEs, step.hintEn)}
                    </p>
                    <span className="pipeline__drawer-badge">
                      {tr(locale, "Checklist", "Checklist")}
                    </span>
                  </div>
                  <ul className="pipeline__tools">
                    {step.tools.map((tool, i) => (
                      <motion.li
                        key={tool}
                        initial={reduced ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduced ? 0 : 0.06 + i * 0.05 }}
                      >
                        <span className="pipeline__chip">
                          <span
                            className="pipeline__chip-check"
                            aria-hidden="true"
                          >
                            <CheckIcon />
                          </span>
                          {tool}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
