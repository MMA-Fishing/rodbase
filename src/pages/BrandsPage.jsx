import { Link, Navigate, useParams } from "react-router-dom";
import { brands } from "../data/brands.js";
import { rods } from "../data/rods.js";
import { series } from "../data/series.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import PageTitle from "../components/PageTitle.jsx";
import BrandLogo from "../components/BrandLogo.jsx";
import { useLocale } from "../context/LocaleContext.jsx";

function makeSeriesId(brandName, seriesName) {
  return `${String(brandName || "").toLowerCase().replaceAll(" ", "-")}-${String(seriesName || "")
    .toLowerCase()
    .replaceAll(" ", "-")}`;
}

function BrandCard({ brand, size = "featured", t }) {
  const brandRods = rods.filter((rod) => rod.brand === brand.name);
  const seriesCount = (brand.series || []).length;

  return (
    <Link
      className={size === "small" ? "twBrandCard twSmallBrandCard" : "twBrandCard twFeaturedBrandCard"}
      to={`/brands/${brand.id}`}
    >
      <BrandLogo brand={brand} size={size === "small" ? "small" : "featured"} />
      <div className="twBrandName">{brand.name}</div>
      <div className="brandCardMeta">
        <span>{brandRods.length} {t("brands.indexedRods")}</span>
        <span>{seriesCount} {t("brands.series")}</span>
      </div>
    </Link>
  );
}

export default function BrandsPage() {
  const { brandId } = useParams();
  const { t } = useLocale();

  const selectedBrandData = brandId
    ? brands.find((brand) => brand.id === brandId)
    : null;

  if (brandId && !selectedBrandData) {
    return <Navigate to="/brands" replace />;
  }

  if (!selectedBrandData) {
    const featuredBrandsRaw = brands.filter((brand) => brand.featured);
    const featuredBrands = featuredBrandsRaw.length > 0 ? featuredBrandsRaw : brands.slice(0, 4);
    const featuredIds = new Set(featuredBrands.map((brand) => brand.id));
    const secondaryBrands = brands.filter((brand) => !featuredIds.has(brand.id));

    return (
      <main className="brandLandingPage">
        <PageTitle title={t("brands.pageTitle")} description={t("brands.pageDescription")} />

        <section className="container twStyleSection">
          <div className="twSectionTitle">
            <div className="catalogEyebrow">{t("brands.eyebrow")}</div>
            <h1>{t("brands.title")}</h1>
            <p>{t("brands.description")}</p>
          </div>

          <div className="twSectionTitle compactBrandTitle">
            <h2>{t("brands.featuredTitle")}</h2>
            <p>{t("brands.featuredDesc")}</p>
          </div>

          <div className="twBrandGrid twBrandGridFeatured">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} t={t} />
            ))}
          </div>

          {secondaryBrands.length > 0 && (
            <>
              <div className="twSectionTitle compactBrandTitle">
                <h2>{t("brands.moreTitle")}</h2>
                <p>{t("brands.moreDesc")}</p>
              </div>

              <div className="twBrandGrid twBrandGridSecondary">
                {secondaryBrands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} size="small" t={t} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    );
  }

  const brandRods = rods.filter((rod) => rod.brand === selectedBrandData.name);
  const brandSeriesRecords = series.filter((item) => item.brand === selectedBrandData.name);
  const seriesFromBrand = selectedBrandData.series || [];

  const displaySeries = seriesFromBrand.map((seriesName) => {
    const matched = brandSeriesRecords.find((item) => item.name === seriesName);
    const seriesRods = brandRods.filter((rod) => rod.series === seriesName);

    return {
      id: matched?.id || makeSeriesId(selectedBrandData.name, seriesName),
      name: matched?.name || seriesName,
      displayName: matched?.displayName || `${selectedBrandData.name} ${seriesName}`,
      description: matched?.description || "",
      catalogueStatus: matched?.catalogueStatus || "",
      marketRegions: matched?.marketRegions || [],
      variantsCount: matched?.variantsCount ?? seriesRods.length,
      currentCount: matched?.currentCount ?? seriesRods.length,
      archivedCount: matched?.archivedCount ?? 0,
      sourceRecords: matched?.sourceRecords || [],
      isIndexed: Boolean(matched) || seriesRods.length > 0,
    };
  });

  const indexedSeries = displaySeries.filter((item) => item.isIndexed);

  return (
    <main className="brandSeriesPage">
      <PageTitle
        title={`${selectedBrandData.name} ${t("brandDetail.pageSuffix")}`}
        description={`Browse ${selectedBrandData.name} rod series, model families, official references, and indexed rod variants.`}
      />

      <section className="brandHero">
        <div className="container brandHeroInner">
          <div>
            <div className="catalogEyebrow">{t("brands.eyebrow")}</div>
            <h1>{selectedBrandData.name}</h1>
            <p>
              {brandRods.length} {t("brands.indexedRods")} · {(selectedBrandData.series || []).length} {t("brands.series")}
            </p>

            <div className="brandToolbar">
              <Link to="/brands">{t("brandDetail.backAllBrands")}</Link>
              <Link to={`/search?q=${encodeURIComponent(selectedBrandData.name)}`}>
                {t("brandDetail.searchBrandRods")}
              </Link>
            </div>
          </div>

          <BrandLogo brand={selectedBrandData} size="hero" className="brandHeroLogo" />
        </div>
      </section>

      <section className="container brandSeriesContent">
        <Breadcrumbs
          items={[
            { label: t("nav.brands"), to: "/brands" },
            { label: `${selectedBrandData.name} ${t("brandDetail.pageSuffix")}` },
          ]}
        />

        {(selectedBrandData.officialSites || []).length > 0 && (
          <section className="brandOfficialSites">
            <div>
              <div className="catalogEyebrow">{t("brandDetail.officialEyebrow")}</div>
              <h2>{selectedBrandData.name} {t("brandDetail.officialTitleSuffix")}</h2>
              <p>{t("brandDetail.officialDesc")}</p>
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

        <div className="catalogSectionHeader">
          <div>
            <div className="catalogEyebrow">{t("brandDetail.seriesEyebrow")}</div>
            <h2>{t("brandDetail.seriesTitle")}</h2>
            <p>{t("brandDetail.seriesDesc")}</p>
          </div>

          <Link className="catalogTextLink" to={`/search?q=${encodeURIComponent(selectedBrandData.name)}`}>
            {t("brandDetail.searchAll")}
          </Link>
        </div>

        {indexedSeries.length > 0 ? (
          <div className="brandFamilyGrid">
            {indexedSeries.map((item) => (
              <Link key={item.id} className="brandFamilyCard brandFamilyCardPremium" to={`/series/${item.id}`}>
                <div className="brandFamilyCardBody">
                <div className="seriesBrand">{selectedBrandData.name}</div>
                <h3>{item.name}</h3>
                <p>{item.description || `${selectedBrandData.name} ${item.name}`}</p>

                <div className="brandFamilyStats">
                  <div>
                    <span>{t("brandDetail.variants")}</span>
                    <b>{item.variantsCount}</b>
                  </div>
                  <div>
                    <span>{t("brandDetail.currentRecent")}</span>
                    <b>{item.currentCount}</b>
                  </div>
                  <div>
                    <span>{t("brandDetail.indexed")}</span>
                    <b>{brandRods.filter((rod) => rod.series === item.name).length}</b>
                  </div>
                </div>

                <div className="seriesStats">
                  <span>{item.catalogueStatus || t("common.notListed")}</span>
                  <span>{(item.marketRegions || []).join(" / ") || t("common.notListed")}</span>
                </div>

                <span className="brandFamilyLink">{t("brandDetail.viewSeries")}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="emptyBrandSeries">
            <div className="catalogEyebrow">{t("brandDetail.seriesEyebrow")}</div>
            <h2>{t("brandDetail.noSeriesTitle")}</h2>
            <p>{t("brandDetail.noSeriesText")}</p>
            <Link to={`/search?q=${encodeURIComponent(selectedBrandData.name)}`}>
              {t("brandDetail.searchAll")}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

