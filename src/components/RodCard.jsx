import Pill from "./Pill.jsx";

export default function RodCard({ rod }) {
  return (
    <div className="card rodCard">
      <div className="row topRow">
        <div>
          <div className="eyebrow">{rod.brand} / {rod.series}</div>
          <h3>{rod.model}</h3>
          <p className="muted">{rod.type}</p>
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
          <b>{rod.closedCm}cm</b>
        </div>
        <div className="specBox">
          <div className="muted tiny">Weight</div>
          <b>{rod.weightG}g</b>
        </div>
      </div>

      <div className="pillWrap">
        {rod.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      <p className="note">{rod.note}</p>

      <div className="rodMetaStrip">
        <span>Catalogue: {rod.status}</span>
        <span>{rod.market}</span>
        <span>{rod.confidence} confidence</span>
      </div>

      <div className="row cardFooter">
        <div>★ {rod.rating}</div>
        <button className="textButton">View rod →</button>
      </div>
    </div>
  );
}
