import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import Pill from "../components/Pill.jsx";
import { articleCards } from "../data/articles.js";
import { useLocale } from "../context/LocaleContext.jsx";
import { getArticleText, makeArticleId } from "../i18n/articleContent.js";

export default function ArticlesPage() {
  const { locale, t } = useLocale();

  return (
    <main className="articlesCataloguePage">
      <PageTitle
        title={t("articles.pageTitle")}
        description={t("articles.pageDescription")}
      />

      <section className="articlesHero">
        <div className="container articlesHeroInner">
          <div>
            <div className="catalogEyebrow">{t("articles.eyebrow")}</div>
            <h1>{t("articles.title")}</h1>
            <p>{t("articles.description")}</p>
          </div>

          <div className="articlesHeroStats">
            <div>
              <b>{articleCards.length}</b>
              <span>{t("articles.availableArticles")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container articlesCatalogueContent">
        {articleCards.length > 0 ? (
          <div className="articleCatalogueGrid">
            {articleCards.map((article) => {
              const articleId = makeArticleId(article);

              return (
                <Link
                  key={articleId}
                  className="articleCatalogueCard"
                  to={`/articles/${articleId}`}
                >
                  <Pill>{getArticleText(locale, article, "type")}</Pill>
                  <h2>{getArticleText(locale, article, "title")}</h2>
                  <p>{getArticleText(locale, article, "description")}</p>
                  <span>{t("articles.readArticle")}</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="catalogNoResults">
            <div className="catalogEyebrow">{t("articles.eyebrow")}</div>
            <h2>{t("articles.noArticles")}</h2>
          </div>
        )}
      </section>
    </main>
  );
}
