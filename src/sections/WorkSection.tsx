import {
  FEATURED_PROJECT_ID,
  FEATURED_PROJECTS,
  NAV_LINKS,
  NAV_LINKS_EN,
} from "../data/site";
import { RevealSection } from "../components/RevealSection";
import { ProjectEntry } from "../components/ProjectEntry";
import type { Locale } from "../lib/i18n";

type WorkSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#proyectos",
  )!.label;
}

export function WorkSection({ locale }: WorkSectionProps) {
  const titleId = "work-title";
  const featured = FEATURED_PROJECTS.find((p) => p.id === FEATURED_PROJECT_ID)!;
  const others = FEATURED_PROJECTS.filter((p) => p.id !== FEATURED_PROJECT_ID);

  return (
    <RevealSection
      id="proyectos"
      className="section-block border-t border-border"
      ariaLabelledBy={titleId}
    >
      <h2 id={titleId} className="section-title">
        {sectionTitle(locale)}
      </h2>

      <ProjectEntry project={featured} locale={locale} featured />

      <div className="project-grid mt-12 sm:mt-14">
        {others.map((project) => (
          <ProjectEntry key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </RevealSection>
  );
}
