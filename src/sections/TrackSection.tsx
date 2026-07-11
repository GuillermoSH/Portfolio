import { EXPERIENCE } from "../data/site";
import { RevealSection } from "../components/RevealSection";
import { Tag } from "../components/Tag";
import type { Locale } from "../lib/i18n";
import { NAV_LINKS, NAV_LINKS_EN } from "../data/site";
import {
  condenseBullets,
  parseStackNote,
} from "../lib/present";

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

  return (
    <RevealSection
      id="trayectoria"
      className="section-block border-t border-border"
      ariaLabelledBy={titleId}
    >
      <h2 id={titleId} className="section-title">
        {sectionTitle(locale)}
      </h2>

      <ol className="relative space-y-10 border-l border-border pl-6">
        {EXPERIENCE.map((job) => {
          const stack = parseStackNote(job.stackNote);
          return (
            <li key={job.id} className="relative">
              <span
                className="absolute -left-[calc(1.5rem+1px)] top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-ink">{job.title}</h3>
                <time
                  className="text-sm text-muted"
                  dateTime={job.datetime}
                >
                  {job.period}
                </time>
              </div>
              <p className="mt-1 text-sm text-muted">{job.location}</p>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/90">
                {condenseBullets(job.bullets)}
              </p>
              {stack.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </RevealSection>
  );
}
