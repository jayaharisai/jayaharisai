"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../styles/Navbar.module.css";
import { PROFILE_DATA } from "@/data/profile";
import { asset, BASE_PATH } from "@/lib/basePath";

const HOME_PATH = "/"; // Next.js router auto-prepends basePath from next.config.ts
const SECTIONS = ["home", "work", "about", "pages", "roadmaps", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // When true, we IGNORE observer updates so the highlighted section
  // doesn't flicker during smooth-scroll (user-initiated OR browser-restored).
  const suppressObserver = useRef(false);

  // True only when we're on the home page
  // In production basePath is /jayaharisai, so pathname is "/jayaharisai/"
  // In dev, pathname is "/"
  const isHome =
    pathname === HOME_PATH ||
    pathname === `${BASE_PATH}/` ||
    pathname === "/";

  // Scroll-spy: track which section is closest to the top of the viewport
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    // ---- INITIAL SETUP ----
    // Determine the correct section to highlight on first paint.
    // This is computed SYNCHRONOUSLY based on the current scroll position
    // (no observer round-trip) so we don't get a flash of the wrong highlight.
    const initialPick = (): string => {
      // If the URL has a hash (e.g. /#work from cross-page nav), honor that
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        if ((SECTIONS as readonly string[]).includes(id)) return id;
      }
      // Otherwise pick the section whose top is closest to (but past) the
      // current scroll position, accounting for the navbar offset.
      const navbarOffset = 80;
      const scrollY = window.scrollY + navbarOffset;
      let bestId: string = SECTIONS[0];
      let bestTop = -Infinity;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollY && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }
      return bestId;
    };

    // Lock the observer while we set the initial highlight and let any
    // browser-initiated smooth scroll complete.
    suppressObserver.current = true;
    setActiveSection(initialPick());
    // Release the lock after 1000ms — enough for browser scroll restoration
    // to finish on slow devices.
    const releaseTimer = window.setTimeout(() => {
      suppressObserver.current = false;
    }, 1000);

    // ---- OBSERVER ----
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        if (suppressObserver.current) return;

        // Pick the section with the highest intersection ratio.
        // Ties broken by source order in SECTIONS.
        let bestId = "";
        let bestRatio = 0;
        for (const id of SECTIONS) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestId) setActiveSection(bestId);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px",
      }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.clearTimeout(releaseTimer);
      observer.disconnect();
    };
  }, [isHome]);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleScroll = () => {
      setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  /**
   * On the home page: smoothly scroll to the section and pin the highlight.
   * On any other page: navigate to home, then scroll to the section after load.
   */
  const scrollToSection = (id: SectionId) => {
    setMobileMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        suppressObserver.current = true;
        setActiveSection(id);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => {
          suppressObserver.current = false;
        }, 900);
      }
    } else {
      router.push(`${HOME_PATH}#${id}`);
    }
  };

  /**
   * Email/brand area: always go to the top of the home page.
   */
  const goHome = () => {
    setMobileMenuOpen(false);
    if (isHome) {
      suppressObserver.current = true;
      setActiveSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.setTimeout(() => {
        suppressObserver.current = false;
      }, 900);
    } else {
      // Use window.location for reliable navigation on static export
      window.location.href = BASE_PATH ? `${BASE_PATH}/` : "/";
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      {/* Desktop: left side - profile + email */}
      <div
        className={styles.mydetail}
        onClick={goHome}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") goHome();
        }}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.profileimg}>
          <img src={asset("/myimage.jpg")} alt="Profile" />
        </div>

        <div className={styles.username}>{PROFILE_DATA.email}</div>
      </div>

      {/* Desktop: center menu */}
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

        <div
          onClick={() => scrollToSection("pages")}
          className={activeSection === "pages" ? styles.active : ""}
        >
          Pages
        </div>

        <div
          onClick={() => scrollToSection("roadmaps")}
          className={activeSection === "roadmaps" ? styles.active : ""}
        >
          Roadmaps
        </div>
      </div>

      {/* Desktop: contact button */}
      <div className={styles.primebtn}>
        <div className={styles.primebtninner} onClick={() => scrollToSection("contact")}>
          Contact me
        </div>

        <div className={styles.usericon}>
          <img src={asset("/open.svg")} alt="link" />
        </div>
      </div>

      {/* Mobile: hamburger area - profile + menu toggle */}
      <div className={styles.mobileBar}>
        <div
          className={styles.mobileCenter}
          onClick={goHome}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") goHome();
          }}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.profileimg}>
            <img src={asset("/myimage.jpg")} alt="Profile" />
          </div>
        </div>

        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ""}`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile: dropdown overlay */}
      <div
        className={`${styles.mobileDropdown} ${mobileMenuOpen ? styles.mobileDropdownOpen : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={styles.mobileDropdownContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => scrollToSection("work")}
            className={`${styles.mobileMenuItem} ${activeSection === "work" ? styles.active : ""}`}
          >
            Works
          </div>

          <div
            onClick={() => scrollToSection("about")}
            className={`${styles.mobileMenuItem} ${activeSection === "about" ? styles.active : ""}`}
          >
            About me/CV
          </div>

          <div
            onClick={() => scrollToSection("pages")}
            className={`${styles.mobileMenuItem} ${activeSection === "pages" ? styles.active : ""}`}
          >
            Pages
          </div>

          <div
            onClick={() => scrollToSection("roadmaps")}
            className={`${styles.mobileMenuItem} ${activeSection === "roadmaps" ? styles.active : ""}`}
          >
            Roadmaps
          </div>

          <div className={styles.mobileContactBtn} onClick={() => scrollToSection("contact")}>
            <span>Contact me</span>
            <div className={styles.usericon}>
              <img src={asset("/open.svg")} alt="link" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}