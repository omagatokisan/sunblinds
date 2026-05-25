import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { ReviewCard, ReviewForm } from "@/components/forms/ReviewForm";
import { loadSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Recenze",
  description: "Hodnocení zákazníků SunBlinds.",
};

export default async function ReviewsPage() {
  const { reviews, reviewsEnabled, gdprConsent } = await loadSiteContent();
  const approved = reviews.filter((r) => r.status === "approved");
  const avg =
    approved.length > 0
      ? (approved.reduce((s, r) => s + r.rating, 0) / approved.length).toFixed(1)
      : null;

  return (
    <>
      {reviewsEnabled && avg ? (
        <PageSection tone="muted" className="page-section--compact">
          <Container width="wide" className="flex justify-center">
            <div className="surface-card px-8 py-4 text-center">
              <p className="text-3xl font-semibold text-brand">{avg}</p>
              <p className="text-xs text-muted">{approved.length} hodnocení</p>
            </div>
          </Container>
        </PageSection>
      ) : null}

      {reviewsEnabled ? (
        <>
          <PageSection>
            <Container width="wide">
              {approved.length ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {approved.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted">Zatím žádné schválené recenze.</p>
              )}
            </Container>
          </PageSection>

          <PageSection tone="inset">
            <Container width="wide" className="max-w-xl">
              <h2 className="section-title">Napsat recenzi</h2>
              <p className="mt-2 text-sm text-muted">
                Vaše hodnocení zobrazíme po kontrole administrátorem.
              </p>
              <div className="mt-8 surface-card p-8">
                <ReviewForm gdprConsent={gdprConsent} />
              </div>
            </Container>
          </PageSection>
        </>
      ) : (
        <PageSection>
          <Container width="wide">
            <p className="text-center text-muted">Recenze jsou dočasně vypnuté. Děkujeme za pochopení.</p>
          </Container>
        </PageSection>
      )}

      <CtaBand />
    </>
  );
}
