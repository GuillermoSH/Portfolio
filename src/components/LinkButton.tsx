type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "accent" | "ghost";
};

export function LinkButton({
  href,
  children,
  external = true,
  variant = "accent",
}: LinkButtonProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold transition-colors";
  const styles =
    variant === "accent"
      ? "bg-accent text-accent-on hover:bg-accent-deep"
      : "border border-border text-ink hover:border-accent/40";

  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
      {external ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 17L17 7M17 7H9M17 7V15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </a>
  );
}
