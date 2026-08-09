import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enNav from "../locales/en/navbar.json";
import arNav from "../locales/ar/navbar.json";
import enHero from "../locales/en/hero.json";
import arHero from "../locales/ar/hero.json";
import enAssistant from "../locales/en/assistant.json";
import arAssistant from "../locales/ar/assistant.json";
import enCatalog from "../locales/en/catalog.json";
import arCatalog from "../locales/ar/catalog.json";
import enMembership from "../locales/en/membership.json";
import arMembership from "../locales/ar/membership.json";
import enFooter from "../locales/en/footer.json";
import arFooter from "../locales/ar/footer.json";

const resources = {
  en: {
    translation: {
      ...enNav,
      ...enHero,
      ...enAssistant,
      ...enCatalog,
      ...enMembership,
      ...enFooter,
    },
  },
  ar: {
    translation: {
      ...arNav,
      ...arHero,
      ...arAssistant,
      ...arCatalog,
      ...arMembership,
      ...arFooter,
    },
  },
};

let initialized = false;

export function initI18n() {
  if (typeof window === "undefined") return; // only init on client
  // If already initialized, ensure any newly added resource bundles
  // (e.g. footer) are merged so hot-reload updates translations.
  if (initialized) {
    try {
      // merge footer bundles in case they were added after initial init
      // use deep merge and allow overwrite to ensure new keys appear
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (i18n as any).addResourceBundle(
        "en",
        "translation",
        enFooter,
        true,
        true,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (i18n as any).addResourceBundle(
        "ar",
        "translation",
        arFooter,
        true,
        true,
      );
    } catch (e) {
      // ignore if bundles already exist or addResourceBundle not available
    }
    return;
  }

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
