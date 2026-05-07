import { Chip } from "../components/ui/Chip";
import { SectionHeading } from "../components/ui/SectionHeading";
import { LEARNING_STACK_CHIPS, STACK_CHIPS } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

export function StackSection({ locale }: { locale: Locale }) {
  const stackChips =
    locale === "en"
      ? STACK_CHIPS.map((label) => {
          if (label === "Integración") return "Integration";
          if (label === "Bases de datos") return "Databases";
          return label;
        })
      : STACK_CHIPS;
  const learningStackChips =
    locale === "en"
      ? LEARNING_STACK_CHIPS.map((label) => {
          if (label === "Sistemas agénticos") return "Agentic systems";
          if (label === "Seguridad de aplicaciones")
            return "Application security";
          return label;
        })
      : LEARNING_STACK_CHIPS;

  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow={tr(locale, "Habilidades", "Skills")}
        title={tr(locale, "Stack y herramientas", "Stack and tools")}
        description={tr(
          locale,
          "Palabras clave de mi perfil: integración, datos, entrega y calidad.",
          "Core profile keywords: integration, data, delivery and quality.",
        )}
      />
      <div className="mt-8 flex flex-wrap gap-2">
        {stackChips.map((label) => (
          <Chip key={label}>{label}</Chip>
        ))}
      </div>
      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-accent-dark">
          {tr(locale, "Stack en aprendizaje", "Learning stack")}
        </p>
        <div className="flex flex-wrap gap-2">
          {learningStackChips.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
