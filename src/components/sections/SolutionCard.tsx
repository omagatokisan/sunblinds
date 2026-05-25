import Image from "next/image";
import Link from "next/link";
import type { Solution } from "@/lib/cms/types";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function SolutionCard({ solution }: { solution: Solution }) {
  const count = solution.productGroups.reduce((n, g) => n + g.products.length, 0);

  return (
    <Link href={`/reseni/${solution.slug}`} className="catalog-cell group">
      <div className="catalog-cell-media catalog-cell-media--wide">
        <Image
          src={solution.heroImage}
          alt={solution.title}
          fill
          quality={IMG_QUALITY}
          className={imgClass.photo}
          sizes={imgSizes.catalogThird}
        />
      </div>
      <h3 className="text-base font-semibold text-ink group-hover:text-brand">{solution.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{solution.summary}</p>
      <p className="mt-3 text-xs text-muted">{count} produktů v nabídce</p>
      <span className="link-arrow mt-3 inline-flex">Produkty</span>
    </Link>
  );
}
