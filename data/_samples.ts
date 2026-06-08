/**
 * SAMPLE DATA — REFERENCE TEMPLATES ONLY
 * ---------------------------------------
 * This file is the **source of truth** for the shape of your data.
 * It is **NOT** imported by any component, so the items here never
 * appear in the UI. They exist only as copy-paste templates.
 *
 * To add a new project/post:
 *   1. Open this file
 *   2. Copy the matching SAMPLE_* constant
 *   3. Paste it into data/projects.ts or data/pages.ts
 *   4. Fill in the fields with your real content
 *
 * Each new entry is automatically picked up by:
 *   - The home page (card)
 *   - The dedicated list page (/works or /pages)
 *   - A pre-rendered detail page (/works/[id] or /pages/[slug])
 */

// ----------------------------------------------------------------------------
// WORK (project) SAMPLE
// ----------------------------------------------------------------------------

export type WorkItem = {
  id: number;                          // unique numeric ID (used in URL: /works/[id])
  title: string;                       // project name
  description: string;                 // short description (used on cards & meta)
  blog: string[];                      // tag chips shown on cards
  details: string[];                   // bullet-point highlights shown on detail page
  date: string;                        // e.g. "Mar 2026"
  author: string;                      // e.g. "Jayaharisai"
  image: string;                       // cover image URL (small, ~600px wide for cards)
  cover?: string;                      // optional larger cover for the detail page
  github: string;                      // GitHub URL (use "#" if not public)
  tags?: string[];                     // optional extra tags (falls back to `blog`)
  longDescription?: string;            // optional long-form HTML for the detail page
};

// Pexels helper — small optimized JPEG. Returns a URL with compression params.
export const px = (id: number, w = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&dpr=1`;

/**
 * Copy this template, paste into data/projects.ts's WORK_DATA array, and fill in.
 */
export const SAMPLE_WORK: WorkItem = {
  id: 1,                               // unique ID — use 1, 2, 3, ... for new items
  title: "Sample Project Title",       // your project name
  description: "One-line description shown on cards and the meta description.",
  blog: ["Tag1", "Tag2", "Tag3"],      // tag chips shown on cards
  details: [                            // bullet points shown on the detail page
    "Key highlight #1",
    "Key highlight #2",
    "Key highlight #3",
  ],
  date: "Jan 2026",                     // any human-readable date
  author: "Your Name",
  image: px(669610, 600),              // 600px wide cover for cards
  cover: px(669610, 1200),             // 1200px wide cover for the detail page (optional)
  github: "https://github.com/yourname",
  // tags: ["ExtraTag1", "ExtraTag2"], // optional — falls back to `blog` if omitted
  // longDescription: `                // optional — long-form HTML for the detail page
  //   <p>Full description...</p>
  //   <h2>Section heading</h2>
  //   <p>More content...</p>
  // `,
};

// ----------------------------------------------------------------------------
// PAGE (blog post) SAMPLE
// ----------------------------------------------------------------------------

export type PagePost = {
  slug: string;                        // URL-safe identifier (e.g. "my-first-post")
  title: string;                       // post title
  excerpt: string;                     // short summary (used on cards & meta description)
  date: string;                        // ISO date "YYYY-MM-DD" (or any human-readable string)
  readTime: string;                    // e.g. "5 min read"
  tags: string[];                      // tag chips shown on cards and the detail page
  cover: string;                       // cover image URL (small, ~800px wide)
  content: string;                     // HTML body of the post
  author: string;                      // author name
};

/**
 * Copy this template, paste into data/pages.ts's PAGES array, and fill in.
 */
export const SAMPLE_PAGE: PagePost = {
  slug: "sample-post-slug",            // unique URL slug (lowercase, hyphenated)
  title: "Sample Post Title",          // your post title
  excerpt: "One-line summary of the post shown on cards and in meta tags.",
  date: "2026-01-15",                  // any date string
  readTime: "5 min read",
  tags: ["Tag1", "Tag2"],              // tag chips
  cover: px(1181677, 800),             // 800px wide cover image
  author: "Your Name",
  content: `
<p>Start writing your post here. HTML is supported — use <strong>bold</strong>, <em>italic</em>, links, and headings like this:</p>

<h2>Section heading</h2>
<p>Paragraph text...</p>

<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

<p>More content...</p>
`,
};
