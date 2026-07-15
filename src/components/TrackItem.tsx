import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "./Tag";
import type { ExperienceItem } from "../data/site";
import { parseStackNote } from "../lib/present";

gsap.registerPlugin(ScrollTrigger);

type TrackItemProps = {
  job: ExperienceItem;
};

export function TrackItem({ job }: TrackItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const stack = parseStackNote(job.stackNote);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const textNodes = item.querySelectorAll<HTMLElement>("[data-track-reveal]");

    if (reduced) {
      return;
    }

    let syncActive: () => void;

    const ctx = gsap.context(() => {
      syncActive = () => {
        const zoneTop = window.innerHeight * 0.72;
        const zoneBottom = window.innerHeight * 0.38;
        const { top, bottom } = item.getBoundingClientRect();
        const isActive = top <= zoneTop && bottom >= zoneBottom;

        item.dataset.active = isActive ? "true" : "false";

        if (isActive) {
          gsap.set(textNodes, { opacity: 1, y: 0 });
        }
      };

      ScrollTrigger.create({
        trigger: item,
        start: "top 72%",
        end: "bottom 38%",
        onToggle: (self) => {
          item.dataset.active = self.isActive ? "true" : "false";
        },
      });

      gsap.set(textNodes, { opacity: 0, y: 12 });

      gsap.to(textNodes, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      syncActive();
      ScrollTrigger.addEventListener("refresh", syncActive);
    }, item);

    return () => {
      ScrollTrigger.removeEventListener("refresh", syncActive!);
      ctx.revert();
    };
  }, [job.id]);

  return (
    <li ref={itemRef} className="track-item relative" data-active="false">
      <span className="track-item__dot" aria-hidden="true" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="track-item__title text-base font-semibold">{job.title}</h3>
        <time className="text-sm text-muted" dateTime={job.datetime}>
          {job.period}
        </time>
      </div>
      <p className="mt-1 text-sm text-muted" data-track-reveal>
        {job.location}
      </p>
      <div className="mt-3 max-w-prose space-y-3">
        {job.paragraphs.map((paragraph, index) => (
          <p
            key={`${job.id}-p${index}`}
            className="text-sm leading-relaxed text-ink/90"
            data-track-reveal
          >
            {paragraph}
          </p>
        ))}
      </div>
      {stack.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <li key={tech}>
              <Tag className="track-item__tag">{tech}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
