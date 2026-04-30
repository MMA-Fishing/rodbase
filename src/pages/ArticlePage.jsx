import { Link, useParams } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import { articleCards } from "../data/articles.js";

export default function ArticlePage() {
  const { articleId } = useParams();
  const article = articleCards.find((item) => item.id === articleId);

  if (!article) {
    return (
      <main className="container page">
        <div className="card">
          <div className="eyebrow">Article not found</div>
          <h1>We could not find this article.</h1>
          <p className="note">
            The article may have been renamed, removed, or the URL may be incorrect.
          </p>
          <div className="buttonRow">
            <Link className="blackButton" to="/articles">Back to articles</Link>
            <Link className="outlineButton" to="/">Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container page articlePage">
      <div className="pageIntro">
        <div className="eyebrow">RodBase article</div>
        <div className="pillWrap">
          <Pill>{article.type}</Pill>
          <Pill>{article.date}</Pill>
          <Pill>{article.readTime}</Pill>
        </div>
        <h1>{article.title}</h1>
        <p className="muted wide">{article.description}</p>
      </div>

      <article className="card articleBody">
        {article.sections.map((section) => (
          <section key={section.heading} className="articleSection">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <div className="articleDisclaimer">
          This article is for general reference only. Always check official brand specifications,
          current product information, and your own fishing requirements before making a purchase.
        </div>
      </article>

      <div className="buttonRow articleActions">
        <Link className="outlineButton" to="/articles">Back to articles</Link>
        <Link className="blackButton" to="/search">Search rods</Link>
      </div>
    </main>
  );
}

