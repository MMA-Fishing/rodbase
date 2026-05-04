import fs from "node:fs";
import { rods } from "../src/data/rods.js";
import { series } from "../src/data/series.js";
import { brands } from "../src/data/brands.js";

const today = "2026-05-04";

const officialSource = {
  sourceType: "Official product page",
  label: "Major Craft Europe - Solpara Shore Jigging",
  url: "https://www.majorcrafteurope.com/product/solpara-shore-jigging/",
  lastChecked: today,
  note: "Official Major Craft Europe product page and technical details table.",
};

function rod({
  id,
  model,
  lengthCm,
  lureMin,
  lureMax,
  peMin,
  peMax,
  weightG,
  power,
  action = "Regular Fast",
  construction = "Unknown",
  useCases = [],
  barcode = "",
  editorNote = "",
}) {
  return {
    id,
    brand: "Major Craft",
    series: "Solpara Shore Jigging",
    model,
    variant: model,
    displayName: `Major Craft Solpara Shore Jigging ${model}`,
    generation: "Solpara",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Europe", "Global"],

    officialName: `SOLPARA SHORE JIGGING ${model}`,
    japaneseName: "",
    chineseName: "",
    aliases: [`Solpara ${model}`, `Major Craft ${model}`],
    modelCode: model,
    janCode: barcode,

    rodType: construction === "Telescopic" ? "Telescopic shore jigging rod" : "Shore jigging spinning rod",
    reelType: "Spinning",
    construction,

    lengthCm,
    closedLengthCm: null,
    weightG,
    sections: null,

    minLureG: lureMin,
    maxLureG: lureMax,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: peMin,
    maxPe: peMax,
    minLineLb: null,
    maxLineLb: null,

    power,
    action,
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Shore", "Shore jigging", "Saltwater", ...useCases],
    rating: 4.1,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote,
  };
}

const majorCraftSolparaShoreJiggingRods = [
  rod({
    id: "major-craft-solpara-shore-jigging-spx-902ssj",
    model: "SPX-902SSJ",
    lengthCm: 274.3,
    lureMin: 5,
    lureMax: 30,
    peMin: 0.4,
    peMax: 1.2,
    weightG: 178,
    power: "Super Light",
    barcode: "4573236271415",
    useCases: ["Super light shore jigging"],
    editorNote: "Lightest listed SPX shore jigging model, suitable for smaller metal jigs and lighter shore work.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spx-942ssj",
    model: "SPX-942SSJ",
    lengthCm: 284.5,
    lureMin: 15,
    lureMax: 40,
    peMin: 0.6,
    peMax: 1.5,
    weightG: 195,
    power: "Super Light",
    barcode: "4573236271422",
    useCases: ["Super light shore jigging"],
    editorNote: "Longer SSJ model with more casting reach than the SPX-902SSJ.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spx-902lsj",
    model: "SPX-902LSJ",
    lengthCm: 274.3,
    lureMin: 20,
    lureMax: 60,
    peMin: 1.0,
    peMax: 2.5,
    weightG: 211,
    power: "Light Shore Jigging",
    barcode: "4573236271439",
    useCases: ["Light shore jigging"],
    editorNote: "9ft light shore jigging model rated around 40±20g.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spx-962lsj",
    model: "SPX-962LSJ",
    lengthCm: 289.6,
    lureMin: 20,
    lureMax: 60,
    peMin: 1.0,
    peMax: 2.5,
    weightG: 218,
    power: "Light Shore Jigging",
    barcode: "4573236271446",
    useCases: ["Light shore jigging"],
    editorNote: "Longer LSJ model for extra casting reach from shore.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spx-1002lsj",
    model: "SPX-1002LSJ",
    lengthCm: 304.8,
    lureMin: 20,
    lureMax: 60,
    peMin: 1.0,
    peMax: 2.5,
    weightG: 232,
    power: "Light Shore Jigging",
    barcode: "4573236271453",
    useCases: ["Light shore jigging", "Distance casting"],
    editorNote: "10ft LSJ model for users prioritising casting distance.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spx-1002mh",
    model: "SPX-1002MH",
    lengthCm: 304.8,
    lureMin: 40,
    lureMax: 80,
    peMin: 1.0,
    peMax: 3.0,
    weightG: 273,
    power: "Medium Heavy",
    barcode: "4573236271477",
    useCases: ["Shore jigging", "Distance casting"],
    editorNote: "10ft medium-heavy model for heavier shore jigging applications.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spx-962mh",
    model: "SPX-962MH",
    lengthCm: 289.6,
    lureMin: 40,
    lureMax: 80,
    peMin: 1.0,
    peMax: 3.0,
    weightG: 257,
    power: "Medium Heavy",
    barcode: "4573236271460",
    useCases: ["Shore jigging"],
    editorNote: "Medium-heavy 9'6 class shore jigging rod.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spx-962h",
    model: "SPX-962H",
    lengthCm: 289.6,
    lureMin: 60,
    lureMax: 100,
    peMin: 1.5,
    peMax: 3.5,
    weightG: 278,
    power: "Heavy",
    barcode: "4573236271484",
    useCases: ["Heavy shore jigging"],
    editorNote: "Heavy SPX model for stronger shore jigging work.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spx-1002h",
    model: "SPX-1002H",
    lengthCm: 304.8,
    lureMin: 60,
    lureMax: 100,
    peMin: 1.5,
    peMax: 3.5,
    weightG: 290,
    power: "Heavy",
    barcode: "4573236271491",
    useCases: ["Heavy shore jigging", "Distance casting"],
    editorNote: "10ft heavy model for distance-oriented heavier shore jigging.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spxt-90m",
    model: "SPXT-90M",
    lengthCm: 274.3,
    lureMin: 7,
    lureMax: 35,
    peMin: 0.6,
    peMax: 1.5,
    weightG: 150,
    power: "Medium",
    action: "Regular",
    construction: "Telescopic",
    barcode: "4573236272085",
    useCases: ["Telescopic", "Travel", "Shore"],
    editorNote: "Telescopic Solpara shore model for users prioritising portability.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spxt-94ssj",
    model: "SPXT-94SSJ",
    lengthCm: 284.5,
    lureMin: 15,
    lureMax: 40,
    peMin: 0.6,
    peMax: 1.5,
    weightG: 170,
    power: "Super Light",
    construction: "Telescopic",
    barcode: "4573236272092",
    useCases: ["Telescopic", "Travel", "Super light shore jigging"],
    editorNote: "Telescopic SSJ model with travel-friendly construction.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spxt-96lsj",
    model: "SPXT-96LSJ",
    lengthCm: 289.6,
    lureMin: 15,
    lureMax: 50,
    peMin: 1.0,
    peMax: 2.5,
    weightG: 200,
    power: "Light Shore Jigging",
    construction: "Telescopic",
    barcode: "4573236272078",
    useCases: ["Telescopic", "Travel", "Light shore jigging"],
    editorNote: "Telescopic LSJ model with shore jigging rating in a portable format.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spxt-100lsj",
    model: "SPXT-100LSJ",
    lengthCm: 304.8,
    lureMin: 15,
    lureMax: 50,
    peMin: 1.0,
    peMax: 2.5,
    weightG: 205,
    power: "Light Shore Jigging",
    construction: "Telescopic",
    barcode: "4573236272139",
    useCases: ["Telescopic", "Travel", "Light shore jigging", "Distance casting"],
    editorNote: "Long telescopic LSJ model for portable distance casting from shore.",
  }),
  rod({
    id: "major-craft-solpara-shore-jigging-spxt-90mh",
    model: "SPXT-90MH",
    lengthCm: 274.3,
    lureMin: 15,
    lureMax: 42,
    peMin: 0.8,
    peMax: 2.0,
    weightG: 164,
    power: "Medium Heavy",
    construction: "Telescopic",
    barcode: "4573236272061",
    useCases: ["Telescopic", "Travel", "Shore jigging"],
    editorNote: "Medium-heavy telescopic shore model with stronger lure rating than SPXT-90M.",
  }),
];

function upsertById(existing, incoming) {
  const incomingIds = new Set(incoming.map((item) => item.id));
  return [
    ...existing.filter((item) => !incomingIds.has(item.id)),
    ...incoming,
  ];
}

const updatedRods = upsertById(rods, majorCraftSolparaShoreJiggingRods);

const updatedSeries = upsertById(series, [
  {
    id: "major-craft-solpara-shore-jigging",
    brand: "Major Craft",
    name: "Solpara Shore Jigging",
    displayName: "Major Craft Solpara Shore Jigging",
    officialName: "SOLPARA SHORE JIGGING",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Europe", "Global"],
    description:
      "Major Craft Solpara shore jigging series covering super light shore jigging, light shore jigging, heavier shore jigging, and telescopic SPXT models.",
    useCases: ["Shore", "Shore jigging", "Saltwater", "Travel", "Telescopic", "Distance casting"],
    featuredRodIds: majorCraftSolparaShoreJiggingRods.map((rod) => rod.id),
    variantsCount: majorCraftSolparaShoreJiggingRods.length,
    currentCount: majorCraftSolparaShoreJiggingRods.length,
    archivedCount: 0,
    sourceRecords: [officialSource],
  },
]);

const updatedBrands = brands.map((brand) => {
  if (brand.name !== "Major Craft") return brand;

  const nextSeries = [...new Set([...(brand.series || []), "Solpara Shore Jigging"])];

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

console.log("Major Craft Solpara Shore Jigging upsert complete.");
console.log(`Rods added/updated: ${majorCraftSolparaShoreJiggingRods.length}`);
