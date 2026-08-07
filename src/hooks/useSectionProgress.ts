import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SectionProgress = {
  activeIndex: number;
  progress: number;
  scrollPercent: number;
  gapPx: number[]; // length = hrefs.length - 1
};

const GAP_MIN_PX = 22;
const TARGET_TOTAL_GAP_PX = 300;

function measureTops(hrefs: readonly string[]): number[] {
  let last = 0;
  return hrefs.map((href) => {
    const el = document.querySelector<HTMLElement>(href);
    if (el) last = el.offsetTop;
    return last;
  });
}

function computeGapPx(tops: number[]): number[] {
  if (tops.length < 2) return [];
  const lengths = tops.slice(1).map((t, i) => Math.max(0, t - tops[i]));
  const total = lengths.reduce((a, b) => a + b, 0);
  if (total <= 0) return lengths.map(() => GAP_MIN_PX);
  const scale = TARGET_TOTAL_GAP_PX / total;
  return lengths.map((len) => Math.max(GAP_MIN_PX, len * scale));
}

/**
 * `progress` is a single linear function of scrollY across the tracked
 * checkpoints (Inicio's top → Más's top) — it's what drives the rail's fill
 * line, so it must reach 100% exactly when the last node lights up, keeping
 * the line and the node in sync.
 *
 * `scrollPercent` is a separate, independent linear function of scrollY
 * across the *entire* document (0 → true bottom, footer included) — it's
 * only used for the "%" label, so it doesn't hit 100% until the user has
 * actually scrolled all the way down, even though the last checkpoint's
 * section may end well before the real bottom of the page.
 */
export function useSectionProgress(hrefs: readonly string[]): SectionProgress {
  const [state, setState] = useState<SectionProgress>({
    activeIndex: 0,
    progress: 0,
    scrollPercent: 0,
    gapPx: hrefs.slice(1).map(() => GAP_MIN_PX),
  });

  const topsRef = useRef<number[]>([]);

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const update = () => {
      ticking = false;
      const tops = topsRef.current;
      const last = tops.length - 1;
      if (last < 0) return;
      const anchor = window.scrollY + window.innerHeight / 2;

      let index = 0;
      for (let i = 0; i <= last; i++) {
        if (anchor >= tops[i]) index = i;
      }

      let progress = 0;
      if (last > 0) {
        const span = tops[last] - tops[0];
        progress = span > 0 ? (anchor - tops[0]) / span : 0;
      }
      progress = Math.min(1, Math.max(0, progress));

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

      setState((prev) => ({ ...prev, activeIndex: index, progress, scrollPercent }));
    };

    const remeasure = () => {
      topsRef.current = measureTops(hrefs);
      setState((prev) => ({ ...prev, gapPx: computeGapPx(topsRef.current) }));
      update();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    remeasure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);
    ScrollTrigger.addEventListener("refresh", remeasure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      ScrollTrigger.removeEventListener("refresh", remeasure);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [hrefs]);

  return state;
}
