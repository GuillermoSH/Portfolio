import { motion, useReducedMotion } from "framer-motion";
import {
  FEATURED_PROJECT_ID,
  FEATURED_PROJECTS,
  NAV_LINKS,
  NAV_LINKS_EN,
} from "../data/site";
import { RevealSection } from "../components/RevealSection";
import { Tag } from "../components/Tag";
import type { Locale } from "../lib/i18n";
import { projectLinkLabel } from "../lib/present";

type WorkSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#proyectos",
  )!.label;
}

export function WorkSection({ locale }: WorkSectionProps) {
  const reduced = useReducedMotion();
  const titleId = "work-title";

  return (
    <RevealSection
      id="proyectos"
      className="section-block border-t border-border"
      ariaLabelledBy={titleId}
    >
      <h2 id={titleId} className="section-title">
        {sectionTitle(locale)}
      </h2>

      <ul className="divide-y divide-border">
        {FEATURED_PROJECTS.map((project) => {
          const featured = project.id === FEATURED_PROJECT_ID;
          const linkType = project.linkType ?? (project.href ? "repo" : "none");
          const linkLabel = projectLinkLabel(locale, linkType);
          return (
            <motion.li
              key={project.id}
              whileHover={reduced ? undefined : { x: 4 }}
              transition={{ duration: 0.15 }}
              className={`py-6 first:pt-0 last:pb-0 ${
                featured ? "border-l border-accent pl-4 -ml-px" : ""
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-ink">
                  {project.name}
                </h3>
                {linkLabel && project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent hover:text-accent-deep"
                  >
                    {linkLabel} →
                  </a>
                ) : null}
              </div>
              {project.preview ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block max-w-md overflow-hidden rounded-md border border-border transition-colors hover:border-accent/35"
                  tabIndex={project.href ? undefined : -1}
                  aria-hidden={!project.href}
                >
                  <img
                    src={project.preview}
                    alt={project.previewAlt ?? project.name}
                    className="h-auto w-full"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ) : null}
              <p className="mt-2 max-w-prose text-sm text-muted">
                {project.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ul>
    </RevealSection>
  );
}
