import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "compareTray.title": "Compare",
    "compareTray.selected": "rods selected",
    "compareTray.clear": "Clear",
    "compareTray.compareNow": "Compare now"
  },

  "zh-Hant": {
    "compareTray.title": "比較",
    "compareTray.selected": "支釣竿已選",
    "compareTray.clear": "清除",
    "compareTray.compareNow": "立即比較"
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

console.log("Compare tray translations added.");
