import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const contentPath = path.join(process.cwd(), "data", "cms", "content.json");

const PRODUCT_COPY = {
  rovo: {
    summary:
      "Samonosné venkovní rolety pro fasádu bez přípravy v překladu. Pancíř se po montáži zasadí do boxu na fasádě — typické řešení při rekonstrukci, kde už není přístup do ostění. Šířka až 4 m, ovládání pásek, klika nebo motor.",
    description:
      "Rovo je samonosný roletový systém pro montáž na fasádu. Box a vodící lišty drží na stěně, stavební příprava v překladu není potřeba. U rodinných domů a rekonstrukcí volíme Rovo tam, kde potřebujete zatemnění a ochranu fasády bez rozsáhlých stavebních úprav. Rozměry ověřujeme při zaměření — typicky do 4000 × 4370 mm.",
  },
  zivo: {
    summary:
      "Screenová samonosná roleta s tenkým profilem — světlo projde, teplo a odlesky výrazně omezí. Vhodná pro velká okna na jih a západ, kde nechcete zatemnit interiér. Montáž na fasádu bez úpravy překladu.",
    description:
      "Zivo je screenový systém s průhlednou látkou a samonosnou konstrukcí na fasádě. Oproti roletovému pancíři ponechá výhled a denní světlo, ale sníží solární zisk. Doporučujeme ho na prosklené plochy orientované na jih a západ. Ovládání ruční nebo motorické, barvy dle RAL — vzorník v showroomu v Libuši.",
  },
  rafe: {
    summary:
      "Venkovní žaluzie se samonosným vedením lamel — přesná regulace světla a soukromí bez boxu v překladu. Volba tam, kde potřebujete lamely spíš než roletový pancíř nebo screen.",
    description:
      "Rafe je samonosný systém venkovních žaluzií montovaný na fasádu. Lamelou nastavíte světlost i soukromí po celý den — na rozdíl od rolety nejde o plné zatemnění. Instalace bez stavební přípravy v ostění, vhodná pro dodatečnou montáž u rekonstrukcí. Technické limity ověříme na místě při zaměření.",
  },
};

function patchProducts(solutions) {
  for (const solution of solutions) {
    for (const group of solution.productGroups ?? []) {
      if (group.summary?.startsWith("Produkty v kategorii")) {
        group.summary = `${group.name} — přehled modelů s parametry a možnostmi montáže.`;
      }
      for (const product of group.products ?? []) {
        const patch = PRODUCT_COPY[product.slug];
        if (patch) {
          product.summary = patch.summary;
          product.description = patch.description;
        }
      }
    }
  }
}

const raw = await readFile(contentPath, "utf8");
const content = JSON.parse(raw);

content.home = {
  heroTitle: "Stínění a okna — zaměření, montáž i servis z Libuše",
  heroLead:
    "Venkovní i interiérové stínění, výplně otvorů a garážová vrata. Poradíme na místě nebo v showroomu, připravíme nabídku a realizaci zajistí náš tým.",
  solutionsTitle: "Vyberte oblast, kterou řešíte",
  solutionsDescription:
    "Každá kategorie vede na konkrétní produkty s parametry montáže. Nevíte, kam zařadit váš požadavek? Zavolejte — upřesníme to za pár minut.",
  whyTitle: "Proč řešit stínění u nás",
  responseTime: "V pracovní dny voláme zpět do 24 hodin.",
};

content.showroom = {
  ...content.showroom,
  intro:
    "V Libuši máme vzorky látek, profily oken a ukázky venkovních systémů. Návštěvu si domluvte předem — připravíme podklady podle vašeho projektu.",
  heroImage: "https://sunblinds.cz/images/slider_2/slide2/textilni_roletky.webp",
};

content.contact = {
  heroTitle: "Kontakt a showroom",
  heroLead:
    "Telefon je nejrychlejší cesta k odpovědi. Showroom navštivte po domluvě — Po–Pá 9:00–17:00.",
  formTitle: "Napište nám",
  formLead: "Odpovíme v pracovní dny, obvykle do 24 hodin. U konkrétního produktu použijte poptávkový formulář.",
};

content.servisPage = {
  ...content.servisPage,
  intro:
    "Opravujeme a seřizujeme stínící techniku, okna, dveře, pergoly i garážová vrata — záručně i po záruce. Po nahlášení projdeme rozsah, domluvíme termín a na místě doladíme detaily.",
};

content.pillars = [
  {
    id: "pl-focus",
    title: "Samonosné systémy a kompletní realizace",
    text: "Od zaměření po montáž a servis — jeden tým, jedna odpovědnost.",
  },
  {
    id: "pl-showroom",
    title: "Showroom v Praze-Libuši",
    text: "Látky, profily a systémy si porovnáte naživo před objednávkou.",
  },
  {
    id: "pl-service",
    title: "Servis po montáži",
    text: "Seřízení, opravy a modernizace — i u techniky, kterou jsme dodali jinde, po posouzení.",
  },
];

content.processSteps = [
  {
    id: "ps-1",
    step: "01",
    title: "Hovor nebo návštěva",
    text: "Projdeme typ stavby, rozměry a představu. Doporučíme, zda stačí showroom nebo je potřeba zaměření.",
  },
  {
    id: "ps-2",
    step: "02",
    title: "Zaměření",
    text: "Technik ověří stav otvorů, fasády a možnosti vedení kabeláže. U samonosných systémů kontrolujeme nosnost a přístup.",
  },
  {
    id: "ps-3",
    step: "03",
    title: "Nabídka",
    text: "Do týdne obvykle dodáme cenovou nabídku s typem montáže, barvou a ovládáním.",
  },
  {
    id: "ps-4",
    step: "04",
    title: "Montáž a servis",
    text: "Realizaci domluvíme v termínu. Po instalaci zůstáváme k dispozici pro seřízení a opravy.",
  },
];

content.faq = [
  {
    id: "faq-1",
    question: "Musím nejdřív přijet do showroomu?",
    answer:
      "Ne. U jednoduchých dotazů stačí telefon. Showroom doporučujeme, když vybíráte látky, barvy nebo porovnáváte více systémů najednou.",
  },
  {
    id: "faq-2",
    question: "Jak rychle dostanu nabídku?",
    answer:
      "Po zaměření obvykle do pěti pracovních dnů. U menších zakázek, kde stačí rozměry z projektu, může být orientační cena i dříve.",
  },
  {
    id: "faq-3",
    question: "Montujete i na starší dům bez přípravy v překladu?",
    answer:
      "Ano — samonosné systémy Rovo, Zivo a Rafe montujeme na fasádu bez stavební úpravy ostění. Vhodnost ověříme při zaměření.",
  },
  {
    id: "faq-4",
    question: "Kdy zvolit Rovo a kdy Zivo?",
    answer:
      "Rovo je roletový pancíř pro zatemnění a ochranu okna. Zivo je screen — propouští světlo, ale omezuje teplo a odlesky. Poradíme podle orientace oken a toho, jak místnost používáte.",
  },
  {
    id: "faq-5",
    question: "Děláte i servis cizí montáže?",
    answer:
      "Ano, po posouzení typu a stavu techniky. U některých značek potřebujeme znát model a rok instalace — napište do poptávky nebo zavolejte.",
  },
  {
    id: "faq-6",
    question: "Kam dojíždíte?",
    answer:
      "Zaměření a montáž řešíme v Praze a okolí. U větších projektů i po domluvě dál — upřesníme po prvním kontaktu.",
  },
];

content.references = [
  {
    id: "ref-1",
    title: "Rekonstrukce rodinného domu",
    location: "Praha-západ",
    scope: "Samonosné rolety Rovo, 12 oken",
    text: "Fasáda bez přípravy v překladu — boxy na omítce, barva RAL podle omítky. Montáž proběhla za tři dny, motorické ovládání v obýváku.",
    image: "https://sunblinds.cz/images/slider_1/big/rovo_2.png",
  },
  {
    id: "ref-2",
    title: "Novostavba s velkým prosklením",
    location: "Říčany",
    scope: "Screeny Zivo, interiérové rolety",
    text: "Na jižní stranu screeny kvůli přehřívání, do ložnic textilní rolety. V showroomu jsme sladili látky s podlahou a radiátory.",
    image: "https://sunblinds.cz/images/slider_2/slide1/screenove_rolety.webp",
  },
  {
    id: "ref-3",
    title: "Bytový dům — servisní zásah",
    location: "Praha 6",
    scope: "Seřízení venkovních rolet",
    text: "Držáky a vedení po letech povolily. Seřízení a výměna dílů bez demontáže boxů — zásah druhý den po nahlášení.",
    image: "https://sunblinds.cz/images/slider_2/slide2/textilni_roletky.webp",
  },
];

patchProducts(content.solutions);

await writeFile(contentPath, JSON.stringify(content, null, 2), "utf8");
console.log("Content rework applied to data/cms/content.json");
