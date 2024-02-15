export const i18n = {
    locales: ["fa", "en"],
    defaultLocale: "fa",
} as const;

export type Locale = (typeof i18n)["locales"][number];
export type Dict = { [key: string]: string | Dict };
export type Replacements = { [key: string]: any };
export type Dir = "rtl" | "ltr";
