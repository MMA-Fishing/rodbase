import Pill from "../components/Pill.jsx";
import StatCard from "../components/StatCard.jsx";
import { rods } from "../data/rods.js";

function formatLureRange(rod) {
  if (rod.minLureG == null || rod.maxLureG == null) return "Unknown";
  return `${rod.minLureG}-${rod.maxLureG}g`;
}

function formatPeRange(rod) {
  if (rod.minPe == null || rod.maxPe == null) return "Unknown";
  return `PE ${rod.minPe}-${rod.maxPe}`;
}

export default function RodPage() {
  const rod = rods[2];

  return (
    <main className="container page">
      <div className="rodHeroGrid">
        <section>
          <div className="pillWrap">
            <Pill>{rod.brand}</Pill>
            <Pill>{rod.series}</Pill>
            <Pill>{rod.catalogueStatus}</Pill>
            <Pill>{rod.marketRegions.join(" / ")}</Pill>
          </div>

          <h1>{rod.displayName}</h1>
          <p className="heroText">{rod.editorNote}</p>

          <div className="specGrid three">
            <StatCard icon="↔" label="Total length" value={`${(rod.lengthCm / 100).toFixed(2)}m`} />
            <StatCard icon="▣" label="Closed length" value={`${rod.closedLengthCm}cm`} />
            <StatCard icon="◍" label="Rod weight" value={`${rod.weightG}g`} />
          </div>
        </section>

        <aside className="card imageCard">
          <div className="imageSlot">
            <div>
              <div className="muted">Image slot</div>
              <h2>Rod product photo</h2>
            </div>
          </div>
          <div className="buttonRow">
            <button className="blackButton">Add to compare</button>
            <button className="outlineButton">Save</button>
          </div>
        </aside>
      </div>

      <div className="rodContentGrid">
        <section className="card">
          <h2>Official specs</h2>
          <div className="factList">
            {[
              ["Brand", rod.brand],
              ["Series", rod.series],
              ["Model / variant", rod.model],
              ["Generation", rod.generation],
              ["Catalogue status", rod.catalogueStatus],
              ["Market regions", rod.marketRegions.join(" / ")],
              ["Rod type", rod.rodType],
              ["Reel type", rod.reelType],
              ["Construction", rod.construction],
              ["Sections", rod.sections],
              ["Lure weight", formatLureRange(rod)],
              ["PE rating", formatPeRange(rod)],
              ["Power", rod.power || "Unknown"],
              ["Action", rod.action || "Unknown"],
              ["Typical price", `~HKD ${rod.priceHkdApprox}`],
            ].map((item) => (
              <div className="factRow" key={item[0]}>
                <span>{item[0]}</span>
                <b>{item[1]}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="stack">
          <div className="card">
            <h2>Names and regional aliases</h2>
            <div className="aliasGrid">
              <div className="specBox"><span>Official name</span><b>{rod.officialName}</b></div>
              <div className="specBox"><span>Japanese name</span><b>{rod.japaneseName || "Unknown"}</b></div>
              <div className="specBox"><span>Chinese name</span><b>{rod.chineseName || "Unknown"}</b></div>
              <div className="specBox"><span>Model code</span><b>{rod.modelCode || "Unknown"}</b></div>
            </div>

            <div className="pillWrap">
              {rod.aliases.map((alias) => (
                <Pill key={alias}>{alias}</Pill>
              ))}
            </div>
          </div>

          <div className="card">
            <h2>General interpretation</h2>
            <p className="note">{rod.editorNote}</p>
            <div className="pillWrap">
              {rod.useCases.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="row topRow">
              <div>
                <h2>Sources</h2>
                <p className="muted">Each spec should eventually link to an official, shop, catalogue, or user-submitted source.</p>
              </div>
              <Pill active>{rod.sourceConfidence} confidence</Pill>
            </div>

            <div className="factList">
              {rod.sourceRecords.map((source, index) => (
                <div className="factRow" key={index}>
                  <span>{source.sourceType}</span>
                  <b>{source.label}</b>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
'@ | Set-Content .\src\pages\RodPage.jsx -Encoding utf8