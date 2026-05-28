import Link from "next/link";
import type { Product, ProductGroup, Solution } from "@/lib/cms/types";
import { formatCatalogProductName } from "@/lib/catalog-product-name";
import { ProductImage } from "@/components/ui/ProductImage";
import { imgSizes } from "@/lib/image-presets";

export function ProductCatalogTile({
  solution,
  group,
  product,
  index,
  nameFormat = "default",
}: {
  solution: Solution;
  group: ProductGroup;
  product: Product;
  index: number;
  nameFormat?: "default" | "category";
}) {
  const href = `/reseni/${solution.slug}/${group.slug}/${product.slug}`;
  const displayName =
    nameFormat === "category" ? formatCatalogProductName(group.name, product) : product.name;

  return (
    <Link href={href} className="hd-product-card">
      <div className="hd-product-card__media">
        <ProductImage
          product={product}
          groupSlug={group.slug}
          solutionSlug={solution.slug}
          alt={displayName}
          sizes={imgSizes.productTile}
          className="hd-product-card__img"
        />
      </div>
      <div className="hd-product-card__copy">
        <span className="hd-product-card__index">{String(index).padStart(2, "0")}</span>
        <h3 className="hd-product-card__title">{displayName}</h3>
        <p className="hd-product-card__summary">{product.summary || "\u00a0"}</p>
        <span className="hd-product-card__arrow" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}
