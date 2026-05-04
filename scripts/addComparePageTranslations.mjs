import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "compare.pageTitle": "Compare Rods",
    "compare.pageDescription": "Compare selected fishing rods side by side by dimensions, construction, lure rating, PE rating, use case, and source records.",
    "compare.eyebrow": "Compare rods",
    "compare.title": "Side-by-side fishing rod comparison.",
    "compare.description": "Select rods from the catalogue, then compare dimensions, casting range, portability, market status, and usage notes in one structured view.",
    "compare.selectedRods": "Selected rods",
    "compare.differentSpecs": "Different specs",
    "compare.maximumRods": "Maximum rods",
    "compare.currentSet": "Current comparison set",
    "compare.addChangeRods": "Add / change rods",
    "compare.clearCompare": "Clear compare",
    "compare.noRodsSelected": "No rods selected",
    "compare.chooseBeforeComparing": "Choose rods before comparing.",
    "compare.emptyText": "Go to the rod finder and tick Compare on the rods you want to compare. RodBase will remember your selection while you browse.",
    "compare.openRodFinder": "Open rod finder",
    "compare.remove": "Remove",
    "compare.showDifferencesOnly": "Show differences only",
    "compare.differingRowsFound": "differing rows found",
    "compare.differingRowFound": "differing row found",
    "compare.swipeHint": "Swipe sideways to compare all rod specifications.",
    "compare.parameter": "Parameter",
    "compare.different": "Different",
    "compare.noteEyebrow": "Comparison note",
    "compare.noteTitle": "How to read this comparison",
    "compare.noteText": "Use “Show differences only” when the table becomes long. Total length affects reach and line control, closed length affects portability, and lure / PE ratings help match the rod to the fishing method. Source records should be checked before using any specification as final.",

    "compare.group.identity": "Identity",
    "compare.group.dimensions": "Dimensions",
    "compare.group.casting": "Casting, line & action",
    "compare.group.usePrice": "Use, price & notes",

    "compare.row.brand": "Brand",
    "compare.row.series": "Series",
    "compare.row.model": "Model / variant",
    "compare.row.generation": "Generation",
    "compare.row.catalogueStatus": "Catalogue status",
    "compare.row.marketRegions": "Market regions",
    "compare.row.totalLength": "Total length",
    "compare.row.closedLength": "Closed length",
    "compare.row.rodWeight": "Rod weight",
    "compare.row.sections": "Sections",
    "compare.row.construction": "Construction",
    "compare.row.rodType": "Rod type",
    "compare.row.reelType": "Reel type",
    "compare.row.lureWeight": "Lure weight",
    "compare.row.peRating": "PE rating",
    "compare.row.power": "Power",
    "compare.row.action": "Action",
    "compare.row.tipType": "Tip type",
    "compare.row.useCases": "Use cases",
    "compare.row.typicalPrice": "Typical price",
    "compare.row.rating": "Rating"
  },

  "zh-Hant": {
    "compare.pageTitle": "比較釣竿",
    "compare.pageDescription": "按尺寸、結構、餌重、PE 線號、用途及資料來源，並排比較已選釣竿。",
    "compare.eyebrow": "比較釣竿",
    "compare.title": "釣竿並排規格比較。",
    "compare.description": "從目錄選擇釣竿後，可集中比較尺寸、拋投範圍、攜帶性、市場狀態及用途筆記。",
    "compare.selectedRods": "已選釣竿",
    "compare.differentSpecs": "不同規格",
    "compare.maximumRods": "最多釣竿",
    "compare.currentSet": "目前比較清單",
    "compare.addChangeRods": "加入 / 更改釣竿",
    "compare.clearCompare": "清除比較",
    "compare.noRodsSelected": "未選擇釣竿",
    "compare.chooseBeforeComparing": "請先選擇釣竿再比較。",
    "compare.emptyText": "前往釣竿搜尋頁，在想比較的釣竿上勾選「比較」。RodBase 會在你瀏覽期間保留選擇。",
    "compare.openRodFinder": "開啟釣竿搜尋",
    "compare.remove": "移除",
    "compare.showDifferencesOnly": "只顯示不同項目",
    "compare.differingRowsFound": "個不同項目",
    "compare.differingRowFound": "個不同項目",
    "compare.swipeHint": "可左右滑動查看所有釣竿規格。",
    "compare.parameter": "項目",
    "compare.different": "不同",
    "compare.noteEyebrow": "比較提示",
    "compare.noteTitle": "如何閱讀比較表",
    "compare.noteText": "當表格太長時，可使用「只顯示不同項目」。總長影響拋投距離及控線；收納長度影響攜帶性；餌重及 PE 線號有助判斷釣竿是否適合目標釣法。最終規格仍應以官方或來源紀錄為準。",

    "compare.group.identity": "身份資料",
    "compare.group.dimensions": "尺寸",
    "compare.group.casting": "拋投、線號與調性",
    "compare.group.usePrice": "用途、價格與備註",

    "compare.row.brand": "品牌",
    "compare.row.series": "系列",
    "compare.row.model": "型號 / 版本",
    "compare.row.generation": "世代",
    "compare.row.catalogueStatus": "目錄狀態",
    "compare.row.marketRegions": "市場地區",
    "compare.row.totalLength": "總長",
    "compare.row.closedLength": "收納長度",
    "compare.row.rodWeight": "釣竿重量",
    "compare.row.sections": "節數",
    "compare.row.construction": "結構",
    "compare.row.rodType": "釣竿類型",
    "compare.row.reelType": "魚鉸類型",
    "compare.row.lureWeight": "餌重",
    "compare.row.peRating": "PE 線號",
    "compare.row.power": "硬度",
    "compare.row.action": "調性",
    "compare.row.tipType": "竿先類型",
    "compare.row.useCases": "用途",
    "compare.row.typicalPrice": "參考價格",
    "compare.row.rating": "評分"
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

console.log("Compare page translations added.");
