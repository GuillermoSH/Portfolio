/** Global page scroll progress (0 → 1). Read in useFrame; write from ScrollTrigger. */
export const pageScrollRef = { current: 0 };

export function getPageProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

export function resetPageScroll() {
  pageScrollRef.current = 0;
}
