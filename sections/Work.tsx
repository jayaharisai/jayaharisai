"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/Work.module.css";
import { WORK_DATA, type WorkItem } from "@/data/projects";

const INITIAL_VISIBLE = 4;

export default function Work() {
  const [active, setActive] = useState<WorkItem | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [closing, setClosing] = useState(false);
  const [target, setTarget] = useState({ x: 0, y: 0 });

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isCollapsing, setIsCollapsing] = useState(false);

  const refs = useRef<Record<number, HTMLDivElement | null>>({});

  const visibleItems = isCollapsing
    ? WORK_DATA
    : WORK_DATA.slice(0, visibleCount);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const handleCollapse = () => {
    setIsCollapsing(true);
    setTimeout(() => {
      setVisibleCount(INITIAL_VISIBLE);
      setIsCollapsing(false);
    }, 400);
  };


  const openCard = (item: WorkItem) => {
    const el = refs.current[item.id];
    if (!el) return;

    const r = el.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const finalWidth = vw * 0.4;

    const centerX = r.left + r.width / 2;

    let finalX = 0;

    if (centerX < vw / 3) finalX = 20;
    else if (centerX > (vw / 3) * 2) finalX = vw - finalWidth - 20;
    else finalX = (vw - finalWidth) / 2;

    const finalY = vh * 0.07;

    setTarget({ x: finalX, y: finalY });
    setRect(r);
    setActive(item);
    setClosing(false);
  };

  const closeCard = () => {
    setClosing(true);
    setTimeout(() => {
      setActive(null);
      setRect(null);
      setClosing(false);
    }, 400);
  };

  return (
    <div id="work" className={styles.page}>
      <h1 className={styles.title}>Work</h1>

      <div className={styles.grid}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              refs.current[item.id] = el;
            }}
            className={`${styles.card} ${isCollapsing && index >= INITIAL_VISIBLE ? styles.collapsingCard : ""}`}
            style={{ animationDelay: `${index * 0.08}s` }}
            onClick={() => openCard(item)}
          >
            <img src={item.image} className={styles.image} />
            <h3>{item.title}</h3>
            <p className={styles.desc}>{item.description}</p>

            <div className={styles.meta}>
              <span>{item.date}</span>
              <span> - </span>
              <span>{item.author}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.loadMoreWrapper}>
        {visibleCount < WORK_DATA.length ? (
          <button
            className={styles.loadMoreBtn}
            onClick={() => setVisibleCount(WORK_DATA.length)}
          >
            Load More
          </button>
        ) : (
          <button
            className={styles.loadMoreBtn}
            onClick={handleCollapse}
          >
            Collapse
          </button>
        )}
      </div>

      {active && rect && typeof document !== "undefined" && createPortal(
        <div className={`${styles.overlay} ${closing ? styles.overlayClosing : ""}`} onClick={closeCard}>
          <div
            className={`${styles.panel} ${closing ? styles.close : ""}`}
            style={
              {
                "--x": `${rect.left}px`,
                "--y": `${rect.top}px`,
                "--w": `${rect.width}px`,
                "--h": `${rect.height}px`,
                "--fx": `${target.x}px`,
                "--fy": `${target.y}px`,
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
          >
            <img src={active.image} className={styles.hero} />

            <div className={styles.content}>
              <h2>{active.title}</h2>
              <p className={styles.desc}>{active.description}</p>

              <h4>Blog</h4>
              {active.blog.map((b, i) => (
                <p key={i} className={styles.blogText}>
                  {b}
                </p>
              ))}

              <h4>Details</h4>
              <ul className={styles.detailsList}>
                {active.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <h4>Project</h4>
              <a className={styles.link} href={active.github}>
                View GitHub →
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
