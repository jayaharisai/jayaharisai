import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import { ROADMAP_DATA } from "@/data/roadmaps";
import styles from "./roadmap-index.module.css";

export const metadata: Metadata = {
  title: "Roadmaps | Jayaharisai",
  description: "Practical learning paths for engineering and AI.",
};

export default function RoadmapIndexPage() {
  return (
    <div>
      <Navbar />
      <main className={styles.page}>
        <header className={styles.header}>
          <h1>Roadmaps</h1>
          <p>Practical learning paths built around skills, projects, and useful references.</p>
        </header>

        <div className={styles.list}>
          {ROADMAP_DATA.map((roadmap) => (
            <Link
              key={roadmap.id}
              href={`/roadmap/${roadmap.id}`}
              className={styles.item}
            >
              <div>
                <h2>{roadmap.title}</h2>
                <p>{roadmap.description}</p>
              </div>
              <span>Explore →</span>
            </Link>
          ))}
        </div>

        <Link href="/#roadmaps" className={styles.backLink}>
          ← Back home
        </Link>
      </main>
      <VersionBadge />
    </div>
  );
}
