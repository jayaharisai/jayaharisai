"use client";

import styles from "@/styles/SectionHome.module.css";
import { PROFILE_DATA } from "@/data/profile";

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
      <div className={styles.sectionhomeContainer}>
        <div className={styles.welcomemessage}>
          <div>Hey</div>

          <div className={styles.shake}>
            <img src="handshake.svg" alt="Handshake" />
          </div>

          <div>, I'm {PROFILE_DATA.name}</div>
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
            <img src="open.svg" alt="Open link" />
          </a>

          <div onClick={() => scrollToSection("about")}>
            Resume
            <img src="open.svg" alt="Open link" />
          </div>

          <div onClick={() => scrollToSection("contact")}>
            Contact Me
            <img src="open.svg" alt="Open link" />
          </div>
        </div>
      </div>
    </section>
  );
}

