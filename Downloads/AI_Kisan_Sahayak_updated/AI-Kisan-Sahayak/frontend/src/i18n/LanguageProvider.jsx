import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext, pickText } from "./context";
import { dict } from "./translations";

const STORAGE_KEY = "kisan-lang";

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "hi") return saved;
  } catch {
    /* storage can be blocked; fall through to browser language */
  }
  return navigator.language?.toLowerCase().startsWith("hi") ? "hi" : "en";
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => {
    const table = dict[lang];
    return {
      lang,
      setLang,
      t: (key) => table[key] ?? dict.en[key] ?? key,
      tr: (obj) => pickText(obj, lang),
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
