import { Link } from "react-router-dom";
import Pill from "./Pill.jsx";
import RodImage from "./RodImage.jsx";
import { getPrimarySourceRecord } from "../utils/sourceHelpers.js";
import {
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
  formatPeRange,
  formatMarketRegions,
} from "../utils/rodFormatters.js";
import { useCompare } from "../context/CompareContext.jsx";

export default function RodCard({ rod }) {
  const {
    compareIds,
    maxCompareRods,
    canAddMore,
    isCompared,
    toggleCompareId,
  } = useCompare();

  const compared = isCompared(rod.id);
  const compareFull = !compared && !canAddMore;
  const primarySource = getPrimarySourceRecord(rod);

  function handleCompareChange() {
    if (compareFull) return;
    toggleCompareId(rod.id);
  }

  return (
    <article className={compared ? "catalogRodCard catalogRodCardCompared" : "catalogRodCard"}>
      <div className="rodImagePanel">
        <RodImage rod={rod} />
      </div>

      <div className="catalogRodBody">
        <div className="catalogRodKicker">
          {rod.brand} / {rod.series}
        </div>

        <div className="catalogRodTitleRow">
          <h3>{rod.displayName || rod.model}</h3>

          <label
            className={compareFull ? "compareCheck compareCheckDisabled" : "compareCheck"}
            title={compareFull ? `Maximum ${maxCompareRods} rods can be compared` : "Add to compare"}
          >
            <input
              type="checkbox"
              checked={compared}
              disabled={compareFull}
              onChange={handleCompareChange}
            />
            Compare
          </label>
        </div>

        <p className="catalogRodType">{rod.rodType}</p>

        <div className="catalogSpecTable">
          <div>
            <span>Length</span>
            <b>{formatLengthM(rod.lengthCm)}</b>
          </div>
          <div>
            <span>Closed</span>
            <b>{formatLengthCm(rod.closedLengthCm)}</b>
          </div>
          <div>
            <span>Weight</span>
            <b>{formatWeightG(rod.weightG)}</b>
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
            <b>{rod.sections ?? "Unknown"}</b>
          </div>
        </div>

        <div className="catalogRodTags">
          {(rod.useCases || []).slice(0, 4).map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>

        <div className="catalogRodMeta">
          <span>{rod.catalogueStatus}</span>
          <span>{formatMarketRegions(rod)}</span>
          {compared && <span>In compare set</span>}
          {compareFull && <span>Compare full</span>}
        </div>

        <div className="catalogRodFooter">
          <span className="catalogRating">★ {rod.rating ?? "—"}</span>

          <div className="catalogRodFooterActions">
            {primarySource?.url && (
              <a
                className="catalogSourceButton"
                href={primarySource.url}
                target="_blank"
                rel="noreferrer"
              >
                Source ↗
              </a>
            )}

            <Link className="catalogViewButton" to={`/rods/${rod.id}`}>
              View details
            </Link>
          </div>
        </div>
      </div>

      {compareIds.length > 0 && compared && (
        <Link className="compareMiniLink" to="/compare">
          View compare
        </Link>
      )}
    </article>
  );
}





