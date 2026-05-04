import fs from "node:fs";
import { brands } from "../src/data/brands.js";

const officialSiteMap = {
  Nissin: [
    {
      region: "Japan",
      label: "Uzaki Nissin Official",
      url: "https://www.u-nissin.co.jp/",
      note: "Official Uzaki Nissin fishing rod manufacturer website.",
    },
    {
      region: "Japan",
      label: "Uzaki Nissin Products",
      url: "https://www.u-nissin.co.jp/item",
      note: "Official Nissin product category index.",
    },
    {
      region: "Japan",
      label: "ARES Official",
      url: "https://ares-rod.com/",
      note: "Official ARES lure-game rod brand site by Uzaki Nissin.",
    },
  ],

  "Major Craft": [
    {
      region: "Japan",
      label: "Major Craft Japan",
      url: "https://www.majorcraft.co.jp/majorcraft-factory/",
      note: "Official Japanese Major Craft website.",
    },
    {
      region: "USA",
      label: "Major Craft America",
      url: "https://www.majorcraft-america.com/",
      note: "Official Major Craft America website.",
    },
    {
      region: "Europe",
      label: "Major Craft Europe",
      url: "https://www.majorcrafteurope.com/",
      note: "Official Major Craft Europe website.",
    },
    {
      region: "Europe",
      label: "Major Craft Europe Rods",
      url: "https://www.majorcrafteurope.com/product-category/rods/",
      note: "Official Europe rod category index.",
    },
  ],
};

const updatedBrands = brands.map((brand) => {
  const incomingSites = officialSiteMap[brand.name];

  if (!incomingSites) {
    return brand;
  }

  const existingSites = brand.officialSites || [];
  const existingKeys = new Set(existingSites.map((site) => `${site.region}:::${site.label}`));

  const mergedSites = [
    ...existingSites,
    ...incomingSites.filter((site) => !existingKeys.has(`${site.region}:::${site.label}`)),
  ];

  return {
    ...brand,
    officialSites: mergedSites,
  };
});

const output = `export const brands = ${JSON.stringify(updatedBrands, null, 2)};\n`;
fs.writeFileSync("./src/data/brands.js", output, "utf8");

console.log("Nissin and Major Craft official sites updated.");
