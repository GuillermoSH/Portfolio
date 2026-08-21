import { Nav } from "../components/Nav";
import { ScrollBrand } from "../components/ScrollBrand";
import { SectionRail } from "../components/SectionRail";
import { SkipLink } from "../components/SkipLink";
import { Footer } from "../components/Footer";
import { IntroSection } from "../sections/IntroSection";
import { AboutSection } from "../sections/AboutSection";
import { TrackSection } from "../sections/TrackSection";
import { WorkSection } from "../sections/WorkSection";
import { StackSection } from "../sections/StackSection";
import { ExtraSection } from "../sections/ExtraSection";
import type { Locale } from "../lib/i18n";

type PortfolioPageProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function PortfolioPage({ locale, onLocaleChange }: PortfolioPageProps) {
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
      <Footer locale={locale} />
    </>
  );
}
