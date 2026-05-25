import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Akce pod bannerem — bez duplicitního nadpisu */
export function PageToolbar({ children }: { children: ReactNode }) {
  if (!children) return null;

  return (
    <div className="page-toolbar">
      <Container width="wide" className="page-toolbar-inner">
        {children}
      </Container>
    </div>
  );
}
