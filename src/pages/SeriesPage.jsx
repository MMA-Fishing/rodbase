import { Link, Navigate, useParams } from "react-router-dom";
import RodCard from "../components/RodCard.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import PageTitle from "../components/PageTitle.jsx";
import { rods } from "../data/rods.js";
import { series } from "../data/series.js";
import {
  brandToId,
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
  formatPeRange,
  valueOrUnknown,
} from "../utils/rodFormatters.js";
import { useLocale } from "../context/LocaleContext.jsx";

export default function SeriesPage() {
  const { seriesId } = useParams();
  const { t } = useLocale();

  const currentSeries = series.find((item) => item.id === seriesId);

  if (!currentSeries) {
    return <Navigate to="/brands" replace />;
  }

  const seriesRods = rods.filter(
    (rod) => rod.brand === currentSeries.brand && rod.series === currentSeries.name
  );

  const marketText =
    (currentSeries.marketRegions || []).join(" / ") || t("common.notListed");

  return (
    <main className="seriesDetailPage">
      <PageTitle
        title={currentSeries.displayName || `${currentSeries.brand} ${currentSeries.name}`}
        description={`${currentSeries.displayName || currentSeries.name} ${t("series.pageDescription")}`}
      />

      <section className="seriesDetailHero">
        <div className="container seriesDetailHeroGrid">
          <div>
            <div className="catalogEyebrow">{t("series.eyebrow")}</div>
            <h1>{currentSeries.displayName || currentSeries.name}</h1>
            <p>{currentSeries.description}</p>

            <div className="seriesToolbar">
              <Link to={`/brands/${brandToId(currentSeries.brand)}`}>
                {t("series.backToBrand")}
              </Link>
              <Link to={`/search?q=${encodeURIComponent(currentSeries.name)}`}>
                {t("series.searchSeries")}
              </Link>
            </div>
          </div>

          <aside className="seriesHeroPanel">
            <div className="panelLabel">{t("series.overview")}</div>

            <div className="seriesStatsGrid">
              <div>
                <span>{t("series.variants")}</span>
                <b>{currentSeries.variantsCount ?? seriesRods.length}</b>
              </div>
              <div>
                <span>{t("series.currentRecent")}</span>
                <b>{currentSeries.currentCount ?? seriesRods.length}</b>
              </div>
              <div>
                <span>{t("series.archived")}</span>
                <b>{currentSeries.archivedCount ?? 0}</b>
              </div>
              <div>
                <span>{t("series.market")}</span>
                <b>{marketText}</b>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container seriesDetailContent">
        <Breadcrumbs
          items={[
            { label: t("nav.brands"), to: "/brands" },
            { label: currentSeries.brand, to: `/brands/${brandToId(currentSeries.brand)}` },
            { label: currentSeries.name },
          ]}
        />

        <section className="seriesPanel">
          <div className="seriesPanelHeader">
            <div>
              <div className="catalogEyebrow">{t("series.eyebrow")}</div>
              <h2>{t("series.whatFor")}</h2>
            </div>
          </div>

          <p className="seriesProfileText">{currentSeries.description}</p>

          <div className="seriesUseCaseList">
            {(currentSeries.useCases || []).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        {(currentSeries.sourceRecords || []).length > 0 && (
          <section className="seriesPanel seriesReferencePanel">
            <div className="seriesPanelHeader">
              <div>
                <div className="catalogEyebrow">{t("series.officialEyebrow")}</div>
                <h2>{t("series.sourceLinks")}</h2>
              </div>
            </div>

            <div className="seriesSourceGrid">
              {currentSeries.sourceRecords.map((source, index) => (
                <a
                  key={`${source.label}-${index}`}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="seriesSourceCard"
                >
                  <span>{source.sourceType || "Reference"}</span>
                  <strong>{source.label}</strong>
                  {source.lastChecked && (
                    <em>{t("series.lastChecked")}: {source.lastChecked}</em>
                  )}
                  {source.note && <p>{source.note}</p>}
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="seriesPanel">
          <div className="seriesPanelHeader">
            <div>
              <div className="catalogEyebrow">{t("series.variantTableEyebrow")}</div>
              <h2>{t("series.variantTableTitle")}</h2>
              <p>{t("series.variantTableDesc")}</p>
            </div>
          </div>

          {seriesRods.length > 0 ? (
            <div className="seriesVariantTableWrap">
              <table className="seriesVariantTable">
                <thead>
                  <tr>
                    <th>{t("series.table.model")}</th>
                    <th>{t("series.table.length")}</th>
                    <th>{t("series.table.closed")}</th>
                    <th>{t("series.table.weight")}</th>
                    <th>{t("series.table.lure")}</th>
                    <th>{t("series.table.line")}</th>
                    <th>{t("series.table.power")}</th>
                    <th>{t("series.table.action")}</th>
                  </tr>
                </thead>

                <tbody>
                  {seriesRods.map((rod) => (
                    <tr key={rod.id}>
                      <td>
                        <Link to={`/rods/${rod.id}`}>{rod.model}</Link>
                      </td>
                      <td>{formatLengthM(rod.lengthCm)}</td>
                      <td>{formatLengthCm(rod.closedLengthCm)}</td>
                      <td>{formatWeightG(rod.weightG)}</td>
                      <td>{formatLureRange(rod)}</td>
                      <td>{formatPeRange(rod)}</td>
                      <td>{valueOrUnknown(rod.power)}</td>
                      <td>{valueOrUnknown(rod.action)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="seriesEmptyState">
              <h3>{t("series.emptyTitle")}</h3>
              <p>{t("series.emptyText")}</p>
            </div>
          )}
        </section>

        <section className="seriesPanel">
          <div className="seriesPanelHeader">
            <div>
              <div className="catalogEyebrow">{t("series.cardsEyebrow")}</div>
              <h2>{t("series.cardsTitle")}</h2>
            </div>
          </div>

          {seriesRods.length > 0 ? (
            <div className="catalogRodGrid">
              {seriesRods.map((rod) => (
                <RodCard key={rod.id} rod={rod} />
              ))}
            </div>
          ) : (
            <div className="seriesEmptyState">
              <h3>{t("series.emptyTitle")}</h3>
              <p>{t("series.emptyText")}</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
