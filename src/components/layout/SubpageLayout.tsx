import { type ReactNode } from "react";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageToolbar } from "@/components/layout/PageToolbar";

type CtaConfig = {
  title?: string;
  description?: string;
};

export function SubpageLayout({
  toolbar,
  cta,
  children,
}: {
  toolbar?: ReactNode;
  cta?: boolean | CtaConfig | ReactNode;
  children: ReactNode;
}) {
  let ctaNode: ReactNode = null;

  if (cta === true) {
    ctaNode = <CtaBand />;
  } else if (typeof cta === "object" && cta !== null && "title" in cta) {
    const config = cta as CtaConfig;
    ctaNode = <CtaBand title={config.title} description={config.description} />;
  } else if (cta) {
    ctaNode = cta as ReactNode;
  }

  return (
    <>
      {toolbar ? <PageToolbar>{toolbar}</PageToolbar> : null}
      <div className="subpage-flow">{children}</div>
      {ctaNode}
    </>
  );
}
