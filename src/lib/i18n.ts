import "server-only";
import { Locale, Dict, Replacements, i18n } from "@/i18n.config";

const dictionaries = {
    fa: { dir: "rtl", f: () => import("@/locales/fa.json").then((module) => module.default) },
    en: { dir: "ltr", f: () => import("@/locales/en.json").then((module) => module.default) },
};

export const getDictionary = async (locale: Locale) => await (dictionaries[locale]?.f() ?? dictionaries[i18n.defaultLocale].f());
export const getDir = (locale: Locale) => dictionaries[locale]?.dir ?? dictionaries[i18n.defaultLocale].dir;
export const getPrefix = (locale: Locale) => (i18n.defaultLocale === locale ? "" : `/${locale}`);
export const getTranslations = async (locale: Locale) => {
    const dict = await getDictionary(locale);
    return (key: string, replacements?: Replacements) => $t(dict, key, replacements);
};

const _readFromDictionary = (keys: string[], dict: string | Dict): string => {
    if (typeof dict === "string") return dict;
    if (keys.length === 0) return "";
    if (!dict) return "";
    const key = keys.shift() || "";
    return _readFromDictionary(keys, dict[key]);
};

const $t = (dict: Dict, key: string, replacements?: Replacements): string => {
    if (!key) return "";
    const keys = key.split(".");
    return _readFromDictionary(keys, dict);
    // TODO : do the replacement part
};
