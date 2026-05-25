import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "..", "main", "homepage.html");
const out = path.join(root, "src", "lib", "cms", "catalog.generated.json");

const html = readFileSync(source, "utf8");
const SB = "https://sunblinds.cz";

const subItems = [...html.matchAll(/<li class='sub-item' data-target='([^']+)'><a href='\/([^']+)'>([^<]+)<\/a><\/li>/g)];
const details = [...html.matchAll(/<ul id='([^']+)' class='detail-list'>([\s\S]*?)<\/ul>/g)];

const solutionMap = {
  "venkovni-stineni": "venkovni-stineni",
  "interierove-stineni": "interierove-stineni",
  "stineni-teras": "stineni-teras",
  "vyplne-otvoru": "okna-a-dvere",
  "site-proti-hmyzu": "site-proti-hmyzu",
  "samonosne-systemy": "samonosne-systemy",
};

const garazGroups = new Set(["sekcni-garazova-vrata", "rolovaci-garazova-vrata"]);

const groupMeta = new Map();
for (const m of subItems) {
  const [, target, href, name] = m;
  const parts = href.split("/");
  const solutionKey = parts[0];
  const groupSlug = parts[1];
  if (!solutionMap[solutionKey] && !garazGroups.has(groupSlug)) continue;
  groupMeta.set(target, {
    solutionSlug: garazGroups.has(groupSlug) ? "garazova-vrata" : solutionMap[solutionKey],
    slug: groupSlug,
    name,
    href,
  });
}

function slugFromHref(href) {
  return href.split("/").pop() ?? href;
}

const solutions = new Map();

for (const m of details) {
  const [, target, body] = m;
  const meta = groupMeta.get(target);
  if (!meta) continue;

  const products = [...body.matchAll(/data-image='([^']*)'[^>]*><a href='\/([^']+)'(?: class='all_products')?>([^<]+)<\/a>/g)]
    .filter(([, , href]) => !href.includes("all_products"))
    .map(([, image, href, name]) => ({
      slug: slugFromHref(href),
      name: name.trim(),
      summary: `${name.trim()} — řešení z nabídky SunBlinds.`,
      description: `${name.trim()} patří do kategorie ${meta.name}. Pro přesné parametry a montáž doporučujeme konzultaci nebo zaměření na místě.`,
      image: image.startsWith("http") ? image : `${SB}${image}`,
      features: ["Individuální zaměření", "Montáž a servis", "Sladění s objektem"],
      textBlocks: [],
      specs: [],
    }));

  if (!products.length) continue;

  if (!solutions.has(meta.solutionSlug)) {
    solutions.set(meta.solutionSlug, { slug: meta.solutionSlug, productGroups: [] });
  }

  const firstImg = products[0]?.image ?? "";
  solutions.get(meta.solutionSlug).productGroups.push({
    slug: meta.slug,
    name: meta.name,
    summary: `Produkty v kategorii ${meta.name}.`,
    image: firstImg,
    products,
  });
}

const catalog = [...solutions.values()];
mkdirSync(path.dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(catalog, null, 2), "utf8");
console.log(`Wrote ${catalog.length} solutions, ${catalog.reduce((n, s) => n + s.productGroups.length, 0)} groups to catalog.generated.json`);
