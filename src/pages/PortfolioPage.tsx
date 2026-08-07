import { Nav } from "../components/Nav";
import { ScrollBrand } from "../components/ScrollBrand";
import { SectionRail } from "../components/SectionRail";
import { SkipLink } from "../components/SkipLink";
import { IntroSection } from "../sections/IntroSection";
import { AboutSection } from "../sections/AboutSection";
import { TrackSection } from "../sections/TrackSection";
import { WorkSection } from "../sections/WorkSection";
import { StackSection } from "../sections/StackSection";
import { ExtraSection } from "../sections/ExtraSection";
import type { Locale } from "../lib/i18n";
import { footerCopy } from "../lib/present";

type PortfolioPageProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function PortfolioPage({ locale, onLocaleChange }: PortfolioPageProps) {
  const year = new Date().getFullYear();

  return (
    <>
      <SkipLink locale={locale} />
      <Nav locale={locale} onLocaleChange={onLocaleChange} />
      <ScrollBrand />
      <SectionRail locale={locale} />
      <main id="main">
        <IntroSection locale={locale} />
        <AboutSection locale={locale} />
        <StackSection locale={locale} />
        <TrackSection locale={locale} />
        <WorkSection locale={locale} />
        <ExtraSection locale={locale} />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        {footerCopy(locale, year)}
      </footer>
    </>
  );
}
