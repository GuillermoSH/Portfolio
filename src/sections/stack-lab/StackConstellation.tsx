import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  STACK_NODES,
  getNode,
  getNeighbors,
  GROUP_LABELS,
  type StackGroup,
} from "./stackMockData";

const QUADRANTS: Exclude<StackGroup, "core">[] = [
  "backend",
  "frontend",
  "data",
  "ops",
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type LinkLine = { x1: number; y1: number; x2: number; y2: number; id: string };

export function StackConstellation() {
  const reduced = useReducedMotion();
  const mapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [hoveredQuad, setHoveredQuad] = useState<StackGroup | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [lines, setLines] = useState<LinkLine[]>([]);

  const selectedNode = selected ? getNode(selected) : null;
  const neighbors = useMemo(
    () => (selected ? getNeighbors(selected) : []),
    [selected],
  );

  const updateLines = useCallback(() => {
    const map = mapRef.current;
    if (!map || !selected) {
      setLines((prev) => (prev.length === 0 ? prev : []));
      return;
    }

    const origin = nodeRefs.current.get(selected);
    if (!origin) return;

    const mapRect = map.getBoundingClientRect();
    const oRect = origin.getBoundingClientRect();
    const x1 = oRect.left + oRect.width / 2 - mapRect.left;
    const y1 = oRect.top + oRect.height / 2 - mapRect.top;

    const next: LinkLine[] = [];
    for (const neighborId of neighbors) {
      const target = nodeRefs.current.get(neighborId);
      if (!target) continue;
      const tRect = target.getBoundingClientRect();
      next.push({
        id: neighborId,
        x1,
        y1,
        x2: tRect.left + tRect.width / 2 - mapRect.left,
        y2: tRect.top + tRect.height / 2 - mapRect.top,
      });
    }

    setLines((prev) => {
      if (
        prev.length === next.length &&
        prev.every(
          (line, i) =>
            line.id === next[i]?.id &&
            line.x1 === next[i]?.x1 &&
            line.y1 === next[i]?.y1 &&
            line.x2 === next[i]?.x2 &&
            line.y2 === next[i]?.y2,
        )
      ) {
        return prev;
      }
      return next;
    });
  }, [selected, neighbors]);

  useLayoutEffect(() => {
    updateLines();
  }, [updateLines, hoveredQuad]);

  useEffect(() => {
    const onResize = () => updateLines();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateLines]);

  const toggle = useCallback((id: string) => {
    setSelected((cur) => (cur === id ? null : id));
  }, []);

  const setNodeRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  }, []);

  return (
    <div className="stack-lab-constellation">
      <div ref={mapRef} className="stack-lab-constellation__map">
        <span className="stack-lab-constellation__grid" aria-hidden="true" />

        <svg className="stack-lab-constellation__links" aria-hidden="true">
          <AnimatePresence>
            {lines.map((line, index) => {
              const mx = (line.x1 + line.x2) / 2;
              const my = (line.y1 + line.y2) / 2 - 24;

              return (
                <motion.path
                  key={`${selected}-${line.id}`}
                  d={`M ${line.x1} ${line.y1} Q ${mx} ${my} ${line.x2} ${line.y2}`}
                  className="stack-lab-constellation__link"
                  fill="none"
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: reduced ? 0 : index * 0.06,
                    ease: EASE_OUT,
                  }}
                />
              );
            })}
          </AnimatePresence>
        </svg>

        {QUADRANTS.map((group, quadIndex) => {
          const nodes = STACK_NODES.filter((n) => n.group === group);
          const focused = hoveredQuad === group;
          const faded = hoveredQuad !== null && !focused;

          return (
            <motion.div
              key={group}
              className={`stack-lab-constellation__quad stack-lab-constellation__quad--${group}`}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.45,
                delay: reduced ? 0 : quadIndex * 0.08,
                ease: EASE_OUT,
              }}
              animate={{
                y: focused ? -4 : 0,
                opacity: faded ? 0.5 : 1,
              }}
              onMouseEnter={() => setHoveredQuad(group)}
              onMouseLeave={() => setHoveredQuad(null)}
            >
              <p className="stack-lab-constellation__quad-label">
                {GROUP_LABELS[group]}
              </p>
              <ul className="stack-lab-constellation__nodes">
                {nodes.map((node, index) => {
                  const active = selected === node.id;
                  const linked = neighbors.includes(node.id);
                  const dim = selected !== null && !active && !linked;

                  return (
                    <motion.li
                      key={node.id}
                      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                      animate={{ opacity: dim ? 0.38 : 1, scale: 1 }}
                      transition={{
                        delay: reduced ? 0 : index * 0.04,
                        duration: 0.3,
                      }}
                    >
                      <motion.button
                        ref={(el) => setNodeRef(node.id, el)}
                        type="button"
                        className={`stack-lab-constellation__node ${active ? "stack-lab-constellation__node--active" : ""} ${linked ? "stack-lab-constellation__node--linked" : ""}`}
                        onClick={() => toggle(node.id)}
                        aria-pressed={active}
                        whileHover={reduced ? undefined : { y: -2 }}
                        animate={{ scale: active ? 1.04 : linked ? 1.02 : 1 }}
                        transition={{ type: "spring", stiffness: 420, damping: 28 }}
                      >
                        {node.label}
                      </motion.button>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <aside className="stack-lab-constellation__detail" aria-live="polite">
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={reduced ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -6 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <p className="stack-lab-constellation__detail-kicker">
                {GROUP_LABELS[selectedNode.group as StackGroup]}
              </p>
              <h3>{selectedNode.label}</h3>
              <p>{selectedNode.note}</p>
              {neighbors.length > 0 ? (
                <ul className="stack-lab-constellation__detail-links">
                  {neighbors.map((id) => {
                    const n = getNode(id);
                    return n ? (
                      <li key={id}>
                        <button type="button" onClick={() => toggle(id)}>
                          {n.label}
                        </button>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              className="stack-lab-constellation__detail-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Elige una tecnología — las líneas unen dependencias reales entre cuadrantes.
            </motion.p>
          )}
        </AnimatePresence>
      </aside>
    </div>
  );
}
