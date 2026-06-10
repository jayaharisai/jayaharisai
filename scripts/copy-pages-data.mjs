#!/usr/bin/env node

/**
 * Copies published-pages.json to public/pages-data.json at build time.
 * This makes pages data available in the static export (GitHub Pages),
 * where API routes don't exist.
 */

import { existsSync, copyFileSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";

const source = resolve(process.cwd(), "data", "published-pages.json");
const dest = resolve(process.cwd(), "public", "pages-data.json");

// Ensure source exists, create empty if not
if (!existsSync(source)) {
  console.log("⚠️  No published-pages.json found, creating empty one.");
  writeFileSync(source, "[]", "utf-8");
}

// Read source
const data = readFileSync(source, "utf-8");

// Write to public/
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, data, "utf-8");

const count = JSON.parse(data).length;
console.log(`✅ Copied pages data to public/pages-data.json (${count} pages)`);