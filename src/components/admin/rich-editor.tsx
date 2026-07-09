"use client";

import { useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

export function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Placeholder.configure({
        placeholder: "Rédigez votre article…",
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "article-content min-h-[24rem] w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return (
      <div className="min-h-[24rem] rounded-lg border border-hairline p-4 text-muted">
        Chargement de l&apos;éditeur…
      </div>
    );
  }

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok && data.url) editor.chain().focus().setImage({ src: data.url }).run();
  }

  return (
    <div className="rounded-lg border border-hairline">
      <Toolbar editor={editor} onImageClick={() => fileRef.current?.click()} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onPickImage}
        className="hidden"
      />
      <EditorContent editor={editor} className="px-4 py-4" />
    </div>
  );
}

function Btn({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`min-w-8 rounded-md px-2 py-1 text-body-sm transition-colors ${
        active
          ? "bg-accent/15 text-accent-ink"
          : "text-foreground hover:bg-surface hover:text-foreground-strong"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({
  editor,
  onImageClick,
}: {
  editor: Editor;
  onImageClick: () => void;
}) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL du lien", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-hairline p-2">
      <Btn title="Gras" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <strong>B</strong>
      </Btn>
      <Btn title="Italique" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <em>I</em>
      </Btn>
      <span className="mx-1 h-5 w-px bg-hairline" />
      <Btn title="Titre 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </Btn>
      <Btn title="Titre 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        H3
      </Btn>
      <span className="mx-1 h-5 w-px bg-hairline" />
      <Btn title="Liste à puces" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • Liste
      </Btn>
      <Btn title="Liste numérotée" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. Liste
      </Btn>
      <Btn title="Citation" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        &ldquo; &rdquo;
      </Btn>
      <span className="mx-1 h-5 w-px bg-hairline" />
      <Btn title="Lien" active={editor.isActive("link")} onClick={setLink}>
        Lien
      </Btn>
      <Btn title="Image" onClick={onImageClick}>
        Image
      </Btn>
    </div>
  );
}
