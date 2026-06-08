import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import Link from "next/link";
import { WORK_DATA } from "@/data/projects";
import styles from "./works.module.css";

export const metadata: Metadata = {
  title: "All Works | Jayaharisai",
  description: "A complete collection of my projects and work.",
};

export default function WorksIndex() {
  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.title}>All Works</h1>
        <p className={styles.subtitle}>
          A complete collection of my projects — from MLOps platforms to backend systems.
        </p>

        {WORK_DATA.length === 0 ? (
          <p className={styles.emptyText}>No works yet — coming soon.</p>
        ) : (
          <div className={styles.list}>
            {WORK_DATA.map((item) => (
              <Link
                key={item.id}
                href={`/works/${item.id}`}
                className={styles.card}
              >
                <div className={styles.imageWrap}>
                  <img src={item.image} alt={item.title} className={styles.image} loading="lazy" decoding="async" />
                </div>
                <div className={styles.body}>
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  <p className={styles.cardExcerpt}>{item.description}</p>
                  <div className={styles.cardMeta}>
                    <span>{item.date}</span>
                    <span className={styles.dot}>·</span>
                    <span>{item.author}</span>
                  </div>
                  <div className={styles.tags}>
                    {(item.tags ?? item.blog).map((tag) => (
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
