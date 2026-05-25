import Image from "next/image";
import Link from "next/link";
import type { FeaturedVisual } from "@/lib/featured-images";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function ImageBand({ items }: { items: FeaturedVisual[] }) {
  if (!items.length) return null;

  return (
    <div className="visual-band-wrap" aria-label="Galerie produktů">
      <div className="visual-band-track">
        {[...items, ...items].map((item, i) => (
          <Link key={`${item.image}-${i}`} href={item.href} className="visual-band-item group">
            <div className="visual-band-frame">
              <Image
                src={item.image}
                alt={item.label}
                fill
                quality={IMG_QUALITY}
                className={`${imgClass.product} transition duration-500 group-hover:scale-105`}
                sizes={imgSizes.productTile}
              />
            </div>
            <span className="visual-band-caption">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
