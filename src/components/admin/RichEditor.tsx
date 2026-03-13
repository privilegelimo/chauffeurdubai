"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { useEffect, useCallback } from "react"
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus,
  AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, Image as ImageIcon,
  Table as TableIcon, Undo, Redo,
} from "lucide-react"

interface RichEditorProps {
  value: string
  onChange: (markdown: string) => void
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-all ${
        active
          ? "text-white shadow-sm"
          : "text-zinc-500 hover:text-zinc-900 hover:bg-rose-50"
      }`}
      style={active ? { background: "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)" } : {}}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-rose-100 mx-1" />
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false, allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: "Start writing your post content here...\n\nTip: Use / commands or the toolbar above to format your content.",
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "mdx-content min-h-[500px] focus:outline-none px-1",
      },
    },
    onUpdate({ editor }) {
      // Convert HTML to markdown-like MDX
      onChange(htmlToMdx(editor.getHTML()))
    },
  })

  // Sync external value changes
  useEffect(() => {
    if (editor && value === "") {
      editor.commands.clearContent()
    }
  }, [value, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes("link").href
    const url = window.prompt("Enter URL:", prev || "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return
    const url = window.prompt("Enter image URL:")
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }, [editor])

  const insertTable = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-rose-100 rounded-2xl overflow-hidden bg-white shadow-sm">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-rose-100 bg-rose-50/30">

        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo size={15} />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={15} />
        </ToolbarButton>

        <Divider />

        {/* Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          title="Inline Code"
        >
          <Code size={15} />
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          <AlignLeft size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          <AlignCenter size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          <AlignRight size={15} />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <Quote size={15} />
        </ToolbarButton>

        <Divider />

        {/* Insert */}
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Insert Link">
          <LinkIcon size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Insert Image">
          <ImageIcon size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={insertTable} title="Insert Table">
          <TableIcon size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus size={15} />
        </ToolbarButton>

      </div>

      {/* Editor Area */}
      <div className="px-6 py-5">
        <EditorContent editor={editor} />
      </div>

      {/* Word count */}
      <div className="px-6 py-2 border-t border-rose-50 flex justify-end">
        <span className="text-[10px] text-zinc-400">
          {editor.storage.characterCount?.words?.() ?? 0} words
        </span>
      </div>
    </div>
  )
}

// Convert TipTap HTML → MDX markdown
function htmlToMdx(html: string): string {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi,   (_, c) => `# ${strip(c)}\n\n`)
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi,   (_, c) => `## ${strip(c)}\n\n`)
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi,   (_, c) => `### ${strip(c)}\n\n`)
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, (_, c) => `**${strip(c)}**`)
    .replace(/<em[^>]*>(.*?)<\/em>/gi,   (_, c) => `*${strip(c)}*`)
    .replace(/<u[^>]*>(.*?)<\/u>/gi,     (_, c) => strip(c))
    .replace(/<s[^>]*>(.*?)<\/s>/gi,     (_, c) => `~~${strip(c)}~~`)
    .replace(/<code[^>]*>(.*?)<\/code>/gi,(_, c) => `\`${strip(c)}\``)
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, (_, href, c) => `[${strip(c)}](${href})`)
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, (_, src) => `![image](${src})\n\n`)
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis,(_, c) => `> ${strip(c).trim()}\n\n`)
    .replace(/<li[^>]*>(.*?)<\/li>/gi,   (_, c) => `- ${strip(c)}\n`)
    .replace(/<\/ul>|<\/ol>/gi,          () => "\n")
    .replace(/<ul[^>]*>|<ol[^>]*>/gi,    () => "")
    .replace(/<p[^>]*>(.*?)<\/p>/gi,     (_, c) => `${strip(c)}\n\n`)
    .replace(/<hr[^>]*\/?>/gi,           () => "\n---\n\n")
    .replace(/<[^>]+>/g,                 "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function strip(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim()
}
