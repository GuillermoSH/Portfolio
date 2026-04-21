import { useCallback, useState } from "react";
import { NAV_LINKS, SITE } from "../data/site";
import { useScrollSpy } from "../hooks/useScrollSpy";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { toggleTheme } from "../lib/theme";

type SiteHeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function SiteHeader({ locale, onLocaleChange }: SiteHeaderProps) {
  const activeHref = useScrollSpy();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks =
    locale === "en"
      ? [
          { href: "#inicio", label: "Home" },
          { href: "#trayectoria", label: "Experience" },
          { href: "#formacion", label: "Education" },
          { href: "#certificaciones", label: "Certifications" },
          { href: "#stack", label: "Stack" },
          { href: "#proyectos", label: "Projects" },
          { href: "#herramientas", label: "Tools" },
        ]
      : NAV_LINKS;

  const closeMenuIfMobile = useCallback(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setMenuOpen(false);
    }
  }, []);

  return (
    <header className="site-header" id="site-header">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="group whitespace-nowrap font-display text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50"
        >
          <span>{SITE.name}</span>
        </a>

        <nav
          className="hidden flex-1 md:flex md:items-center md:justify-center"
          aria-label={tr(locale, "Principal", "Primary")}
        >
          <ul className="flex flex-nowrap items-center gap-1 lg:gap-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  className={`nav-link block whitespace-nowrap ${activeHref === href ? "nav-link-active" : ""}`.trim()}
                  href={href}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            className="flex h-10 min-w-12 items-center justify-center rounded-xl border border-stone-200 bg-white px-2 text-xs font-semibold text-stone-700 shadow-sm transition hover:border-teal-500/40 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-200 dark:hover:border-teal-500/40 dark:hover:text-accent-dark"
            aria-label={tr(locale, "Cambiar idioma", "Change language")}
            onClick={() => onLocaleChange(locale === "es" ? "en" : "es")}
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <button
            type="button"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:border-teal-500/40 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-200 dark:hover:border-teal-500/40 dark:hover:text-accent-dark"
            aria-label={tr(
              locale,
              "Cambiar tema claro u oscuro",
              "Toggle light and dark theme",
            )}
            onClick={toggleTheme}
          >
            <span
              className="absolute inset-0 flex items-center justify-center dark:hidden"
              aria-hidden
            >
              <i className="fa-solid fa-sun text-lg" />
            </span>
            <span
              className="absolute inset-0 hidden items-center justify-center dark:flex"
              aria-hidden
            >
              <i className="fa-solid fa-moon text-lg" />
            </span>
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-800 md:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-100"
            aria-expanded={menuOpen}
            aria-controls="header-nav-panel"
            aria-label={
              menuOpen
                ? tr(locale, "Cerrar menú", "Close menu")
                : tr(locale, "Abrir menú", "Open menu")
            }
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i
              className={`fa-solid text-lg ${menuOpen ? "fa-xmark" : "fa-bars"}`}
              aria-hidden
            />
          </button>
        </div>
      </div>

      <div
        id="header-nav-panel"
        className={`header-panel md:hidden ${menuOpen ? "mobile-open" : ""}`.trim()}
      >
        <nav
          className="mx-auto max-w-6xl border-t border-stone-200/80 px-4 pb-4 pt-2 dark:border-zinc-800 md:flex md:items-center md:justify-center md:border-t-0 md:pb-0 md:pt-0"
          aria-label={tr(locale, "Principal", "Primary")}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:flex-wrap md:justify-center md:gap-1 lg:gap-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  className={`nav-link block ${activeHref === href ? "nav-link-active" : ""}`.trim()}
                  href={href}
                  onClick={closeMenuIfMobile}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
