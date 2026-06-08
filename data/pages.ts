/**
 * PAGES DATA (blog posts / articles)
 * -----------------------------------
 * This file holds the **real** post data that appears in the UI.
 *
 * For the data shape, all field documentation, and a copy-paste template,
 * see `data/_samples.ts` (the SAMPLE_PAGE constant).
 *
 * To add a new post:
 *   1. Open `data/_samples.ts`
 *   2. Copy the `SAMPLE_PAGE` object
 *   3. Paste it into the `PAGES` array below
 *   4. Fill in the fields with your real content
 *
 * The build system will automatically:
 *   - Show each item as a card on the home page (Pages section)
 *   - Show each item on the /pages list page
 *   - Pre-render a static detail page at /pages/[slug]
 */

import type { PagePost } from "./_samples";

// Re-export the type so existing imports from this file keep working
export type { PagePost } from "./_samples";

export const PAGES: PagePost[] = [
  // 👇 Add your real posts here.
  // Each item must follow the PagePost shape (see data/_samples.ts).
  //
  // Example:
  //   {
  //     slug: "my-first-post",
  //     title: "My First Post",
  //     excerpt: "One-line summary.",
  //     date: "2026-03-15",
  //     readTime: "7 min read",
  //     tags: ["Python", "Backend"],
  //     cover: "https://images.pexels.com/photos/123/pexels-photo-123.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
  //     author: "Jayaharisai",
  //     content: "<p>Post body in HTML...</p>",
  //   },
];

export const getPageBySlug = (slug: string): PagePost | undefined =>
  PAGES.find((p) => p.slug === slug);
