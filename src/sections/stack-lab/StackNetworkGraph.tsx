import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  STACK_NODES,
  STACK_EDGES_CLEAN,
  getNeighbors,
  getNode,
  GROUP_LABELS,
  type StackGroup,
} from "./stackMockData";

const SVG_W = 100;
const SVG_H = 72;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function nodeRadius(weight: number) {
  return 2.4 + weight * 0.38;
}

export function StackNetworkGraph() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const focusId = hovered ?? selected;

  const focusNeighbors = useMemo(
    () => (focusId ? new Set(getNeighbors(focusId)) : new Set<string>()),
    [focusId],
  );

  const selectedNode = selected ? getNode(selected) : null;
  const focusNode = focusId ? getNode(focusId) : null;

  const toggle = useCallback((id: string) => {
    setSelected((cur) => (cur === id ? null : id));
    setHovered(null);
  }, []);

  const isLit = (id: string) =>
    !focusId || id === focusId || focusNeighbors.has(id);

  const isEdgeLit = (from: string, to: string) => {
    if (!focusId) return false;
    return (
      (from === focusId && focusNeighbors.has(to)) ||
      (to === focusId && focusNeighbors.has(from))
    );
  };

  return (
    <div className="stack-lab-graph">
      <div className="stack-lab-graph__stage">
        <span className="stack-lab-graph__grid" aria-hidden="true" />
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="stack-lab-graph__svg"
          role="img"
          aria-label="Red interactiva de tecnologías"
        >
          {STACK_EDGES_CLEAN.map((edge) => {
            const a = getNode(edge.from);
            const b = getNode(edge.to);
            if (!a?.x || !a?.y || !b?.x || !b?.y) return null;
            const lit = isEdgeLit(edge.from, edge.to);
            const dim = focusId && !lit && (!isLit(edge.from) || !isLit(edge.to));

            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={`stack-lab-graph__edge ${lit ? "stack-lab-graph__edge--lit" : ""} ${dim ? "stack-lab-graph__edge--dim" : ""}`}
                animate={{
                  opacity: dim ? 0.12 : lit ? 1 : focusId ? 0.35 : 0.55,
                }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              />
            );
          })}

          {STACK_NODES.map((node, index) => {
            if (node.x == null || node.y == null) return null;
            const r = nodeRadius(node.weight);
            const active = selected === node.id;
            const preview = hovered === node.id;
            const lit = isLit(node.id);
            const isCore = node.group === "core";

            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={r + 1.4}
                  className={`stack-lab-graph__halo ${active ? "stack-lab-graph__halo--active" : ""} ${preview ? "stack-lab-graph__halo--preview" : ""}`}
                  animate={{
                    scale: active ? 1 : preview ? 0.85 : 0,
                    opacity: active || preview ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  className={`stack-lab-graph__node ${active ? "stack-lab-graph__node--active" : ""} ${preview ? "stack-lab-graph__node--preview" : ""} stack-lab-graph__node--${node.group} ${isCore ? "stack-lab-graph__node--core-pulse" : ""}`}
                  initial={reduced ? false : { opacity: 0, scale: 0 }}
                  animate={{
                    opacity: lit ? 1 : 0.22,
                    scale: active ? 1.18 : preview ? 1.1 : 1,
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { type: "spring", stiffness: 420, damping: 26 },
                    delay: reduced ? 0 : index * 0.025,
                  }}
                />
                <motion.text
                  x={node.x}
                  y={node.y + r + 3.4}
                  textAnchor="middle"
                  className="stack-lab-graph__label"
                  animate={{ opacity: lit ? 1 : 0.3 }}
                  transition={{ duration: 0.25 }}
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}

          {STACK_NODES.map((node) => {
            if (node.x == null || node.y == null) return null;
            const r = nodeRadius(node.weight);

            return (
              <circle
                key={`hit-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={r + 2.5}
                className="stack-lab-graph__hit"
                onClick={() => toggle(node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(node.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={selected === node.id}
                aria-label={node.label}
              />
            );
          })}
        </svg>
      </div>

      <aside className="stack-lab-graph__panel" aria-live="polite">
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              className="stack-lab-graph__panel-body"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: EASE_OUT }}
            >
              <p className="stack-lab-graph__panel-kicker">
                {GROUP_LABELS[selectedNode.group as StackGroup]}
              </p>
              <h3 className="stack-lab-graph__panel-title">{selectedNode.label}</h3>
              <p className="stack-lab-graph__panel-note">{selectedNode.note}</p>
              {focusNeighbors.size > 0 ? (
                <ul className="stack-lab-graph__panel-links">
                  {[...focusNeighbors].map((id, i) => {
                    const n = getNode(id);
                    if (!n) return null;
                    return (
                      <motion.li
                        key={id}
                        initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: reduced ? 0 : i * 0.05 }}
                      >
                        <button
                          type="button"
                          className="stack-lab-graph__panel-link"
                          onClick={() => toggle(id)}
                        >
                          {n.label}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              ) : null}
            </motion.div>
          ) : focusNode && hovered ? (
            <motion.div
              key={`preview-${focusNode.id}`}
              className="stack-lab-graph__panel-body stack-lab-graph__panel-body--preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="stack-lab-graph__panel-kicker">Vista previa</p>
              <h3 className="stack-lab-graph__panel-title">{focusNode.label}</h3>
              <p className="stack-lab-graph__panel-note">{focusNode.note}</p>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              className="stack-lab-graph__panel-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Pasa el ratón o pulsa un nodo para explorar conexiones.
            </motion.p>
          )}
        </AnimatePresence>
      </aside>
    </div>
  );
}
