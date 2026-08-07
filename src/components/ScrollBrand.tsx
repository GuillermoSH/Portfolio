import { useEffect, useState } from "react";

export function ScrollBrand() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`scroll-brand ${visible ? "scroll-brand--visible" : ""}`}
      aria-hidden="true"
    >
      <img src="/img/photo.webp" alt="" className="scroll-brand__avatar" />
      <span className="scroll-brand__name">GuillermoSH</span>
    </div>
  );
}
