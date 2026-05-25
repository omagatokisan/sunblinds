/**
 * Extract product image from sunblinds.cz product page.
 * Usage: node scripts/extract-product-image.mjs <url>
 */
const url = process.argv[2];
const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const h = await res.text();

const og = h.match(/property="og:image"\s+content="([^"]+)"/i)?.[1];
const imgs = [...h.matchAll(/<img[^>]+src="(\/images\/produkt[^"]+)"/gi)].map((m) => m[1]);
const imgs2 = [...h.matchAll(/src="(https:\/\/[^"]*sunblinds[^"]*\/images\/produkt[^"]+)"/gi)].map((m) => m[1]);
const mainImg = h.match(/class="[^"]*product[^"]*"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/i)?.[1];

console.log("status", res.status);
console.log("og:", og);
console.log("produkt imgs:", [...new Set([...imgs, ...imgs2])].slice(0, 5));
console.log("main:", mainImg);

// Also look for large product images
const big = [...h.matchAll(/src="(\/images\/produkt\/[^"]+)"/gi)].map((m) => "https://sunblinds.cz" + m[1]);
console.log("all produkt:", [...new Set(big)].slice(0, 8));
