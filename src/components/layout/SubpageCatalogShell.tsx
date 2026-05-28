import { type ReactNode } from "react";

import { PageSection } from "@/components/layout/PageSection";
import { Container } from "@/components/ui/Container";

/** Jednotný obal katalogových stránek /reseni/* */
export function SubpageCatalogShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <PageSection className="page-section--flush subpage-section subpage-section--catalog">
      <div className={["subpage-catalog", className].filter(Boolean).join(" ")}>
        <div className="subpage-catalog__decor" aria-hidden>
          <span className="subpage-catalog__mesh" />
          <span className="subpage-catalog__grid" />
          <span className="subpage-catalog__glow" />
        </div>
        <Container width="wide" className="hd-shell subpage-catalog__inner">
          {children}
        </Container>
      </div>
    </PageSection>
  );
}
