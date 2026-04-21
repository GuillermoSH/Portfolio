import { SectionHeading } from "../components/ui/SectionHeading";
import { EXPERIENCE } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

export function Experience({ locale }: { locale: Locale }) {
  const headingDescription =
    locale === "en"
      ? "Summary aligned with my public LinkedIn profile: integration, data and service continuity."
      : "Resumen alineado con mi perfil público de LinkedIn: integración, datos y continuidad de servicio.";
  const jobs =
    locale === "en"
      ? EXPERIENCE.map((job) => {
          if (job.id === "eviden") {
            return {
              ...job,
              period: "Jul 2023 — Dec 2024",
              location: "Santa Cruz de Tenerife · Management platform for Orange",
              bullets: [
                "Development and integration of features in management platform, improving performance and aligning changes with business needs.",
                "SQL scripts to seed databases in non-production environments and integrate new products.",
                "Incident resolution: investigation, debugging and fixes to keep service continuity.",
              ],
              stackNote:
                "Stack: integration and design (corporate suite), Oracle SQL · Jira",
            };
          }
          if (job.id === "atos") {
            return {
              ...job,
              title: "Web developer — Atos (Internship)",
              bullets: [
                "Agile methodologies and version control with Git.",
                "Full-stack development with Spring Boot and Angular.",
              ],
            };
          }
          return job;
        })
      : EXPERIENCE;

  return (
    <section
      id="trayectoria"
      className="border-y border-stone-200/80 bg-surface/60 py-20 dark:border-zinc-800 dark:bg-zinc-950/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={tr(locale, "Experiencia", "Experience")}
          title={tr(locale, "Trayectoria profesional", "Professional path")}
          description={headingDescription}
        />

        <ol className="mt-12 space-y-10 border-l-2 border-teal-600/30 pl-6 dark:border-teal-500/25 md:pl-10">
          {jobs.map((job) => (
            <li key={job.id} className="relative">
              <span
                className="absolute -left-[29px] top-1 flex h-4 w-4 rounded-full border-2 border-teal-600 bg-canvas dark:border-accent-dark dark:bg-canvas-dark md:-left-[41px]"
                aria-hidden
              />
              <article className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50">
                    {job.title}
                  </h3>
                  <time
                    className="text-sm tabular-nums text-muted dark:text-muted-dark"
                    dateTime={job.datetime}
                  >
                    {job.period}
                  </time>
                </div>
                <p className="mt-1 text-sm text-muted dark:text-muted-dark">
                  {job.location}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {job.bullets.map((b, i) => (
                    <li key={`${job.id}-${i}`}>
                      {locale === "es" && job.id === "atos" && i === 1 ? (
                        <>
                          Desarrollo fullstack con{" "}
                          <strong className="font-semibold">Spring Boot</strong>{" "}
                          y{" "}
                          <strong className="font-semibold">Angular</strong>.
                        </>
                      ) : (
                        b
                      )}
                    </li>
                  ))}
                </ul>
                {job.stackNote ? (
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    {job.stackNote}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
