import { Chip } from "../components/ui/Chip";
import { SectionHeading } from "../components/ui/SectionHeading";
import { AWS_COURSES } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

export function Education({ locale }: { locale: Locale }) {
  const dawStack = [
    "Angular",
    "React",
    "Bootstrap",
    "PHP",
    "MySQL",
    "MariaDB",
    "Java",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
  ] as const;

  const damStack = [
    "Angular",
    "Spring",
    "PHP",
    "Java",
    "PostgreSQL",
    "React Native",
    "Flutter",
    "Expo",
    "Unity",
    "Odoo",
  ] as const;

  return (
    <section id="formacion" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow={tr(locale, "Estudios", "Education")}
        title={tr(
          locale,
          "Formación y especialización técnica",
          "Education and technical specialization",
        )}
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="card">
          <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
            {tr(
              locale,
              "CFGS — Desarrollo de aplicaciones multiplataforma",
              "Higher VET — Multiplatform application development",
            )}
          </h3>
          <p className="mt-1 text-sm text-teal-800 dark:text-accent-dark">
            IES Puerto de la Cruz · Telesforo Bravo
          </p>
          <p className="mt-2 text-sm text-muted dark:text-muted-dark">
            {tr(locale, "2025 — en curso", "2025 — in progress")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            {tr(
              locale,
              "Formación en curso para ampliar competencias multiplataforma y buenas prácticas de desarrollo.",
              "Current studies to expand multiplatform skills and development best practices.",
            )}
          </p>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {tr(locale, "Stack DAM", "DAM stack")}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {damStack.map((label) => (
                <li key={label}>
                  <Chip as="span" className="py-1.5 text-xs">
                    {label}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        </article>
        <article className="card">
          <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
            {tr(
              locale,
              "CFGS — Desarrollo de aplicaciones web",
              "Higher VET — Web application development",
            )}
          </h3>
          <p className="mt-1 text-sm text-teal-800 dark:text-accent-dark">
            IES Puerto de la Cruz · Telesforo Bravo
          </p>
          <p className="mt-2 text-sm text-muted dark:text-muted-dark">2021 — 2023</p>
          <p className="mt-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            {tr(
              locale,
              "Base sólida en Java, bases de datos, HTML/CSS/JS, Angular, PHP, metodologías ágiles y pruebas con JUnit — coherente con el itinerario que luego apliqué en prácticas y empresa.",
              "Solid foundation in Java, databases, HTML/CSS/JS, Angular, PHP, agile methodologies and JUnit testing — aligned with what I later applied in internships and company work.",
            )}
          </p>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {tr(locale, "Stack DAW", "DAW stack")}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {dawStack.map((label) => (
                <li key={label}>
                  <Chip as="span" className="py-1.5 text-xs">
                    {label}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <article className="card mt-8">
        <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50">
          {tr(
            locale,
            "Formación complementaria (AWS & cloud)",
            "Complementary training (AWS & cloud)",
          )}
        </h3>
        <p className="mt-2 text-sm text-muted dark:text-muted-dark">
          {tr(
            locale,
            "Bloque compacto de cursos base orientados a fundamentos cloud.",
            "Compact block of foundational courses focused on cloud fundamentals.",
          )}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm text-stone-700 dark:text-stone-300">
          {AWS_COURSES.map((label) => (
            <li key={label}>
              <Chip as="span" className="py-2">
                {label}
              </Chip>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
