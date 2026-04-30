import Pill from "../components/Pill.jsx";
import StatCard from "../components/StatCard.jsx";
import { rods } from "../data/rods.js";

export default function RodPage() {
  const rod = rods[2];

  return (
    <main className="container page">
      <div className="rodHeroGrid">
        <section>
          <div className="pillWrap">
            <Pill>{rod.brand}</Pill>
            <Pill>{rod.series}</Pill>
            <Pill>{rod.status}</Pill>
            <Pill>{rod.market}</Pill>
          </div>
          <h1>{rod.model}</h1>
          <p className="heroText">{rod.note}</p>

          <div className="specGrid three">
            <StatCard icon="↔" label="Total length" value={`${(rod.lengthCm / 100).toFixed(2)}m`} />
            <StatCard icon="▣" label="Closed length" value={`${rod.closedCm}cm`} />
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
              ["Rod type", rod.type],
              ["Construction", rod.construction],
              ["Sections", rod.sections],
              ["Lure weight", rod.lure],
              ["Line rating", rod.line],
              ["Market", rod.market],
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
              <div className="specBox"><span>Official name</span><b>Daiwa Mobile Pack 866TML</b></div>
              <div className="specBox"><span>Japanese name</span><b>Daiwa Mobile Pack 866TML</b></div>
              <div className="specBox"><span>English alias</span><b>Mobile Pack 866 TML</b></div>
              <div className="specBox"><span>Model code</span><b>866TML</b></div>
            </div>
          </div>

          <div className="card">
            <h2>General interpretation</h2>
            <p className="note">
              A compact, higher-quality travel rod for users who want portability without dropping too much rod feel.
              Better suited for light lure and general shore use than heavy boat work.
            </p>
            <div className="pillWrap">
              {rod.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="row topRow">
              <div>
                <h2>Sources</h2>
                <p className="muted">Every spec can be linked to an official, shop, catalogue, or user-submitted source.</p>
              </div>
              <Pill active>{rod.confidence} confidence</Pill>
            </div>
            <div className="factList">
              <div className="factRow"><span>Official catalogue source</span><b>Needed</b></div>
              <div className="factRow"><span>Shop listing cross-check</span><b>Needed</b></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
