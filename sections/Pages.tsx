import Link from "next/link";
import styles from "@/styles/Pages.module.css";
import { PAGES } from "@/data/pages";

export default function Pages() {
  // If no pages data — show heading + message, but no "All Pages →" link
  if (PAGES.length === 0) {
    return (
      <div id="pages" className={styles.page}>
        <h1 className={styles.title}>Pages</h1>
        <p className={styles.emptyText}>No pages yet — coming soon.</p>
      </div>
    );
  }

  return (
    <div id="pages" className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Pages</h1>
        <Link href="/pages" className={styles.seeAll}>
          All Pages →
        </Link>
      </div>

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
              <h3 className={styles.cardTitle}>{post.title}</h3>
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
  );
}
