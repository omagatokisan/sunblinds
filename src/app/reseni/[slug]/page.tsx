import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageSection } from "@/components/layout/PageSection";
import { PageToolbar } from "@/components/layout/PageToolbar";
import { CtaBand } from "@/components/sections/CtaBand";
import { SolutionCategoryCatalog } from "@/components/reseni/SolutionCategoryCatalog";
import { CallButton } from "@/components/call/CallButton";
import { TextBlocks } from "@/components/ui/TextBlocks";
import { Button } from "@/components/ui/Button";
import { getSolution, getSolutions } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) return {};
  return { title: solution.title, description: solution.summary };
}

function callDepartmentForSlug(slug: string) {
  if (slug === "interierove-stineni") return "interier";
  if (slug === "venkovni-stineni" || slug === "samonosne-systemy") return "venkovni";
  return "obchod";
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) notFound();

  return (
    <>
      <PageToolbar>
        <div className="page-toolbar-actions">
          <Button href="/poptavka">Nezávazně poptat</Button>
          <CallButton departmentId={callDepartmentForSlug(slug)} variant="secondary">
            Volat oddělení
          </CallButton>
        </div>
      </PageToolbar>

      <PageSection>
        <Container width="wide" className="reseni-page">
          <SectionHeading
            title="Produkty podle kategorie"
            description="Všechny modely v přehledných řadách — podkategorie jsou seřazené pod sebou, bez posuvníku."
            align="center"
          />
          <div className="mt-10 w-full">
            <SolutionCategoryCatalog solution={solution} />
          </div>
          {solution.textBlocks.length ? (
            <div className="mt-12">
              <TextBlocks blocks={solution.textBlocks} />
            </div>
          ) : null}
        </Container>
      </PageSection>

      <PageSection tone="inset">
        <Container width="wide" className="reseni-page">
          <div className="page-content-grid page-content-grid--2 w-full max-w-4xl">
            <div className="text-center">
              <h2 className="section-title">Proč toto řešení</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {solution.benefits.map((b) => (
                  <li key={b} className="flex justify-center gap-2 text-sm text-muted sm:justify-start">
                    <span className="text-brand">—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="text-center sm:text-left">
              <h3 className="label-caps label-caps--plain">Vhodné pro</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {solution.idealFor.map((tag) => (
                  <li key={tag} className="border border-line bg-surface px-3 py-1 text-xs font-medium text-ink">
                    {tag}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </PageSection>

      <CtaBand title={`Chcete poradit s ${solution.title.toLowerCase()}?`} />
    </>
  );
}
