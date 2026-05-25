import Image from "next/image";
import type { ReferenceCase } from "@/lib/cms/types";
import { SectionHead } from "@/components/sections/SectionHead";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function HomeReferences({ items }: { items: ReferenceCase[] }) {
  const featured = items.slice(0, 3);
  if (!featured.length) return null;

  return (
    <PageSection tone="inset" className="hd-refs">
      <Container width="wide" className="hd-shell">
        <SectionHead
          eyebrow="Reference"
          title="Ukázky zakázek z posledních let"
          lead="Konkrétní typ domu, rozsah a co jsme řešili — reálné projekty z naší praxe."
          align="left"
        />

        <ul className="hd-refs__grid">
          {featured.map((item) => (
            <li key={item.id}>
              <article className="hd-ref-card">
                <div className="hd-ref-card__media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    quality={IMG_QUALITY}
                    className={imgClass.photo}
                    sizes={imgSizes.catalogThird}
                  />
                </div>
                <div className="hd-ref-card__body">
                  <p className="hd-ref-card__meta">
                    {item.location} · {item.scope}
                  </p>
                  <h3 className="hd-ref-card__title">{item.title}</h3>
                  <p className="hd-ref-card__text">{item.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </PageSection>
  );
}
