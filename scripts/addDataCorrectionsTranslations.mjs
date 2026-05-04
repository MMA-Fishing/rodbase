import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "data.pageTitle": "Data & Corrections",
    "data.pageDescription": "RodBase data policy, source policy, image policy, and correction process.",
    "data.eyebrow": "Data policy",
    "data.title": "Data, sources, and corrections.",
    "data.description": "RodBase is built as a reference catalogue. Specs should be traceable, regional differences should be visible, and uncertain data should be corrected instead of hidden.",
    "data.sourceTitle": "Source policy",
    "data.sourceText": "RodBase prioritizes official product pages, official catalogues, and regional brand websites. Shop listings, reviews, and user submissions can be useful, but should not override official specifications unless clearly explained.",
    "data.imageTitle": "Image and media policy",
    "data.imageText": "RodBase does not copy official product photos by default. Product images should only be used when owned by RodBase, licensed, permission-approved, or otherwise clearly allowed. If usage is not confirmed, RodBase uses a neutral fallback graphic and links users to the official product page.",
    "data.correctionTitle": "Correction process",
    "data.correctionText": "When a specification appears wrong, RodBase should update the record only after checking the source. Corrections should preserve regional context, model code, and last-checked information.",
    "data.referenceTitle": "Reference-only note",
    "data.referenceText": "All specifications, notes, prices, ratings, and comparisons are for reference only. Product details may differ by region and should be checked against official sources before purchase or use.",
    "data.whatCanBeCorrected": "What can be corrected",
    "data.item.specs": "Rod specifications",
    "data.item.aliases": "Names and regional aliases",
    "data.item.sources": "Source links",
    "data.item.status": "Catalogue status",
    "data.item.media": "Image or logo usage status",
    "data.openSearch": "Open rod search",
    "data.browseBrands": "Browse brands"
  },

  "zh-Hant": {
    "data.pageTitle": "資料與更正",
    "data.pageDescription": "RodBase 的資料政策、來源政策、圖片政策及更正流程。",
    "data.eyebrow": "資料政策",
    "data.title": "資料、來源與更正。",
    "data.description": "RodBase 是參考型釣竿目錄。規格應可追溯來源，地區差異應清楚顯示，而不確定資料應被修正，而不是隱藏。",
    "data.sourceTitle": "來源政策",
    "data.sourceText": "RodBase 優先使用官方產品頁、官方目錄及品牌地區網站。店舖頁、評論及用戶提交資料可以作輔助參考，但不應在沒有說明的情況下取代官方規格。",
    "data.imageTitle": "圖片與媒體政策",
    "data.imageText": "RodBase 預設不複製官方產品照片。產品圖片只應在 RodBase 擁有、已授權、已獲准使用，或明確可用的情況下使用。如未確認使用權，RodBase 會使用中性參考圖示，並連結至官方產品頁。",
    "data.correctionTitle": "更正流程",
    "data.correctionText": "當某項規格看似錯誤時，RodBase 應先核對來源，再更新紀錄。更正時應保留地區背景、型號代碼及最後檢查日期。",
    "data.referenceTitle": "只供參考提示",
    "data.referenceText": "所有規格、筆記、價格、評分及比較內容只供參考。產品資料可能因地區而異，購買或使用前應以官方來源為準。",
    "data.whatCanBeCorrected": "可更正內容",
    "data.item.specs": "釣竿規格",
    "data.item.aliases": "名稱與地區別名",
    "data.item.sources": "來源連結",
    "data.item.status": "目錄狀態",
    "data.item.media": "圖片或標誌使用狀態",
    "data.openSearch": "開啟釣竿搜尋",
    "data.browseBrands": "瀏覽品牌"
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

console.log("Data and corrections translations added.");
