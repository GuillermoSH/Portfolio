/** Scroll progress through hero section (0 → 1). Read in useFrame; write from ScrollTrigger. */
export const heroScrollRef = { current: 0 };

export function resetHeroScroll() {
  heroScrollRef.current = 0;
}
