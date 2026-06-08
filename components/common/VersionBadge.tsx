"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/VersionBadge.module.css";

interface VersionInfo {
  version: string;
  build: number;
  sha: string;
  deployedAt: string;
}

const FALLBACK: VersionInfo = {
  version: "1.0.1",
  build: 0,
  sha: "dev",
  deployedAt: new Date().toISOString(),
};

export default function VersionBadge() {
  const [info, setInfo] = useState<VersionInfo>(FALLBACK);

  useEffect(() => {
    fetch("/version.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("no version.json");
        return r.json();
      })
      .then((data: VersionInfo) => setInfo(data))
      .catch(() => {
        // Local dev: keep fallback
      });
  }, []);

  return (
    <div className={styles.badge}>
      <span className={styles.label}>v{info.version}</span>
    </div>
  );
}
