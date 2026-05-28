import { CallButton } from "@/components/call/CallButton";
import { SubpageContent } from "@/components/layout/SubpageContent";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { ShowroomMap } from "@/components/showroom/ShowroomMap";
import { TextBlocks } from "@/components/ui/TextBlocks";
import { loadSiteContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Showroom",
  description: "Showroom SunBlinds v Praze-Libuši — ukázky stínění, oken a vrat. Mapa a otevírací doba.",
  path: "/showroom",
});

export default async function ShowroomPage() {
  const { showroom } = await loadSiteContent();

  return (
    <SubpageLayout
      toolbar={
        <div className="page-toolbar-actions">
          <CallButton departmentId="showroom">Volat showroom</CallButton>
        </div>
      }
      cta={{
        title: "Domluvte si návštěvu showroomu",
        description: "Vyplňte poptávku nebo zavolejte — připravíme konzultaci podle vašeho zadání.",
      }}
    >
      <SubpageContent>
        <div className="page-content-grid page-content-grid--2">
          <div>
            <div className="surface-card p-6">
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
            <div className="mt-6 subpage-card-grid subpage-card-grid--2">
              {showroom.highlights.map((h) => (
                <article key={h.id} className="surface-card p-4">
                  <h3 className="font-semibold text-ink">{h.title}</h3>
                  <p className="mt-2 text-sm text-muted">{h.text}</p>
                </article>
              ))}
            </div>
            {showroom.textBlocks.length ? (
              <div className="mt-6">
                <TextBlocks blocks={showroom.textBlocks} />
              </div>
            ) : null}
          </div>
          <ShowroomMap showroom={showroom} />
        </div>
      </SubpageContent>
    </SubpageLayout>
  );
}
