"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Roadmaps.module.css";
import { ROADMAP_DATA } from "@/data/roadmaps";
import { asset } from "@/lib/basePath";

export default function Roadmaps() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="roadmaps" className={styles.page}>
      <button
        type="button"
        className={`${styles.backdrop} ${expandedId ? styles.backdropVisible : ""}`}
        onClick={() => setExpandedId(null)}
        aria-label="Close roadmap details"
        tabIndex={expandedId ? 0 : -1}
      />

      <div className={styles.headerRow}>
        <h1 className={styles.title}>Roadmaps</h1>
      </div>

      <div className={styles.grid}>
        {ROADMAP_DATA.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}
              onClick={() => handleClick(item.id)}
              aria-expanded={isExpanded}
            >
              <div className={styles.cardMain}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <span className={styles.detailsBtn}>
                  {isExpanded ? "Show less" : "Details →"}
                </span>
              </div>

              <div
                className={styles.expandedContent}
                onClick={(e) => e.stopPropagation()}
                aria-hidden={!isExpanded}
              >
                <p>{item.tooltip}</p>
                <Link
                  href={`/roadmap/${item.id}`}
                  className={styles.fullPageLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  View full roadmap
                  <Image src={asset("/open.svg")} alt="" width={11} height={11} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
