import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { NAV_LINKS, NAV_LINKS_EN } from "../data/site";
import { useScrollSpy } from "../hooks/useScrollSpy";
import type { Theme } from "../hooks/useTheme";

type NavProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: Theme;
  onThemeToggle: () => void;
};

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "dark") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 0 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type NavLink = { readonly href: string; readonly label: string };

type NavLinksProps = {
  links: readonly NavLink[];
  activeHref: string;
  variant: "bar" | "menu";
  onNavigate?: () => void;
};

function NavLinks({ links, activeHref, variant, onNavigate }: NavLinksProps) {
  const reduced = useReducedMotion();

  if (variant === "menu") {
    return (
      <ul className="flex flex-col gap-1 p-4">
        {links.map((link) => {
          const isActive = activeHref === link.href;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={onNavigate}
                className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-ink hover:bg-surface"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex items-center gap-0.5">
      {links.map((link) => {
        const isActive = activeHref === link.href;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              className={`relative rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                isActive ? "text-accent" : "text-muted hover:text-ink"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
              {isActive && !reduced ? (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-[17px] h-0.5 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : isActive ? (
                <span className="absolute inset-x-2 -bottom-[17px] h-0.5 rounded-full bg-accent" />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Nav({ locale, onLocaleChange, theme, onThemeToggle }: NavProps) {
  const activeHref = useScrollSpy();
  const links = locale === "en" ? NAV_LINKS_EN : NAV_LINKS;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
    setMenuOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen, closeMenu]);

  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        <a
          href="#inicio"
          className="shrink-0 text-sm font-semibold tracking-tight text-ink"
          onClick={closeMenu}
        >
          GS
        </a>

        <nav
          aria-label={tr(locale, "Secciones", "Sections")}
          className="hidden md:block"
        >
          <NavLinks links={links} activeHref={activeHref} variant="bar" />
        </nav>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => onLocaleChange(locale === "es" ? "en" : "es")}
            className="rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:text-ink"
            aria-label={tr(locale, "Cambiar idioma", "Switch language")}
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <button
            type="button"
            onClick={onThemeToggle}
            className="rounded-md p-2 text-muted transition-colors hover:text-ink"
            aria-label={tr(
              locale,
              theme === "dark" ? "Modo claro" : "Modo oscuro",
              theme === "dark" ? "Light mode" : "Dark mode",
            )}
            aria-pressed={theme === "dark"}
          >
            <ThemeIcon theme={theme} />
          </button>
          <button
            type="button"
            className="rounded-md p-2 text-ink md:hidden"
            aria-label={tr(locale, "Abrir menú", "Open menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={menuOpen ? closeMenu : openMenu}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        className="mobile-nav-dialog md:hidden"
        aria-label={tr(locale, "Menú de navegación", "Navigation menu")}
      >
        <nav aria-label={tr(locale, "Secciones", "Sections")}>
          <NavLinks
            links={links}
            activeHref={activeHref}
            variant="menu"
            onNavigate={closeMenu}
          />
        </nav>
      </dialog>
    </header>
  );
}
