import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import Link from "next/link";
import { WORK_DATA } from "@/data/projects";
import styles from "./work.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Pre-render known ids at build time (required for `output: "export"`).
 *
 * If WORK_DATA is empty, we return a single sentinel id "_empty" so the
 * build still succeeds. The page component shows a friendly "no data" state
 * for that sentinel id and for any other id not found in WORK_DATA.
 */
export function generateStaticParams() {
  if (WORK_DATA.length === 0) {
    return [{ id: "_empty" }];
  }
  return WORK_DATA.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (id === "_empty") return { title: "No works yet" };
  const work = WORK_DATA.find((w) => String(w.id) === id);
  if (!work) return { title: "Not found" };
  return {
    title: `${work.title} | Jayaharisai`,
    description: work.description,
  };
}

export default async function WorkDetail({ params }: PageProps) {
  const { id } = await params;

  // Friendly "no data yet" state — shown for the sentinel and for any
  // unrecognised id while the data array is empty.
  if (id === "_empty" || WORK_DATA.length === 0) {
    return (
      <div>
        <Navbar />
        <article className={styles.article}>
          <h1 className={styles.title}>No works yet</h1>
          <p className={styles.excerpt}>
            You haven't added any works yet. Open <code>data/projects.ts</code>,
            copy a template from <code>data/_samples.ts</code>, and add it to
            the <code>WORK_DATA</code> array.
          </p>
          <div className={styles.footer}>
            <Link href="/works" className={styles.backLink}>
              ← All works
            </Link>
          </div>
        </article>
        <VersionBadge />
      </div>
    );
  }

  const work = WORK_DATA.find((w) => String(w.id) === id);
  if (!work) notFound();

  const tags = work.tags ?? work.blog;

  return (
    <div>
      <Navbar />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{work.title}</h1>
          <p className={styles.excerpt}>{work.description}</p>
          <div className={styles.meta}>
            <span className={styles.author}>{work.author}</span>
            <span className={styles.dot}>·</span>
            <span>{work.date}</span>
          </div>
        </header>

        <img
          src={work.cover ?? work.image}
          alt={work.title}
          className={styles.cover}
          loading="lazy"
          decoding="async"
        />

        {work.longDescription && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: work.longDescription }}
          />
        )}

        {work.details && work.details.length > 0 && (
          <section className={styles.section}>
            <h2>Highlights</h2>
            <ul className={styles.detailsList}>
              {work.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </section>
        )}

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {work.github && work.github !== "#" && (
          <a
            href={work.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            View on GitHub →
          </a>
        )}

        <div className={styles.footer}>
          <Link href="/works" className={styles.backLink}>
            ← All works
          </Link>
        </div>
      </article>
      <VersionBadge />
    </div>
  );
}
