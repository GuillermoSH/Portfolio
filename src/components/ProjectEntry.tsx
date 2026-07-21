import { motion, useReducedMotion } from "framer-motion";
import type { ProjectItem } from "../data/site";
import { Tag } from "./Tag";
import { ProjectThumb } from "./ProjectThumb";
import type { Locale } from "../lib/i18n";
import {
  projectHostLabel,
  projectLinkLabel,
  projectLiveLabel,
  projectStatusDev,
} from "../lib/present";

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
  const isLiveSite = featured && linkType === "site" && Boolean(project.href);
  const host = projectHostLabel(project.href);

  const visual = (
    <ProjectThumb
      project={project}
      featured={featured}
      liveChrome={isLiveSite}
      className="w-full"
    />
  );

  const visualWrapper =
    linkLabel && project.href ? (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`project-entry__visual-link ${isLiveSite ? "project-entry__visual-link--live" : ""}`}
        aria-label={`${linkLabel}: ${project.name}`}
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
      className={`project-entry ${featured ? "project-entry--featured" : ""} ${isLiveSite ? "project-entry--live" : ""}`}
      initial={reduced ? false : { opacity: 0.65, y: 14 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {visualWrapper}

      <div className="project-entry__body">
        {isLiveSite ? (
          <p className="project-entry__live">
            <span className="project-entry__live-dot" aria-hidden="true" />
            {projectLiveLabel(locale)}
            {host ? (
              <>
                <span className="project-entry__live-sep" aria-hidden="true">
                  ·
                </span>
                <span className="project-entry__live-host">{host}</span>
              </>
            ) : null}
          </p>
        ) : null}

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3
            className={
              isLiveSite
                ? "project-entry__title project-entry__title--live"
                : "project-entry__title"
            }
          >
            {project.name}
          </h3>
          {inDevelopment ? (
            <span className="text-xs font-medium text-secondary">
              {projectStatusDev(locale)}
            </span>
          ) : null}
        </div>

        <p className="project-entry__desc">{project.description}</p>

        <ul className="project-entry__tech">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        {linkLabel && project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isLiveSite
                ? "project-entry__cta project-entry__cta--live"
                : "project-entry__cta"
            }
          >
            {linkLabel}
            <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
