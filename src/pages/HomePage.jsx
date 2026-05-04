import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import RodCard from "../components/RodCard.jsx";
import PageTitle from "../components/PageTitle.jsx";
import { brands } from "../data/brands.js";
import { rods } from "../data/rods.js";
import { articleCards } from "../data/articles.js";
import { series } from "../data/series.js";
import { rodTypeCards } from "../data/rodTypeCards.js";
import { newReleases } from "../data/newReleases.js";
import {
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
} from "../utils/rodFormatters.js";

export default function HomePage() {
  const navigate = useNavigate();
  const [homeSearch, setHomeSearch] = useState("");

  function submitHomeSearch() {
    const trimmed = homeSearch.trim();

    if (trimmed.length > 0) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    navigate("/search");
  }

  const featuredBrands = brands.filter((brand) => brand.featured);
  const secondaryBrands = brands.filter((brand) => !brand.featured);
  const topSeries = series.slice(0, 5);

  const featuredRod =
    rods.find((rod) => rod.id === "daiwa-mobile-pack-866tml") || rods[0];

  const releaseRows = newReleases
    .map((release) => ({
      ...release,
      rod: rods.find((rod) => rod.id === release.rodId),
    }))
    .filter((release) => release.rod);

  return (
    <main className="catalogHome">
      <PageTitle title="Fishing Rod Database" description="Browse and compare fishing rods by brand, series, model, length, closed length, lure rating, PE rating, and construction." />
      <section className="catalogHero compactCatalogueHero">
        <div className="container catalogHeroGrid">
          <div className="catalogHeroCopy">
            <div className="catalogEyebrow">RodBase catalogue</div>
            <h1>Find fishing rods by brand, type, series, and exact specs.</h1>
            <p>
              A brand-first fishing rod database for comparing length, closed length,
              lure rating, PE rating, construction, aliases, and source records.
            </p>

            <div className="catalogHeroSearch">
              <input
                value={homeSearch}
                onChange={(event) => setHomeSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitHomeSearch();
                }}
                placeholder="Search Daiwa Mobile Pack, S86ML, Holiday Pack 270..."
              />
              <button onClick={submitHomeSearch}>Search database</button>
            </div>

            <div className="catalogQuickLinks">
              <button onClick={() => navigate("/search?q=daiwa")}>Daiwa</button>
              <button onClick={() => navigate("/search?q=shimano")}>Shimano</button>
              <button onClick={() => navigate("/search?q=telescopic")}>Telescopic</button>
              <button onClick={() => navigate("/search?q=travel")}>Travel rods</button>
            </div>

            <div className="homeDataStats">
              <div>
                <b>{rods.length}</b>
                <span>Indexed rods</span>
              </div>
              <div>
                <b>{brands.length}</b>
                <span>Brand entries</span>
              </div>
              <div>
                <b>{series.length}</b>
                <span>Series pages</span>
              </div>
            </div>
          </div>

          {featuredRod && (
            <aside className="catalogHeroPanel">
              <div className="panelLabel">Featured indexed rod</div>
              <h2>{featuredRod.displayName}</h2>
              <p>
                {featuredRod.rodType} · {featuredRod.construction} ·{" "}
                {(featuredRod.marketRegions || []).join(" / ") || "Market to be confirmed"}
              </p>

              <div className="heroSpecGrid">
                <div><span>Length</span><b>{formatLengthM(featuredRod.lengthCm)}</b></div>
                <div><span>Closed</span><b>{formatLengthCm(featuredRod.closedLengthCm)}</b></div>
                <div><span>Weight</span><b>{formatWeightG(featuredRod.weightG)}</b></div>
                <div><span>Lure</span><b>{formatLureRange(featuredRod)}</b></div>
              </div>

              <Link className="catalogPanelButton" to={`/rods/${featuredRod.id}`}>
                Open rod page
              </Link>
            </aside>
          )}
        </div>
      </section>

      <section className="container twStyleSection">
        <div className="twSectionTitle">
          <h2>Browse Rods by Brand</h2>
          <p>Start from the manufacturer, then drill into series and model variants.</p>
        </div>

        <div className="twBrandGrid twBrandGridFeatured">
          {featuredBrands.map((brand) => (
            <Link key={brand.id} className="twBrandCard twFeaturedBrandCard" to={`/brands/${brand.id}`}>
              <div className={`twBrandLogo twLogo-${brand.id}`}>
                {brand.logoText}
              </div>
              <div className="twBrandName">{brand.name}</div>
            </Link>
          ))}
        </div>

        <div className="twBrandGrid twBrandGridSecondary">
          {secondaryBrands.map((brand) => (
            <Link key={brand.id} className="twBrandCard twSmallBrandCard" to={`/brands/${brand.id}`}>
              <div className={`twBrandLogo twSmallLogo twLogo-${brand.id}`}>
                {brand.logoText}
              </div>
              <div className="twBrandName">{brand.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container twStyleSection">
        <div className="twSectionTitle">
          <h2>Browse Rods by Type</h2>
          <p>Choose a fishing style first, then compare specs inside that category.</p>
        </div>

        <div className="twTypeGrid">
          {rodTypeCards.map((type) => (
            <Link
              key={type.id}
              className="twTypeCard"
              to={`/search?q=${encodeURIComponent(type.searchQuery)}`}
            >
              <div className="twRodVisual">
                <div className="rodBlank">
                  <span>{type.visualLabel}</span>
                </div>
              </div>
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="catalogSeriesBand newReleaseBand">
        <div className="container">
          <div className="catalogSectionHeader">
            <div>
              <div className="catalogEyebrow">Recently added</div>
              <h2>Newly indexed rods</h2>
            </div>
            <Link className="catalogTextLink" to="/search">View all rods</Link>
          </div>

          <div className="catalogRodGrid">
            {releaseRows.map((release) => (
              <div key={release.rod.id} className="releaseItem">
                <div className="releaseLabel">{release.label}</div>
                <RodCard rod={release.rod} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container catalogSection">
        <div className="catalogSectionHeader">
          <div>
            <div className="catalogEyebrow">Series index</div>
            <h2>Popular rod series</h2>
          </div>
          <Link className="catalogTextLink" to="/brands">Browse brands</Link>
        </div>

        <div className="catalogSeriesGrid">
          {topSeries.map((item) => (
            <Link key={item.id} className="catalogSeriesCard" to={`/series/${item.id}`}>
              <div className="seriesBrand">{item.brand}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="seriesStats">
                <span>{item.catalogueStatus || "In progress"}</span>
                <span>{(item.marketRegions || []).join(" / ") || "Market to be confirmed"}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container catalogSection">
        <div className="catalogSectionHeader">
          <div>
            <div className="catalogEyebrow">Guides</div>
            <h2>Articles & buying notes</h2>
          </div>
          <Link className="catalogTextLink" to="/articles">View articles</Link>
        </div>

        <div className="catalogGuideGrid">
          {articleCards.map((article) => (
            <Link key={article.id} className="catalogGuideCard" to={`/articles/${article.id}`}>
              <Pill>{article.type}</Pill>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <span>Read article →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

