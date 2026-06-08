import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import Link from "next/link";
import { PAGES, getPageBySlug } from "@/data/pages";
import styles from "./post.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render the known slugs at build time (required for `output: "export"`).
 *
 * If PAGES is empty, we return a single sentinel slug "_empty" so the
 * build still succeeds. The page component shows a friendly "no data"
 * state for that sentinel slug.
 */
export function generateStaticParams() {
  if (PAGES.length === 0) {
    return [{ slug: "_empty" }];
  }
  return PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "_empty") return { title: "No posts yet" };
  const post = getPageBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} | Jayaharisai`,
    description: post.excerpt,
  };
}

export default async function PagePost({ params }: PageProps) {
  const { slug } = await params;

  // Friendly "no data yet" state — shown for the sentinel and for any
  // unrecognised slug while the data array is empty.
  if (slug === "_empty" || PAGES.length === 0) {
    return (
      <div>
        <Navbar />
        <article className={styles.article}>
          <h1 className={styles.title}>No posts yet</h1>
          <p className={styles.excerpt}>
            You haven't added any pages yet. Open <code>data/pages.ts</code>,
            copy a template from <code>data/_samples.ts</code>, and add it to
            the <code>PAGES</code> array.
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

  const post = getPageBySlug(slug);
  if (!post) notFound();

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
            <span>{post.readTime}</span>
          </div>
        </header>

        {post.cover && (
          <img src={post.cover} alt={post.title} className={styles.cover} loading="lazy" decoding="async" />
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
