"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Reads the URL hash (e.g. /#work) and, after the page mounts, scrolls
 * smoothly to the corresponding element. Used to support cross-page
 * navigation from the Navbar (e.g. clicking "Works" on a blog post
 * navigates to /#work — this component picks that up and scrolls).
 */
export default function HashScroller() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Wait a tick for sections to mount, then scroll
    const id = window.location.hash.replace("#", "");
    if (!id) return;

    // Try a few times because some sections are wrapped in ScrollReveal
    // and may not be measurable on the first frame
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Clear the hash from the URL after scrolling so refresh doesn't keep scrolling
        history.replaceState(null, "", window.location.pathname);
      } else if (attempts < 10) {
        attempts += 1;
        setTimeout(tryScroll, 80);
      }
    };
    tryScroll();
  }, [pathname, searchParams]);

  return null;
}
