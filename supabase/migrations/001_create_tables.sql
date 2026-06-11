-- ============================================================
-- Migration: Create works, pages, and profile tables
-- ============================================================
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- This matches the existing static data structures exactly.
-- ============================================================

-- ── Works table (mirrors WorkItem) ─────────────────────────

CREATE TABLE IF NOT EXISTS works (
  id            INTEGER PRIMARY KEY,
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  blog          TEXT[] NOT NULL DEFAULT '{}',       -- tag chips
  details       TEXT[] NOT NULL DEFAULT '{}',       -- bullet-point highlights
  date          TEXT NOT NULL,
  author        TEXT NOT NULL DEFAULT 'Jayaharisai',
  image         TEXT NOT NULL,
  cover         TEXT,
  github        TEXT NOT NULL DEFAULT '#',
  tags          TEXT[] DEFAULT '{}',
  long_description TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ── Pages table (mirrors PagePost) ─────────────────────────

CREATE TABLE IF NOT EXISTS pages (
  slug          TEXT PRIMARY KEY,
  title         TEXT NOT NULL,
  excerpt       TEXT NOT NULL,
  date          TEXT NOT NULL,
  read_time     TEXT NOT NULL,
  tags          TEXT[] NOT NULL DEFAULT '{}',
  cover         TEXT NOT NULL,
  content       TEXT NOT NULL,
  author        TEXT NOT NULL DEFAULT 'Jayaharisai',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ── Profile table (mirrors PROFILE_DATA) ──────────────────

CREATE TABLE IF NOT EXISTS profile (
  id            INTEGER PRIMARY KEY DEFAULT 1,
  name          TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  location      TEXT NOT NULL,
  github        TEXT NOT NULL,
  github_url    TEXT NOT NULL,
  linkedin_url  TEXT NOT NULL,
  instagram_url TEXT NOT NULL DEFAULT '#',
  hero_title         TEXT NOT NULL,
  hero_description   TEXT NOT NULL,
  cv_subtitle        TEXT NOT NULL,
  cv_skills          TEXT[] NOT NULL DEFAULT '{}',
  cv_education_degree     TEXT NOT NULL,
  cv_education_institution TEXT NOT NULL,
  cv_education_passout     TEXT NOT NULL,
  cv_bio       TEXT NOT NULL,
  cv_role      TEXT NOT NULL,
  cv_focus_areas TEXT NOT NULL,
  cv_projects  JSONB NOT NULL DEFAULT '[]',
  contact_description TEXT NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ── Auto-update updated_at trigger ─────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_works_updated_at'
  ) THEN
    CREATE TRIGGER set_works_updated_at
      BEFORE UPDATE ON works
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_pages_updated_at'
  ) THEN
    CREATE TRIGGER set_pages_updated_at
      BEFORE UPDATE ON pages
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_profile_updated_at'
  ) THEN
    CREATE TRIGGER set_profile_updated_at
      BEFORE UPDATE ON profile
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

-- ── Enable Row Level Security (optional, can be relaxed) ──

ALTER TABLE works  ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for anon key)

CREATE POLICY "Allow public read access on works"
  ON works FOR SELECT USING (true);

CREATE POLICY "Allow public read access on pages"
  ON pages FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on pages"
  ON pages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete access on pages"
  ON pages FOR DELETE USING (true);

CREATE POLICY "Allow public read access on profile"
  ON profile FOR SELECT USING (true);
