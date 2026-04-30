import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RodCard from "../components/RodCard.jsx";
import { brands } from "../data/brands.js";
import { rods } from "../data/rods.js";
import { useCases } from "../data/useCases.js";

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

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("q") || "";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState([]);
  const [selectedUseCases, setSelectedUseCases] = useState([]);

  // Total length range: 0m to 7m, stored in cm.
  const [minTotalLength, setMinTotalLength] = useState(0);
  const [maxTotalLength, setMaxTotalLength] = useState(700);

  const [maxClosed, setMaxClosed] = useState(120);
  const [maxWeight, setMaxWeight] = useState(400);
  const [sortMode, setSortMode] = useState("relevance");

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
    setMaxClosed(120);
    setMaxWeight(400);
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
        selectedUseCases.some((useCase) => rod.useCases.includes(useCase));

      const matchesSpecs =
        rod.lengthCm >= minTotalLength &&
        rod.lengthCm <= maxTotalLength &&
        rod.closedLengthCm <= maxClosed &&
        rod.weightG <= maxWeight;

      return (
        matchesKeyword &&
        matchesBrand &&
        matchesConstruction &&
        matchesUseCase &&
        matchesSpecs
      );
    });

    return [...results].sort((a, b) => {
      if (sortMode === "closedLengthAsc") return a.closedLengthCm - b.closedLengthCm;
      if (sortMode === "weightAsc") return a.weightG - b.weightG;
      if (sortMode === "ratingDesc") return b.rating - a.rating;
      if (sortMode === "lengthAsc") return a.lengthCm - b.lengthCm;
      if (sortMode === "priceAsc") return a.priceHkdApprox - b.priceHkdApprox;

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
    (maxClosed !== 120 ? 1 : 0) +
    (maxWeight !== 400 ? 1 : 0) +
    (keyword.trim() ? 1 : 0);

  const constructionOptions = ["Telescopic", "4-piece", "2-piece", "1-piece"];

  const quickCategories = [
    { label: "All rods", value: "" },
    { label: "Travel / Mobile", value: "travel" },
    { label: "Telescopic", value: "telescopic" },
    { label: "Shore", value: "shore" },
    { label: "Light Game", value: "light game" },
    { label: "Daiwa", value: "daiwa" },
    { label: "Shimano", value: "shimano" },
  ];

  return (
    <main className="catalogSearchPage">
      <section className="catalogSearchHero">
        <div className="container catalogSearchHeroInner">
          <div>
            <div className="catalogEyebrow">Rod finder</div>
            <h1>Search fishing rods by specs.</h1>
            <p>
              Filter indexed rods by brand, series, model code, length, closed length,
              construction, use case, source confidence, and catalogue data.
            </p>
          </div>

          <div className="catalogSearchStats">
            <div>
              <b>{rods.length}</b>
              <span>Demo rod records</span>
            </div>
            <div>
              <b>{brands.length}</b>
              <span>Brand entries</span>
            </div>
            <div>
              <b>{filtered.length}</b>
              <span>Current results</span>
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
              placeholder="Search brand, series, model code, alias, use case..."
            />
            <button onClick={() => applyKeywordSearch()}>Search</button>
            <button className="secondarySearchButton" onClick={resetAllFilters}>
              Reset
            </button>
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
        </div>
      </section>

      <section className="container catalogSearchLayout">
        <aside className="catalogFilterSidebar">
          <div className="catalogFilterHeader">
            <h2>Filters</h2>
            <span>{activeFilterCount} active</span>
          </div>

          <div className="catalogFilterGroup">
            <h3>Brand</h3>
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
            <h3>Construction</h3>
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
              <h3>Total length</h3>
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
              <h3>Max closed length</h3>
              <b>{maxClosed}cm</b>
            </div>
            <input
              type="range"
              min="40"
              max="120"
              value={maxClosed}
              onChange={(event) => setMaxClosed(Number(event.target.value))}
            />
          </div>

          <div className="catalogFilterGroup">
            <div className="filterLabelRow">
              <h3>Max rod weight</h3>
              <b>{maxWeight}g</b>
            </div>
            <input
              type="range"
              min="80"
              max="400"
              value={maxWeight}
              onChange={(event) => setMaxWeight(Number(event.target.value))}
            />
          </div>

          <div className="catalogFilterGroup">
            <h3>Use case</h3>
            <div className="catalogFilterList">
              {useCases.slice(0, 10).map((tag) => (
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
        </aside>

        <section className="catalogResultsArea">
          <div className="catalogResultsToolbar">
            <div>
              <div className="catalogEyebrow">Results</div>
              <h2>
                {filtered.length} matching rod{filtered.length === 1 ? "" : "s"}
              </h2>
              {keyword.trim() && (
                <p>
                  Keyword: <b>{keyword.trim()}</b>
                </p>
              )}
            </div>

            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
              <option value="relevance">Sort: relevance</option>
              <option value="closedLengthAsc">Sort: shortest closed length</option>
              <option value="weightAsc">Sort: lightest</option>
              <option value="ratingDesc">Sort: highest rated</option>
              <option value="lengthAsc">Sort: shortest total length</option>
              <option value="priceAsc">Sort: lowest price</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="catalogSearchResultsGrid">
              {filtered.map((rod) => (
                <RodCard key={rod.id} rod={rod} />
              ))}
            </div>
          ) : (
            <div className="catalogNoResults">
              <div className="catalogEyebrow">No results</div>
              <h2>No matching rods found.</h2>
              <p>
                Try a broader keyword, remove brand/use-case filters, increase the length range,
                or reset all filters.
              </p>
              <button onClick={resetAllFilters}>Reset filters</button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}