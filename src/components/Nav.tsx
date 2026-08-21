import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { NAV_LINKS, NAV_LINKS_EN } from "../data/site";
import { useScrollSpy } from "../hooks/useScrollSpy";

type NavProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

const NAV_CIRCLE_BUTTON = "nav-icon-btn fixed top-4 z-50 sm:top-5";

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

export function Nav({ locale, onLocaleChange }: NavProps) {
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
    <>
      <button
        type="button"
        onClick={() => onLocaleChange(locale === "es" ? "en" : "es")}
        className={`${NAV_CIRCLE_BUTTON} lang-toggle ${locale === "es" ? "lang-toggle--es" : "lang-toggle--en"} right-4 sm:right-5`}
        aria-label={`${locale === "es" ? "Es" : "En"} — ${tr(locale, "Cambiar a inglés", "Switch to Spanish")}`}
      >
        <span className="lang-toggle__label">{locale === "es" ? "Es" : "En"}</span>
      </button>

      <button
        type="button"
        className={`${NAV_CIRCLE_BUTTON} left-4 text-ink md:hidden sm:left-5`}
        aria-label={tr(locale, "Abrir menú", "Open menu")}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={menuOpen ? closeMenu : openMenu}
      >
        <BurgerIcon open={menuOpen} />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        className="mobile-nav-dialog md:hidden"
        aria-label={tr(locale, "Menú de navegación", "Navigation menu")}
      >
        <nav aria-label={tr(locale, "Secciones", "Sections")}>
          <ul className="flex flex-col gap-1 p-4 pt-20">
            {links.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
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
        </nav>
      </dialog>
    </>
  );
}
