/** Nativní img pro SVG/PNG loga — Next/Image u SVG často rozbíjí text a barvy. */
export function BrandImage({
  src,
  alt,
  className = "",
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      decoding="async"
      loading="eager"
    />
  );
}
