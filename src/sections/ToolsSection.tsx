import { Chip } from "../components/ui/Chip";
import { DailyToolCard } from "../components/DailyToolCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { DAILY_TOOLS, HOMELAB_CHIP_EXTRA, HOMELAB_ITEMS } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

export function ToolsSection({ locale }: { locale: Locale }) {
  const tools =
    locale === "en"
      ? DAILY_TOOLS.map((tool) => {
          if (tool.id === "github") {
            return {
              ...tool,
              description:
                "Repos, CI, reviews and collaboration: core hub for day-to-day coding.",
            };
          }
          if (tool.id === "notion") {
            return {
              ...tool,
              description:
                "Notes, boards and living docs: project context and task lists in one place.",
            };
          }
          if (tool.id === "n8n") {
            return {
              ...tool,
              description:
                "Low-code automation: chain APIs, webhooks and repetitive tasks without reinventing wheel.",
            };
          }
          return tool;
        })
      : DAILY_TOOLS;

  return (
    <section id="herramientas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow={tr(locale, "Flujo de trabajo", "Workflow")}
        title={tr(locale, "Herramientas y entorno", "Tools and environment")}
        description={
          locale === "en" ? (
            <>
              What I use daily for code, docs and automation — plus{" "}
              <strong className="font-semibold text-stone-800 dark:text-stone-200">
                homelab
              </strong>{" "}
              side, where I set up self-hosted services to learn infra and
              monitoring in real scenarios.
            </>
          ) : (
            <>
              Lo que uso cada día para código, documentación y automatización — y
              el lado{" "}
              <strong className="font-semibold text-stone-800 dark:text-stone-200">
                homelab
              </strong>
              , donde voy montando servicios autoalojados para aprender infra y
              monitorización en condiciones reales.
            </>
          )
        }
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <DailyToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <article className="homelab-panel mt-8">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl dark:bg-teal-500/10"
          aria-hidden
        />
        <div className="relative">
          <p className="eyebrow mb-1">Homelab</p>
          <h3 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-50">
            {tr(locale, "Autoalojado en marcha", "Self-hosted in progress")}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            {tr(
              locale,
              "Estoy metiéndome de lleno en el homelab: contenedores, proxy inverso, uptime y métricas en un entorno controlado — para romper cosas con intención y aprender cómo encajan los servicios detrás de una URL.",
              "I am going deep into homelab: containers, reverse proxy, uptime and metrics in a controlled environment — to break things intentionally and learn how services fit together behind a URL.",
            )}
          </p>

          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label={tr(locale, "Stack homelab", "Homelab stack")}
          >
            {HOMELAB_ITEMS.map((item) => (
              <li key={item.label}>
                {item.type === "link" ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`chip ${HOMELAB_CHIP_EXTRA}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Chip
                    as="span"
                    className={`${HOMELAB_CHIP_EXTRA} cursor-default`}
                  >
                    {item.label}
                  </Chip>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted dark:text-muted-dark">
            {tr(
              locale,
              "Enlaces a proyectos oficiales; en casa suelo tener mis propias instancias detrás del proxy.",
              "Links to official projects; at home I usually run my own instances behind proxy.",
            )}
          </p>
        </div>
      </article>
    </section>
  );
}
