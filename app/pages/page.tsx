import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import Link from "next/link";
import { PAGES } from "@/data/pages";
import styles from "./pages.module.css";

export const metadata: Metadata = {
  title: "Pages | Jayaharisai",
  description: "Pages on MLOps, LLMOps, backend systems, and engineering.",
};

export default function PagesIndex() {
  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.title}>Pages</h1>
        <p className={styles.subtitle}>
          Notes on MLOps, LLMOps, backend systems, and the craft of shipping software.
        </p>

        <div className={styles.list}>
          {PAGES.map((post) => (
            <Link
              key={post.slug}
              href={`/pages/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <img src={post.cover} alt={post.title} className={styles.image} loading="lazy" decoding="async" />
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
                  <span>{post.readTime}</span>
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
      </div>
      <VersionBadge />
    </div>
  );
}
