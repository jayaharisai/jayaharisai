import Link from "next/link";
import styles from "@/styles/Work.module.css";
import { WORK_DATA } from "@/data/projects";

export default function Work() {
  // If no works data — show heading + message, but no "All Works →" link
  if (WORK_DATA.length === 0) {
    return (
      <div id="work" className={styles.page}>
        <h1 className={styles.title}>Works</h1>
        <p className={styles.emptyText}>
          No works added yet — stay tuned, building in progress
        </p>
      </div>
    );
  }

  return (
    <div id="work" className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Works</h1>
        <Link href="/works" className={styles.seeAll}>
          All Works →
        </Link>
      </div>

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
              <h3 className={styles.cardTitle}>{item.title}</h3>
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
    </div>
  );
}
