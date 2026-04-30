import { Link } from "react-router-dom";
import { rods } from "../data/rods.js";

function formatLureRange(rod) {
  if (rod.minLureG == null || rod.maxLureG == null) return "Unknown";
  return `${rod.minLureG}-${rod.maxLureG}g`;
}

function formatPeRange(rod) {
  if (rod.minPe == null || rod.maxPe == null) return "Unknown";
  return `PE ${rod.minPe}-${rod.maxPe}`;
}

function formatPrice(rod) {
  if (rod.priceHkdApprox == null) return "Unknown";
  return `~HKD ${rod.priceHkdApprox}`;
}

function valueOrUnknown(value) {
  if (value === null || value === undefined || value === "") return "Unknown";
  return value;
}

export default function ComparePage() {
  const comparedRods = rods;

  const groups = [
    {
      title: "Identity",
      rows: [
        ["Brand", ...comparedRods.map((rod) => rod.brand)],
        ["Series", ...comparedRods.map((rod) => rod.series)],
        ["Model / variant", ...comparedRods.map((rod) => rod.model)],
        ["Generation", ...comparedRods.map((rod) => rod.generation)],
        ["Catalogue status", ...comparedRods.map((rod) => rod.catalogueStatus)],
        ["Market regions", ...comparedRods.map((rod) => rod.marketRegions.join(" / "))],
      ],
    },
    {
      title: "Dimensions",
      rows: [
        ["Total length", ...comparedRods.map((rod) => `${(rod.lengthCm / 100).toFixed(2)}m`)],
        ["Closed length", ...comparedRods.map((rod) => `${rod.closedLengthCm}cm`)],
        ["Rod weight", ...comparedRods.map((rod) => `${rod.weightG}g`)],
        ["Sections", ...comparedRods.map((rod) => rod.sections)],
        ["Construction", ...comparedRods.map((rod) => rod.construction)],
      ],
    },
    {
      title: "Casting, line & action",
      rows: [
        ["Rod type", ...comparedRods.map((rod) => rod.rodType)],
        ["Reel type", ...comparedRods.map((rod) => rod.reelType)],
        ["Lure weight", ...comparedRods.map((rod) => formatLureRange(rod))],
        ["PE rating", ...comparedRods.map((rod) => formatPeRange(rod))],
        ["Power", ...comparedRods.map((rod) => valueOrUnknown(rod.power))],
        ["Action", ...comparedRods.map((rod) => valueOrUnknown(rod.action))],
        ["Tip type", ...comparedRods.map((rod) => valueOrUnknown(rod.tipType))],
      ],
    },
    {
      title: "Use, price & confidence",
      rows: [
        ["Use cases", ...comparedRods.map((rod) => rod.useCases.join(" / "))],
        ["Typical price", ...comparedRods.map((rod) => formatPrice(rod))],
        ["Rating", ...comparedRods.map((rod) => `${rod.rating}/5`)],
        ["Source confidence", ...comparedRods.map((rod) => rod.sourceConfidence)],
      ],
    },
  ];

  return (
    <main className="compareCataloguePage">
      <section className="compareHero">
        <div className="container compareHeroGrid">
          <div>
            <div className="catalogEyebrow">Compare rods</div>
            <h1>Side-by-side fishing rod comparison.</h1>
            <p>
              Compare identity, dimensions, lure rating, PE rating, portability, price,
              and source confidence across selected rod models.
            </p>
          </div>

          <div className="compareHeroStats">
            <div>
              <b>{comparedRods.length}</b>
              <span>Compared rods</span>
            </div>
            <div>
              <b>{groups.length}</b>
              <span>Spec groups</span>
            </div>
            <div>
              <b>Live</b>
              <span>Demo compare set</span>
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
            <button type="button">Clear compare</button>
          </div>
        </div>

        <div className="compareSummaryGrid">
          {comparedRods.map((rod) => (
            <Link key={rod.id} className="compareSummaryCard" to={`/rods/${rod.id}`}>
              <div className="compareRodVisual">
                <div className="compareRodLine" />
                <div className="compareRodHandle" />
              </div>

              <div className="compareSummaryBody">
                <div className="seriesBrand">{rod.brand}</div>
                <h3>{rod.displayName}</h3>
                <p>{rod.series}</p>

                <div className="compareMiniSpecs">
                  <span>{(rod.lengthCm / 100).toFixed(2)}m</span>
                  <span>{rod.closedLengthCm}cm closed</span>
                  <span>{rod.weightG}g</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="compareTableShell">
          <table className="compareTable">
            <thead>
              <tr>
                <th className="stickyCompareColumn">Parameter</th>
                {comparedRods.map((rod) => (
                  <th key={rod.id}>
                    <Link to={`/rods/${rod.id}`}>
                      <span>{rod.brand}</span>
                      <strong>{rod.model}</strong>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {groups.map((group) => (
                <>
                  <tr key={`${group.title}-header`} className="compareGroupRow">
                    <td className="stickyCompareColumn" colSpan={comparedRods.length + 1}>
                      {group.title}
                    </td>
                  </tr>

                  {group.rows.map((row) => (
                    <tr key={`${group.title}-${row[0]}`}>
                      {row.map((cell, index) => (
                        <td
                          key={`${group.title}-${row[0]}-${index}`}
                          className={index === 0 ? "compareRowTitle stickyCompareColumn" : ""}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
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
            Total length affects casting reach and line control. Closed length affects portability.
            Weight affects comfort. Lure and PE ratings help match the rod to the fishing method.
            Source confidence shows how reliable the current database record is.
          </p>
        </div>
      </section>
    </main>
  );
}
