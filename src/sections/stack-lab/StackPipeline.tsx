import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PIPELINE_STEPS } from "./stackMockData";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function StackPipeline() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const step = PIPELINE_STEPS[activeIndex];
  const progress =
    PIPELINE_STEPS.length > 1
      ? activeIndex / (PIPELINE_STEPS.length - 1)
      : 0;

  return (
    <div className="stack-lab-pipeline">
      <div
        className="stack-lab-pipeline__track"
        role="tablist"
        aria-label="Etapas del pipeline"
      >
        {PIPELINE_STEPS.map((s, index) => {
          const active = activeIndex === index;
          const done = index < activeIndex;

          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`stack-lab-pipeline__step ${active ? "stack-lab-pipeline__step--active" : ""} ${done ? "stack-lab-pipeline__step--done" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="stack-lab-pipeline__step-index">{index + 1}</span>
              <span className="stack-lab-pipeline__step-label">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="stack-lab-pipeline__flow" aria-hidden="true">
        <div className="stack-lab-pipeline__flow-track" />
        <motion.div
          className="stack-lab-pipeline__flow-fill"
          animate={{ scaleX: Math.max(progress, 0.02) }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          style={{ transformOrigin: "left center" }}
        />
        {!reduced ? (
          <span
            className="stack-lab-pipeline__flow-shimmer"
            style={{ ["--flow-progress" as string]: `${progress * 100}%` }}
          />
        ) : null}
        <motion.span
          className="stack-lab-pipeline__flow-head"
          animate={{ left: `calc(${progress * 100}% - 0.25rem)` }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        />
      </div>

      <motion.div
        key={step.id}
        className="stack-lab-pipeline__drawer"
        role="tabpanel"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
      >
        <p className="stack-lab-pipeline__drawer-hint">{step.hint}</p>
        <ul className="stack-lab-pipeline__tools">
          {step.tools.map((tool, i) => (
            <motion.li
              key={tool}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reduced ? 0 : i * 0.05 }}
            >
              <span className="stack-lab-pipeline__chip">{tool}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
