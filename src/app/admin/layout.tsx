import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Administrace",
  description: "Interní CMS SunBlinds.",
  path: "/admin",
  noIndex: true,
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
