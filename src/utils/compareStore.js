const COMPARE_KEY = "rodbase.compareIds.v2";
const COMPARE_EVENT = "rodbase-compare-updated";

export const MAX_COMPARE_RODS = 4;

function normalizeIds(ids) {
  if (!Array.isArray(ids)) return [];

  return [...new Set(ids)]
    .filter((id) => typeof id === "string" && id.trim().length > 0)
    .slice(0, MAX_COMPARE_RODS);
}

export function readCompareIds() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(COMPARE_KEY);
    return normalizeIds(JSON.parse(raw || "[]"));
  } catch {
    return [];
  }
}

export function writeCompareIds(ids) {
  if (typeof window === "undefined") return [];

  const nextIds = normalizeIds(ids);
  window.localStorage.setItem(COMPARE_KEY, JSON.stringify(nextIds));
  window.dispatchEvent(new CustomEvent(COMPARE_EVENT, { detail: nextIds }));

  return nextIds;
}

export function listenCompareChanges(callback) {
  if (typeof window === "undefined") return () => {};

  const handler = () => callback(readCompareIds());

  window.addEventListener(COMPARE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(COMPARE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
