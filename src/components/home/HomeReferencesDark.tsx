import Image from "next/image";
import type { ReferenceCase } from "@/lib/cms/types";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSectionHead } from "@/components/home/HomeSectionHead";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function HomeReferencesDark({ items }: { items: ReferenceCase[] }) {
  const featured = items.slice(0, 3);
  if (!featured.length) return null;

  return (
    <section className="hd-block hd-refs" aria-labelledby="hd-refs-title">
      <div className="hd-shell">
        <HomeSectionHead
          id="hd-refs-title"
          index="04"
          eyebrow="Reference"
          title="Reálné zakázky z naší praxe"
          lead="Konkrétní typ domu, rozsah a výsledek — ne obecné sliby, ale projekty, které jsme dodali."
          align="left"
        />

        <ul className="hd-refs__grid">
          {featured.map((item, index) => (
            <li key={item.id}>
              <HomeReveal className="hd-ref-card" delay={index * 100}>
                <div className="hd-ref-card__media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={index === 0}
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
              </HomeReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
