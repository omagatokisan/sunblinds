import type { ShowroomContent } from "@/lib/cms/types";

export function ShowroomMap({ showroom }: { showroom: ShowroomContent }) {
  const delta = 0.012;
  const bbox = `${showroom.lng - delta},${showroom.lat - delta},${showroom.lng + delta},${showroom.lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${showroom.lat}%2C${showroom.lng}`;

  return (
    <div className="overflow-hidden border border-line">
      <iframe
        title="Mapa showroomu SunBlinds"
        src={src}
        className="h-[360px] w-full border-0 sm:h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3 text-sm">
        <span className="text-muted">
          {showroom.addressLine1}, {showroom.addressLine2}
        </span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${showroom.lat},${showroom.lng}`}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-brand hover:underline"
        >
          Otevřít navigaci →
        </a>
      </div>
    </div>
  );
}
