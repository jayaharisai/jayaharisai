"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { getIdentityByKey, type EditorIdentity } from "@/data/editor-keys";
import { savePage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import ImageDialog from "./ImageDialog";
import styles from "./FullPageEditor.module.css";

const fonts = [
  "Inter", "Arial", "Helvetica", "Georgia",
  "Times New Roman", "Courier New", "Verdana",
];

export default function FullPageEditor() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const [identity, setIdentity] = useState<EditorIdentity | null>(null);
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveErr, setSaveErr] = useState("");
  const [slashOpen, setSlashOpen] = useState(false);
  const [slashSearch, setSlashSearch] = useState("");
  const [slashPos, setSlashPos] = useState({ top: 0, left: 0 });
  const [bubblePos, setBubblePos] = useState<{ top: number; left: number } | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [pendingSlashAction, setPendingSlashAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem("editor_key");
    if (savedKey) {
      const found = getIdentityByKey(savedKey);
      if (found) setIdentity(found);
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5] } }),
      Underline,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Type '/' for commands, or start writing..." }),
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: "",
    editorProps: {
      attributes: { class: styles.editor },
      handleKeyDown: (view, event) => {
        if (event.key === "/" && !slashOpen) {
          const sel = view.state.selection;
          if (sel.empty) {
            const coords = view.coordsAtPos(sel.from);
            setSlashPos({ top: coords.bottom + 4, left: coords.left });
            setSlashOpen(true);
            setSlashSearch("");
          }
          return false;
        }
        if (event.key === "Escape" && slashOpen) {
          setSlashOpen(false);
          return true;
        }
        if (slashOpen && event.key.length === 1) {
          const sel = view.state.selection;
          const text = view.state.doc.textBetween(Math.max(0, sel.from - 15), sel.from);
          const slashIdx = text.lastIndexOf("/");
          if (slashIdx >= 0) setSlashSearch(text.slice(slashIdx + 1));
        }
        if (event.key === "Backspace" && slashOpen) {
          setSlashSearch((prev) => prev.slice(0, -1));
          return false;
        }
        return false;
      },
    },
  });

  useEffect(() => {
    const handleMouseUp = () => {
      if (!editor) return;
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setBubblePos({ top: rect.top - 8, left: rect.left + rect.width / 2 });
      } else {
        setBubblePos(null);
      }
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [editor]);

  const handleKeySubmit = () => {
    const found = getIdentityByKey(key);
    if (found) {
      localStorage.setItem("editor_key", key);
      localStorage.setItem("editor_name", found.name);
      setIdentity(found);
      setKeyError("");
    } else {
      setKeyError("Invalid key. Try using your name or email.");
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !editor) { setSaveErr("Title is required"); return; }
    const content = editor.getHTML();
    if (!content.trim()) { setSaveErr("Content is required"); return; }
    setSaving(true);
    setSaveErr("");

    // Auto-generate excerpt from the first ~150 chars of text content if not filled in
    let finalExcerpt = excerpt.trim();
    if (!finalExcerpt) {
      const textContent = editor.getText();
      finalExcerpt = textContent.slice(0, 150).trim();
      if (finalExcerpt.length >= 150) finalExcerpt += "…";
    }

    try {
      const result = await savePage({
        title, excerpt: finalExcerpt, tags, cover, content,
        author: identity?.name || "Jayaharisai",
      });
      if (result.success) {
        setSaved(true);
        setTimeout(() => router.push(`/pages/${result.slug}`), 1000);
      } else {
        setSaveErr(result.error || "Failed to save. Run the migration SQL first.");
      }
    } catch (err: any) {
      setSaveErr(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!identity) {
    return (
      <div className={styles.keyGatePage}>
        <div className={styles.keyGateBox}>
          <div className={styles.lockIcon}>🔑</div>
          <h2 className={styles.gateTitle}>Editor Access</h2>
          <p className={styles.gateDesc}>Enter your editor key to continue.</p>
          <div className={styles.keyInputRow}>
            <input
              type="password" className={styles.keyInput} placeholder="your key or email..."
              value={key} onChange={(e) => { setKey(e.target.value); setKeyError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") handleKeySubmit(); }} autoFocus
            />
            <button className={styles.keySubmit} onClick={handleKeySubmit}>Unlock</button>
          </div>
          {keyError && <p className={styles.error}>{keyError}</p>}
          <button className={styles.backHomeBtn} onClick={() => router.push("/")}>← Back home</button>
        </div>
      </div>
    );
  }

  if (!editor) return null;

  return (
    <div className={styles.page}>
      {saved && <div className={styles.savedBanner}>✓ Published! Redirecting...</div>}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => router.push("/")}>← Back</button>
        <div className={styles.topbarCenter}>
          <span className={styles.authorBadge}>✍ {identity.name}</span>
        </div>
        <div className={styles.topbarRight}>
          <button className={styles.publishBtn} onClick={handleSave} disabled={saving || !title.trim()}>
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
      <div className={styles.editorWrapper} ref={editorRef}>
        <input className={styles.titleInput} placeholder="Untitled" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          className={styles.excerptInput}
          placeholder="Short description (optional — auto-generated from content if empty)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
        />
        {saveErr && <p className={styles.saveError}>{saveErr}</p>}
        <EditorContent editor={editor} className={styles.editorContent} />
        {bubblePos && (
          <div className={styles.bubbleMenu} style={{ position: "fixed", top: bubblePos.top - 50, left: bubblePos.left, transform: "translateX(-50%)", zIndex: 9999 }}>
            <button onClick={() => { editor.chain().focus().toggleBold().run(); setBubblePos(null); }} className={`${styles.bubbleBtn} ${editor.isActive("bold") ? styles.bubbleActive : ""}`}><strong>B</strong></button>
            <button onClick={() => { editor.chain().focus().toggleItalic().run(); setBubblePos(null); }} className={`${styles.bubbleBtn} ${editor.isActive("italic") ? styles.bubbleActive : ""}`}><em>I</em></button>
            <button onClick={() => { editor.chain().focus().toggleUnderline().run(); setBubblePos(null); }} className={`${styles.bubbleBtn} ${editor.isActive("underline") ? styles.bubbleActive : ""}`}><u>U</u></button>
            <span className={styles.bubbleDivider} />
            <button onClick={() => { editor.chain().focus().toggleStrike().run(); setBubblePos(null); }} className={`${styles.bubbleBtn} ${editor.isActive("strike") ? styles.bubbleActive : ""}`}><s>S</s></button>
            <button onClick={() => { editor.chain().focus().toggleHighlight().run(); setBubblePos(null); }} className={`${styles.bubbleBtn} ${editor.isActive("highlight") ? styles.bubbleActive : ""}`}><span style={{ background: "#fff176" }}>H</span></button>
            <span className={styles.bubbleDivider} />
            <select className={styles.bubbleFontSelect} value={editor.getAttributes("textStyle").fontFamily || ""} onChange={(e) => {
              const v = e.target.value;
              v ? editor.chain().focus().setFontFamily(v).run() : editor.chain().focus().unsetFontFamily().run();
              setBubblePos(null);
            }}>
              <option value="">Font</option>
              {fonts.map((f) => (<option key={f} value={f} style={{ fontFamily: f }}>{f}</option>))}
            </select>
          </div>
        )}
        {slashOpen && <div className={styles.slashOverlay} onClick={() => setSlashOpen(false)} />}
        {slashOpen && (
          <SlashMenu
            editor={editor}
            search={slashSearch}
            position={slashPos}
            onSelect={() => {
              const sel = editor.state.selection;
              const text = editor.state.doc.textBetween(Math.max(0, sel.from - 15), sel.from);
              const slashIdx = text.lastIndexOf("/");
              const from = slashIdx >= 0 ? sel.from - (text.length - slashIdx) : sel.from;
              editor.chain().focus().deleteRange({ from, to: sel.from }).run();
            }}
            onClose={() => setSlashOpen(false)}
            onOpenImage={() => setImageDialogOpen(true)}
          />
        )}
      </div>
     
      <ImageDialog
        isOpen={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onInsert={(src, width) => {
          if (editor) {
            const widthStyle = width ? ` width="${width}"` : "";
            editor.chain().focus().insertContent(`<img src="${src}"${widthStyle} />`).run();
          }
        }}
      />
    </div>
  );
}

function SlashMenu({ editor, search, position, onSelect, onClose, onOpenImage }: {
  editor: any; search: string; position: { top: number; left: number }; onSelect: () => void; onClose: () => void; onOpenImage?: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = [
    { id: "h1", label: "Heading 1", icon: "H1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { id: "h2", label: "Heading 2", icon: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { id: "h3", label: "Heading 3", icon: "H3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { id: "h4", label: "Heading 4", icon: "H4", action: () => editor.chain().focus().toggleHeading({ level: 4 }).run() },
    { id: "h5", label: "Heading 5", icon: "H5", action: () => editor.chain().focus().toggleHeading({ level: 5 }).run() },
    { id: "bullet", label: "Bullet List", icon: "•", action: () => editor.chain().focus().toggleBulletList().run() },
    { id: "ordered", label: "Ordered List", icon: "1.", action: () => editor.chain().focus().toggleOrderedList().run() },
    { id: "quote", label: "Blockquote", icon: "\u201C", action: () => editor.chain().focus().toggleBlockquote().run() },
    { id: "image", label: "Add Image", icon: "🖼", action: () => {
      if (onOpenImage) onOpenImage();
    }},
    { id: "divider", label: "Divider", icon: "—", action: () => editor.chain().focus().setHorizontalRule().run() },
    { id: "code", label: "Code Block", icon: "</>", action: () => editor.chain().focus().toggleCodeBlock().run() },
  ];
  const filtered = search ? items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())) : items;
  useEffect(() => { setSelectedIndex(0); }, [search]);
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[selectedIndex]) { e.preventDefault(); onSelect(); setTimeout(() => filtered[selectedIndex].action(), 10); onClose(); }
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [filtered, selectedIndex, onSelect, onClose]);
  if (filtered.length === 0) return null;
  return (
    <div className={styles.slashMenu} style={{ top: position.top, left: position.left }}>
      {filtered.map((item, i) => (
        <button key={item.id} className={`${styles.slashItem} ${i === selectedIndex ? styles.slashItemActive : ""}`}
          onClick={() => { onSelect(); setTimeout(() => item.action(), 10); onClose(); }}
          onMouseEnter={() => setSelectedIndex(i)}
        >
          <span className={styles.slashIcon}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}