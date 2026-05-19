import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
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
  const [lang, setLangState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("fc_lang");
      return stored || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("fc_lang", lang);
    } catch {}
    try {
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);

  const setLang = (next: string) => setLangState(next);

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
