"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import RichEditor from "./RichEditor";
import { getIdentityByKey, type EditorIdentity } from "@/data/editor-keys";
import styles from "./AddPageModal.module.css";

interface AddPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    excerpt: string;
    tags: string;
    cover: string;
    content: string;
    author?: string;
  }) => Promise<void>;
}

export default function AddPageModal({ isOpen, onClose, onSave }: AddPageModalProps) {
  const [mounted, setMounted] = useState(false);
  const [key, setKey] = useState("");
  const [identity, setIdentity] = useState<EditorIdentity | null>(null);
  const [keyError, setKeyError] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleKeySubmit = () => {
    const found = getIdentityByKey(key);
    if (found) {
      localStorage.setItem("editor_key", key);
      localStorage.setItem("editor_name", found.name);
      setIdentity(found);
      setKeyError("");
    } else {
      setKeyError("Invalid key. Please try again.");
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setSaveError("Title is required");
      return;
    }
    if (!content.trim()) {
      setSaveError("Content is required");
      return;
    }

    setSaving(true);
    setSaveError("");
    try {
      await onSave({
        title,
        excerpt,
        tags,
        cover,
        content,
        author: identity?.name || "Anonymous",
      });
      resetForm();
      onClose();
    } catch (err: any) {
      setSaveError(err.message || "Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setTags("");
    setCover("");
    setContent("");
    setIdentity(null);
    setKey("");
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (identity) {
        if (window.confirm("Discard your changes and close?")) {
          resetForm();
          onClose();
        }
      } else {
        onClose();
      }
    }
  };

  const handleClose = () => {
    if (identity) {
      if (window.confirm("Discard your changes and close?")) {
        resetForm();
        onClose();
      }
    } else {
      onClose();
    }
  };

  const modal = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose}>✕</button>

        {!identity ? (
          <div className={styles.keyGate}>
            <div className={styles.lockIcon}>🔑</div>
            <h2 className={styles.gateTitle}>Enter Editor Key</h2>
            <p className={styles.gateDesc}>
              Use your key to unlock the editor. You can use your name or email.
            </p>
            <div className={styles.keyInputRow}>
              <input
                type="password"
                className={styles.keyInput}
                placeholder="Enter your key..."
                value={key}
                onChange={(e) => { setKey(e.target.value); setKeyError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") handleKeySubmit(); }}
                autoFocus
              />
              <button className={styles.keySubmit} onClick={handleKeySubmit}>Unlock →</button>
            </div>
            {keyError && <p className={styles.error}>{keyError}</p>}
          </div>
        ) : (
          <div className={styles.editorSection}>
            <div className={styles.editorHeader}>
              <h2 className={styles.editorHeading}>Create New Page</h2>
              <span className={styles.editorBadge}>✍ {identity.name}</span>
            </div>

            <div className={styles.metaFields}>
              <input type="text" className={styles.metaInput} placeholder="Post title *" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input type="text" className={styles.metaInput} placeholder="Short excerpt / summary" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
              <div className={styles.metaRow}>
                <input type="text" className={styles.metaInput} placeholder="Tags (comma separated, e.g. React, Web)" value={tags} onChange={(e) => setTags(e.target.value)} />
                <input type="text" className={styles.metaInput} placeholder="Cover image URL (optional)" value={cover} onChange={(e) => setCover(e.target.value)} />
              </div>
            </div>

            <RichEditor content={content} onChange={setContent} placeholder="Start writing your blog post..." />

            {saveError && <p className={styles.error}>{saveError}</p>}

            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={() => {
                if (window.confirm("Discard your changes?")) {
                  resetForm();
                  onClose();
                }
              }}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Publish Page →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}