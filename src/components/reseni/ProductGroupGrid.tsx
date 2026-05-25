import Image from "next/image";
import Link from "next/link";
import type { ProductGroup, Solution } from "@/lib/cms/types";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function ProductGroupGrid({ solution }: { solution: Solution }) {
  return (
    <div className="catalog-grid catalog-grid--cols-2">
      {solution.productGroups.map((group) => (
        <GroupCard key={group.slug} solution={solution} group={group} />
      ))}
    </div>
  );
}

function GroupCard({ solution, group }: { solution: Solution; group: ProductGroup }) {
  const href = `/reseni/${solution.slug}/${group.slug}`;
  const count = group.products.length;

  return (
    <Link href={href} className="catalog-cell group">
      <div className="catalog-cell-media catalog-cell-media--wide">
        <Image
          src={group.image}
          alt={group.name}
          fill
          quality={IMG_QUALITY}
          className={imgClass.photo}
          sizes={imgSizes.catalogHalf}
        />
      </div>
      <p className="text-xs text-muted">
        {count} {count === 1 ? "produkt" : count < 5 ? "produkty" : "produktů"}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-ink group-hover:text-brand">{group.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{group.summary}</p>
      <span className="link-arrow mt-4 inline-flex text-sm">Zobrazit produkty</span>
    </Link>
  );
}
