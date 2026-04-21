import { useEffect } from "react";

const AWAY_TITLE = "Vuelve cuando quieras…";

export function useDocumentTitleFlash(originalTitle: string): void {
  useEffect(() => {
    const onBlur = () => {
      document.title = AWAY_TITLE;
    };
    const onFocus = () => {
      document.title = originalTitle;
    };
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, [originalTitle]);
}
