import type { DailyTool } from "../data/site";

const defaultIconWrap =
  "flex h-14 w-14 items-center justify-center rounded-2xl text-white";

export function DailyToolCard({ tool }: { tool: DailyTool }) {
  const wrap = tool.iconWrapperClass
    ? `${defaultIconWrap} ${tool.iconWrapperClass}`
    : defaultIconWrap;

  return (
    <article
      className={`group daily-tool-card ${tool.gridClass ?? ""}`.trim()}
    >
      <div className={wrap}>
        <i className={tool.iconClass} aria-hidden />
      </div>
      <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50">
        {tool.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted dark:text-muted-dark">
        {tool.description}
      </p>
      <a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-teal-800 transition group-hover:gap-3 dark:text-accent-dark"
      >
        {tool.linkLabel}
        <i
          className="fa-solid fa-arrow-up-right-from-square text-xs opacity-70"
          aria-hidden
        />
      </a>
    </article>
  );
}
