import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";
import { loadSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Zásady zpracování osobních údajů",
};

export default async function PrivacyPage() {
  const { privacy } = await loadSiteContent();

  return (
    <PageSection>
      <Container width="wide" className="max-w-3xl">
        <p className="text-xs text-muted">{privacy.updatedLabel}</p>
        <div className="mt-10 space-y-8">
          {privacy.sections.map((section) => (
            <section key={section.id}>
              {section.title ? (
                <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
              ) : null}
              <p className={`text-sm leading-relaxed text-muted ${section.title ? "mt-3" : ""}`}>
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}
