"use client";

import { useMemo, useRef, useState } from "react";
import type { RoadmapDetail, RoadmapTopic } from "@/data/roadmaps";
import styles from "./roadmap.module.css";

interface RoadmapExplorerProps {
  detail: RoadmapDetail;
}

export default function RoadmapExplorer({ detail }: RoadmapExplorerProps) {
  const [selectedTopicId, setSelectedTopicId] = useState(detail.startTopicId);
  const detailRef = useRef<HTMLElement>(null);

  const selectedTopic = useMemo(() => {
    return (
      detail.stages
        .flatMap((stage) => stage.topics)
        .find((topic) => topic.id === selectedTopicId) ??
      detail.stages[0].topics[0]
    );
  }, [detail.stages, selectedTopicId]);

  const selectTopic = (topic: RoadmapTopic) => {
    setSelectedTopicId(topic.id);
    window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <nav className={styles.index} aria-label="Roadmap stages">
        <span className={styles.indexLabel}>Index</span>
        {detail.stages.map((stage) => (
          <a key={stage.id} href={`#${stage.id}`} className={styles.indexLink}>
            <span>{stage.index}</span>
            {stage.title}
          </a>
        ))}
      </nav>

      <section ref={detailRef} className={styles.topicDetail} aria-live="polite">
        <div className={styles.detailIntro}>
          <div className={styles.topicMeta}>
            <span>{selectedTopic.level}</span>
            <span>{selectedTopic.duration}</span>
          </div>
          <p className={styles.detailLabel}>Selected topic</p>
          <h2>{selectedTopic.title}</h2>
          <p className={styles.detailDescription}>{selectedTopic.description}</p>
        </div>

        <div className={styles.detailColumns}>
          <div className={styles.detailGroup}>
            <h3>Core skills</h3>
            <ul className={styles.skillList}>
              {selectedTopic.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className={styles.detailGroup}>
            <h3>Build next</h3>
            <div className={styles.projectList}>
              {selectedTopic.projects.map((project) => (
                <article key={project.title} className={styles.project}>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.detailGroup}>
            <h3>References</h3>
            <div className={styles.resourceList}>
              {selectedTopic.resources.map((resource) => (
                <a
                  key={`${resource.type}-${resource.label}`}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{resource.type}</span>
                  {resource.label}
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapHeading}>
          <div>
            <p className={styles.detailLabel}>Interactive learning map</p>
            <h2>Start small. Branch when the foundation feels natural.</h2>
          </div>
          <p>{detail.intro}</p>
        </div>

        <div className={styles.stages}>
          {detail.stages.map((stage) => (
            <section key={stage.id} id={stage.id} className={styles.stage}>
              <header className={styles.stageHeader}>
                <span>{stage.index}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </header>

              <div className={styles.branch}>
                {stage.topics.map((topic) => {
                  const isSelected = topic.id === selectedTopic.id;

                  return (
                    <button
                      key={topic.id}
                      type="button"
                      className={`${styles.topicNode} ${
                        isSelected ? styles.topicNodeSelected : ""
                      }`}
                      onClick={() => selectTopic(topic)}
                      aria-pressed={isSelected}
                    >
                      <span className={styles.nodeLevel}>{topic.level}</span>
                      <strong>{topic.title}</strong>
                      <small>{topic.summary}</small>
                      <span className={styles.nodeAction}>
                        {isSelected ? "Viewing topic" : "Explore topic"} →
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
