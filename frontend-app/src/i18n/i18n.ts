import i18n from "i18next";
import { initReactI18next } from "react-i18next";

let initialized = false;

// load a namespace JSON dynamically and add as a resource bundle
export async function loadNamespace(lng: string, ns: string) {
  try {
    // dynamic import so the bundle only contains requested namespaces
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod: any = await import(`../locales/${lng}/${ns}.json`);
    const data = mod.default ?? mod;
    // add or merge resource bundle under its namespace
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (i18n as any).addResourceBundle(lng, ns, data, true, true);
    // also merge into the common `translation` namespace so keys like
    // `catalog.title` resolve when components call `t('catalog.title')`
    // without specifying a namespace.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (i18n as any).addResourceBundle(lng, "translation", data, true, true);
  } catch (e) {
    // fail silently; fallbackLng will handle missing keys
    // eslint-disable-next-line no-console
    console.warn(`i18n: failed to load namespace ${ns} for ${lng}`, e);
  }
}

export async function initI18n() {
  if (typeof window === "undefined") return; // only init on client

  if (initialized) return;

  const saved = window.localStorage.getItem("lang");
  const rawNavLang =
    typeof navigator !== "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigator.language || (navigator as any).userLanguage || ""
      : "";
  const browserLang = rawNavLang.split("-")[0];
  const lng = saved || (browserLang === "ar" ? "ar" : "en");

  // initialize i18n with namespaces support but without inlined resources
  i18n.use(initReactI18next).init({
    lng,
    fallbackLng: "en",
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    resources: {},
  });

  // Namespaces available in src/locales/*
  const NAMESPACES = [
    "navbar",
    "hero",
    "assistant",
    "catalog",
    "membership",
    "footer",
    "reserve",
  ];

  // eagerly load all namespaces so translations are available across the app.
  await Promise.all(NAMESPACES.map((ns) => loadNamespace(lng, ns)));

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
