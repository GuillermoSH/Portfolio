export type StackGroup = "core" | "backend" | "frontend" | "data" | "ops";

export type StackNode = {
  id: string;
  label: string;
  group: StackGroup;
  note: string;
  weight: number;
  x?: number;
  y?: number;
};

export type StackEdge = {
  from: string;
  to: string;
};

export const STACK_NODES: StackNode[] = [
  {
    id: "nextjs",
    label: "Next.js",
    group: "core",
    note: "Webs, portales y SSR en producción.",
    weight: 5,
    x: 50,
    y: 42,
  },
  {
    id: "n8n",
    label: "n8n",
    group: "core",
    note: "Automatización e integraciones críticas de negocio.",
    weight: 5,
    x: 38,
    y: 55,
  },
  {
    id: "typescript",
    label: "TypeScript",
    group: "core",
    note: "Frontend, scripts y tooling compartido.",
    weight: 4,
    x: 62,
    y: 55,
  },
  {
    id: "spring",
    label: "Spring Boot",
    group: "backend",
    note: "APIs y lógica de negocio en Java.",
    weight: 4,
    x: 28,
    y: 35,
  },
  {
    id: "java",
    label: "Java",
    group: "backend",
    note: "Servicios backend y módulos ERP.",
    weight: 3,
    x: 22,
    y: 50,
  },
  {
    id: "odoo",
    label: "Odoo",
    group: "backend",
    note: "ERP, Python y procesos a medida.",
    weight: 4,
    x: 35,
    y: 68,
  },
  {
    id: "react",
    label: "React",
    group: "frontend",
    note: "Interfaces y producto web.",
    weight: 4,
    x: 72,
    y: 35,
  },
  {
    id: "angular",
    label: "Angular",
    group: "frontend",
    note: "Apps modulares en entornos enterprise.",
    weight: 3,
    x: 78,
    y: 50,
  },
  {
    id: "flutter",
    label: "Flutter",
    group: "frontend",
    note: "Prototipos móviles y UI cross-platform.",
    weight: 2,
    x: 65,
    y: 68,
  },
  {
    id: "oracle",
    label: "Oracle SQL",
    group: "data",
    note: "Carga de productos e integración de datos.",
    weight: 3,
    x: 50,
    y: 22,
  },
  {
    id: "supabase",
    label: "Supabase",
    group: "data",
    note: "Auth, Postgres y APIs para portales.",
    weight: 3,
    x: 42,
    y: 30,
  },
  {
    id: "redis",
    label: "Redis",
    group: "data",
    note: "Colas y workers en automatización.",
    weight: 2,
    x: 58,
    y: 30,
  },
  {
    id: "aws",
    label: "AWS",
    group: "ops",
    note: "Cloud Practitioner y despliegues.",
    weight: 3,
    x: 18,
    y: 28,
  },
  {
    id: "docker",
    label: "Docker",
    group: "ops",
    note: "Compose, homelab y servicios locales.",
    weight: 3,
    x: 82,
    y: 28,
  },
  {
    id: "vercel",
    label: "Vercel",
    group: "ops",
    note: "Deploy de webs y previews.",
    weight: 2,
    x: 88,
    y: 42,
  },
  {
    id: "git",
    label: "Git",
    group: "ops",
    note: "Control de versiones y CI.",
    weight: 3,
    x: 12,
    y: 42,
  },
  {
    id: "tibco",
    label: "TIBCO",
    group: "backend",
    note: "Ecosistema de integración en producción.",
    weight: 2,
    x: 25,
    y: 62,
  },
  {
    id: "uipath",
    label: "UiPath",
    group: "ops",
    note: "RPA y automatización certificada.",
    weight: 2,
    x: 75,
    y: 62,
  },
];

export const STACK_EDGES: StackEdge[] = [
  { from: "nextjs", to: "react" },
  { from: "nextjs", to: "typescript" },
  { from: "nextjs", to: "vercel" },
  { from: "nextjs", to: "supabase" },
  { from: "n8n", to: "odoo" },
  { from: "n8n", to: "redis" },
  { from: "n8n", to: "typescript" },
  { from: "spring", to: "java" },
  { from: "spring", to: "oracle" },
  { from: "react", to: "typescript" },
  { from: "angular", to: "typescript" },
  { from: "odoo", to: "supabase" },
  { from: "aws", to: "docker" },
  { from: "docker", to: "vercel" },
  { from: "git", to: "spring" },
  { from: "git", to: "nextjs" },
  { from: "oracle", to: "tibco" },
  { from: "flutter", to: "react" },
];

export const STACK_EDGES_CLEAN: StackEdge[] = STACK_EDGES;

export const GROUP_LABELS: Record<StackGroup, string> = {
  core: "Core",
  backend: "Backend",
  frontend: "Frontend",
  data: "Datos",
  ops: "Ops",
};

export const ORBIT_RINGS: Record<Exclude<StackGroup, "core">, string[]> = {
  backend: ["spring", "java", "odoo", "tibco"],
  frontend: ["react", "angular", "flutter", "nextjs"],
  data: ["oracle", "supabase", "redis"],
  ops: ["aws", "docker", "vercel", "git", "uipath"],
};

export const PIPELINE_STEPS = [
  {
    id: "source",
    label: "Source",
    hint: "Código y datos de origen",
    tools: ["Git", "TypeScript", "Java", "Oracle SQL"],
  },
  {
    id: "build",
    label: "Build",
    hint: "APIs, lógica y UI",
    tools: ["Spring Boot", "React", "Next.js", "Odoo"],
  },
  {
    id: "deploy",
    label: "Deploy",
    hint: "Salida a producción",
    tools: ["Vercel", "Docker", "AWS", "Supabase"],
  },
  {
    id: "ops",
    label: "Ops",
    hint: "Automatización y monitorización",
    tools: ["n8n", "Redis", "UiPath", "TIBCO"],
  },
] as const;

export const LAYER_STACK = [
  {
    id: "presentation",
    label: "Presentación",
    tools: ["React", "Angular", "Next.js", "Flutter"],
    links: ["api"],
  },
  {
    id: "api",
    label: "API & lógica",
    tools: ["Spring Boot", "TypeScript", "Odoo"],
    links: ["data", "ops"],
  },
  {
    id: "data",
    label: "Datos",
    tools: ["Oracle SQL", "Supabase", "Redis"],
    links: ["ops"],
  },
  {
    id: "ops",
    label: "Infra & automatización",
    tools: ["AWS", "Docker", "n8n", "Vercel"],
    links: ["presentation"],
  },
] as const;

export function getNode(id: string): StackNode | undefined {
  return STACK_NODES.find((n) => n.id === id);
}

export function getNeighbors(id: string): string[] {
  const neighbors = new Set<string>();
  for (const edge of STACK_EDGES_CLEAN) {
    if (edge.from === id) neighbors.add(edge.to);
    if (edge.to === id) neighbors.add(edge.from);
  }
  return [...neighbors];
}

export function nodesByGroup(group: StackGroup): StackNode[] {
  return STACK_NODES.filter((n) => n.group === group);
}
