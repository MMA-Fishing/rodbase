export function makeArticleId(article) {
  if (article.id) return article.id;

  return String(article.title || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getArticleText(locale, article, field) {
  return article[field] ?? "";
}
