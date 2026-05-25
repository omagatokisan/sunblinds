import type { Product, ProductGroup, Solution } from "@/lib/cms/types";
import { filterCatalogProducts } from "@/lib/product-images";

export type SolutionBentoProductItem = {
  kind: "product";
  product: Product;
  group: ProductGroup;
  href: string;
};

export type SolutionBentoGroupItem = {
  kind: "group";
  href: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  productCount: number;
};

/** @deprecated Pouze pro zpětnou kompatibilitu typů — homepage používá `group`. */
export type SolutionBentoHeroItem = {
  kind: "hero";
  href: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  productCount: number;
};

export type SolutionBentoItem =
  | SolutionBentoGroupItem
  | SolutionBentoProductItem
  | SolutionBentoHeroItem;

function hashSeed(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle<T>(items: T[], seed: string): T[] {
  const arr = [...items];
  let state = hashSeed(seed);

  for (let i = arr.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0;
    const j = state % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function pickPrimaryGroup(solution: Solution): ProductGroup {
  const ranked = [...solution.productGroups].sort(
    (a, b) => filterCatalogProducts(b.products).length - filterCatalogProducts(a.products).length
  );

  return (
    ranked.find((group) => filterCatalogProducts(group.products).length > 0) ??
    solution.productGroups[0]
  );
}

export function buildSolutionBentoItems(
  solution: Solution,
  mode: "home" | "legacy" = "home"
): SolutionBentoItem[] {
  const catalog = solution.productGroups.flatMap((group) =>
    filterCatalogProducts(group.products).map((product) => ({ product, group }))
  );

  if (mode === "legacy") {
    const maxProducts = Math.min(6, catalog.length);
    const picked = seededShuffle(catalog, solution.slug).slice(0, maxProducts);

    const hero: SolutionBentoHeroItem = {
      kind: "hero",
      href: `/reseni/${solution.slug}`,
      title: solution.title,
      eyebrow: solution.shortTitle,
      summary: solution.summary,
      image: solution.heroImage,
      productCount: catalog.length,
    };

    const products: SolutionBentoProductItem[] = picked.map(({ product, group }) => ({
      kind: "product",
      product,
      group,
      href: `/reseni/${solution.slug}/${group.slug}/${product.slug}`,
    }));

    return [hero, ...products];
  }

  const primaryGroup = pickPrimaryGroup(solution);
  const groupProducts = filterCatalogProducts(primaryGroup.products);
  const maxProducts = Math.min(6, groupProducts.length);
  const picked = seededShuffle(groupProducts, `${solution.slug}:${primaryGroup.slug}`).slice(
    0,
    maxProducts
  );

  const groupItem: SolutionBentoGroupItem = {
    kind: "group",
    href: `/reseni/${solution.slug}/${primaryGroup.slug}`,
    title: primaryGroup.name,
    eyebrow: solution.shortTitle,
    summary: primaryGroup.summary,
    image: primaryGroup.image,
    productCount: groupProducts.length,
  };

  const products: SolutionBentoProductItem[] = picked.map((product) => ({
    kind: "product",
    product,
    group: primaryGroup,
    href: `/reseni/${solution.slug}/${primaryGroup.slug}/${product.slug}`,
  }));

  return [groupItem, ...products];
}

export function solutionBentoCellCount(items: SolutionBentoItem[]) {
  return Math.max(4, Math.min(7, items.length));
}
