import type { Locale, LocaleDict } from "@/types/locale";

const dicts: Record<Locale, () => Promise<LocaleDict>> = {
  pt: () => import("@/locales/pt.json").then((m) => m.default as LocaleDict),
  en: () => import("@/locales/en.json").then((m) => m.default as LocaleDict),
  es: () => import("@/locales/es.json").then((m) => m.default as LocaleDict),
};

export async function getDict(locale: Locale): Promise<LocaleDict> {
  return dicts[locale]();
}

export function isValidLocale(value: string): value is Locale {
  return ["pt", "en", "es"].includes(value);
}
