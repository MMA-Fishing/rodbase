import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import RodCard from "../components/RodCard.jsx";
import BrandLogo from "../components/BrandLogo.jsx";
import PageTitle from "../components/PageTitle.jsx";
import { brands } from "../data/brands.js";
import { rods } from "../data/rods.js";
import { articleCards } from "../data/articles.js";
import { series } from "../data/series.js";
import { rodTypeCards } from "../data/rodTypeCards.js";
import { newReleases } from "../data/newReleases.js";
import { useLocale } from "../context/LocaleContext.jsx";
import { getArticleText } from "../i18n/articleContent.js";
import {
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
} from "../utils/rodFormatters.js";

export default function HomePage() {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
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
      <PageTitle title={t("home.pageTitle")} description={t("home.pageDescription")} />

      <section className="catalogHero compactCatalogueHero">
        <div className="container catalogHeroGrid">
          <div className="catalogHeroCopy">
            <div className="catalogEyebrow">{t("home.eyebrow")}</div>
            <h1>{t("home.title")}</h1>
            <p>{t("home.description")}</p>

            <div className="catalogHeroSearch">
              <input
                value={homeSearch}
                onChange={(event) => setHomeSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitHomeSearch();
                }}
                placeholder={t("home.searchPlaceholder")}
              />
              <button onClick={submitHomeSearch}>{t("home.searchButton")}</button>
            </div>

            <div className="catalogQuickLinks">
              <button onClick={() => navigate("/search?q=daiwa")}>Daiwa</button>
              <button onClick={() => navigate("/search?q=shimano")}>Shimano</button>
              <button onClick={() => navigate("/search?q=telescopic")}>{t("search.quick.telescopic")}</button>
              <button onClick={() => navigate("/search?q=travel")}>{t("search.quick.travel")}</button>
            </div>

            <div className="homeDataStats">
              <div>
                <b>{rods.length}</b>
                <span>{t("home.indexedRods")}</span>
              </div>
              <div>
                <b>{brands.length}</b>
                <span>{t("home.brandEntries")}</span>
              </div>
              <div>
                <b>{series.length}</b>
                <span>{t("home.seriesPages")}</span>
              </div>
            </div>
          </div>

          {featuredRod && (
            <aside className="catalogHeroPanel">
              <div className="panelLabel">{t("home.featuredRod")}</div>
              <h2>{featuredRod.displayName}</h2>
              <p>
                {featuredRod.rodType} · {featuredRod.construction} ·{" "}
                {(featuredRod.marketRegions || []).join(" / ") || "Market to be confirmed"}
              </p>

              <div className="heroSpecGrid">
                <div><span>{t("home.length")}</span><b>{formatLengthM(featuredRod.lengthCm)}</b></div>
                <div><span>{t("home.closed")}</span><b>{formatLengthCm(featuredRod.closedLengthCm)}</b></div>
                <div><span>{t("home.weight")}</span><b>{formatWeightG(featuredRod.weightG)}</b></div>
                <div><span>{t("home.lure")}</span><b>{formatLureRange(featuredRod)}</b></div>
              </div>

              <Link className="catalogPanelButton" to={`/rods/${featuredRod.id}`}>
                {t("home.openRodPage")}
              </Link>
            </aside>
          )}
        </div>
      </section>

      <section className="container twStyleSection">
        <div className="twSectionTitle">
          <h2>{t("home.browseBrandTitle")}</h2>
          <p>{t("home.browseBrandDesc")}</p>
        </div>

        <div className="twBrandGrid twBrandGridFeatured">
          {featuredBrands.map((brand) => (
            <Link key={brand.id} className="twBrandCard twFeaturedBrandCard" to={`/brands/${brand.id}`}>
              <BrandLogo brand={brand} size="featured" />
              <div className="twBrandName">{brand.name}</div>
            </Link>
          ))}
        </div>

        <div className="twBrandGrid twBrandGridSecondary">
          {secondaryBrands.map((brand) => (
            <Link key={brand.id} className="twBrandCard twSmallBrandCard" to={`/brands/${brand.id}`}>
              <BrandLogo brand={brand} size="small" />
              <div className="twBrandName">{brand.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container twStyleSection">
        <div className="twSectionTitle">
          <h2>{t("home.browseTypeTitle")}</h2>
          <p>{t("home.browseTypeDesc")}</p>
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
              <div className="catalogEyebrow">{t("home.recentEyebrow")}</div>
              <h2>{t("home.recentTitle")}</h2>
            </div>
            <Link className="catalogTextLink" to="/search">{t("home.viewAllRods")}</Link>
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
            <div className="catalogEyebrow">{t("home.seriesEyebrow")}</div>
            <h2>{t("home.seriesTitle")}</h2>
          </div>
          <Link className="catalogTextLink" to="/brands">{t("home.browseBrands")}</Link>
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
            <div className="catalogEyebrow">{t("home.guidesEyebrow")}</div>
            <h2>{t("home.guidesTitle")}</h2>
          </div>
          <Link className="catalogTextLink" to="/articles">{t("home.viewArticles")}</Link>
        </div>

        <div className="catalogGuideGrid">
          {articleCards.map((article) => (
            <Link key={article.id} className="catalogGuideCard" to={`/articles/${article.id}`}>
              <Pill>{getArticleText(locale, article, "type")}</Pill>
              <h3>{getArticleText(locale, article, "title")}</h3>
              <p>{getArticleText(locale, article, "description")}</p>
              <span>{t("home.readArticle")}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}


