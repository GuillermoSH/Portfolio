export type Locale = "es" | "en";

export function tr<T>(locale: Locale, es: T, en: T): T {
  return locale === "en" ? en : es;
}
