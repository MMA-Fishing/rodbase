import fs from "node:fs";
import { rods } from "../src/data/rods.js";
import { series } from "../src/data/series.js";
import { brands } from "../src/data/brands.js";

const today = "2026-05-04";

const officialSource = {
  sourceType: "Official brand page",
  label: "Shimano Japan - Lurematic MB product page",
  url: "https://fish.shimano.com/ja-JP/product/rod/shoresalt/other/a075f00003e2htjqay.html",
  lastChecked: today,
  note: "Official Shimano product page and specification table.",
};

const shimanoLurematicRods = [
  {
    id: "shimano-lurematic-mobile-s70ul-3",
    brand: "Shimano",
    series: "Lurematic Mobile",
    model: "S70UL-3",
    variant: "S70UL-3",
    displayName: "Shimano Lurematic Mobile S70UL-3",
    generation: "Current / Recent",
    catalogueStatus: "Current",
    marketRegions: ["Japan", "Asia"],

    officialName: "Shimano Lurematic MB S70UL-3",
    japaneseName: "シマノ ルアーマチック MB S70UL-3",
    chineseName: "",
    aliases: ["Lurematic MB S70UL-3", "Lurematic Mobile S70UL-3", "ルアーマチック MB S70UL-3"],
    modelCode: "398864",
    janCode: "4969363398864",

    rodType: "Mobile spinning rod",
    reelType: "Spinning",
    construction: "3-piece",

    lengthCm: 213,
    closedLengthCm: 74.8,
    weightG: 80,
    sections: 3,

    minLureG: 0.8,
    maxLureG: 10,
    minPe: 0.2,
    maxPe: 0.8,
    minLineLb: 2,
    maxLineLb: 5,

    power: "Ultra Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: 87.2,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Light Game", "Ajing", "Trout", "Bass"],
    rating: 4.1,
    sourceRecords: [officialSource],
    editorNote: "Short, light mobile model for mebaru, aji, trout, bass, and light lure work where control matters more than distance.",
  },
  {
    id: "shimano-lurematic-mobile-s76ul-4",
    brand: "Shimano",
    series: "Lurematic Mobile",
    model: "S76UL-4",
    variant: "S76UL-4",
    displayName: "Shimano Lurematic Mobile S76UL-4",
    generation: "Current / Recent",
    catalogueStatus: "Current",
    marketRegions: ["Japan", "Asia"],

    officialName: "Shimano Lurematic MB S76UL-4",
    japaneseName: "シマノ ルアーマチック MB S76UL-4",
    chineseName: "",
    aliases: ["Lurematic MB S76UL-4", "Lurematic Mobile S76UL-4", "ルアーマチック MB S76UL-4"],
    modelCode: "398871",
    janCode: "4969363398871",

    rodType: "Mobile spinning rod",
    reelType: "Spinning",
    construction: "4-piece",

    lengthCm: 229,
    closedLengthCm: 62.4,
    weightG: 91,
    sections: 4,

    minLureG: 0.8,
    maxLureG: 10,
    minPe: 0.2,
    maxPe: 0.8,
    minLineLb: 2,
    maxLineLb: 5,

    power: "Ultra Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: 87.6,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Light Game", "Ajing", "Trout", "Bass"],
    rating: 4.2,
    sourceRecords: [officialSource],
    editorNote: "Longer ultra-light mobile option for light lure fishing with better reach than the S70UL-3.",
  },
  {
    id: "shimano-lurematic-mobile-s80l-4",
    brand: "Shimano",
    series: "Lurematic Mobile",
    model: "S80L-4",
    variant: "S80L-4",
    displayName: "Shimano Lurematic Mobile S80L-4",
    generation: "Current / Recent",
    catalogueStatus: "Current",
    marketRegions: ["Japan", "Asia"],

    officialName: "Shimano Lurematic MB S80L-4",
    japaneseName: "シマノ ルアーマチック MB S80L-4",
    chineseName: "",
    aliases: ["Lurematic MB S80L-4", "Lurematic Mobile S80L-4", "ルアーマチック MB S80L-4"],
    modelCode: "398888",
    janCode: "4969363398888",

    rodType: "Mobile spinning rod",
    reelType: "Spinning",
    construction: "4-piece",

    lengthCm: 244,
    closedLengthCm: 66.2,
    weightG: 128,
    sections: 4,

    minLureG: 5,
    maxLureG: 25,
    minPe: 0.4,
    maxPe: 1.2,
    minLineLb: 3,
    maxLineLb: 10,

    power: "Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: 92.9,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Shore", "Seabass", "Eging", "Rockfish"],
    rating: 4.3,
    sourceRecords: [officialSource],
    editorNote: "Light-power mobile model suited to technical salt lure work such as seabass, tachiuo, eging, and rockfish.",
  },
  {
    id: "shimano-lurematic-mobile-s86ml",
    brand: "Shimano",
    series: "Lurematic Mobile",
    model: "S86ML-4",
    variant: "S86ML-4",
    displayName: "Shimano Lurematic Mobile S86ML-4",
    generation: "Current / Recent",
    catalogueStatus: "Current",
    marketRegions: ["Japan", "Asia"],

    officialName: "Shimano Lurematic MB S86ML-4",
    japaneseName: "シマノ ルアーマチック MB S86ML-4",
    chineseName: "",
    aliases: ["Lurematic MB S86ML-4", "Lurematic Mobile S86ML-4", "ルアーマチック MB S86ML-4"],
    modelCode: "398895",
    janCode: "4969363398895",

    rodType: "Mobile spinning rod",
    reelType: "Spinning",
    construction: "4-piece",

    lengthCm: 259,
    closedLengthCm: 69.9,
    weightG: 143,
    sections: 4,

    minLureG: 6,
    maxLureG: 32,
    minPe: 0.6,
    maxPe: 1.5,
    minLineLb: 4,
    maxLineLb: 12,

    power: "Medium Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: 92.5,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Lure fishing", "Shore", "Seabass", "Eging", "Light shore jigging"],
    rating: 4.4,
    sourceRecords: [officialSource],
    editorNote: "Balanced 8'6 mobile model for seabass, eging, tachiuo, rockfish, and light shore jigging.",
  },
  {
    id: "shimano-lurematic-mobile-s90ml-4",
    brand: "Shimano",
    series: "Lurematic Mobile",
    model: "S90ML-4",
    variant: "S90ML-4",
    displayName: "Shimano Lurematic Mobile S90ML-4",
    generation: "Current / Recent",
    catalogueStatus: "Current",
    marketRegions: ["Japan", "Asia"],

    officialName: "Shimano Lurematic MB S90ML-4",
    japaneseName: "シマノ ルアーマチック MB S90ML-4",
    chineseName: "",
    aliases: ["Lurematic MB S90ML-4", "Lurematic Mobile S90ML-4", "ルアーマチック MB S90ML-4"],
    modelCode: "398901",
    janCode: "4969363398901",

    rodType: "Mobile spinning rod",
    reelType: "Spinning",
    construction: "4-piece",

    lengthCm: 274,
    closedLengthCm: 73.7,
    weightG: 152,
    sections: 4,

    minLureG: 6,
    maxLureG: 32,
    minPe: 0.6,
    maxPe: 1.5,
    minLineLb: 4,
    maxLineLb: 12,

    power: "Medium Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: 94,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Shore", "Seabass", "Rockfish", "Light shore jigging"],
    rating: 4.3,
    sourceRecords: [officialSource],
    editorNote: "Longer ML mobile model for distance-oriented shore lure fishing.",
  },
  {
    id: "shimano-lurematic-mobile-s96m-4",
    brand: "Shimano",
    series: "Lurematic Mobile",
    model: "S96M-4",
    variant: "S96M-4",
    displayName: "Shimano Lurematic Mobile S96M-4",
    generation: "Current / Recent",
    catalogueStatus: "Current",
    marketRegions: ["Japan", "Asia"],

    officialName: "Shimano Lurematic MB S96M-4",
    japaneseName: "シマノ ルアーマチック MB S96M-4",
    chineseName: "",
    aliases: ["Lurematic MB S96M-4", "Lurematic Mobile S96M-4", "ルアーマチック MB S96M-4"],
    modelCode: "398918",
    janCode: "4969363398918",

    rodType: "Mobile spinning rod",
    reelType: "Spinning",
    construction: "4-piece",

    lengthCm: 290,
    closedLengthCm: 77.8,
    weightG: 166,
    sections: 4,

    minLureG: 8,
    maxLureG: 45,
    minPe: 0.8,
    maxPe: 2,
    minLineLb: 6,
    maxLineLb: 16,

    power: "Medium",
    action: "Unknown",
    tipType: "",
    carbonPercent: 93.5,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Shore", "Surf", "Seabass", "Light shore jigging"],
    rating: 4.3,
    sourceRecords: [officialSource],
    editorNote: "Longest and strongest Lurematic Mobile model in this set, useful for surf, seabass, and light shore jigging where distance matters.",
  },
];

function upsertById(existing, incoming) {
  const incomingIds = new Set(incoming.map((item) => item.id));
  return [
    ...existing.filter((item) => !incomingIds.has(item.id)),
    ...incoming,
  ];
}

const updatedRods = upsertById(rods, shimanoLurematicRods);

const updatedSeries = upsertById(series, [
  {
    id: "shimano-lurematic-mobile",
    brand: "Shimano",
    name: "Lurematic Mobile",
    displayName: "Shimano Lurematic Mobile",
    officialName: "Lurematic MB",
    catalogueStatus: "Current",
    marketRegions: ["Japan", "Asia"],
    description:
      "Entry mobile lure rod series with compact closed lengths and coverage from light game to seabass, eging, rockfish, surf, and light shore jigging.",
    useCases: ["Travel", "Mobile rod", "Lure fishing", "Shore", "Light Game", "Seabass", "Eging", "Rockfish"],
    featuredRodIds: shimanoLurematicRods.map((rod) => rod.id),
    variantsCount: shimanoLurematicRods.length,
    currentCount: shimanoLurematicRods.length,
    archivedCount: 0,
    sourceRecords: [officialSource],
  },
]);

const updatedBrands = brands.map((brand) => {
  if (brand.name !== "Shimano") return brand;

  const nextSeries = [...new Set([...(brand.series || []), "Lurematic Mobile"])];

  return {
    ...brand,
    series: nextSeries,
  };
});

function writeExport(path, name, value) {
  const output = `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;
  fs.writeFileSync(path, output, "utf8");
}

writeExport("./src/data/rods.js", "rods", updatedRods);
writeExport("./src/data/series.js", "series", updatedSeries);
writeExport("./src/data/brands.js", "brands", updatedBrands);

console.log("Shimano Lurematic Mobile series upsert complete.");
console.log(`Rods added/updated: ${shimanoLurematicRods.length}`);
