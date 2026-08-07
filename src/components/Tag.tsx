import { motion } from "framer-motion";
import { CheckIcon, ToolIcon, hasToolIcon } from "./ToolIcon";

type TagProps = {
  children: React.ReactNode;
  className?: string;
  /** When set, shows brand logo before the label if available. */
  iconLabel?: string;
};

export function Tag({ children, className = "", iconLabel }: TagProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.15 }}
      className={`tag inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted ${className}`}
    >
      {iconLabel ? (
        hasToolIcon(iconLabel) ? (
          <ToolIcon label={iconLabel} className="tag__icon" />
        ) : (
          <CheckIcon className="tag__icon" />
        )
      ) : null}
      {children}
    </motion.span>
  );
}
