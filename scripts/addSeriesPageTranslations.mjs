import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "series.pageDescription": "Browse rod variants, specs, source links, and indexed models.",
    "series.backToBrand": "Back to brand",
    "series.searchSeries": "Search this series",
    "series.eyebrow": "Series profile",
    "series.whatFor": "What this series is for",
    "series.officialEyebrow": "Official references",
    "series.sourceLinks": "Series source links",
    "series.overview": "Series overview",
    "series.variants": "Variants",
    "series.currentRecent": "Current / recent",
    "series.archived": "Archived",
    "series.market": "Market",
    "series.variantTableEyebrow": "Variant table",
    "series.variantTableTitle": "Indexed model variants",
    "series.variantTableDesc": "Structured specs for quick scanning before opening individual rod pages.",
    "series.table.model": "Model",
    "series.table.length": "Length",
    "series.table.closed": "Closed",
    "series.table.weight": "Weight",
    "series.table.lure": "Lure",
    "series.table.line": "Line",
    "series.table.power": "Power",
    "series.table.action": "Action",
    "series.cardsEyebrow": "Rod records",
    "series.cardsTitle": "Indexed rods in this series",
    "series.emptyTitle": "No rod variants indexed yet.",
    "series.emptyText": "This series page exists, but individual model records are still being prepared.",
    "series.lastChecked": "Last checked"
  },

  "zh-Hant": {
    "series.pageDescription": "瀏覽釣竿版本、規格、來源連結及已收錄型號。",
    "series.backToBrand": "返回品牌",
    "series.searchSeries": "搜尋此系列",
    "series.eyebrow": "系列資料",
    "series.whatFor": "此系列的用途",
    "series.officialEyebrow": "官方參考",
    "series.sourceLinks": "系列來源連結",
    "series.overview": "系列概覽",
    "series.variants": "版本",
    "series.currentRecent": "現行 / 近期",
    "series.archived": "已停產 / 舊款",
    "series.market": "市場",
    "series.variantTableEyebrow": "型號表",
    "series.variantTableTitle": "已收錄型號版本",
    "series.variantTableDesc": "以結構化規格快速瀏覽，再進入個別釣竿頁面。",
    "series.table.model": "型號",
    "series.table.length": "總長",
    "series.table.closed": "收納",
    "series.table.weight": "重量",
    "series.table.lure": "餌重",
    "series.table.line": "線號",
    "series.table.power": "硬度",
    "series.table.action": "調性",
    "series.cardsEyebrow": "釣竿紀錄",
    "series.cardsTitle": "此系列已收錄釣竿",
    "series.emptyTitle": "暫未收錄型號版本。",
    "series.emptyText": "此系列頁面已建立，但個別型號紀錄仍在準備中。",
    "series.lastChecked": "最後檢查"
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

console.log("Series page translations added.");
