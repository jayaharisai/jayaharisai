"use client";

import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";

interface SlashMenuProps {
  editor: Editor;
  isOpen: boolean;
  search: string;
  position: { top: number; left: number };
  onClose: () => void;
}

const ITEMS = [
  {
    id: "h1",
    label: "Heading 1",
    icon: "H1",
    action: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    id: "h2",
    label: "Heading 2",
    icon: "H2",
    action: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    id: "h3",
    label: "Heading 3",
    icon: "H3",
    action: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    id: "bullet",
    label: "Bullet List",
    icon: "•",
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    id: "ordered",
    label: "Ordered List",
    icon: "1.",
    action: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    id: "blockquote",
    label: "Blockquote",
    icon: '"',
    action: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    id: "image",
    label: "Image",
    icon: "🖼",
    action: (editor: Editor) => {
      const url = window.prompt("Enter image URL:");
      if (url) editor.chain().focus().setImage({ src: url }).run();
    },
  },
  {
    id: "separator",
    label: "Divider",
    icon: "—",
    action: (editor: Editor) => editor.chain().focus().setHorizontalRule().run(),
  },
  {
    id: "code",
    label: "Code Block",
    icon: "</>",
    action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
];

export default function SlashMenu({ editor, isOpen, search, position, onClose }: SlashMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const filtered = search
    ? ITEMS.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    : ITEMS;

  useEffect(() => {
    setSelectedIndex(0);
  }, [search, isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action(editor);
        onClose();
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, editor, onClose]);

  if (!isOpen || filtered.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className="slash-menu"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 9999,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        padding: 6,
        minWidth: 220,
        maxHeight: 280,
        overflowY: "auto",
      }}
    >
      {filtered.map((item, index) => (
        <button
          key={item.id}
          className={`slash-item ${index === selectedIndex ? "slash-active" : ""}`}
          onClick={() => {
            item.action(editor);
            onClose();
          }}
          onMouseEnter={() => setSelectedIndex(index)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: "8px 12px",
            border: "none",
            background: index === selectedIndex ? "#f3edf7" : "transparent",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 13,
            color: "#1a1a1a",
            fontFamily: "inherit",
            transition: "background 0.1s",
          }}
        >
          <span style={{
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            color: "#734f96",
            flexShrink: 0,
          }}>
            {item.icon}
          </span>
          <span style={{ fontWeight: 500 }}>{item.label}</span>
        </button>
      ))}
      <style jsx>{`
        .slash-menu {
          animation: fadeIn 0.12s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}