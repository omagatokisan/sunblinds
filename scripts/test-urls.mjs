const urls = [
  "https://sunblinds.cz/interierove-stineni/textilni-roletky/jazz-17",
  "https://sunblinds.cz/stineni-teras/markyzy-vysuvne/alanis",
  "https://sunblinds.cz/vyplne-otvoru/okna/heluz",
  "https://sunblinds.cz/site-proti-hmyzu/pevne-okenni-site-ramove/okno",
];
for (const url of urls) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const meta = (await res.text()).match(/name="description"\s+content="([^"]+)"/i)?.[1];
  console.log(res.status, url.split(".cz/")[1], meta?.slice(0, 80) ?? "NO META");
}
