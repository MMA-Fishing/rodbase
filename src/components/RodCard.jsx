import { Link } from "react-router-dom";
import Pill from "./Pill.jsx";
import RodImage from "./RodImage.jsx";
import {
  formatLengthM,
  formatLengthCm,
  formatWeightG,
  formatLureRange,
  formatPeRange,
} from "../utils/rodFormatters.js";
import { useCompare } from "../context/CompareContext.jsx";
import { useLocale } from "../context/LocaleContext.jsx";
import { getPrimarySourceRecord } from "../utils/sourceHelpers.js";
import { translateDataLabel, translateLabelList } from "../i18n/dataLabels.js";

export default function RodCard({ rod }) {
  const {
    compareIds,
    maxCompareRods,
    canAddMore,
    isCompared,
    toggleCompareId,
  } = useCompare();

  const { locale, t } = useLocale();

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
            title={compareFull ? `Maximum ${maxCompareRods} rods can be compared` : t("rodCard.compare")}
          >
            <input
              type="checkbox"
              checked={compared}
              disabled={compareFull}
              onChange={handleCompareChange}
            />
            {t("rodCard.compare")}
          </label>
        </div>

        <p className="catalogRodType">{translateDataLabel(locale, rod.rodType)}</p>

        <div className="catalogSpecTable">
          <div>
            <span>{t("rodCard.length")}</span>
            <b>{formatLengthM(rod.lengthCm)}</b>
          </div>
          <div>
            <span>{t("rodCard.closed")}</span>
            <b>{formatLengthCm(rod.closedLengthCm)}</b>
          </div>
          <div>
            <span>{t("rodCard.weight")}</span>
            <b>{formatWeightG(rod.weightG)}</b>
          </div>
          <div>
            <span>{t("rodCard.lure")}</span>
            <b>{formatLureRange(rod)}</b>
          </div>
          <div>
            <span>{t("rodCard.line")}</span>
            <b>{formatPeRange(rod)}</b>
          </div>
          <div>
            <span>{t("rodCard.sections")}</span>
            <b>{rod.sections ?? t("common.notListed")}</b>
          </div>
        </div>

        <div className="catalogRodTags">
          {(rod.useCases || []).slice(0, 4).map((tag) => (
            <Pill key={tag}>{translateDataLabel(locale, tag)}</Pill>
          ))}
        </div>

        <div className="catalogRodMeta">
          <span>{translateDataLabel(locale, rod.catalogueStatus)}</span>
          <span>{translateLabelList(locale, rod.marketRegions)}</span>
          {compared && <span>{t("rodCard.inCompareSet")}</span>}
          {compareFull && <span>{t("rodCard.compareFull")}</span>}
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
                {t("rodCard.source")}
              </a>
            )}

            <Link className="catalogViewButton" to={`/rods/${rod.id}`}>
              {t("rodCard.viewDetails")}
            </Link>
          </div>
        </div>
      </div>

      {compareIds.length > 0 && compared && (
        <Link className="compareMiniLink" to="/compare">
          {t("rodCard.viewCompare")}
        </Link>
      )}
    </article>
  );
}
