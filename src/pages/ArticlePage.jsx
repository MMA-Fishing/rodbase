import { Link, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import Pill from "../components/Pill.jsx";
import { articleCards } from "../data/articles.js";
import { useLocale } from "../context/LocaleContext.jsx";
import { getArticleText, makeArticleId } from "../i18n/articleContent.js";

export default function ArticlePage() {
  const { articleId } = useParams();
  const { locale, t } = useLocale();

  const article = articleCards.find((item) => makeArticleId(item) === articleId);

  const relatedArticles = articleCards
    .filter((item) => makeArticleId(item) !== articleId)
    .slice(0, 3);

  if (!article) {
    return (
      <main className="articleDetailPage">
        <PageTitle title={t("article.notFoundTitle")} description={t("article.notFoundText")} />

        <section className="container articleMissingPanel">
          <div className="catalogEyebrow">404</div>
          <h1>{t("article.notFoundTitle")}</h1>
          <p>{t("article.notFoundText")}</p>
          <Link to="/articles">{t("article.openArticles")}</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="articleDetailPage">
      <PageTitle
        title={getArticleText(locale, article, "title")}
        description={getArticleText(locale, article, "description")}
      />

      <section className="articleDetailHero">
        <div className="container articleDetailHeroInner">
          <div>
            <Link className="articleBackLink" to="/articles">
              {t("article.backToArticles")}
            </Link>

            <div className="articleTypeRow">
              <Pill>{getArticleText(locale, article, "type")}</Pill>
            </div>

            <h1>{getArticleText(locale, article, "title")}</h1>
            <p>{getArticleText(locale, article, "description")}</p>
          </div>
        </div>
      </section>

      <section className="container articleDetailLayout">
        <article className="articleBodyPanel">
          <h2>{getArticleText(locale, article, "title")}</h2>

          <p>{getArticleText(locale, article, "description")}</p>
          <p>{t("article.bodyIntro1")}</p>
          <p>{t("article.bodyIntro2")}</p>
        </article>

        <aside className="articleSidePanel">
          <div className="catalogEyebrow">{t("article.referenceNote")}</div>
          <h2>{t("article.referenceNote")}</h2>
          <p>{t("article.referenceText")}</p>
        </aside>
      </section>

      {relatedArticles.length > 0 && (
        <section className="container articleRelatedSection">
          <div className="catalogSectionHeader">
            <div>
              <div className="catalogEyebrow">{t("articles.eyebrow")}</div>
              <h2>{t("article.relatedTitle")}</h2>
            </div>
          </div>

          <div className="articleCatalogueGrid">
            {relatedArticles.map((item) => {
              const relatedId = makeArticleId(item);

              return (
                <Link key={relatedId} className="articleCatalogueCard" to={`/articles/${relatedId}`}>
                  <Pill>{getArticleText(locale, item, "type")}</Pill>
                  <h2>{getArticleText(locale, item, "title")}</h2>
                  <p>{getArticleText(locale, item, "description")}</p>
                  <span>{t("articles.readArticle")}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
