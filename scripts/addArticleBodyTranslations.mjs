import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "article.bodyIntro1": "RodBase articles are intended to help users understand rod data in context: total length, closed length, rod weight, construction, lure rating, PE rating, and how those specifications affect real-world use.",
    "article.bodyIntro2": "More detailed article content can be expanded here later. For now, this page acts as a structured article shell connected to the catalogue and multilingual UI."
  },
  "zh-Hant": {
    "article.bodyIntro1": "RodBase 文章旨在幫助用戶理解釣竿資料的實際意思，包括總長、收納長度、釣竿重量、結構、餌重、PE 線號，以及這些規格如何影響實際使用。",
    "article.bodyIntro2": "日後可以在這裡擴充更完整的文章內容。目前此頁面先作為連接目錄資料與多語言介面的文章框架。"
  }
};

const nextTranslations = {
  ...translations,
  en: { ...translations.en, ...additions.en },
  "zh-Hant": { ...translations["zh-Hant"], ...additions["zh-Hant"] },
};

const output = `export const supportedLocales = ${JSON.stringify(supportedLocales, null, 2)};

export const translations = ${JSON.stringify(nextTranslations, null, 2)};

export function translate(locale, key) {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
`;

fs.writeFileSync("./src/i18n/translations.js", output, "utf8");

console.log("Article body translations added.");
