"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { SunBlindsLogo } from "@/components/layout/SunBlindsLogo";
import { HEADER_NAV, type HeaderNavItem, type HeaderTextLink } from "@/data/header-nav";
import { company } from "@/data/company";
import type { Solution } from "@/lib/cms/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

type StripItem = { href: string; label: string; image: string; description?: string };

export function SiteHeader({ solutions }: { solutions: Solution[] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeMenus = useCallback(() => {
    clearCloseTimer();
    setOpenMenu(null);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 200);
  }, [clearCloseTimer]);

  const openMenuItem = useCallback(
    (id: string) => {
      clearCloseTimer();
      setOpenMenu(id);
    },
    [clearCloseTimer]
  );

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  useEffect(() => {
    setMobileOpen(false);
    closeMenus();
  }, [pathname, closeMenus]);

  const reseniItems = useMemo<StripItem[]>(
    () =>
      solutions.map((s) => ({
        href: `/reseni/${s.slug}`,
        label: s.shortTitle,
        image: s.heroImage,
        description: s.summary,
      })),
    [solutions]
  );

  const navById = useMemo(() => new Map(HEADER_NAV.map((item) => [item.id, item])), []);

  if (pathname.startsWith("/admin")) return null;

  const activeNav = openMenu ? navById.get(openMenu) : undefined;
  const headerClass = ["site-header", "site-header--home"].join(" ");

  const showDrop =
    Boolean(activeNav) &&
    (openMenu === "reseni" ? reseniItems.length > 0 : Boolean(activeNav?.items?.length));

  return (
    <header className={headerClass}>
      <div className="site-header__main">
        <Container width="wide" className="site-header__inner">
          <SunBlindsLogo variant="header" className="shrink-0" />

          <div className="site-header__nav-wrap">
            <nav
              className="flex items-center gap-0.5"
              aria-label="Hlavní navigace"
              onMouseLeave={scheduleClose}
            >
              {HEADER_NAV.map((item) => (
                <div key={item.id} onMouseEnter={() => openMenuItem(item.id)}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    active={item.match(pathname)}
                    open={openMenu === item.id}
                  />
                </div>
              ))}
            </nav>
            <div onMouseEnter={closeMenus} className="header-search-wrap">
              <GlobalSearch
                variant="header"
                className="header-search w-full"
                placeholder="Hledat produkty a stránky…"
              />
            </div>
          </div>

          <div className="site-header__actions">
            <Button href="/poptavka" size="lg" variant="outline-light">
              Poptávka
            </Button>
          </div>

          <div className="header-mobile-actions">
            <a
              href={company.phoneHref}
              className="header-phone-link"
              aria-label={`Zavolat ${company.phone}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6.6 10.8a15.9 15.9 0 006.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.7.7 4.1.7.7 0 1.3.6 1.3 1.3V21c0 .7-.6 1.3-1.3 1.3C10.3 22.3 1.7 13.7 1.7 3.3 1.7 2.6 2.3 2 3 2h3.5c.7 0 1.3.6 1.3 1.3 0 1.4.2 2.8.7 4.1.1.4 0 .9-.3 1.2L6.6 10.8z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Button
              href="/poptavka"
              variant="outline-light"
              className="header-mobile-cta !px-3 !py-2 text-xs"
            >
              Poptávka
            </Button>
            <button
              type="button"
              className="header-menu-pill"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </Container>
      </div>

      {showDrop && activeNav ? (
        <>
          <button
            type="button"
            className="header-drop-backdrop"
            aria-label="Zavřít menu"
            tabIndex={-1}
            onMouseEnter={closeMenus}
            onClick={closeMenus}
          />
          <div
            className="header-drop-wrap"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            <div className="header-drop">
              <div
                className="header-drop__inner"
                role="region"
                aria-label={`Menu ${activeNav.label}`}
              >
                <Container width="wide">
                  {openMenu === "reseni" ? (
                    <HeaderReseniPanel menu={activeNav} items={reseniItems} />
                  ) : (
                    <HeaderTextPanel menu={activeNav} />
                  )}
                </Container>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {mobileOpen ? (
        <div className="site-header-mobile site-header-mobile--dark lg:hidden">
          <Container width="wide" className="max-h-[70vh] overflow-y-auto py-4">
            <div className="mb-4 px-1">
              <GlobalSearch variant="compact" placeholder="Hledat produkty a stránky…" />
            </div>
            {HEADER_NAV.map((item) => (
              <MobileNavSection
                key={item.id}
                item={item}
                reseniItems={item.id === "reseni" ? reseniItems : undefined}
                onClose={() => setMobileOpen(false)}
              />
            ))}
            <div className="mt-4 px-3">
              <Button href="/poptavka" variant="outline-light" className="w-full justify-center">
                Poptávka
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
  open,
}: {
  href: string;
  label: string;
  active: boolean;
  open?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`nav-link ${active ? "nav-link-active" : ""} ${open ? "nav-link-open" : ""}`}
      aria-expanded={open}
    >
      {label}
    </Link>
  );
}

function HeaderReseniPanel({ menu, items }: { menu: HeaderNavItem; items: StripItem[] }) {
  return (
    <div className="header-text-panel">
      <div className="header-text-intro">
        <p className="header-text-kicker">{menu.label}</p>
        {menu.intro ? <p className="header-text-lead">{menu.intro}</p> : null}
        <Link href={menu.href} className="header-text-all link-arrow">
          Všechna řešení
        </Link>
      </div>
      <HeaderStrip items={items} />
    </div>
  );
}

function HeaderStrip({ items }: { items: StripItem[] }) {
  return (
    <div
      className="header-strip min-w-0 flex-1"
      style={{ "--header-strip-cols": items.length } as CSSProperties}
      role="list"
    >
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          className="header-strip-item group"
          role="listitem"
        >
          <div className="header-strip-thumb">
            <Image
              src={item.image}
              alt=""
              fill
              quality={IMG_QUALITY}
              className={`${imgClass.photo} transition duration-500 group-hover:scale-[1.03]`}
              sizes={imgSizes.productTile}
            />
          </div>
          <span className="header-strip-label">{item.label}</span>
          {item.description ? (
            <span className="header-strip-desc">{item.description}</span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function HeaderTextPanel({ menu }: { menu: HeaderNavItem }) {
  return (
    <div className="header-text-panel">
      <div className="header-text-intro">
        <p className="header-text-kicker">{menu.label}</p>
        {menu.intro ? <p className="header-text-lead">{menu.intro}</p> : null}
        <Link href={menu.href} className="header-text-all link-arrow">
          Přejít na stránku
        </Link>
      </div>
      <div className="header-text-grid" role="list">
        {menu.items!.map((item) => (
          <HeaderTextLinkItem key={item.href + item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function HeaderTextLinkItem({ item }: { item: HeaderTextLink }) {
  return (
    <Link href={item.href} className="header-text-link" role="listitem">
      <span className="header-text-link-title">{item.label}</span>
      {item.description ? (
        <span className="header-text-link-desc">{item.description}</span>
      ) : null}
    </Link>
  );
}

function MobileNavSection({
  item,
  reseniItems,
  onClose,
}: {
  item: HeaderNavItem;
  reseniItems?: StripItem[];
  onClose: () => void;
}) {
  const subs: HeaderTextLink[] =
    item.id === "reseni"
      ? (reseniItems?.map((s) => ({ href: s.href, label: s.label, description: s.description })) ?? [])
      : (item.items ?? []);

  return (
    <div className="mb-1">
      <Link href={item.href} className="site-header-mobile__link" onClick={onClose}>
        {item.label}
      </Link>
      {item.intro ? <p className="site-header-mobile__intro">{item.intro}</p> : null}
      {subs.length ? (
        <div className="site-header-mobile__subs">
          {subs.map((sub) => (
            <Link key={sub.href + sub.label} href={sub.href} className="site-header-mobile__sub" onClick={onClose}>
              {sub.label}
              {sub.description ? (
                <span className="site-header-mobile__sub-desc">{sub.description}</span>
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
