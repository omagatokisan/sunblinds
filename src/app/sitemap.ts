import type { MetadataRoute } from "next";

import { getPublicRoutes } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getPublicRoutes();
  const now = new Date();

  return routes.map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified: lastModified ?? now,
    changeFrequency: path === "/" ? "weekly" : path.startsWith("/reseni/") ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/reseni" ? 0.9 : path.split("/").length <= 2 ? 0.8 : 0.7,
  }));
}
