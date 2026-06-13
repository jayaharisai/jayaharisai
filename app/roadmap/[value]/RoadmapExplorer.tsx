"use client";

import { useMemo, useRef, useState } from "react";
import type { RoadmapDetail, RoadmapTopic } from "@/data/roadmaps";
import {
  ROADMAP_SKILL_GUIDES,
  ROADMAP_TOPIC_SUPPLEMENTS,
  type RoadmapSkillGuide,
} from "@/data/roadmaps";
import styles from "./roadmap.module.css";

interface RoadmapExplorerProps {
  detail: RoadmapDetail;
}

export default function RoadmapExplorer({ detail }: RoadmapExplorerProps) {
  const [selectedTopicId, setSelectedTopicId] = useState(detail.startTopicId);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const detailRef = useRef<HTMLElement>(null);

  const topics = useMemo(
    () => detail.stages.flatMap((stage) => stage.topics),
    [detail.stages]
  );

  const selectedTopic = useMemo(() => {
    return (
      topics.find((topic) => topic.id === selectedTopicId) ??
      detail.stages[0].topics[0]
    );
  }, [detail.stages, selectedTopicId, topics]);

  const activeSkill = selectedSkill ?? selectedTopic.skills[0];
  const activeSkillGuide = getSkillGuide(activeSkill, selectedTopic);
  const topicSupplement = ROADMAP_TOPIC_SUPPLEMENTS.find(
    (item) => item.topicId === selectedTopic.id
  );

  const selectTopic = (topic: RoadmapTopic) => {
    setSelectedTopicId(topic.id);
    setSelectedSkill(topic.skills[0] ?? null);
    window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const scrollToStage = (stageId: string) => {
    const stage = document.getElementById(stageId);
    if (!stage) return;

    stage.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${stageId}`);
  };

  return (
    <>
      <nav className={styles.index} aria-label="Roadmap stages">
        <span className={styles.indexLabel}>Index</span>
        {detail.stages.map((stage) => (
          <a
            key={stage.id}
            href={`#${stage.id}`}
            className={styles.indexLink}
            onClick={(event) => {
              event.preventDefault();
              scrollToStage(stage.id);
            }}
          >
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
            <div className={styles.skillList}>
              {selectedTopic.skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className={skill === activeSkill ? styles.skillActive : ""}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            <article className={styles.skillGuide}>
              <span>Skill explainer</span>
              <h4>{activeSkill}</h4>
              <dl>
                <div>
                  <dt>What</dt>
                  <dd>{activeSkillGuide.what}</dd>
                </div>
                <div>
                  <dt>Why</dt>
                  <dd>{activeSkillGuide.why}</dd>
                </div>
                <div>
                  <dt>Where</dt>
                  <dd>{activeSkillGuide.where}</dd>
                </div>
              </dl>
            </article>
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

          {topicSupplement && (
            <div className={styles.detailGroup}>
              <h3>Industry stack</h3>
              <div className={styles.stackList}>
                {topicSupplement.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>

              <h3 className={styles.outcomeTitle}>You should be able to</h3>
              <ul className={styles.outcomeList}>
                {topicSupplement.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}
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

function normalizeSkill(skill: string) {
  return skill
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/\+/g, "p")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getSkillGuide(skill: string, topic: RoadmapTopic): RoadmapSkillGuide {
  const direct = ROADMAP_SKILL_GUIDES[normalizeSkill(skill)];
  if (direct) return direct;

  return {
    what: `${skill} is one of the core abilities inside ${topic.title}.`,
    why: `It matters because ${topic.title.toLowerCase()} becomes production-ready only when you understand the concept, not just the syntax or tool command.`,
    where: `You will use it while building ${topic.projects[0]?.title ?? "real projects"}, production services, internal platforms, and interview-level system discussions.`,
  };
}
