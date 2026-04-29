// components/admin/ImageUploader.tsx
"use client"

import { useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ImageIcon, Loader2, X, Upload } from "lucide-react"

interface Props {
  value: string
  onChange: (url: string) => void
  bucket?: string
  folder?: string
}

export default function ImageUploader({
  value,
  onChange,
  bucket = "blog-images",
  folder = "covers",
}: Props) {
  const supabase    = createClient()
  const inputRef    = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError]         = useState("")
  const [dragging, setDragging]   = useState(false)

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.")
      return
    }

    setUploading(true)
    setError("")

    const ext      = file.name.split(".").pop()
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: sbError } = await supabase.storage
      .from(bucket)
      .upload(filename, file, { upsert: false, contentType: file.type })

    if (sbError) {
      setError(sbError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filename)
    onChange(data.publicUrl)
    setUploading(false)
  }

  const handleFile = (file: File | undefined) => {
    if (file) upload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleRemove = async () => {
    // extract path after bucket name in the public URL
    try {
      const url      = new URL(value)
      const parts    = url.pathname.split(`/${bucket}/`)
      const filePath = parts[1]
      if (filePath) await supabase.storage.from(bucket).remove([filePath])
    } catch {}
    onChange("")
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-rose-100 aspect-[16/9] bg-zinc-50 group">
          <img
            src={value}
            alt="Featured"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-all"
            >
              <Upload size={12} /> Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 rounded-lg text-xs font-semibold text-white hover:bg-red-600 transition-all"
            >
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center gap-3
            rounded-xl border-2 border-dashed aspect-[16/9] cursor-pointer
            transition-all
            ${dragging
              ? "border-rose-300 bg-rose-50"
              : "border-rose-100 bg-zinc-50 hover:border-rose-200 hover:bg-rose-50/40"
            }
          `}
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="animate-spin" style={{ color: "#b76e79" }} />
              <p className="text-xs text-zinc-400">Uploading...</p>
            </>
          ) : (
            <>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #fdf0ef, #fce8e6)" }}
              >
                <ImageIcon size={18} style={{ color: "#b76e79" }} />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-zinc-600">
                  {dragging ? "Drop to upload" : "Click or drag & drop"}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">WebP, PNG, JPG — max 5 MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-[10px] text-red-500">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  )
}