import { Link, useParams } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import RodCard from "../components/RodCard.jsx";
import { series } from "../data/series.js";
import { rods } from "../data/rods.js";
import {
  brandToId,
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
  formatPeRange,
  valueOrUnknown,
} from "../utils/rodFormatters.js";

function formatSeriesMarket(currentSeries) {
  if (!currentSeries.marketRegions || currentSeries.marketRegions.length === 0) {
    return "Market to be confirmed";
  }

  return currentSeries.marketRegions.join(" / ");
}

export default function SeriesPage() {
  const { seriesId } = useParams();
  const currentSeries = series.find((item) => item.id === seriesId);

  if (!currentSeries) {
    return (
      <main className="container page">
        <div className="card">
          <div className="eyebrow">Series not found</div>
          <h1>We could not find this series.</h1>
          <p className="note">
            The series may have been renamed, removed, or the URL may be incorrect.
          </p>
          <div className="buttonRow">
            <Link className="blackButton" to="/brands">Back to brands</Link>
            <Link className="outlineButton" to="/">Home</Link>
          </div>
        </div>
      </main>
    );
  }

  const matchingRods = rods.filter(
    (rod) =>
      rod.brand === currentSeries.brand &&
      rod.series === currentSeries.name
  );

  const featuredRods = rods.filter((rod) =>
    (currentSeries.featuredRodIds || []).includes(rod.id)
  );

  const rodsToShow = matchingRods.length > 0 ? matchingRods : featuredRods;
  const marketText = formatSeriesMarket(currentSeries);

  return (
    <main className="seriesDetailPage">
      <section className="seriesDetailHero">
        <div className="container seriesDetailHeroGrid">
          <div>
            <div className="catalogEyebrow">{currentSeries.brand} / Series</div>
            <h1>{currentSeries.displayName}</h1>
            <p>{currentSeries.description}</p>

            <div className="seriesHeroPills">
              <Pill>{valueOrUnknown(currentSeries.catalogueStatus)}</Pill>
              <Pill>{marketText}</Pill>
              <Pill>{rodsToShow.length} indexed rods</Pill>
            </div>
          </div>

          <div className="seriesHeroVisual">
            <div className="seriesHeroRodRack">
              <div className="seriesHeroRod seriesHeroRodOne" />
              <div className="seriesHeroRod seriesHeroRodTwo" />
              <div className="seriesHeroRod seriesHeroRodThree" />
            </div>

            <div className="seriesHeroVisualLabel">
              <span>{currentSeries.brand}</span>
              <strong>{currentSeries.name}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="container seriesDetailContent">
        <div className="seriesToolbar">
          <Link to={`/brands/${brandToId(currentSeries.brand)}`}>
            ← Back to {currentSeries.brand}
          </Link>
          <Link to={`/search?q=${encodeURIComponent(currentSeries.name)}`}>
            Search this series
          </Link>
        </div>

        <div className="seriesStatsGrid seriesStatsGridClean">
          <div>
            <span>Indexed rods</span>
            <b>{rodsToShow.length}</b>
          </div>
          <div>
            <span>Brand</span>
            <b>{currentSeries.brand}</b>
          </div>
          <div>
            <span>Status</span>
            <b>{currentSeries.catalogueStatus || "In progress"}</b>
          </div>
          <div>
            <span>Market</span>
            <b>{marketText}</b>
          </div>
        </div>

        <section className="seriesPanel">
          <div className="seriesPanelHeader">
            <div>
              <div className="catalogEyebrow">Series profile</div>
              <h2>What this series is for</h2>
            </div>
          </div>

          <p className="seriesProfileText">{currentSeries.description}</p>

          <div className="seriesUseCaseList">
            {(currentSeries.useCases || []).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        {rodsToShow.length > 0 && (
          <section className="seriesPanel">
            <div className="seriesPanelHeader">
              <div>
                <div className="catalogEyebrow">Variant table</div>
                <h2>Indexed rod variants</h2>
              </div>
              <Link to="/compare">Compare rods</Link>
            </div>

            <div className="seriesVariantTableWrap">
              <table className="seriesVariantTable">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Total length</th>
                    <th>Closed</th>
                    <th>Weight</th>
                    <th>Lure</th>
                    <th>PE</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rodsToShow.map((rod) => (
                    <tr key={rod.id}>
                      <td>
                        <Link to={`/rods/${rod.id}`}>
                          <strong>{rod.model}</strong>
                          <span>{rod.displayName}</span>
                        </Link>
                      </td>
                      <td>{formatLengthM(rod.lengthCm)}</td>
                      <td>{formatLengthCm(rod.closedLengthCm)}</td>
                      <td>{formatWeightG(rod.weightG)}</td>
                      <td>{formatLureRange(rod)}</td>
                      <td>{formatPeRange(rod)}</td>
                      <td>{valueOrUnknown(rod.catalogueStatus)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="seriesPanel">
          <div className="seriesPanelHeader">
            <div>
              <div className="catalogEyebrow">Rod cards</div>
              <h2>Rods in this series</h2>
            </div>
            <Link to="/search">Open rod finder</Link>
          </div>

          {rodsToShow.length > 0 ? (
            <div className="catalogRodGrid">
              {rodsToShow.map((rod) => (
                <RodCard key={rod.id} rod={rod} />
              ))}
            </div>
          ) : (
            <div className="seriesEmptyState">
              <h2>No rod variants indexed yet</h2>
              <p>
                This series exists in the database, but individual rod variants have not been added yet.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
