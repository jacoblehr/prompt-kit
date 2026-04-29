import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildCatalog, renderSiteData } from "./catalog/build-catalog.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const siteDataPath = path.join(ROOT, "site-data.js");

const expected = renderSiteData(buildCatalog({ root: ROOT }));
const actual = fs.existsSync(siteDataPath) ? fs.readFileSync(siteDataPath, "utf8") : "";

if (actual !== expected) {
  console.error("site-data.js is stale. Run `npm run build` to regenerate it.");
  process.exit(1);
}

console.log("site-data.js is current.");
