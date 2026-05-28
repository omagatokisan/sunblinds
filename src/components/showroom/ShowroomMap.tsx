import { company } from "@/data/company";
import type { ShowroomContent } from "@/lib/cms/types";

export function ShowroomMap({ showroom }: { showroom: ShowroomContent }) {
  const query = encodeURIComponent(`${showroom.lat},${showroom.lng}`);
  const src = `https://www.google.com/maps?q=${query}&hl=cs&z=15&output=embed`;

  return (
    <div className="showroom-map">
      <iframe
        title="Mapa showroomu SunBlinds"
        src={src}
        className="showroom-map__frame"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="showroom-map__footer">
        <span className="showroom-map__address">
          {showroom.addressLine1}, {showroom.addressLine2}
        </span>
        <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="showroom-map__link">
          Otevřít navigaci →
        </a>
      </div>
    </div>
  );
}
