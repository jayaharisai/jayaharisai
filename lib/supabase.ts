import { createClient } from "@supabase/supabase-js";

// Hardcoded for now — in future, move to GitHub Secrets / env vars.
// Safe to expose: this is the public anon key (RLS policies protect the DB).
const supabaseUrl = "https://pujuskutbupmerjhewvp.supabase.co";
const supabaseAnonKey = "sb_publishable_LfG3ZMdqASs8-Jis81hamw_IsWCwq68";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PagePostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
  tags: string[];
  cover: string;
  content: string;
  author: string;
  created_at?: string;
}

/**
 * Fetch all published pages from Supabase.
 * Works directly from the browser — no server needed.
 */
export async function fetchPages(): Promise<PagePostData[]> {
  try {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch error:", error.message);
      return [];
    }

    return (data as PagePostData[]) || [];
  } catch (err) {
    console.warn("Supabase fetch failed:", err);
    return [];
  }
}

/**
 * Fetch a single page by slug.
 */
export async function fetchPageBySlug(
  slug: string
): Promise<PagePostData | null> {
  const pages = await fetchPages();
  return pages.find((p) => p.slug === slug) || null;
}

/**
 * Save a new page to Supabase.
 * Works directly from the browser using the anon key + RLS policy.
 */
export async function savePage(page: {
  title: string;
  excerpt: string;
  tags: string;
  cover: string;
  content: string;
  author?: string;
}): Promise<{ success: boolean; slug?: string; error?: string }> {
  const slug = page.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const now = new Date().toISOString().split("T")[0];

  try {
    const { error } = await supabase.from("pages").insert({
      slug,
      title: page.title,
      excerpt: page.excerpt || "No description provided.",
      date: now,
      read_time: `${Math.max(1, Math.ceil(page.content.split(" ").length / 200))} min read`,
      tags: page.tags
        ? page.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : [],
      cover: page.cover || "",
      content: page.content,
      author: page.author || "Jayaharisai",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, slug };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save." };
  }
}