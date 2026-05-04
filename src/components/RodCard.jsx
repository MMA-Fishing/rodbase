import { Link } from "react-router-dom";
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
    <article className="catalogRodCard">
      <div className="rodImagePanel">
        <div className="rodImagePlaceholder">
          <span>{rod.brand}</span>
          <strong>{rod.model}</strong>
        </div>
      </div>

      <div className="catalogRodBody">
        <div className="catalogRodKicker">
          {rod.brand} / {rod.series}
        </div>

        <div className="catalogRodTitleRow">
          <h3>{rod.displayName || rod.model}</h3>
          <label className="compareCheck">
            <input type="checkbox" />
            Compare
          </label>
        </div>

        <p className="catalogRodType">{rod.rodType}</p>

        <div className="catalogSpecTable">
          <div>
            <span>Length</span>
            <b>{(rod.lengthCm / 100).toFixed(2)}m</b>
          </div>
          <div>
            <span>Closed</span>
            <b>{rod.closedLengthCm}cm</b>
          </div>
          <div>
            <span>Weight</span>
            <b>{rod.weightG}g</b>
          </div>
          <div>
            <span>Lure</span>
            <b>{formatLureRange(rod)}</b>
          </div>
          <div>
            <span>Line</span>
            <b>{formatPeRange(rod)}</b>
          </div>
          <div>
            <span>Sections</span>
            <b>{rod.sections}</b>
          </div>
        </div>

        <div className="catalogRodTags">
          {rod.useCases.slice(0, 4).map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>

        <div className="catalogRodMeta">
          <span>{rod.catalogueStatus}</span>
          <span>{rod.marketRegions.join(" / ")}</span>
        </div>

        <div className="catalogRodFooter">
          <span className="catalogRating">★ {rod.rating}</span>
          <Link className="catalogViewButton" to={`/rods/${rod.id}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}


