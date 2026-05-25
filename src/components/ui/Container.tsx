import { type ReactNode } from "react";

const widthClass = {
  default: "",
  narrow: "site-container--narrow",
  wide: "",
  full: "",
  prose: "site-container--prose",
} as const;

export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: keyof typeof widthClass;
}) {
  return (
    <div className={`site-container ${widthClass[width]} ${className}`.trim()}>{children}</div>
  );
}
