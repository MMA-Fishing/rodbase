import fs from "node:fs";
import { brands } from "../src/data/brands.js";

const officialSiteMap = {
  Daiwa: [
    {
      region: "Global",
      label: "Daiwa Global",
      url: "https://www.daiwa.com/global",
      note: "Global Daiwa official website.",
    },
    {
      region: "Japan",
      label: "Daiwa Japan",
      url: "https://www.daiwa.com/jp",
      note: "Japanese official product and catalogue site.",
    },
    {
      region: "USA",
      label: "Daiwa USA",
      url: "https://daiwa.us/",
      note: "US regional official website.",
    },
    {
      region: "UK",
      label: "Daiwa UK",
      url: "https://www.daiwasports.co.uk/",
      note: "UK regional official website.",
    },
    {
      region: "Australia",
      label: "Daiwa Australia",
      url: "https://daiwafishing.com.au/",
      note: "Australia regional official website.",
    },
    {
      region: "Scandinavia",
      label: "Daiwa Scandinavia",
      url: "https://www.daiwa.com/scandinavia/",
      note: "Finland, Sweden, Norway, and Denmark regional official website.",
    },
    {
      region: "Taiwan",
      label: "Daiwa Taiwan",
      url: "https://www.daiwaseiko.com.tw/",
      note: "Taiwan regional official website.",
    },
  ],

  Shimano: [
    {
      region: "Regional selector",
      label: "Shimano Fishing regional selector",
      url: "https://fish.shimano.com/landing",
      note: "Official Shimano fishing country and region selector.",
    },
    {
      region: "Japan",
      label: "Shimano Fishing Japan",
      url: "https://fish.shimano.com/ja-JP",
      note: "Japanese official fishing product site.",
    },
    {
      region: "Southeast Asia",
      label: "Shimano Fishing Southeast Asia",
      url: "https://fish.shimano.com/en-SG",
      note: "Southeast Asia official fishing product site.",
    },
    {
      region: "USA",
      label: "Shimano Fishing US",
      url: "https://fish.shimano.com/en-US",
      note: "US regional official fishing product site.",
    },
    {
      region: "Australia",
      label: "Shimano Fishing Australia",
      url: "https://fish.shimano.com/en-AU",
      note: "Australia regional official fishing product site.",
    },
    {
      region: "UK / Europe",
      label: "Shimano Fishing UK",
      url: "https://fish.shimano.com/en-GB",
      note: "UK / European official fishing product site.",
    },
  ],
};

const updatedBrands = brands.map((brand) => {
  const officialSites = officialSiteMap[brand.name];

  if (!officialSites) {
    return brand;
  }

  return {
    ...brand,
    officialSites,
  };
});

const output = `export const brands = ${JSON.stringify(updatedBrands, null, 2)};\n`;

fs.writeFileSync("./src/data/brands.js", output, "utf8");

console.log("Brand official sites updated.");
