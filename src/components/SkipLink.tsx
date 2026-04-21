import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

export function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a
      href="#main"
      className="absolute left-[-9999px] top-4 z-[100] rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white focus:left-4 dark:bg-accent-dark dark:text-canvas-dark"
    >
      {tr(locale, "Saltar al contenido", "Skip to content")}
    </a>
  );
}
