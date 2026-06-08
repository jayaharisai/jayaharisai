/**
 * WORK DATA
 * ----------
 * This file holds the **real** project data that appears in the UI.
 *
 * For the data shape, all field documentation, and a copy-paste template,
 * see `data/_samples.ts` (the SAMPLE_WORK constant).
 *
 * To add a new work:
 *   1. Open `data/_samples.ts`
 *   2. Copy the `SAMPLE_WORK` object
 *   3. Paste it into the `WORK_DATA` array below
 *   4. Fill in the fields with your real content
 *
 * The build system will automatically:
 *   - Show each item as a card on the home page (Works section)
 *   - Show each item on the /works list page
 *   - Pre-render a static detail page at /works/[id]
 */

import type { WorkItem } from "./_samples";

// Re-export the type so existing imports from this file keep working
export type { WorkItem } from "./_samples";

export const WORK_DATA: WorkItem[] = [
  // 👇 Add your real works here.
  // Each item must follow the WorkItem shape (see data/_samples.ts).
  //
  // Example:
  //   {
  //     id: 1,
  //     title: "My ML Platform",
  //     description: "...",
  //     blog: ["Python", "ML"],
  //     details: ["Built X", "Solved Y"],
  //     date: "Mar 2026",
  //     author: "Jayaharisai",
  //     image: "https://images.pexels.com/photos/123/pexels-photo-123.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1",
  //     github: "https://github.com/you/repo",
  //   },
];
