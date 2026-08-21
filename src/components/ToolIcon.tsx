import { TOOL_ICON_BY_LABEL } from "../data/toolIcons";

export function getToolIcon(label: string) {
  return TOOL_ICON_BY_LABEL[label.trim().toLowerCase()] ?? null;
}

type ToolIconProps = {
  label: string;
  className?: string;
};

export function ToolIcon({ label, className = "" }: ToolIconProps) {
  const icon = getToolIcon(label);
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={`tool-icon ${className}`.trim()}
      aria-hidden="true"
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

export function hasToolIcon(label: string) {
  return getToolIcon(label) !== null;
}

export function CoffeeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`tool-icon-check ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 8h11v7.2A3.8 3.8 0 0 1 12.2 19H8.8A3.8 3.8 0 0 1 5 15.2V8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10h1.4A2.6 2.6 0 0 1 20 12.6v0A2.6 2.6 0 0 1 17.4 15H16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.2c.35-.7.35-1.4 0-2.1M11 5.2c.35-.7.35-1.4 0-2.1M4 21h13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`tool-icon-check ${className}`.trim()}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
