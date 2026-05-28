/** Sdílené parametry pro next/image — správné sizes = menší payload, ostřejší zobrazení */
export const IMG_QUALITY = 82;

export const imgSizes = {
  /** Hero na celou šířku (max ~960 px fyzicky) */
  hero: "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 960px",
  /** Pravý sloupec split layoutu (~7/12 gridu) */
  pageSplit: "(max-width: 1024px) 100vw, 640px",
  /** Levý sloupec split layoutu (~5/12) */
  pageSplitNarrow: "(max-width: 1024px) 100vw, 480px",
  /** Polovina max-w-6xl kontejneru */
  half: "(max-width: 1024px) 100vw, 560px",
  /** Katalog — 3 sloupce */
  catalogThird: "(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 360px",
  /** Katalog — 2 sloupce */
  catalogHalf: "(max-width: 768px) 50vw, 400px",
  /** Dlaždice produktu ve skupině */
  productTile: "(max-width: 640px) 45vw, 280px",
  /** Karusel karta */
  carouselCard: "320px",
  relatedCard: "360px",
  /** Inspirace — mřížka */
  inspiration: "(max-width: 768px) 50vw, 400px",
  thumb: "80px",
  searchThumb: "56px",
  /** Full-width banner pod headerem */
  siteBanner: "100vw",
  /** Showroom Libuš — celá šířka obsahu (nativně 1024 px) */
  showroomPhoto: "(max-width: 1100px) 100vw, 1024px",
} as const;

/** CSS třídy pro typické CMS obrázky */
export const imgClass = {
  /** Fotografie, lifestyle */
  photo: "object-cover",
  /** Produktové PNG / rendery na bílém pozadí */
  product: "object-contain p-3 sm:p-4",
} as const;
