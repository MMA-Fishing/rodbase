import { Link, useParams } from "react-router-dom";
import { brands } from "../data/brands.js";
import { series } from "../data/series.js";

export default function BrandsPage() {
  const { brandId } = useParams();
  const selectedBrandId = brandId || "daiwa";
  const selectedBrandData = brands.find((brand) => brand.id === selectedBrandId);

  if (!selectedBrandData) {
    return (
      <main className="container page">
        <div className="card">
          <div className="eyebrow">Brand not found</div>
          <h1>We could not find this brand.</h1>
          <p className="note">
            The brand may have been renamed, removed, or the URL may be incorrect.
          </p>
          <div className="buttonRow">
            <Link className="blackButton" to="/brands">Back to brands</Link>
            <Link className="outlineButton" to="/">Home</Link>
          </div>
        </div>
      </main>
    );
  }

  const selectedBrandSeries = series.filter(
    (item) => item.brand === selectedBrandData.name
  );

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
              <Link
                key={brand.id}
                to={`/brands/${brand.id}`}
                className={brand.id === selectedBrandId ? "sideItem selected" : "sideItem"}
              >
                <span>{brand.name}</span>
                <span>{brand.rods}</span>
              </Link>
            ))}
          </div>
        </aside>

        <section className="card detailCard">
          <div className="row responsiveRow">
            <div className="row">
              <div className="brandLetter big">{selectedBrandData.name.charAt(0)}</div>
              <div>
                <h2>{selectedBrandData.name}</h2>
                <p className="muted">
                  {selectedBrandData.country} - {selectedBrandData.rods} indexed rod records
                </p>
              </div>
            </div>
            <div className="confidenceBox">
              Spec confidence: {selectedBrandData.confidence}
            </div>
          </div>

          <p className="note wide">{selectedBrandData.description}</p>

          <div className="seriesGrid">
            {selectedBrandSeries.length > 0 ? (
              selectedBrandSeries.map((item) => (
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
              ))
            ) : (
              <div className="card">
                <h2>No series indexed yet</h2>
                <p className="note">
                  This brand exists in the database, but series records have not been added yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
