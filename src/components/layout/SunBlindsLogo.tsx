import Link from "next/link";
import { BrandImage } from "@/components/ui/BrandImage";

type Variant = "header" | "line" | "full" | "iso";

/**
 * header = horizontální textový wordmark (logo-line)
 * full = logo-negative (pouze tmavé pozadí)
 * line = horizontální wordmark
 */
export function SunBlindsLogo({
  variant = "header",
  href = "/",
  className = "",
}: {
  variant?: Variant;
  href?: string;
  className?: string;
}) {
  const label = "SunBlinds — úvod";

  if (variant === "iso") {
    return (
      <Link href={href} className={`inline-flex shrink-0 ${className}`} aria-label={label}>
        <BrandImage src="/images/logo-iso.svg" alt="SunBlinds" className="h-10 w-10 object-contain" />
      </Link>
    );
  }

  if (variant === "full") {
    return (
      <Link href={href} className={`inline-flex shrink-0 ${className}`} aria-label={label}>
        <BrandImage
          src="/images/logo-negative.svg"
          alt="SunBlinds"
          className="h-11 w-auto max-w-[140px] object-contain sm:h-12 sm:max-w-[160px]"
        />
      </Link>
    );
  }

  const headerSrc = "/images/logo-line.svg";

  return (
    <Link href={href} className={`inline-flex shrink-0 ${className}`} aria-label={label}>
      <BrandImage
        src={headerSrc}
        alt="SunBlinds"
        className="h-7 w-auto object-contain sm:h-8"
        width={275}
        height={37}
      />
    </Link>
  );
}
