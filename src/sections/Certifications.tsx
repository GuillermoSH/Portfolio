import { CertificationCard } from "../components/CertificationCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CERTIFICATIONS } from "../data/site";
import type { Locale } from "../lib/i18n";
import { tr } from "../lib/i18n";

export function Certifications({ locale }: { locale: Locale }) {
  const items =
    locale === "en"
      ? CERTIFICATIONS.map((item) => {
          if (item.href.includes("portal.speexx.com")) {
            return {
              ...item,
              category: "English",
              date: "November 2024",
              linkLabel: "View certificate",
            };
          }
          if (item.href.includes("credly.com")) {
            return {
              ...item,
              date: "Jul 2024 — expires Jul 2027",
              linkLabel: "View on Credly",
            };
          }
          if (item.href.includes("credentials.uipath.com")) {
            return {
              ...item,
              category: "Automation",
              date: "Oct 2024 — expires Oct 2026",
              linkLabel: "View credential",
            };
          }
          return item;
        })
      : CERTIFICATIONS;

  return (
    <section
      id="certificaciones"
      className="border-y border-stone-200/80 bg-mesh-light py-20 dark:border-zinc-800 dark:bg-mesh-dark"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={tr(locale, "Credenciales", "Credentials")}
          title={tr(locale, "Certificaciones", "Certifications")}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <CertificationCard key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
