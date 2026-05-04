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

    "home.title": "Find fishing rods by brand, type, series, and exact specs.",
    "home.description": "A brand-first fishing rod database for comparing length, closed length, lure rating, PE rating, construction, aliases, and source records.",
    "home.eyebrow": "RodBase catalogue",
    "home.searchPlaceholder": "Search Daiwa Mobile Pack, S86ML, Holiday Pack 270...",
    "home.searchButton": "Search database",
    "home.indexedRods": "Indexed rods",
    "home.brandEntries": "Brand entries",
    "home.seriesPages": "Series pages",

    "home.featuredRod": "Featured indexed rod",
    "home.length": "Length",
    "home.closed": "Closed",
    "home.weight": "Weight",
    "home.lure": "Lure",
    "home.openRodPage": "Open rod page",

    "home.browseBrandTitle": "Browse Rods by Brand",
    "home.browseBrandDesc": "Start from the manufacturer, then drill into series and model variants.",
    "home.browseTypeTitle": "Browse Rods by Type",
    "home.browseTypeDesc": "Choose a fishing style first, then compare specs inside that category.",

    "home.recentEyebrow": "Recently added",
    "home.recentTitle": "Newly indexed rods",
    "home.viewAllRods": "View all rods",

    "home.seriesEyebrow": "Series index",
    "home.seriesTitle": "Popular rod series",
    "home.browseBrands": "Browse brands",

    "home.guidesEyebrow": "Guides",
    "home.guidesTitle": "Articles & buying notes",
    "home.viewArticles": "View articles",
    "home.readArticle": "Read article →",

    "home.pageTitle": "Fishing Rod Database",
    "home.pageDescription": "Browse and compare fishing rods by brand, series, model, length, closed length, lure rating, PE rating, and construction.",
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

    "home.title": "按品牌、類型、系列及詳細規格尋找釣竿。",
    "home.description": "以品牌為起點的釣竿資料庫，方便比較總長、收納長度、餌重、PE 線號、結構、別名及資料來源紀錄。",
    "home.eyebrow": "RodBase 目錄",
    "home.searchPlaceholder": "搜尋 Daiwa Mobile Pack、S86ML、Holiday Pack 270...",
    "home.searchButton": "搜尋資料庫",
    "home.indexedRods": "已收錄釣竿",
    "home.brandEntries": "品牌項目",
    "home.seriesPages": "系列頁面",

    "home.featuredRod": "精選收錄釣竿",
    "home.length": "總長",
    "home.closed": "收納",
    "home.weight": "重量",
    "home.lure": "餌重",
    "home.openRodPage": "開啟釣竿頁面",

    "home.browseBrandTitle": "按品牌瀏覽釣竿",
    "home.browseBrandDesc": "先由製造商開始，再進入系列及型號版本。",
    "home.browseTypeTitle": "按類型瀏覽釣竿",
    "home.browseTypeDesc": "先選擇釣法或用途，再在類別內比較規格。",

    "home.recentEyebrow": "最近加入",
    "home.recentTitle": "新收錄釣竿",
    "home.viewAllRods": "查看所有釣竿",

    "home.seriesEyebrow": "系列索引",
    "home.seriesTitle": "熱門釣竿系列",
    "home.browseBrands": "瀏覽品牌",

    "home.guidesEyebrow": "指南",
    "home.guidesTitle": "文章與選購筆記",
    "home.viewArticles": "查看文章",
    "home.readArticle": "閱讀文章 →",

    "home.pageTitle": "釣竿資料庫",
    "home.pageDescription": "按品牌、系列、型號、總長、收納長度、餌重、PE 線號及結構瀏覽和比較釣竿。",
  },
};

export function translate(locale, key) {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
