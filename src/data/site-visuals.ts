/** Vysoké rozlišení — optimalizace přes next/image (1920px srcset) */
export const SITE_BANNER_IMAGE =
  "https://sunblinds.cz/images/slider_2/slide4/okna-a-dvere-okna.webp";

export const HERO_POSTER_IMAGE = SITE_BANNER_IMAGE;

/** Hero videa pro homepage banner (public/videos/hero) — bez garážového klipu */
export const HERO_VIDEOS = [
  "/videos/hero/hero-02.mp4",
  "/videos/hero/hero-03.mp4",
  "/videos/hero/hero-04.mp4",
] as const;

export const SITE_BANNER_WIDTH = 1920;
export const SITE_BANNER_HEIGHT = 1280;

/** Obrázky pro sekci „Co dál?“ / Související témata na detailu produktu */
export const RELATED_TOPIC_IMAGES = {
  showroom: "/images/related/showroom-libus.png",
  poptavka: "/images/related/online-poptavka.png",
  servis: "/images/related/servis-udrzba.png",
} as const;
