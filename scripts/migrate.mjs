#!/usr/bin/env node

/**
 * Supabase Migration Runner
 * ==========================
 * Runs the migration SQL from supabase/migrations/001_create_tables.sql
 * against your Supabase project via the Management API.
 *
 * Usage:
 *   1. Set SUPABASE_SERVICE_ROLE_KEY in .env.local OR pass as env var
 *   2. Run: node scripts/migrate.mjs
 *
 * Example:
 *   SUPABASE_SERVICE_ROLE_KEY=your_key_here node scripts/migrate.mjs
 */

import { readFileSync, existsSync } from "fs";
import { createInterface } from "readline";

const SUPABASE_URL = "https://pujuskutbupmerjhewvp.supabase.co";
const PROJECT_REF = "pujuskutbupmerjhewvp";

// ── Read SQL migration file ────────────────────────────────────────
const migrationPath = new URL("../supabase/migrations/001_create_tables.sql", import.meta.url);
const sql = readFileSync(migrationPath, "utf-8");

// ── Get service_role key ──────────────────────────────────────────
async function getServiceRoleKey() {
  // 1. Try environment variable
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return process.env.SUPABASE_SERVICE_ROLE_KEY;
  }

  // 2. Try .env.local
  const envPath = new URL("../.env.local", import.meta.url);
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, "utf-8");
    const match = envContent.match(/SUPABASE_SERVICE_ROLE_KEY\s*=\s*(.+)/);
    if (match) return match[1].trim();
  }

  // 3. Prompt user
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "\n🔑 Enter your Supabase service_role key\n   (Find it: Dashboard → Project Settings → API → service_role key):\n> ",
      (key) => {
        rl.close();
        resolve(key.trim());
      }
    );
  });
}

// ── Execute migration via Supabase Management API ──────────────────
async function runMigration(serviceRoleKey) {
  console.log("\n🚀 Running migration on:", SUPABASE_URL);
  console.log("📄 SQL length:", sql.length, "characters\n");

  const response = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/sql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ Migration failed:", response.status, text);

    // Try alternative: direct database URL approach
    console.log("\n⚠️  Trying alternative approach via REST API...\n");
    await runViaRestPg(serviceRoleKey);
    return;
  }

  console.log("✅ Migration completed successfully!");
  console.log("   Tables created: works, pages, profile");
  console.log("   Triggers and RLS policies applied.");
}

// ── Fallback: via direct pg connection URL ─────────────────────────
async function runViaRestPg(serviceRoleKey) {
  // Use the Supabase REST API to call a custom function or raw SQL
  // This uses the pg_dump endpoint which can execute SQL
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiKey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ Alternative approach also failed:", response.status, text);
    console.log("\n📋 Manual fix required:");
    console.log("   Go to: https://supabase.com/dashboard/project/pujuskutbupmerjhewvp/sql/new");
    console.log("   Copy and paste the content of: supabase/migrations/001_create_tables.sql");
    console.log("   Click 'Run' or Cmd+Enter\n");
    process.exit(1);
  }

  console.log("✅ Migration completed successfully via alternative method!");
}

// ── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║   Supabase Migration Runner              ║");
  console.log("╚══════════════════════════════════════════╝");

  const key = await getServiceRoleKey();

  if (!key) {
    console.error("❌ No service_role key provided. Aborting.");
    process.exit(1);
  }

  if (key.startsWith("sb_publishable_")) {
    console.error("❌ This looks like an anon/publishable key, not a service_role key.");
    console.error("   Service role keys do NOT start with 'sb_publishable_'");
    process.exit(1);
  }

  await runMigration(key);
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});