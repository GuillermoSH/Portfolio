import { useEffect, useState } from "react";
import { PortfolioPage } from "./pages/PortfolioPage";
import { FontExperimentPage } from "./pages/FontExperimentPage";
import type { Locale } from "./lib/i18n";

const DESCRIPTION_ES =
  "Guillermo Sicilia Hernández — desarrollador full-stack en Tenerife. Proyectos en Next.js, Supabase y n8n, automatización de procesos y APIs sobre Odoo.";
const DESCRIPTION_EN =
  "Guillermo Sicilia Hernández — full-stack developer based in Tenerife. Projects in Next.js, Supabase and n8n, process automation and APIs on top of Odoo.";

export default function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const isFontExperiment = window.location.pathname.replace(/\/+$/, "") === "/ex-fonts";

  useEffect(() => {
    if (isFontExperiment) return;
    document.documentElement.lang = locale;
    document.title =
      locale === "en"
        ? "Guillermo Sicilia Hernández — Full-stack developer"
        : "Guillermo Sicilia Hernández — Desarrollador full-stack";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", locale === "en" ? DESCRIPTION_EN : DESCRIPTION_ES);
  }, [locale, isFontExperiment]);

  useEffect(() => {
    if (!isFontExperiment) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, [isFontExperiment]);

  if (isFontExperiment) return <FontExperimentPage />;

  return <PortfolioPage locale={locale} onLocaleChange={setLocale} />;
}
