import { Suspense, lazy, useEffect, useState } from "react";

const HeroCanvas = lazy(() =>
  import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
);

export function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglOk, setWebglOk] = useState(true);

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

  return (
    <div className="hero-canvas-layer" aria-hidden="true">
      <Suspense fallback={<div className="hero-canvas-layer hero-canvas-layer--fallback" />}>
        <HeroCanvas />
      </Suspense>
    </div>
  );
}
