import { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  PRIMARY_SKILLS,
  STACK_GROUPS,
  NAV_LINKS,
  NAV_LINKS_EN,
  type PrimarySkill,
} from "../data/site";
import { RevealSection } from "../components/RevealSection";
import { Tag } from "../components/Tag";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import { stackExploreLabel, stackLead } from "../lib/present";

type StackSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#stack",
  )!.label;
}

type StackSkillCardProps = {
  skill: PrimarySkill;
  locale: Locale;
  index: number;
  reduced: boolean | null;
  isActive: boolean;
  isDimmed: boolean;
  onSelect: (id: string) => void;
};

function StackSkillCard({
  skill,
  locale,
  index,
  reduced,
  isActive,
  isDimmed,
  onSelect,
}: StackSkillCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: py * -7, y: px * 7 });
    },
    [reduced],
  );

  const handleLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.li
      className="stack-core__cell"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      animate={{
        opacity: isDimmed ? 0.42 : 1,
        scale: isActive ? 1.02 : 1,
      }}
    >
      <button
        ref={ref}
        type="button"
        className={`stack-core__item ${skill.featured ? "stack-core__item--featured" : ""} ${isActive ? "stack-core__item--active" : ""}`}
        style={
          reduced
            ? undefined
            : {
                transform: `perspective(720px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }
        }
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => onSelect(skill.id)}
        aria-pressed={isActive}
      >
        <span className="stack-core__glow" aria-hidden="true" />
        <span className="stack-core__name">{skill.name}</span>
        <span className="stack-core__note">
          {tr(locale, skill.noteEs, skill.noteEn)}
        </span>
      </button>
    </motion.li>
  );
}

export function StackSection({ locale }: StackSectionProps) {
  const reduced = useReducedMotion();
  const titleId = "stack-title";
  const [activeGroup, setActiveGroup] = useState(0);
  const [focusedSkill, setFocusedSkill] = useState<string | null>(null);

  const group = STACK_GROUPS[activeGroup];
  const groupLabel = locale === "en" ? group.labelEn : group.labelEs;

  const handleSkillSelect = useCallback((id: string) => {
    setFocusedSkill((current) => (current === id ? null : id));
  }, []);

  return (
    <RevealSection
      id="stack"
      className="section-block border-t border-border"
      ariaLabelledBy={titleId}
    >
      <h2 id={titleId} className="section-title">
        {sectionTitle(locale)}
      </h2>

      <p className="max-w-prose text-sm leading-relaxed text-muted sm:text-base">
        {stackLead(locale)}
      </p>

      <ul className="stack-core mt-8 sm:mt-10">
        {PRIMARY_SKILLS.map((skill, index) => (
          <StackSkillCard
            key={skill.id}
            skill={skill}
            locale={locale}
            index={index}
            reduced={reduced}
            isActive={focusedSkill === skill.id}
            isDimmed={focusedSkill !== null && focusedSkill !== skill.id}
            onSelect={handleSkillSelect}
          />
        ))}
      </ul>

      <div className="stack-explorer mt-12 sm:mt-14">
        <div className="stack-explorer__header">
          <h3 className="text-sm font-semibold text-ink">
            {stackExploreLabel(locale)}
          </h3>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            {tr(
              locale,
              "Pulsa una categoría para ver las tecnologías del área.",
              "Pick a category to browse technologies in that area.",
            )}
          </p>
        </div>

        <LayoutGroup id="stack-tabs">
          <div
            className="stack-tabs"
            role="tablist"
            aria-label={stackExploreLabel(locale)}
          >
            {STACK_GROUPS.map((item, index) => {
              const label = locale === "en" ? item.labelEn : item.labelEs;
              const selected = activeGroup === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`stack-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="stack-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`stack-tabs__btn ${selected ? "stack-tabs__btn--active" : ""}`}
                  onClick={() => setActiveGroup(index)}
                >
                  {selected ? (
                    <motion.span
                      layoutId="stack-tab-pill"
                      className="stack-tabs__pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  ) : null}
                  <span className="stack-tabs__label">{label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div
          id="stack-panel"
          role="tabpanel"
          aria-labelledby={`stack-tab-${group.id}`}
          className="stack-panel"
        >
          <span className="stack-panel__grid" aria-hidden="true" />
          <div className="stack-panel__inner">
            <p className="stack-panel__category">{groupLabel}</p>
            <AnimatePresence mode="wait">
              <motion.ul
                key={group.id}
                className="stack-panel__tags"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {group.items.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.32,
                      delay: reduced ? 0 : index * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Tag className="stack-panel__tag">{item}</Tag>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
