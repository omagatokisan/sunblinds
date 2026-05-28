import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductContentBlock } from "@/components/product/ProductContentBlock";
import { ProductDesignCarousel } from "@/components/product/ProductDesignCarousel";
import { ProductDetailHero } from "@/components/product/ProductDetailHero";
import { ProductDownloads } from "@/components/product/ProductDownloads";
import { ProductRelatedTopics } from "@/components/product/ProductRelatedTopics";
import { ProductSectionNav } from "@/components/product/ProductSectionNav";
import { ProductSpecsGrid } from "@/components/product/ProductSpecsGrid";
import { ProductTechnicalOverview } from "@/components/product/ProductTechnicalOverview";
import { buildProductDetailView } from "@/lib/product-detail";
import { getProduct, getSolutions } from "@/lib/content";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildProductJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string; groupSlug: string; productSlug: string }> };

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.flatMap((s) =>
    s.productGroups.flatMap((g) =>
      g.products.map((p) => ({ slug: s.slug, groupSlug: g.slug, productSlug: p.slug }))
    )
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, groupSlug, productSlug } = await params;
  const data = await getProduct(slug, groupSlug, productSlug);
  if (!data) return {};
  const path = `/reseni/${slug}/${groupSlug}/${productSlug}`;
  return buildPageMetadata({
    title: data.product.name,
    description: data.product.summary,
    path,
    image: data.product.image,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug, groupSlug, productSlug } = await params;
  const data = await getProduct(slug, groupSlug, productSlug);
  if (!data) notFound();

  const { solution, group, product } = data;
  const detail = buildProductDetailView(product, group, solution, slug, groupSlug);
  const groupHref = `/reseni/${solution.slug}/${group.slug}`;
  const inquiryHref = `/poptavka?produkt=${encodeURIComponent(product.name)}`;
  const productPath = `/reseni/${slug}/${groupSlug}/${productSlug}`;

  const breadcrumbs = [
    { label: "Úvod", href: "/" },
    { label: "Řešení", href: "/reseni" },
    { label: solution.title, href: `/reseni/${solution.slug}` },
    { label: group.name, href: groupHref },
    { label: product.name },
  ];

  return (
    <div className="product-page">
      <JsonLd
        data={[
          buildBreadcrumbJsonLd(breadcrumbs),
          buildProductJsonLd({
            name: product.name,
            description: product.summary,
            path: productPath,
            image: product.image,
            category: `${solution.title} · ${group.name}`,
          }),
        ]}
      />
      <ProductDetailHero
        detail={detail}
        groupHref={groupHref}
        inquiryHref={inquiryHref}
        breadcrumbs={breadcrumbs}
      />

      <ProductSectionNav />

      {detail.hotspots.length ? (
        <ProductTechnicalOverview
          product={product}
          groupSlug={groupSlug}
          solutionSlug={slug}
          details={detail.hotspots}
        />
      ) : null}

      <ProductDesignCarousel options={detail.designOptions} />
      <ProductContentBlock product={product} />
      {product.specs.length ? <ProductSpecsGrid specs={product.specs} /> : null}
      <ProductDownloads
        downloads={detail.downloads}
        productName={product.name}
        inquiryHref={inquiryHref}
      />
      <ProductRelatedTopics topics={detail.relatedTopics} />

      <CtaBand
        title={`Máte zájem o ${detail.displayName}?`}
        description="Napište rozměry a typ objektu — připravíme nezávaznou nabídku."
      />
    </div>
  );
}
