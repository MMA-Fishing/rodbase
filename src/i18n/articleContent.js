const articleContentTranslations = {
  "zh-Hant": {
    "rod-length-and-closed-length": {
      title: "如何理解釣竿總長與收納長度",
      type: "指南",
      description: "解釋總長、收納長度及攜帶性在選擇釣竿時的重要性。",
    },
    "spinning-vs-baitcasting-rods": {
      title: "直鉸竿與橫鉸竿有咩分別",
      type: "基礎",
      description: "用新手容易理解的方式比較魚鉸座類型、拋投手感及常見用途。",
    },
    "telescopic-vs-multi-piece-rods": {
      title: "伸縮竿與多節竿比較",
      type: "比較",
      description: "比較攜帶性、竿身調性、耐用度，以及購買前應該檢查的重點。",
    },
  },
};

export function makeArticleId(article) {
  if (article.id) return article.id;

  return String(article.title || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getArticleText(locale, article, field) {
  const id = makeArticleId(article);
  return articleContentTranslations[locale]?.[id]?.[field] ?? article[field] ?? "";
}
