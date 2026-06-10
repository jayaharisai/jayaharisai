"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import Link from "next/link";
import { fetchPages, type PagePostData } from "@/lib/supabase";
import styles from "./post.module.css";

export default function PagePostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<PagePostData | null | "loading">("loading");

  useEffect(() => {
    (async () => {
      try {
        const pages = await fetchPages();
        const found = pages.find((p) => p.slug === slug);
        setPost(found || null);
      } catch {
        setPost(null);
      }
    })();
  }, [slug]);

  if (post === "loading") {
    return (
      <div>
        <Navbar />
        <article className={styles.article}>
          <p style={{ textAlign: "center", marginTop: "3rem", color: "#888" }}>Loading...</p>
        </article>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Navbar />
        <article className={styles.article}>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.excerpt}>
            This page doesn't exist yet. Create it from the editor.
          </p>
          <div className={styles.footer}>
            <Link href="/pages" className={styles.backLink}>
              ← All pages
            </Link>
          </div>
        </article>
        <VersionBadge />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.meta}>
            <span className={styles.author}>{post.author}</span>
            <span className={styles.dot}>·</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className={styles.dot}>·</span>
            <span>{post.read_time}</span>
          </div>
        </header>

        {extractCover(post.content) && (
          <img src={extractCover(post.content)!} alt={post.title} className={styles.cover} loading="lazy" decoding="async" />
        )}

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/pages" className={styles.backLink}>
            ← All pages
          </Link>
        </div>
      </article>
      <VersionBadge />
    </div>
  );
}

/** Extract first image src from HTML content, or return null */
function extractCover(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}