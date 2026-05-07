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
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#formacion", label: "Formación" },
  { href: "#certificaciones", label: "Certificaciones" },
  { href: "#stack", label: "Stack" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#herramientas", label: "Herramientas" },
] as const;

export const HERO_CHIPS = [
  "Spring Boot",
  "Angular",
  "React",
  "Oracle SQL",
  "AWS",
  "Git / Jira",
] as const;

export type ExperienceItem = {
  id: string;
  title: string;
  period: string;
  datetime: string;
  location: string;
  bullets: string[];
  stackNote?: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "tenaasesores",
    title: "Prácticas de empresa — Tenaasesores",
    period: "Feb 2026 — May 2026",
    datetime: "2026-02",
    location: "Los Realejos · Asesoría",
    bullets: [
      "Diseño e implementación de automatizaciones internas con n8n y Odoo Enterprise Online, conectando procesos administrativos y reduciendo fricción operativa.",
      "Impacto medible en eficiencia: en semanas pico, los flujos automatizados registraron hasta 26 horas semanales de ahorro de trabajo manual.",
    ],
    stackNote: "Stack: n8n · Odoo Enterprise Online",
  },
  {
    id: "eviden",
    title: "Software Developer — Eviden",
    period: "Jul 2023 — Dic 2024",
    datetime: "2023-07",
    location: "Santa Cruz de Tenerife · Sistema de gestión para Orange",
    bullets: [
      "Desarrollo e integración de funcionalidades en la aplicación de gestión, optimizando rendimiento y alineando cambios con negocio.",
      "Scripts SQL para poblar bases de datos en entornos no productivos e integración de nuevos productos.",
      "Resolución de incidencias: investigación, depuración y soluciones para continuidad del servicio.",
    ],
    stackNote: "Stack: integración y diseño (suite corporativa), Oracle SQL · Jira",
  },
  {
    id: "atos",
    title: "Desarrollador web — Atos (FCT)",
    period: "Mar 2023 — May 2023",
    datetime: "2023-03",
    location: "Santa Cruz de Tenerife",
    bullets: [
      "Metodologías ágiles y control de versiones con Git.",
      "Desarrollo fullstack con Spring Boot y Angular.",
    ],
  },
];

export const AWS_COURSES = [
  "AWS Cloud Practitioner Essentials",
  "AWS Foundations — Getting Started",
  "Introduction to AWS CAF",
  "Job Roles in the Cloud",
  "Getting Started with Cloud Acquisition",
] as const;

export const STACK_CHIPS = [
  "TypeScript",
  "Java",
  "React",
  "Next.js",
  "React Native",
  "Flutter",
  "SQL / Oracle SQL",
  "Spring Boot",
  "Angular",
  "Git",
  "Jira",
  "Integración",
  "Bases de datos",
  "UiPath",
  "Odoo",
] as const;

export const LEARNING_STACK_CHIPS = [
  "Next.js",
  "Supabase",
  "n8n",
  "Sistemas agénticos",
  "Docker",
  "Seguridad de aplicaciones",
] as const;

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  href: string;
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "cvorotava-team-manager",
    name: "CVOrotava-Team-Manager",
    description:
      "Aplicacion web para gestion centralizada de informacion deportiva de club.",
    tech: ["TypeScript", "Aplicación web", "Gestión deportiva"],
    href: "https://github.com/GuillermoSH/CVOrotava-Team-Manager",
  },
  {
    id: "tic-tac-toe",
    name: "tic-tac-toe",
    description:
      "Tres en raya moderno con animaciones, estadisticas detalladas y temas personalizables.",
    tech: ["TypeScript", "Animaciones UI", "UX de juego"],
    href: "https://github.com/GuillermoSH/tic-tac-toe",
  },
  {
    id: "cvorotava-back",
    name: "CVOrotava-back",
    description:
      "Backend Java para dashboard interno de club de voleibol con enfoque en gestion de tareas.",
    tech: ["Java", "API", "Backend"],
    href: "https://github.com/GuillermoSH/CVOrotava-back",
  },
  {
    id: "netpulse",
    name: "NetPulse",
    description:
      "Marcador de voleibol con diseño moderno, foco en dinamismo de partido y control de rachas de puntos.",
    tech: ["TypeScript", "UX deportiva", "Voleibol"],
    href: "https://github.com/GuillermoSH/NetPulse",
  },
] as const;

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
    date: "Noviembre 2024",
    linkLabel: "Ver certificado",
    href: "https://portal.speexx.com/certificate/YTUzMGM2ZGQtYTQ2Zi00OWQ2LWE2NTItNjY0MTk4OGNmNzI5Ojo4MQ==",
  },
  {
    category: "Cloud",
    title: "AWS Certified Cloud Practitioner",
    date: "Jul 2024 — caducidad Jul 2027",
    linkLabel: "Ver en Credly",
    href: "https://www.credly.com/badges/f62148b5-f49e-4ee3-8443-cfbbf8160728",
  },
  {
    category: "Automatización",
    title: "UiPath Automation Developer Professional",
    date: "Oct 2024 — caducidad Oct 2026",
    linkLabel: "Ver credencial",
    href: "https://credentials.uipath.com/9f728270-5c0b-45cb-b781-d0477f8526d5",
  },
];

export type DailyTool = {
  id: string;
  iconClass: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  iconWrapperClass?: string;
  gridClass?: string;
};

export const DAILY_TOOLS: DailyTool[] = [
  {
    id: "github",
    iconClass: "fa-brands fa-github text-2xl",
    title: "GitHub",
    description:
      "Repos, CI, revisiones y colaboración: el centro de gravedad del día a día de código.",
    href: "https://github.com/",
    linkLabel: "github.com",
    iconWrapperClass:
      "bg-stone-900 text-white shadow-inner dark:bg-stone-100 dark:text-stone-900",
  },
  {
    id: "notion",
    iconClass: "fa-solid fa-n text-xl font-black",
    title: "Notion",
    description:
      "Notas, tableros y documentación viva: dejo ahí contexto de proyectos y listas que no quiero perder.",
    href: "https://www.notion.so/",
    linkLabel: "notion.so",
    iconWrapperClass:
      "bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900",
  },
  {
    id: "n8n",
    iconClass: "fa-solid fa-diagram-project text-xl",
    title: "n8n",
    description:
      "Automatización low-code: encadenar APIs, webhooks y tareas repetitivas sin reinventar la rueda cada vez.",
    href: "https://n8n.io/",
    linkLabel: "n8n.io",
    iconWrapperClass:
      "bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg shadow-orange-500/25",
    gridClass: "sm:col-span-2 lg:col-span-1",
  },
];

export type HomelabLink =
  | { type: "link"; label: string; href: string }
  | { type: "text"; label: string };

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

/** Extra classes for homelab chips (base `.chip` added by Chip or manually on `<a>`). */
export const HOMELAB_CHIP_EXTRA =
  "border-teal-200 bg-white/90 py-2 text-stone-700 transition hover:border-teal-400 dark:border-zinc-600 dark:bg-zinc-900/90 dark:text-stone-200 dark:hover:border-teal-500/50";
