import { buildPageMetadata } from "@/lib/seo";
import { SubpageContent } from "@/components/layout/SubpageContent";
import { loadSiteContent } from "@/lib/content";

export const metadata = buildPageMetadata({
  title: "Zásady zpracování osobních údajů",
  description: "Informace o zpracování osobních údajů společností SunBlinds dle GDPR.",
  path: "/ochrana-osobnich-udaju",
});

export default async function PrivacyPage() {
  const { privacy } = await loadSiteContent();

  return (
    <SubpageContent narrow>
      <p className="text-xs text-muted">{privacy.updatedLabel}</p>
      <div className="mt-10 space-y-8">
        {privacy.sections.map((section) => (
          <section key={section.id}>
            {section.title ? <h2 className="text-xl font-semibold text-ink">{section.title}</h2> : null}
            <p className={`text-sm leading-relaxed text-muted ${section.title ? "mt-3" : ""}`}>
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </SubpageContent>
  );
}
