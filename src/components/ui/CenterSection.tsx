import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function CenterSection({
  children,
  alt = false,
  tight = false,
  id,
  className = "",
}: {
  children: ReactNode;
  alt?: boolean;
  tight?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${alt ? "section-alt" : ""} ${tight ? "section-sm" : "section"} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
