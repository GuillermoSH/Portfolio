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
} as const;

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

export function projectDetailsLabel(locale: Locale) {
  return tr(locale, "Ver detalles", "View details");
}

export function projectGoalsLabel(locale: Locale) {
  return tr(locale, "Objetivos", "Goals");
}

export function projectChallengesLabel(locale: Locale) {
  return tr(locale, "Problemas encontrados", "Challenges");
}

export function closeLabel(locale: Locale) {
  return tr(locale, "Cerrar", "Close");
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

export function aboutIntro(locale: Locale): string[] {
  return [
    tr(
      locale,
      "Desarrollador full-stack en Tenerife, especializado en construir productos de punta a punta: automatización de procesos de negocio con n8n, interfaces en Next.js y APIs sobre Odoo, Supabase y PostgreSQL. Me mueve simplificar sistemas complejos: menos pasos manuales, automatización fiable y código que se pueda mantener sin sorpresas.",
      "Full-stack developer based in Tenerife, specialized in building end-to-end products: business process automation with n8n, interfaces in Next.js, and APIs on top of Odoo, Supabase and PostgreSQL. What drives me is simplifying complex systems: fewer manual steps, reliable automation and code that stays maintainable without surprises.",
    ),
    tr(
      locale,
      "Me formé en los dos ciclos superiores de DAM y DAW, con una base compartida en Java y TypeScript que fui ampliando con Angular, React, React Native, Flutter y Spring Boot, además de bases de datos en MySQL, MongoDB, H2/Hibernate y despliegues en Bash. De ahí salió el stack que uso hoy por defecto —Next.js, React + Vite, Supabase y Vercel— y que es el que he trasladado a los proyectos que llevo actualmente en tenaasesores.",
      "I trained in DAM and DAW, the two higher-level vocational cycles, building a shared foundation in Java and TypeScript that I expanded with Angular, React, React Native, Flutter and Spring Boot, alongside databases like MySQL, MongoDB, H2/Hibernate and Bash deployments. That's where my current default stack came from —Next.js, React + Vite, Supabase and Vercel— which is what I've carried over to the projects I currently run at tenaasesores.",
    ),
    tr(
      locale,
      "Fuera del trabajo sigo aprendiendo trasteando con mi propio homelab y estudiando cloud y seguridad. También soy entrenador nacional de voleibol: llevo el primer equipo senior masculino de 2ª división del C.V. Orotava - Puerto de la Cruz, del que también soy jugador, además de varias categorías base. Y cuando no estoy delante de una pantalla o de una pista, suelo estar con videojuegos o con modelismo bélico —Warhammer 40k incluido—, afición que tengo desde pequeño.",
      "Outside of work I keep learning by tinkering with my own homelab and studying cloud and security. I'm also a national-level volleyball coach: I run the men's senior first team in the 2nd division at C.V. Orotava - Puerto de la Cruz, where I also play, plus several youth categories. And when I'm not in front of a screen or on a court, I'm usually into video games or wargaming miniatures —Warhammer 40k included— a hobby I've had since I was a kid.",
    ),
  ];
}

type AboutKeywordPair = { es: string; en: string; once?: boolean };

const ABOUT_KEYWORD_PAIRS: AboutKeywordPair[] = [
  { es: "full-stack", en: "full-stack" },
  { es: "n8n", en: "n8n" },
  { es: "Next.js", en: "Next.js" },
  { es: "Supabase", en: "Supabase", once: true },
  { es: "DAM", en: "DAM" },
  { es: "DAW", en: "DAW" },
  { es: "Spring Boot", en: "Spring Boot" },
  { es: "Bash", en: "Bash" },
  { es: "homelab", en: "homelab" },
  { es: "entrenador nacional", en: "national-level volleyball coach" },
  { es: "modelismo", en: "wargaming miniatures" },
];

export type AboutKeyword = { text: string; once: boolean };

export function aboutKeywords(locale: Locale): AboutKeyword[] {
  return ABOUT_KEYWORD_PAIRS.map((pair) => ({
    text: tr(locale, pair.es, pair.en),
    once: Boolean(pair.once),
  }));
}

export function homelabIntro(locale: Locale): string[] {
  return [
    tr(
      locale,
      "Homelab sobre un único nodo — un Intel NUC11ATKC4 (16GB, NVMe) — con todos los servicios en contenedores Docker vía Dockge. Pi-hole resuelve el DNS local, Nginx hace de proxy inverso y n8n automatiza tareas de red y avisos, incluso por Telegram. Por detrás, un MikroTik reparte NAT y DNS, el router del ISP va en modo bridge y dos TP-Link AX58 cubren el Wi-Fi.",
      "A home lab on a single node — an Intel NUC11ATKC4 (16GB RAM, NVMe) — with every service running in Docker containers via Dockge. Pi-hole resolves local DNS, Nginx handles the reverse proxy, and n8n automates network tasks and alerts, even over Telegram. Behind it, a MikroTik router handles NAT and DNS, the ISP router runs in bridge mode, and two TP-Link AX58 units cover Wi-Fi.",
    ),
    tr(
      locale,
      "La seguridad es el pilar central: cero puertos abiertos salvo el webhook de n8n, acceso remoto solo por Tailscale, Fail2ban de guardia y autoescaneos de malware con rkhunter. Una auditoría de pentesting le dio una puntuación de seguridad bastante alta, y Vaultwarden guarda las contraseñas de casa de forma autoalojada.",
      "Security is the core pillar: zero open ports except the n8n webhook, remote access only through Tailscale, Fail2ban standing guard, and periodic rkhunter malware self-scans. A pentesting audit rated it quite high on security, and Vaultwarden keeps the household's passwords self-hosted.",
    ),
  ];
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
    `© ${year} Guillermo Sicilia · Tenerife, España`,
    `© ${year} Guillermo Sicilia · Tenerife, Spain`,
  );
}
