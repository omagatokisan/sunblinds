import Link from "next/link";
import type { Product, Solution } from "@/lib/cms/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { filterCatalogProducts } from "@/lib/product-images";
import { imgSizes } from "@/lib/image-presets";

export function MosaicProducts({ solution }: { solution: Solution }) {
  const items = solution.productGroups.flatMap((g) =>
    filterCatalogProducts(g.products).map((p) => ({ product: p, groupSlug: g.slug }))
  );

  return (
    <div className="catalog-grid catalog-grid--cols-3">
      {items.map(({ product, groupSlug }) => (
        <MosaicTile
          key={`${groupSlug}-${product.slug}`}
          solutionSlug={solution.slug}
          groupSlug={groupSlug}
          product={product}
        />
      ))}
    </div>
  );
}

function MosaicTile({
  solutionSlug,
  groupSlug,
  product,
}: {
  solutionSlug: string;
  groupSlug: string;
  product: Product;
}) {
  const href = `/reseni/${solutionSlug}/${groupSlug}/${product.slug}`;

  return (
    <Link href={href} className="catalog-cell group !p-0 overflow-hidden">
      <div className="relative aspect-[4/5] min-h-[180px] w-full">
        <ProductImage
          product={product}
          groupSlug={groupSlug}
          solutionSlug={solutionSlug}
          variant="photo"
          sizes={imgSizes.productTile}
          className="transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-center">
          <h3 className="text-base font-semibold text-white sm:text-lg">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-normal text-white/80 sm:text-sm">
            {product.summary}
          </p>
          <span className="mt-2 inline-flex text-xs font-semibold text-brand-soft group-hover:underline">
            Detail produktu →
          </span>
        </div>
      </div>
    </Link>
  );
}
