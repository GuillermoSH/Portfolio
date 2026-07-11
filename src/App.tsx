import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { SkipLink } from "./components/SkipLink";
import { IntroSection } from "./sections/IntroSection";
import { TrackSection } from "./sections/TrackSection";
import { WorkSection } from "./sections/WorkSection";
import { StackSection } from "./sections/StackSection";
import { ExtraSection } from "./sections/ExtraSection";
import { useTheme } from "./hooks/useTheme";
import type { Locale } from "./lib/i18n";
import { footerCopy } from "./lib/present";

export default function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const { theme, toggleTheme } = useTheme();
  const year = new Date().getFullYear();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title =
      locale === "en"
        ? "Guillermo Sicilia Hernández — Full-stack developer"
        : "Guillermo Sicilia Hernández — Desarrollador full-stack";
  }, [locale]);

  return (
    <>
      <SkipLink locale={locale} />
      <Nav
        locale={locale}
        onLocaleChange={setLocale}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main id="main" className="pt-14">
        <IntroSection locale={locale} />
        <TrackSection locale={locale} />
        <WorkSection locale={locale} />
        <StackSection locale={locale} />
        <ExtraSection locale={locale} />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        {footerCopy(locale, year)}
      </footer>
    </>
  );
}
