import fs from "node:fs";
import { brands } from "../src/data/brands.js";

const updatedBrands = brands.map((brand) => ({
  ...brand,
  logoUrl: brand.logoUrl || "",
  logoUsage: brand.logoUsage || "own-design",
  logoNote:
    brand.logoNote ||
    "RodBase-designed text brand tile. Not an official brand logo file.",
}));

fs.writeFileSync(
  "./src/data/brands.js",
  `export const brands = ${JSON.stringify(updatedBrands, null, 2)};\n`,
  "utf8"
);

console.log("Brand logo usage fields added.");
