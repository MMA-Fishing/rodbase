import { Link } from "react-router-dom";
import { brands } from "../data/brands.js";
import { series } from "../data/series.js";

export default function BrandsPage() {
  const selectedBrand = "Daiwa";
  const selectedBrandData = brands.find((brand) => brand.name === selectedBrand);
  const selectedBrandSeries = series.filter((item) => item.brand === selectedBrand);

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
            {brands.map((brand) => (
              <button
                key={brand.name}
                className={brand.name === selectedBrand ? "sideItem selected" : "sideItem"}
              >
                <span>{brand.name}</span>
                <span>{brand.rods}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="card detailCard">
          <div className="row responsiveRow">
            <div className="row">
              <div className="brandLetter big">{selectedBrand.charAt(0)}</div>
              <div>
                <h2>{selectedBrand}</h2>
                <p className="muted">
                  {selectedBrandData?.country || "Unknown"} - {selectedBrandData?.rods || 0} indexed rod records
                </p>
              </div>
            </div>
            <div className="confidenceBox">
              Spec confidence: {selectedBrandData?.confidence || "Unknown"}
            </div>
          </div>

          <p className="note wide">
            Brand page preview showing series-first navigation. Users can understand the full product family before opening a specific rod variant.
          </p>

          <div className="seriesGrid">
            {selectedBrandSeries.map((item) => (
              <Link key={item.id} className="seriesCard" to={`/series/${item.id}`}>
                <div className="row topRow">
                  <h3>{item.name}</h3>
                  <span>→</span>
                </div>
                <p className="muted seriesDescription">{item.description}</p>
                <div className="specGrid three">
                  <div className="specBox"><span>Variants</span><b>{item.variantsCount}</b></div>
                  <div className="specBox"><span>Current</span><b>{item.currentCount}</b></div>
                  <div className="specBox"><span>Archived</span><b>{item.archivedCount}</b></div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
