export type TextBlock = {
  id: string;
  title?: string;
  content: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductHotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  text: string;
  link?: { href: string; label: string };
};

export type ProductDesignOption = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type ProductDownload = {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  format: string;
  sizeLabel?: string;
};

export type ProductGalleryImage = {
  id: string;
  image: string;
  caption?: string;
};

export type ProductRelatedTopic = {
  id: string;
  title: string;
  description: string;
  href: string;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  image: string;
  features: string[];
  textBlocks: TextBlock[];
  specs: ProductSpec[];
  /** Rozšířený detail produktu (volitelné — doplní se automaticky) */
  eyebrow?: string;
  diagramImage?: string;
  hotspots?: ProductHotspot[];
  designOptions?: ProductDesignOption[];
  downloads?: ProductDownload[];
  inspirationGallery?: ProductGalleryImage[];
  relatedTopics?: ProductRelatedTopic[];
};

export type ProductGroup = {
  slug: string;
  name: string;
  summary: string;
  image: string;
  products: Product[];
};

export type Solution = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  heroImage: string;
  intro: string;
  benefits: string[];
  idealFor: string[];
  textBlocks: TextBlock[];
  productGroups: ProductGroup[];
  mosaicLayout?: "default" | "featured";
};

export type Department = {
  id: string;
  label: string;
  phone: string;
  hours: string;
  hint: string;
};

export type Technician = {
  id: string;
  name: string;
  role: string;
  photo: string;
  shortBio: string;
  fullBio: string;
};

export type ServisBlock = {
  id: string;
  title: string;
  text: string;
};

export type GdprConsent = {
  textBeforeLink: string;
  linkLabel: string;
  linkHref: string;
};

export type ShowroomContent = {
  title: string;
  intro: string;
  heroImage: string;
  addressLine1: string;
  addressLine2: string;
  hours: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  highlights: { id: string; title: string; text: string }[];
  textBlocks: TextBlock[];
};

export type PrivacyContent = {
  title: string;
  intro: string;
  updatedLabel: string;
  sections: TextBlock[];
};

export type InquiryOptions = {
  mountingTypes: string[];
  controlTypes: string[];
  locationTypes: string[];
};

export type HomeContent = {
  heroTitle: string;
  heroLead: string;
  solutionsTitle: string;
  solutionsDescription: string;
  whyTitle: string;
  responseTime: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ReferenceCase = {
  id: string;
  title: string;
  location: string;
  scope: string;
  text: string;
  image: string;
};

export type ServisCategory = {
  id: string;
  title: string;
  shortText: string;
  longText: string;
  icon: "shading" | "windows" | "pergola" | "garage";
};

export type ServisPricingRow = {
  id: string;
  service: string;
  price: string;
  note?: string;
};

export type ServisPageContent = {
  heroTitle: string;
  heroLead: string;
  intro: string;
  servicedTags: string[];
  categories: ServisCategory[];
  pricingTitle: string;
  pricingNote: string;
  pricingRows: ServisPricingRow[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  location?: string;
  productHint?: string;
  source: "customer" | "manual";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export type ContactPageContent = {
  heroTitle: string;
  heroLead: string;
  formTitle: string;
  formLead: string;
};

export type AboutStat = {
  id: string;
  value: string;
  label: string;
};

export type AboutPageContent = {
  heroLead: string;
  introTitle: string;
  introLead: string;
  introBody: string;
  storyTitle: string;
  storyBody: string;
  stats: AboutStat[];
  scopeTitle: string;
  scopeLead: string;
  showroomTitle: string;
  showroomBody: string;
  servisTitle: string;
  servisBody: string;
};

export type SiteContent = {
  version: number;
  reviewsEnabled: boolean;
  gdprConsent: GdprConsent;
  showroom: ShowroomContent;
  privacy: PrivacyContent;
  inquiryOptions: InquiryOptions;
  home: HomeContent;
  contact: ContactPageContent;
  aboutPage: AboutPageContent;
  servisPage: ServisPageContent;
  departments: Department[];
  technicians: Technician[];
  servisBlocks: ServisBlock[];
  reviews: Review[];
  solutions: Solution[];
  processSteps: { id: string; step: string; title: string; text: string }[];
  pillars: { id: string; title: string; text: string }[];
  faq: FaqItem[];
  references: ReferenceCase[];
};

export function flattenProducts(solution: Solution): Product[] {
  return solution.productGroups.flatMap((g) => g.products);
}

export function findProduct(
  solution: Solution,
  productSlug: string
): { product: Product; group: ProductGroup } | undefined {
  for (const group of solution.productGroups) {
    const product = group.products.find((p) => p.slug === productSlug);
    if (product) return { product, group };
  }
  return undefined;
}

export function newId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
