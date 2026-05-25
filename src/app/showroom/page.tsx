import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageSection } from "@/components/layout/PageSection";
import { PageToolbar } from "@/components/layout/PageToolbar";
import { CallButton } from "@/components/call/CallButton";
import { CtaBand } from "@/components/sections/CtaBand";
import { ShowroomMap } from "@/components/showroom/ShowroomMap";
import { TextBlocks } from "@/components/ui/TextBlocks";
import { loadSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Showroom",
};

export default async function ShowroomPage() {
  const { showroom } = await loadSiteContent();

  return (
    <>
      <PageToolbar>
        <div className="page-toolbar-actions">
          <CallButton departmentId="showroom">Volat showroom</CallButton>
        </div>
      </PageToolbar>

      <PageSection>
        <Container width="wide">
          <div className="page-content-grid page-content-grid--2">
            <div>
              <SectionHeading title="Adresa a provoz" />
              <div className="mt-6 surface-card p-6">
                <p className="font-medium text-ink">{showroom.addressLine1}</p>
                <p className="mt-1 text-muted">{showroom.addressLine2}</p>
                <p className="mt-4 text-sm text-muted">{showroom.hours}</p>
                <p className="mt-4 text-sm">
                  <a href={`tel:${showroom.phone.replace(/\s/g, "")}`} className="text-brand hover:underline">
                    {showroom.phone}
                  </a>
                  {" · "}
                  <a href={`mailto:${showroom.email}`} className="text-brand hover:underline">
                    {showroom.email}
                  </a>
                </p>
              </div>
              <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                {showroom.highlights.map((h) => (
                  <article key={h.id} className="bg-canvas p-4">
                    <h3 className="font-semibold text-ink">{h.title}</h3>
                    <p className="mt-2 text-sm text-muted">{h.text}</p>
                  </article>
                ))}
              </div>
              {showroom.textBlocks.length ? (
                <div className="mt-8">
                  <TextBlocks blocks={showroom.textBlocks} />
                </div>
              ) : null}
            </div>
            <ShowroomMap showroom={showroom} />
          </div>
        </Container>
      </PageSection>

      <CtaBand
        title="Domluvte si návštěvu showroomu"
        description="Vyplňte poptávku nebo zavolejte — připravíme konzultaci podle vašeho zadání."
      />
    </>
  );
}
