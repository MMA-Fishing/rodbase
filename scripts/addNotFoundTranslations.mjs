import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "notFound.pageTitle": "Page Not Found",
    "notFound.pageDescription": "The requested RodBase page could not be found. Search rods, browse brands, or return home.",
    "notFound.eyebrow": "404",
    "notFound.title": "Page not found.",
    "notFound.text": "This page may have moved, the rod or series may have been renamed, or the URL may be incorrect.",
    "notFound.searchRods": "Search rods",
    "notFound.browseBrands": "Browse brands",
    "notFound.goHome": "Go home"
  },

  "zh-Hant": {
    "notFound.pageTitle": "找不到頁面",
    "notFound.pageDescription": "找不到你要求的 RodBase 頁面。你可以搜尋釣竿、瀏覽品牌，或返回首頁。",
    "notFound.eyebrow": "404",
    "notFound.title": "找不到頁面。",
    "notFound.text": "此頁面可能已移動，釣竿或系列可能已重新命名，或網址可能不正確。",
    "notFound.searchRods": "搜尋釣竿",
    "notFound.browseBrands": "瀏覽品牌",
    "notFound.goHome": "返回首頁"
  }
};

const nextTranslations = {
  ...translations,
  en: {
    ...translations.en,
    ...additions.en,
  },
  "zh-Hant": {
    ...translations["zh-Hant"],
    ...additions["zh-Hant"],
  },
};

const output = `export const supportedLocales = ${JSON.stringify(supportedLocales, null, 2)};

export const translations = ${JSON.stringify(nextTranslations, null, 2)};

export function translate(locale, key) {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
`;

fs.writeFileSync("./src/i18n/translations.js", output, "utf8");

console.log("Not found page translations added.");
