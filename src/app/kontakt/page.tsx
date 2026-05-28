import { CallButton } from "@/components/call/CallButton";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { SubpageContent } from "@/components/layout/SubpageContent";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { company } from "@/data/company";
import { loadSiteContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Kontakt",
  description: "Kontaktujte SunBlinds — telefon, e-mail, showroom Praha-Libuš a online formulář.",
  path: "/kontakt",
});

export default async function ContactPage() {
  const { contact, gdprConsent } = await loadSiteContent();

  return (
    <SubpageLayout
      toolbar={
        <div className="page-toolbar-actions">
          <CallButton departmentId="obchod">Volat obchod</CallButton>
          <Button href="/poptavka" variant="secondary">
            Poptávka
          </Button>
        </div>
      }
    >
      <SubpageContent>
        <div className="page-content-grid page-content-grid--contact">
          <aside className="surface-card p-6 sm:p-8">
            <p className="label-caps label-caps--plain">Showroom</p>
            <p className="mt-3 font-semibold text-ink">{company.address.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {company.address.street}
              <br />
              {company.address.zip} {company.address.city}
            </p>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="link-arrow mt-4 inline-block"
            >
              Zobrazit na mapě
            </a>
            <p className="label-caps label-caps--plain mt-6">Kontakt</p>
            <a href={company.phoneHref} className="mt-2 block text-lg font-semibold text-brand">
              {company.phone}
            </a>
            <a href={company.emailHref} className="mt-2 block text-sm font-medium text-ink hover:text-brand">
              {company.email}
            </a>
            <p className="mt-4 text-sm text-muted">{company.hours}</p>
          </aside>

          <div className="surface-card p-6 sm:p-8">
            <h2 className="section-title">{contact.formTitle}</h2>
            <p className="mt-2 text-sm text-muted">{contact.formLead}</p>
            <div className="mt-8">
              <ContactForm gdprConsent={gdprConsent} />
            </div>
          </div>
        </div>
      </SubpageContent>
    </SubpageLayout>
  );
}
