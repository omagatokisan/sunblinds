import type {
  Product,
  ProductDesignOption,
  ProductDownload,
  ProductGalleryImage,
  ProductGroup,
  ProductHotspot,
  ProductRelatedTopic,
  Solution,
} from "@/lib/cms/types";
import { filterCatalogProducts, isValidProductImage, resolveProductImage } from "@/lib/product-images";
import { RELATED_TOPIC_IMAGES } from "@/data/site-visuals";

/** VEKAMOTION-style anchor positions on technical diagram */
const HOTSPOT_LAYOUT: { x: number; y: number }[] = [
  { x: 42, y: 48 },
  { x: 58, y: 82 },
  { x: 75, y: 45 },
  { x: 79, y: 81 },
  { x: 41, y: 34 },
  { x: 68, y: 62 },
  { x: 52, y: 22 },
  { x: 88, y: 58 },
];

export type ProductSibling = {
  slug: string;
  name: string;
  href: string;
  current: boolean;
};

export type ProductDetailView = {
  product: Product;
  eyebrow: string;
  displayName: string;
  diagramImage: string;
  hotspots: ProductHotspot[];
  designOptions: ProductDesignOption[];
  downloads: ProductDownload[];
  inspirationGallery: ProductGalleryImage[];
  relatedTopics: ProductRelatedTopic[];
  siblings: ProductSibling[];
};

function shortProductName(name: string) {
  const parts = name.split(/\s+/);
  const brand = parts.find((p) => /^[A-Z][a-z0-9]+$/.test(p) && p.length <= 12);
  if (brand) return brand;
  return parts.slice(-2).join(" ") || name;
}

function buildHotspots(product: Product): ProductHotspot[] {
  if (product.hotspots?.length) return product.hotspots;

  return product.specs.slice(0, HOTSPOT_LAYOUT.length).map((spec, i) => ({
    id: `hs-${i}`,
    x: HOTSPOT_LAYOUT[i].x,
    y: HOTSPOT_LAYOUT[i].y,
    title: spec.label,
    text: `${spec.label}: ${spec.value}. Parametry ověřte při zaměření — rádi poradíme v showroomu nebo telefonicky.`,
  }));
}

function buildDesignOptions(
  product: Product,
  group: ProductGroup,
  solution: Solution,
  solutionSlug: string,
  groupSlug: string
): ProductDesignOption[] {
  if (product.designOptions?.length) return product.designOptions;

  const siblings = filterCatalogProducts(group.products)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 2)
    .map((p) => ({
      id: `sib-${p.slug}`,
      title: shortProductName(p.name),
      description: p.summary.slice(0, 140) + (p.summary.length > 140 ? "…" : ""),
      image: isValidProductImage(p.image) ? p.image : product.image,
      href: `/reseni/${solutionSlug}/${groupSlug}/${p.slug}`,
    }));

  const mounting: ProductDesignOption = {
    id: "mounting",
    title: "Typ montáže",
    description:
      "Zabudování do fasády, předsazení nebo dodatečná montáž na stávající objekt — navrhneme podle stavby.",
    image: product.image,
    href: "/poptavka",
  };

  const control: ProductDesignOption = {
    id: "control",
    title: "Ovládání a automatika",
    description:
      "Manuální pásek, klika nebo motorické ovládání včetně napojení na chytrou domácnost.",
    image: product.image,
    href: "/poptavka",
  };

  return [...siblings, mounting, control].slice(0, 4);
}

function buildDownloads(product: Product, _displayName: string): ProductDownload[] {
  return product.downloads?.length ? product.downloads : [];
}

function buildInspirationGallery(
  product: Product,
  group: ProductGroup,
  _solution: Solution
): ProductGalleryImage[] {
  if (product.inspirationGallery?.length) return product.inspirationGallery;

  const images: ProductGalleryImage[] = [];
  const main = resolveProductImage(product, { groupSlug: group.slug, allowFallback: false });
  if (main) images.push({ id: "main", image: main, caption: product.name });

  const siblings = filterCatalogProducts(group.products).filter((p) => p.slug !== product.slug);
  for (const sib of siblings.slice(0, 3)) {
    const img = resolveProductImage(sib, { groupSlug: group.slug, allowFallback: false });
    if (img) {
      images.push({ id: `sib-${sib.slug}`, image: img, caption: sib.name });
    }
  }

  return images.slice(0, 4);
}

function enrichRelatedTopicImages(topics: ProductRelatedTopic[]): ProductRelatedTopic[] {
  const imageById: Record<string, string> = {
    showroom: RELATED_TOPIC_IMAGES.showroom,
    servis: RELATED_TOPIC_IMAGES.servis,
    poptavka: RELATED_TOPIC_IMAGES.poptavka,
  };

  return topics.map((topic) => ({
    ...topic,
    image: topic.image ?? imageById[topic.id],
  }));
}

function buildRelatedTopics(
  product: Product,
  solution: Solution,
  solutionSlug: string,
  groupSlug: string
): ProductRelatedTopic[] {
  if (product.relatedTopics?.length) return enrichRelatedTopicImages(product.relatedTopics);

  const group = solution.productGroups.find((g) => g.slug === groupSlug);
  const groupImage = group?.image;

  return [
    {
      id: "showroom",
      title: "Showroom Praha – Libuš",
      description: "Prohlédněte si materiály, barvy a konstrukce naživo před rozhodnutím.",
      href: "/showroom",
      image: RELATED_TOPIC_IMAGES.showroom,
    },
    {
      id: "servis",
      title: "Servis a údržba",
      description: "Záruční i pozáruční servis stínění včetně plánování výjezdů.",
      href: "/servis",
      image: RELATED_TOPIC_IMAGES.servis,
    },
    {
      id: "group",
      title: group?.name ?? "Skupina produktů",
      description: "Další modely ve stejné kategorii — porovnejte parametry a provedení.",
      href: `/reseni/${solutionSlug}/${groupSlug}`,
      ...(isValidProductImage(groupImage) ? { image: groupImage } : {}),
    },
    {
      id: "poptavka",
      title: "Online poptávka",
      description: `Zaměření, návrh a cenová nabídka pro ${shortProductName(product.name)}.`,
      href: `/poptavka?produkt=${encodeURIComponent(product.name)}`,
      image: RELATED_TOPIC_IMAGES.poptavka,
    },
  ];
}

export function buildProductDetailView(
  product: Product,
  group: ProductGroup,
  solution: Solution,
  solutionSlug: string,
  groupSlug: string
): ProductDetailView {
  const displayName = shortProductName(product.name);

  return {
    product,
    eyebrow: product.eyebrow ?? group.name,
    displayName,
    diagramImage: product.diagramImage ?? product.image,
    hotspots: buildHotspots(product),
    designOptions: buildDesignOptions(product, group, solution, solutionSlug, groupSlug),
    downloads: buildDownloads(product, displayName),
    inspirationGallery: buildInspirationGallery(product, group, solution),
    relatedTopics: buildRelatedTopics(product, solution, solutionSlug, groupSlug),
    siblings: group.products.map((p) => ({
      slug: p.slug,
      name: shortProductName(p.name),
      href: `/reseni/${solutionSlug}/${groupSlug}/${p.slug}`,
      current: p.slug === product.slug,
    })),
  };
}
