import type { Product } from "@/lib/cms/types";

export const PLACEHOLDER_IMAGE_RE = /all_products|placeholder|default-product/i;
export const NAV_PRODUCT_SLUGS = new Set([
  "textilni-roletky",
  "textilni-roletky-den-noc",
  "okna",
  "vchodove-dvere",
]);

/** Verified category fallbacks (Unsplash) when no product photo exists */
export const CATEGORY_FALLBACKS: Record<string, string> = {
  rolety: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960&q=80",
  zaluzie: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=960&q=80",
  screen: "https://images.unsplash.com/photo-1600566753190-17f0baa87442?w=960&q=80",
  markyza: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=960&q=80",
  pergola: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=960&q=80",
  okna: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=960&q=80",
  dvere: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=960&q=80",
  garaz: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd7a?w=960&q=80",
  sit: "https://images.unsplash.com/photo-1600566753086-00f18fb576b9?w=960&q=80",
  interier: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=960&q=80",
  parapet: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960&q=80",
  samonosne: "https://sunblinds.cz/images/slider_1/big/rovo_2.png",
  default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960&q=80",
};

export function isNavProduct(product: Pick<Product, "slug" | "name">) {
  return NAV_PRODUCT_SLUGS.has(product.slug) || /zobrazit všechny/i.test(product.name);
}

export function isValidProductImage(url?: string | null): url is string {
  return Boolean(url?.trim() && !PLACEHOLDER_IMAGE_RE.test(url));
}

export function categoryFallbackFor(
  product: Pick<Product, "name">,
  groupSlug = "",
  solutionSlug = ""
): string {
  const text = `${product.name} ${groupSlug} ${solutionSlug}`.toLowerCase();
  if (/samonosn|rovo|rafe|zivo/.test(text)) return CATEGORY_FALLBACKS.samonosne;
  if (/markýz|markyza|markyzy|alanis|cover|epica|arcadia|union/.test(text)) return CATEGORY_FALLBACKS.markyza;
  if (/pergol|loira|tira|opensky/.test(text)) return CATEGORY_FALLBACKS.pergola;
  if (/garáž|garaz|vrat|panel-/.test(text)) return CATEGORY_FALLBACKS.garaz;
  if (/hs-port|portál|portyl|okno|euro-|heroal-w|veka-softline-70ad/.test(text)) return CATEGORY_FALLBACKS.okna;
  if (/dveř|dver|vchodov/.test(text)) return CATEGORY_FALLBACKS.dvere;
  if (/síť|sit|hmyz|plise-dverni|rolovaci-sit|posuvna/.test(text)) return CATEGORY_FALLBACKS.sit;
  if (/plisé|plise|textil|roletk|jazz|collete|optima|legend|opus|isoline|horizont/.test(text))
    return CATEGORY_FALLBACKS.interier;
  if (/žaluz|zaluz|lamel|rafe|c-80|ext50|z-90/.test(text)) return CATEGORY_FALLBACKS.zaluzie;
  if (/screen|zivo|tara|union-l/.test(text)) return CATEGORY_FALLBACKS.screen;
  if (/parapet/.test(text)) return CATEGORY_FALLBACKS.parapet;
  if (/rolet|rovo|covert|radix|heluz/.test(text)) return CATEGORY_FALLBACKS.rolety;
  return CATEGORY_FALLBACKS.default;
}

/** Returns verified image URL or category fallback; null = show empty slot */
export function resolveProductImage(
  product: Pick<Product, "name" | "image" | "slug">,
  opts?: { groupSlug?: string; solutionSlug?: string; allowFallback?: boolean }
): string | null {
  if (isNavProduct(product)) return null;
  if (isValidProductImage(product.image)) return product.image;
  if (opts?.allowFallback === false) return null;
  return categoryFallbackFor(product, opts?.groupSlug, opts?.solutionSlug);
}

export function filterCatalogProducts<T extends Pick<Product, "slug" | "name">>(products: T[]): T[] {
  return products.filter((p) => !isNavProduct(p));
}
