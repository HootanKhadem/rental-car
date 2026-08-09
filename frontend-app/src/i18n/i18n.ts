import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enNav from "../locales/en/navbar.json";
import arNav from "../locales/ar/navbar.json";
import enHero from "../locales/en/hero.json";
import arHero from "../locales/ar/hero.json";

const resources = {
  en: { translation: { ...enNav, ...enHero } },
  ar: { translation: { ...arNav, ...arHero } },
};

let initialized = false;

export function initI18n() {
  if (typeof window === "undefined") return; // only init on client
  if (initialized) return;

  const saved = window.localStorage.getItem("lang");
  // `navigator.userLanguage` exists in some older browsers (IE); TypeScript
  // may not have it on the `Navigator` type, so access defensively.
  const rawNavLang =
    typeof navigator !== "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigator.language || (navigator as any).userLanguage || ""
      : "";
  const browserLang = rawNavLang.split("-")[0];
  const lng = saved || (browserLang === "ar" ? "ar" : "en");

  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

  // set document attributes for accessibility and RTL handling
  try {
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  } catch (e) {
    // ignore when document is not available
  }

  initialized = true;
}

export default i18n;
