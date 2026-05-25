"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { SubpageRefreshNotice } from "@/components/layout/SubpageRefreshNotice";
import { isSubpageLandingOnly } from "@/lib/site-gates";

export function SubpageDarkShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const landingOnly = isSubpageLandingOnly(pathname);

  useEffect(() => {
    const cls = "site-subpages-active";
    if (!isHome && !isAdmin) {
      document.body.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
    }
    return () => document.body.classList.remove(cls);
  }, [isHome, isAdmin]);

  if (isHome || isAdmin) return children;

  if (landingOnly) {
    return (
      <div className="home-dark site-subpages site-subpages--landing">
        <SubpageRefreshNotice />
      </div>
    );
  }

  return <div className="home-dark site-subpages">{children}</div>;
}
