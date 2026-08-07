import { writeFileSync } from "node:fs";
import {
  siAngular,
  siCursor,
  siDocker,
  siExpo,
  siGit,
  siGithub,
  siGithubactions,
  siGnubash,
  siN8n,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOdoo,
  siOpenjdk,
  siPnpm,
  siPostgresql,
  siMysql,
  siReact,
  siResend,
  siSpringboot,
  siSupabase,
  siTailwindcss,
  siUbuntu,
  siUptimekuma,
  siVercel,
  siVisualstudiocode,
  siVite,
} from "simple-icons";

/**
 * Regenerates src/data/toolIcons.ts from Simple Icons.
 * Requires: pnpm add -D simple-icons
 */

function pack(icon) {
  return { title: icon.title, path: icon.path };
}

const unique = {
  git: pack(siGit),
  cursor: pack(siCursor),
  bash: pack(siGnubash),
  java: pack(siOpenjdk),
  springBoot: pack(siSpringboot),
  node: pack(siNodedotjs),
  next: pack(siNextdotjs),
  angular: pack(siAngular),
  react: pack(siReact),
  expo: pack(siExpo),
  tailwind: pack(siTailwindcss),
  postgresql: pack(siPostgresql),
  mysql: pack(siMysql),
  githubActions: pack(siGithubactions),
  vercel: pack(siVercel),
  supabase: pack(siSupabase),
  pnpm: pack(siPnpm),
  ubuntu: pack(siUbuntu),
  n8n: pack(siN8n),
  github: pack(siGithub),
  vite: pack(siVite),
  docker: pack(siDocker),
  nginx: pack(siNginx),
  uptimeKuma: pack(siUptimekuma),
  odoo: pack(siOdoo),
  resend: pack(siResend),
  vscode: pack(siVisualstudiocode),
};

const aliases = {
  git: "git",
  cursor: "cursor",
  vscode: "vscode",
  "visual studio code": "vscode",
  bash: "bash",
  java: "java",
  "spring boot": "springBoot",
  "node.js": "node",
  node: "node",
  "next.js": "next",
  nextjs: "next",
  angular: "angular",
  react: "react",
  "react native": "react",
  expo: "expo",
  tailwind: "tailwind",
  "tailwind css": "tailwind",
  postgresql: "postgresql",
  postgres: "postgresql",
  mysql: "mysql",
  "github actions": "githubActions",
  vercel: "vercel",
  supabase: "supabase",
  pnpm: "pnpm",
  ubuntu: "ubuntu",
  "ubuntu server": "ubuntu",
  n8n: "n8n",
  github: "github",
  vite: "vite",
  docker: "docker",
  "docker / compose": "docker",
  nginx: "nginx",
  "nginx proxy manager": "nginx",
  "uptime kuma": "uptimeKuma",
  odoo: "odoo",
  resend: "resend",
};

const uniqueBlock = Object.entries(unique)
  .map(([key, icon]) => `  ${key}: ${JSON.stringify(icon)},`)
  .join("\n");

const aliasBlock = Object.entries(aliases)
  .map(([label, ref]) => `  ${JSON.stringify(label)}: unique.${ref},`)
  .join("\n");

const out = `/** Curated brand marks for stack/tool chips. Paths from Simple Icons (CC0). */
export type ToolIconDef = { title: string; path: string };

const unique = {
${uniqueBlock}
} as const satisfies Record<string, ToolIconDef>;

export const TOOL_ICON_BY_LABEL: Record<string, ToolIconDef> = {
${aliasBlock}
};
`;

writeFileSync(new URL("../src/data/toolIcons.ts", import.meta.url), out);
console.log("unique", Object.keys(unique).length, "aliases", Object.keys(aliases).length);
