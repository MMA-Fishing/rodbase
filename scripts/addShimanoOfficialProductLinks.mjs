import fs from "node:fs";
import { rods } from "../src/data/rods.js";

const today = "2026-05-04";

const shimanoLurematicSourceRecords = [
  {
    sourceType: "Official product page",
    label: "Shimano Japan - Lurematic MB",
    url: "https://fish.shimano.com/ja-JP/product/rod/shoresalt/other/a075f00003e2htjqay.html",
    lastChecked: today,
    note: "Official Japanese product page and specification table.",
  },
  {
    sourceType: "Official product page",
    label: "Shimano Southeast Asia - Lurematic MB",
    url: "https://fish.shimano.com/en-SG/product/rods/jigging/a075f00003e2htjqay.html",
    lastChecked: today,
    note: "Official Southeast Asia product page for regional reference.",
  },
];

const updatedRods = rods.map((rod) => {
  if (rod.brand !== "Shimano" || rod.series !== "Lurematic Mobile") {
    return rod;
  }

  return {
    ...rod,
    sourceRecords: shimanoLurematicSourceRecords,
    imageUrl: "",
    imageAlt: "",
    imageUsage: "official-linked-only",
  };
});

const output = `export const rods = ${JSON.stringify(updatedRods, null, 2)};\n`;

fs.writeFileSync("./src/data/rods.js", output, "utf8");

console.log("Shimano Lurematic Mobile official reference links updated.");
