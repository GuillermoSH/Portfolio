export const SITE = {
  name: "Guillermo Sicilia",
  fullName: "Guillermo Sicilia Hernández",
  title: "Full-stack",
  location: "Puerto de la Cruz (Tenerife)",
  linkedin:
    "https://www.linkedin.com/in/guillermo-sicilia-hern%C3%A1ndez-95861523b/",
  github: "https://github.com/GuillermoSH",
  twitter: "https://twitter.com/guillermoshdez",
} as const;

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#stack", label: "Stack" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#mas", label: "Más" },
] as const;

export const NAV_LINKS_EN = [
  { href: "#inicio", label: "Home" },
  { href: "#stack", label: "Stack" },
  { href: "#trayectoria", label: "Experience" },
  { href: "#proyectos", label: "Projects" },
  { href: "#mas", label: "More" },
] as const;

export const HERO_CHIPS = [
  "Spring Boot",
  "Angular",
  "React",
  "Oracle SQL",
  "AWS",
  "TypeScript",
] as const;

export const FEATURED_PROJECT_ID = "tenaasesores" as const;

export type ExperienceItem = {
  id: string;
  title: string;
  period: string;
  datetime: string;
  location: string;
  paragraphs: string[];
  stackNote?: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "tena",
    title: "Desarrollador de software — Tena Asesores y Abogados S.L.",
    period: "May 2026 — actualidad",
    datetime: "2026-05",
    location: "Asesoría fiscal y jurídica",
    paragraphs: [
      "Diseño y administración de una infraestructura de n8n autohospedado con Workers y colas de Redis, procesando picos de +1000 ejecuciones semanales en paralelo. Automatización de flujos críticos de negocio: onboarding de clientes, cálculo de Impuestos de Sociedades (RIC, deducciones y BIN) y asignación automática de tareas fiscales.",
      "Implementación de un sistema de backup y sincronización en tiempo real entre Odoo y Google Drive para garantizar la continuidad del negocio ante caídas del servicio. Desarrollo como único responsable de la web corporativa y del portal de cliente Syntia en Next.js y Supabase, preparándolo para la futura integración de una IA local (DGX Spark).",
    ],
    stackNote: "Next.js · Odoo · n8n · Supabase · Redis · Vercel · Docker",
  },
  {
    id: "tena-fct",
    title: "Desarrollador de software — Tena Asesores y Abogados S.L. (FCT)",
    period: "Feb 2026 — May 2026",
    datetime: "2026-02",
    location: "Asesoría fiscal y jurídica",
    paragraphs: [
      "Optimización de tiempos mediante automatizaciones con n8n que lograron un ahorro pico de más de 26 horas de tareas manuales a la semana. Desarrollo de modelos, vistas y lógica interna a medida en Python para el ERP Odoo, cubriendo procesos específicos que el estándar no soportaba.",
      "Integración de flujos internos conectando crons nativos de Odoo con escenarios y llamadas externas en n8n. Diseño, maquetación y mantenimiento de la web corporativa utilizando Odoo Website.",
    ],
    stackNote: "Odoo · Python · n8n · Google Drive",
  },
  {
    id: "eviden",
    title: "Desarrollador de software — Eviden",
    period: "Jul 2023 — Dic 2024",
    datetime: "2023-07",
    location: "Santa Cruz de Tenerife · Sistema de gestión para Orange",
    paragraphs: [
      "Desarrollo e integración de nuevas funcionalidades en la plataforma de gestión de Orange, priorizando la estabilidad del sistema y el rendimiento. Creación de scripts en Oracle SQL para la carga de nuevos productos e integración de datos en entornos preproductivos y de pruebas.",
      "Despliegue remoto de código y parches de incidencias en entornos preproductivos a través de SSH y Tibco Administrator. Análisis, depuración y resolución de incidencias en producción para asegurar la continuidad del servicio dentro del ecosistema Tibco.",
    ],
    stackNote: "Oracle SQL · Ecosistema TIBCO · Tibco Administrator · SSH · Jira",
  },
  {
    id: "atos",
    title: "Desarrollador web — Atos (FCT)",
    period: "Mar 2023 — May 2023",
    datetime: "2023-03",
    location: "Santa Cruz de Tenerife",
    paragraphs: [
      "Desarrollo Full-stack modular utilizando Spring Boot para la arquitectura del backend y Angular para la interfaz de usuario.",
      "Colaboración activa en células de desarrollo bajo marco de trabajo ágil (Scrum) y gestión de control de versiones con Git.",
    ],
    stackNote: "Spring Boot · Angular · Git · Scrum",
  },
];

export type PipelineStep = {
  id: string;
  labelEs: string;
  labelEn: string;
  hintEs: string;
  hintEn: string;
  tools: string[];
};

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "source",
    labelEs: "Source",
    labelEn: "Source",
    hintEs: "Control de versiones, entorno y tooling diario",
    hintEn: "Version control, environment and daily tooling",
    tools: ["Git", "Cursor", "VSCode", "bash"],
  },
  {
    id: "build",
    labelEs: "Build",
    labelEn: "Build",
    hintEs: "Lenguajes, frameworks, UI y datos",
    hintEn: "Languages, frameworks, UI and data",
    tools: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Next.js",
      "Angular",
      "React",
      "React Native",
      "Expo",
      "Tailwind",
      "Oracle SQL",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    id: "deploy",
    labelEs: "Deploy",
    labelEn: "Deploy",
    hintEs: "CI/CD, cloud y servidores Linux",
    hintEn: "CI/CD, cloud and Linux servers",
    tools: [
      "GitHub Actions",
      "Vercel",
      "Supabase",
      "pnpm",
      "Ubuntu Server",
      "bash",
    ],
  },
  {
    id: "ops",
    labelEs: "Ops",
    labelEn: "Ops",
    hintEs: "Automatización y forma de trabajar",
    hintEn: "Automation and ways of working",
    tools: ["n8n", "Kanban", "Scrum"],
  },
];

export const AWS_COURSES = [
  "AWS Cloud Practitioner Essentials",
  "AWS Foundations — Getting Started",
  "Introduction to AWS CAF",
  "Job Roles in the Cloud",
  "Getting Started with Cloud Acquisition",
] as const;

export type ProjectLinkType = "repo" | "site" | "none";

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  href?: string;
  linkType?: ProjectLinkType;
  preview?: string;
  previewAlt?: string;
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "tenaasesores",
    name: "tenaasesores.es",
    description:
      "Web corporativa en producción: Next.js, datos en vivo desde Odoo y deploy en Vercel.",
    tech: ["Next.js", "Odoo", "Vercel"],
    href: "https://www.tenaasesores.es/",
    linkType: "site",
    preview: "/img/tenaasesores.png",
    previewAlt: "Captura de la web tenaasesores.es",
  },
  {
    id: "syntia",
    name: "Syntia",
    description:
      "Portal de cliente para la asesoría: información desde Odoo y parte de la base en Supabase. En desarrollo, sin lanzar aún.",
    tech: ["Next.js", "Odoo", "Supabase", "Vercel"],
    linkType: "none",
  },
  {
    id: "cvorotava-team-manager",
    name: "CVOrotava-Team-Manager",
    description:
      "Gestión centralizada de información deportiva para un club de voleibol.",
    tech: ["TypeScript", "Web", "Gestión deportiva"],
    href: "https://github.com/GuillermoSH/CVOrotava-Team-Manager",
  },
  {
    id: "netpulse",
    name: "NetPulse",
    description:
      "Marcador de voleibol con control de rachas y dinámica de partido.",
    tech: ["TypeScript", "UX deportiva"],
    href: "https://github.com/GuillermoSH/NetPulse",
  },
  {
    id: "cvorotava-back",
    name: "CVOrotava-back",
    description: "Backend Java para dashboard interno y gestión de tareas.",
    tech: ["Java", "API"],
    href: "https://github.com/GuillermoSH/CVOrotava-back",
  },
];

export type CertItem = {
  category: string;
  title: string;
  date: string;
  linkLabel: string;
  href: string;
};

export const CERTIFICATIONS: CertItem[] = [
  {
    category: "Inglés",
    title: "Speexx English · B2.1 (CEFR)",
    date: "Nov 2024",
    linkLabel: "Ver certificado",
    href: "https://portal.speexx.com/certificate/YTUzMGM2ZGQtYTQ2Zi00OWQ2LWE2NTItNjY0MTk4OGNmNzI5Ojo4MQ==",
  },
  {
    category: "Cloud",
    title: "AWS Certified Cloud Practitioner",
    date: "Jul 2024 — Jul 2027",
    linkLabel: "Ver en Credly",
    href: "https://www.credly.com/badges/f62148b5-f49e-4ee3-8443-cfbbf8160728",
  },
  {
    category: "Automatización",
    title: "UiPath Automation Developer Professional",
    date: "Oct 2024 — Oct 2026",
    linkLabel: "Ver credencial",
    href: "https://credentials.uipath.com/9f728270-5c0b-45cb-b781-d0477f8526d5",
  },
];

export const DAILY_STACK = [
  "Next.js",
  "Tailwind",
  "Vite",
  "GitHub",
  "n8n",
  "Supabase",
  "Vercel",
  "Bash",
] as const;

export type HomelabLink =
  | { type: "link"; label: string; href: string }
  | { type: "text"; label: string };

export const HOMELAB_MORE_HREF: string | undefined = undefined;

export const HOMELAB_ITEMS: HomelabLink[] = [
  { type: "link", label: "Dockge", href: "https://github.com/louislam/dockge" },
  {
    type: "link",
    label: "Uptime Kuma",
    href: "https://github.com/louislam/uptime-kuma",
  },
  { type: "link", label: "Beszel", href: "https://github.com/henrygd/beszel" },
  {
    type: "link",
    label: "Nginx Proxy Manager",
    href: "https://nginxproxymanager.com/",
  },
  { type: "text", label: "Docker / Compose" },
  { type: "text", label: "Red local & DNS" },
];
