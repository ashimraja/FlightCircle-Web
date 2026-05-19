import React, { createContext, useContext, useMemo, useState } from "react";
import en from "./locales/en.json";
import ne from "./locales/ne.json";

type Locales = typeof en;

type I18nContextValue = {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

const maps: Record<string, Locales> = { en, ne };

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState("en");

  const t = (key: string) => {
    const parts = key.split(".");
    const dictionary = maps[lang] || maps.en;
    let cur: any = dictionary;
    for (const p of parts) {
      cur = cur?.[p];
      if (cur === undefined) return key;
    }
    return typeof cur === "string" ? cur : key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
