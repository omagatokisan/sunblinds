import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageSection } from "@/components/layout/PageSection";
import { PageToolbar } from "@/components/layout/PageToolbar";
import { CtaBand } from "@/components/sections/CtaBand";
import { GroupProductMosaic } from "@/components/reseni/GroupProductMosaic";
import { Button } from "@/components/ui/Button";
import { getProductGroup, getSolutions } from "@/lib/content";

type Props = { params: Promise<{ slug: string; groupSlug: string }> };

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.flatMap((s) => s.productGroups.map((g) => ({ slug: s.slug, groupSlug: g.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, groupSlug } = await params;
  const data = await getProductGroup(slug, groupSlug);
  if (!data) return {};
  return { title: `${data.group.name} | ${data.solution.title}`, description: data.group.summary };
}

export default async function ProductGroupPage({ params }: Props) {
  const { slug, groupSlug } = await params;
  const data = await getProductGroup(slug, groupSlug);
  if (!data) notFound();

  const { solution, group } = data;

  return (
    <>
      <PageToolbar>
        <div className="page-toolbar-actions">
          <Button href="/poptavka">Poptat tuto kategorii</Button>
        </div>
      </PageToolbar>

      <PageSection>
        <Container width="wide" className="reseni-page">
          <SectionHeading
            title={group.name}
            description={group.summary}
            align="center"
          />
          <div className="mt-10 w-full">
            <GroupProductMosaic solution={solution} group={group} />
          </div>
        </Container>
      </PageSection>

      <CtaBand title={`Potřebujete poradit s výběrem — ${group.name}?`} />
    </>
  );
}
