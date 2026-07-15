import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ORBIT_RINGS, getNode } from "./stackMockData";

type RingKey = keyof typeof ORBIT_RINGS;

const RING_META: {
  key: RingKey;
  radiusPct: number;
  label: string;
}[] = [
  { key: "backend", radiusPct: 34, label: "Backend" },
  { key: "frontend", radiusPct: 46, label: "Frontend" },
  { key: "data", radiusPct: 58, label: "Datos" },
  { key: "ops", radiusPct: 70, label: "Ops" },
];

function nodePosition(index: number, total: number, radiusPct: number) {
  const angle = (360 / total) * index - 90;
  const rad = (angle * Math.PI) / 180;
  return {
    left: 50 + radiusPct * Math.cos(rad),
    top: 50 + radiusPct * Math.sin(rad),
    angle,
  };
}

export function StackOrbitHub() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredRing, setHoveredRing] = useState<RingKey | null>(null);

  const selectedNode = selected ? getNode(selected) : null;

  const spoke = useMemo(() => {
    if (!selected) return null;
    for (const ring of RING_META) {
      const ids = ORBIT_RINGS[ring.key];
      const index = ids.indexOf(selected);
      if (index >= 0) {
        return nodePosition(index, ids.length, 50);
      }
    }
    return null;
  }, [selected]);

  const handleSelect = useCallback((id: string) => {
    setSelected((cur) => (cur === id ? null : id));
  }, []);

  return (
    <div className="stack-lab-orbit">
      <div className="stack-lab-orbit__arena">
        <svg className="stack-lab-orbit__spokes" viewBox="0 0 100 100" aria-hidden="true">
          {spoke ? (
            <line
              key={selected}
              x1="50"
              y1="50"
              x2={spoke.left}
              y2={spoke.top}
              className="stack-lab-orbit__spoke"
            />
          ) : null}
        </svg>

        <motion.div
          className="stack-lab-orbit__hub"
          animate={{
            scale: selectedNode ? 1.06 : 1,
            borderColor: selectedNode
              ? "oklch(0.63 0.19 38 / 0.45)"
              : "var(--border)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        >
          <span className="stack-lab-orbit__hub-label">Full-stack</span>
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.span
                key={selectedNode.id}
                className="stack-lab-orbit__hub-detail"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.28 }}
              >
                {selectedNode.label}
              </motion.span>
            ) : (
              <motion.span
                key="hint"
                className="stack-lab-orbit__hub-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Elige una tecnología
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {RING_META.map((ring) => {
          const ids = ORBIT_RINGS[ring.key];
          const highlighted =
            hoveredRing === ring.key ||
            (selected !== null && ids.includes(selected));
          const dimmed = hoveredRing !== null && hoveredRing !== ring.key;

          return (
            <div
              key={ring.key}
              className={`stack-lab-orbit__ring-wrap ${highlighted ? "stack-lab-orbit__ring-wrap--lit" : ""} ${dimmed ? "stack-lab-orbit__ring-wrap--dim" : ""}`}
              style={{
                width: `${ring.radiusPct * 2}%`,
                height: `${ring.radiusPct * 2}%`,
              }}
              onMouseEnter={() => setHoveredRing(ring.key)}
              onMouseLeave={() => setHoveredRing(null)}
            >
              <svg
                viewBox="0 0 100 100"
                className="stack-lab-orbit__ring-svg"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  className="stack-lab-orbit__ring-track"
                />
                {!reduced ? (
                  <circle
                    cx="50"
                    cy="50"
                    r="49"
                    className={`stack-lab-orbit__ring-scanner stack-lab-orbit__ring-scanner--${ring.key}`}
                  />
                ) : null}
              </svg>
              <span className="stack-lab-orbit__ring-label">{ring.label}</span>

              {ids.map((id, i) => {
                const node = getNode(id);
                if (!node) return null;
                const pos = nodePosition(i, ids.length, 50);
                const active = selected === id;
                const nodeDim = selected !== null && !active;

                return (
                  <motion.button
                    key={id}
                    type="button"
                    className={`stack-lab-orbit__node stack-lab-orbit__node--${ring.key} ${active ? "stack-lab-orbit__node--active" : ""}`}
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                    }}
                    onClick={() => handleSelect(id)}
                    aria-pressed={active}
                    animate={{
                      opacity: nodeDim ? 0.35 : 1,
                      scale: active ? 1.12 : 1,
                    }}
                    whileHover={reduced ? undefined : { scale: active ? 1.12 : 1.06 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    {node.label}
                  </motion.button>
                );
              })}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedNode ? (
          <motion.p
            key={selectedNode.id}
            className="stack-lab-orbit__note"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
          >
            {selectedNode.note}
          </motion.p>
        ) : (
          <motion.p
            key="hint-note"
            className="stack-lab-orbit__note stack-lab-orbit__note--muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Nodos fijos por anillo — el escáner recorre cada área. Click para conectar con el hub.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
