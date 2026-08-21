import { useEffect, useRef } from "react";
import type { ProjectItem } from "../data/site";
import { ProjectThumb } from "./ProjectThumb";
import { Tag } from "./Tag";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import {
  closeLabel,
  projectChallengesLabel,
  projectGoalsLabel,
  projectHostLabel,
  projectLinkLabel,
} from "../lib/present";

type ProjectModalProps = {
  project: ProjectItem | null;
  locale: Locale;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProjectModal({ project, locale, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) dialog.showModal();
      const html = document.documentElement;
      const previousHtmlOverflow = html.style.overflow;
      const previousBodyOverflow = document.body.style.overflow;
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        html.style.overflow = previousHtmlOverflow;
        document.body.style.overflow = previousBodyOverflow;
      };
    }

    if (dialog.open) dialog.close();
  }, [project]);

  if (!project) {
    return <dialog ref={dialogRef} className="project-modal" onClose={onClose} />;
  }

  const linkType = project.linkType ?? (project.href ? "repo" : "none");
  const linkLabel = projectLinkLabel(locale, linkType);
  const host = projectHostLabel(project.href);
  const description = tr(locale, project.descriptionEs, project.descriptionEn);
  const tech = locale === "en" ? (project.techEn ?? project.tech) : project.tech;
  const goals = tr(locale, project.goalsEs, project.goalsEn);
  const challenges = tr(locale, project.challengesEs, project.challengesEn);

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="project-modal__shell">
        <button
          type="button"
          className="project-modal__close"
          onClick={onClose}
          aria-label={closeLabel(locale)}
        >
          <CloseIcon />
        </button>

        <div className="project-modal__panel">
          <ProjectThumb project={project} locale={locale} className="project-modal__thumb" />

          <h3 id="project-modal-title" className="project-modal__title">
            {project.name}
          </h3>
          {host ? <p className="project-modal__host">{host}</p> : null}

          <p className="project-modal__desc">{description}</p>

          <ul className="project-modal__tech">
            {tech.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>

          {goals?.length ? (
            <div className="project-modal__block">
              <h4 className="project-modal__block-title">
                {projectGoalsLabel(locale)}
              </h4>
              <ul className="project-modal__list">
                {goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {challenges?.length ? (
            <div className="project-modal__block">
              <h4 className="project-modal__block-title">
                {projectChallengesLabel(locale)}
              </h4>
              <ul className="project-modal__list">
                {challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {linkLabel && project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-entry__cta"
            >
              {linkLabel}
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
