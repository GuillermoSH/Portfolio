import { Chip } from "../components/ui/Chip";
import { HERO_CHIPS, SITE } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section
      id="inicio"
      className="relative min-h-[min(100vh,920px)] bg-mesh-light dark:bg-mesh-dark"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[length:48px_48px] opacity-70 dark:bg-grid-faint-dark" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="eyebrow">{tr(locale, "Portafolio", "Portfolio")}</p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 dark:text-stone-50 md:text-5xl lg:text-[3.25rem]">
            {tr(
              locale,
              "Desarrollo full-stack con enfoque en ",
              "Full-stack development focused on ",
            )}
            <span className="text-teal-700 dark:text-accent-dark">
              {tr(locale, "integración", "integration")}
            </span>{" "}
            {tr(locale, "y producto.", "and product delivery.")}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted dark:text-muted-dark">
            {locale === "en" ? (
              <>
                I am{" "}
                <strong className="font-semibold text-stone-900 dark:text-stone-100">
                  {SITE.fullName}
                </strong>
                , full-stack software developer based in{" "}
                <span>{SITE.location}</span>.
                Experience in corporate environments with{" "}
                <strong className="font-semibold text-stone-800 dark:text-stone-200">
                  Angular
                </strong>
                ,{" "}
                <strong className="font-semibold text-stone-800 dark:text-stone-200">
                  React
                </strong>
                ,{" "}
                <strong className="font-semibold text-stone-800 dark:text-stone-200">
                  Spring Boot
                </strong>
                , Oracle SQL and full delivery cycle: from scripts and seeded data
                to production incidents.
              </>
            ) : (
              <>
                Soy{" "}
                <strong className="font-semibold text-stone-900 dark:text-stone-100">
                  {SITE.fullName}
                </strong>
                , desarrollador de software full-stack en{" "}
                <span>{SITE.location}</span>.
                Experiencia en entornos corporativos con{" "}
                <strong className="font-semibold text-stone-800 dark:text-stone-200">
                  Angular
                </strong>
                ,{" "}
                <strong className="font-semibold text-stone-800 dark:text-stone-200">
                  React
                </strong>
                ,{" "}
                <strong className="font-semibold text-stone-800 dark:text-stone-200">
                  Spring Boot
                </strong>
                , Oracle SQL y ciclo completo de entrega: desde scripts y datos
                hasta incidencias en producción.
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {HERO_CHIPS.map((label) => (
              <Chip key={label}>{label}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/15 transition hover:bg-teal-800 dark:bg-accent-dark dark:text-canvas-dark dark:hover:bg-teal-300"
            >
              <i className="fa-brands fa-linkedin-in" aria-hidden />
              LinkedIn
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-teal-500/50 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:hover:border-teal-500/40"
            >
              <i className="fa-brands fa-github" aria-hidden />
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <a
          href="#trayectoria"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-700 shadow-md backdrop-blur animate-bounce dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-stone-200"
          aria-label={tr(
            locale,
            "Ir a trayectoria profesional",
            "Go to professional experience",
          )}
        >
          <i className="fa-solid fa-arrow-down" aria-hidden />
        </a>
      </div>
    </section>
  );
}
