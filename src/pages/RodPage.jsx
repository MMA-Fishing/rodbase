import { Link, Navigate, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import PageTitle from "../components/PageTitle.jsx";
import RodCard from "../components/RodCard.jsx";
import RodImage from "../components/RodImage.jsx";
import { rods } from "../data/rods.js";
import { useCompare } from "../context/CompareContext.jsx";
import { useLocale } from "../context/LocaleContext.jsx";
import { getPrimarySourceRecord } from "../utils/sourceHelpers.js";
import {
  brandToId,
  makeSeriesId,
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
  formatPeRange,
  formatPriceHkd,
  formatMarketRegions,
  valueOrUnknown,
} from "../utils/rodFormatters.js";

function SpecRow({ label, value }) {
  return (
    <div className="rodDetailSpecRow">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function formatLineRange(rod, notListedText) {
  if (rod.minLineLb == null || rod.maxLineLb == null) return notListedText;
  return `${rod.minLineLb}-${rod.maxLineLb}lb`;
}

function formatCarbon(rod, notListedText) {
  if (rod.carbonPercent == null) return notListedText;
  return `${rod.carbonPercent}%`;
}

export default function RodPage() {
  const { rodId } = useParams();
  const { t } = useLocale();

  const {
    maxCompareRods,
    canAddMore,
    isCompared,
    toggleCompareId,
  } = useCompare();

  const rod = rods.find((item) => item.id === rodId);

  if (!rod) {
    return <Navigate to="/search" replace />;
  }

  const sourceRecords = rod.sourceRecords || [];
  const primarySource = getPrimarySourceRecord(rod);
  const compared = isCompared(rod.id);
  const compareFull = !compared && !canAddMore;
  const notListed = t("common.notListed");

  const relatedRods = rods
    .filter((item) => item.id !== rod.id && (item.series === rod.series || item.brand === rod.brand))
    .slice(0, 3);

  function handleCompareToggle() {
    if (compareFull) return;
    toggleCompareId(rod.id);
  }

  return (
    <main className="rodDetailPage">
      <PageTitle
        title={rod.displayName}
        description={`${rod.displayName} ${t("rod.pageDescription")}`}
      />

      <section className="container breadcrumbBand">
        <Breadcrumbs
          items={[
            { label: t("nav.brands"), to: "/brands" },
            { label: rod.brand, to: `/brands/${brandToId(rod.brand)}` },
            { label: rod.series, to: `/series/${makeSeriesId(rod.brand, rod.series)}` },
            { label: rod.model },
          ]}
        />
      </section>

      <section className="rodDetailHero">
        <div className="container rodDetailHeroGrid">
          <div className="rodDetailVisualPanel">
            <div className="rodDetailImageStage rodDetailFallbackStage">
              <RodImage rod={rod} className="rodDetailProductImage" />
            </div>

            <div className="rodDetailVisualMeta">
              <span>{valueOrUnknown(rod.construction)}</span>
              <span>{valueOrUnknown(rod.reelType)}</span>
              <span>{formatMarketRegions(rod)}</span>
            </div>
          </div>

          <div className="rodDetailSummary">
            <div className="catalogEyebrow">{rod.brand} / {rod.series}</div>
            <h1>{rod.displayName || rod.model}</h1>
            <p>{rod.editorNote || rod.rodType}</p>

            <div className="rodDetailActions">
              <button
                type="button"
                className={compared ? "rodCompareButtonActive" : ""}
                disabled={compareFull}
                onClick={handleCompareToggle}
                title={compareFull ? `${maxCompareRods} ${t("rod.maximumCompare")}` : ""}
              >
                {compared ? t("rod.removeFromCompare") : t("rod.addToCompare")}
              </button>

              <Link to="/search">{t("rod.backToSearch")}</Link>

              {primarySource?.url && (
                <a
                  className="officialReferenceButton"
                  href={primarySource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("rod.viewOfficialReference")}
                </a>
              )}

              {compared && <Link to="/compare">{t("rod.openCompare")}</Link>}
            </div>

            <div className="rodDetailCoreSpecs">
              <div>
                <span>{t("rod.length")}</span>
                <b>{formatLengthM(rod.lengthCm)}</b>
              </div>
              <div>
                <span>{t("rod.closedLength")}</span>
                <b>{formatLengthCm(rod.closedLengthCm)}</b>
              </div>
              <div>
                <span>{t("rod.weight")}</span>
                <b>{formatWeightG(rod.weightG)}</b>
              </div>
              <div>
                <span>{t("rod.lure")}</span>
                <b>{formatLureRange(rod)}</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container rodDetailContentGrid">
        <section className="rodDetailPanel">
          <div className="rodDetailPanelHeader">
            <div>
              <div className="catalogEyebrow">{t("rod.panel.identity")}</div>
              <h2>{t("rod.panel.officialSpecs")}</h2>
            </div>
          </div>

          <div className="rodDetailSpecList">
            <SpecRow label={t("rod.field.brand")} value={rod.brand} />
            <SpecRow label={t("rod.field.series")} value={rod.series} />
            <SpecRow label={t("rod.field.model")} value={rod.model} />
            <SpecRow label={t("rod.field.generation")} value={valueOrUnknown(rod.generation)} />
            <SpecRow label={t("rod.field.catalogueStatus")} value={valueOrUnknown(rod.catalogueStatus)} />
            <SpecRow label={t("rod.field.market")} value={formatMarketRegions(rod)} />
            <SpecRow label={t("rod.field.rodType")} value={valueOrUnknown(rod.rodType)} />
            <SpecRow label={t("rod.field.reelType")} value={valueOrUnknown(rod.reelType)} />
            <SpecRow label={t("rod.field.construction")} value={valueOrUnknown(rod.construction)} />
            <SpecRow label={t("rod.field.sections")} value={rod.sections ?? notListed} />
            <SpecRow label={t("rod.field.power")} value={valueOrUnknown(rod.power)} />
            <SpecRow label={t("rod.field.action")} value={valueOrUnknown(rod.action)} />
            <SpecRow label={t("rod.field.tipType")} value={valueOrUnknown(rod.tipType)} />
            <SpecRow label={t("rod.field.peRating")} value={formatPeRange(rod)} />
            <SpecRow label={t("rod.field.lineRating")} value={formatLineRange(rod, notListed)} />
            <SpecRow label={t("rod.field.carbonPercent")} value={formatCarbon(rod, notListed)} />
            <SpecRow label={t("rod.field.price")} value={formatPriceHkd(rod)} />
          </div>
        </section>

        <section className="rodDetailSideStack">
          <section className="rodDetailPanel">
            <div className="rodDetailPanelHeader">
              <div>
                <div className="catalogEyebrow">{t("rod.panel.namesAliases")}</div>
                <h2>{t("rod.panel.namesAliases")}</h2>
              </div>
            </div>

            <div className="rodDetailSpecList">
              <SpecRow label={t("rod.field.officialName")} value={valueOrUnknown(rod.officialName)} />
              <SpecRow label={t("rod.field.japaneseName")} value={valueOrUnknown(rod.japaneseName)} />
              <SpecRow label={t("rod.field.chineseName")} value={valueOrUnknown(rod.chineseName)} />
              <SpecRow label={t("rod.field.aliases")} value={(rod.aliases || []).join(" / ") || notListed} />
              <SpecRow label={t("rod.field.modelCode")} value={valueOrUnknown(rod.modelCode)} />
              <SpecRow label={t("rod.field.janCode")} value={valueOrUnknown(rod.janCode)} />
            </div>
          </section>

          <section className="rodDetailPanel">
            <div className="rodDetailPanelHeader">
              <div>
                <div className="catalogEyebrow">{t("rod.panel.interpretation")}</div>
                <h2>{t("rod.panel.interpretation")}</h2>
              </div>
            </div>

            <p className="rodDetailNote">
              {rod.editorNote || notListed}
            </p>

            <div className="seriesUseCaseList">
              {(rod.useCases || []).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>

          <section className="rodDetailPanel">
            <div className="rodDetailPanelHeader">
              <div>
                <div className="catalogEyebrow">{t("rod.panel.sources")}</div>
                <h2>{t("rod.panel.sources")}</h2>
                <p>{t("rod.sources.description")}</p>
              </div>
            </div>

            <div className="sourceRecordList">
              {sourceRecords.length > 0 ? (
                sourceRecords.map((source, index) => (
                  <div className="sourceRecord" key={`${source.label}-${index}`}>
                    <span>{valueOrUnknown(source.sourceType)}</span>

                    {source.url ? (
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {valueOrUnknown(source.label)}
                      </a>
                    ) : (
                      <b>{valueOrUnknown(source.label)}</b>
                    )}

                    {source.lastChecked && (
                      <em>{t("rod.sources.lastChecked")}: {source.lastChecked}</em>
                    )}

                    {source.note && <p>{source.note}</p>}
                  </div>
                ))
              ) : (
                <p className="rodDetailNote">{notListed}</p>
              )}
            </div>
          </section>
        </section>
      </section>

      {relatedRods.length > 0 && (
        <section className="container rodRelatedSection">
          <div className="catalogSectionHeader">
            <div>
              <div className="catalogEyebrow">{t("rod.panel.related")}</div>
              <h2>{t("rod.panel.related")}</h2>
              <p>{t("rod.related.description")}</p>
            </div>
          </div>

          <div className="catalogRodGrid">
            {relatedRods.map((relatedRod) => (
              <RodCard key={relatedRod.id} rod={relatedRod} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
