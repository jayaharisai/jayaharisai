"use client";

import { useCallback } from "react";
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
import styles from "./RichEditor.module.css";

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const fonts = [
  "Inter",
  "Arial",
  "Helvetica",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
];

export default function RichEditor({
  content,
  onChange,
  placeholder = "Start writing...",
}: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5] },
      }),
      Underline,
      LinkExtension.configure({
        openOnClick: false,
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl || "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          {/* Headings */}
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`${styles.toolBtn} ${editor.isActive("heading", { level: 1 }) ? styles.active : ""}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${styles.toolBtn} ${editor.isActive("heading", { level: 2 }) ? styles.active : ""}`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`${styles.toolBtn} ${editor.isActive("heading", { level: 3 }) ? styles.active : ""}`}
            title="Heading 3"
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`${styles.toolBtn} ${editor.isActive("heading", { level: 4 }) ? styles.active : ""}`}
            title="Heading 4"
          >
            H4
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={`${styles.toolBtn} ${editor.isActive("heading", { level: 5 }) ? styles.active : ""}`}
            title="Heading 5"
          >
            H5
          </button>

          <span className={styles.divider} />

          {/* Text formatting */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${styles.toolBtn} ${editor.isActive("bold") ? styles.active : ""}`}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${styles.toolBtn} ${editor.isActive("italic") ? styles.active : ""}`}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${styles.toolBtn} ${editor.isActive("underline") ? styles.active : ""}`}
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${styles.toolBtn} ${editor.isActive("strike") ? styles.active : ""}`}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`${styles.toolBtn} ${editor.isActive("highlight") ? styles.active : ""}`}
            title="Highlight"
          >
            <span style={{ background: "#fff176" }}>H</span>
          </button>

          <span className={styles.divider} />

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${styles.toolBtn} ${editor.isActive("bulletList") ? styles.active : ""}`}
            title="Bullet List"
          >
            •≡
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${styles.toolBtn} ${editor.isActive("orderedList") ? styles.active : ""}`}
            title="Ordered List"
          >
            1.
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${styles.toolBtn} ${editor.isActive("blockquote") ? styles.active : ""}`}
            title="Blockquote"
          >
            "
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={styles.toolBtn}
            title="Divider"
          >
            —
          </button>

          <span className={styles.divider} />

          {/* Alignment */}
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`${styles.toolBtn} ${editor.isActive({ textAlign: "left" }) ? styles.active : ""}`}
            title="Align Left"
          >
            ≡
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`${styles.toolBtn} ${editor.isActive({ textAlign: "center" }) ? styles.active : ""}`}
            title="Align Center"
          >
            ≡
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`${styles.toolBtn} ${editor.isActive({ textAlign: "right" }) ? styles.active : ""}`}
            title="Align Right"
          >
            ≡
          </button>

          <span className={styles.divider} />

          {/* Link & Image */}
          <button onClick={setLink} className={styles.toolBtn} title="Link">
            🔗
          </button>
          <button onClick={addImage} className={styles.toolBtn} title="Add Image">
            🖼
          </button>

          <span className={styles.divider} />

          {/* Font family */}
          <select
            className={styles.fontSelect}
            value={editor.getAttributes("textStyle").fontFamily || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val) {
                editor.chain().focus().setFontFamily(val).run();
              } else {
                editor.chain().focus().unsetFontFamily().run();
              }
            }}
          >
            <option value="">Font</option>
            {fonts.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  );
}