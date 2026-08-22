"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Locale } from "@/lib/types";
import { DictKey, t } from "@/lib/i18n";

const LanguageContext = createContext<{
  locale: Locale;
  toggleLocale: () => void;
  t: (key: DictKey) => string;
}>({
  locale: "ar",
  toggleLocale: () => {},
  t: (key) => key
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem("coopcaps_locale") as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("coopcaps_locale", locale);
  }, [locale]);

  const toggleLocale = () => setLocale((prev) => (prev === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t: (key) => t(locale, key) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
