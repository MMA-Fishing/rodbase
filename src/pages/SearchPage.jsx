import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RodCard from "../components/RodCard.jsx";
import PageTitle from "../components/PageTitle.jsx";
import { brands } from "../data/brands.js";
import { rods } from "../data/rods.js";
import { useCases } from "../data/useCases.js";
import { useCompare } from "../context/CompareContext.jsx";
import { useLocale } from "../context/LocaleContext.jsx";

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function rodMatchesKeyword(rod, keyword) {
  const q = normalize(keyword);

  if (!q) return true;

  const searchableText = [
    rod.brand,
    rod.series,
    rod.model,
    rod.variant,
    rod.displayName,
    rod.officialName,
    rod.japaneseName,
    rod.chineseName,
    rod.modelCode,
    rod.janCode,
    rod.rodType,
    rod.reelType,
    rod.construction,
    rod.power,
    rod.action,
    ...(rod.aliases || []),
    ...(rod.useCases || []),
    ...(rod.marketRegions || []),
  ]
    .map(normalize)
    .join(" ");

  return searchableText.includes(q);
}

function sortableNumber(value) {
  return typeof value === "number" ? value : Number.POSITIVE_INFINITY;
}

function toggleArrayValue(currentValues, value) {
  if (currentValues.includes(value)) {
    return currentValues.filter((item) => item !== value);
  }

  return [...currentValues, value];
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      className={active ? "catalogFilterPill catalogFilterPillActive" : "catalogFilterPill"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function FilterPanel({
  t,
  activeFilterCount,
  brands,
  selectedBrands,
  setSelectedBrands,
  constructionOptions,
  selectedConstruction,
  setSelectedConstruction,
  minTotalLength,
  maxTotalLength,
  setMinTotalLength,
  setMaxTotalLength,
  maxClosed,
  setMaxClosed,
  maxWeight,
  setMaxWeight,
  selectedUseCases,
  setSelectedUseCases,
  resetAllFilters,
}) {
  return (
    <aside className="catalogFilterSidebar">
      <div className="catalogFilterHeader">
        <h2>{t("search.filters")}</h2>
        <span>{activeFilterCount} {t("search.active")}</span>
      </div>

      <div className="catalogFilterGroup">
        <h3>{t("search.brand")}</h3>
        <div className="catalogFilterList">
          {brands.map((brand) => (
            <FilterButton
              key={brand.name}
              active={selectedBrands.includes(brand.name)}
              onClick={() =>
                setSelectedBrands((current) =>
                  toggleArrayValue(current, brand.name)
                )
              }
            >
              {brand.name}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="catalogFilterGroup">
        <h3>{t("search.construction")}</h3>
        <div className="catalogFilterList">
          {constructionOptions.map((option) => (
            <FilterButton
              key={option}
              active={selectedConstruction.includes(option)}
              onClick={() =>
                setSelectedConstruction((current) =>
                  toggleArrayValue(current, option)
                )
              }
            >
              {option}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="catalogFilterGroup">
        <div className="filterLabelRow">
          <h3>{t("search.totalLength")}</h3>
          <b>
            {(minTotalLength / 100).toFixed(2)}m -{" "}
            {(maxTotalLength / 100).toFixed(2)}m
          </b>
        </div>

        <div
          className="dualLengthSlider"
          style={{
            "--minPercent": `${(minTotalLength / 700) * 100}%`,
            "--maxPercent": `${(maxTotalLength / 700) * 100}%`,
          }}
        >
          <div className="dualLengthSliderTrack" />

          <input
            className="dualLengthRange dualLengthRangeMin"
            type="range"
            min="0"
            max="700"
            step="5"
            value={minTotalLength}
            onChange={(event) =>
              setMinTotalLength(
                Math.min(Number(event.target.value), maxTotalLength)
              )
            }
          />

          <input
            className="dualLengthRange dualLengthRangeMax"
            type="range"
            min="0"
            max="700"
            step="5"
            value={maxTotalLength}
            onChange={(event) =>
              setMaxTotalLength(
                Math.max(Number(event.target.value), minTotalLength)
              )
            }
          />
        </div>

        <div className="lengthScale">
          <span>0m</span>
          <span>3.5m</span>
          <span>7m</span>
        </div>
      </div>

      <div className="catalogFilterGroup">
        <div className="filterLabelRow">
          <h3>{t("search.maxClosedLength")}</h3>
          <b>{maxClosed}cm</b>
        </div>
        <input
          type="range"
          min="40"
          max="160"
          value={maxClosed}
          onChange={(event) => setMaxClosed(Number(event.target.value))}
        />
      </div>

      <div className="catalogFilterGroup">
        <div className="filterLabelRow">
          <h3>{t("search.maxRodWeight")}</h3>
          <b>{maxWeight}g</b>
        </div>
        <input
          type="range"
          min="40"
          max="600"
          value={maxWeight}
          onChange={(event) => setMaxWeight(Number(event.target.value))}
        />
      </div>

      <div className="catalogFilterGroup">
        <h3>{t("search.useCase")}</h3>
        <div className="catalogFilterList">
          {useCases.slice(0, 12).map((tag) => (
            <FilterButton
              key={tag}
              active={selectedUseCases.includes(tag)}
              onClick={() =>
                setSelectedUseCases((current) =>
                  toggleArrayValue(current, tag)
                )
              }
            >
              {tag}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="catalogFilterFooter">
        <button type="button" onClick={resetAllFilters}>
          {t("search.resetAllFilters")}
        </button>
      </div>
    </aside>
  );
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { compareIds } = useCompare();
  const { t } = useLocale();

  const initialKeyword = searchParams.get("q") || "";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState([]);
  const [selectedUseCases, setSelectedUseCases] = useState([]);
  const [minTotalLength, setMinTotalLength] = useState(0);
  const [maxTotalLength, setMaxTotalLength] = useState(700);
  const [maxClosed, setMaxClosed] = useState(160);
  const [maxWeight, setMaxWeight] = useState(600);
  const [sortMode, setSortMode] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setKeyword(searchParams.get("q") || "");
  }, [searchParams]);

  function applyKeywordSearch(nextKeyword = keyword) {
    const trimmed = nextKeyword.trim();

    if (trimmed.length > 0) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  }

  function quickSearch(value) {
    setKeyword(value);
    applyKeywordSearch(value);
  }

  function resetAllFilters() {
    setKeyword("");
    setSearchParams({});
    setSelectedBrands([]);
    setSelectedConstruction([]);
    setSelectedUseCases([]);
    setMinTotalLength(0);
    setMaxTotalLength(700);
    setMaxClosed(160);
    setMaxWeight(600);
    setSortMode("relevance");
  }

  const filtered = useMemo(() => {
    const results = rods.filter((rod) => {
      const matchesKeyword = rodMatchesKeyword(rod, keyword);

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(rod.brand);

      const matchesConstruction =
        selectedConstruction.length === 0 ||
        selectedConstruction.includes(rod.construction);

      const matchesUseCase =
        selectedUseCases.length === 0 ||
        selectedUseCases.some((useCase) => (rod.useCases || []).includes(useCase));

      const matchesLength =
        typeof rod.lengthCm === "number" &&
        rod.lengthCm >= minTotalLength &&
        rod.lengthCm <= maxTotalLength;

      const matchesClosed =
        maxClosed === 160 ||
        (typeof rod.closedLengthCm === "number" && rod.closedLengthCm <= maxClosed);

      const matchesWeight =
        maxWeight === 600 ||
        (typeof rod.weightG === "number" && rod.weightG <= maxWeight);

      const matchesSpecs = matchesLength && matchesClosed && matchesWeight;

      return (
        matchesKeyword &&
        matchesBrand &&
        matchesConstruction &&
        matchesUseCase &&
        matchesSpecs
      );
    });

    return [...results].sort((a, b) => {
      if (sortMode === "closedLengthAsc") return sortableNumber(a.closedLengthCm) - sortableNumber(b.closedLengthCm);
      if (sortMode === "weightAsc") return sortableNumber(a.weightG) - sortableNumber(b.weightG);
      if (sortMode === "ratingDesc") return sortableNumber(b.rating) - sortableNumber(a.rating);
      if (sortMode === "lengthAsc") return sortableNumber(a.lengthCm) - sortableNumber(b.lengthCm);
      if (sortMode === "priceAsc") return sortableNumber(a.priceHkdApprox) - sortableNumber(b.priceHkdApprox);

      return 0;
    });
  }, [
    keyword,
    selectedBrands,
    selectedConstruction,
    selectedUseCases,
    minTotalLength,
    maxTotalLength,
    maxClosed,
    maxWeight,
    sortMode,
  ]);

  const activeFilterCount =
    selectedBrands.length +
    selectedConstruction.length +
    selectedUseCases.length +
    (minTotalLength !== 0 ? 1 : 0) +
    (maxTotalLength !== 700 ? 1 : 0) +
    (maxClosed !== 160 ? 1 : 0) +
    (maxWeight !== 600 ? 1 : 0) +
    (keyword.trim() ? 1 : 0);

  const constructionOptions = ["Telescopic", "4-piece", "3-piece", "2-piece", "1-piece", "Multi-piece"];

  const quickCategories = [
    { label: t("search.quick.all"), value: "" },
    { label: t("search.quick.travel"), value: "travel" },
    { label: t("search.quick.telescopic"), value: "telescopic" },
    { label: t("search.quick.shore"), value: "shore" },
    { label: t("search.quick.lightGame"), value: "light game" },
    { label: "Daiwa", value: "daiwa" },
    { label: "Shimano", value: "shimano" },
  ];

  const activeSummary = [
    keyword.trim() ? `${t("search.summary.keyword")}: ${keyword.trim()}` : null,
    selectedBrands.length ? `${selectedBrands.length} ${selectedBrands.length === 1 ? t("search.summary.brand") : t("search.summary.brands")}` : null,
    selectedConstruction.length ? `${selectedConstruction.length} ${selectedConstruction.length === 1 ? t("search.summary.construction") : t("search.summary.constructions")}` : null,
    selectedUseCases.length ? `${selectedUseCases.length} ${selectedUseCases.length === 1 ? t("search.summary.useCase") : t("search.summary.useCases")}` : null,
    minTotalLength !== 0 || maxTotalLength !== 700
      ? `${t("search.summary.length")} ${(minTotalLength / 100).toFixed(2)}m-${(maxTotalLength / 100).toFixed(2)}m`
      : null,
    maxClosed !== 160 ? `${t("search.summary.closed")} ≤ ${maxClosed}cm` : null,
    maxWeight !== 600 ? `${t("search.summary.weight")} ≤ ${maxWeight}g` : null,
  ].filter(Boolean);

  const filterPanelProps = {
    t,
    activeFilterCount,
    brands,
    selectedBrands,
    setSelectedBrands,
    constructionOptions,
    selectedConstruction,
    setSelectedConstruction,
    minTotalLength,
    maxTotalLength,
    setMinTotalLength,
    setMaxTotalLength,
    maxClosed,
    setMaxClosed,
    maxWeight,
    setMaxWeight,
    selectedUseCases,
    setSelectedUseCases,
    resetAllFilters,
  };

  return (
    <main className="catalogSearchPage">
      <PageTitle title={t("search.pageTitle")} description={t("search.pageDescription")} />

      <section className="catalogSearchHero">
        <div className="container catalogSearchHeroInner">
          <div>
            <div className="catalogEyebrow">{t("search.eyebrow")}</div>
            <h1>{t("search.title")}</h1>
            <p>{t("search.description")}</p>
          </div>

          <div className="catalogSearchStats">
            <div>
              <b>{rods.length}</b>
              <span>{t("search.rodRecords")}</span>
            </div>
            <div>
              <b>{brands.length}</b>
              <span>{t("search.brandEntries")}</span>
            </div>
            <div>
              <b>{filtered.length}</b>
              <span>{t("search.currentResults")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="catalogSearchControls">
        <div className="container">
          <div className="catalogSearchBoxLarge">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") applyKeywordSearch();
              }}
              placeholder={t("search.inputPlaceholder")}
            />
            <button onClick={() => applyKeywordSearch()}>{t("search.search")}</button>
            <button className="secondarySearchButton" onClick={resetAllFilters}>{t("search.reset")}</button>
          </div>

          <div className="quickCategoryRail">
            {quickCategories.map((item) => (
              <button
                key={item.label}
                className={
                  normalize(keyword) === normalize(item.value)
                    ? "quickCategory activeQuickCategory"
                    : "quickCategory"
                }
                onClick={() => quickSearch(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mobileFilterSortBar">
            <button
              type="button"
              className="mobileFilterToggleButton"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((current) => !current)}
            >
              <span className="filterToggleIcon" aria-hidden="true">
                {filtersOpen ? "−" : "+"}
              </span>
              <span className="filterToggleText">
                {filtersOpen ? t("search.hideFilters") : t("search.filterSort")}
              </span>
              {activeFilterCount > 0 && (
                <span className="filterCountBadge">{activeFilterCount}</span>
              )}
            </button>

            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
              <option value="relevance">{t("search.sort.relevance")}</option>
              <option value="closedLengthAsc">{t("search.sort.closedLength")}</option>
              <option value="weightAsc">{t("search.sort.weight")}</option>
              <option value="ratingDesc">{t("search.sort.rating")}</option>
              <option value="lengthAsc">{t("search.sort.length")}</option>
              <option value="priceAsc">{t("search.sort.price")}</option>
            </select>
          </div>

          {activeSummary.length > 0 && (
            <div className="activeFilterSummary">
              {activeSummary.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container catalogSearchLayout">
        <div className={filtersOpen ? "mobileFilterPanel mobileFilterPanelOpen" : "mobileFilterPanel"}>
          <FilterPanel {...filterPanelProps} />
        </div>

        <div className="desktopFilterPanel">
          <FilterPanel {...filterPanelProps} />
        </div>

        <section className="catalogResultsArea">
          <div className="catalogResultsToolbar">
            <div>
              <div className="catalogEyebrow">{t("search.results")}</div>
              <h2>
                {filtered.length} {filtered.length === 1 ? t("search.matchingRod") : t("search.matchingRods")}
              </h2>
              {keyword.trim() && (
                <p>
                  {t("search.keyword")}: <b>{keyword.trim()}</b>
                </p>
              )}
            </div>

            <div className="resultsToolbarActions">
              {compareIds.length > 0 && (
                <Link to="/compare">
                  {t("search.compareSelected")} ({compareIds.length})
                </Link>
              )}

              <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
                <option value="relevance">{t("search.sort.label.relevance")}</option>
                <option value="closedLengthAsc">{t("search.sort.label.closedLength")}</option>
                <option value="weightAsc">{t("search.sort.label.weight")}</option>
                <option value="ratingDesc">{t("search.sort.label.rating")}</option>
                <option value="lengthAsc">{t("search.sort.label.length")}</option>
                <option value="priceAsc">{t("search.sort.label.price")}</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="catalogSearchResultsGrid">
              {filtered.map((rod) => (
                <RodCard key={rod.id} rod={rod} />
              ))}
            </div>
          ) : (
            <div className="catalogNoResults">
              <div className="catalogEyebrow">{t("search.noResultsEyebrow")}</div>
              <h2>{t("search.noResultsTitle")}</h2>
              <p>{t("search.noResultsText")}</p>

              <div className="noResultsActions">
                <button onClick={resetAllFilters}>{t("search.resetAllFilters")}</button>
                <Link to="/brands">{t("search.browseBrands")}</Link>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
