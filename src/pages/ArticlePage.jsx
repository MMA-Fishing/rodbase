import { Link, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import Pill from "../components/Pill.jsx";
import { articleCards } from "../data/articles.js";
import { useLocale } from "../context/LocaleContext.jsx";

export default function ArticlePage() {
  const { articleId } = useParams();
  const { t } = useLocale();

  const article = articleCards.find((item) => item.id === articleId);
  const relatedArticles = articleCards
    .filter((item) => item.id !== articleId)
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
      <PageTitle title={article.title} description={article.description} />

      <section className="articleDetailHero">
        <div className="container articleDetailHeroInner">
          <div>
            <Link className="articleBackLink" to="/articles">
              {t("article.backToArticles")}
            </Link>

            <div className="articleTypeRow">
              <Pill>{article.type}</Pill>
            </div>

            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </div>
        </div>
      </section>

      <section className="container articleDetailLayout">
        <article className="articleBodyPanel">
          <h2>{article.title}</h2>

          <p>
            {article.description}
          </p>

          <p>
            RodBase articles are intended to help users understand rod data in context:
            total length, closed length, rod weight, construction, lure rating, PE rating,
            and how those specifications affect real-world use.
          </p>

          <p>
            More detailed article content can be expanded here later. For now, this page
            acts as a structured article shell connected to the catalogue and multilingual UI.
          </p>
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
            {relatedArticles.map((item) => (
              <Link key={item.id} className="articleCatalogueCard" to={`/articles/${item.id}`}>
                <Pill>{item.type}</Pill>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span>{t("articles.readArticle")}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
