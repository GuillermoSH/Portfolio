import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
};

export function RevealSection({
  id,
  children,
  className = "",
  ariaLabelledBy,
}: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 12,
        opacity: 0.6,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}
