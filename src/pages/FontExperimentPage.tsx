import { useEffect, useRef } from "react";
import "./FontExperimentPage.css";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Caveat:wght@700",
    "family=Shadows+Into+Light",
    "family=Permanent+Marker",
    "family=Homemade+Apple",
    "family=Reenie+Beanie",
    "family=Gochi+Hand",
    "family=Rock+Salt",
    "family=Indie+Flower",
    "family=Architects+Daughter",
    "family=Nanum+Pen+Script",
  ].join("&") +
  "&display=swap";

const FONTS = [
  { name: "Caveat", family: "'Caveat', cursive" },
  { name: "Shadows Into Light", family: "'Shadows Into Light', cursive" },
  { name: "Permanent Marker", family: "'Permanent Marker', cursive" },
  { name: "Homemade Apple", family: "'Homemade Apple', cursive" },
  { name: "Reenie Beanie", family: "'Reenie Beanie', cursive" },
  { name: "Gochi Hand", family: "'Gochi Hand', cursive" },
  { name: "Rock Salt", family: "'Rock Salt', cursive" },
  { name: "Indie Flower", family: "'Indie Flower', cursive" },
  { name: "Architects Daughter", family: "'Architects Daughter', cursive" },
  { name: "Nanum Pen Script", family: "'Nanum Pen Script', cursive" },
];

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const DEMO_KEYWORDS = ["adipiscing", "tempor", "aliqua", "exercitation"];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderDemoText(fontFamily: string) {
  const pattern = new RegExp(`(${DEMO_KEYWORDS.map(escapeRegExp).join("|")})`, "gi");
  const parts = LOREM.split(pattern);

  return parts.map((part, index) => {
    const isKeyword = DEMO_KEYWORDS.some((k) => k.toLowerCase() === part.toLowerCase());
    if (!isKeyword) return part;

    return (
      <span key={index} className="font-lab-word">
        <span className="font-lab-word__note" style={{ fontFamily }} aria-hidden="true">
          {part}
        </span>
        {part}
      </span>
    );
  });
}

export function FontExperimentPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fitNotes = () => {
      container.querySelectorAll<HTMLElement>(".font-lab-word").forEach((el) => {
        const note = el.querySelector<HTMLElement>(".font-lab-word__note");
        if (!note) return;
        const wordWidth = el.offsetWidth;
        const noteWidth = note.scrollWidth;
        if (!wordWidth || !noteWidth) return;
        const scale = Math.min(1, (wordWidth * 1.15) / noteWidth);
        el.style.setProperty("--note-fit-scale", scale.toFixed(3));
      });
    };

    fitNotes();
    document.fonts?.ready.then(fitNotes).catch(() => {});
    const timeout = window.setTimeout(fitNotes, 800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="font-lab-page" ref={containerRef}>
      <div className="font-lab-intro">
        <h1>Font experiment</h1>
        <p>
          Same keyword-overlay treatment as the "Sobre mí" section — dimmed original word,
          handwritten replacement on top, no rotation — swapping only the handwriting font.
          Testing whether the font's own irregularity gives enough life without a manual tilt.
        </p>
      </div>

      {FONTS.map((font) => (
        <section key={font.name} className="font-lab-sample">
          <h2 className="font-lab-sample__title">{font.name}</h2>
          <p className="font-lab-sample__text">{renderDemoText(font.family)}</p>
        </section>
      ))}
    </div>
  );
}
