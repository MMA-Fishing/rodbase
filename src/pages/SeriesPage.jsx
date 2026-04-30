import { Link, useParams } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import RodCard from "../components/RodCard.jsx";
import { series } from "../data/series.js";
import { rods } from "../data/rods.js";

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
    currentSeries.featuredRodIds.includes(rod.id)
  );

  const rodsToShow = matchingRods.length > 0 ? matchingRods : featuredRods;

  return (
    <main className="container page">
      <div className="pageIntro">
        <div className="eyebrow">{currentSeries.brand} / Series</div>
        <h1>{currentSeries.displayName}</h1>
        <p className="muted wide">{currentSeries.description}</p>

        <div className="pillWrap">
          <Pill>{currentSeries.catalogueStatus}</Pill>
          <Pill>{currentSeries.marketRegions.join(" / ")}</Pill>
          <Pill>{currentSeries.confidence} confidence</Pill>
        </div>
      </div>

      <section className="seriesSummaryGrid">
        <div className="statCard">
          <div className="statIcon">#</div>
          <div className="statValue">{currentSeries.variantsCount}</div>
          <div className="muted small">Known variants</div>
        </div>
        <div className="statCard">
          <div className="statIcon">✓</div>
          <div className="statValue">{currentSeries.currentCount}</div>
          <div className="muted small">Current variants</div>
        </div>
        <div className="statCard">
          <div className="statIcon">◎</div>
          <div className="statValue">{currentSeries.archivedCount}</div>
          <div className="muted small">Archived variants</div>
        </div>
      </section>

      <section className="section compactSection">
        <div className="sectionHeader">
          <div>
            <h2>Use-case tags</h2>
            <p className="muted">Series-level interpretation for browsing and filtering.</p>
          </div>
        </div>
        <div className="pillWrap">
          {currentSeries.useCases.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      </section>

      <section className="section compactSection">
        <div className="sectionHeader">
          <div>
            <h2>Indexed rods in this series</h2>
            <p className="muted">
              These rod pages are linked to the series by brand and series name.
            </p>
          </div>
          <Link className="outlineButton" to="/search">Search all rods</Link>
        </div>

        {rodsToShow.length > 0 ? (
          <div className="rodGrid">
            {rodsToShow.map((rod) => (
              <RodCard key={rod.id} rod={rod} />
            ))}
          </div>
        ) : (
          <div className="card">
            <h2>No rod variants indexed yet</h2>
            <p className="note">
              This series exists in the database, but individual rod variants have not been added yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
