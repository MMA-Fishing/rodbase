import fs from "node:fs";
import { rods } from "../src/data/rods.js";
import { series } from "../src/data/series.js";
import { brands } from "../src/data/brands.js";

const today = "2026-05-04";

const officialSource = {
  sourceType: "Official product page",
  label: "Daiwa Malaysia - 22 Mobile Pack",
  url: "https://daiwa.my/product/22-mobile-pack/",
  lastChecked: today,
  note: "Official Daiwa regional product page and specification table.",
};

const daiwaMobilePackRods = [
  {
    id: "daiwa-mobile-pack-646tul-q",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "646TUL・Q",
    variant: "646TUL・Q",
    displayName: "Daiwa 22 Mobile Pack 646TUL・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 646TUL・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 646TUL", "22 Mobile Pack 646TUL", "646TUL-Q"],
    modelCode: "05802910",
    janCode: "4550133164583",

    rodType: "Telescopic spinning rod",
    reelType: "Spinning",
    construction: "Telescopic",

    lengthCm: 193,
    closedLengthCm: 41,
    weightG: 94,
    sections: 6,

    minLureG: 1,
    maxLureG: 6,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.2,
    maxPe: 0.6,
    minLineLb: null,
    maxLineLb: null,

    power: "Ultra Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Light Game", "Ajing", "Trout", "Small lure"],
    rating: 4.1,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Shortest ultra-light spinning model in the 22 Mobile Pack group, suited to compact travel and very light lure work.",
  },
  {
    id: "daiwa-mobile-pack-666tl-q",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "666TL・Q",
    variant: "666TL・Q",
    displayName: "Daiwa 22 Mobile Pack 666TL・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 666TL・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 666TL", "22 Mobile Pack 666TL", "666TL-Q"],
    modelCode: "05802911",
    janCode: "4550133164590",

    rodType: "Telescopic spinning rod",
    reelType: "Spinning",
    construction: "Telescopic",

    lengthCm: 198,
    closedLengthCm: 41,
    weightG: 98,
    sections: 6,

    minLureG: 2,
    maxLureG: 10,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.3,
    maxPe: 0.8,
    minLineLb: null,
    maxLineLb: null,

    power: "Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Light Game", "Pier", "Small lure"],
    rating: 4.1,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Compact light-power telescopic model for small lures and easy travel carry.",
  },
  {
    id: "daiwa-mobile-pack-746tul-q",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "746TUL・Q",
    variant: "746TUL・Q",
    displayName: "Daiwa 22 Mobile Pack 746TUL・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 746TUL・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 746TUL", "22 Mobile Pack 746TUL", "746TUL-Q"],
    modelCode: "05802912",
    janCode: "4550133164606",

    rodType: "Telescopic spinning rod",
    reelType: "Spinning",
    construction: "Telescopic",

    lengthCm: 224,
    closedLengthCm: 46,
    weightG: 102,
    sections: 6,

    minLureG: 1,
    maxLureG: 6,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.2,
    maxPe: 0.6,
    minLineLb: null,
    maxLineLb: null,

    power: "Ultra Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Light Game", "Ajing", "Rockfish", "Small lure"],
    rating: 4.2,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Longer ultra-light telescopic model with better reach while staying compact.",
  },
  {
    id: "daiwa-mobile-pack-766tml-q",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "766TML・Q",
    variant: "766TML・Q",
    displayName: "Daiwa 22 Mobile Pack 766TML・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 766TML・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 766TML", "22 Mobile Pack 766TML", "766TML-Q"],
    modelCode: "05802913",
    janCode: "4550133164613",

    rodType: "Telescopic spinning rod",
    reelType: "Spinning",
    construction: "Telescopic",

    lengthCm: 229,
    closedLengthCm: 49,
    weightG: 122,
    sections: 6,

    minLureG: 5,
    maxLureG: 25,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.6,
    maxPe: 1.2,
    minLineLb: null,
    maxLineLb: null,

    power: "Medium Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Lure fishing", "Shore", "Seabass", "Eging"],
    rating: 4.3,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Medium-light telescopic model for general shore lure work in a compact package.",
  },
  {
    id: "daiwa-mobile-pack-866tml",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "866TML・Q",
    variant: "866TML・Q",
    displayName: "Daiwa 22 Mobile Pack 866TML・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 866TML・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 866TML", "22 Mobile Pack 866TML", "866TML-Q", "Daiwa Mobile Pack 866TML"],
    modelCode: "05802914",
    janCode: "4550133164620",

    rodType: "Telescopic spinning rod",
    reelType: "Spinning",
    construction: "Telescopic",

    lengthCm: 259,
    closedLengthCm: 54,
    weightG: 133,
    sections: 6,

    minLureG: 5,
    maxLureG: 25,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.6,
    maxPe: 1.2,
    minLineLb: null,
    maxLineLb: null,

    power: "Medium Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Lure fishing", "Shore", "Seabass", "Eging"],
    rating: 4.5,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Popular balanced mobile telescopic model with a strong portability-to-performance ratio for shore lure fishing.",
  },
  {
    id: "daiwa-mobile-pack-905tm-q",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "905TM・Q",
    variant: "905TM・Q",
    displayName: "Daiwa 22 Mobile Pack 905TM・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 905TM・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 905TM", "22 Mobile Pack 905TM", "905TM-Q"],
    modelCode: "05802915",
    janCode: "4550133164637",

    rodType: "Telescopic spinning rod",
    reelType: "Spinning",
    construction: "Telescopic",

    lengthCm: 274,
    closedLengthCm: 65,
    weightG: 170,
    sections: 5,

    minLureG: 7,
    maxLureG: 35,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.6,
    maxPe: 1.5,
    minLineLb: null,
    maxLineLb: null,

    power: "Medium",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Shore", "Seabass", "Light shore jigging", "Surf"],
    rating: 4.3,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Longer medium-power telescopic model for users who want more casting reach from the Mobile Pack series.",
  },
  {
    id: "daiwa-mobile-pack-965tmh-q",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "965TMH・Q",
    variant: "965TMH・Q",
    displayName: "Daiwa 22 Mobile Pack 965TMH・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 965TMH・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 965TMH", "22 Mobile Pack 965TMH", "965TMH-Q"],
    modelCode: "05802916",
    janCode: "4550133164644",

    rodType: "Telescopic spinning rod",
    reelType: "Spinning",
    construction: "Telescopic",

    lengthCm: 290,
    closedLengthCm: 68,
    weightG: 175,
    sections: 5,

    minLureG: 10,
    maxLureG: 40,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.8,
    maxPe: 2.0,
    minLineLb: null,
    maxLineLb: null,

    power: "Medium Heavy",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Shore", "Surf", "Seabass", "Light shore jigging"],
    rating: 4.3,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Strongest spinning model in this Mobile Pack set, suitable for heavier shore lure work and more distance.",
  },
  {
    id: "daiwa-mobile-pack-665tmlb-q",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "665TMLB・Q",
    variant: "665TMLB・Q",
    displayName: "Daiwa 22 Mobile Pack 665TMLB・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 665TMLB・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 665TMLB", "22 Mobile Pack 665TMLB", "665TMLB-Q"],
    modelCode: "05802917",
    janCode: "4550133164651",

    rodType: "Telescopic baitcasting rod",
    reelType: "Baitcasting",
    construction: "Telescopic",

    lengthCm: 198,
    closedLengthCm: 48,
    weightG: 125,
    sections: 5,

    minLureG: 7,
    maxLureG: 35,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.6,
    maxPe: 1.5,
    minLineLb: null,
    maxLineLb: null,

    power: "Medium Light",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Baitcasting", "Bass", "Lure fishing"],
    rating: 4.2,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Compact baitcasting Mobile Pack option for users who prefer a baitcaster setup.",
  },
  {
    id: "daiwa-mobile-pack-765tmb-q",
    brand: "Daiwa",
    series: "Mobile Pack",
    model: "765TMB・Q",
    variant: "765TMB・Q",
    displayName: "Daiwa 22 Mobile Pack 765TMB・Q",
    generation: "22 Mobile Pack",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],

    officialName: "22 MOBILE PACK 765TMB・Q",
    japaneseName: "",
    chineseName: "",
    aliases: ["Mobile Pack 765TMB", "22 Mobile Pack 765TMB", "765TMB-Q"],
    modelCode: "05802918",
    janCode: "4550133164668",

    rodType: "Telescopic baitcasting rod",
    reelType: "Baitcasting",
    construction: "Telescopic",

    lengthCm: 229,
    closedLengthCm: 54,
    weightG: 140,
    sections: 5,

    minLureG: 10,
    maxLureG: 40,
    minSinkerG: null,
    maxSinkerG: null,
    minPe: 0.8,
    maxPe: 2.0,
    minLineLb: null,
    maxLineLb: null,

    power: "Medium",
    action: "Unknown",
    tipType: "",
    carbonPercent: null,
    priceHkdApprox: null,

    useCases: ["Travel", "Mobile rod", "Baitcasting", "Bass", "Lure fishing", "Shore"],
    rating: 4.2,

    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",

    sourceRecords: [officialSource],
    editorNote: "Longer baitcasting Mobile Pack option with heavier lure capacity than the 665TMLB・Q.",
  },
];

function upsertById(existing, incoming) {
  const incomingIds = new Set(incoming.map((item) => item.id));
  return [
    ...existing.filter((item) => !incomingIds.has(item.id)),
    ...incoming,
  ];
}

const updatedRods = upsertById(rods, daiwaMobilePackRods);

const updatedSeries = upsertById(series, [
  {
    id: "daiwa-mobile-pack",
    brand: "Daiwa",
    name: "Mobile Pack",
    displayName: "Daiwa 22 Mobile Pack",
    officialName: "22 MOBILE PACK",
    catalogueStatus: "Current / Recent",
    marketRegions: ["Malaysia", "Asia"],
    description:
      "Compact Daiwa mobile rod series with telescopic spinning and baitcasting models, covering light game, shore lure fishing, seabass, eging, surf, and mobile travel use.",
    useCases: ["Travel", "Mobile rod", "Lure fishing", "Shore", "Telescopic", "Seabass", "Eging", "Bass"],
    featuredRodIds: daiwaMobilePackRods.map((rod) => rod.id),
    variantsCount: daiwaMobilePackRods.length,
    currentCount: daiwaMobilePackRods.length,
    archivedCount: 0,
    sourceRecords: [officialSource],
  },
]);

const updatedBrands = brands.map((brand) => {
  if (brand.name !== "Daiwa") return brand;

  const nextSeries = [...new Set([...(brand.series || []), "Mobile Pack"])];

  const officialSites = [...(brand.officialSites || [])];
  const hasMalaysia = officialSites.some((site) => site.label === "Daiwa Malaysia");

  if (!hasMalaysia) {
    officialSites.push({
      region: "Malaysia",
      label: "Daiwa Malaysia",
      url: "https://daiwa.my/",
      note: "Malaysia regional official website.",
    });
  }

  return {
    ...brand,
    series: nextSeries,
    officialSites,
  };
});

function writeExport(path, name, value) {
  const output = `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;
  fs.writeFileSync(path, output, "utf8");
}

writeExport("./src/data/rods.js", "rods", updatedRods);
writeExport("./src/data/series.js", "series", updatedSeries);
writeExport("./src/data/brands.js", "brands", updatedBrands);

console.log("Daiwa 22 Mobile Pack series upsert complete.");
console.log(`Rods added/updated: ${daiwaMobilePackRods.length}`);
