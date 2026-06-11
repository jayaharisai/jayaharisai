"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import Link from "next/link";
import { fetchPages, type PagePostData } from "@/lib/supabase";
import styles from "./pages.module.css";

const PLACEHOLDER_IMG = "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=1";

export default function PagesIndex() {
  const [pages, setPages] = useState<PagePostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPages();
        setPages(data);
      } catch {
        setPages([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.title}>Pages</h1>
        <p className={styles.subtitle}>
          Notes on MLOps, LLMOps, backend systems, and the craft of shipping software.
        </p>

        {/* Skeleton loading */}
        {loading && (
          <div className={styles.list}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={`${styles.skeletonImage} ${styles.skeleton}`} />
                <div className={styles.skeletonBody}>
                  <div className={`${styles.skeletonTitle} ${styles.skeleton}`} />
                  <div className={`${styles.skeletonExcerpt} ${styles.skeleton}`} />
                  <div className={`${styles.skeletonExcerptShort} ${styles.skeleton}`} />
                  <div className={`${styles.skeletonMeta} ${styles.skeleton}`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && pages.length === 0 && (
          <p style={{ textAlign: "center", color: "#888", marginTop: "2rem" }}>
            No published pages yet. Use the editor to create one.
          </p>
        )}

        {!loading && pages.length > 0 && (
          <div className={styles.list}>
            {pages.map((post) => (
              <Link
                key={post.slug}
                href={`/pages/${post.slug}`}
                className={styles.card}
              >
                <div className={styles.imageWrap}>
                  <img src={extractCover(post.content) || PLACEHOLDER_IMG} alt={post.title} className={styles.image} loading="lazy" decoding="async" />
                </div>
                <div className={styles.body}>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardMeta}>
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
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <VersionBadge />
    </div>
  );
}

/** Extract first image src from HTML content, or return null */
function extractCover(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}