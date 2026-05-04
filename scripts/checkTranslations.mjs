import { translations, supportedLocales } from "../src/i18n/translations.js";

const baseLocale = "en";
const baseKeys = Object.keys(translations[baseLocale] || {}).sort();

let errors = 0;
let warnings = 0;

function error(message) {
  errors += 1;
  console.error(`ERROR: ${message}`);
}

function warning(message) {
  warnings += 1;
  console.warn(`WARNING: ${message}`);
}

for (const locale of supportedLocales) {
  if (!translations[locale.code]) {
    error(`Missing translation object for locale "${locale.code}".`);
  }
}

for (const locale of supportedLocales) {
  const code = locale.code;

  if (code === baseLocale) continue;

  const localeKeys = Object.keys(translations[code] || {}).sort();
  const localeKeySet = new Set(localeKeys);
  const baseKeySet = new Set(baseKeys);

  const missingKeys = baseKeys.filter((key) => !localeKeySet.has(key));
  const extraKeys = localeKeys.filter((key) => !baseKeySet.has(key));

  for (const key of missingKeys) {
    error(`${code} is missing key: ${key}`);
  }

  for (const key of extraKeys) {
    warning(`${code} has extra key not present in ${baseLocale}: ${key}`);
  }
}

for (const [locale, dictionary] of Object.entries(translations)) {
  for (const [key, value] of Object.entries(dictionary)) {
    if (typeof value !== "string") {
      error(`${locale}.${key} should be a string.`);
    }

    if (typeof value === "string" && value.trim().length === 0) {
      warning(`${locale}.${key} is empty.`);
    }
  }
}

console.log("");
console.log("RodBase translation check complete.");
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  process.exit(1);
}
