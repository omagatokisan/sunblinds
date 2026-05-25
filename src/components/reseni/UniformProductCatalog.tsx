import Link from "next/link";
import type { Product, ProductGroup, Solution } from "@/lib/cms/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { filterCatalogProducts } from "@/lib/product-images";
import { imgSizes } from "@/lib/image-presets";

export function CatalogProductTile({
  solution,
  group,
  product,
}: {
  solution: Solution;
  group: ProductGroup;
  product: Product;
}) {
  const href = `/reseni/${solution.slug}/${group.slug}/${product.slug}`;

  return (
    <Link href={href} className="catalog-cell catalog-cell--uniform group">
      <div className="catalog-cell-media catalog-cell-media--square">
        <ProductImage
          product={product}
          groupSlug={group.slug}
          solutionSlug={solution.slug}
          sizes={imgSizes.productTile}
        />
      </div>
      <div className="catalog-cell-body">
        <h3 className="catalog-cell-title">{product.name}</h3>
        <p className="catalog-cell-summary">{product.summary}</p>
        <span className="link-arrow catalog-cell-link">Detail produktu</span>
      </div>
    </Link>
  );
}

export function UniformProductCatalog({
  solution,
  group,
}: {
  solution: Solution;
  group: ProductGroup;
}) {
  const products = filterCatalogProducts(group.products);
  if (!products.length) return null;

  return (
    <div className="catalog-grid catalog-grid--uniform" role="list">
      {products.map((product) => (
        <CatalogProductTile key={product.slug} solution={solution} group={group} product={product} />
      ))}
    </div>
  );
}
