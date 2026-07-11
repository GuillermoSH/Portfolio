import type { Locale } from "../lib/i18n";
import { skipLabel } from "../lib/present";

type SkipLinkProps = {
  locale: Locale;
};

export function SkipLink({ locale }: SkipLinkProps) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-on"
    >
      {skipLabel(locale)}
    </a>
  );
}
