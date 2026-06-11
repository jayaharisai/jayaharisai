"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import Link from "next/link";
import { fetchPages, deletePage, type PagePostData } from "@/lib/supabase";
import { getIdentityByKey } from "@/data/editor-keys";
import styles from "./pages.module.css";

const PLACEHOLDER_IMG = "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=1";

export default function PagesIndex() {
  const [pages, setPages] = useState<PagePostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirming, setDeleteConfirming] = useState<string | null>(null);
  const [deleteKey, setDeleteKey] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

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

  const handleDeleteClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteConfirming(slug);
    setDeleteKey("");
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirming || !deleteKey.trim()) return;

    const identity = getIdentityByKey(deleteKey);
    if (!identity) {
      setDeleteError("Invalid key. Please try again.");
      return;
    }

    setDeletingSlug(deleteConfirming);
    setDeleteError("");

    const result = await deletePage(deleteConfirming);
    setDeletingSlug(null);
    setDeleteConfirming(null);
    setDeleteKey("");

    if (result.success) {
      setPages((prev) => prev.filter((p) => p.slug !== deleteConfirming));
    } else {
      alert("Failed to delete: " + (result.error || "Unknown error"));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirming(null);
    setDeleteKey("");
    setDeleteError("");
  };

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
                {/* Delete button — visible only on hover, positioned top-right of card */}
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => handleDeleteClick(post.slug, e)}
                  title="Delete this page"
                >
                  delete
                </button>
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

      {/* Delete key verification modal */}
      {deleteConfirming && (
        <div className={styles.keyOverlay}>
          <div className={styles.keyModal}>
            <button className={styles.keyCloseBtn} onClick={handleDeleteCancel}>✕</button>
            <div className={styles.keyLockIcon}>🔑</div>
            <h2 className={styles.keyTitle}>Enter Editor Key</h2>
            <p className={styles.keyDesc}>Enter your editor key to confirm deletion of this page.</p>
            <div className={styles.keyInputRow}>
              <input
                type="password"
                className={styles.keyInput}
                placeholder="Enter your key..."
                value={deleteKey}
                onChange={(e) => { setDeleteKey(e.target.value); setDeleteError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") handleDeleteConfirm(); }}
                autoFocus
              />
              <button
                className={styles.keySubmit}
                onClick={handleDeleteConfirm}
                disabled={deletingSlug !== null}
              >
                {deletingSlug ? "Deleting..." : "Delete →"}
              </button>
            </div>
            {deleteError && <p className={styles.keyError}>{deleteError}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

/** Extract first image src from HTML content, or return null */
function extractCover(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}