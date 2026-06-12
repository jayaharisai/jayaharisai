import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import { ROADMAP_DATA, ROADMAP_DETAILS } from "@/data/roadmaps";
import RoadmapExplorer from "./RoadmapExplorer";
import styles from "./roadmap.module.css";

interface PageProps {
  params: Promise<{ value: string }>;
}

export function generateStaticParams() {
  return ROADMAP_DATA.map((roadmap) => ({ value: roadmap.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { value } = await params;
  const roadmap = ROADMAP_DATA.find((item) => item.id === value);

  return {
    title: roadmap ? `${roadmap.title} Roadmap | Jayaharisai` : "Roadmap not found",
    description: roadmap?.description,
  };
}

export default async function RoadmapDetailPage({ params }: PageProps) {
  const { value } = await params;
  const roadmap = ROADMAP_DATA.find((item) => item.id === value);
  const detail = ROADMAP_DETAILS.find((item) => item.roadmapId === value);

  if (!roadmap) notFound();

  return (
    <div>
      <Navbar />
      <main className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Roadmap</p>
          <h1 className={styles.title}>{roadmap.title}</h1>
          <p className={styles.description}>{roadmap.description}</p>
        </header>

        {detail ? (
          <RoadmapExplorer detail={detail} />
        ) : (
          <section className={styles.comingSoon}>
            <h2>Full roadmap coming soon</h2>
            <p>{roadmap.tooltip}</p>
          </section>
        )}

        <div className={styles.footer}>
          <Link href="/#roadmaps" className={styles.backLink}>
            ← All roadmaps
          </Link>
        </div>
      </main>
      <VersionBadge />
    </div>
  );
}
