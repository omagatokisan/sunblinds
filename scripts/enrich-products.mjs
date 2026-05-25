/**
 * Enrich product copy from sunblinds.cz (verified meta, paragraphs, specs).
 * Usage: node scripts/enrich-products.mjs [--limit=10] [--delay=200]
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const catalogPath = path.join(process.cwd(), "src/lib/cms/catalog.generated.json");

const solutionUrlMap = {
  "okna-a-dvere": "vyplne-otvoru",
  "garazova-vrata": "vyplne-otvoru",
};

const SKIP_SLUGS = new Set([
  "textilni-roletky",
  "textilni-roletky-den-noc",
  "okna",
  "vchodove-dvere",
  "rolovaci-garazova-vrata",
]);

const GENERIC_FEATURES = ["Individuální zaměření", "Montáž a servis", "Sladění s objektem"];

const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const delayArg = process.argv.find((a) => a.startsWith("--delay="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const delayMs = delayArg ? Number(delayArg.split("=")[1]) : 200;

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isJunkText(text) {
  return (
    !text ||
    text.length < 30 ||
    /cookie|copyright|©|Zpracování osobních|Zaslat poptávku|navštivte náš showroom$/i.test(text) ||
    /reklamaci z důvodu výběru nevhodné barvy dle vzorníku zobrazeného elektronicky/i.test(text)
  );
}

function extractMetaDescription(html) {
  return html.match(/name="description"\s+content="([^"]+)"/i)?.[1]?.trim() ?? "";
}

function extractParagraphs(html) {
  const seen = new Set();
  const out = [];
  for (const m of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripHtml(m[1]);
    if (isJunkText(text)) continue;
    const key = text.slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(text);
  }
  return out;
}

function extractSpecs(html) {
  const specs = [];
  const tables = html.match(/<table[\s\S]*?<\/table>/gi) ?? [];
  for (const table of tables.slice(0, 3)) {
    for (const row of table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
      const cells = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) =>
        stripHtml(c[1])
      );
      if (cells.length >= 2 && cells[0] && cells[1]) {
        specs.push({ label: cells[0].slice(0, 120), value: cells[1].slice(0, 300) });
      }
    }
  }
  const dedup = [];
  const keys = new Set();
  for (const s of specs) {
    const k = s.label.toLowerCase();
    if (keys.has(k)) continue;
    keys.add(k);
    dedup.push(s);
  }
  return dedup.slice(0, 15);
}

function specFind(specs, pattern) {
  return specs.find((s) => pattern.test(s.label));
}

function buildTextBlocks(product, paragraphs, specs) {
  const blocks = [];
  const { slug } = product;

  const montaz = specFind(specs, /montáž/i);
  if (montaz) {
    blocks.push({
      id: `tb-${slug}-montaz`,
      title: "Montáž a instalace",
      content: `Typ montáže: ${montaz.value}. Přesný postup navrhneme podle stavu otvoru — u novostaveb, rekonstrukcí i dodatečné montáže na stávající objekt.`,
    });
  }

  const ovladani = specFind(specs, /ovládání/i);
  if (ovladani) {
    blocks.push({
      id: `tb-${slug}-ovladani`,
      title: "Ovládání",
      content: `Dostupné varianty: ${ovladani.value}. Poradíme s volbou manuálního i motorického provedení.`,
    });
  }

  const colorPara = paragraphs.find((p) => /RAL|vzorník|barevné provedení|Barvy zde uvedené/i.test(p));
  if (colorPara) {
    blocks.push({
      id: `tb-${slug}-barvy`,
      title: "Barvy a povrchové úpravy",
      content: colorPara,
    });
  }

  const dimensionSpecs = specs.filter((s) =>
    /max|min|šířka|výška|plocha|rozměr|váha|hloubka|průměr/i.test(s.label)
  );
  if (dimensionSpecs.length >= 2) {
    blocks.push({
      id: `tb-${slug}-rozmery`,
      title: "Rozměry a limity",
      content: `${dimensionSpecs.map((s) => `${s.label}: ${s.value}`).join(". ")}. Finální rozměry ověřujeme při zaměření.`,
    });
  }

  const extras = specFind(specs, /příplatk/i);
  if (extras) {
    blocks.push({
      id: `tb-${slug}-extras`,
      title: "Volitelné doplňky",
      content: `K produktu lze objednat: ${extras.value}.`,
    });
  }

  const material = specFind(specs, /materiál|látka|lamela|pancíř/i);
  if (material && !blocks.some((b) => b.title?.includes("Materiál"))) {
    blocks.push({
      id: `tb-${slug}-material`,
      title: "Materiál a provedení",
      content: `${material.label}: ${material.value}.`,
    });
  }

  return blocks.slice(0, 5);
}

function buildFeatures(specs) {
  return specs
    .filter((s) => s.label && s.value && !/^látka$/i.test(s.label.trim()))
    .slice(0, 6)
    .map((s) => `${s.label}: ${s.value}`.slice(0, 300));
}

function buildDescription(meta, paragraphs, product) {
  if (meta && meta.length > 40 && !/patří do kategorie/i.test(meta)) return meta.slice(0, 2000);
  const para = paragraphs.find((p) => !/patří do kategorie/i.test(p));
  if (para) return para.slice(0, 2000);
  if (product.summary && !/patří do kategorie|Produkty v kategorii/i.test(product.summary)) {
    return product.summary.slice(0, 2000);
  }
  return product.description;
}

async function fetchProductHtml(solutionSlug, groupSlug, productSlug) {
  const baseSlug = solutionUrlMap[solutionSlug] ?? solutionSlug;
  const urls = [
    `https://sunblinds.cz/${baseSlug}/${groupSlug}/${productSlug}`,
    `https://www.sunblinds.cz/${baseSlug}/${groupSlug}/${productSlug}`,
    `https://sunblinds.cz/${solutionSlug}/${groupSlug}/${productSlug}`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "SunBlinds-enrich/2.0" } });
      if (res.ok) return { html: await res.text(), url };
    } catch {
      /* try next */
    }
  }
  return null;
}

async function enrichProduct(solutionSlug, groupSlug, product) {
  if (SKIP_SLUGS.has(product.slug) || /zobrazit všechny/i.test(product.name)) {
    return product;
  }

  const fetched = await fetchProductHtml(solutionSlug, groupSlug, product.slug);
  if (!fetched) {
    console.warn(`Skip (404): ${solutionSlug}/${groupSlug}/${product.slug}`);
    const specs = product.specs ?? [];
    return {
      ...product,
      description: buildDescription("", [], product),
      textBlocks: buildTextBlocks(product, [], specs),
      features:
        product.features.some((f) => !GENERIC_FEATURES.includes(f)) && product.features.length
          ? product.features
          : buildFeatures(specs),
    };
  }

  const { html, url } = fetched;
  const meta = extractMetaDescription(html);
  const paragraphs = extractParagraphs(html);
  const specs = extractSpecs(html);
  const mergedSpecs = specs.length ? specs : product.specs;
  const description = buildDescription(meta, paragraphs, product);
  const textBlocks = buildTextBlocks(product, paragraphs, mergedSpecs);
  const features = buildFeatures(mergedSpecs);

  console.log(`OK ${url.split(".cz")[1]} — ${description.slice(0, 60)}…`);

  return {
    ...product,
    summary: meta?.slice(0, 500) || product.summary,
    description,
    specs: mergedSpecs.length ? mergedSpecs : product.specs,
    features: features.length ? features : product.features,
    textBlocks,
  };
}

const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
let count = 0;

for (const solution of catalog) {
  for (const group of solution.productGroups) {
    for (let pi = 0; pi < group.products.length; pi++) {
      if (count >= limit) break;
      group.products[pi] = await enrichProduct(solution.slug, group.slug, group.products[pi]);
      count++;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

await writeFile(catalogPath, JSON.stringify(catalog, null, 2), "utf8");
console.log(`Done. Enriched ${count} products.`);
