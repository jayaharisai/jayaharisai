"use client";

import { useState } from "react";
import styles from "./ImageDialog.module.css";

interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (src: string, width: string) => void;
}

export default function ImageDialog({ isOpen, onClose, onInsert }: ImageDialogProps) {
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState("100%");
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleUrlChange = (val: string) => {
    setUrl(val);
    setError("");
    if (val.startsWith("http")) setPreview(true);
  };

  const handleInsert = () => {
    if (!url.trim()) {
      setError("Please enter an image URL.");
      return;
    }
    if (!url.startsWith("http")) {
      setError("URL must start with http:// or https://");
      return;
    }
    onInsert(url, width);
    setUrl("");
    setWidth("100%");
    setPreview(false);
    onClose();
  };

  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlay}>
      <div className={styles.dialog}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <h3 className={styles.title}>Add Image</h3>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>Image URL</label>
            <input
              className={styles.input}
              type="text"
              placeholder="https://images.pexels.com/..."
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              autoFocus
            />
          </div>

          {preview && url && (
            <div className={styles.previewWrap}>
              <img src={url} alt="Preview" className={styles.previewImg} style={{ maxWidth: width }} onError={() => setError("Could not load image. Check the URL.")} />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Width</label>
            <div className={styles.widthRow}>
              <input
                className={styles.input}
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100%, 800px, 50vw, etc."
              />
              <div className={styles.widthPresets}>
                {["100%", "800px", "600px", "400px", "50%"].map((w) => (
                  <button key={w} className={`${styles.presetBtn} ${width === w ? styles.presetActive : ""}`} onClick={() => setWidth(w)}>{w}</button>
                ))}
              </div>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.insertBtn} onClick={handleInsert}>Insert Image</button>
        </div>
      </div>
    </div>
  );
}