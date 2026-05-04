import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "brands.pageTitle": "Browse Rod Brands",
    "brands.pageDescription": "Browse fishing rods by brand, series, model family, official references, and indexed rod variants.",
    "brands.eyebrow": "Brand index",
    "brands.title": "Browse fishing rods by brand.",
    "brands.description": "Start from the manufacturer, then drill into series, model families, official references, and indexed rod variants.",
    "brands.featuredTitle": "Featured brands",
    "brands.featuredDesc": "Major rod brands with indexed series and model records.",
    "brands.moreTitle": "More brands",
    "brands.moreDesc": "Additional manufacturers prepared for future catalogue expansion.",
    "brands.indexedRods": "indexed rods",
    "brands.series": "series",
    "brands.openBrand": "Open brand",

    "brandDetail.pageSuffix": "Rods",
    "brandDetail.backAllBrands": "← All brands",
    "brandDetail.searchBrandRods": "Search brand rods",
    "brandDetail.officialEyebrow": "Official references",
    "brandDetail.officialTitleSuffix": "official websites",
    "brandDetail.officialDesc": "Product names, model availability, and specifications may differ by region. Always check the relevant official regional site before treating product data as final.",
    "brandDetail.seriesEyebrow": "Series index",
    "brandDetail.seriesTitle": "Indexed series",
    "brandDetail.seriesDesc": "Open a series to view model variants, specification tables, and source records.",
    "brandDetail.currentRecent": "Current / recent",
    "brandDetail.variants": "Variants",
    "brandDetail.indexed": "Indexed",
    "brandDetail.viewSeries": "View series →",
    "brandDetail.noSeriesTitle": "No indexed series yet.",
    "brandDetail.noSeriesText": "This brand has official references prepared, but no complete rod series has been indexed yet.",
    "brandDetail.searchAll": "Search all rods"
  },

  "zh-Hant": {
    "brands.pageTitle": "瀏覽釣竿品牌",
    "brands.pageDescription": "按品牌、系列、型號家族、官方參考連結及已收錄版本瀏覽釣竿。",
    "brands.eyebrow": "品牌索引",
    "brands.title": "按品牌瀏覽釣竿。",
    "brands.description": "先從製造商開始，再進入系列、型號家族、官方參考連結及已收錄釣竿版本。",
    "brands.featuredTitle": "主要品牌",
    "brands.featuredDesc": "已收錄系列及型號紀錄的主要釣竿品牌。",
    "brands.moreTitle": "更多品牌",
    "brands.moreDesc": "為日後擴充目錄而準備的其他製造商。",
    "brands.indexedRods": "支已收錄釣竿",
    "brands.series": "個系列",
    "brands.openBrand": "開啟品牌",

    "brandDetail.pageSuffix": "釣竿",
    "brandDetail.backAllBrands": "← 所有品牌",
    "brandDetail.searchBrandRods": "搜尋此品牌釣竿",
    "brandDetail.officialEyebrow": "官方參考",
    "brandDetail.officialTitleSuffix": "官方網站",
    "brandDetail.officialDesc": "產品名稱、型號供應及規格可能因地區而不同。使用任何資料作最終判斷前，應先查看相關官方地區網站。",
    "brandDetail.seriesEyebrow": "系列索引",
    "brandDetail.seriesTitle": "已收錄系列",
    "brandDetail.seriesDesc": "開啟系列頁面可查看型號版本、規格表及資料來源紀錄。",
    "brandDetail.currentRecent": "現行 / 近期",
    "brandDetail.variants": "版本",
    "brandDetail.indexed": "已收錄",
    "brandDetail.viewSeries": "查看系列 →",
    "brandDetail.noSeriesTitle": "暫未收錄完整系列。",
    "brandDetail.noSeriesText": "此品牌已準備官方參考連結，但尚未建立完整釣竿系列資料。",
    "brandDetail.searchAll": "搜尋所有釣竿"
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

console.log("Brands page translations added.");
