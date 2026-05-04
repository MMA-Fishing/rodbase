import { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { rods } from "../data/rods.js";
import {
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
  formatPeRange,
  formatPriceHkd,
  formatMarketRegions,
  valueOrUnknown,
} from "../utils/rodFormatters.js";
import { useCompare } from "../context/CompareContext.jsx";

function rowHasDifference(values) {
  const normalized = values.map((value) => String(value ?? "").trim().toLowerCase());
  return new Set(normalized).size > 1;
}

function createComparisonGroups(comparedRods) {
  return [
    {
      title: "Identity",
      rows: [
        { label: "Brand", values: comparedRods.map((rod) => rod.brand) },
        { label: "Series", values: comparedRods.map((rod) => rod.series) },
        { label: "Model / variant", values: comparedRods.map((rod) => rod.model) },
        { label: "Generation", values: comparedRods.map((rod) => valueOrUnknown(rod.generation)) },
        { label: "Catalogue status", values: comparedRods.map((rod) => valueOrUnknown(rod.catalogueStatus)) },
        { label: "Market regions", values: comparedRods.map((rod) => formatMarketRegions(rod)) },
      ],
    },
    {
      title: "Dimensions",
      rows: [
        { label: "Total length", values: comparedRods.map((rod) => formatLengthM(rod.lengthCm)) },
        { label: "Closed length", values: comparedRods.map((rod) => formatLengthCm(rod.closedLengthCm)) },
        { label: "Rod weight", values: comparedRods.map((rod) => formatWeightG(rod.weightG)) },
        { label: "Sections", values: comparedRods.map((rod) => valueOrUnknown(rod.sections)) },
        { label: "Construction", values: comparedRods.map((rod) => valueOrUnknown(rod.construction)) },
      ],
    },
    {
      title: "Casting, line & action",
      rows: [
        { label: "Rod type", values: comparedRods.map((rod) => valueOrUnknown(rod.rodType)) },
        { label: "Reel type", values: comparedRods.map((rod) => valueOrUnknown(rod.reelType)) },
        { label: "Lure weight", values: comparedRods.map((rod) => formatLureRange(rod)) },
        { label: "PE rating", values: comparedRods.map((rod) => formatPeRange(rod)) },
        { label: "Power", values: comparedRods.map((rod) => valueOrUnknown(rod.power)) },
        { label: "Action", values: comparedRods.map((rod) => valueOrUnknown(rod.action)) },
        { label: "Tip type", values: comparedRods.map((rod) => valueOrUnknown(rod.tipType)) },
      ],
    },
    {
      title: "Use, price & notes",
      rows: [
        { label: "Use cases", values: comparedRods.map((rod) => (rod.useCases || []).join(" / ") || "Unknown") },
        { label: "Typical price", values: comparedRods.map((rod) => formatPriceHkd(rod)) },
        { label: "Rating", values: comparedRods.map((rod) => rod.rating ? `${rod.rating}/5` : "Unknown") },
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

  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  const comparedRods = useMemo(() => {
    return compareIds
      .map((id) => rods.find((rod) => rod.id === id))
      .filter(Boolean);
  }, [compareIds]);

  const groups = useMemo(() => {
    const baseGroups = createComparisonGroups(comparedRods);

    if (!showDifferencesOnly || comparedRods.length < 2) {
      return baseGroups;
    }

    return baseGroups
      .map((group) => ({
        ...group,
        rows: group.rows.filter((row) => rowHasDifference(row.values)),
      }))
      .filter((group) => group.rows.length > 0);
  }, [comparedRods, showDifferencesOnly]);

  const differenceCount = useMemo(() => {
    return createComparisonGroups(comparedRods)
      .flatMap((group) => group.rows)
      .filter((row) => rowHasDifference(row.values)).length;
  }, [comparedRods]);

  return (
    <main className="compareCataloguePage">
      <section className="compareHero">
        <div className="container compareHeroGrid">
          <div>
            <div className="catalogEyebrow">Compare rods</div>
            <h1>Side-by-side fishing rod comparison.</h1>
            <p>
              Select rods from the catalogue, then compare dimensions, casting range,
              portability, market status, and usage notes in one structured view.
            </p>
          </div>

          <div className="compareHeroStats">
            <div>
              <b>{comparedRods.length}</b>
              <span>Selected rods</span>
            </div>
            <div>
              <b>{differenceCount}</b>
              <span>Different specs</span>
            </div>
            <div>
              <b>{maxCompareRods}</b>
              <span>Maximum rods</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container compareContent">
        <div className="compareToolbar">
          <div>
            <div className="catalogEyebrow">Selected rods</div>
            <h2>Current comparison set</h2>
          </div>

          <div className="compareToolbarActions">
            <Link to="/search">Add / change rods</Link>
            <button type="button" onClick={clearCompareIds}>
              Clear compare
            </button>
          </div>
        </div>

        {comparedRods.length === 0 ? (
          <div className="compareEmptyState">
            <div>
              <div className="catalogEyebrow">No rods selected</div>
              <h2>Choose rods before comparing.</h2>
              <p>
                Go to the rod finder and tick Compare on the rods you want to compare.
                RodBase will remember your selection while you browse.
              </p>
            </div>

            <div className="compareEmptyActions">
              <Link to="/search">Open rod finder</Link>
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
                        <span>{formatLengthM(rod.lengthCm)}</span>
                        <span>{formatLengthCm(rod.closedLengthCm)} closed</span>
                        <span>{formatWeightG(rod.weightG)}</span>
                      </div>
                    </div>
                  </Link>

                  <button
                    className="compareRemoveButton"
                    type="button"
                    onClick={() => removeCompareId(rod.id)}
                  >
                    Remove
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
                Show differences only
              </label>

              <span>
                {differenceCount} differing row{differenceCount === 1 ? "" : "s"} found
              </span>
            </div>

            <div className="compareSwipeHint">
              Swipe sideways to compare all rod specifications.
            </div>

            <div className="compareTableShell">
              <table className="compareTable compareTableEnhanced">
                <thead>
                  <tr>
                    <th className="stickyCompareColumn">Parameter</th>
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
                <div className="catalogEyebrow">Comparison note</div>
                <h2>How to read this comparison</h2>
              </div>
              <p>
                Use “Show differences only” when the table becomes long. Total length affects
                reach and line control, closed length affects portability, and lure / PE ratings
                help match the rod to the fishing method. Source records should be checked before
                using any specification as final.
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
