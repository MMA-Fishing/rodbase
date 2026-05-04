export function formatLengthM(lengthCm) {
  if (lengthCm == null) return "Unknown";
  return `${(lengthCm / 100).toFixed(2)}m`;
}

export function formatLengthCm(lengthCm) {
  if (lengthCm == null) return "Unknown";
  return `${lengthCm}cm`;
}

export function formatWeightG(weightG) {
  if (weightG == null) return "Unknown";
  return `${weightG}g`;
}

export function formatLureRange(rod) {
  if (rod.minLureG == null || rod.maxLureG == null) return "Unknown";
  return `${rod.minLureG}-${rod.maxLureG}g`;
}

export function formatPeRange(rod) {
  if (rod.minPe == null || rod.maxPe == null) return "Unknown";
  return `PE ${rod.minPe}-${rod.maxPe}`;
}

export function formatPriceHkd(rod) {
  if (rod.priceHkdApprox == null) return "Unknown";
  return `~HKD ${rod.priceHkdApprox}`;
}

export function formatMarketRegions(rod) {
  if (!rod.marketRegions || rod.marketRegions.length === 0) return "Unknown";
  return rod.marketRegions.join(" / ");
}

export function valueOrUnknown(value) {
  if (value === null || value === undefined || value === "") return "Unknown";
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
