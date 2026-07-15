import { motion, useReducedMotion } from "framer-motion";
import {
  PRIMARY_SKILLS,
  STACK_GROUPS,
  NAV_LINKS,
  NAV_LINKS_EN,
} from "../data/site";
import { RevealSection } from "../components/RevealSection";
import { Tag } from "../components/Tag";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { profileAlsoLabel, profileLead } from "../lib/present";

type StackSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#perfil",
  )!.label;
}

export function StackSection({ locale }: StackSectionProps) {
  const reduced = useReducedMotion();
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

      <p className="max-w-prose text-sm leading-relaxed text-muted sm:text-base">
        {profileLead(locale)}
      </p>

      <ul className="profile-bento mt-8 sm:mt-10">
        {PRIMARY_SKILLS.map((skill, index) => (
          <motion.li
            key={skill.id}
            className={`profile-skill ${skill.featured ? "profile-skill--featured" : ""}`}
            initial={reduced ? false : { opacity: 0.7, y: 10 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{
              duration: 0.45,
              delay: reduced ? 0 : index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="profile-skill__name">{skill.name}</span>
            <span className="profile-skill__note">
              {tr(locale, skill.noteEs, skill.noteEn)}
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-12 border-t border-border pt-10 sm:mt-14 sm:pt-12">
        <h3 className="text-sm font-semibold text-ink">
          {profileAlsoLabel(locale)}
        </h3>
        <dl className="mt-5 space-y-5">
          {STACK_GROUPS.map((group) => (
            <div
              key={group.id}
              className="grid gap-2 sm:grid-cols-[6.5rem_1fr] sm:items-start sm:gap-4"
            >
              <dt className="text-xs font-medium text-muted sm:text-sm">
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
      </div>
    </RevealSection>
  );
}
