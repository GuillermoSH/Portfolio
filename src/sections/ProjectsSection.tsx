import { SectionHeading } from "../components/ui/SectionHeading";
import { FEATURED_PROJECTS, SITE } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

export function ProjectsSection({ locale }: { locale: Locale }) {
  const projects =
    locale === "en"
      ? FEATURED_PROJECTS.map((project) => {
          if (project.id === "cvorotava-team-manager") {
            return {
              ...project,
              description:
                "Web app for centralized management of club sports information.",
              tech: ["TypeScript", "Web application", "Sports management"],
            };
          }
          if (project.id === "tic-tac-toe") {
            return {
              ...project,
              description:
                "Modern tic-tac-toe with animations, detailed stats and customizable themes.",
              tech: ["TypeScript", "UI animations", "Game UX"],
            };
          }
          if (project.id === "cvorotava-back") {
            return {
              ...project,
              description:
                "Java backend for internal volleyball club dashboard focused on task management.",
              tech: ["Java", "API", "Backend"],
            };
          }
          if (project.id === "netpulse") {
            return {
              ...project,
              description:
                "Volleyball scoreboard with modern design, focused on match dynamics and point streak tracking.",
              tech: ["TypeScript", "Sports UX", "Volleyball"],
            };
          }
          return project;
        })
      : FEATURED_PROJECTS;

  return (
    <section
      id="proyectos"
      className="border-y border-stone-200/80 bg-surface/70 py-20 dark:border-zinc-800 dark:bg-zinc-950/50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GitHub"
          title={tr(locale, "Proyectos destacados", "Featured projects")}
          description={tr(
            locale,
            "Selección tomada de repositorios públicos destacados en GitHub.",
            "Selection based on featured public repositories on GitHub.",
          )}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="card flex flex-col gap-4">
              <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50">
                {project.name}
              </h3>
              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {project.description}
              </p>
              <ul
                className="flex flex-wrap gap-2"
                aria-label={tr(
                  locale,
                  `Stack de ${project.name}`,
                  `${project.name} stack`,
                )}
              >
                {project.tech.map((tag) => (
                  <li
                    key={`${project.id}-${tag}`}
                    className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-teal-800 transition hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-200"
              >
                {tr(locale, "Ver repositorio", "View repository")}
                <i
                  className="fa-solid fa-arrow-up-right-from-square text-xs"
                  aria-hidden
                />
              </a>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-teal-600/30 bg-teal-50/50 p-6 dark:border-teal-500/30 dark:bg-teal-950/20 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm text-stone-700 dark:text-stone-300">
            {tr(
              locale,
              "Perfil con más actividad, logros y repositorios:",
              "Profile with more activity, achievements and repositories:",
            )}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {" "}
              {SITE.github.replace("https://github.com/", "@")}
            </span>
            .
          </p>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-stone-100 dark:text-canvas-dark"
          >
            {tr(locale, "Ver perfil GitHub", "View GitHub profile")}
            <i
              className="fa-solid fa-arrow-up-right-from-square text-xs"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}
