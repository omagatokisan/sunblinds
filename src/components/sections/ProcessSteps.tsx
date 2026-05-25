import { loadSiteContent } from "@/lib/content";
import { SectionHead } from "@/components/sections/SectionHead";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";

export async function ProcessSteps({ sectionId }: { sectionId?: string }) {
  const { processSteps } = await loadSiteContent();

  return (
    <PageSection tone="inset" id={sectionId} className="hd-steps">
      <Container width="wide" className="hd-shell">
        <SectionHead
          eyebrow="Postup spolupráce"
          title="Od první konzultace po montáž"
          lead="Víte, co následuje — bez překvapení v termínech."
          align="center"
        />
        <ol className="hd-steps__grid">
          {processSteps.map((step) => (
            <li key={step.id}>
              <div className="hd-step">
                <span className="hd-step__num">{step.step}</span>
                <h3 className="hd-step__title">{step.title}</h3>
                <p className="hd-step__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </PageSection>
  );
}
