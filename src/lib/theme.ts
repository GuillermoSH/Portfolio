export function toggleTheme(): void {
  const root = document.documentElement;
  const nextDark = !root.classList.contains("dark");
  root.classList.toggle("dark", nextDark);
  try {
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  } catch {
    /* ignore */
  }
}
