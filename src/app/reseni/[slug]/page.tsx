import { notFound } from "next/navigation";
import { SubpageCatalogShell } from "@/components/layout/SubpageCatalogShell";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SolutionCatalogPanel } from "@/components/reseni/SolutionCatalogPanel";
import { TextBlocks } from "@/components/ui/TextBlocks";
import { getSolution, getSolutions } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) return {};
  return buildPageMetadata({
    title: solution.title,
    description: solution.summary,
    path: `/reseni/${slug}`,
    image: solution.heroImage,
  });
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) notFound();

  const hasHighlights = solution.benefits.length > 0 || solution.idealFor.length > 0;

  return (
    <SubpageLayout cta={{ title: `Chcete poradit s ${solution.title.toLowerCase()}?` }}>
      <SubpageCatalogShell>
        <div className="solution-catalog-wrap">
          <SolutionCatalogPanel solution={solution} />
        </div>

        {hasHighlights ? (
          <div className="solution-highlights">
            {solution.benefits.length ? (
              <div className="solution-highlights__block">
                <h3 className="solution-highlights__title">Proč toto řešení</h3>
                <ul className="solution-highlights__list">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {solution.idealFor.length ? (
              <div className="solution-highlights__block">
                <h3 className="solution-highlights__title">Vhodné pro</h3>
                <ul className="solution-highlights__tags">
                  {solution.idealFor.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        {solution.textBlocks.length ? (
          <div className="solution-catalog-notes">
            <TextBlocks blocks={solution.textBlocks} />
          </div>
        ) : null}
      </SubpageCatalogShell>
    </SubpageLayout>
  );
}
