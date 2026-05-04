import fs from "node:fs";
import path from "node:path";

const scanRoots = [
  "./src/components",
  "./src/pages",
];

const ignoredFiles = new Set([
  "PageTitle.jsx",
]);

const allowedFragments = [
  "RodBase",
  "Daiwa",
  "Shimano",
  "Nissin",
  "Major Craft",
  "PE",
  "JAN",
  "HKD",
  "RB",
  "×",
  "☰",
  "−",
  "+",
  "↗",
  "→",
];

const suspiciousWords = [
  "Search",
  "Browse",
  "Compare",
  "Filter",
  "Sort",
  "Source",
  "Official",
  "Reference",
  "Length",
  "Closed",
  "Weight",
  "Brand",
  "Series",
  "Model",
  "Rods",
  "Articles",
  "Guide",
  "Data",
  "Correction",
  "Back",
  "Open",
  "Clear",
  "Remove",
  "Selected",
  "No ",
  "Not ",
  "View",
  "Current",
  "Travel",
  "Mobile",
  "Telescopic",
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    if (!entry.name.endsWith(".jsx")) {
      return [];
    }

    if (ignoredFiles.has(entry.name)) {
      return [];
    }

    return [fullPath];
  });
}

function hasSuspiciousEnglish(text) {
  const trimmed = text.trim();

  if (!trimmed) return false;
  if (trimmed.length < 3) return false;
  if (/^[{}()[\].,;:'"`<>/\\|?!@#$%^&*\-+=\s]+$/.test(trimmed)) return false;
  if (/^[A-Z0-9_./:-]+$/.test(trimmed)) return false;

  if (allowedFragments.some((fragment) => trimmed === fragment)) {
    return false;
  }

  return suspiciousWords.some((word) => trimmed.includes(word));
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function extractJsxText(content) {
  const results = [];

  const textNodeRegex = />\s*([^<>{}][^<>{]*?[A-Za-z][^<>{]*?)\s*</g;
  let match;

  while ((match = textNodeRegex.exec(content)) !== null) {
    const text = match[1].replace(/\s+/g, " ").trim();

    if (hasSuspiciousEnglish(text)) {
      results.push({
        line: lineNumberAt(content, match.index),
        text,
        kind: "JSX text",
      });
    }
  }

  const attrRegex = /(placeholder|title|aria-label)=["']([^"']*[A-Za-z][^"']*)["']/g;

  while ((match = attrRegex.exec(content)) !== null) {
    const text = match[2].replace(/\s+/g, " ").trim();

    if (hasSuspiciousEnglish(text)) {
      results.push({
        line: lineNumberAt(content, match.index),
        text,
        kind: match[1],
      });
    }
  }

  return results;
}

const files = scanRoots.flatMap(walk);
const findings = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const results = extractJsxText(content);

  for (const result of results) {
    findings.push({
      file: file.replaceAll("\\", "/"),
      ...result,
    });
  }
}

if (findings.length === 0) {
  console.log("No obvious hardcoded English UI text found in JSX files.");
  process.exit(0);
}

console.log(`Found ${findings.length} possible hardcoded English UI text item(s):\n`);

for (const finding of findings) {
  console.log(`${finding.file}:${finding.line} [${finding.kind}] ${finding.text}`);
}

console.log("\nReview these manually. Some may be product names, brand names, or allowed technical terms.");
