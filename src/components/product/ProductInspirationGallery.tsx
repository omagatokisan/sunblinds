import Image from "next/image";
import { SectionHead } from "@/components/sections/SectionHead";
import type { ProductGalleryImage } from "@/lib/cms/types";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";
import { isValidProductImage } from "@/lib/product-images";

type Props = {
  images: ProductGalleryImage[];
  productName: string;
};

export function ProductInspirationGallery({ images, productName }: Props) {
  if (!images.length) return null;

  const valid = images.filter((img) => isValidProductImage(img.image));
  if (!valid.length) return null;

  return (
    <section className="pd-section pd-section--raised" id="inspirace">
      <div className="hd-shell">
        <SectionHead
          eyebrow="Inspirace"
          title="Realizace a materiály"
          lead="Ukázky provedení, související systémy a materiály — v showroomu v Libuši si vše prohlédnete naživo."
          align="left"
        />

        <div className="pd-inspire">
          {valid.map((img) => (
            <figure key={img.id} className="pd-inspire__item">
              <Image
                src={img.image}
                alt={img.caption ?? productName}
                fill
                quality={IMG_QUALITY}
                className={imgClass.photo}
                sizes={imgSizes.inspiration}
              />
              {img.caption ? <figcaption className="pd-inspire__caption">{img.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
