import { useMemo, useState } from "react";
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
      className={active ? "filterPill filterPillActive" : "filterPill"}
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
  const [minTotalLength, setMinTotalLength] = useState(100);
  const [maxTotalLength, setMaxTotalLength] = useState(500);
  const [maxClosed, setMaxClosed] = useState(120);
  const [maxWeight, setMaxWeight] = useState(400);
  const [sortMode, setSortMode] = useState("relevance");

  function applyKeywordSearch() {
    const trimmed = keyword.trim();

    if (trimmed.length > 0) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  }

  function resetAllFilters() {
    setKeyword("");
    setSearchParams({});
    setSelectedBrands([]);
    setSelectedConstruction([]);
    setSelectedUseCases([]);
    setMinTotalLength(100);
    setMaxTotalLength(500);
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
    (minTotalLength !== 100 ? 1 : 0) +
    (maxTotalLength !== 500 ? 1 : 0) +
    (maxClosed !== 120 ? 1 : 0) +
    (maxWeight !== 400 ? 1 : 0) +
    (keyword.trim() ? 1 : 0);

  const constructionOptions = ["Telescopic", "4-piece", "2-piece", "1-piece"];

  return (
    <main className="container page">
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">Advanced search</div>
          <h1>Filter by real rod parameters.</h1>
          <p className="muted wide">
            Search by brand, series, model code, aliases, use case, total length, closed length,
            weight, construction, and structured rod data.
          </p>
        </div>
        <button className="blackButton">Save search</button>
      </div>

      <div className="searchPageBox">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") applyKeywordSearch();
          }}
          placeholder="Search by rod name, brand, series, model code, use case..."
        />
        <button className="blackButton" onClick={applyKeywordSearch}>
          Search
        </button>
        <button className="outlineButton" onClick={resetAllFilters}>
          Reset
        </button>
      </div>

      <div className="searchGrid">
        <aside className="card filters">
          <div className="row topRow">
            <h2>Filters</h2>
            <span className="filterCount">{activeFilterCount} active</span>
          </div>

          <div className="filterGroup">
            <label>Brand</label>
            <div className="pillWrap">
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

          <div className="filterGroup">
            <label>Construction</label>
            <div className="pillWrap">
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

          <div className="filterGroup">
            <div className="row topRow">
              <label>Total length</label>
              <b>
                {(minTotalLength / 100).toFixed(2)}m -{" "}
                {(maxTotalLength / 100).toFixed(2)}m
              </b>
            </div>
            <div className="dualRange">
              <input
                type="range"
                min="100"
                max="500"
                value={minTotalLength}
                onChange={(event) =>
                  setMinTotalLength(
                    Math.min(Number(event.target.value), maxTotalLength)
                  )
                }
              />
              <input
                type="range"
                min="100"
                max="500"
                value={maxTotalLength}
                onChange={(event) =>
                  setMaxTotalLength(
                    Math.max(Number(event.target.value), minTotalLength)
                  )
                }
              />
            </div>
            <div className="rangeHint">Filter rods by full extended rod length.</div>
          </div>

          <div className="filterGroup">
            <div className="row topRow">
              <label>Max closed length</label>
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

          <div className="filterGroup">
            <div className="row topRow">
              <label>Max rod weight</label>
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

          <div className="filterGroup">
            <label>Use case</label>
            <div className="pillWrap">
              {useCases.slice(0, 8).map((tag) => (
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

        <section>
          <div className="row topRow resultsBar">
            <p className="muted">
              Showing {filtered.length} matching rod{filtered.length === 1 ? "" : "s"}
              {keyword.trim() ? ` for "${keyword.trim()}"` : ""}
            </p>

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
            <div className="rodGrid twoCols">
              {filtered.map((rod) => (
                <RodCard key={rod.id} rod={rod} />
              ))}
            </div>
          ) : (
            <div className="card">
              <div className="eyebrow">No results</div>
              <h2>No matching rods found.</h2>
              <p className="note">
                Try a broader keyword, remove brand/use-case filters, increase the total length range,
                increase max closed length, or reset the search.
              </p>
              <div className="buttonRow">
                <button className="blackButton" onClick={resetAllFilters}>
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
