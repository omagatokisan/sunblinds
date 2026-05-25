import Image from "next/image";
import Link from "next/link";
import type { Solution } from "@/lib/cms/types";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function SolutionsCatalog({ solutions }: { solutions: Solution[] }) {
  return (
    <div className="catalog-grid catalog-grid--cols-3">
      {solutions.map((solution) => {
        const count = solution.productGroups.reduce((n, g) => n + g.products.length, 0);
        return (
          <Link
            key={solution.slug}
            href={`/reseni/${solution.slug}`}
            className="catalog-cell group"
          >
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
            <div className="catalog-cell-body">
              <h2 className="catalog-cell-title">{solution.title}</h2>
              <p className="catalog-cell-summary">{solution.summary}</p>
              <p className="mt-3 text-xs text-muted">{count} produktů</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
