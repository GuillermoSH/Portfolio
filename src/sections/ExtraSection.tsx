import {
  AWS_COURSES,
  CERTIFICATIONS,
  DAILY_TOOLS,
  HOMELAB_ITEMS,
  NAV_LINKS,
  NAV_LINKS_EN,
} from "../data/site";
import { RevealSection } from "../components/RevealSection";
import type { Locale } from "../lib/i18n";
import {
  awsSummary,
  sectionLabel,
  viewCert,
} from "../lib/present";

type ExtraSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#mas",
  )!.label;
}

export function ExtraSection({ locale }: ExtraSectionProps) {
  const titleId = "extra-title";

  return (
    <RevealSection
      id="mas"
      className="section-block border-t border-border"
      ariaLabelledBy={titleId}
    >
      <h2 id={titleId} className="section-title">
        {sectionTitle(locale)}
      </h2>

      <div className="space-y-12">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            {sectionLabel(locale, "extra")}
          </h3>
          <ul className="space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <li
                key={cert.title}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{cert.title}</p>
                  <p className="text-xs text-muted">
                    {cert.category} · {cert.date}
                  </p>
                </div>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent hover:text-accent-deep"
                >
                  {viewCert(locale)} →
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            {sectionLabel(locale, "tools")}
          </h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {DAILY_TOOLS.map((tool) => (
              <li key={tool.id}>
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/40"
                >
                  {tool.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            {sectionLabel(locale, "homelab")}
          </h3>
          <p className="flex flex-wrap gap-x-1 gap-y-2 text-sm">
            {HOMELAB_ITEMS.map((item, i) => (
              <span key={item.label} className="inline-flex items-center">
                {i > 0 ? (
                  <span className="mr-1 text-muted" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                {item.type === "link" ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-muted">{item.label}</span>
                )}
              </span>
            ))}
          </p>
        </div>

        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-ink marker:text-accent">
            {awsSummary(locale, AWS_COURSES.length)}
          </summary>
          <ul className="mt-3 space-y-1 border-l border-border pl-4">
            {AWS_COURSES.map((course) => (
              <li key={course} className="text-sm text-muted">
                {course}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </RevealSection>
  );
}
