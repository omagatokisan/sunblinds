import Link from "next/link";
import type { Solution } from "@/lib/cms/types";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";
import { HomeAreasBento } from "@/components/sections/HomeAreasBento";

export function HomeCategoryBand({
  title,
  description,
  solutions,
}: {
  title: string;
  description: string;
  solutions: Solution[];
}) {
  return (
    <PageSection tone="muted" className="home-category-band">
      <Container width="wide">
        <div className="page-section-head page-section-head--split">
          <div>
            <p className="label-caps label-caps--plain">Oblasti</p>
            <h2 className="section-title mt-3 max-w-lg">{title}</h2>
          </div>
          <p className="page-section-lead">{description}</p>
        </div>
      </Container>

      <div className="home-category-band-bento">
        <Container width="wide">
          <HomeAreasBento solutions={solutions} />
          <p className="mt-8 text-center sm:text-left">
            <Link href="/reseni" className="link-arrow">
              Kompletní katalog řešení
            </Link>
          </p>
        </Container>
      </div>
    </PageSection>
  );
}
