import type { Locale } from "./i18n";
import { tr } from "./i18n";

export function condenseBullets(bullets: string[]): string {
  if (bullets.length === 0) return "";
  if (bullets.length === 1) return bullets[0];
  return bullets.slice(0, 2).join(" · ");
}

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

export function viewProject(locale: Locale) {
  return tr(locale, "Ver repo", "View repo");
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
