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
    es: "Stack de uso diario",
    en: "Daily stack",
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

export function stackLead(locale: Locale) {
  return tr(
    locale,
    "Cómo construyo de punta a punta: origen, build, deploy y ops.",
    "How I ship end to end: source, build, deploy and ops.",
  );
}

export function projectLinkLabel(locale: Locale, linkType: ProjectLinkType = "repo") {
  if (linkType === "site") return tr(locale, "Abrir web", "Open site");
  if (linkType === "none") return null;
  return tr(locale, "Ver repo", "View repo");
}

export function projectLiveLabel(locale: Locale) {
  return tr(locale, "En producción", "Live");
}

export function projectHostLabel(href?: string) {
  if (!href) return null;
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function projectStatusDev(locale: Locale) {
  return tr(locale, "En desarrollo", "In development");
}

export function viewCert(locale: Locale) {
  return tr(locale, "Ver", "View");
}

const MONTHS_ES: Record<string, number> = {
  ene: 0,
  feb: 1,
  mar: 2,
  abr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dic: 11,
};

export function certExpiry(dateRange: string): Date | null {
  const parts = dateRange.split("—").map((s) => s.trim());
  if (parts.length < 2) return null;

  const match = parts[1].match(/^([A-Za-zÁÉÍÓÚáéíóú]{3,4})\.?\s+(\d{4})$/);
  if (!match) return null;

  const month = MONTHS_ES[match[1].toLowerCase().slice(0, 3)];
  if (month === undefined) return null;

  return new Date(Number(match[2]), month + 1, 0);
}

export function isCertExpired(dateRange: string, now = new Date()): boolean {
  const expiry = certExpiry(dateRange);
  return expiry ? expiry < now : false;
}

export function certStatusLabel(locale: Locale, expired: boolean) {
  return tr(locale, expired ? "No vigente" : "Vigente", expired ? "Expired" : "Active");
}

export function homelabIntro(locale: Locale) {
  return tr(
    locale,
    "Un homelab casero para practicar despliegue, monitorización y redes: contenedores gestionados con Dockge, monitorización con Uptime Kuma y Beszel, y proxy inverso con Nginx Proxy Manager, todo sobre Docker Compose en mi red local.",
    "A home lab for practicing deployment, monitoring and networking: containers managed with Dockge, monitoring via Uptime Kuma and Beszel, and reverse proxy with Nginx Proxy Manager, all running on Docker Compose on my local network.",
  );
}

export function learnMoreLabel(locale: Locale) {
  return tr(locale, "Saber más", "Learn more");
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
