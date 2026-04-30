import { Link, useNavigate } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import StatCard from "../components/StatCard.jsx";
import RodCard from "../components/RodCard.jsx";
import { brands } from "../data/brands.js";
import { rods } from "../data/rods.js";
import { useCases } from "../data/useCases.js";
import { categories } from "../data/categories.js";
import { articleCards } from "../data/articles.js";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <div className="badge">Brand-first fishing rod database</div>
            <h1>Search rods by brand, series, model, or exact specs.</h1>
            <p className="heroText">
              A structured rod index designed like an IMDb for fishing rods: brand pages, series pages,
              model variants, regional aliases, specs, comparisons, reviews, and source confidence.
            </p>

            <div className="searchBox">
              <input placeholder="Search Daiwa Holiday Pack 270, Expride 265ML-2, S86ML..." />
              <button onClick={() => navigate("/search")}>Advanced search</button>
            </div>

            <div className="pillWrap">
              {useCases.slice(0, 8).map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </div>

          <div className="heroPreview">
            <div className="darkPanel">
              <div className="row topRow">
                <div>
                  <div className="mutedLight">Featured rod page</div>
                  <h2>Daiwa Mobile Pack 866TML</h2>
                </div>
                <div className="previewIcon">▧</div>
              </div>
              <div className="specGrid two">
                <div className="darkSpec"><span>Series</span><b>Mobile Pack</b></div>
                <div className="darkSpec"><span>Construction</span><b>Telescopic</b></div>
                <div className="darkSpec"><span>Length</span><b>2.59m</b></div>
                <div className="darkSpec"><span>Closed</span><b>54cm</b></div>
              </div>
            </div>
            <div className="miniStats">
              <StatCard icon="◎" label="Rod records" value="575" />
              <StatCard icon="◌" label="Markets" value="6" />
              <StatCard icon="⇄" label="Comparisons" value="1.2k" />
            </div>
          </div>
        </div>
      </section>

      <section className="brandStripSection">
        <div className="container">
          <div className="brandStrip">
            <span className="brandStripLabel">Top brands</span>
            {brands.map((brand) => (
              <button key={brand.id} onClick={() => navigate(`/brands/${brand.id}`)}>
                {brand.name}
              </button>
            ))}
            <button onClick={() => navigate("/brands")}>More brands →</button>
          </div>
        </div>
      </section>

      <section className="section container compactSection">
        <div className="sectionHeader">
          <div>
            <h2>Browse by category</h2>
            <p className="muted">Rods are active first. Reels are planned as the next database category.</p>
          </div>
        </div>
        <div className="categoryGrid">
          {categories.map((category) => (
            <div key={category.name} className={category.status === "Active" ? "categoryCard activeCategory" : "categoryCard"}>
              <div className="row topRow">
                <h3>{category.name}</h3>
                <Pill active={category.status === "Active"}>{category.status}</Pill>
              </div>
              <p className="muted">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="sectionHeader">
          <div>
            <h2>Popular brands</h2>
            <p className="muted">Brand pages lead into series, variants, specs, aliases, and reviews.</p>
          </div>
          <Link className="outlineButton" to="/brands">Browse all brands</Link>
        </div>

        <div className="brandGrid">
          {brands.map((brand) => (
            <button key={brand.id} className="card brandCard" onClick={() => navigate(`/brands/${brand.id}`)}>
              <div className="row topRow">
                <div className="brandLetter">{brand.name.charAt(0)}</div>
                <Pill>{brand.country}</Pill>
              </div>
              <h3>{brand.name}</h3>
              <p className="muted">{brand.rods} indexed rods</p>
              <div className="pillWrap">
                {brand.series.slice(0, 3).map((seriesName) => (
                  <Pill key={seriesName}>{seriesName}</Pill>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="section softBg">
        <div className="container">
          <div className="sectionHeader">
            <div>
              <h2>Recently indexed rods</h2>
              <p className="muted">Every model is built for filter search, comparison, and source tracking.</p>
            </div>
          </div>
          <div className="rodGrid">
            {rods.map((rod) => (
              <RodCard key={rod.id} rod={rod} />
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="sectionHeader">
          <div>
            <h2>Articles & guides</h2>
            <p className="muted">A place for future article pages, suggestions, and beginner explanations.</p>
          </div>
          <Link className="outlineButton" to="/articles">View articles</Link>
        </div>
        <div className="guideGrid">
          {articleCards.map((article) => (
            <Link key={article.id} className="card guideCard" to={`/articles/${article.id}`}>
              <Pill>{article.type}</Pill>
              <h3>{article.title}</h3>
              <p className="muted">{article.description}</p>
              <span className="textButton">Read article →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
