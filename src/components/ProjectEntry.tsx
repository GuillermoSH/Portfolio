import { motion, useReducedMotion } from "framer-motion";
import type { ProjectItem } from "../data/site";
import { Tag } from "./Tag";
import { ProjectThumb } from "./ProjectThumb";
import type { Locale } from "../lib/i18n";
import { projectLinkLabel, projectStatusDev } from "../lib/present";

type ProjectEntryProps = {
  project: ProjectItem;
  locale: Locale;
  featured?: boolean;
};

export function ProjectEntry({
  project,
  locale,
  featured = false,
}: ProjectEntryProps) {
  const reduced = useReducedMotion();
  const linkType = project.linkType ?? (project.href ? "repo" : "none");
  const linkLabel = projectLinkLabel(locale, linkType);
  const inDevelopment = linkType === "none";

  const visual = (
    <ProjectThumb project={project} featured={featured} className="w-full" />
  );

  const visualWrapper =
    linkLabel && project.href ? (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="project-entry__visual-link"
      >
        {visual}
      </a>
    ) : (
      <div className="project-entry__visual-link project-entry__visual-link--static">
        {visual}
      </div>
    );

  return (
    <motion.article
      className={`project-entry ${featured ? "project-entry--featured" : ""}`}
      initial={reduced ? false : { opacity: 0.65, y: 14 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {visualWrapper}

      <div className="project-entry__body">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-base font-semibold text-ink">{project.name}</h3>
          {inDevelopment ? (
            <span className="text-xs font-medium text-secondary">
              {projectStatusDev(locale)}
            </span>
          ) : linkLabel && project.href ? (
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

        <p className="mt-2 max-w-prose text-sm text-muted">{project.description}</p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
