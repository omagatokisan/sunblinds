"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_POSTER_IMAGE, HERO_VIDEOS } from "@/data/site-visuals";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

const CROSSFADE_MS = 1200;

type HomeHeroVideoProps = {
  onActiveChange?: (index: number) => void;
};

export function HomeHeroVideo({ onActiveChange }: HomeHeroVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const playlistIndex = useRef(0);
  const visibleLayer = useRef<0 | 1>(0);
  const switching = useRef(false);
  const inView = useRef(true);

  const [activeVideo, setActiveVideo] = useState(0);
  const [frontLayer, setFrontLayer] = useState<0 | 1>(0);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [posterVisible, setPosterVisible] = useState(true);

  const pauseLayer = useCallback((layer: 0 | 1) => {
    const video = videoRefs.current[layer];
    if (!video) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
    delete video.dataset.src;
  }, []);

  const playClip = useCallback(async (layer: 0 | 1, index: number) => {
    const video = videoRefs.current[layer];
    if (!video) return;

    const src = HERO_VIDEOS[index];
    if (video.dataset.src !== src) {
      video.src = src;
      video.dataset.src = src;
      video.load();
    }

    video.currentTime = 0;

    if (!inView.current) return;

    try {
      await video.play();
    } catch {
      /* autoplay blocked */
    }
  }, []);

  const advance = useCallback(async () => {
    if (switching.current || HERO_VIDEOS.length <= 1) return;
    switching.current = true;

    const nextIndex = (playlistIndex.current + 1) % HERO_VIDEOS.length;
    const currentLayer = visibleLayer.current;
    const nextLayer = currentLayer === 0 ? 1 : 0;

    await playClip(nextLayer, nextIndex);

    playlistIndex.current = nextIndex;
    visibleLayer.current = nextLayer;
    setActiveVideo(nextIndex);
    setFrontLayer(nextLayer);
    onActiveChange?.(nextIndex);

    window.setTimeout(() => {
      pauseLayer(currentLayer);
      switching.current = false;
    }, CROSSFADE_MS);
  }, [onActiveChange, pauseLayer, playClip]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const enabled = !reduced && !connection?.saveData;
    setMotionEnabled(enabled);
  }, []);

  useEffect(() => {
    if (!motionEnabled) return;

    playlistIndex.current = 0;
    visibleLayer.current = 0;
    void playClip(0, 0).then(() => setPosterVisible(false));
  }, [motionEnabled, playClip]);

  useEffect(() => {
    if (!motionEnabled || !rootRef.current) return;

    const root = rootRef.current;

    const syncPlayback = () => {
      const layer = visibleLayer.current;
      const video = videoRefs.current[layer];
      if (!video) return;

      if (inView.current && document.visibilityState === "visible") {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.15 }
    );

    observer.observe(root);

    const onVisibility = () => syncPlayback();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [motionEnabled]);

  if (!motionEnabled) {
    return (
      <div className="site-page-banner-media site-page-banner-media--poster">
        <Image
          src={HERO_POSTER_IMAGE}
          alt=""
          fill
          priority
          quality={IMG_QUALITY}
          className={imgClass.photo}
          sizes={imgSizes.siteBanner}
        />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="site-page-banner-media site-page-banner-media--video">
      <div className={`site-page-banner-poster ${posterVisible ? "" : "is-hidden"}`} aria-hidden>
        <Image
          src={HERO_POSTER_IMAGE}
          alt=""
          fill
          priority
          quality={IMG_QUALITY}
          className={imgClass.photo}
          sizes={imgSizes.siteBanner}
        />
      </div>
      {([0, 1] as const).map((layer) => (
        <video
          key={layer}
          ref={(node) => {
            videoRefs.current[layer] = node;
          }}
          className={`site-page-banner-video ${frontLayer === layer ? "is-active" : ""}`}
          muted
          playsInline
          autoPlay={layer === 0}
          loop={false}
          preload={layer === 0 ? "auto" : "none"}
          disablePictureInPicture
          aria-hidden
          onLoadedData={() => {
            if (layer === 0) setPosterVisible(false);
          }}
          onEnded={() => {
            if (visibleLayer.current === layer) void advance();
          }}
        />
      ))}
      <div className="site-page-banner-video-progress" aria-hidden>
        {HERO_VIDEOS.map((src, index) => (
          <span
            key={src}
            className={`site-page-banner-video-dot ${index === activeVideo ? "is-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
