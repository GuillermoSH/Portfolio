import type { ReactNode } from "react";

type StackVariantFrameProps = {
  id: string;
  badge: string;
  title: string;
  hint: string;
  children: ReactNode;
};

export function StackVariantFrame({
  id,
  badge,
  title,
  hint,
  children,
}: StackVariantFrameProps) {
  return (
    <section
      id={id}
      className="stack-lab-variant section-block border-t border-border"
      aria-labelledby={`${id}-title`}
    >
      <div className="stack-lab-variant__header">
        <span className="stack-lab-variant__badge">{badge}</span>
        <h2 id={`${id}-title`} className="stack-lab-variant__title">
          {title}
        </h2>
        <p className="stack-lab-variant__hint">{hint}</p>
      </div>
      <div className="stack-lab-variant__body">{children}</div>
    </section>
  );
}
