export type GalleryOrientation = "landscape" | "portrait";

export type GalleryPhoto = {
  id: string;
  orientation: GalleryOrientation;
  hue: number;
  labelEs: string;
  labelEn: string;
  /** Position/look, as a loose scatter over the whole (tall) about section. */
  topPct: number;
  leftPct: number;
  rotateDeg: number;
  widthRem: number;
  /** 0-1: how much this photo drifts on scroll and how "far back" it reads. */
  depth: number;
  restOpacity: number;
  src?: string;
  alt?: string;
};

// Fotos reales en /public/img/gallery (720x480 horizontales, 480x720
// verticales, ya exportadas en WebP). Para añadir/quitar una, edita este
// array; si `src` falta se muestra el placeholder con `labelEs`/`labelEn`.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "teide",
    orientation: "landscape",
    hue: 198,
    labelEs: "Teide",
    labelEn: "Teide",
    topPct: 4,
    leftPct: 2,
    rotateDeg: -6,
    widthRem: 14,
    depth: 0.4,
    restOpacity: 0.6,
    src: "/img/gallery/teide_horizontal.webp",
    alt: "Teide",
  },
  {
    id: "casa",
    orientation: "portrait",
    hue: 30,
    labelEs: "Casa",
    labelEn: "House",
    topPct: 10,
    leftPct: 76,
    rotateDeg: 7,
    widthRem: 10.5,
    depth: 0.7,
    restOpacity: 0.65,
    src: "/img/gallery/casa_vertical.webp",
    alt: "Casa",
  },
  {
    id: "fuegos",
    orientation: "landscape",
    hue: 38,
    labelEs: "Fuegos de mayo",
    labelEn: "May fireworks",
    topPct: 23,
    leftPct: 91,
    rotateDeg: 5,
    widthRem: 13,
    depth: 0.5,
    restOpacity: 0.6,
    src: "/img/gallery/fuegos_mayo_horizontal.webp",
    alt: "Fuegos de mayo",
  },
  {
    id: "cascada",
    orientation: "landscape",
    hue: 165,
    labelEs: "Cascada",
    labelEn: "Waterfall",
    topPct: 36,
    leftPct: 5,
    rotateDeg: -4,
    widthRem: 13.5,
    depth: 0.9,
    restOpacity: 0.7,
    src: "/img/gallery/cascada_horizontal.webp",
    alt: "Cascada",
  },
  {
    id: "haru",
    orientation: "landscape",
    hue: 265,
    labelEs: "Haru",
    labelEn: "Haru",
    topPct: 48,
    leftPct: 32,
    rotateDeg: -8,
    widthRem: 12,
    depth: 0.35,
    restOpacity: 0.55,
    src: "/img/gallery/haru_horizontal.webp",
    alt: "Haru",
  },
  {
    id: "techo",
    orientation: "landscape",
    hue: 220,
    labelEs: "Techo",
    labelEn: "Rooftop",
    topPct: 59,
    leftPct: 80,
    rotateDeg: 6,
    widthRem: 13.5,
    depth: 0.6,
    restOpacity: 0.65,
    src: "/img/gallery/techo_horizontal.webp",
    alt: "Techo",
  },
  {
    id: "perro-guggenheim",
    orientation: "portrait",
    hue: 10,
    labelEs: "Perro en el Guggenheim",
    labelEn: "Dog at the Guggenheim",
    topPct: 71,
    leftPct: 10,
    rotateDeg: 9,
    widthRem: 10.5,
    depth: 0.8,
    restOpacity: 0.75,
    src: "/img/gallery/perro_guggenheim_vertical.webp",
    alt: "Perro en el Guggenheim",
  },
  {
    id: "folele",
    orientation: "landscape",
    hue: 285,
    labelEs: "Folele",
    labelEn: "Folele",
    topPct: 82,
    leftPct: 52,
    rotateDeg: -3,
    widthRem: 12.5,
    depth: 0.5,
    restOpacity: 0.6,
    src: "/img/gallery/folele_horizontal.webp",
    alt: "Folele",
  },
  {
    id: "barco",
    orientation: "landscape",
    hue: 145,
    labelEs: "Barco",
    labelEn: "Boat",
    topPct: 92,
    leftPct: 88,
    rotateDeg: 4,
    widthRem: 13,
    depth: 0.45,
    restOpacity: 0.55,
    src: "/img/gallery/barco_horizontal.webp",
    alt: "Barco",
  },
];

export type GalleryMobileSlot = {
  topPct: number;
  leftPct: number;
  rotateDeg: number;
  widthRem: number;
};

// Unas pocas fotos (elegidas al azar entre GALLERY_PHOTOS en cada carga) para
// no dejar el móvil sin nada; posiciones pensadas para caer por debajo del
// texto de la sección, no al lado (ahí no hay sitio en una pantalla estrecha).
export const MOBILE_GALLERY_SLOTS: GalleryMobileSlot[] = [
  { topPct: 40, leftPct: 6, rotateDeg: -6, widthRem: 7 },
  { topPct: 58, leftPct: 46, rotateDeg: 5, widthRem: 6.5 },
  { topPct: 76, leftPct: 12, rotateDeg: -4, widthRem: 7 },
];
