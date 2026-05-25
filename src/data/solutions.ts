export type SolutionLine = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  heroImage: string;
  intro: string;
  benefits: string[];
  lines: { name: string; description: string }[];
  idealFor: string[];
};

export const solutions: SolutionLine[] = [
  {
    slug: "venkovni-stineni",
    title: "Venkovní stínění",
    shortTitle: "Venkovní",
    summary: "Žaluzie, rolety a screeny pro kontrolu světla, tepla a soukromí.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    intro:
      "Venkovní stínění chrání interiér před přehříváním, zvyšuje soukromí a dotváří architekturu domu. Navrhujeme systém podle orientace fasády, velikosti oken a způsobu ovládání.",
    benefits: [
      "Nižší tepelná zátěž v létě",
      "Sladění s barvou fasády",
      "Ruční i motorické ovládání",
      "Zaměření a servis z jedné dílny",
    ],
    lines: [
      {
        name: "Venkovní žaluzie",
        description: "Přesná regulace světla, vhodné pro rodinné domy i větší objekty.",
      },
      {
        name: "Screenové rolety",
        description: "Elegantní řešení velkých prosklených ploch s důrazem na komfort.",
      },
      {
        name: "Venkovní rolety",
        description: "Spolehlivé zastínění, vyšší soukromí a ochrana oken.",
      },
      {
        name: "Parapetní systémy",
        description: "Diskrétní provedení integrované do fasády.",
      },
    ],
    idealFor: ["Rodinné domy", "Novostavby", "Rekonstrukce s velkými okny"],
  },
  {
    slug: "interierove-stineni",
    title: "Interiérové stínění",
    shortTitle: "Interiér",
    summary: "Žaluzie, roletky a plisé pro pohodlí, soukromí a atmosféru místnosti.",
    heroImage:
      "https://images.unsplash.com/photo-1616046227288-0f76c8389b8c?w=1600&q=80",
    intro:
      "Interiérové stínění má být funkční i vizuálně sladěné s prostorem. Pomůžeme vybrat typ, látku a ovládání podle místnosti a způsobu používání.",
    benefits: [
      "Široký výběr látek a barev",
      "Řešení den / noc",
      "Montáž do rámu i nad otvor",
      "Ukázky materiálů ve showroomu",
    ],
    lines: [
      {
        name: "Horizontální žaluzie",
        description: "Nejrozšířenější volba pro běžná okna s jednoduchým ovládáním.",
      },
      {
        name: "Textilní roletky",
        description: "Čistý vzhled a dekorativní efekt s praktickým stíněním.",
      },
      {
        name: "Rolety den / noc",
        description: "Dvě vrstvy látky pro flexibilní regulaci světla během dne.",
      },
      {
        name: "Plisé žaluzie",
        description: "Vhodné pro atypická okna a složité tvary.",
      },
      {
        name: "Vertikální žaluzie",
        description: "Ideální pro velké prosklené stěny a posuvné systémy.",
      },
    ],
    idealFor: ["Byty", "Rodinné domy", "Kanceláře a recepce"],
  },
  {
    slug: "stineni-teras",
    title: "Stínění teras",
    shortTitle: "Terasy",
    summary: "Pergoly a markýzy pro pohodlnější venkovní život.",
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    intro:
      "Terasa musí fungovat v běžném provozu — nejen vypadat dobře. Navrhujeme stínění podle orientace, větru a návaznosti na fasádu.",
    benefits: [
      "Návrh podle orientace ke slunci",
      "Boční stínění tam, kde je potřeba",
      "Sladění konstrukce s domem",
      "Osobní konzultace na místě",
    ],
    lines: [
      {
        name: "Hliníkové pergoly",
        description: "Stabilní řešení s dlouhou životností a čistým vzhledem.",
      },
      {
        name: "Výsuvné markýzy",
        description: "Praktické zastínění posezení bez trvalého zastřešení.",
      },
      {
        name: "Výklopné markýzy",
        description: "Vhodné tam, kde je potřeba větší výsuv a krytí.",
      },
      {
        name: "Markýzy volně stojící",
        description: "Pro místa bez možnosti kotvení do fasády.",
      },
    ],
    idealFor: ["Zahrady", "Balkony", "Restaurace a komerční terasy"],
  },
  {
    slug: "okna-a-dvere",
    title: "Okna a dveře",
    shortTitle: "Okna",
    summary: "Výplně otvorů sladěné s domem, stíněním a technickými požadavky.",
    heroImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd7a?w=1600&q=80",
    intro:
      "Okna a dveře ovlivňují komfort, vzhled fasády i budoucí montáž stínění. Doporučujeme je řešit včas a v souvislosti s dalšími prvky domu.",
    benefits: [
      "Výběr vhodného profilu",
      "Barevné sladění s fasádou",
      "Návaznost na stínění",
      "Zaměření a montáž",
    ],
    lines: [
      {
        name: "Okna",
        description: "Profily a provedení podle typu stavby a požadavků na komfort.",
      },
      {
        name: "Vchodové dveře",
        description: "Spolehlivý a viditelný prvek domu s důrazem na bezpečnost.",
      },
      {
        name: "HS portály",
        description: "Velké průchody na terasu včetně návaznosti na stínění.",
      },
    ],
    idealFor: ["Novostavby", "Komplexní rekonstrukce", "Výměna výplní"],
  },
  {
    slug: "site-proti-hmyzu",
    title: "Sítě proti hmyzu",
    shortTitle: "Sítě",
    summary: "Rámové, plisé a rolovací sítě pro okna i dveře.",
    heroImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    intro:
      "Sítě proti hmyzu umožní větrat bez kompromisů. Nabízíme provedení pro běžná okna, posuvné systémy i vstupní dveře.",
    benefits: [
      "Pevné i snímatelné provedení",
      "Řešení pro posuvné portály",
      "Barevné sladění profilů",
      "Servis a výměna sítoviny",
    ],
    lines: [
      {
        name: "Okenní sítě",
        description: "Rámové systémy pro standardní i atypická okna.",
      },
      {
        name: "Dveřní sítě",
        description: "Plisé, posuvné a rolovací varianty pro vstupy.",
      },
      {
        name: "Rolovací a posuvné sítě",
        description: "Praktické řešení tam, kde je potřeba úspora místa.",
      },
    ],
    idealFor: ["Rodinné domy", "Chaty", "Objekty s častým větráním"],
  },
  {
    slug: "samonosne-systemy",
    title: "Samonosné systémy",
    shortTitle: "Samonosné",
    summary: "Venkovní rolety a žaluzie bez nutnosti stavební přípravy v překladu.",
    heroImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa8a6c3?w=1600&q=80",
    intro:
      "Samonosné systémy jsou vhodné, když chcete kvalitní venkovní stínění bez zásahu do fasády v překladu. Poradíme vhodný typ podle okna a provozu.",
    benefits: [
      "Montáž na fasádu",
      "Vhodné pro dodatečnou instalaci",
      "Motorizace na vyžádání",
      "Jednotný vzhled s domem",
    ],
    lines: [
      {
        name: "Samonosné rolety",
        description: "Spolehlivé zastínění s kompaktním boxem.",
      },
      {
        name: "Samonosné screeny",
        description: "Jemná regulace světla u velkých ploch.",
      },
      {
        name: "Samonosné žaluzie",
        description: "Přesné stínění s výrazným architektonickým efektem.",
      },
    ],
    idealFor: ["Rekonstrukce", "Dodatečná montáž", "Rodinné domy"],
  },
  {
    slug: "garazova-vrata",
    title: "Garážová vrata",
    shortTitle: "Garáž",
    summary: "Sekční a rolovací vrata s důrazem na spolehlivost a bezpečný provoz.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
    intro:
      "Garážová vrata jsou každodenní součást domu. Pomůžeme vybrat typ, provedení a ovládání podle dispozice garáže a stylu domu.",
    benefits: [
      "Sekční i rolovací provedení",
      "Tichý a spolehlivý pohon",
      "Bezpečnostní prvky",
      "Servis a seřízení",
    ],
    lines: [
      {
        name: "Sekční vrata",
        description: "Nejčastější volba pro rodinné domy a větší otvory.",
      },
      {
        name: "Rolovací vrata",
        description: "Kompaktní řešení tam, kde je omezený prostor.",
      },
    ],
    idealFor: ["Rodinné domy", "Dvojgaráže", "Menší průmyslové objekty"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export const processSteps = [
  {
    step: "01",
    title: "Konzultace",
    text: "Projdeme vaše potřeby, typ stavby a očekávaný výsledek — osobně nebo online.",
  },
  {
    step: "02",
    title: "Zaměření",
    text: "Podle rozsahu přijedeme na místo a ověříme technické možnosti montáže.",
  },
  {
    step: "03",
    title: "Návrh",
    text: "Doporučíme produkt, provedení, ovládání a sladění s fasádou nebo interiérem.",
  },
  {
    step: "04",
    title: "Realizace a servis",
    text: "Zajistíme montáž a zůstaneme k dispozici pro servis a následnou péči.",
  },
] as const;

export const pillars = [
  {
    title: "Jeden dodavatel, přehledné řešení",
    text: "Stínění, okna, sítě i servis na jednom místě — méně koordinace pro vás.",
  },
  {
    title: "Showroom v Praze",
    text: "Materiály a systémy si můžete porovnat naživo před rozhodnutím.",
  },
  {
    title: "Technická jistota",
    text: "Zaměření, montáž i servis řeší tým, který produkty zná do detailu.",
  },
] as const;
