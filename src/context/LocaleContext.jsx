import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supportedLocales, translate } from "../i18n/translations.js";

const STORAGE_KEY = "rodbase.locale";
const defaultLocale = "en";

const LocaleContext = createContext(null);

function getStoredLocale() {
  if (typeof window === "undefined") return defaultLocale;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  const supported = supportedLocales.some((locale) => locale.code === stored);

  return supported ? stored : defaultLocale;
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(getStoredLocale);

  useEffect(() => {
    const localeInfo = supportedLocales.find((item) => item.code === locale);
    document.documentElement.lang = localeInfo?.htmlLang || "en";
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  function setLocale(nextLocale) {
    const supported = supportedLocales.some((item) => item.code === nextLocale);
    if (!supported) return;

    setLocaleState(nextLocale);
  }

  function t(key) {
    return translate(locale, key);
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      supportedLocales,
      t,
    }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
