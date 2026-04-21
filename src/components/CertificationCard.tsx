import type { CertItem } from "../data/site";

export function CertificationCard({ item }: { item: CertItem }) {
  return (
    <article className="card flex flex-col">
      <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-accent-dark">
        {item.category}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
      <p className="mt-1 text-sm text-muted dark:text-muted-dark">{item.date}</p>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto pt-4 text-sm font-medium text-teal-800 hover:underline dark:text-accent-dark"
      >
        {item.linkLabel}
      </a>
    </article>
  );
}
