import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildCatalog, renderSiteData } from "./catalog/build-catalog.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const catalog = buildCatalog({ root: ROOT });
const output = renderSiteData(catalog);

fs.writeFileSync(path.join(ROOT, "site-data.js"), output);

const { blockCount, stackCount, featuredStackCount } = catalog.diagnostics;
console.log(`Wrote site-data.js with ${blockCount + stackCount + featuredStackCount} entries.`);
