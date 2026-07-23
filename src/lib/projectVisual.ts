const PROJECT_HUES: Record<string, number> = {
  syntia: 198,
  "cvorotava-team-manager": 265,
  netpulse: 38,
  "cvorotava-back": 210,
};

export function projectVisualHue(id: string): number {
  return PROJECT_HUES[id] ?? 265;
}

export function projectMonogram(name: string): string {
  const parts = name.replace(/[-_.]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
