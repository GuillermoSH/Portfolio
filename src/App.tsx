import { useEffect, useState } from "react";
import { SkipLink } from "./components/SkipLink";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { useDocumentTitleFlash } from "./hooks/useDocumentTitleFlash";
import type { Locale } from "./lib/i18n";
import { Certifications } from "./sections/Certifications";
import { Education } from "./sections/Education";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { ProjectsSection } from "./sections/ProjectsSection";
import { StackSection } from "./sections/StackSection";
import { ToolsSection } from "./sections/ToolsSection";

export default function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const pageTitle =
    locale === "en"
      ? "Guillermo Sicilia Hernández — Full-stack developer"
      : "Guillermo Sicilia Hernández — Desarrollador full-stack";

  useDocumentTitleFlash(pageTitle);

  useEffect(() => {
    document.title = pageTitle;
    document.documentElement.lang = locale;
  }, [locale, pageTitle]);

  return (
    <>
      <SkipLink locale={locale} />
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main id="main" className="pt-14 sm:pt-16">
        <Hero locale={locale} />
        <Experience locale={locale} />
        <Education locale={locale} />
        <Certifications locale={locale} />
        <StackSection locale={locale} />
        <ProjectsSection locale={locale} />
        <ToolsSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
