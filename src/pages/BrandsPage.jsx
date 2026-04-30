import { Link, useParams } from "react-router-dom";
import { brands } from "../data/brands.js";
import { series } from "../data/series.js";
import { rods } from "../data/rods.js";

function BrandSelectionGrid() {
  const featuredBrands = brands.filter((brand) => brand.featured);
  const secondaryBrands = brands.filter((brand) => !brand.featured);

  return (
    <main className="container page brandLandingPage">
      <div className="twSectionTitle">
        <h1>Browse Rods by Brand</h1>
        <p>Choose a brand to view its rod series, model families, and indexed variants.</p>
      </div>

      <div className="twBrandGrid twBrandGridFeatured">
        {featuredBrands.map((brand) => (
          <Link key={brand.id} className="twBrandCard twFeaturedBrandCard" to={`/brands/${brand.id}`}>
            <div className={`twBrandLogo twLogo-${brand.id}`}>
              {brand.logoText}
            </div>
            <div className="twBrandName">{brand.name}</div>
          </Link>
        ))}
      </div>

      <div className="twBrandGrid twBrandGridSecondary">
        {secondaryBrands.map((brand) => (
          <Link key={brand.id} className="twBrandCard twSmallBrandCard" to={`/brands/${brand.id}`}>
            <div className={`twBrandLogo twSmallLogo twLogo-${brand.id}`}>
              {brand.logoText}
            </div>
            <div className="twBrandName">{brand.name}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function RodFamilyVisual({ seriesName, brandName }) {
  return (
    <div className="brandFamilyVisual">
      <div className="rodRack">
        <div className="rackRod rackRodOne">
          <span />
        </div>
        <div className="rackRod rackRodTwo">
          <span />
        </div>
        <div className="rackRod rackRodThree">
          <span />
        </div>
      </div>

      <div className="brandFamilyVisualLabel">
        <span>{brandName}</span>
        <strong>{seriesName}</strong>
      </div>
    </div>
  );
}

export default function BrandsPage() {
  const { brandId } = useParams();

  if (!brandId) {
    return <BrandSelectionGrid />;
  }

  const selectedBrandData = brands.find((brand) => brand.id === brandId);

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

  const brandRodCount = rods.filter((rod) => rod.brand === selectedBrandData.name).length;

  return (
    <main className="brandSeriesPage">
      <section className="brandHero brandHeroCatalogue">
        <div className="container brandHeroInner">
          <div>
            <div className="catalogEyebrow">Brand catalogue</div>
            <h1>{selectedBrandData.name} Rods</h1>
            <p>{selectedBrandData.description}</p>

            <div className="brandHeroMeta">
              <span>{selectedBrandData.country}</span>
              <span>{selectedBrandData.rods} planned/indexed records</span>
              <span>{brandRodCount} live demo rods</span>
              <span>{selectedBrandData.confidence} confidence</span>
            </div>
          </div>

          <div className={`brandHeroLogo twLogo-${selectedBrandData.id}`}>
            {selectedBrandData.logoText}
          </div>
        </div>
      </section>

      <section className="container brandSeriesContent">
        <div className="brandToolbar">
          <Link to="/brands">← All brands</Link>
          <Link to={`/search?q=${encodeURIComponent(selectedBrandData.name)}`}>
            Search {selectedBrandData.name} rods
          </Link>
        </div>

        <div className="catalogSectionHeader brandFamilyHeader">
          <div>
            <div className="catalogEyebrow">Series families</div>
            <h2>{selectedBrandData.name} rod series</h2>
            <p className="brandFamilyIntro">
              Browse the brand by model family first, then open a series to compare individual rod variants.
            </p>
          </div>
          <span className="brandSeriesCount">{selectedBrandSeries.length} series listed</span>
        </div>

        {selectedBrandSeries.length > 0 ? (
          <div className="brandFamilyGrid">
            {selectedBrandSeries.map((item) => {
              const matchingRods = rods.filter(
                (rod) => rod.brand === item.brand && rod.series === item.name
              );

              return (
                <Link key={item.id} className="brandFamilyCard" to={`/series/${item.id}`}>
                  <RodFamilyVisual seriesName={item.name} brandName={item.brand} />

                  <div className="brandFamilyInfo">
                    <div className="seriesBrand">{item.brand}</div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>

                    <div className="brandFamilyStats">
                      <div>
                        <span>Variants</span>
                        <b>{item.variantsCount}</b>
                      </div>
                      <div>
                        <span>Current</span>
                        <b>{item.currentCount}</b>
                      </div>
                      <div>
                        <span>Archived</span>
                        <b>{item.archivedCount}</b>
                      </div>
                    </div>

                    <div className="brandFamilyTags">
                      {item.useCases.slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    {matchingRods.length > 0 ? (
                      <div className="seriesDemoRod">
                        Demo indexed rod: <b>{matchingRods[0].displayName}</b>
                      </div>
                    ) : (
                      <div className="seriesDemoRod">
                        Individual rod variants not indexed yet.
                      </div>
                    )}

                    <div className="brandFamilyFooter">
                      <span>{item.confidence} confidence</span>
                      <strong>View series →</strong>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card emptyBrandSeries">
            <h2>No series indexed yet</h2>
            <p className="note">
              This brand exists in the database, but series records have not been added yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
