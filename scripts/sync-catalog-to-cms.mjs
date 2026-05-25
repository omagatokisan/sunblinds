/**
 * Sync enriched product data from catalog.generated.json into content.json
 */
import { readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const catalog = JSON.parse(
  await readFile(path.join(root, "src/lib/cms/catalog.generated.json"), "utf8")
);
const contentPath = path.join(root, "data/cms/content.json");

let contentRaw = await readFile(contentPath, "utf8");
if (!contentRaw.trim()) {
  console.error("content.json is empty — run: node scripts/restore-cms.mjs");
  process.exit(1);
}

const content = JSON.parse(contentRaw);
const catalogBySlug = Object.fromEntries(catalog.map((s) => [s.slug, s.productGroups]));

for (const solution of content.solutions) {
  const groups = catalogBySlug[solution.slug];
  if (!groups) continue;
  solution.productGroups = groups;
}

content.version = 3;
const tmp = `${contentPath}.tmp`;
const serialized = JSON.stringify(content, null, 2);
await writeFile(tmp, serialized, "utf8");
JSON.parse(await readFile(tmp, "utf8"));
await rename(tmp, contentPath);
console.log("Synced product catalog into content.json");
