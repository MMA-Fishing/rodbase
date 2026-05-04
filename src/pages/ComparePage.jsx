import { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { rods } from "../data/rods.js";
import PageTitle from "../components/PageTitle.jsx";
import {
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
  formatPeRange,
  formatPriceHkd,
  valueOrUnknown,
} from "../utils/rodFormatters.js";
import { useCompare } from "../context/CompareContext.jsx";
import { useLocale } from "../context/LocaleContext.jsx";
import { translateDataLabel, translateLabelList } from "../i18n/dataLabels.js";

function rowHasDifference(values) {
  const normalized = values.map((value) => String(value ?? "").trim().toLowerCase());
  return new Set(normalized).size > 1;
}

function createComparisonGroups(comparedRods, t, locale) {
  const notListed = t("common.notListed");

  return [
    {
      title: t("compare.group.identity"),
      rows: [
        { label: t("compare.row.brand"), values: comparedRods.map((rod) => rod.brand) },
        { label: t("compare.row.series"), values: comparedRods.map((rod) => rod.series) },
        { label: t("compare.row.model"), values: comparedRods.map((rod) => rod.model) },
        {
          label: t("compare.row.generation"),
          values: comparedRods.map((rod) =>
            translateDataLabel(locale, valueOrUnknown(rod.generation, notListed))
          ),
        },
        {
          label: t("compare.row.catalogueStatus"),
          values: comparedRods.map((rod) =>
            translateDataLabel(locale, valueOrUnknown(rod.catalogueStatus, notListed))
          ),
        },
        {
          label: t("compare.row.marketRegions"),
          values: comparedRods.map((rod) => translateLabelList(locale, rod.marketRegions)),
        },
      ],
    },
    {
      title: t("compare.group.dimensions"),
      rows: [
        { label: t("compare.row.totalLength"), values: comparedRods.map((rod) => formatLengthM(rod.lengthCm, notListed)) },
        { label: t("compare.row.closedLength"), values: comparedRods.map((rod) => formatLengthCm(rod.closedLengthCm, notListed)) },
        { label: t("compare.row.rodWeight"), values: comparedRods.map((rod) => formatWeightG(rod.weightG, notListed)) },
        { label: t("compare.row.sections"), values: comparedRods.map((rod) => rod.sections ?? notListed) },
        {
          label: t("compare.row.construction"),
          values: comparedRods.map((rod) =>
            translateDataLabel(locale, valueOrUnknown(rod.construction, notListed))
          ),
        },
      ],
    },
    {
      title: t("compare.group.casting"),
      rows: [
        {
          label: t("compare.row.rodType"),
          values: comparedRods.map((rod) =>
            translateDataLabel(locale, valueOrUnknown(rod.rodType, notListed))
          ),
        },
        {
          label: t("compare.row.reelType"),
          values: comparedRods.map((rod) =>
            translateDataLabel(locale, valueOrUnknown(rod.reelType, notListed))
          ),
        },
        { label: t("compare.row.lureWeight"), values: comparedRods.map((rod) => formatLureRange(rod, notListed)) },
        { label: t("compare.row.peRating"), values: comparedRods.map((rod) => formatPeRange(rod, notListed)) },
        {
          label: t("compare.row.power"),
          values: comparedRods.map((rod) =>
            translateDataLabel(locale, valueOrUnknown(rod.power, notListed))
          ),
        },
        {
          label: t("compare.row.action"),
          values: comparedRods.map((rod) =>
            translateDataLabel(locale, valueOrUnknown(rod.action, notListed))
          ),
        },
        {
          label: t("compare.row.tipType"),
          values: comparedRods.map((rod) =>
            translateDataLabel(locale, valueOrUnknown(rod.tipType, notListed))
          ),
        },
      ],
    },
    {
      title: t("compare.group.usePrice"),
      rows: [
        {
          label: t("compare.row.useCases"),
          values: comparedRods.map((rod) => translateLabelList(locale, rod.useCases)),
        },
        { label: t("compare.row.typicalPrice"), values: comparedRods.map((rod) => formatPriceHkd(rod, notListed)) },
        { label: t("compare.row.rating"), values: comparedRods.map((rod) => rod.rating ? `${rod.rating}/5` : notListed) },
      ],
    },
  ];
}

export default function ComparePage() {
  const {
    compareIds,
    maxCompareRods,
    removeCompareId,
    clearCompareIds,
  } = useCompare();

  const { locale, t } = useLocale();
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  const comparedRods = useMemo(() => {
    return compareIds
      .map((id) => rods.find((rod) => rod.id === id))
      .filter(Boolean);
  }, [compareIds]);

  const allGroups = useMemo(() => {
    return createComparisonGroups(comparedRods, t, locale);
  }, [comparedRods, t, locale]);

  const groups = useMemo(() => {
    if (!showDifferencesOnly || comparedRods.length < 2) {
      return allGroups;
    }

    return allGroups
      .map((group) => ({
        ...group,
        rows: group.rows.filter((row) => rowHasDifference(row.values)),
      }))
      .filter((group) => group.rows.length > 0);
  }, [allGroups, comparedRods.length, showDifferencesOnly]);

  const differenceCount = useMemo(() => {
    return allGroups
      .flatMap((group) => group.rows)
      .filter((row) => rowHasDifference(row.values)).length;
  }, [allGroups]);

  const differingRowsText =
    differenceCount === 1
      ? t("compare.differingRowFound")
      : t("compare.differingRowsFound");

  return (
    <main className="compareCataloguePage">
      <PageTitle title={t("compare.pageTitle")} description={t("compare.pageDescription")} />

      <section className="compareHero">
        <div className="container compareHeroGrid">
          <div>
            <div className="catalogEyebrow">{t("compare.eyebrow")}</div>
            <h1>{t("compare.title")}</h1>
            <p>{t("compare.description")}</p>
          </div>

          <div className="compareHeroStats">
            <div>
              <b>{comparedRods.length}</b>
              <span>{t("compare.selectedRods")}</span>
            </div>
            <div>
              <b>{differenceCount}</b>
              <span>{t("compare.differentSpecs")}</span>
            </div>
            <div>
              <b>{maxCompareRods}</b>
              <span>{t("compare.maximumRods")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container compareContent">
        <div className="compareToolbar">
          <div>
            <div className="catalogEyebrow">{t("compare.selectedRods")}</div>
            <h2>{t("compare.currentSet")}</h2>
          </div>

          <div className="compareToolbarActions">
            <Link to="/search">{t("compare.addChangeRods")}</Link>
            <button type="button" onClick={clearCompareIds}>
              {t("compare.clearCompare")}
            </button>
          </div>
        </div>

        {comparedRods.length === 0 ? (
          <div className="compareEmptyState">
            <div>
              <div className="catalogEyebrow">{t("compare.noRodsSelected")}</div>
              <h2>{t("compare.chooseBeforeComparing")}</h2>
              <p>{t("compare.emptyText")}</p>
            </div>

            <div className="compareEmptyActions">
              <Link to="/search">{t("compare.openRodFinder")}</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="compareSummaryGrid">
              {comparedRods.map((rod) => (
                <article key={rod.id} className="compareSummaryCard compareSummaryCardWithRemove">
                  <Link className="compareSummaryLink" to={`/rods/${rod.id}`}>
                    <div className="compareRodVisual">
                      <div className="compareRodLine" />
                      <div className="compareRodHandle" />
                    </div>

                    <div className="compareSummaryBody">
                      <div className="seriesBrand">{rod.brand}</div>
                      <h3>{rod.displayName}</h3>
                      <p>{rod.series}</p>

                      <div className="compareMiniSpecs">
                        <span>{formatLengthM(rod.lengthCm, t("common.notListed"))}</span>
                        <span>{formatLengthCm(rod.closedLengthCm, t("common.notListed"))} {t("rodCard.closed")}</span>
                        <span>{formatWeightG(rod.weightG, t("common.notListed"))}</span>
                      </div>
                    </div>
                  </Link>

                  <button
                    className="compareRemoveButton"
                    type="button"
                    onClick={() => removeCompareId(rod.id)}
                  >
                    {t("compare.remove")}
                  </button>
                </article>
              ))}
            </div>

            <div className="compareControlsPanel">
              <label className="differenceToggle">
                <input
                  type="checkbox"
                  checked={showDifferencesOnly}
                  disabled={comparedRods.length < 2}
                  onChange={(event) => setShowDifferencesOnly(event.target.checked)}
                />
                {t("compare.showDifferencesOnly")}
              </label>

              <span>
                {differenceCount} {differingRowsText}
              </span>
            </div>

            <div className="compareSwipeHint">
              {t("compare.swipeHint")}
            </div>

            <div className="compareTableShell">
              <table className="compareTable compareTableEnhanced">
                <thead>
                  <tr>
                    <th className="stickyCompareColumn">{t("compare.parameter")}</th>
                    {comparedRods.map((rod) => (
                      <th key={rod.id}>
                        <div className="compareColumnHeader">
                          <Link to={`/rods/${rod.id}`}>
                            <span>{rod.brand}</span>
                            <strong>{rod.model}</strong>
                          </Link>
                          <button type="button" onClick={() => removeCompareId(rod.id)}>
                            ×
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {groups.map((group) => (
                    <Fragment key={group.title}>
                      <tr className="compareGroupRow">
                        <td className="stickyCompareColumn" colSpan={comparedRods.length + 1}>
                          {group.title}
                        </td>
                      </tr>

                      {group.rows.map((row) => {
                        const different = rowHasDifference(row.values);

                        return (
                          <tr
                            key={`${group.title}-${row.label}`}
                            className={different ? "compareDifferentRow" : "compareSameRow"}
                          >
                            <td className="compareRowTitle stickyCompareColumn">
                              {row.label}
                            </td>

                            {row.values.map((cell, index) => (
                              <td key={`${group.title}-${row.label}-${index}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="compareNote">
              <div>
                <div className="catalogEyebrow">{t("compare.noteEyebrow")}</div>
                <h2>{t("compare.noteTitle")}</h2>
              </div>
              <p>{t("compare.noteText")}</p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
