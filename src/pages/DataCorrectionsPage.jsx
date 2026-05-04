import { Link } from "react-router-dom";
import Pill from "../components/Pill.jsx";

const dataTypes = [
  {
    title: "Official specs",
    description:
      "Rod specifications should come from official brand pages, official catalogues, or reliable catalogue records whenever possible.",
  },
  {
    title: "Shop and market notes",
    description:
      "Retailer listings can help with price, availability, and discontinued models, but they may be incomplete or outdated.",
  },
  {
    title: "User corrections",
    description:
      "Community corrections are useful for missing rods, regional names, old models, and real-world ownership notes, but they should be reviewed before becoming official data.",
  },
  {
    title: "Editor notes",
    description:
      "RodBase explanations and suggestions are separated from official specifications, so users can tell the difference between facts and interpretation.",
  },
];

export default function DataCorrectionsPage() {
  return (
    <main className="dataCorrectionsPage">
      <section className="dataHero">
        <div className="container dataHeroInner">
          <div>
            <div className="catalogEyebrow">Data & Corrections</div>
            <h1>Help keep RodBase useful and accurate.</h1>
            <p>
              RodBase is a reference database for fishing rods. We collect rod information from
              official catalogues, brand pages, retailer listings, and community corrections.
            </p>

            <div className="dataHeroPills">
              <Pill>Official specs first</Pill>
              <Pill>Corrections welcome</Pill>
              <Pill>Reference only</Pill>
              <Pill>Reviewed data</Pill>
            </div>
          </div>

          <div className="dataHeroPanel">
            <b>Reference</b>
            <span>Not a shop. Not a guarantee. Always verify before buying.</span>
          </div>
        </div>
      </section>

      <section className="container dataCorrectionsContent">
        <div className="dataTypeGrid">
          {dataTypes.map((item) => (
            <article key={item.title} className="dataTypeCard">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <section className="dataCorrectionPanel">
          <div>
            <div className="catalogEyebrow">Correction workflow</div>
            <h2>How corrections should work</h2>
          </div>

          <div className="dataCorrectionRows">
            <div><span>Wrong specification</span><b>Submit a correction with a source</b></div>
            <div><span>Missing rod model</span><b>Submit brand, series, model, and source link</b></div>
            <div><span>Different regional name</span><b>Submit alias or market name</b></div>
            <div><span>Owner experience</span><b>Submit as review, not official spec</b></div>
            <div><span>Conflicting data</span><b>Marked for review before publishing</b></div>
          </div>
        </section>

        <section className="dataDisclaimerPanel">
          <h2>Reference-only note</h2>
          <p>
            All fishing rod information, specifications, ratings, prices, market notes, comparisons,
            and articles are provided for reference only. RodBase does not guarantee completeness,
            accuracy, availability, suitability, or purchase outcome. Always check official brand
            information and seller details before buying.
          </p>

          <div className="dataActionRow">
            <Link to="/search">Search rods</Link>
            <Link to="/articles">Read guides</Link>
          </div>
        </section>
      </section>
    </main>
  );
}


