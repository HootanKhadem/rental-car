import { useEffect, useState } from "react";
import { initI18n } from "./i18n";

// Initialize i18n synchronously on hook call so that `useTranslation`
// won't warn about missing i18n instance during the same render.
export default function useClientI18n() {
  const [mounted, setMounted] = useState(false);

  // initialize i18n on the client inside an effect to avoid
  // setState-in-render / hydration warnings
  useEffect(() => {
    if (typeof window === "undefined") return;
    let mountedFlag = true;

    (async () => {
      try {
        await initI18n();
        // ensure the namespace needed by header is loaded
        // we mark mounted after i18n navbar namespace is available
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("i18n init error", e);
      }

      if (!mountedFlag) return;
      if (typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(() => setMounted(true));
      } else {
        window.setTimeout(() => setMounted(true), 0);
      }
    })();

    return () => {
      mountedFlag = false;
    };
  }, []);

  return mounted;
}
