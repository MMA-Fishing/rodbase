import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "common.notListed": "Not listed",

    "rodCard.compare": "Compare",
    "rodCard.length": "Length",
    "rodCard.closed": "Closed",
    "rodCard.weight": "Weight",
    "rodCard.lure": "Lure",
    "rodCard.line": "Line",
    "rodCard.sections": "Sections",
    "rodCard.source": "Source ↗",
    "rodCard.viewDetails": "View details",
    "rodCard.inCompareSet": "In compare set",
    "rodCard.compareFull": "Compare full",
    "rodCard.viewCompare": "View compare",

    "rodImage.referenceGraphicOnly": "Reference graphic only",
  },

  "zh-Hant": {
    "common.notListed": "未列明",

    "rodCard.compare": "比較",
    "rodCard.length": "總長",
    "rodCard.closed": "收納",
    "rodCard.weight": "重量",
    "rodCard.lure": "餌重",
    "rodCard.line": "線號",
    "rodCard.sections": "節數",
    "rodCard.source": "來源 ↗",
    "rodCard.viewDetails": "查看詳情",
    "rodCard.inCompareSet": "已加入比較",
    "rodCard.compareFull": "比較已滿",
    "rodCard.viewCompare": "查看比較",

    "rodImage.referenceGraphicOnly": "參考圖示",
  },
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

console.log("Rod card translations added.");
