import { Chip } from "../components/ui/Chip";
import { SectionHeading } from "../components/ui/SectionHeading";
import { STACK_CHIPS } from "../data/site";
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
    </section>
  );
}
