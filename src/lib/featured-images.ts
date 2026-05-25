import type { Product, ProductGroup, Solution } from "@/lib/cms/types";
import { filterCatalogProducts, isValidProductImage } from "@/lib/product-images";

export type FeaturedVisual = {
  image: string;
  label: string;
  href: string;
  tag?: string;
};

export function collectProductImages(products: Product[], limit: number): string[] {
  const images: string[] = [];
  for (const p of products) {
    if (isValidProductImage(p.image)) images.push(p.image);
    if (images.length >= limit) break;
  }
  return images;
}

export function getSolutionVisuals(solution: Solution, limit = 5): FeaturedVisual[] {
  const items: FeaturedVisual[] = [];

  if (isValidProductImage(solution.heroImage)) {
    items.push({
      image: solution.heroImage,
      label: solution.shortTitle,
      href: `/reseni/${solution.slug}`,
      tag: "Oblast",
    });
  }

  for (const group of solution.productGroups) {
    for (const product of filterCatalogProducts(group.products)) {
      if (!isValidProductImage(product.image)) continue;
      items.push({
        image: product.image,
        label: product.name,
        href: `/reseni/${solution.slug}/${group.slug}/${product.slug}`,
        tag: group.name,
      });
      if (items.length >= limit) return items;
    }
  }

  return items;
}

export function getAllFeaturedVisuals(solutions: Solution[], limit = 16): FeaturedVisual[] {
  const all: FeaturedVisual[] = [];
  for (const s of solutions) {
    for (const v of getSolutionVisuals(s, 4)) {
      if (all.some((x) => x.image === v.image)) continue;
      all.push(v);
      if (all.length >= limit) return all;
    }
  }
  return all;
}

export function getGroupVisuals(
  solution: Solution,
  group: ProductGroup,
  limit = 8
): FeaturedVisual[] {
  return filterCatalogProducts(group.products)
    .filter((p) => isValidProductImage(p.image))
    .slice(0, limit)
    .map((p) => ({
      image: p.image,
      label: p.name,
      href: `/reseni/${solution.slug}/${group.slug}/${p.slug}`,
      tag: group.name,
    }));
}
