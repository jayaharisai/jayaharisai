"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { fetchPages, type PagePostData } from "@/lib/supabase";

export default function NotFound() {
  const pathname = usePathname();
  const [pageContent, setPageContent] = useState<PagePostData | null | "loading">("loading");

  useEffect(() => {
    // Check if the URL matches /pages/[slug]
    const match = pathname.match(/\/pages\/([^/]+)/);
    if (match) {
      const slug = match[1].replace(/\/$/, ""); // remove trailing slash
      (async () => {
        try {
          const pages = await fetchPages();
          const found = pages.find((p) => p.slug === slug);
          setPageContent(found || null);
        } catch {
          setPageContent(null);
        }
      })();
    } else {
      setPageContent(null);
    }
  }, [pathname]);

  // If this is a /pages/[slug] URL, render the page post content directly
  if (pageContent && pageContent !== "loading") {
    const post = pageContent;
    return (
      <div>
        <Navbar />
        <article style={{ maxWidth: 800, margin: "0 auto", padding: "120px 20px 80px" }}>
          <header style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 32, fontWeight: 300, margin: "0 0 8px", color: "#1a1a1a" }}>{post.title}</h1>
            <p style={{ fontSize: 14, color: "#888", margin: "0 0 12px" }}>{post.excerpt}</p>
            <div style={{ fontSize: 12, color: "#888", display: "flex", gap: 6 }}>
              <span>{post.author}</span>
              <span>·</span>
              <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
              <span>·</span>
              <span>{post.read_time}</span>
            </div>
          </header>
          <div
            style={{ lineHeight: 1.8, color: "#1a1a1a", fontSize: 15 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div style={{ marginTop: 40 }}>
            <Link href="/pages" style={{ color: "#734f96", fontSize: 13, textDecoration: "underline" }}>
              ← All pages
            </Link>
          </div>
        </article>
      </div>
    );
  }

  if (pageContent === "loading") {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <p style={{ color: "#888", fontSize: 14 }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Generic 404 page
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontSize: 48, fontWeight: 300, margin: "0 0 12px", color: "#1a1a1a" }}>404</h1>
        <p style={{ color: "#888", fontSize: 14, margin: "0 0 8px" }}>
          Page not found.
        </p>
        <Link href="/" style={{ color: "#734f96", fontSize: 14, textDecoration: "underline" }}>
          ← Back home
        </Link>
      </div>
    </div>
  );
}
