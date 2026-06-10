"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/Pages.module.css";
import { fetchPages, type PagePostData } from "@/lib/supabase";

export default function Pages() {
  const router = useRouter();
  const [pages, setPages] = useState<PagePostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPages();
        setPages(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (pages.length === 0 && !loading) {
    return (
      <div id="pages" className={styles.page}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Pages</h1>
          <div className={styles.headerActions}>
            <Link href="/pages" className={styles.seeAll}>
              All Pages →
            </Link>
            <button className={styles.addBtn} onClick={() => router.push("/editor/new")} title="Add new page">
              + Add Page
            </button>
          </div>
        </div>
        <p className={styles.emptyText}>No pages yet — coming soon. Click "+ Add Page" to create one.</p>
      </div>
    );
  }

  return (
    <div id="pages" className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Pages</h1>
        <div className={styles.headerActions}>
          <Link href="/pages" className={styles.seeAll}>
            All Pages →
          </Link>
          <button className={styles.addBtn} onClick={() => router.push("/editor/new")} title="Add new page">
            + Add Page
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {pages.map((post) => (
          <Link key={post.slug} href={`/pages/${post.slug}`} className={styles.card}>
            {extractCover(post.content) && (
              <div className={styles.imageWrap}>
                <img src={extractCover(post.content)!} alt={post.title} className={styles.image} loading="lazy" decoding="async" />
              </div>
            )}
            <div className={styles.body}>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <div className={styles.cardMeta}>
                <span>{post.author}</span>
                <span className={styles.dot}>·</span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                <span className={styles.dot}>·</span>
                <span>{post.read_time}</span>
              </div>
              <div className={styles.tags}>
                {post.tags.map((tag) => (<span key={tag} className={styles.tag}>{tag}</span>))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Extract first image src from HTML content, or return null */
function extractCover(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}