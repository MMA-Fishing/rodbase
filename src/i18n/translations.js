export const supportedLocales = [
  {
    code: "en",
    label: "EN",
    nativeName: "English",
    htmlLang: "en",
  },
  {
    code: "zh-Hant",
    label: "繁中",
    nativeName: "繁體中文",
    htmlLang: "zh-Hant",
  },
];

export const translations = {
  en: {
    "topbar.left": "Fishing rod database & comparison tool",
    "topbar.right": "Browse by brand, series, type, and exact specifications",

    "brand.subtitle": "Fishing Rod Database",

    "nav.rods": "Rods",
    "nav.brands": "Brands",
    "nav.compare": "Compare",
    "nav.articles": "Articles",
    "nav.reels": "Reels",
    "nav.next": "Next",

    "header.searchPlaceholder": "Search rods, series, model code...",
    "header.mobileSearchPlaceholder": "Search RodBase...",
    "header.search": "Search",
    "header.searchRods": "Search rods",
    "header.dataCorrections": "Data & Corrections",
  },

  "zh-Hant": {
    "topbar.left": "釣竿資料庫與比較工具",
    "topbar.right": "按品牌、系列、類型及詳細規格瀏覽釣竿",

    "brand.subtitle": "釣竿資料庫",

    "nav.rods": "釣竿",
    "nav.brands": "品牌",
    "nav.compare": "比較",
    "nav.articles": "文章",
    "nav.reels": "魚鉸",
    "nav.next": "下一步",

    "header.searchPlaceholder": "搜尋釣竿、系列、型號...",
    "header.mobileSearchPlaceholder": "搜尋 RodBase...",
    "header.search": "搜尋",
    "header.searchRods": "搜尋釣竿",
    "header.dataCorrections": "資料與更正",
  },
};

export function translate(locale, key) {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
