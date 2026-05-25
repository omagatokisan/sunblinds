export type AreaBentoLayout = "hero-side" | "duo-equal" | "split-offset" | "single-wide";

export type AreaBentoGroupDef = {
  id: string;
  title: string;
  description: string;
  layout: AreaBentoLayout;
  slugs: string[];
};

export const AREA_BENTO_GROUPS: AreaBentoGroupDef[] = [
  {
    id: "venkovni",
    title: "Venkovní stínění fasády",
    description: "Samonosné systémy, rolety a žaluzie — montáž bez stavební přípravy v překladu.",
    layout: "hero-side",
    slugs: ["samonosne-systemy", "venkovni-stineni"],
  },
  {
    id: "interier",
    title: "Interiér a pohodlí",
    description: "Textilní stínění, žaluzie a sítě pro klid doma i v kanceláři.",
    layout: "duo-equal",
    slugs: ["interierove-stineni", "site-proti-hmyzu"],
  },
  {
    id: "otvory",
    title: "Okna, dveře a garáž",
    description: "Výplně otvorů sladěné s fasádou, stíněním a každodenním provozem.",
    layout: "split-offset",
    slugs: ["okna-a-dvere", "garazova-vrata"],
  },
  {
    id: "exterier",
    title: "Terasa a venkovní život",
    description: "Markýzy, pergoly a stínění teras podle orientace a využití zahrady.",
    layout: "single-wide",
    slugs: ["stineni-teras"],
  },
];
