import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURED_PROJECTS, NAV_LINKS, NAV_LINKS_EN } from "../data/site";
import type { ProjectItem } from "../data/site";
import { ProjectThumb } from "../components/ProjectThumb";
import { ProjectModal } from "../components/ProjectModal";
import { Tag } from "../components/Tag";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";
import {
  projectDetailsLabel,
  projectHostLabel,
  projectLinkLabel,
  projectLiveLabel,
  projectStatusDev,
} from "../lib/present";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const PROJECT_COUNT = FEATURED_PROJECTS.length;

type WorkSectionProps = {
  locale: Locale;
};

function sectionTitle(locale: Locale) {
  return (locale === "en" ? NAV_LINKS_EN : NAV_LINKS).find(
    (l) => l.href === "#proyectos",
  )!.label;
}

function readCssPx(el: HTMLElement, name: string, fallback: number) {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function WorkSection({ locale }: WorkSectionProps) {
  const reduced = useReducedMotion();
  const titleId = "work-title";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [detailProject, setDetailProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const stage = stageRef.current;
    if (!scroller || !stage || reduced) return;

    const ctx = gsap.context(() => {
      const header = readCssPx(scroller, "--work-header", 56);
      const panel = Math.max(
        stage.offsetHeight,
        window.innerHeight - header,
        320,
      );
      const travel = Math.max(panel * 0.85, 260) * (PROJECT_COUNT - 1);

      ScrollTrigger.create({
        trigger: scroller,
        start: `top top+=${header}`,
        end: `+=${travel}`,
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        snap: {
          snapTo: (value) => {
            const step = 1 / Math.max(PROJECT_COUNT - 1, 1);
            return gsap.utils.clamp(0, 1, Math.round(value / step) * step);
          },
          duration: { min: 0.18, max: 0.42 },
          ease: "power2.out",
        },
        onUpdate: (self) => {
          const next = Math.round(self.progress * (PROJECT_COUNT - 1));
          if (next !== activeIndexRef.current) {
            activeIndexRef.current = next;
            setActiveIndex(next);
          }
        },
      });
    }, scroller);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [reduced]);

  const project = FEATURED_PROJECTS[activeIndex];
  const linkType = project.linkType ?? (project.href ? "repo" : "none");
  const linkLabel = projectLinkLabel(locale, linkType);
  const inDevelopment = linkType === "none";
  const isLiveSite = linkType === "site" && Boolean(project.href);
  const host = projectHostLabel(project.href);
  const description = tr(locale, project.descriptionEs, project.descriptionEn);
  const tech = locale === "en" ? (project.techEn ?? project.tech) : project.tech;
  const hasDetails = Boolean(
    project.goalsEs?.length || project.challengesEs?.length,
  );

  return (
    <section
      id="proyectos"
      className="work-reel-section"
      aria-labelledby={titleId}
    >
      <div
        ref={scrollerRef}
        className="work-reel-scroll"
        style={{ ["--work-steps" as string]: PROJECT_COUNT }}
      >
        <div ref={stageRef} className="work-reel-scroll__stage">

          <div className="work-reel-scroll__frame">
            <h2 id={titleId} className="work-reel__title">
              {sectionTitle(locale)}
            </h2>

            {PROJECT_COUNT > 1 ? (
              <div className="work-reel__progress" aria-hidden="true">
                <span className="work-reel__progress-counter">
                  {String(activeIndex + 1).padStart(2, "0")}
                  <span className="work-reel__progress-sep">/</span>
                  {String(PROJECT_COUNT).padStart(2, "0")}
                </span>
                <span className="work-reel__progress-track">
                  <span
                    className="work-reel__progress-fill"
                    style={{
                      width: `${(activeIndex / Math.max(PROJECT_COUNT - 1, 1)) * 100}%`,
                    }}
                  />
                </span>
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              <motion.article
                key={project.id}
                className="work-reel__scene"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <div className="work-reel__visual">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`project-entry__visual-link ${isLiveSite ? "project-entry__visual-link--live" : ""}`}
                      aria-label={`${linkLabel}: ${project.name}`}
                    >
                      <ProjectThumb
                        project={project}
                        locale={locale}
                        featured
                        liveChrome={isLiveSite}
                        className="project-thumb--reel"
                      />
                    </a>
                  ) : (
                    <div className="project-entry__visual-link project-entry__visual-link--static">
                      <ProjectThumb
                        project={project}
                        locale={locale}
                        featured
                        className="project-thumb--reel"
                      />
                    </div>
                  )}
                </div>

                <div className="work-reel__text">
                  {isLiveSite ? (
                    <p className="project-entry__live">
                      <span
                        className="project-entry__live-dot"
                        aria-hidden="true"
                      />
                      {projectLiveLabel(locale)}
                      {host ? (
                        <>
                          <span
                            className="project-entry__live-sep"
                            aria-hidden="true"
                          >
                            ·
                          </span>
                          <span className="project-entry__live-host">
                            {host}
                          </span>
                        </>
                      ) : null}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="project-entry__title project-entry__title--live">
                      {project.name}
                    </h3>
                    {inDevelopment ? (
                      <span className="text-xs font-medium text-secondary">
                        {projectStatusDev(locale)}
                      </span>
                    ) : null}
                  </div>

                  <p className="project-entry__desc">{description}</p>

                  <ul className="project-entry__tech">
                    {tech.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    {linkLabel && project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          isLiveSite
                            ? "project-entry__cta project-entry__cta--live mt-0"
                            : "project-entry__cta mt-0"
                        }
                      >
                        {linkLabel}
                        <span aria-hidden="true">→</span>
                      </a>
                    ) : null}
                    {hasDetails ? (
                      <button
                        type="button"
                        className="project-entry__cta mt-0"
                        onClick={() => setDetailProject(project)}
                      >
                        {projectDetailsLabel(locale)}
                        <span aria-hidden="true">→</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProjectModal
        project={detailProject}
        locale={locale}
        onClose={() => setDetailProject(null)}
      />
    </section>
  );
}
