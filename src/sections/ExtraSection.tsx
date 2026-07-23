import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ChevronDown, GraduationCap } from "lucide-react";
import {
  AWS_COURSES,
  CERTIFICATIONS,
  DAILY_STACK,
  HOMELAB_ITEMS,
  HOMELAB_MORE_HREF,
  NAV_LINKS,
  NAV_LINKS_EN,
} from "../data/site";
import { Tag } from "../components/Tag";
import type { Locale } from "../lib/i18n";
import {
  awsSummary,
  certStatusLabel,
  homelabIntro,
  isCertExpired,
  learnMoreLabel,
  sectionLabel,
  viewCert,
} from "../lib/present";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const groups = el.querySelectorAll<HTMLElement>("[data-extra-group]");

    const ctx = gsap.context(() => {
      gsap.from(groups, {
        y: 12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mas"
      className="section-block border-t border-border"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="section-title">
        {sectionTitle(locale)}
      </h2>

      <div className="space-y-12">
        <div data-extra-group>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            {sectionLabel(locale, "extra")}
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert) => {
              const expired = isCertExpired(cert.date);
              const hasExpiry = /—/.test(cert.date);
              return (
                <li key={cert.title} className="extra-card">
                  <Award
                    className={`extra-card__icon ${expired ? "text-muted" : ""}`}
                    aria-hidden="true"
                  />
                  <div className="extra-card__body">
                    <p className="extra-card__title">{cert.title}</p>
                    <p className="extra-card__meta">
                      {cert.category} · {cert.date}
                      {hasExpiry ? (
                        <>
                          {" "}
                          ·{" "}
                          <span
                            className={
                              expired
                                ? "text-muted"
                                : "font-medium text-secondary"
                            }
                          >
                            {certStatusLabel(locale, expired)}
                          </span>
                        </>
                      ) : null}
                    </p>
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="extra-card__link"
                    >
                      {viewCert(locale)} →
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div data-extra-group>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            {sectionLabel(locale, "tools")}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {DAILY_STACK.map((tool) => (
              <li key={tool}>
                <Tag>{tool}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <div data-extra-group>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            {sectionLabel(locale, "homelab")}
          </h3>
          <div className="extra-card flex-col items-start">
            <p className="text-sm leading-relaxed text-ink/90">
              {homelabIntro(locale)}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {HOMELAB_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.type === "link" ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      <Tag className="cursor-pointer hover:border-accent/40 hover:text-accent">
                        {item.label}
                      </Tag>
                    </a>
                  ) : (
                    <Tag>{item.label}</Tag>
                  )}
                </li>
              ))}
            </ul>
            {HOMELAB_MORE_HREF ? (
              <a
                href={HOMELAB_MORE_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="extra-card__link"
              >
                {learnMoreLabel(locale)} →
              </a>
            ) : null}
          </div>
        </div>

        <details className="group" data-extra-group>
          <summary className="extra-summary">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            {awsSummary(locale, AWS_COURSES.length)}
            <ChevronDown className="extra-summary__chevron" aria-hidden="true" />
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
    </section>
  );
}
