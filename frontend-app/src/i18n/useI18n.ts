import { useEffect, useState } from "react";
import { initI18n } from "./i18n";

// Initialize i18n synchronously on hook call so that `useTranslation`
// won't warn about missing i18n instance during the same render.
export default function useClientI18n() {
  // ensure init runs synchronously on first render (client only)
  if (typeof window !== "undefined") {
    initI18n();
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let raf: number | null = null;
    // defer to the next frame to avoid synchronous setState inside effect
    if (
      typeof window !== "undefined" &&
      typeof window.requestAnimationFrame === "function"
    ) {
      raf = window.requestAnimationFrame(() => setMounted(true));
    } else if (typeof window !== "undefined") {
      // fallback to setTimeout if RAF isn't available
      raf = window.setTimeout(() => setMounted(true), 0) as unknown as number;
    }

    return () => {
      if (raf !== null) {
        if (
          typeof window !== "undefined" &&
          typeof window.cancelAnimationFrame === "function"
        ) {
          window.cancelAnimationFrame(raf);
        } else if (typeof window !== "undefined") {
          window.clearTimeout(raf);
        }
      }
    };
  }, []);

  return mounted;
}
