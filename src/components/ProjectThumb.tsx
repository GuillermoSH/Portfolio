import type { CSSProperties } from "react";
import type { ProjectItem } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { projectMonogram, projectVisualHue } from "../lib/projectVisual";
import { projectHostLabel } from "../lib/present";

type ProjectThumbProps = {
  project: ProjectItem;
  locale?: Locale;
  featured?: boolean;
  liveChrome?: boolean;
  className?: string;
};

export function ProjectThumb({
  project,
  locale = "es",
  featured = false,
  liveChrome = false,
  className = "",
}: ProjectThumbProps) {
  const hue = projectVisualHue(project.id);
  const monogram = projectMonogram(project.name);
  const host = projectHostLabel(project.href);
  const previewAlt = tr(locale, project.previewAltEs, project.previewAltEn);

  if (project.preview) {
    const image = (
      <img
        src={project.preview}
        alt={previewAlt ?? project.name}
        className="project-thumb__image"
        loading="lazy"
        decoding="async"
      />
    );

    if (liveChrome) {
      return (
        <div
          className={`project-thumb project-thumb--chrome ${featured ? "project-thumb--featured" : ""} ${className}`}
          style={{ "--project-hue": hue } as CSSProperties}
        >
          <div className="project-thumb__chrome" aria-hidden="true">
            <span className="project-thumb__traffic">
              <i />
              <i />
              <i />
            </span>
            <span className="project-thumb__url">{host ?? project.name}</span>
          </div>
          <div className="project-thumb__viewport">{image}</div>
        </div>
      );
    }

    return (
      <div
        className={`project-thumb ${featured ? "project-thumb--featured" : ""} ${className}`}
        style={{ "--project-hue": hue } as CSSProperties}
      >
        {image}
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
