import fs from "node:fs";
import { supportedLocales, translations } from "../src/i18n/translations.js";

const additions = {
  en: {
    "articles.pageTitle": "Articles",
    "articles.pageDescription": "Fishing rod guides, buying notes, comparison articles, and beginner explanations.",
    "articles.eyebrow": "RodBase guides",
    "articles.title": "Articles & buying notes.",
    "articles.description": "Beginner-friendly guides for understanding fishing rod specifications, construction, portability, and use cases.",
    "articles.availableArticles": "Available articles",
    "articles.readArticle": "Read article →",
    "articles.noArticles": "No articles available yet.",
    "article.backToArticles": "Back to articles",
    "article.referenceNote": "Reference note",
    "article.referenceText": "This article is a general guide only. Always check official product specifications and local fishing conditions before buying or using a rod.",
    "article.relatedTitle": "Related articles",
    "article.notFoundTitle": "Article not found",
    "article.notFoundText": "This article may have moved or has not been published yet.",
    "article.openArticles": "Open articles"
  },

  "zh-Hant": {
    "articles.pageTitle": "文章",
    "articles.pageDescription": "釣竿指南、選購筆記、比較文章及新手解釋。",
    "articles.eyebrow": "RodBase 指南",
    "articles.title": "文章與選購筆記。",
    "articles.description": "用較易明的方式解釋釣竿規格、結構、攜帶性及用途。",
    "articles.availableArticles": "可閱讀文章",
    "articles.readArticle": "閱讀文章 →",
    "articles.noArticles": "暫時未有文章。",
    "article.backToArticles": "返回文章",
    "article.referenceNote": "參考提示",
    "article.referenceText": "本文只屬一般指南。購買或使用釣竿前，仍應查看官方產品規格及當地釣魚環境。",
    "article.relatedTitle": "相關文章",
    "article.notFoundTitle": "找不到文章",
    "article.notFoundText": "此文章可能已移動，或尚未正式發布。",
    "article.openArticles": "開啟文章列表"
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

console.log("Article translations added.");
