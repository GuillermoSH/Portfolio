import { useEffect, useState } from "react";
import { PortfolioPage } from "./pages/PortfolioPage";
import { StackLabPage } from "./pages/StackLabPage";
import { useTheme } from "./hooks/useTheme";
import type { Locale } from "./lib/i18n";

export const STACK_LAB_QUERY = "lab=stack";

function isStackLabRoute() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("lab") === "stack") return true;

  const path = window.location.pathname.replace(/\/$/, "");
  return path.endsWith("/stack-lab");
}

function stackLabHref() {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base : `${base}/`;
  return `${root}?lab=stack`;
}

function normalizeStackLabUrl() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (!path.endsWith("/stack-lab")) return false;

  window.history.replaceState(null, "", stackLabHref());
  return true;
}

export default function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const { theme, toggleTheme } = useTheme();
  const [isLab, setIsLab] = useState(() => {
    normalizeStackLabUrl();
    return isStackLabRoute();
  });

  useEffect(() => {
    const syncRoute = () => {
      normalizeStackLabUrl();
      setIsLab(isStackLabRoute());
    };

    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = isLab
      ? "Stack Lab — Guillermo Sicilia"
      : locale === "en"
        ? "Guillermo Sicilia Hernández — Full-stack developer"
        : "Guillermo Sicilia Hernández — Desarrollador full-stack";
  }, [locale, isLab]);

  if (isLab) {
    return <StackLabPage theme={theme} onThemeToggle={toggleTheme} />;
  }

  return (
    <PortfolioPage
      locale={locale}
      onLocaleChange={setLocale}
      theme={theme}
      onThemeToggle={toggleTheme}
      stackLabHref={stackLabHref()}
    />
  );
}
