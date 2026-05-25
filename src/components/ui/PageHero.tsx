import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { VisualMosaic } from "@/components/ui/VisualMosaic";
import type { FeaturedVisual } from "@/lib/featured-images";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
  visuals,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
  visuals?: FeaturedVisual[];
}) {
  return (
    <section className="border-b border-line bg-surface section-sm">
      <Container className="text-center">
        {breadcrumb ? (
          <div className="flex justify-center">
            <Breadcrumb items={breadcrumb} />
          </div>
        ) : null}
        <div className={`${breadcrumb ? "mt-8" : ""} mx-auto max-w-3xl`}>
          {eyebrow ? <p className="label-caps">{eyebrow}</p> : null}
          <h1 className={`page-title ${eyebrow ? "mt-3" : ""}`}>{title}</h1>
          <div className="hero-line mx-auto mt-6 w-20" aria-hidden />
          {description ? <p className="section-lead mx-auto mt-6">{description}</p> : null}
          {children ? <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div> : null}
        </div>
        {visuals?.length ? (
          <div className="page-visual-stage">
            <VisualMosaic items={visuals} variant="editorial" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
