import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CERTIFICATIONS,
  DAILY_STACK,
  HOMELAB_ITEMS,
  HOMELAB_MORE_HREF,
  NAV_LINKS,
  NAV_LINKS_EN,
} from "../data/site";
import { Tag } from "../components/Tag";
import { ToolIcon, hasToolIcon } from "../components/ToolIcon";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import {
  certStatusLabel,
  homelabCtaLabel,
  homelabIntro,
  homelabPageNote,
  isCertExpired,
  sectionLabel,
  viewCert,
} from "../lib/present";

gsap.registerPlugin(ScrollTrigger);

type ExtraSectionProps = {
  locale: Locale;
};

function CheckIcon() {
  return (
    <svg
      className="manifest-row__check-icon"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
    const tiles = el.querySelectorAll<HTMLElement>(".manifest-row");

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

      if (tiles.length) {
        gsap.from(tiles, {
          x: -10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.querySelector(".extra-tools"),
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mas"
      className="section-block"
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
          <ol className="relative space-y-6 border-l border-border pl-6">
            {CERTIFICATIONS.map((cert) => {
              const expired = isCertExpired(cert.date);
              const hasExpiry = /—/.test(cert.date);
              return (
                <li key={cert.title} className="relative">
                  <span
                    className={`cert-item__dot ${expired ? "cert-item__dot--muted" : ""}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-sm font-semibold text-ink">
                      {cert.title}
                    </h4>
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="extra-link"
                    >
                      {viewCert(locale)} →
                    </a>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {tr(locale, cert.categoryEs, cert.categoryEn)} · {cert.date}
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
                </li>
              );
            })}
          </ol>
        </div>

        <div data-extra-group className="extra-tools">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-muted">
            {sectionLabel(locale, "tools")}
          </h3>
          <div className="manifest-card">
            <div className="manifest-card__bar">
              <span className="manifest-card__prompt">
                <span className="manifest-card__user">guillermosh</span>
                <span className="manifest-card__at">@</span>
                <span className="manifest-card__host">portfolio</span>
              </span>
              <span>
                :~$ cat daily-stack.log
                <span className="manifest-card__cursor" aria-hidden="true" />
              </span>
            </div>
            <ul className="manifest-list">
              {DAILY_STACK.map((tool) => (
                <li key={tool.label} className="manifest-row">
                  <span className="manifest-row__check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span className="manifest-row__icon" aria-hidden="true">
                    {hasToolIcon(tool.label) ? (
                      <ToolIcon label={tool.label} />
                    ) : null}
                  </span>
                  <span className="manifest-row__name">{tool.label}</span>
                  <span className="manifest-row__note">
                    {tr(locale, tool.noteEs, tool.noteEn)}
                  </span>
                  <span className="manifest-row__status">
                    {tr(locale, "OK", "OK")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-extra-group>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            {sectionLabel(locale, "homelab")}
          </h3>
          <div className="max-w-prose space-y-3">
            {homelabIntro(locale).map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-ink/90">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {HOMELAB_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center">
                {item.type === "link" ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Tag
                      iconLabel={item.label}
                      className="cursor-pointer hover:border-accent/40 hover:text-accent"
                    >
                      {item.label}
                    </Tag>
                  </a>
                ) : (
                  <Tag iconLabel={item.label}>{item.label}</Tag>
                )}
              </li>
            ))}
          </ul>
          {HOMELAB_MORE_HREF ? (
            <div className="mt-5">
              <p className="mb-3 text-sm text-muted">{homelabPageNote(locale)}</p>
              <a
                href={HOMELAB_MORE_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta hero-cta--primary group"
              >
                {homelabCtaLabel(locale)}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
