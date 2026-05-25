import Link from "next/link";
import { SectionHead } from "@/components/sections/SectionHead";
import { Button } from "@/components/ui/Button";
import type { ProductDownload } from "@/lib/cms/types";

type Props = {
  downloads: ProductDownload[];
  productName?: string;
  inquiryHref?: string;
};

export function ProductDownloads({ downloads, productName, inquiryHref }: Props) {
  const hasFiles = downloads.length > 0;

  return (
    <section className="pd-section" id="ke-stazeni">
      <div className="hd-shell">
        <SectionHead
          eyebrow="Dokumentace"
          title="Ke stažení"
          lead={
            hasFiles
              ? "Technické listy a dokumenty k produktu — stáhněte si je nebo nás kontaktujte s dotazem."
              : "Technické listy a certifikáty doplníme — mezitím vám je rádi zašleme na vyžádání."
          }
          align="left"
        />

        {hasFiles ? (
          <div className="pd-downloads">
            {downloads.map((doc) => (
              <Link key={doc.id} href={doc.url} className="pd-download group">
                <div className="pd-download__icon" aria-hidden>
                  {doc.format.slice(0, 3).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink group-hover:text-brand">{doc.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{doc.subtitle}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                    {doc.format}
                    {doc.sizeLabel ? ` · ${doc.sizeLabel}` : ""}
                  </p>
                </div>
                <span className="text-brand opacity-60 transition-opacity group-hover:opacity-100">
                  ↓
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="pd-download-empty">
            <p className="font-display text-lg font-semibold text-ink">
              Momentálně žádné soubory ke stažení
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {productName
                ? `Pro produkt ${productName} zatím nemáme veřejně dostupné PDF. Pošleme vám technický list nebo cenovou nabídku na míru.`
                : "Veřejně dostupné soubory doplníme. Technický list nebo nabídku vám rádi zašleme na vyžádání."}
            </p>
            {inquiryHref ? (
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={inquiryHref} className="hd-btn hd-btn--primary">
                  Požádat o dokumentaci
                </Button>
                <Button href="/showroom" variant="secondary" className="hd-btn">
                  Navštívit showroom
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
