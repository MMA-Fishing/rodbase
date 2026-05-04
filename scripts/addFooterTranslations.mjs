import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "footer.description": "RodBase is a fishing rod database and comparison tool for browsing rods by brand, series, model, specifications, use case, and source records.",
    "footer.disclaimer": "All rod specifications, references, prices, notes, ratings, and comparisons are for reference only. Product details may vary by region and should be checked against official sources before purchase or use.",
    "footer.database": "Database",
    "footer.brands": "Brands",
    "footer.series": "Series",
    "footer.search": "Search rods",
    "footer.compare": "Compare rods",
    "footer.content": "Content",
    "footer.articles": "Articles",
    "footer.dataCorrections": "Data & Corrections",
    "footer.officialReferences": "Official references",
    "footer.future": "Future",
    "footer.reels": "Reels",
    "footer.communityData": "Community data",
    "footer.multilingual": "More languages",
    "footer.referenceOnly": "Reference-only catalogue"
  },

  "zh-Hant": {
    "footer.description": "RodBase 是釣竿資料庫與比較工具，可按品牌、系列、型號、規格、用途及資料來源紀錄瀏覽釣竿。",
    "footer.disclaimer": "所有釣竿規格、參考連結、價格、筆記、評分及比較內容只供參考。產品資料可能因地區而異，購買或使用前應以官方來源為準。",
    "footer.database": "資料庫",
    "footer.brands": "品牌",
    "footer.series": "系列",
    "footer.search": "搜尋釣竿",
    "footer.compare": "比較釣竿",
    "footer.content": "內容",
    "footer.articles": "文章",
    "footer.dataCorrections": "資料與更正",
    "footer.officialReferences": "官方參考",
    "footer.future": "未來功能",
    "footer.reels": "魚鉸",
    "footer.communityData": "社群資料",
    "footer.multilingual": "更多語言",
    "footer.referenceOnly": "只供參考的目錄"
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

console.log("Footer translations added.");
