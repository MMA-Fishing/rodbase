import { Link } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import { articleCards } from "../data/articles.js";

export default function ArticlesPage() {
  return (
    <main className="articlesCataloguePage">
      <section className="articlesHero">
        <div className="container articlesHeroInner articlesHeroInnerSimple">
          <div>
            <div className="catalogEyebrow">RodBase guides</div>
            <h1>Rod knowledge, buying notes, and spec explanations.</h1>
            <p>
              Learn how to compare rods by total length, closed length, lure rating,
              PE rating, construction, reel type, and fishing style.
            </p>
          </div>
        </div>
      </section>

      <section className="container articlesCatalogueContent">
        <div className="catalogSectionHeader">
          <div>
            <div className="catalogEyebrow">Article index</div>
            <h2>Guides & explanations</h2>
          </div>
          <Link className="catalogTextLink" to="/search">Search rods</Link>
        </div>

        <div className="articlesGrid">
          {articleCards.map((article, index) => (
            <Link key={article.id} className="articleCatalogueCard" to={`/articles/${article.id}`}>
              <div className="articleNumber">{String(index + 1).padStart(2, "0")}</div>

              <div className="articleCardBody">
                <div className="articleCardTop">
                  <Pill>{article.type}</Pill>
                  <span>{article.readTime}</span>
                </div>

                <h3>{article.title}</h3>
                <p>{article.description}</p>

                <div className="articleCardFooter">
                  <span>{article.date}</span>
                  <strong>Read article →</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}



