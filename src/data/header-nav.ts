import { company } from "@/data/company";

export type HeaderTextLink = {
  href: string;
  label: string;
  description?: string;
};

export type HeaderNavItem = {
  id: string;
  href: string;
  label: string;
  match: (pathname: string) => boolean;
  intro?: string;
  items?: HeaderTextLink[];
};

export const HEADER_NAV: HeaderNavItem[] = [
  {
    id: "reseni",
    href: "/reseni",
    label: "Řešení",
    match: (p) => p.startsWith("/reseni"),
    intro: "Venkovní i interiérové stínění, okna a související systémy — přehledně podle oblasti.",
  },
  {
    id: "showroom",
    href: "/showroom",
    label: "Showroom",
    match: (p) => p.startsWith("/showroom"),
    intro: "Vzorky látek, profilů a systémů naživo v Praze-Libuši.",
    items: [
      {
        href: "/showroom",
        label: "Showroom Praha – Libuš",
        description: "Adresa, provoz a mapa",
      },
      {
        href: "/showroom",
        label: "Vzorky látek",
        description: "Interiérové stínění naživo",
      },
      {
        href: "/showroom",
        label: "Venkovní systémy",
        description: "Žaluzie, rolety a screeny",
      },
      {
        href: "/kontakt",
        label: "Domluvit návštěvu",
        description: "Preferujeme předchozí termín",
      },
    ],
  },
  {
    id: "servis",
    href: "/servis",
    label: "Servis",
    match: (p) => p.startsWith("/servis"),
    intro: "Záruční i pozáruční servis od jednoho týmu.",
    items: [
      {
        href: "/servis",
        label: "Stínící technika",
        description: "Rolety, žaluzie, markýzy a screeny",
      },
      {
        href: "/servis",
        label: "Okna a dveře",
        description: "Seřízení, těsnění a kování",
      },
      {
        href: "/servis",
        label: "Pergoly",
        description: "Lamely, pohony a boční stínění",
      },
      {
        href: "/poptavka",
        label: "Nahlásit závadu",
        description: "Rychlá poptávka servisního zásahu",
      },
    ],
  },
  {
    id: "kontakt",
    href: "/kontakt",
    label: "Kontakt",
    match: (p) => p.startsWith("/kontakt") || p.startsWith("/poptavka"),
    intro: "Telefon, e-mail nebo formulář — odpovíme co nejdříve.",
    items: [
      {
        href: "/kontakt",
        label: "Kontaktní formulář",
        description: company.email,
      },
      {
        href: "/poptavka",
        label: "Nezávazná poptávka",
        description: "Produkt, rozměry a poznámka",
      },
      {
        href: "/showroom",
        label: company.address.label,
        description: `${company.address.street}, ${company.address.city}`,
      },
      {
        href: company.phoneHref,
        label: company.phone,
        description: company.hours,
      },
    ],
  },
  {
    id: "o-nas",
    href: "/o-nas",
    label: "O nás",
    match: (p) =>
      p.startsWith("/o-nas") || p.startsWith("/recenze") || p.startsWith("/ochrana-osobnich-udaju"),
    intro: `${company.name} — ${company.tagline}`,
    items: [
      {
        href: "/o-nas",
        label: "O společnosti",
        description: "Kdo jsme a jak pracujeme",
      },
      {
        href: "/recenze",
        label: "Recenze zákazníků",
        description: "Reference od reálných zakázek",
      },
      {
        href: "/o-nas#spoluprace",
        label: "Jak spolupracujeme",
        description: "Od konzultace po montáž",
      },
      {
        href: "/ochrana-osobnich-udaju",
        label: "Ochrana údajů",
        description: "Zásady zpracování osobních údajů",
      },
    ],
  },
];
