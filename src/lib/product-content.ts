import type { Product, ProductSpec, TextBlock } from "@/lib/cms/types";

const PLACEHOLDER_RE =
  /patří do kategorie|Pro přesné parametry a montáž doporučujeme konzultaci/i;

const GENERIC_FEATURES = new Set([
  "Individuální zaměření",
  "Montáž a servis",
  "Sladění s objektem",
]);

export type ProductNarrative = {
  description: string;
  features: string[];
  textBlocks: TextBlock[];
};

function specByLabel(specs: ProductSpec[], pattern: RegExp) {
  return specs.find((s) => pattern.test(s.label));
}

function buildFeaturesFromSpecs(specs: ProductSpec[]): string[] {
  return specs
    .filter((s) => s.label && s.value && !/^látka$/i.test(s.label.trim()))
    .slice(0, 6)
    .map((s) => `${s.label}: ${s.value}`.slice(0, 300));
}

function buildTextBlocksFromSpecs(product: Product): TextBlock[] {
  const { specs, slug } = product;
  const blocks: TextBlock[] = [];

  const montaz = specByLabel(specs, /montáž/i);
  if (montaz) {
    blocks.push({
      id: `tb-${slug}-montaz`,
      title: "Montáž a instalace",
      content: `Typ montáže: ${montaz.value}. Přesný postup a kotvení navrhneme podle stavu otvoru — u novostaveb, rekonstrukcí i dodatečné montáže.`,
    });
  }

  const ovladani = specByLabel(specs, /ovládání/i);
  if (ovladani) {
    blocks.push({
      id: `tb-${slug}-ovladani`,
      title: "Ovládání",
      content: `Dostupné varianty ovládání: ${ovladani.value}. Poradíme s volbou manuálního i motorického provedení včetně napojení na chytrou domácnost.`,
    });
  }

  const dimensionSpecs = specs.filter((s) =>
    /max|min|šířka|výška|plocha|rozměr|váha|hloubka/i.test(s.label)
  );
  if (dimensionSpecs.length >= 2) {
    const lines = dimensionSpecs.map((s) => `${s.label}: ${s.value}`).join(". ");
    blocks.push({
      id: `tb-${slug}-rozmery`,
      title: "Rozměry a limity",
      content: `${lines}. Finální rozměry ověřujeme při zaměření na místě.`,
    });
  }

  const extras = specByLabel(specs, /příplatk/i);
  if (extras) {
    blocks.push({
      id: `tb-${slug}-extras`,
      title: "Volitelné doplňky",
      content: `K produktu lze objednat: ${extras.value}. Rádi je zapracujeme do nabídky.`,
    });
  }

  return blocks;
}

export function buildProductNarrative(product: Product): ProductNarrative {
  const description =
    product.description && !PLACEHOLDER_RE.test(product.description)
      ? product.description
      : product.summary && !PLACEHOLDER_RE.test(product.summary)
        ? product.summary
        : product.description;

  const hasRealFeatures = product.features.some((f) => !GENERIC_FEATURES.has(f));
  const features = hasRealFeatures ? product.features : buildFeaturesFromSpecs(product.specs);

  const textBlocks = product.textBlocks.length
    ? product.textBlocks
    : buildTextBlocksFromSpecs(product);

  return { description, features, textBlocks };
}
