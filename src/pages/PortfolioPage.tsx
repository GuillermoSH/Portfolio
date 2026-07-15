import { Nav } from "../components/Nav";
import { SkipLink } from "../components/SkipLink";
import { IntroSection } from "../sections/IntroSection";
import { TrackSection } from "../sections/TrackSection";
import { WorkSection } from "../sections/WorkSection";
import { StackSection } from "../sections/StackSection";
import { ExtraSection } from "../sections/ExtraSection";
import type { Locale } from "../lib/i18n";
import { footerCopy } from "../lib/present";
import type { Theme } from "../hooks/useTheme";

type PortfolioPageProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: Theme;
  onThemeToggle: () => void;
  stackLabHref: string;
};

export function PortfolioPage({
  locale,
  onLocaleChange,
  theme,
  onThemeToggle,
  stackLabHref,
}: PortfolioPageProps) {
  const year = new Date().getFullYear();

  return (
    <>
      <SkipLink locale={locale} />
      <Nav
        locale={locale}
        onLocaleChange={onLocaleChange}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main id="main" className="pt-14">
        <IntroSection locale={locale} />
        <StackSection locale={locale} />
        <TrackSection locale={locale} />
        <WorkSection locale={locale} />
        <ExtraSection locale={locale} />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        {footerCopy(locale, year)}
        <span className="mx-2" aria-hidden="true">
          ·
        </span>
        <a
          href={stackLabHref}
          className="underline-offset-2 hover:text-ink hover:underline"
        >
          Stack lab
        </a>
      </footer>
    </>
  );
}
