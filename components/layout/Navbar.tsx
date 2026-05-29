"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/Navbar.module.css";
import { PROFILE_DATA } from "@/data/profile";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Trigger when in the middle of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ["home", "work", "about", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
    <nav className={styles.navbar}>
      <div className={styles.mydetail}>
        <div className={styles.profileimg}>
          <img src="myimage.jpg" alt="Profile" />
        </div>

        <div className={styles.username}>{PROFILE_DATA.email}</div>
      </div>

      <div className={styles.menu}>
        <div
          onClick={() => scrollToSection("work")}
          className={activeSection === "work" ? styles.active : ""}
        >
          Works
        </div>

        <div
          onClick={() => scrollToSection("about")}
          className={activeSection === "about" ? styles.active : ""}
        >
          About me/CV
        </div>
      </div>

      <div className={styles.primebtn}>
        <div onClick={() => scrollToSection("contact")}>
          Contact me
        </div>

        <div className={styles.usericon}>
          <img src="open.svg" alt="link" />
        </div>
      </div>
    </nav>
  );
}