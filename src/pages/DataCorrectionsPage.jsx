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
    <main className="container page">
      <div className="pageIntro">
        <div className="eyebrow">Data & Corrections</div>
        <h1>Help keep RodBase useful and accurate.</h1>
        <p className="muted wide">
          RodBase is a reference database for fishing rods. We collect rod information from
          official catalogues, brand pages, retailer listings, and community corrections. Some
          information may be incomplete, outdated, region-specific, or still waiting for review.
        </p>

        <div className="pillWrap">
          <Pill>Official specs first</Pill>
          <Pill>Corrections welcome</Pill>
          <Pill>Reference only</Pill>
          <Pill>Reviewed data</Pill>
        </div>
      </div>

      <section className="policyGrid">
        {dataTypes.map((item) => (
          <article key={item.title} className="card policyCard">
            <h2>{item.title}</h2>
            <p className="note">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="card policyWideCard">
        <h2>How corrections should work</h2>
        <div className="factList">
          <div className="factRow">
            <span>Wrong specification</span>
            <b>Submit a correction with a source</b>
          </div>
          <div className="factRow">
            <span>Missing rod model</span>
            <b>Submit brand, series, model, and source link</b>
          </div>
          <div className="factRow">
            <span>Different regional name</span>
            <b>Submit alias or market name</b>
          </div>
          <div className="factRow">
            <span>Owner experience</span>
            <b>Submit as review, not official spec</b>
          </div>
          <div className="factRow">
            <span>Conflicting data</span>
            <b>Marked for review before publishing</b>
          </div>
        </div>
      </section>

      <section className="card policyWideCard">
        <h2>Reference-only note</h2>
        <p className="note">
          All fishing rod information, specifications, ratings, prices, market notes, comparisons,
          and articles are provided for reference only. RodBase does not guarantee completeness,
          accuracy, availability, suitability, or purchase outcome. Always check official brand
          information and seller details before buying.
        </p>
      </section>

      <div className="buttonRow articleActions">
        <Link className="blackButton" to="/search">Search rods</Link>
        <Link className="outlineButton" to="/articles">Read guides</Link>
      </div>
    </main>
  );
}
