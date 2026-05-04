function getDefaultNotListedText() {
  if (typeof document !== "undefined" && document.documentElement.lang === "zh-Hant") {
    return "未列明";
  }

  if (typeof window !== "undefined" && window.localStorage.getItem("rodbase.locale") === "zh-Hant") {
    return "未列明";
  }

  return "Not listed";
}

function notListedText(fallback) {
  return fallback || getDefaultNotListedText();
}

export function formatLengthM(lengthCm, fallback) {
  if (lengthCm == null) return notListedText(fallback);
  return `${(lengthCm / 100).toFixed(2)}m`;
}

export function formatLengthCm(lengthCm, fallback) {
  if (lengthCm == null) return notListedText(fallback);
  return `${lengthCm}cm`;
}

export function formatWeightG(weightG, fallback) {
  if (weightG == null) return notListedText(fallback);
  return `${weightG}g`;
}

export function formatLureRange(rod, fallback) {
  if (rod.minLureG == null || rod.maxLureG == null) return notListedText(fallback);
  return `${rod.minLureG}-${rod.maxLureG}g`;
}

export function formatPeRange(rod, fallback) {
  if (rod.minPe == null || rod.maxPe == null) return notListedText(fallback);
  return `PE ${rod.minPe}-${rod.maxPe}`;
}

export function formatPriceHkd(rod, fallback) {
  if (rod.priceHkdApprox == null) return notListedText(fallback);
  return `~HKD ${rod.priceHkdApprox}`;
}

export function formatMarketRegions(rod, fallback) {
  if (!rod.marketRegions || rod.marketRegions.length === 0) return notListedText(fallback);
  return rod.marketRegions.join(" / ");
}

export function valueOrUnknown(value, fallback) {
  if (value === null || value === undefined || value === "") return notListedText(fallback);
  return value;
}

export function valueOrNotListed(value, fallback) {
  if (value === null || value === undefined || value === "") return notListedText(fallback);
  return value;
}

export function brandToId(brandName) {
  return String(brandName || "").toLowerCase().replaceAll(" ", "-");
}

export function makeSeriesId(brandName, seriesName) {
  return `${brandToId(brandName)}-${String(seriesName || "")
    .toLowerCase()
    .replaceAll(" ", "-")}`;
}
