import { Link, useParams } from "react-router-dom";
import Pill from "../components/Pill.jsx";
import RodCard from "../components/RodCard.jsx";
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

function SpecRow({ label, value }) {
  return (
    <div className="rodDetailSpecRow">
      <span>{label}</span>
      <b>{value || "Unknown"}</b>
    </div>
  );
}

export default function RodPage() {
  const { rodId } = useParams();
  const rod = rods.find((item) => item.id === rodId);

  if (!rod) {
    return (
      <main className="container page">
        <div className="card">
          <div className="eyebrow">Rod not found</div>
          <h1>We could not find this rod.</h1>
          <p className="note">
            The rod may have been renamed, removed, or the URL may be incorrect.
          </p>
          <div className="buttonRow">
            <Link className="blackButton" to="/search">Back to search</Link>
            <Link className="outlineButton" to="/">Home</Link>
          </div>
        </div>
      </main>
    );
  }

  const similarRods = rods
    .filter((item) => item.id !== rod.id)
    .filter((item) => {
      const sameBrand = item.brand === rod.brand;
      const sameSeries = item.series === rod.series;
      const sharedUseCase = item.useCases?.some((tag) => rod.useCases?.includes(tag));
      return sameBrand || sameSeries || sharedUseCase;
    })
    .slice(0, 3);

  return (
    <main className="rodDetailPage">
      <section className="rodDetailHero">
        <div className="container rodDetailHeroGrid">
          <div className="rodDetailVisualPanel">
            <div className="rodDetailImageStage">
              <div className="rodDetailRodDrawing">
                <div className="detailRodLine detailRodLineOne" />
                <div className="detailRodLine detailRodLineTwo" />
                <div className="detailRodHandle" />
              </div>

              <div className="rodDetailImageLabel">
                <span>{rod.brand}</span>
                <strong>{rod.model}</strong>
              </div>
            </div>

            <div className="rodDetailVisualMeta">
              <span>{rod.construction}</span>
              <span>{rod.reelType}</span>
              <span>{rod.marketRegions.join(" / ")}</span>
            </div>
          </div>

          <div className="rodDetailSummary">
            <div className="catalogEyebrow">{rod.brand} / {rod.series}</div>
            <h1>{rod.displayName}</h1>
            <p>{rod.editorNote}</p>

            <div className="rodDetailPills">
              <Pill>{rod.catalogueStatus}</Pill>
              <Pill>{rod.sourceConfidence} confidence</Pill>
              <Pill>{rod.marketRegions.join(" / ")}</Pill>
            </div>

            <div className="rodDetailCoreSpecs">
              <div>
                <span>Total length</span>
                <b>{(rod.lengthCm / 100).toFixed(2)}m</b>
              </div>
              <div>
                <span>Closed length</span>
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

            <div className="rodDetailActions">
              <button>Add to compare</button>
              <Link to="/search">Back to search</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container rodDetailContentGrid">
        <div className="rodDetailMainColumn">
          <section className="rodDetailPanel">
            <div className="rodDetailPanelHeader">
              <div>
                <div className="catalogEyebrow">Specification table</div>
                <h2>Official specs</h2>
              </div>
            </div>

            <div className="rodDetailSpecTable">
              <SpecRow label="Brand" value={rod.brand} />
              <SpecRow label="Series" value={rod.series} />
              <SpecRow label="Model / variant" value={rod.model} />
              <SpecRow label="Generation" value={rod.generation} />
              <SpecRow label="Catalogue status" value={rod.catalogueStatus} />
              <SpecRow label="Market regions" value={rod.marketRegions.join(" / ")} />
              <SpecRow label="Rod type" value={rod.rodType} />
              <SpecRow label="Reel type" value={rod.reelType} />
              <SpecRow label="Construction" value={rod.construction} />
              <SpecRow label="Total length" value={`${(rod.lengthCm / 100).toFixed(2)}m`} />
              <SpecRow label="Closed length" value={`${rod.closedLengthCm}cm`} />
              <SpecRow label="Weight" value={`${rod.weightG}g`} />
              <SpecRow label="Sections" value={rod.sections} />
              <SpecRow label="Lure weight" value={formatLureRange(rod)} />
              <SpecRow label="PE rating" value={formatPeRange(rod)} />
              <SpecRow label="Power" value={rod.power} />
              <SpecRow label="Action" value={rod.action} />
              <SpecRow label="Tip type" value={rod.tipType} />
              <SpecRow label="Typical price" value={formatPrice(rod)} />
            </div>
          </section>

          <section className="rodDetailPanel">
            <div className="rodDetailPanelHeader">
              <div>
                <div className="catalogEyebrow">Names and aliases</div>
                <h2>Regional naming</h2>
              </div>
            </div>

            <div className="rodAliasGrid">
              <div>
                <span>Official name</span>
                <b>{rod.officialName || "Unknown"}</b>
              </div>
              <div>
                <span>Japanese name</span>
                <b>{rod.japaneseName || "Unknown"}</b>
              </div>
              <div>
                <span>Chinese name</span>
                <b>{rod.chineseName || "Unknown"}</b>
              </div>
              <div>
                <span>Model code</span>
                <b>{rod.modelCode || "Unknown"}</b>
              </div>
              <div>
                <span>JAN code</span>
                <b>{rod.janCode || "Unknown"}</b>
              </div>
            </div>

            <div className="rodAliasList">
              {(rod.aliases || []).map((alias) => (
                <span key={alias}>{alias}</span>
              ))}
            </div>
          </section>

          <section className="rodDetailPanel">
            <div className="rodDetailPanelHeader">
              <div>
                <div className="catalogEyebrow">Interpretation</div>
                <h2>Editor note</h2>
              </div>
            </div>

            <p className="rodEditorNote">{rod.editorNote}</p>

            <div className="rodAliasList">
              {(rod.useCases || []).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className="rodDetailSideColumn">
          <section className="rodDetailPanel compact">
            <div className="catalogEyebrow">Source status</div>
            <h2>Sources</h2>

            <div className="sourceRecordList">
              {(rod.sourceRecords || []).map((source, index) => (
                <div className="sourceRecord" key={index}>
                  <span>{source.sourceType}</span>
                  <b>{source.label}</b>
                  <em>{source.confidence} confidence</em>
                </div>
              ))}
            </div>

            <p className="sourceReminder">
              Specs should be checked against official catalogues or trusted listings before being treated as final.
            </p>
          </section>

          <section className="rodDetailPanel compact">
            <div className="catalogEyebrow">Series</div>
            <h2>{rod.series}</h2>
            <p className="sourceReminder">
              Open the series page to compare variants within the same product family.
            </p>
            <Link className="rodSideButton" to={`/series/${rod.brand.toLowerCase()}-${rod.series.toLowerCase().replaceAll(" ", "-")}`}>
              View series
            </Link>
          </section>
        </aside>
      </section>

      {similarRods.length > 0 && (
        <section className="container rodSimilarSection">
          <div className="catalogSectionHeader">
            <div>
              <div className="catalogEyebrow">Similar rods</div>
              <h2>Related indexed rods</h2>
            </div>
            <Link className="catalogTextLink" to="/search">Search all rods</Link>
          </div>

          <div className="catalogRodGrid">
            {similarRods.map((item) => (
              <RodCard key={item.id} rod={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

