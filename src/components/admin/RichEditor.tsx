// components/admin/RichEditor.tsx
"use client"

import { useEditor, EditorContent, Extension } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import TiptapImage from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { useEffect, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus,
  AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, ImagePlus,
  Table as TableIcon, Undo, Redo, Loader2,
} from "lucide-react"
import { useState } from "react"

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
}

function ToolbarButton({
  onClick, active, title, disabled, children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`p-1.5 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
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

// ── Supabase image upload helper ─────────────────────────────────────────────
const BUCKET = "blog-images"
const FOLDER = "content"

async function uploadImageToSupabase(file: File): Promise<string> {
  const supabase = createClient()
  const ext      = file.name.split(".").pop() ?? "jpg"
  const path     = `${FOLDER}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: false, contentType: file.type })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// ── Drop + Paste plugin ───────────────────────────────────────────────────────
function createImageUploadPlugin(
  onUpload: (file: File) => Promise<void>
) {
  return new Plugin({
    key: new PluginKey("imageUpload"),
    props: {
      handleDrop(view, event) {
        const files = Array.from(event.dataTransfer?.files ?? []).filter(
          (f) => f.type.startsWith("image/")
        )
        if (!files.length) return false
        event.preventDefault()
        files.forEach((f) => onUpload(f))
        return true
      },
      handlePaste(view, event) {
        const files = Array.from(event.clipboardData?.files ?? []).filter(
          (f) => f.type.startsWith("image/")
        )
        if (!files.length) return false
        event.preventDefault()
        files.forEach((f) => onUpload(f))
        return true
      },
    },
  })
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Forward ref so the plugin closure can access the latest editor
  const editorRef = useRef<ReturnType<typeof useEditor>>(null)

  const insertImageFromFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5 MB.")
      return
    }
    setUploading(true)
    setUploadError("")
    try {
      const url = await uploadImageToSupabase(file)
      editorRef.current?.chain().focus().setImage({ src: url }).run()
    } catch (e: unknown) {
      setUploadError(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }, [])

  // Memoised plugin that calls insertImageFromFile
  const imageUploadPlugin = useCallback(
    () => createImageUploadPlugin(insertImageFromFile),
    [insertImageFromFile]
  )

  const DropPasteExtension = Extension.create({
    name: "imageDropPaste",
    addProseMirrorPlugins() {
      return [imageUploadPlugin()]
    },
  })

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
      TiptapImage.configure({ inline: false, allowBase64: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: "Start writing your post content here...",
      }),
      DropPasteExtension,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "mdx-content min-h-[500px] focus:outline-none px-1",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Keep ref in sync
  useEffect(() => {
    // @ts-ignore
    editorRef.current = editor
  }, [editor])

  // Sync clear from parent
  useEffect(() => {
    if (editor && value === "") {
      editor.commands.clearContent()
    }
  }, [value, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes("link").href
    const url  = window.prompt("Enter URL:", prev || "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const insertTable = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  // Toolbar image upload — opens file picker
  const handleToolbarImageClick = () => {
    setUploadError("")
    fileInputRef.current?.click()
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) await insertImageFromFile(file)
    // Reset so same file can be re-selected
    e.target.value = ""
  }

  const wordCount = editor
    ? editor.getText().trim().split(/\s+/).filter(Boolean).length
    : 0

  if (!editor) return null

  return (
    <div className="border border-rose-100 rounded-2xl overflow-hidden bg-white shadow-sm">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-rose-100 bg-rose-50/30">

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })} title="Heading 1"
        >
          <Heading1 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })} title="Heading 2"
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })} title="Heading 3"
        >
          <Heading3 size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")} title="Bold"
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")} title="Italic"
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")} title="Underline"
        >
          <UnderlineIcon size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")} title="Strikethrough"
        >
          <Strikethrough size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")} title="Inline Code"
        >
          <Code size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })} title="Align Left"
        >
          <AlignLeft size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })} title="Align Center"
        >
          <AlignCenter size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })} title="Align Right"
        >
          <AlignRight size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")} title="Bullet List"
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")} title="Numbered List"
        >
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")} title="Blockquote"
        >
          <Quote size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Insert Link">
          <LinkIcon size={15} />
        </ToolbarButton>

        {/* Image upload button */}
        <ToolbarButton
          onClick={handleToolbarImageClick}
          title="Upload Image"
          disabled={uploading}
        >
          {uploading
            ? <Loader2 size={15} className="animate-spin" />
            : <ImagePlus size={15} />
          }
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

      {/* Upload error banner */}
      {uploadError && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-100 text-xs text-red-500 flex items-center gap-2">
          <span className="shrink-0">⚠</span> {uploadError}
          <button
            type="button"
            onClick={() => setUploadError("")}
            className="ml-auto text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* Drop zone hint overlay — shown only while dragging a file over the editor */}
      <div className="relative">
        <div className="px-6 py-5">
          <EditorContent editor={editor} />
        </div>

        {/* Invisible drop overlay with visual cue */}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2 rounded-b-2xl">
            <Loader2 size={24} className="animate-spin" style={{ color: "#b76e79" }} />
            <p className="text-xs text-zinc-500">Uploading image to Supabase...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-2 border-t border-rose-50 flex items-center justify-between">
        <p className="text-[10px] text-zinc-400">
          Drop or paste an image anywhere in the editor to upload it
        </p>
        <span className="text-[10px] text-zinc-400">{wordCount} words</span>
      </div>

      {/* Hidden file input for toolbar button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  )
}