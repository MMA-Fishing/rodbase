import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "rod.pageDescription": "specs, length, closed length, weight, lure rating, PE rating, official references, and comparison data.",
    "rod.backToSearch": "Back to search",
    "rod.addToCompare": "Add to compare",
    "rod.removeFromCompare": "Remove from compare",
    "rod.openCompare": "Open compare",
    "rod.viewOfficialReference": "View official reference",
    "rod.maximumCompare": "Maximum rods can be compared",

    "rod.hero.specs": "Core specs",
    "rod.length": "Total length",
    "rod.closedLength": "Closed length",
    "rod.weight": "Rod weight",
    "rod.lure": "Lure rating",

    "rod.panel.officialSpecs": "Official specs",
    "rod.panel.identity": "Identity",
    "rod.panel.namesAliases": "Names and regional aliases",
    "rod.panel.interpretation": "General interpretation",
    "rod.panel.sources": "Sources",
    "rod.panel.related": "Related rods",

    "rod.field.brand": "Brand",
    "rod.field.series": "Series",
    "rod.field.model": "Model / variant",
    "rod.field.generation": "Generation",
    "rod.field.catalogueStatus": "Catalogue status",
    "rod.field.market": "Market",
    "rod.field.rodType": "Rod type",
    "rod.field.reelType": "Reel type",
    "rod.field.construction": "Construction",
    "rod.field.sections": "Sections",
    "rod.field.power": "Power",
    "rod.field.action": "Action",
    "rod.field.tipType": "Tip type",
    "rod.field.peRating": "PE rating",
    "rod.field.lineRating": "Line rating",
    "rod.field.carbonPercent": "Carbon %",
    "rod.field.price": "Reference price",

    "rod.field.officialName": "Official name",
    "rod.field.japaneseName": "Japanese name",
    "rod.field.chineseName": "Chinese name",
    "rod.field.aliases": "Aliases",
    "rod.field.modelCode": "Model code",
    "rod.field.janCode": "JAN code",

    "rod.sources.description": "Source records link RodBase data back to official, catalogue, shop, or review references.",
    "rod.sources.lastChecked": "Last checked",
    "rod.related.description": "Other indexed rods from the same brand or series."
  },

  "zh-Hant": {
    "rod.pageDescription": "規格、總長、收納長度、重量、餌重、PE 線號、官方參考及比較資料。",
    "rod.backToSearch": "返回搜尋",
    "rod.addToCompare": "加入比較",
    "rod.removeFromCompare": "從比較移除",
    "rod.openCompare": "開啟比較",
    "rod.viewOfficialReference": "查看官方參考",
    "rod.maximumCompare": "比較釣竿數量已達上限",

    "rod.hero.specs": "核心規格",
    "rod.length": "總長",
    "rod.closedLength": "收納長度",
    "rod.weight": "釣竿重量",
    "rod.lure": "餌重",

    "rod.panel.officialSpecs": "官方規格",
    "rod.panel.identity": "身份資料",
    "rod.panel.namesAliases": "名稱與地區別名",
    "rod.panel.interpretation": "一般解讀",
    "rod.panel.sources": "資料來源",
    "rod.panel.related": "相關釣竿",

    "rod.field.brand": "品牌",
    "rod.field.series": "系列",
    "rod.field.model": "型號 / 版本",
    "rod.field.generation": "世代",
    "rod.field.catalogueStatus": "目錄狀態",
    "rod.field.market": "市場",
    "rod.field.rodType": "釣竿類型",
    "rod.field.reelType": "魚鉸類型",
    "rod.field.construction": "結構",
    "rod.field.sections": "節數",
    "rod.field.power": "硬度",
    "rod.field.action": "調性",
    "rod.field.tipType": "竿先類型",
    "rod.field.peRating": "PE 線號",
    "rod.field.lineRating": "線磅",
    "rod.field.carbonPercent": "碳布比例",
    "rod.field.price": "參考價格",

    "rod.field.officialName": "官方名稱",
    "rod.field.japaneseName": "日文名稱",
    "rod.field.chineseName": "中文名稱",
    "rod.field.aliases": "別名",
    "rod.field.modelCode": "型號代碼",
    "rod.field.janCode": "JAN 條碼",

    "rod.sources.description": "來源紀錄會把 RodBase 資料連回官方、目錄、店舖或評論參考。",
    "rod.sources.lastChecked": "最後檢查",
    "rod.related.description": "同品牌或同系列的其他已收錄釣竿。"
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

console.log("Rod page translations added.");
