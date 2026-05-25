/**
 * Audit & fix product images against sunblinds.cz source pages.
 * Usage: node scripts/audit-fix-images.mjs [--fix] [--delay=150]
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const catalogPath = path.join(process.cwd(), "src/lib/cms/catalog.generated.json");
const fix = process.argv.includes("--fix");
const delayArg = process.argv.find((a) => a.startsWith("--delay="));
const delayMs = delayArg ? Number(delayArg.split("=")[1]) : 150;

const solutionUrlMap = {
  "okna-a-dvere": "vyplne-otvoru",
  "garazova-vrata": "vyplne-otvoru",
};

const SKIP_SLUGS = new Set([
  "textilni-roletky",
  "textilni-roletky-den-noc",
  "okna",
  "vchodove-dvere",
]);

function absUrl(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src.replace("www.sunblinds.cz", "sunblinds.cz");
  return `https://sunblinds.cz${src.startsWith("/") ? "" : "/"}${src}`;
}

function extractProductImage(html) {
  const imgs = [...html.matchAll(/src=["']([^"']*\/images\/produkt\/[^"']+)["']/gi)].map((m) =>
    absUrl(m[1])
  );
  const unique = [...new Set(imgs)].filter(
    (u) => !/all_products|logo|ico/i.test(u)
  );
  // Prefer /small/ or /big/ product shots; first on page is usually main
  const small = unique.find((u) => /\/small\//i.test(u));
  const big = unique.find((u) => /\/big\//i.test(u));
  return small ?? big ?? unique[0] ?? "";
}

async function fetchHtml(solutionSlug, groupSlug, productSlug) {
  const base = solutionUrlMap[solutionSlug] ?? solutionSlug;
  const urls = [
    `https://sunblinds.cz/${base}/${groupSlug}/${productSlug}`,
    `https://sunblinds.cz/${solutionSlug}/${groupSlug}/${productSlug}`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "SunBlinds-audit/1.0" } });
      if (res.ok) return { html: await res.text(), url };
    } catch {
      /* next */
    }
  }
  return null;
}

/** Category-appropriate Unsplash fallbacks when no verified image exists */
const FALLBACKS = {
  rolety: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  zaluzie: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  screen: "https://images.unsplash.com/photo-1600566753190-17f0baa87442?w=800&q=80",
  markyza: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  pergola: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
  okna: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&q=80",
  dvere: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
  garaz: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  sit: "https://images.unsplash.com/photo-1600566753086-00f18fb576b9?w=800&q=80",
  interier: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  parapet: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
};

function fallbackFor(product, groupSlug, solutionSlug) {
  const text = `${product.name} ${groupSlug} ${solutionSlug}`.toLowerCase();
  if (/markýz|markyza|markyzy/i.test(text)) return FALLBACKS.markyza;
  if (/pergol/i.test(text)) return FALLBACKS.pergola;
  if (/garáž|garaz|vrat/i.test(text)) return FALLBACKS.garaz;
  if (/okno|hs-port|portál|portyl/i.test(text)) return FALLBACKS.okna;
  if (/dveř|dver/i.test(text)) return FALLBACKS.dvere;
  if (/síť|sit|hmyz/i.test(text)) return FALLBACKS.sit;
  if (/plisé|plise|textil|roletk|jazz|collete|optima|legend|opus/i.test(text)) return FALLBACKS.interier;
  if (/žaluz|zaluz|isoline|rafe|lamel/i.test(text)) return FALLBACKS.zaluzie;
  if (/screen|zivo|tara|union-l/i.test(text)) return FALLBACKS.screen;
  if (/parapet/i.test(text)) return FALLBACKS.parapet;
  if (/rolet|rovo|covert|radix/i.test(text)) return FALLBACKS.rolety;
  return FALLBACKS.default;
}

function normalizeImageUrl(url) {
  return url.replace("www.sunblinds.cz", "sunblinds.cz").replace(/\/small\//, "/small/").split("?")[0];
}

const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const report = { ok: 0, fixed: 0, empty: 0, fallback: 0, missing: 0, mismatch: [] };

for (const solution of catalog) {
  for (const group of solution.productGroups) {
    // Fix group image from first real product if group uses generic listing image
    const realProducts = group.products.filter((p) => !SKIP_SLUGS.has(p.slug));
    if (
      group.image &&
      (/all_products|1684008996|1746084558/.test(group.image) === false) &&
      realProducts.length &&
      group.image === realProducts[0]?.image
    ) {
      // ok — group matches first product
    }

    for (const product of group.products) {
      if (SKIP_SLUGS.has(product.slug) || /zobrazit všechny/i.test(product.name)) {
        if (fix) {
          product.image = "";
        }
        report.empty++;
        continue;
      }

      const fetched = await fetchHtml(solution.slug, group.slug, product.slug);
      await new Promise((r) => setTimeout(r, delayMs));

      if (!fetched) {
        report.missing++;
        console.warn(`MISSING PAGE: ${solution.slug}/${group.slug}/${product.slug}`);
        if (fix && (!product.image || /all_products/i.test(product.image))) {
          product.image = fallbackFor(product, group.slug, solution.slug);
          report.fallback++;
        }
        continue;
      }

      const sourceImage = extractProductImage(fetched.html);
      const current = normalizeImageUrl(product.image || "");
      const source = normalizeImageUrl(sourceImage);

      if (source && current === source) {
        report.ok++;
        continue;
      }

      if (source) {
        report.mismatch.push({
          path: `${solution.slug}/${group.slug}/${product.slug}`,
          name: product.name,
          was: product.image,
          source: sourceImage,
        });
        if (fix) {
          product.image = sourceImage;
          report.fixed++;
        }
      } else if (!product.image || /all_products/i.test(product.image)) {
        if (fix) {
          product.image = fallbackFor(product, group.slug, solution.slug);
          report.fallback++;
        }
        report.missing++;
      } else {
        report.ok++;
      }
    }
  }
}

console.log("\n=== REPORT ===");
console.log(JSON.stringify(report, null, 2));
if (report.mismatch.length) {
  console.log("\n=== MISMATCHES (first 20) ===");
  report.mismatch.slice(0, 20).forEach((m) => {
    console.log(`\n${m.path}\n  ${m.name}\n  WAS: ${m.was}\n  SRC: ${m.source}`);
  });
}

if (fix) {
  await writeFile(catalogPath, JSON.stringify(catalog, null, 2), "utf8");
  console.log("\nCatalog updated.");
}
