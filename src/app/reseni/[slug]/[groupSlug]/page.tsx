import { notFound } from "next/navigation";
import { SubpageCatalogShell } from "@/components/layout/SubpageCatalogShell";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { UniformProductCatalog } from "@/components/reseni/UniformProductCatalog";
import { getProductGroup, getSolutions } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string; groupSlug: string }> };

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.flatMap((s) => s.productGroups.map((g) => ({ slug: s.slug, groupSlug: g.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug, groupSlug } = await params;
  const data = await getProductGroup(slug, groupSlug);
  if (!data) return {};
  return buildPageMetadata({
    title: `${data.group.name} | ${data.solution.title}`,
    description: data.group.summary,
    path: `/reseni/${slug}/${groupSlug}`,
    image: data.group.image,
  });
}

export default async function ProductGroupPage({ params }: Props) {
  const { slug, groupSlug } = await params;
  const data = await getProductGroup(slug, groupSlug);
  if (!data) notFound();

  const { solution, group } = data;

  return (
    <SubpageLayout cta={{ title: `Potřebujete poradit s výběrem — ${group.name}?` }}>
      <SubpageCatalogShell>
        <div className="solution-catalog-wrap">
          <UniformProductCatalog
            solution={solution}
            group={group}
            layout="category"
            nameFormat="category"
          />
        </div>
      </SubpageCatalogShell>
    </SubpageLayout>
  );
}
