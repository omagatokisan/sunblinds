import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageSection } from "@/components/layout/PageSection";
import { PageToolbar } from "@/components/layout/PageToolbar";
import { CtaBand } from "@/components/sections/CtaBand";
import { CallButton } from "@/components/call/CallButton";
import { TechnicianCard } from "@/components/servis/TechnicianCard";
import { ServisCategoryCard } from "@/components/servis/ServisCategoryCard";
import { ServisPricingTable } from "@/components/servis/ServisPricingTable";
import { loadSiteContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export const metadata = buildPageMetadata({
  title: "Servis",
  description: "Záruční i pozáruční servis stínění, oken, pergol a garážových vrat.",
  path: "/servis",
});

export default async function ServicePage() {
  const { technicians, servisPage } = await loadSiteContent();

  return (
    <>
      <PageToolbar>
        <div className="page-toolbar-actions">
          <CallButton departmentId="servis">Volat servis</CallButton>
          <Button href="/poptavka" variant="secondary">
            Napsat požadavek
          </Button>
        </div>
      </PageToolbar>

      <PageSection tone="muted">
        <Container width="wide">
          <p className="label-caps label-caps--plain text-center">Servisujeme</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {servisPage.servicedTags.map((tag) => (
              <span key={tag} className="border border-line bg-surface px-3 py-1.5 text-sm text-ink">
                {tag}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted">
            {servisPage.intro}
          </p>
        </Container>
      </PageSection>

      <PageSection>
        <Container width="wide">
          <SectionHeading
            title="Odborný servis podle typu systému"
            description="Krátký přehled oblastí — detailní rozsah práce domluvíme po nahlášení závady."
            align="center"
          />
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
            {servisPage.categories.map((cat) => (
              <ServisCategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </Container>
      </PageSection>

      <PageSection tone="inset">
        <Container width="wide">
          <ServisPricingTable
            title={servisPage.pricingTitle}
            note={servisPage.pricingNote}
            rows={servisPage.pricingRows}
          />
        </Container>
      </PageSection>

      <PageSection>
        <Container width="wide">
          <SectionHeading
            title="Servisní technici"
            description="Seznamte se s lidmi, kteří u vás řeší servisní zásahy a plánování výjezdů."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {technicians.map((t) => (
              <TechnicianCard key={t.id} technician={t} />
            ))}
          </div>
        </Container>
      </PageSection>

      <CtaBand title="Objednejte si servisní zásah od profesionálů" />
    </>
  );
}
