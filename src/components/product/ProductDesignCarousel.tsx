import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/sections/SectionHead";
import type { ProductDesignOption } from "@/lib/cms/types";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";
import { isValidProductImage } from "@/lib/product-images";

type Props = {
  options: ProductDesignOption[];
};

export function ProductDesignCarousel({ options }: Props) {
  if (!options.length) return null;

  return (
    <section className="pd-section" id="design">
      <div className="hd-shell">
        <SectionHead
          eyebrow="Provedení"
          title="Design a varianty"
          lead="Související modely, typ montáže a způsob ovládání — sestavíme řešení na míru vaší stavbě."
          align="left"
        />

        <div className="pd-card-grid pd-card-grid--4">
          {options.map((opt) => (
            <Link key={opt.id} href={opt.href} className="pd-card group">
              <div className="pd-card__media">
                {isValidProductImage(opt.image) ? (
                  <Image
                    src={opt.image}
                    alt=""
                    fill
                    quality={IMG_QUALITY}
                    className={imgClass.product}
                    sizes={imgSizes.carouselCard}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-4 text-center text-xs text-muted">
                    Ilustrace k dispozici v showroomu
                  </div>
                )}
              </div>
              <div className="pd-card__body">
                <h3 className="pd-card__title">{opt.title}</h3>
                <p className="pd-card__text">{opt.description}</p>
                <span className="pd-card__link">Více informací →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
