import { type ReactNode } from "react";

import { PageSection } from "@/components/layout/PageSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type HeadingProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
};

export function SubpageContent({
  children,
  tone = "default",
  className = "",
  containerClassName = "",
  narrow,
  heading,
  id,
}: {
  children: ReactNode;
  tone?: "default" | "muted" | "inset" | "dark";
  className?: string;
  containerClassName?: string;
  narrow?: boolean;
  heading?: HeadingProps;
  id?: string;
}) {
  return (
    <PageSection id={id} tone={tone} className={["subpage-section", className].filter(Boolean).join(" ")}>
      <div className="subpage-section__decor" aria-hidden>
        <span className="subpage-section__mesh" />
        <span className="subpage-section__glow" />
      </div>
      <Container
        width="wide"
        className={[
          "hd-shell",
          "subpage-content",
          narrow ? "subpage-content--narrow" : "",
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {heading?.title ? (
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
            align={heading.align ?? "left"}
          />
        ) : null}
        {children}
      </Container>
    </PageSection>
  );
}
