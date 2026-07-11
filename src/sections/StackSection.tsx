import { STACK_GROUPS, NAV_LINKS, NAV_LINKS_EN } from "../data/site";
import { RevealSection } from "../components/RevealSection";
import { Tag } from "../components/Tag";
import type { Locale } from "../lib/i18n";

type StackSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#perfil",
  )!.label;
}

export function StackSection({ locale }: StackSectionProps) {
  const titleId = "stack-title";

  return (
    <RevealSection
      id="perfil"
      className="section-block border-t border-border"
      ariaLabelledBy={titleId}
    >
      <h2 id={titleId} className="section-title">
        {sectionTitle(locale)}
      </h2>

      <dl className="space-y-6">
        {STACK_GROUPS.map((group) => (
          <div key={group.id} className="grid gap-3 sm:grid-cols-[7rem_1fr] sm:items-start">
            <dt className="text-sm font-semibold text-muted">
              {locale === "en" ? group.labelEn : group.labelEs}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </RevealSection>
  );
}
