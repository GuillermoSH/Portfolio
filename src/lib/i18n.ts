export type Locale = "es" | "en";

export function tr(locale: Locale, es: string, en: string) {
  return locale === "en" ? en : es;
}
