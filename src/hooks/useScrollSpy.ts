import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/site";

export function useScrollSpy(): string {
  const [activeHref, setActiveHref] = useState<string>(NAV_LINKS[0].href);

  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        ".header-panel a[href^='#']",
      ),
    );
    const ids = links
      .map((a) => a.getAttribute("href"))
      .filter((h): h is string => Boolean(h && h.length > 1));
    const sections = ids
      .map((id) => document.querySelector(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return activeHref;
}
