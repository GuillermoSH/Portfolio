import { Suspense, lazy, useEffect, useState } from "react";

const HeroCanvas = lazy(() =>
  import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
);

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const [canMount, setCanMount] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglOk(Boolean(gl));
    } catch {
      setWebglOk(false);
    }

    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Defer the heavy three.js/@react-three/fiber chunk until the main thread
  // is idle, so it doesn't compete with fonts and critical hero copy on load.
  useEffect(() => {
    const win = window as IdleWindow;
    if (typeof win.requestIdleCallback === "function") {
      const handle = win.requestIdleCallback(() => setCanMount(true), {
        timeout: 1500,
      });
      return () => win.cancelIdleCallback?.(handle);
    }
    const timeout = window.setTimeout(() => setCanMount(true), 200);
    return () => window.clearTimeout(timeout);
  }, []);

  if (reducedMotion || !webglOk) {
    return (
      <div className="hero-canvas-layer hero-canvas-layer--fallback" aria-hidden="true">
        <div className="hero-orbit-static hero-orbit-static--full">
          <span className="hero-orbit-static__ring hero-orbit-static__ring--outer" />
          <span className="hero-orbit-static__ring hero-orbit-static__ring--mid" />
          <span className="hero-orbit-static__ring hero-orbit-static__ring--inner" />
          <span className="hero-orbit-static__hub" />
          <span className="hero-orbit-static__node hero-orbit-static__node--a" />
          <span className="hero-orbit-static__node hero-orbit-static__node--b" />
          <span className="hero-orbit-static__node hero-orbit-static__node--c" />
          <span className="hero-orbit-static__node hero-orbit-static__node--d" />
        </div>
      </div>
    );
  }

  if (!canMount) {
    return (
      <div className="hero-canvas-layer hero-canvas-layer--fallback" aria-hidden="true" />
    );
  }

  return (
    <div className="hero-canvas-layer" aria-hidden="true">
      <Suspense fallback={<div className="hero-canvas-layer hero-canvas-layer--fallback" />}>
        <HeroCanvas />
      </Suspense>
    </div>
  );
}
