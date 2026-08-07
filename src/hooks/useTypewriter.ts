import { useEffect, useState } from "react";

type UseTypewriterOptions = {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

export type TypewriterPhase = "typing" | "deleting" | "idle";

export function useTypewriter(
  phrases: readonly string[],
  {
    typingSpeed = 55,
    deletingSpeed = 25,
    pauseDuration = 1900,
  }: UseTypewriterOptions = {},
) {
  const phrasesKey = phrases.join("␟");
  const [text, setText] = useState(phrases[0] ?? "");
  const [phase, setPhase] = useState<TypewriterPhase>("typing");

  useEffect(() => {
    if (phrases.length === 0) return undefined;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cancelled = false;
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    // Slight per-character jitter so the pace reads as typed, not metronomic.
    const jitter = (base: number) => base + (Math.random() - 0.5) * base * 0.6;

    const tick = () => {
      if (cancelled) return;
      const phrase = phrases[phraseIndex];

      if (reduced) {
        setText(phrase);
        setPhase("idle");
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = setTimeout(tick, pauseDuration + 900);
        return;
      }

      if (!deleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));
        setPhase("typing");
        if (charIndex === phrase.length) {
          deleting = true;
          setPhase("idle");
          timer = setTimeout(tick, pauseDuration);
        } else {
          // Longer breath after punctuation, like a natural typing pause.
          const lastChar = phrase[charIndex - 1];
          const punctuationPause = /[,.!¡¿?]/.test(lastChar) ? 260 : 0;
          timer = setTimeout(tick, jitter(typingSpeed) + punctuationPause);
        }
        return;
      }

      charIndex -= 1;
      setText(phrase.slice(0, charIndex));
      setPhase("deleting");
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setPhase("idle");
        timer = setTimeout(tick, 350);
      } else {
        timer = setTimeout(tick, jitter(deletingSpeed));
      }
    };

    timer = setTimeout(tick, typingSpeed);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrasesKey, typingSpeed, deletingSpeed, pauseDuration]);

  return { text, phase };
}
