import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/sections/SectionHead";
import type { ProductRelatedTopic } from "@/lib/cms/types";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

type Props = {
  topics: ProductRelatedTopic[];
};

export function ProductRelatedTopics({ topics }: Props) {
  if (!topics.length) return null;

  return (
    <section className="pd-section pd-section--soft" id="souvisejici">
      <div className="hd-shell">
        <SectionHead
          eyebrow="Navazující kroky"
          title="Co dál?"
          lead="Showroom, servis, další modely nebo nezávazná poptávka — vyberte další krok."
          align="left"
        />

        <div className="pd-card-grid pd-card-grid--4">
          {topics.map((topic) => (
            <Link key={topic.id} href={topic.href} className="pd-card group">
              {topic.image ? (
                <div className="pd-card__media">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    quality={IMG_QUALITY}
                    className={imgClass.photo}
                    sizes={imgSizes.relatedCard}
                  />
                </div>
              ) : (
                <div className="pd-card__media flex items-center justify-center text-2xl text-brand">
                  →
                </div>
              )}
              <div className="pd-card__body">
                <h3 className="pd-card__title">{topic.title}</h3>
                <p className="pd-card__text">{topic.description}</p>
                <span className="pd-card__link">Přejít →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
