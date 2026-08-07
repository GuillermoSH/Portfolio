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
