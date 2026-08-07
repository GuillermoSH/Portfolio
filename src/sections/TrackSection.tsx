import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "../data/site";
import { RevealSection } from "../components/RevealSection";
import { TrackItem } from "../components/TrackItem";
import type { Locale } from "../lib/i18n";
import { NAV_LINKS, NAV_LINKS_EN } from "../data/site";

type TrackSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#trayectoria",
  )!.label;
}

export function TrackSection({ locale }: TrackSectionProps) {
  const titleId = "track-title";

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <RevealSection
      id="trayectoria"
      className="section-block"
      ariaLabelledBy={titleId}
    >
      <h2 id={titleId} className="section-title">
        {sectionTitle(locale)}
      </h2>

      <ol className="track-list relative space-y-10 border-l border-border pl-6">
        {EXPERIENCE.map((job) => (
          <TrackItem key={job.id} job={job} locale={locale} />
        ))}
      </ol>
    </RevealSection>
  );
}
