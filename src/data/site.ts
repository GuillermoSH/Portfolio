export const SITE = {
  name: "Guillermo Sicilia",
  fullName: "Guillermo Sicilia Hernández",
  title: "Full-stack",
  locationEs: "Tenerife, España",
  locationEn: "Tenerife, Spain",
  linkedin:
    "https://www.linkedin.com/in/guillermo-sicilia-hern%C3%A1ndez-95861523b/",
  github: "https://github.com/GuillermoSH",
  twitter: "https://twitter.com/guillermoshdez",
  email: "siciliahernandezguillermo@gmail.com",
} as const;

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#mas", label: "Más" },
] as const;

export const NAV_LINKS_EN = [
  { href: "#inicio", label: "Home" },
  { href: "#sobre-mi", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#trayectoria", label: "Experience" },
  { href: "#proyectos", label: "Projects" },
  { href: "#mas", label: "More" },
] as const;

export const FEATURED_PROJECT_ID = "tenaasesores" as const;

export type ExperienceItem = {
  id: string;
  titleEs: string;
  titleEn: string;
  periodEs: string;
  periodEn: string;
  datetime: string;
  locationEs: string;
  locationEn: string;
  paragraphsEs: string[];
  paragraphsEn: string[];
  stackNote?: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "tena",
    titleEs: "Desarrollador de software — Tena Asesores y Abogados S.L.",
    titleEn: "Software Developer — Tena Asesores y Abogados S.L.",
    periodEs: "May 2026 — actualidad",
    periodEn: "May 2026 — present",
    datetime: "2026-05",
    locationEs: "Asesoría fiscal y jurídica",
    locationEn: "Tax and legal advisory firm",
    paragraphsEs: [
      "Diseño y administración de una infraestructura de n8n autohospedado con Workers y colas de Redis, procesando picos de +1000 ejecuciones semanales en paralelo. Automatización de flujos críticos de negocio: onboarding de clientes, cálculo de Impuestos de Sociedades (RIC, deducciones y BIN) y asignación automática de tareas fiscales.",
      "Implementación de un sistema de backup y sincronización en tiempo real entre Odoo y Google Drive para garantizar la continuidad del negocio ante caídas del servicio. Desarrollo como único responsable de la web corporativa y del portal de cliente Syntia en Next.js y Supabase, preparándolo para la futura integración de una IA local (DGX Spark).",
    ],
    paragraphsEn: [
      "Design and administration of a self-hosted n8n infrastructure with Workers and Redis queues, handling peaks of 1000+ weekly executions in parallel. Automation of critical business workflows: client onboarding, Corporate Tax calculations (RIC, deductions and BIN) and automatic tax task assignment.",
      "Implementation of a real-time backup and sync system between Odoo and Google Drive to ensure business continuity during service outages. Sole developer of the corporate website and the Syntia client portal, built with Next.js and Supabase, preparing it for the future integration of a local AI (DGX Spark).",
    ],
    stackNote: "Next.js · Odoo · n8n · Supabase · Redis · Vercel · Docker",
  },
  {
    id: "tena-fct",
    titleEs: "Desarrollador de software — Tena Asesores y Abogados S.L. (FCT)",
    titleEn: "Software Developer — Tena Asesores y Abogados S.L. (Work placement)",
    periodEs: "Feb 2026 — May 2026",
    periodEn: "Feb 2026 — May 2026",
    datetime: "2026-02",
    locationEs: "Asesoría fiscal y jurídica",
    locationEn: "Tax and legal advisory firm",
    paragraphsEs: [
      "Optimización de tiempos mediante automatizaciones con n8n que lograron un ahorro pico de más de 26 horas de tareas manuales a la semana. Desarrollo de modelos, vistas y lógica interna a medida en Python para el ERP Odoo, cubriendo procesos específicos que el estándar no soportaba.",
      "Integración de flujos internos conectando crons nativos de Odoo con escenarios y llamadas externas en n8n. Diseño, maquetación y mantenimiento de la web corporativa utilizando Odoo Website.",
    ],
    paragraphsEn: [
      "Time optimization through n8n automations that achieved a peak saving of over 26 hours of manual work per week. Development of custom models, views and internal logic in Python for the Odoo ERP, covering specific processes the standard system didn't support.",
      "Integration of internal workflows connecting Odoo's native cron jobs with n8n scenarios and external calls. Design, layout and maintenance of the corporate website using Odoo Website.",
    ],
    stackNote: "Odoo · Python · n8n · Google Drive",
  },
  {
    id: "eviden",
    titleEs: "Desarrollador de software — Eviden",
    titleEn: "Software Developer — Eviden",
    periodEs: "Jul 2023 — Dic 2024",
    periodEn: "Jul 2023 — Dec 2024",
    datetime: "2023-07",
    locationEs: "Santa Cruz de Tenerife · Sistema de gestión para Orange",
    locationEn: "Santa Cruz de Tenerife · Management system for Orange",
    paragraphsEs: [
      "Desarrollo e integración de nuevas funcionalidades en la plataforma de gestión de Orange, priorizando la estabilidad del sistema y el rendimiento. Creación de scripts en Oracle SQL para la carga de nuevos productos e integración de datos en entornos preproductivos y de pruebas.",
      "Despliegue remoto de código y parches de incidencias en entornos preproductivos a través de SSH y Tibco Administrator. Análisis, depuración y resolución de incidencias en producción para asegurar la continuidad del servicio dentro del ecosistema Tibco.",
    ],
    paragraphsEn: [
      "Development and integration of new features on Orange's management platform, prioritizing system stability and performance. Creation of Oracle SQL scripts for loading new products and integrating data in pre-production and testing environments.",
      "Remote deployment of code and incident patches to pre-production environments via SSH and Tibco Administrator. Analysis, debugging and resolution of production incidents to ensure service continuity within the Tibco ecosystem.",
    ],
    stackNote: "Oracle SQL · Ecosistema TIBCO · Tibco Administrator · SSH · Jira",
  },
  {
    id: "atos",
    titleEs: "Desarrollador web — Atos (FCT)",
    titleEn: "Web Developer — Atos (Work placement)",
    periodEs: "Mar 2023 — May 2023",
    periodEn: "Mar 2023 — May 2023",
    datetime: "2023-03",
    locationEs: "Santa Cruz de Tenerife",
    locationEn: "Santa Cruz de Tenerife",
    paragraphsEs: [
      "Desarrollo Full-stack modular utilizando Spring Boot para la arquitectura del backend y Angular para la interfaz de usuario.",
      "Colaboración activa en células de desarrollo bajo marco de trabajo ágil (Scrum) y gestión de control de versiones con Git.",
    ],
    paragraphsEn: [
      "Modular full-stack development using Spring Boot for the backend architecture and Angular for the user interface.",
      "Active collaboration in development cells under an agile framework (Scrum) and version control management with Git.",
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

export type ProjectLinkType = "repo" | "site" | "none";

export type ProjectItem = {
  id: string;
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  tech: string[];
  techEn?: string[];
  href?: string;
  linkType?: ProjectLinkType;
  preview?: string;
  previewAltEs?: string;
  previewAltEn?: string;
  goalsEs?: string[];
  goalsEn?: string[];
  challengesEs?: string[];
  challengesEn?: string[];
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "tenaasesores",
    name: "tenaasesores.es",
    descriptionEs:
      "Web corporativa en producción: Next.js, datos en vivo desde Odoo y deploy en Vercel.",
    descriptionEn:
      "Corporate website in production: Next.js, live data from Odoo and deployment on Vercel.",
    tech: ["Next.js", "Odoo", "Vercel"],
    href: "https://www.tenaasesores.es/",
    linkType: "site",
    preview: "/img/tenaasesores.png",
    previewAltEs: "Captura de la web tenaasesores.es",
    previewAltEn: "Screenshot of the tenaasesores.es website",
    goalsEs: [
      "Sustituir la web estática anterior por una plataforma con datos en vivo desde Odoo.",
      "Unificar la imagen corporativa y mejorar el rendimiento y el SEO.",
    ],
    goalsEn: [
      "Replace the previous static site with a platform powered by live data from Odoo.",
      "Unify the corporate image and improve performance and SEO.",
    ],
    challengesEs: [
      "Sincronizar en tiempo real la información fiscal/jurídica de Odoo sin sobrecargar la API.",
      "Desplegar sobre Vercel manteniendo la integración con la infraestructura de la asesoría.",
    ],
    challengesEn: [
      "Sync Odoo's tax/legal data in real time without overloading the API.",
      "Deploy on Vercel while keeping the integration with the firm's infrastructure.",
    ],
  },
  {
    id: "syntia",
    name: "Syntia",
    descriptionEs:
      "Portal de cliente para la asesoría: información desde Odoo y parte de la base en Supabase.",
    descriptionEn:
      "Client portal for the advisory firm: information from Odoo with part of the database on Supabase.",
    tech: ["Next.js", "Odoo", "Supabase", "Vercel"],
    href: "https://app.syntia.es/",
    linkType: "site",
    preview: "/img/syntia.png",
    previewAltEs: "Captura de la web app.syntia.es",
    previewAltEn: "Screenshot of the app.syntia.es website",
    goalsEs: [
      "Dar a los clientes un portal propio para consultar su información fiscal sin depender de llamadas o email.",
      "Centralizar datos de Odoo y Supabase en una única experiencia de cliente.",
    ],
    goalsEn: [
      "Give clients their own portal to check their tax information without relying on calls or email.",
      "Centralize Odoo and Supabase data into a single client experience.",
    ],
    challengesEs: [
      "Diseñar autenticación y permisos que respeten la privacidad de cada cliente.",
      "Mantener la información sincronizada entre Odoo (ERP) y Supabase en tiempo real.",
    ],
    challengesEn: [
      "Design authentication and permissions that respect each client's privacy.",
      "Keep information in sync between Odoo (ERP) and Supabase in real time.",
    ],
  },
  {
    id: "cvorotava-team-manager",
    name: "CVOrotava-Team-Manager",
    descriptionEs:
      "Gestión centralizada de información deportiva para un club de voleibol.",
    descriptionEn:
      "Centralized management of sports information for a volleyball club.",
    tech: ["TypeScript", "Web", "Gestión deportiva"],
    techEn: ["TypeScript", "Web", "Sports management"],
    href: "https://github.com/GuillermoSH/CVOrotava-Team-Manager",
    goalsEs: [
      "Centralizar la gestión deportiva del club: convocatorias, estadísticas y comunicación con el equipo.",
      "Sustituir hojas de cálculo dispersas por una única fuente de verdad.",
    ],
    goalsEn: [
      "Centralize the club's sports management: rosters, stats and team communication.",
      "Replace scattered spreadsheets with a single source of truth.",
    ],
    challengesEs: [
      "Modelar datos deportivos con varias categorías y temporadas sin perder trazabilidad histórica.",
    ],
    challengesEn: [
      "Model sports data across multiple categories and seasons without losing historical traceability.",
    ],
  },
  {
    id: "netpulse",
    name: "NetPulse",
    descriptionEs:
      "Marcador de voleibol con control de rachas y dinámica de partido.",
    descriptionEn:
      "Volleyball scoreboard with run tracking and match dynamics.",
    tech: ["TypeScript", "UX deportiva"],
    techEn: ["TypeScript", "Sports UX"],
    href: "https://github.com/GuillermoSH/NetPulse",
    goalsEs: [
      "Ofrecer un marcador pensado para el ritmo real de un partido, con rachas y estado del set.",
      "Facilitar el seguimiento en directo desde banquillo o grada.",
    ],
    goalsEn: [
      "Provide a scoreboard built for the real pace of a match, with runs and set state.",
      "Make live tracking easier from the bench or the stands.",
    ],
    challengesEs: [
      "Diseñar una UX rápida de usar bajo presión, sin pasos de más durante el partido.",
    ],
    challengesEn: [
      "Design a UX that's fast to use under pressure, with no extra steps during the match.",
    ],
  },
  {
    id: "cvorotava-back",
    name: "CVOrotava-back",
    descriptionEs: "Backend Java para dashboard interno y gestión de tareas.",
    descriptionEn: "Java backend for an internal dashboard and task management.",
    goalsEs: [
      "Dar soporte a un dashboard interno para la gestión de tareas del club.",
      "Exponer una API estable para los distintos frontends del proyecto.",
    ],
    goalsEn: [
      "Support an internal dashboard for the club's task management.",
      "Expose a stable API for the project's various frontends.",
    ],
    challengesEs: [
      "Diseñar un backend en Java fácil de mantener sin dedicación a tiempo completo.",
    ],
    challengesEn: [
      "Design a Java backend that's easy to maintain without full-time dedication.",
    ],
    tech: ["Java", "API"],
    href: "https://github.com/GuillermoSH/CVOrotava-back",
  },
];

export type CertItem = {
  categoryEs: string;
  categoryEn: string;
  title: string;
  date: string;
  linkLabel: string;
  href: string;
};

export const CERTIFICATIONS: CertItem[] = [
  {
    categoryEs: "Inglés",
    categoryEn: "English",
    title: "Speexx English · B2.1 (CEFR)",
    date: "Nov 2024",
    linkLabel: "Ver certificado",
    href: "https://portal.speexx.com/certificate/YTUzMGM2ZGQtYTQ2Zi00OWQ2LWE2NTItNjY0MTk4OGNmNzI5Ojo4MQ==",
  },
  {
    categoryEs: "Cloud",
    categoryEn: "Cloud",
    title: "AWS Certified Cloud Practitioner",
    date: "Jul 2024 — Jul 2027",
    linkLabel: "Ver en Credly",
    href: "https://www.credly.com/badges/f62148b5-f49e-4ee3-8443-cfbbf8160728",
  },
  {
    categoryEs: "Automatización",
    categoryEn: "Automation",
    title: "UiPath Automation Developer Professional",
    date: "Oct 2024 — Oct 2026",
    linkLabel: "Ver credencial",
    href: "https://credentials.uipath.com/9f728270-5c0b-45cb-b781-d0477f8526d5",
  },
];

export const DAILY_STACK = [
  {
    label: "Next.js",
    noteEs: "App Router y SSR",
    noteEn: "App Router & SSR",
  },
  {
    label: "Tailwind",
    noteEs: "Estilos en todos los proyectos",
    noteEn: "Styling on every project",
  },
  {
    label: "Vite",
    noteEs: "Servidor de desarrollo y build",
    noteEn: "Dev server & build",
  },
  {
    label: "GitHub",
    noteEs: "Control de versiones, Actions CI",
    noteEn: "Version control, Actions CI",
  },
  {
    label: "n8n",
    noteEs: "Automatización de flujos",
    noteEn: "Workflow automation",
  },
  {
    label: "Supabase",
    noteEs: "Postgres, auth y storage",
    noteEn: "Postgres, auth & storage",
  },
  {
    label: "Vercel",
    noteEs: "Despliegue y previews",
    noteEn: "Deploys & previews",
  },
  {
    label: "Bash",
    noteEs: "Scripting y operaciones",
    noteEn: "Scripting & ops",
  },
  {
    label: "Odoo",
    noteEs: "ERP e integraciones",
    noteEn: "ERP & integrations",
  },
  {
    label: "Resend",
    noteEs: "Email transaccional",
    noteEn: "Transactional email",
  },
] as const;

export type HomelabLink =
  | { type: "link"; label: string; href: string }
  | { type: "text"; label: string };

export const HOMELAB_MORE_HREF: string | undefined = "https://homelab.guillermosh.com";

export const HOMELAB_ITEMS: HomelabLink[] = [
  { type: "link", label: "Dockge", href: "https://github.com/louislam/dockge" },
  { type: "text", label: "Docker / Compose" },
  { type: "link", label: "Pi-hole", href: "https://pi-hole.net/" },
  {
    type: "link",
    label: "Nginx Proxy Manager",
    href: "https://nginxproxymanager.com/",
  },
  {
    type: "link",
    label: "Uptime Kuma",
    href: "https://github.com/louislam/uptime-kuma",
  },
  { type: "link", label: "Beszel", href: "https://github.com/henrygd/beszel" },
  { type: "link", label: "n8n", href: "https://n8n.io/" },
  { type: "link", label: "Tailscale", href: "https://tailscale.com/" },
  {
    type: "link",
    label: "Vaultwarden",
    href: "https://github.com/dani-garcia/vaultwarden",
  },
  { type: "link", label: "MikroTik", href: "https://mikrotik.com/" },
];
