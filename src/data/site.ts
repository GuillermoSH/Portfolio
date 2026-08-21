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
    preview: "/img/tenaasesores.webp",
    previewAltEs: "Captura de la web tenaasesores.es",
    previewAltEn: "Screenshot of the tenaasesores.es website",
    goalsEs: [
      "Sustituir la web del builder de Odoo —básica y sin mantenimiento— por una con diseño moderno, nuevos colores de marca y logo actualizado.",
      "Mejorar el rendimiento y el SEO de la web corporativa.",
    ],
    goalsEn: [
      "Replace the basic, unmaintained Odoo website builder site with a modern design, updated brand colors and logo.",
      "Improve performance and SEO of the corporate website.",
    ],
    challengesEs: [
      "Montar el sitemap y redirigir muchas rutas antiguas a las secciones de la web nueva.",
      "Limpiar enlaces residuales de partes nunca implementadas (shop, blog) que seguían apareciendo en búsquedas.",
    ],
    challengesEn: [
      "Build the sitemap and redirect many old routes to sections on the new site.",
      "Clean up leftover links to never-shipped areas (shop, blog) that still showed up in search results.",
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
    preview: "/img/syntia.webp",
    previewAltEs: "Captura de la web app.syntia.es",
    previewAltEn: "Screenshot of the app.syntia.es website",
    goalsEs: [
      "Dar a los clientes un portal propio para consultar toda la información de la asesoría sin un email por cada consulta.",
      "Integrar las herramientas de la asesoría para llevar todos los datos relevantes al cliente en un solo sitio.",
    ],
    goalsEn: [
      "Give clients their own portal to check all advisory information without sending an email for every request.",
      "Integrate the firm's tools so all relevant data reaches the client in one place.",
    ],
    challengesEs: [
      "La API de Odoo es muy limitada y con un rate-limit bajo: hay que ser muy baratos en peticiones para evitar 429.",
      "Un único worker sirve varias instancias de la app en la misma máquina; cache en Next y otras tácticas para recortar llamadas.",
      "Supabase cubre lo que la cache no alcanza y comparte estado de cache entre dispositivos.",
    ],
    challengesEn: [
      "Odoo's API is very limited with a low rate limit: requests have to stay cheap to avoid 429s.",
      "A single worker serves multiple app instances on the same machine; Next.js caching and related tactics cut extra calls.",
      "Supabase fills gaps the cache can't cover and shares cache state across devices.",
    ],
  },
  {
    id: "sovereign-stack",
    name: "Sovereign Stack",
    descriptionEs:
      "Sitio del homelab: guía, historial y blog de lo que voy montando en casa en administración de sistemas.",
    descriptionEn:
      "Homelab site: guide, changelog and blog of what I run at home for systems tinkering.",
    tech: ["Docker", "Dockge", "Pi-hole", "n8n", "Tailscale"],
    href: "https://homelab.guillermosh.com",
    linkType: "site",
    preview: "/img/sovereign-stack.webp",
    previewAltEs: "Captura de Sovereign Stack, el sitio del homelab",
    previewAltEn: "Screenshot of Sovereign Stack, the homelab site",
    goalsEs: [
      "Dejar una guía, historial y blog de lo que voy haciendo en casa en administración de sistemas, más orientado a trastear por si a alguien le resulta útil.",
    ],
    goalsEn: [
      "Keep a guide, changelog and blog of home systems tinkering — practical notes in case they're useful to someone else.",
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
    preview: "/img/cvorotava-team-manager.webp",
    previewAltEs: "Captura de CVOrotava Team Manager",
    previewAltEn: "Screenshot of CVOrotava Team Manager",
    goalsEs: [
      "Centralizar la gestión deportiva de los equipos de categorías altas del club.",
      "Avisos de pagos (registro del club y avisos a jugadores, sin pasarela de pago), vídeos de entrenamientos/partidos y resultados, calendario y el resto de operativa del día a día.",
    ],
    goalsEn: [
      "Centralize sports management for the club's higher-category teams.",
      "Payment notices (club records and player alerts, no payment gateway), training/match videos and results, calendar, and day-to-day ops.",
    ],
  },
  {
    id: "cvorotava-back",
    name: "CVOrotava-back",
    descriptionEs:
      "API Java para centralizar la gestión de datos del club: pagos, jugadores, licencias y equipaciones.",
    descriptionEn:
      "Java API to centralize club data management: payments, players, licenses and kits.",
    tech: ["Java", "API"],
    href: "https://github.com/GuillermoSH/CVOrotava-back",
    goalsEs: [
      "Crear una API para las gestiones de las bases de datos del club completo: pagos, jugadores/licencias, equipaciones, etc.",
    ],
    goalsEn: [
      "Build an API for the club's full database workflows: payments, players/licenses, kits, and related ops.",
    ],
    challengesEs: [
      "No pude dedicarle el tiempo que necesitaba y acabé abandonándolo; en no mucho empezará el reemplazo para la temporada 26/27.",
    ],
    challengesEn: [
      "I couldn't give it the time it needed and eventually shelved it; a replacement for the 26/27 season is starting soon.",
    ],
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
