import type { Metadata } from "next";

import { company } from "@/data/company";
import { getSolutions } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

const DEFAULT_DESCRIPTION =
  "Venkovní i interiérové stínění, okna, sítě proti hmyzu a garážová vrata. Showroom v Praze, zaměření, montáž a servis.";

const DEFAULT_OG_IMAGE = "/images/logo-negative.svg";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image,
  noIndex = false,
  ogType = "website",
}: {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  ogType?: "website" | "article";
}): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl(DEFAULT_OG_IMAGE);
  const pageTitle = title ? `${title} | ${company.name}` : `${company.name} — stínění, okna a servis`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: company.name,
      locale: "cs_CZ",
      type: ogType,
      images: [{ url: ogImage, alt: title ?? company.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    legalName: company.legalName,
    description: company.tagline,
    url: absoluteUrl("/"),
    telephone: company.phone,
    email: company.email,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      postalCode: company.address.zip,
      addressCountry: "CZ",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [company.social.instagram],
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function buildProductJsonLd({
  name,
  description,
  path,
  image,
  category,
}: {
  name: string;
  description: string;
  path: string;
  image?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absoluteUrl(path),
    image: image ? (image.startsWith("http") ? image : absoluteUrl(image)) : absoluteUrl(DEFAULT_OG_IMAGE),
    brand: {
      "@type": "Brand",
      name: company.name,
    },
    ...(category ? { category } : {}),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "CZK",
      url: absoluteUrl(path),
    },
  };
}

export async function getPublicRoutes(): Promise<{ path: string; lastModified?: Date }[]> {
  const staticRoutes = [
    "/",
    "/reseni",
    "/poptavka",
    "/showroom",
    "/servis",
    "/kontakt",
    "/recenze",
    "/o-nas",
    "/ochrana-osobnich-udaju",
  ];

  const routes: { path: string; lastModified?: Date }[] = staticRoutes.map((path) => ({ path }));

  try {
    const solutions = await getSolutions();
    for (const solution of solutions) {
      routes.push({ path: `/reseni/${solution.slug}` });
      for (const group of solution.productGroups) {
        routes.push({ path: `/reseni/${solution.slug}/${group.slug}` });
        for (const product of group.products) {
          routes.push({ path: `/reseni/${solution.slug}/${group.slug}/${product.slug}` });
        }
      }
    }
  } catch {
    // Build-time fallback when CMS is unavailable
  }

  return routes;
}
