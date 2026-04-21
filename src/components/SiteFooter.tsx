import { SITE } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

const SOCIAL_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 transition hover:border-teal-500/40 hover:text-teal-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-200 dark:hover:text-accent-dark";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/90 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
            {SITE.fullName}
          </p>
          <p className="mt-1 text-sm text-muted dark:text-muted-dark">
            {tr(
              locale,
              "Puerto de la Cruz, Canarias · Desarrollador full-stack",
              "Puerto de la Cruz, Canary Islands · Full-stack developer",
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={SITE.twitter}
            className={SOCIAL_CLASS}
            aria-label="X (Twitter)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-x-twitter" aria-hidden />
          </a>
          <a
            href={SITE.github}
            className={SOCIAL_CLASS}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github" aria-hidden />
          </a>
          <a
            href={SITE.linkedin}
            className={SOCIAL_CLASS}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin-in" aria-hidden />
          </a>
        </div>
      </div>
      <div className="border-t border-stone-200/80 bg-stone-200/50 py-4 text-center dark:border-zinc-800 dark:bg-zinc-900/80">
        <p className="text-xs font-medium text-stone-600 dark:text-stone-400">
          © {new Date().getFullYear()} GuillermoSH ·{" "}
          {tr(
            locale,
            "Hecho con React, Tailwind y café.",
            "Built with React, Tailwind and coffee.",
          )}
        </p>
      </div>
    </footer>
  );
}
