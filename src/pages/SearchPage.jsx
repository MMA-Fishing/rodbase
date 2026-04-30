import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pill from "../components/Pill.jsx";
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

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("q") || "";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [minTotalLength, setMinTotalLength] = useState(240);
  const [maxTotalLength, setMaxTotalLength] = useState(300);
  const [maxClosed, setMaxClosed] = useState(70);
  const [maxWeight, setMaxWeight] = useState(180);

  function applyKeywordSearch() {
    const trimmed = keyword.trim();

    if (trimmed.length > 0) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  }

  function clearSearch() {
    setKeyword("");
    setSearchParams({});
  }

  const filtered = useMemo(
    () =>
      rods.filter(
        (rod) =>
          rodMatchesKeyword(rod, keyword) &&
          rod.lengthCm >= minTotalLength &&
          rod.lengthCm <= maxTotalLength &&
          rod.closedLengthCm <= maxClosed &&
          rod.weightG <= maxWeight
      ),
    [keyword, minTotalLength, maxTotalLength, maxClosed, maxWeight]
  );

  return (
    <main className="container page">
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">Advanced search</div>
          <h1>Filter by real rod parameters.</h1>
          <p className="muted wide">
            Search by brand, series, model code, aliases, use case, total length, closed length, weight,
            source confidence, and catalogue information.
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
        <button className="blackButton" onClick={applyKeywordSearch}>Search</button>
        <button className="outlineButton" onClick={clearSearch}>Clear</button>
      </div>

      <div className="searchGrid">
        <aside className="card filters">
          <h2>Filters</h2>

          <div className="filterGroup">
            <label>Brand</label>
            <div className="pillWrap">
              {brands.map((brand, index) => (
                <Pill key={brand.name} active={index < 2}>{brand.name}</Pill>
              ))}
            </div>
          </div>

          <div className="filterGroup">
            <label>Construction</label>
            <div className="pillWrap">
              <Pill active>Telescopic</Pill>
              <Pill active>Multi-piece</Pill>
              <Pill>2-piece</Pill>
              <Pill>1-piece</Pill>
            </div>
          </div>

          <div className="filterGroup">
            <div className="row topRow">
              <label>Total length</label>
              <b>{(minTotalLength / 100).toFixed(2)}m - {(maxTotalLength / 100).toFixed(2)}m</b>
            </div>
            <div className="dualRange">
              <input
                type="range"
                min="100"
                max="500"
                value={minTotalLength}
                onChange={(event) => setMinTotalLength(Math.min(Number(event.target.value), maxTotalLength))}
              />
              <input
                type="range"
                min="100"
                max="500"
                value={maxTotalLength}
                onChange={(event) => setMaxTotalLength(Math.max(Number(event.target.value), minTotalLength))}
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
              {useCases.slice(0, 6).map((tag, index) => (
                <Pill key={tag} active={index === 2 || index === 5}>{tag}</Pill>
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
            <select>
              <option>Sort: shortest closed length</option>
              <option>Sort: lightest</option>
              <option>Sort: highest rated</option>
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
                Try a broader keyword, increase the total length range, increase max closed length,
                or clear the search.
              </p>
              <div className="buttonRow">
                <button className="blackButton" onClick={clearSearch}>Clear search</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
