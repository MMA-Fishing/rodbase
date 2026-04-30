import { Link } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import { articleCards } from "../data/articles.js";

export default function ArticlesPage() {
  return (
    <main className="container page">
      <div className="pageIntro">
        <div className="eyebrow">Articles & guides</div>
        <h1>Learn how to compare rods.</h1>
        <p className="muted wide">
          Article pages are where RodBase can explain rod specs, buying decisions, terminology,
          and comparison logic without mixing opinion into official rod data.
        </p>
      </div>

      <div className="guideGrid">
        {articleCards.map((article) => (
          <Link key={article.id} className="card guideCard" to={`/articles/${article.id}`}>
            <Pill>{article.type}</Pill>
            <h3>{article.title}</h3>
            <p className="muted">{article.description}</p>
            <div className="articleMeta">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <span className="textButton">Read article →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
