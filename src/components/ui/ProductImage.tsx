import Image from "next/image";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";
import { resolveProductImage } from "@/lib/product-images";

type Props = {
  product: { name: string; image: string; slug: string };
  groupSlug?: string;
  solutionSlug?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  variant?: "product" | "photo";
  fill?: boolean;
  width?: number;
  height?: number;
  allowFallback?: boolean;
};

export function ProductImage({
  product,
  groupSlug,
  solutionSlug,
  alt,
  sizes = imgSizes.productTile,
  priority,
  className = "",
  variant = "product",
  fill = true,
  width,
  height,
  allowFallback = true,
}: Props) {
  const src = resolveProductImage(product, { groupSlug, solutionSlug, allowFallback });
  const fitClass = variant === "photo" ? imgClass.photo : imgClass.product;

  if (!src) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-panel text-center text-xs text-muted ${className}`}
        aria-hidden
      >
        <span className="px-3">Foto produktu<br />k dispozici v showroomu</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt ?? product.name}
        fill
        quality={IMG_QUALITY}
        className={`${fitClass} ${className}`}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt ?? product.name}
      width={width ?? 400}
      height={height ?? 300}
      quality={IMG_QUALITY}
      className={`${fitClass} ${className}`}
      sizes={sizes}
      priority={priority}
    />
  );
}
