import { rods } from "../data/rods.js";

export default function ComparePage() {
  const rows = [
    ["Brand", ...rods.map((rod) => rod.brand)],
    ["Series", ...rods.map((rod) => rod.series)],
    ["Length", ...rods.map((rod) => `${(rod.lengthCm / 100).toFixed(2)}m`)],
    ["Closed length", ...rods.map((rod) => `${rod.closedCm}cm`)],
    ["Weight", ...rods.map((rod) => `${rod.weightG}g`)],
    ["Construction", ...rods.map((rod) => rod.construction)],
    ["Lure weight", ...rods.map((rod) => rod.lure)],
    ["Line rating", ...rods.map((rod) => rod.line)],
    ["Typical price", ...rods.map((rod) => `~${rod.price}`)],
    ["Rating", ...rods.map((rod) => `${rod.rating}/5`)],
    ["Spec confidence", ...rods.map((rod) => rod.confidence)],
  ];

  return (
    <main className="container page">
      <div className="pageIntro">
        <div className="eyebrow">Compare rods</div>
        <h1>Side-by-side comparison.</h1>
        <p className="muted wide">
          Specs, use-case fit, ratings, price, and source confidence in one view.
        </p>
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              {rods.map((rod) => (
                <th key={rod.id}>{rod.model}</th>
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
          The Mobile Pack is the strongest premium compact option here, the Lurematic Mobile is more lure-focused,
          and the Holiday Pack is the simplest beginner-friendly telescopic choice.
        </p>
      </div>
    </main>
  );
}
