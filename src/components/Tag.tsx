import { motion } from "framer-motion";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className = "" }: TagProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.15 }}
      className={`inline-block rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted ${className}`}
    >
      {children}
    </motion.span>
  );
}
