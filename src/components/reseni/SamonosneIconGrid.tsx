import Link from "next/link";

const categories = [
  {
    title: "Venkovní rolety",
    description: "Samonosné rolety Rovo pro montáž bez stavební přípravy.",
    href: "/reseni/samonosne-systemy/venkovni-stineni/rovo",
    icon: RollerIcon,
  },
  {
    title: "Screenové rolety",
    description: "Screenové systémy Zivo — světlo, výhled a tepelná ochrana.",
    href: "/reseni/samonosne-systemy/venkovni-stineni/zivo",
    icon: ScreenIcon,
  },
  {
    title: "Venkovní žaluzie",
    description: "Samonosné žaluzie Rafe pro přesné stínění fasády.",
    href: "/reseni/samonosne-systemy/venkovni-stineni/rafe",
    icon: BlindIcon,
  },
  {
    title: "Předokenní systémy",
    description: "Parapetní a předokenní řešení pro dodatečnou montáž.",
    href: "/reseni/samonosne-systemy/parapetni-systemy/parapetni-systemy",
    icon: FacadeIcon,
  },
];

export function SamonosneIconGrid() {
  return (
    <div className="panel-grid">
      {categories.map((cat) => (
        <Link key={cat.title} href={cat.href} className="panel-tile">
          <span className="panel-tile-icon">
            <cat.icon />
          </span>
          <h3 className="mt-4 font-display text-lg text-ink">{cat.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{cat.description}</p>
          <span className="link-arrow mt-4 inline-flex text-sm">Detail produktu</span>
        </Link>
      ))}
    </div>
  );
}

function RollerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
      <rect x="8" y="10" width="32" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 16v18M36 16v18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 34h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ScreenIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
      <rect x="10" y="12" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 20h28M10 28h28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function BlindIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
      <path d="M8 14h32M8 20h32M8 26h32M8 32h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 14v18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FacadeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
      <rect x="14" y="10" width="20" height="28" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 38h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 18h8v12h-8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
