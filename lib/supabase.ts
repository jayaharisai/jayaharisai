/**
 * Page Storage
 * ============
 * Stores pages via local Next.js API routes in dev mode.
 * In production (static export), pages data comes from
 * public/pages-data.json which is generated at build time.
 */

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
 * Fetch all published pages.
 * In dev: calls the local API route
 * In production: reads the static JSON file (generated at build time)
 */
export async function fetchPages(): Promise<PagePostData[]> {
  try {
    const isDev =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

    if (isDev) {
      const res = await fetch("/api/pages/");
      if (!res.ok) return [];
      return await res.json();
    }

    // Production: static JSON from GitHub Pages
    const res = await fetch("/jayaharisai/pages-data.json");
    if (!res.ok) return [];
    return await res.json();
  } catch {
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
 * Save a new page directly to the data file via the Next.js server environment.
 * In production (static export / GitHub Pages), this will throw an error since
 * there is no running server — you must publish locally and then rebuild + deploy.
 */
export async function savePage(page: {
  title: string;
  excerpt: string;
  tags: string;
  cover: string;
  content: string;
  author?: string;
}): Promise<{ success: boolean; slug?: string; error?: string }> {
  const isDev =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  if (!isDev) {
    return { success: false, error: "Saving only works in local dev mode. Publish locally, then rebuild & deploy." };
  }

  try {
    const res = await fetch("/api/pages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });

    if (!res.ok) {
      // API route may not be available during builds
      return await res.json().catch(() => ({ success: false, error: "Failed to reach save endpoint" }));
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save." };
  }
}
