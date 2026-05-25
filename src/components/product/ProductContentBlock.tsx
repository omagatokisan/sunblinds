import { SectionHead } from "@/components/sections/SectionHead";
import { TextBlocks } from "@/components/ui/TextBlocks";
import { buildProductNarrative } from "@/lib/product-content";
import type { Product } from "@/lib/cms/types";

type Props = {
  product: Product;
};

export function ProductContentBlock({ product }: Props) {
  const { description, features, textBlocks } = buildProductNarrative(product);
  const showFeatures = features.length > 0 && product.specs.length === 0;

  return (
    <section className="pd-section pd-section--soft" id="popis">
      <div className="hd-shell">
        <SectionHead
          eyebrow="O produktu"
          title="Popis a využití"
          align="left"
        />

        <div className="pd-content">
          <div>
            <p className="pd-content__prose">{description}</p>

            {showFeatures ? (
              <div className="pd-content__features">
                <p className="hd-eyebrow">
                  <span className="hd-eyebrow__mark" aria-hidden />
                  Hlavní přednosti
                </p>
                <ul>
                  {features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <TextBlocks blocks={textBlocks} variant="inline" />
          </div>

          {product.specs.length ? (
            <aside className="pd-specs" aria-label="Technické parametry">
              <p className="hd-eyebrow">
                <span className="hd-eyebrow__mark" aria-hidden />
                Parametry
              </p>
              <dl className="mt-4">
                {product.specs.map((s) => (
                  <div key={s.label} className="pd-specs__row">
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
