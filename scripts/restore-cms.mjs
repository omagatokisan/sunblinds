/**
 * Restore content.json from defaultContent + enriched catalog (safe atomic write).
 * Usage: npm run restore-cms
 */
import { readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const contentPath = path.join(root, "data/cms/content.json");
const catalogPath = path.join(root, "src/lib/cms/catalog.generated.json");

const { defaultContent } = await import(
  pathToFileURL(path.join(root, "src/lib/cms/default-content.ts")).href
);

const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const catalogBySlug = Object.fromEntries(catalog.map((s) => [s.slug, s.productGroups]));

const content = structuredClone(defaultContent);
for (const solution of content.solutions) {
  const groups = catalogBySlug[solution.slug];
  if (groups) solution.productGroups = groups;
}
content.version = 3;

const tmp = `${contentPath}.tmp`;
await writeFile(tmp, JSON.stringify(content, null, 2), "utf8");
JSON.parse(await readFile(tmp, "utf8"));
await rename(tmp, contentPath);
console.log(`Restored content.json (${content.solutions.length} solutions, catalog merged).`);
