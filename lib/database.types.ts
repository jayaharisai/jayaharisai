/**
 * Database type definitions for Supabase tables.
 *
 * These types mirror the existing static data structures from
 * data/_samples.ts but represent the Supabase table row shapes.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      works: {
        Row: WorkRow;
        Insert: WorkInsert;
        Update: WorkUpdate;
      };
      pages: {
        Row: PageRow;
        Insert: PageInsert;
        Update: PageUpdate;
      };
      profile: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ── Works ──────────────────────────────────────────────────────────────────

export interface WorkRow {
  id: number;
  title: string;
  description: string;
  blog: string[];          // tag chips
  details: string[];       // bullet-point highlights
  date: string;
  author: string;
  image: string;
  cover: string | null;
  github: string;
  tags: string[] | null;
  long_description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type WorkInsert = Omit<WorkRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type WorkUpdate = Partial<WorkInsert>;

// ── Pages (blog posts) ─────────────────────────────────────────────────────

export interface PageRow {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
  tags: string[];
  cover: string;
  content: string;
  author: string;
  created_at: string | null;
  updated_at: string | null;
}

export type PageInsert = Omit<PageRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type PageUpdate = Partial<PageInsert>;

// ── Profile ────────────────────────────────────────────────────────────────

export interface ProfileRow {
  id: number;
  name: string;
  full_name: string;
  email: string;
  location: string;
  github: string;
  github_url: string;
  linkedin_url: string;
  instagram_url: string;
  hero_title: string;
  hero_description: string;
  cv_subtitle: string;
  cv_skills: string[];
  cv_education_degree: string;
  cv_education_institution: string;
  cv_education_passout: string;
  cv_bio: string;
  cv_role: string;
  cv_focus_areas: string;
  cv_projects: Json;
  contact_description: string;
  updated_at: string | null;
}

export type ProfileInsert = Omit<ProfileRow, "updated_at"> & {
  updated_at?: string;
};

export type ProfileUpdate = Partial<ProfileInsert>;