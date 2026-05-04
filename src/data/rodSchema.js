export const rodSchemaVersion = "1.0.0";

export const rodCatalogueStatuses = [
  "Current",
  "Current / Recent",
  "Discontinued",
  "Archived",
  "Unknown",
];

export const reelTypes = [
  "Spinning",
  "Baitcasting",
  "Conventional",
  "Fly",
  "Unknown",
];

export const rodConstructions = [
  "1-piece",
  "2-piece",
  "3-piece",
  "4-piece",
  "Multi-piece",
  "Telescopic",
  "Unknown",
];

export const rodPowerLevels = [
  "Ultra Light",
  "Light",
  "Medium Light",
  "Medium",
  "Medium Heavy",
  "Heavy",
  "Extra Heavy",
  "Unknown",
];

export const rodActionTypes = [
  "Slow",
  "Regular",
  "Regular Fast",
  "Fast",
  "Extra Fast",
  "Unknown",
];

export const rodSchemaFields = [
  {
    key: "id",
    type: "string",
    required: true,
    example: "daiwa-mobile-pack-866tml",
    note: "Stable URL-safe ID. Do not change once published unless redirect is handled.",
  },
  {
    key: "brand",
    type: "string",
    required: true,
    example: "Daiwa",
    note: "Manufacturer / brand name.",
  },
  {
    key: "series",
    type: "string",
    required: true,
    example: "Mobile Pack",
    note: "Product family / series name.",
  },
  {
    key: "model",
    type: "string",
    required: true,
    example: "866TML",
    note: "Exact model or variant code.",
  },
  {
    key: "displayName",
    type: "string",
    required: true,
    example: "Daiwa Mobile Pack 866TML",
    note: "Human-facing full product name.",
  },
  {
    key: "catalogueStatus",
    type: "enum",
    required: true,
    example: "Current",
    note: "Current, discontinued, archived, or unknown.",
  },
  {
    key: "marketRegions",
    type: "string[]",
    required: true,
    example: ["Japan", "Asia"],
    note: "Markets where this model/name appears.",
  },
  {
    key: "aliases",
    type: "string[]",
    required: false,
    example: ["Mobile Pack 866 TML"],
    note: "Searchable alternative names, regional names, or common shop names.",
  },
  {
    key: "rodType",
    type: "string",
    required: true,
    example: "Telescopic spinning rod",
    note: "Readable rod type label.",
  },
  {
    key: "reelType",
    type: "enum",
    required: true,
    example: "Spinning",
    note: "Compatible reel style.",
  },
  {
    key: "construction",
    type: "enum",
    required: true,
    example: "Telescopic",
    note: "Physical construction / piece-count style.",
  },
  {
    key: "lengthCm",
    type: "number",
    required: true,
    example: 259,
    note: "Extended total rod length in centimetres.",
  },
  {
    key: "closedLengthCm",
    type: "number",
    required: true,
    example: 54,
    note: "Packed / collapsed length in centimetres.",
  },
  {
    key: "weightG",
    type: "number",
    required: true,
    example: 120,
    note: "Rod weight in grams.",
  },
  {
    key: "sections",
    type: "number",
    required: true,
    example: 6,
    note: "Number of pieces or telescopic sections.",
  },
  {
    key: "minLureG",
    type: "number | null",
    required: false,
    example: 5,
    note: "Minimum lure rating in grams.",
  },
  {
    key: "maxLureG",
    type: "number | null",
    required: false,
    example: 25,
    note: "Maximum lure rating in grams.",
  },
  {
    key: "minPe",
    type: "number | null",
    required: false,
    example: 0.6,
    note: "Minimum PE line rating.",
  },
  {
    key: "maxPe",
    type: "number | null",
    required: false,
    example: 1.2,
    note: "Maximum PE line rating.",
  },
  {
    key: "priceHkdApprox",
    type: "number | null",
    required: false,
    example: 980,
    note: "Approximate HKD reference price only, not live market price.",
  },
  {
    key: "useCases",
    type: "string[]",
    required: true,
    example: ["Travel", "Lure fishing", "Shore"],
    note: "Search/filter tags for user browsing.",
  },
  {
    key: "imageUrl",
    type: "string",
    required: false,
    example: "/images/rods/shimano/lurematic-mobile/s86ml-4.webp",
    note: "Local public image path for rod product image.",
  },
  {
    key: "imageAlt",
    type: "string",
    required: false,
    example: "Shimano Lurematic Mobile S86ML-4 fishing rod",
    note: "Accessible image description.",
  },
  {
    key: "sourceRecords",
    type: "object[]",
    required: true,
    example: [
      {
        sourceType: "Official / catalogue",
        label: "Official brand page",
        url: "",
        lastChecked: "",
        note: "",
      },
    ],
    note: "Source tracking records for future verification.",
  },
  {
    key: "editorNote",
    type: "string",
    required: false,
    example: "Compact travel rod with strong portability-to-performance balance.",
    note: "RodBase interpretation. Keep separate from official specs.",
  },
];

export const emptyRodRecord = {
  id: "",
  brand: "",
  series: "",
  model: "",
  variant: "",
  displayName: "",

  generation: "",
  catalogueStatus: "Unknown",
  marketRegions: [],

  officialName: "",
  japaneseName: "",
  chineseName: "",
  aliases: [],
  modelCode: "",
  janCode: "",

  rodType: "",
  reelType: "Unknown",
  construction: "Unknown",

  lengthCm: null,
  closedLengthCm: null,
  weightG: null,
  sections: null,

  minLureG: null,
  maxLureG: null,
  minSinkerG: null,
  maxSinkerG: null,
  minPe: null,
  maxPe: null,
  minLineLb: null,
  maxLineLb: null,

  power: "Unknown",
  action: "Unknown",
  tipType: "",
  carbonPercent: null,

  priceHkdApprox: null,

  useCases: [],
  imageUrl: "",
  imageAlt: "",
  rating: null,

  sourceRecords: [],

  editorNote: "",
};


