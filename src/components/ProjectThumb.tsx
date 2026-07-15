import type { CSSProperties } from "react";
import type { ProjectItem } from "../data/site";
import { projectMonogram, projectVisualHue } from "../lib/projectVisual";

type ProjectThumbProps = {
  project: ProjectItem;
  featured?: boolean;
  className?: string;
};

export function ProjectThumb({
  project,
  featured = false,
  className = "",
}: ProjectThumbProps) {
  const hue = projectVisualHue(project.id);
  const monogram = projectMonogram(project.name);

  if (project.preview) {
    return (
      <div
        className={`project-thumb ${featured ? "project-thumb--featured" : ""} ${className}`}
        style={{ "--project-hue": hue } as CSSProperties}
      >
        <img
          src={project.preview}
          alt={project.previewAlt ?? project.name}
          className="project-thumb__image"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      className={`project-thumb project-thumb--placeholder ${featured ? "project-thumb--featured" : ""} ${className}`}
      style={{ "--project-hue": hue } as CSSProperties}
      aria-hidden="true"
    >
      <span className="project-thumb__monogram">{monogram}</span>
    </div>
  );
}
