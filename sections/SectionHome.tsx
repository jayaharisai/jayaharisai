"use client";

import Image from "next/image";
import styles from "@/styles/SectionHome.module.css";
import { PROFILE_DATA } from "@/data/profile";
import { asset } from "@/lib/basePath";

export default function SectionHome() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="home" className={styles.sectionhome}>
      <div className={styles.heroLayout}>
        <div className={styles.sectionhomeContainer}>
          <div className={styles.welcomemessage}>
            <div>Hey</div>

            <div className={styles.shake}>
              <Image src={asset("/handshake.svg")} alt="Handshake" width={28} height={28} />
            </div>

            <div>, I&apos;m {PROFILE_DATA.name}</div>
          </div>

          <div className={styles.heading1}>
            {PROFILE_DATA.hero.title}
          </div>

          <div className={styles.description}>
            {PROFILE_DATA.hero.description}
          </div>

          <div className={styles.links}>
            <a
              href={PROFILE_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <Image src={asset("/open.svg")} alt="Open link" width={12} height={12} />
            </a>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
            >
              Resume
              <Image src={asset("/open.svg")} alt="Open link" width={12} height={12} />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contact Me
              <Image src={asset("/open.svg")} alt="Open link" width={12} height={12} />
            </a>
          </div>
        </div>

        <aside className={styles.signal} aria-label="Engineering approach">
          <div className={styles.signalHeader}>
            <span className={styles.signalStatus}>
              <i aria-hidden="true" />
              Engineering signal
            </span>
            <span>Now</span>
          </div>

          <div className={styles.signalIntro}>
            <p>{PROFILE_DATA.hero.signal.label}</p>
            <h2>{PROFILE_DATA.hero.signal.statement}</h2>
          </div>

          <div className={styles.systemFlow}>
            {PROFILE_DATA.hero.signal.flow.map((step) => (
              <div className={styles.flowStep} key={step.index}>
                <span>{step.index}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.principles}>
            <span>Operating principles</span>
            <div>
              {PROFILE_DATA.hero.signal.principles.map((principle) => (
                <p key={principle}>{principle}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
