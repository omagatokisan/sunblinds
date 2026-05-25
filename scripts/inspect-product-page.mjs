const url = process.argv[2] || "https://sunblinds.cz/samonosne-systemy/venkovni-stineni/rovo";
const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const h = await res.text();
console.log("status", res.status, "len", h.length);
const meta = h.match(/name="description"\s+content="([^"]+)"/i)?.[1];
console.log("meta:", meta?.slice(0, 400));
const h2 = [...h.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map((m) =>
  m[1].replace(/<[^>]+>/g, "").trim()
);
console.log("headings:", h2);
const ps = [...h.matchAll(/<p[^>]*>([\s\S]{40,1200}?)<\/p>/gi)]
  .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
  .filter((t) => t.length > 50 && !/cookie|copyright|poptávku|showroom barev/i.test(t));
console.log("paragraphs:", ps.slice(0, 6));
