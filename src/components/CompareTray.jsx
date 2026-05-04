import { Link } from "react-router-dom";
import { rods } from "../data/rods.js";
import { useCompare } from "../context/CompareContext.jsx";
import { formatLengthM, formatWeightG } from "../utils/rodFormatters.js";

export default function CompareTray() {
  const {
    compareIds,
    maxCompareRods,
    removeCompareId,
    clearCompareIds,
  } = useCompare();

  const selectedRods = compareIds
    .map((id) => rods.find((rod) => rod.id === id))
    .filter(Boolean);

  if (selectedRods.length === 0) {
    return null;
  }

  return (
    <div className="compareTray">
      <div className="container compareTrayInner">
        <div className="compareTraySummary">
          <strong>Compare</strong>
          <span>
            {selectedRods.length} / {maxCompareRods} rods selected
          </span>
        </div>

        <div className="compareTrayItems">
          {selectedRods.map((rod) => (
            <div key={rod.id} className="compareTrayItem">
              <Link to={`/rods/${rod.id}`}>
                <span>{rod.brand}</span>
                <strong>{rod.model}</strong>
                <em>{formatLengthM(rod.lengthCm)} · {formatWeightG(rod.weightG)}</em>
              </Link>

              <button
                type="button"
                aria-label={`Remove ${rod.displayName} from compare`}
                onClick={() => removeCompareId(rod.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="compareTrayActions">
          <button type="button" onClick={clearCompareIds}>
            Clear
          </button>
          <Link to="/compare">
            Compare now
          </Link>
        </div>
      </div>
    </div>
  );
}
