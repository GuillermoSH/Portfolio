import { NAV_LINKS, NAV_LINKS_EN, SITE } from "../data/site";
import type { Locale } from "../lib/i18n";
import {
  footerBio,
  footerCopy,
  footerCredit,
  footerMarqueePhrases,
  footerNavLabel,
  footerSocialsLabel,
  footerTalkLabel,
} from "../lib/present";
import { CoffeeIcon, ToolIcon } from "./ToolIcon";

type FooterProps = {
  locale: Locale;
};

const MARQUEE_LOOPS = 4;

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();
  const links = locale === "en" ? NAV_LINKS_EN : NAV_LINKS;
  const marqueePhrases = footerMarqueePhrases(locale);
  const marqueeSequence = Array.from({ length: MARQUEE_LOOPS }, () => marqueePhrases).flat();

  return (
    <footer className="site-footer">
      <div className="site-footer__marquee" aria-hidden="true">
        <div className="site-footer__marquee-track">
          {[...marqueeSequence, ...marqueeSequence].map((phrase, index) => (
            <span key={index} className="site-footer__marquee-item">
              {phrase}
              <span className="site-footer__marquee-dot" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{marqueePhrases[0]}</p>

      <div className="layout-shell site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__intro">
            <p className="site-footer__bio">{footerBio(locale)}</p>
          </div>

          <div className="site-footer__talk">
            <p className="site-footer__talk-label">{footerTalkLabel(locale)}</p>
            <p className="site-footer__email">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label={footerNavLabel(locale)}>
          <p className="site-footer__nav-label">{footerNavLabel(locale)}</p>
          <ul className="site-footer__links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer__bar">
        <div className="layout-shell site-footer__bar-inner">
          <p className="site-footer__legal">{footerCopy(locale, year)}</p>

          <div className="site-footer__socials" aria-label={footerSocialsLabel(locale)}>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <ToolIcon label="LinkedIn" className="site-footer__social-icon" />
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <ToolIcon label="GitHub" className="site-footer__social-icon" />
            </a>
          </div>

          <div className="site-footer__meta-end">
            <p className="site-footer__credit-made">
              {footerCredit(locale)}
              <CoffeeIcon className="site-footer__coffee" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
