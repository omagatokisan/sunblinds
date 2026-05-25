import type { Metadata } from "next";

import { Montserrat } from "next/font/google";

import { SiteHeader } from "@/components/layout/SiteHeader";

import { SiteFooter } from "@/components/layout/SiteFooter";

import { CallProvider } from "@/components/call/CallProvider";

import { GlobalPageBanner } from "@/components/layout/GlobalPageBanner";
import { SubpageDarkShell } from "@/components/layout/SubpageDarkShell";

import { company } from "@/data/company";

import { loadSiteContent } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";



const montserrat = Montserrat({

  subsets: ["latin", "latin-ext"],

  variable: "--font-montserrat",

  display: "swap",

  weight: ["400", "500", "600", "700"],

});



export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

  title: {
    default: `${company.name} — stínění, okna a servis`,
    template: `%s | ${company.name}`,
  },

  description:
    "Venkovní i interiérové stínění, okna, sítě proti hmyzu a garážová vrata. Showroom v Praze, zaměření, montáž a servis.",

  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: company.name,
  },

  icons: {
    icon: [{ url: "/images/logo-iso.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/logo-iso.svg" }],
  },
};



export default async function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {

  const content = await loadSiteContent();



  return (

    <html lang="cs" className={montserrat.variable}>

      <body className="flex min-h-screen flex-col font-sans">

        <CallProvider departments={content.departments}>

          <SiteHeader solutions={content.solutions} />

          <GlobalPageBanner

            home={content.home}

            contact={content.contact}

            aboutPage={content.aboutPage}

            servisPage={content.servisPage}

            showroom={content.showroom}

            solutions={content.solutions}

            privacy={content.privacy}

          />

          <main className="flex-1">
            <SubpageDarkShell>{children}</SubpageDarkShell>
          </main>

          <SiteFooter solutions={content.solutions} />

        </CallProvider>

      </body>

    </html>

  );

}

