import Image from "next/image";
import Link from "next/link";
import type { FeaturedVisual } from "@/lib/featured-images";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function VisualMosaic({
  items,
  variant = "editorial",
}: {
  items: FeaturedVisual[];
  variant?: "editorial" | "dense" | "hero";
}) {
  if (!items.length) return null;

  if (variant === "hero") {
    const [main, ...rest] = items;
    return (
      <div className="visual-hero-stack mx-auto max-w-5xl">
        <Link href={main.href} className="visual-hero-main group">
          <Image
            src={main.image}
            alt={main.label}
            fill
            priority
            quality={IMG_QUALITY}
            className={`${imgClass.photo} transition duration-700 group-hover:scale-[1.03]`}
            sizes={imgSizes.hero}
          />
          <div className="visual-hero-caption">
            <span className="visual-tag">{main.tag ?? "SunBlinds"}</span>
            <span className="font-display text-xl text-white sm:text-2xl">{main.label}</span>
          </div>
        </Link>
        {rest.slice(0, 2).map((item, i) => (
          <Link
            key={item.image}
            href={item.href}
            className={`visual-hero-float visual-hero-float--${i + 1} group`}
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              quality={IMG_QUALITY}
              className={`${imgClass.product} transition duration-700 group-hover:scale-105`}
              sizes={imgSizes.catalogHalf}
            />
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "dense") {
    return (
      <div className="visual-mosaic-dense mx-auto max-w-5xl">
        {items.slice(0, 8).map((item, i) => (
          <Link
            key={`${item.href}-${i}`}
            href={item.href}
            className={`visual-mosaic-cell visual-mosaic-cell--${(i % 6) + 1} group`}
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              quality={IMG_QUALITY}
              className={`${i % 3 === 0 ? imgClass.photo : imgClass.product} transition duration-700 group-hover:scale-[1.04]`}
              sizes={imgSizes.catalogThird}
            />
            <span className="visual-mosaic-label">{item.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="visual-mosaic-editorial mx-auto max-w-5xl">
      {items.slice(0, 5).map((item, i) => (
        <Link
          key={`${item.href}-${i}`}
          href={item.href}
          className={`visual-editorial-cell visual-editorial-cell--${i + 1} group`}
        >
          <Image
            src={item.image}
            alt={item.label}
            fill
            quality={IMG_QUALITY}
            className={`${i === 0 ? imgClass.photo : imgClass.product} transition duration-700 group-hover:scale-[1.03]`}
            sizes={imgSizes.half}
          />
          <div className="visual-editorial-meta">
            {item.tag ? <span className="visual-tag">{item.tag}</span> : null}
            <span className="font-display text-lg text-ink">{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
