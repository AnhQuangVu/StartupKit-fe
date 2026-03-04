import type { Locale } from "./i18n";

// Type-safe dictionary shape — generated from en.json structure
export type Dictionary = typeof import("../dictionaries/en.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    en: () => import("../dictionaries/en.json").then((m) => m.default),
    vi: () => import("../dictionaries/vi.json").then((m) => m.default as unknown as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
    return dictionaries[locale]();
}
