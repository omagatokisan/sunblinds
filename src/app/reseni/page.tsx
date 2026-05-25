import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { SolutionsCatalog } from "@/components/reseni/SolutionsCatalog";
import { getSolutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Řešení",
  description:
    "Přehled venkovního a interiérového stínění, oken, sítí, samonosných systémů a garážových vrat.",
};

export default async function SolutionsHubPage() {
  const solutions = await getSolutions();

  return (
    <>
      <PageSection>
        <Container width="wide" className="reseni-page">
          <SolutionsCatalog solutions={solutions} />
        </Container>
      </PageSection>

      <CtaBand />
    </>
  );
}
