import Image from "next/image";
import Link from "next/link";
import { HomeReveal } from "@/components/home/HomeReveal";
import { Button } from "@/components/ui/Button";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function HomeSplitSection({
  eyebrow,
  title,
  body,
  href,
  linkLabel,
  ctaHref,
  ctaLabel,
  image,
  imageAlt,
  reverse = false,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  accent?: boolean;
}) {
  return (
    <section
      className={`hd-split ${reverse ? "hd-split--reverse" : ""} ${accent ? "hd-split--accent" : ""}`}
    >
      <HomeReveal className="hd-split__copy">
        <p className="hd-eyebrow">
          <span className="hd-eyebrow__mark" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="hd-split__title">{title}</h2>
        <p className="hd-split__body">{body}</p>
        <div className="hd-split__actions">
          {ctaHref && ctaLabel ? (
            <Button href={ctaHref} size="lg" className="hd-btn hd-btn--primary">
              {ctaLabel}
            </Button>
          ) : null}
          {href && linkLabel ? (
            <Link href={href} className="hd-link">
              {linkLabel} →
            </Link>
          ) : null}
        </div>
      </HomeReveal>
      <div className="hd-split__media">
        <Image
          src={image}
          alt={imageAlt}
          fill
          quality={IMG_QUALITY}
          className={imgClass.photo}
          sizes={imgSizes.pageSplit}
        />
      </div>
    </section>
  );
}
