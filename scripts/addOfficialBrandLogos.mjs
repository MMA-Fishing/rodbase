import fs from "node:fs";
import { brands } from "../src/data/brands.js";

const logoMap = {
  Daiwa: "/images/brands/daiwa.svg",
  Shimano: "/images/brands/shimano.svg",
  Nissin: "/images/brands/nissin.svg",
  "Major Craft": "/images/brands/major-craft.svg",
};

const updatedBrands = brands.map((brand) => {
  const logoUrl = logoMap[brand.name];

  if (!logoUrl) return brand;

  return {
    ...brand,
    logoUrl,
    logoUsage: "permission-granted",
    logoNote: "Official brand logo used with permission.",
  };
});

fs.writeFileSync(
  "./src/data/brands.js",
  `export const brands = ${JSON.stringify(updatedBrands, null, 2)};\n`,
  "utf8"
);

console.log("Official brand logo paths added.");
