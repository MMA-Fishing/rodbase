import Pill from "./Pill.jsx";

function formatLureRange(rod) {
  if (rod.minLureG == null || rod.maxLureG == null) return "Unknown";
  return `${rod.minLureG}-${rod.maxLureG}g`;
}

function formatPeRange(rod) {
  if (rod.minPe == null || rod.maxPe == null) return "Unknown";
  return `PE ${rod.minPe}-${rod.maxPe}`;
}

export default function RodCard({ rod }) {
  return (
    <div className="card rodCard">
      <div className="row topRow">
        <div>
          <div className="eyebrow">{rod.brand} / {rod.series}</div>
          <h3>{rod.displayName || rod.model}</h3>
          <p className="muted">{rod.rodType}</p>
        </div>
        <button className="iconButton">☆</button>
      </div>

      <div className="specGrid three">
        <div className="specBox">
          <div className="muted tiny">Length</div>
          <b>{(rod.lengthCm / 100).toFixed(2)}m</b>
        </div>
        <div className="specBox">
          <div className="muted tiny">Closed</div>
          <b>{rod.closedLengthCm}cm</b>
        </div>
        <div className="specBox">
          <div className="muted tiny">Weight</div>
          <b>{rod.weightG}g</b>
        </div>
      </div>

      <div className="specGrid two">
        <div className="specBox">
          <div className="muted tiny">Lure</div>
          <b>{formatLureRange(rod)}</b>
        </div>
        <div className="specBox">
          <div className="muted tiny">Line</div>
          <b>{formatPeRange(rod)}</b>
        </div>
      </div>

      <div className="pillWrap">
        {rod.useCases.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      <p className="note">{rod.editorNote}</p>

      <div className="rodMetaStrip">
        <span>Catalogue: {rod.catalogueStatus}</span>
        <span>{rod.marketRegions.join(" / ")}</span>
        <span>{rod.sourceConfidence} confidence</span>
      </div>

      <div className="row cardFooter">
        <div>★ {rod.rating}</div>
        <button className="textButton">View rod →</button>
      </div>
    </div>
  );
}
'@ | Set-Content .\src\components\RodCard.jsx -Encoding utf8