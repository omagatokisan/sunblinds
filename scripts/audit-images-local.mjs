import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync("src/lib/cms/catalog.generated.json", "utf8"));
const byImage = new Map();
const issues = [];

for (const sol of catalog) {
  for (const grp of sol.productGroups) {
    for (const p of grp.products) {
      const key = p.image;
      if (!byImage.has(key)) byImage.set(key, []);
      byImage.get(key).push(`${sol.slug}/${grp.slug}/${p.slug} — ${p.name}`);

      if (/all_products|placeholder|default/i.test(p.image)) {
        issues.push({ type: "placeholder", path: `${sol.slug}/${grp.slug}/${p.slug}`, name: p.name, image: p.image });
      }
    }
  }
}

console.log("=== Shared images (same URL, multiple products) ===");
for (const [img, products] of byImage) {
  if (products.length > 1) {
    console.log(`\n${img} (${products.length}x)`);
    products.forEach((p) => console.log("  ", p));
  }
}

console.log("\n=== Placeholder images ===");
issues.forEach((i) => console.log(i));

console.log("\nTotal unique images:", byImage.size);
