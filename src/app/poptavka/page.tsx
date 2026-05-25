import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { loadSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nezávazná poptávka",
  description: "Online poptávka s výběrem produktu, rozměry v mm a poznámkou.",
};

export default async function InquiryPage() {
  const { solutions, inquiryOptions, gdprConsent, departments } = await loadSiteContent();
  const obchod = departments.find((d) => d.id === "obchod");

  return (
    <PageSection>
      <Container width="wide">
        {obchod ? (
          <p className="mb-8 text-sm text-muted">
            Dotazy k poptávce:{" "}
            <a href={`tel:${obchod.phone.replace(/\s/g, "")}`} className="text-brand hover:underline">
              {obchod.phone}
            </a>
            {" · "}
            {obchod.hours}
          </p>
        ) : null}
        <InquiryForm solutions={solutions} inquiryOptions={inquiryOptions} gdprConsent={gdprConsent} />
      </Container>
    </PageSection>
  );
}
