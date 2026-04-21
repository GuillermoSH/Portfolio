import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type ChipProps<T extends ElementType = "span"> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Chip<T extends ElementType = "span">({
  as,
  className = "",
  children,
  ...rest
}: ChipProps<T>) {
  const Component = as ?? "span";
  return (
    <Component className={`chip ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}
