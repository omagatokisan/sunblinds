import { type ReactNode } from "react";

const toneClass = {
  default: "page-section",
  muted: "page-section page-section--muted",
  inset: "page-section page-section--inset",
  dark: "page-section page-section--dark",
} as const;

export function PageSection({
  children,
  tone = "default",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: keyof typeof toneClass;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${toneClass[tone]} ${className}`.trim()}>
      {children}
    </section>
  );
}
