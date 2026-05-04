import { brands } from "../src/data/brands.js";
import { series } from "../src/data/series.js";
import { rods } from "../src/data/rods.js";

let errorCount = 0;
let warningCount = 0;

function error(message) {
  errorCount += 1;
  console.error(`ERROR: ${message}`);
}

function warning(message) {
  warningCount += 1;
  console.warn(`WARNING: ${message}`);
}

function hasDuplicate(values) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

function checkNoDuplicateIds(label, records) {
  const ids = records.map((item) => item.id).filter(Boolean);
  const duplicates = [...new Set(hasDuplicate(ids))];

  duplicates.forEach((id) => {
    error(`${label} has duplicate id: ${id}`);
  });
}

function checkNoConfidenceFields(label, records) {
  records.forEach((item) => {
    if ("confidence" in item) {
      error(`${label} "${item.id || item.name}" still has confidence field.`);
    }

    if ("sourceConfidence" in item) {
      error(`${label} "${item.id || item.name}" still has sourceConfidence field.`);
    }
  });
}

function checkRequiredString(record, key, label) {
  if (!record[key] || typeof record[key] !== "string") {
    error(`${label} is missing required string field: ${key}`);
  }
}

function checkRequiredNumber(record, key, label) {
  if (typeof record[key] !== "number" || Number.isNaN(record[key])) {
    error(`${label} is missing required numeric field: ${key}`);
  }
}

function checkArray(record, key, label) {
  if (!Array.isArray(record[key])) {
    error(`${label} field "${key}" should be an array.`);
  }
}

function checkRange(record, minKey, maxKey, label) {
  const min = record[minKey];
  const max = record[maxKey];

  if (min == null || max == null) return;

  if (typeof min !== "number" || typeof max !== "number") {
    error(`${label} has invalid range fields: ${minKey}/${maxKey}`);
    return;
  }

  if (min > max) {
    error(`${label} has ${minKey} greater than ${maxKey}.`);
  }
}

const brandNames = new Set(brands.map((brand) => brand.name));
const seriesKeys = new Set(series.map((item) => `${item.brand}:::${item.name}`));
const rodIds = new Set(rods.map((rod) => rod.id));

checkNoDuplicateIds("Brand", brands);
checkNoDuplicateIds("Series", series);
checkNoDuplicateIds("Rod", rods);

checkNoConfidenceFields("Brand", brands);
checkNoConfidenceFields("Series", series);
checkNoConfidenceFields("Rod", rods);

brands.forEach((brand) => {
  const label = `Brand "${brand.name || brand.id || "unknown"}"`;

  checkRequiredString(brand, "id", label);
  checkRequiredString(brand, "name", label);
  checkArray(brand, "series", label);

  if (brand.officialSites !== undefined) {
    checkArray(brand, "officialSites", label);

    (brand.officialSites || []).forEach((site, index) => {
      if (!site.region || !site.label || !site.url) {
        warning(`${label} officialSites[${index}] should include region, label, and url.`);
      }
    });
  }
});

series.forEach((item) => {
  const label = `Series "${item.id || item.name || "unknown"}"`;

  checkRequiredString(item, "id", label);
  checkRequiredString(item, "brand", label);
  checkRequiredString(item, "name", label);
  checkRequiredString(item, "displayName", label);

  if (!brandNames.has(item.brand)) {
    error(`${label} references missing brand: ${item.brand}`);
  }

  checkArray(item, "marketRegions", label);
  checkArray(item, "useCases", label);
  checkArray(item, "featuredRodIds", label);

  (item.featuredRodIds || []).forEach((rodId) => {
    if (!rodIds.has(rodId)) {
      warning(`${label} references featured rod that does not exist yet: ${rodId}`);
    }
  });
});

rods.forEach((rod) => {
  const label = `Rod "${rod.id || rod.displayName || "unknown"}"`;

  checkRequiredString(rod, "id", label);
  checkRequiredString(rod, "brand", label);
  checkRequiredString(rod, "series", label);
  checkRequiredString(rod, "model", label);
  checkRequiredString(rod, "displayName", label);
  checkRequiredString(rod, "catalogueStatus", label);
  checkRequiredString(rod, "rodType", label);
  checkRequiredString(rod, "reelType", label);
  checkRequiredString(rod, "construction", label);

  checkRequiredNumber(rod, "lengthCm", label);
  checkRequiredNumber(rod, "closedLengthCm", label);
  checkRequiredNumber(rod, "weightG", label);
  checkRequiredNumber(rod, "sections", label);

  checkArray(rod, "marketRegions", label);
  checkArray(rod, "aliases", label);
  checkArray(rod, "useCases", label);
  checkArray(rod, "sourceRecords", label);

  if (!brandNames.has(rod.brand)) {
    error(`${label} references missing brand: ${rod.brand}`);
  }

  if (!seriesKeys.has(`${rod.brand}:::${rod.series}`)) {
    warning(`${label} references series not listed in series.js: ${rod.brand} / ${rod.series}`);
  }

  checkRange(rod, "minLureG", "maxLureG", label);
  checkRange(rod, "minPe", "maxPe", label);
  checkRange(rod, "minLineLb", "maxLineLb", label);
  checkRange(rod, "minSinkerG", "maxSinkerG", label);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rod.id)) {
    warning(`${label} id should be URL-safe lowercase kebab-case.`);
  }
});

console.log("");
console.log("RodBase data check complete.");
console.log(`Errors: ${errorCount}`);
console.log(`Warnings: ${warningCount}`);

if (errorCount > 0) {
  process.exit(1);
}

