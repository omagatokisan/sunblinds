const url = process.argv[2] || "https://sunblinds.cz/samonosne-systemy/venkovni-stineni/rovo";
const h = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
const imgs = [...h.matchAll(/src=["']([^"']+)["']/gi)].map((m) => m[1]);
const filtered = imgs.filter((s) => /produkt|slider|images/i.test(s) && !/logo|ico|menu|icon/i.test(s));
console.log([...new Set(filtered)].join("\n"));
