import { buildPageMetadata } from "@/lib/seo";
import { PageToolbar } from "@/components/layout/PageToolbar";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  AboutIntro,
  AboutStats,
  AboutScope,
  AboutApproach,
  AboutVisit,
} from "@/components/about/AboutSections";
import { Button } from "@/components/ui/Button";
import { loadSiteContent } from "@/lib/content";

export const metadata = buildPageMetadata({
  title: "O nás",
  description:
    "SunBlinds — stínění, okna a servis na jednom místě. Showroom v Praze-Libuši, zaměření, montáž a následná péče.",
  path: "/o-nas",
});

export default async function AboutPage() {
  const { aboutPage, solutions } = await loadSiteContent();

  return (
    <div className="about-page">
      <PageToolbar>
        <div className="page-toolbar-actions">
          <Button href="/showroom">Navštívit showroom</Button>
          <Button href="/poptavka" variant="secondary">
            Online poptávka
          </Button>
        </div>
      </PageToolbar>

      <AboutIntro about={aboutPage} />
      <AboutStats stats={aboutPage.stats} />
      <AboutScope
        title={aboutPage.scopeTitle}
        lead={aboutPage.scopeLead}
        solutions={solutions}
      />
      <AboutApproach about={aboutPage} />
      <AboutVisit about={aboutPage} />

      <CtaBand
        title="Pojďme probrat váš projekt"
        description="Zavolejte, napište nebo vyplňte poptávku — v pracovní dny se ozveme do 24 hodin."
      />
    </div>
  );
}
