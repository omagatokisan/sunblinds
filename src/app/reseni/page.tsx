import { CallButton } from "@/components/call/CallButton";
import { SubpageCatalogShell } from "@/components/layout/SubpageCatalogShell";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SolutionsCatalog } from "@/components/reseni/SolutionsCatalog";
import { getSolutions } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Řešení",
  description:
    "Přehled venkovního a interiérového stínění, oken, sítí, samonosných systémů a garážových vrat.",
  path: "/reseni",
});

export default async function SolutionsHubPage() {
  const solutions = await getSolutions();

  return (
    <SubpageLayout cta>
      <SubpageCatalogShell>
        <div className="solution-catalog-wrap">
          <SolutionsCatalog solutions={solutions} />
        </div>
      </SubpageCatalogShell>
    </SubpageLayout>
  );
}
