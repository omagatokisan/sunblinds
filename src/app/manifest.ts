import type { MetadataRoute } from "next";

import { company } from "@/data/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} — stínění, okna a servis`,
    short_name: company.name,
    description: company.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#e85d04",
    lang: "cs",
    icons: [
      {
        src: "/images/logo-iso.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
