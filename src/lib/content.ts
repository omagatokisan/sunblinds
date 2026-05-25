import { getContent } from "@/lib/cms/store";
import type { Product, ProductGroup, Solution, SiteContent } from "@/lib/cms/types";
import { findProduct } from "@/lib/cms/types";

export async function loadSiteContent(): Promise<SiteContent> {
  return getContent();
}

export async function getSolutions() {
  const { solutions } = await loadSiteContent();
  return solutions;
}

export async function getSolution(slug: string): Promise<Solution | undefined> {
  const { solutions } = await loadSiteContent();
  return solutions.find((s) => s.slug === slug);
}

export async function getProductGroup(
  solutionSlug: string,
  groupSlug: string
): Promise<{ solution: Solution; group: ProductGroup } | undefined> {
  const solution = await getSolution(solutionSlug);
  if (!solution) return undefined;
  const group = solution.productGroups.find((g) => g.slug === groupSlug);
  if (!group) return undefined;
  return { solution, group };
}

export async function getProduct(
  solutionSlug: string,
  groupSlug: string,
  productSlug: string
) {
  const data = await getProductGroup(solutionSlug, groupSlug);
  if (!data) return undefined;
  const product = data.group.products.find((p) => p.slug === productSlug);
  if (!product) return undefined;
  return { ...data, product };
}

export type { Solution, Product, SiteContent, ProductGroup };
