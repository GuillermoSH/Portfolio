import { useEffect, useState } from "react";
import { PortfolioPage } from "./pages/PortfolioPage";
import { useTheme } from "./hooks/useTheme";
import type { Locale } from "./lib/i18n";

export default function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title =
      locale === "en"
        ? "Guillermo Sicilia Hernández — Full-stack developer"
        : "Guillermo Sicilia Hernández — Desarrollador full-stack";
  }, [locale]);

  return (
    <PortfolioPage
      locale={locale}
      onLocaleChange={setLocale}
      theme={theme}
      onThemeToggle={toggleTheme}
    />
  );
}
