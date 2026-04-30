import { rods } from "../data/rods.js";

function formatLureRange(rod) {
  if (rod.minLureG == null || rod.maxLureG == null) return "Unknown";
  return `${rod.minLureG}-${rod.maxLureG}g`;
}

function formatPeRange(rod) {
  if (rod.minPe == null || rod.maxPe == null) return "Unknown";
  return `PE ${rod.minPe}-${rod.maxPe}`;
}

export default function ComparePage() {
  const rows = [
    ["Brand", ...rods.map((rod) => rod.brand)],
    ["Series", ...rods.map((rod) => rod.series)],
    ["Model / variant", ...rods.map((rod) => rod.model)],
    ["Catalogue status", ...rods.map((rod) => rod.catalogueStatus)],
    ["Market regions", ...rods.map((rod) => rod.marketRegions.join(" / "))],
    ["Rod type", ...rods.map((rod) => rod.rodType)],
    ["Reel type", ...rods.map((rod) => rod.reelType)],
    ["Construction", ...rods.map((rod) => rod.construction)],
    ["Total length", ...rods.map((rod) => `${(rod.lengthCm / 100).toFixed(2)}m`)],
    ["Closed length", ...rods.map((rod) => `${rod.closedLengthCm}cm`)],
    ["Weight", ...rods.map((rod) => `${rod.weightG}g`)],
    ["Sections", ...rods.map((rod) => rod.sections)],
    ["Lure weight", ...rods.map((rod) => formatLureRange(rod))],
    ["PE rating", ...rods.map((rod) => formatPeRange(rod))],
    ["Power", ...rods.map((rod) => rod.power || "Unknown")],
    ["Action", ...rods.map((rod) => rod.action || "Unknown")],
    ["Typical price", ...rods.map((rod) => `~HKD ${rod.priceHkdApprox}`)],
    ["Rating", ...rods.map((rod) => `${rod.rating}/5`)],
    ["Source confidence", ...rods.map((rod) => rod.sourceConfidence)],
  ];

  return (
    <main className="container page">
      <div className="pageIntro">
        <div className="eyebrow">Compare rods</div>
        <h1>Side-by-side comparison.</h1>
        <p className="muted wide">
          Specs, model identity, use-case fit, price, and source confidence in one view.
        </p>
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              {rods.map((rod) => (
                <th key={rod.id}>{rod.displayName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  <td key={row[0] + index} className={index === 0 ? "rowTitle" : ""}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="darkNote">
        <h2>Comparison note</h2>
        <p>
          This comparison now uses structured fields instead of plain text. That means later we can add proper
          sorting, filtering, source validation, and real database import logic.
        </p>
      </div>
    </main>
  );
}
