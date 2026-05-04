import { Link, useParams } from "react-router-dom";
import { brands } from "../data/brands.js";
import { series } from "../data/series.js";
import { rods } from "../data/rods.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import PageTitle from "../components/PageTitle.jsx";
import BrandLogo from "../components/BrandLogo.jsx";

function BrandSelectionGrid() {
  const featuredBrands = brands.filter((brand) => brand.featured);
  const secondaryBrands = brands.filter((brand) => !brand.featured);

  return (
    <main className="container page brandLandingPage">
      <PageTitle title="Browse Rod Brands" description="Browse fishing rods by brand, series, model family, and indexed rod variants." />
      <div className="twSectionTitle">
        <h1>Browse Rods by Brand</h1>
        <p>Choose a brand to view its rod series, model families, and indexed variants.</p>
      </div>

      <div className="twBrandGrid twBrandGridFeatured">
        {featuredBrands.map((brand) => (
          <Link key={brand.id} className="twBrandCard twFeaturedBrandCard" to={`/brands/${brand.id}`}>
            <BrandLogo brand={brand} size="featured" />
            <div className="twBrandName">{brand.name}</div>
          </Link>
        ))}
      </div>

      <div className="twBrandGrid twBrandGridSecondary">
        {secondaryBrands.map((brand) => (
          <Link key={brand.id} className="twBrandCard twSmallBrandCard" to={`/brands/${brand.id}`}>
            <BrandLogo brand={brand} size="small" />
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

function formatMarketRegions(item) {
  if (!item.marketRegions || item.marketRegions.length === 0) return "Market to be confirmed";
  return item.marketRegions.join(" / ");
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
      <PageTitle title={`${selectedBrandData.name} Rods`} description={`Browse ${selectedBrandData.name} rod series, model families, official references, and indexed rod variants.`} />
      <section className="brandHero brandHeroCatalogue">
        <div className="container brandHeroInner">
          <div>
            <div className="catalogEyebrow">Brand catalogue</div>
            <h1>{selectedBrandData.name} Rods</h1>
            <p>{selectedBrandData.description}</p>

            <div className="brandHeroMeta">
              <span>{selectedBrandData.country}</span>
              <span>{selectedBrandSeries.length} series listed</span>
              <span>{brandRodCount} indexed rods</span>
              <span>Catalogue in progress</span>
            </div>
          </div>

          <BrandLogo brand={selectedBrandData} size="hero" className="brandHeroLogo" />
        </div>
      </section>

      <section className="container brandSeriesContent">
        <div className="brandToolbar">
          <Link to="/brands">← All brands</Link>
          <Link to={`/search?q=${encodeURIComponent(selectedBrandData.name)}`}>
            Search {selectedBrandData.name} rods
          </Link>
        </div>

        {(selectedBrandData.officialSites || []).length > 0 && (
          <section className="brandOfficialSites">
            <div>
              <div className="catalogEyebrow">Official references</div>
              <h2>{selectedBrandData.name} official websites</h2>
              <p>
                Product names, model availability, and specifications may differ by region.
                Always check the relevant official regional site before treating product data as final.
              </p>
            </div>

            <div className="officialSiteGrid">
              {selectedBrandData.officialSites.map((site) => (
                <a key={`${site.region}-${site.url}`} href={site.url} target="_blank" rel="noreferrer">
                  <span>{site.region}</span>
                  <strong>{site.label}</strong>
                  {site.note && <em>{site.note}</em>}
                </a>
              ))}
            </div>
          </section>
        )}

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

                    <div className="brandFamilyStats brandFamilyStatsClean">
                      <div>
                        <span>Indexed rods</span>
                        <b>{matchingRods.length}</b>
                      </div>
                      <div>
                        <span>Status</span>
                        <b>{item.catalogueStatus || "In progress"}</b>
                      </div>
                      <div>
                        <span>Market</span>
                        <b>{formatMarketRegions(item)}</b>
                      </div>
                    </div>

                    <div className="brandFamilyTags">
                      {(item.useCases || []).slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    {matchingRods.length > 0 ? (
                      <div className="seriesIndexedRod">
                        Indexed rod example: <b>{matchingRods[0].displayName}</b>
                      </div>
                    ) : (
                      <div className="seriesIndexedRod">
                        Individual rod variants not indexed yet.
                      </div>
                    )}

                    <div className="brandFamilyFooter">
                      <span>{matchingRods.length} indexed rod{matchingRods.length === 1 ? "" : "s"}</span>
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







