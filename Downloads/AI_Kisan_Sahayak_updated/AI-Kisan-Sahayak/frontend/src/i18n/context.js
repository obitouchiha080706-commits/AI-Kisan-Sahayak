import { createContext, useContext } from "react";

export const LanguageContext = createContext(null);

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

/** Picks the right language from { en, hi } objects. Plain values pass through. */
export function pickText(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[lang] ?? value.en;
  }
  return value;
}
