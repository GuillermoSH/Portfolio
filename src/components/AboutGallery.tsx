import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_PHOTOS, MOBILE_GALLERY_SLOTS } from "../data/gallery";
import type { GalleryOrientation, GalleryPhoto } from "../data/gallery";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

gsap.registerPlugin(ScrollTrigger);

// Tailwind's content scanner needs the full class name to appear literally
// here, so it isn't purged from the `@layer components` output.
const ORIENTATION_CLASS: Record<GalleryOrientation, string> = {
  landscape: "gallery-photo--landscape",
  portrait: "gallery-photo--portrait",
};

function pickRandom<T>(items: T[], count: number): T[] {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

type AboutGalleryProps = {
  locale: Locale;
};

export function AboutGallery({ locale }: AboutGalleryProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [mobilePhotos] = useState<GalleryPhoto[]>(() =>
    pickRandom(GALLERY_PHOTOS, MOBILE_GALLERY_SLOTS.length),
  );

  useEffect(() => {
    const layer = layerRef.current;
    const section = layer?.closest("section");
    if (!layer || !section) return;

    const photos = gsap.utils.toArray<HTMLElement>(".gallery-photo", layer);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(photos, { opacity: (_i, target) => Number(target.dataset.restOpacity) });
      return;
    }

    gsap.set(photos, { opacity: 0, scale: 0.9 });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(photos, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: (_i, target) => Number(target.dataset.restOpacity),
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12,
          }),
      });

      photos.forEach((photo) => {
        const depth = Number(photo.dataset.depth ?? 0.5);
        gsap.to(photo, {
          y: -90 * depth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, layer);

    const cleanupHover: (() => void)[] = [];
    photos.forEach((photo) => {
      const slot = photo.parentElement;
      const quickRotateY = gsap.quickTo(photo, "rotationY", { duration: 0.5, ease: "power3.out" });
      const quickRotateX = gsap.quickTo(photo, "rotationX", { duration: 0.5, ease: "power3.out" });
      const quickScale = gsap.quickTo(photo, "scale", { duration: 0.35, ease: "power2.out" });

      const onEnter = () => {
        if (slot) slot.style.zIndex = "20";
        quickScale(1.07);
      };
      const onMove = (e: MouseEvent) => {
        const rect = photo.getBoundingClientRect();
        quickRotateY(((e.clientX - rect.left) / rect.width - 0.5) * 24);
        quickRotateX(((e.clientY - rect.top) / rect.height - 0.5) * -24);
      };
      const onLeave = () => {
        if (slot) slot.style.zIndex = "";
        quickScale(1);
        quickRotateX(0);
        quickRotateY(0);
      };

      photo.addEventListener("mouseenter", onEnter);
      photo.addEventListener("mousemove", onMove);
      photo.addEventListener("mouseleave", onLeave);
      cleanupHover.push(() => {
        photo.removeEventListener("mouseenter", onEnter);
        photo.removeEventListener("mousemove", onMove);
        photo.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      ctx.revert();
      cleanupHover.forEach((fn) => fn());
    };
  }, []);

  const renderSlot = (
    photo: GalleryPhoto,
    position: { topPct: number; leftPct: number; rotateDeg: number; widthRem: number },
  ) => (
    <div
      key={photo.id}
      className="gallery-photo-slot"
      style={
        {
          "--slot-top": `${position.topPct}%`,
          "--slot-left": `${position.leftPct}%`,
          "--slot-rotate": `${position.rotateDeg}deg`,
          "--slot-width": `${position.widthRem}rem`,
        } as CSSProperties
      }
    >
      <figure
        className={`gallery-photo ${ORIENTATION_CLASS[photo.orientation]}`}
        style={{ "--gallery-hue": photo.hue } as CSSProperties}
        data-depth={photo.depth}
        data-rest-opacity={photo.restOpacity}
      >
        {photo.src ? (
          <img
            src={photo.src}
            alt={photo.alt ?? ""}
            className="gallery-photo__image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="gallery-photo__placeholder">
            {tr(locale, photo.labelEs, photo.labelEn)}
          </span>
        )}
      </figure>
    </div>
  );

  return (
    <div ref={layerRef} aria-hidden="true">
      <div className="about-gallery-layer">
        {GALLERY_PHOTOS.map((photo) => renderSlot(photo, photo))}
      </div>
      <div className="about-gallery-layer--mobile">
        {mobilePhotos.map((photo, index) => renderSlot(photo, MOBILE_GALLERY_SLOTS[index]))}
      </div>
    </div>
  );
}
