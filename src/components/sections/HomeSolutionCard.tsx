import Image from "next/image";
import Link from "next/link";
import type { Solution } from "@/lib/cms/types";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function HomeSolutionCard({ solution, index }: { solution: Solution; index: number }) {
  return (
    <Link
      href={`/reseni/${solution.slug}`}
      className="home-solution-card group anim-fade-up"
      style={{ animationDelay: `${120 + index * 70}ms` }}
    >
      <div className="home-solution-thumb">
        <span className="home-solution-index">{String(index + 1).padStart(2, "0")}</span>
        <Image
          src={solution.heroImage}
          alt=""
          fill
          quality={IMG_QUALITY}
          className={`${imgClass.photo} transition duration-500 group-hover:scale-[1.03]`}
          sizes={imgSizes.catalogThird}
        />
      </div>
      <div className="home-solution-body">
        <h3 className="home-solution-title">{solution.shortTitle}</h3>
        <p className="home-solution-lead">{solution.summary}</p>
        <span className="link-arrow mt-3 inline-block">Prozkoumat</span>
      </div>
    </Link>
  );
}
