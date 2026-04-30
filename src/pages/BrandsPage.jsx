import { useNavigate } from "react-router-dom";
import { brands } from "../data/brands.js";

export default function BrandsPage() {
  const navigate = useNavigate();

  return (
    <main className="container page">
      <div className="pageIntro">
        <div className="eyebrow">Brand index</div>
        <h1>Browse by brand first.</h1>
        <p className="muted wide">
          Each brand page contains official series, model variants, discontinued records, regional equivalents,
          and source confidence.
        </p>
      </div>

      <div className="brandPageGrid">
        <aside className="card sideCard">
          <h2>Brand list</h2>
          <div className="sideList">
            {brands.map((brand, index) => (
              <button key={brand.name} className={index === 0 ? "sideItem selected" : "sideItem"}>
                <span>{brand.name}</span>
                <span>{brand.rods}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="card detailCard">
          <div className="row responsiveRow">
            <div className="row">
              <div className="brandLetter big">D</div>
              <div>
                <h2>Daiwa</h2>
                <p className="muted">Japan - 186 indexed rod records</p>
              </div>
            </div>
            <div className="confidenceBox">Spec confidence: High</div>
          </div>

          <p className="note wide">
            Brand page preview showing series-first navigation. Users can understand the full product family before opening a specific rod variant.
          </p>

          <div className="seriesGrid">
            {["Holiday Pack", "Mobile Pack", "Crossbeat", "Liberty Club"].map((series, index) => (
              <button key={series} className="seriesCard" onClick={() => navigate("/rods/daiwa-mobile-pack-866tml")}>
                <div className="row topRow">
                  <h3>{series}</h3>
                  <span>→</span>
                </div>
                <div className="specGrid three">
                  <div className="specBox"><span>Variants</span><b>{[12, 18, 26, 14][index]}</b></div>
                  <div className="specBox"><span>Current</span><b>{[8, 16, 19, 9][index]}</b></div>
                  <div className="specBox"><span>Archived</span><b>{[4, 2, 7, 5][index]}</b></div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
