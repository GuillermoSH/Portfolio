import type { Locale } from "./i18n";
import type { ProjectLinkType } from "../data/site";
import { tr } from "./i18n";

export function parseStackNote(note?: string): string[] {
  if (!note) return [];
  return note.split("·").map((s) => s.trim()).filter(Boolean);
}

export function sectionLabel(locale: Locale, key: keyof typeof SECTION_LABELS) {
  const labels = SECTION_LABELS[key];
  return tr(locale, labels.es, labels.en);
}

const SECTION_LABELS = {
  extra: {
    es: "Certificaciones",
    en: "Certifications",
  },
  tools: {
    es: "Herramientas",
    en: "Tools",
  },
  homelab: {
    es: "Homelab",
    en: "Homelab",
  },
  aws: {
    es: "Formación AWS",
    en: "AWS training",
  },
} as const;

export function awsSummary(locale: Locale, count: number) {
  return tr(
    locale,
    `${count} cursos AWS completados`,
    `${count} AWS courses completed`,
  );
}

export function profileLead(locale: Locale) {
  return tr(
    locale,
    "Lo que más uso para llevar productos a producción: integración, backend, frontend y automatización.",
    "What I reach for most to ship production software: integration, backend, frontend and automation.",
  );
}

export function profileAlsoLabel(locale: Locale) {
  return tr(locale, "También en el stack", "Also in the stack");
}

export function projectLinkLabel(locale: Locale, linkType: ProjectLinkType = "repo") {
  if (linkType === "site") return tr(locale, "Ver web", "View site");
  if (linkType === "none") return null;
  return tr(locale, "Ver repo", "View repo");
}

export function projectStatusDev(locale: Locale) {
  return tr(locale, "En desarrollo", "In development");
}

export function viewCert(locale: Locale) {
  return tr(locale, "Ver", "View");
}

export function skipLabel(locale: Locale) {
  return tr(locale, "Saltar al contenido", "Skip to content");
}

export function footerCopy(locale: Locale, year: number) {
  return tr(
    locale,
    `© ${year} Guillermo Sicilia · Puerto de la Cruz`,
    `© ${year} Guillermo Sicilia · Puerto de la Cruz`,
  );
}
