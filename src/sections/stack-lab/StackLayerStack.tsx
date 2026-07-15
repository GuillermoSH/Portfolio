import { useCallback, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { LAYER_STACK } from "./stackMockData";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function StackLayerStack() {
  const reduced = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>("presentation");

  const toggle = useCallback((id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  const openIndex = LAYER_STACK.findIndex((l) => l.id === openId);

  return (
    <div className="stack-lab-layers">
      <div className="stack-lab-layers__rail" aria-hidden="true">
        {LAYER_STACK.map((layer, index) => {
          const open = openId === layer.id;
          const linked =
            openId !== null &&
            (LAYER_STACK.find((l) => l.id === openId)?.links as readonly string[]).includes(
              layer.id,
            );

          return (
            <motion.span
              key={layer.id}
              className={`stack-lab-layers__rail-dot ${open ? "stack-lab-layers__rail-dot--open" : ""} ${linked ? "stack-lab-layers__rail-dot--linked" : ""}`}
              animate={{
                scale: open ? 1.35 : linked ? 1.15 : 1,
                opacity: openId && !open && !linked ? 0.35 : 1,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
            >
              {index + 1}
            </motion.span>
          );
        })}
        {openIndex >= 0 ? (
          <motion.span
            className="stack-lab-layers__rail-beam"
            layoutId="layer-beam"
            style={{ ["--layer-index" as string]: openIndex }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          />
        ) : null}
      </div>

      <LayoutGroup>
        <div className="stack-lab-layers__stack">
          {LAYER_STACK.map((layer, index) => {
            const open = openId === layer.id;
            const linked =
              openId !== null &&
              (
                LAYER_STACK.find((l) => l.id === openId)?.links as readonly string[]
              ).includes(layer.id);
            const depth = openIndex >= 0 ? Math.abs(index - openIndex) : 0;

            return (
              <motion.div
                key={layer.id}
                layout
                className={`stack-lab-layers__row ${open ? "stack-lab-layers__row--open" : ""} ${linked ? "stack-lab-layers__row--linked" : ""}`}
                style={{ zIndex: open ? 10 : 4 - depth }}
                animate={{
                  y: open ? 0 : depth * 3,
                  scale: open ? 1 : 1 - depth * 0.012,
                  opacity: openId && !open && !linked ? 0.55 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                <button
                  type="button"
                  className="stack-lab-layers__trigger"
                  onClick={() => toggle(layer.id)}
                  aria-expanded={open}
                >
                  <span className="stack-lab-layers__trigger-index">
                    {index + 1}
                  </span>
                  <span className="stack-lab-layers__trigger-label">
                    {layer.label}
                  </span>
                  <motion.span
                    className="stack-lab-layers__trigger-chevron"
                    animate={{ rotate: open ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >
                    →
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key={`panel-${layer.id}`}
                      className="stack-lab-layers__panel"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: EASE_OUT }}
                    >
                      <ul className="stack-lab-layers__tools">
                        {layer.tools.map((tool, i) => (
                          <motion.li
                            key={tool}
                            initial={reduced ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: reduced ? 0 : 0.08 + i * 0.05,
                              ease: EASE_OUT,
                            }}
                          >
                            {tool}
                          </motion.li>
                        ))}
                      </ul>
                      {layer.links.length > 0 ? (
                        <p className="stack-lab-layers__links">
                          Fluye hacia{" "}
                          {layer.links
                            .map(
                              (id) =>
                                LAYER_STACK.find((l) => l.id === id)?.label ?? id,
                            )
                            .join(" · ")}
                        </p>
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}
