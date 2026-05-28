import { HomeHero } from "@/components/home/HomeHero";
import { HomeSolutions } from "@/components/home/HomeSolutions";
import { HomeFeatured } from "@/components/home/HomeFeatured";
import { HomeTrust } from "@/components/home/HomeTrust";
import { HomeReferencesDark } from "@/components/home/HomeReferencesDark";
import { HomeSplitSection } from "@/components/home/HomeSplitSection";
import { HomeSteps } from "@/components/home/HomeSteps";
import { HomeReviewsDark } from "@/components/home/HomeReviewsDark";
import { HomeFaqDark } from "@/components/home/HomeFaqDark";
import { HomeCtaDark } from "@/components/home/HomeCtaDark";
import { loadSiteContent } from "@/lib/content";
import { RELATED_TOPIC_IMAGES } from "@/data/site-visuals";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  path: "/",
  description:
    "Venkovní i interiérové stínění, okna, sítě proti hmyzu a garážová vrata. Showroom v Praze, zaměření, montáž a servis.",
});

const SERVIS_IMAGE = RELATED_TOPIC_IMAGES.servis;

export default async function HomePage() {
  const {
    solutions,
    pillars,
    home,
    reviews,
    faq,
    references,
    reviewsEnabled,
    processSteps,
  } = await loadSiteContent();

  return (
    <div className="home-dark">
      <HomeHero title={home.heroTitle} lead={home.heroLead} />

      <HomeSolutions
        title={home.solutionsTitle}
        description={home.solutionsDescription}
        solutions={solutions}
      />

      <HomeTrust title={home.whyTitle} pillars={pillars} />

      <HomeFeatured />

      <HomeReferencesDark items={references} />

      <HomeSteps steps={processSteps} />

      <HomeSplitSection
        eyebrow="Showroom"
        title="Porovnejte systémy naživo v Libuši"
        body="Vzorky látek, profily oken a ukázky venkovního stínění. Návštěvu domluvte předem — připravíme podklady podle vašeho projektu."
        href="/showroom"
        linkLabel="Informace o showroomu"
        image={RELATED_TOPIC_IMAGES.showroom}
        imageAlt="Showroom SunBlinds v Praze-Libuši"
        reverse
      />

      <HomeSplitSection
        eyebrow="Servis"
        title="Montáž i následná péče od jednoho týmu"
        body="Seřízení, výměna dílů a modernizace ovládání — u našich realizací i u cizí montáže po posouzení."
        href="/servis"
        linkLabel="Servisní služby"
        image={SERVIS_IMAGE}
        imageAlt="Servis a údržba stínící techniky SunBlinds"
        accent
      />

      {reviewsEnabled ? <HomeReviewsDark reviews={reviews} /> : null}

      <HomeFaqDark items={faq} />

      <HomeCtaDark responseTime={home.responseTime} />
    </div>
  );
}
