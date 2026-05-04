// src/app/admin/fleet/_components/ImageUploader.tsx
"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Upload, X, Loader2, GripVertical,
  Star, AlertCircle,
} from "lucide-react"

type UploadedImage = {
  url:        string
  path:       string
  uploading?: boolean
  error?:     string
}

type Props = {
  images:     string[]
  coverImage: string
  onChange:   (images: string[], cover: string) => void
  folder?:    string
}

const ACCEPTED = ["image/webp", "image/jpeg", "image/jpg", "image/png"]
const MAX_SIZE  = 5 * 1024 * 1024

function urlToPath(url: string) {
  const match = url.match(/fleet-images\/(.+)$/)
  return match ? match[1] : url
}

export default function ImageUploader({
  images, coverImage, onChange, folder = "vehicles",
}: Props) {
  const supabase     = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [items,      setItems]      = useState<UploadedImage[]>([])

  // Sync when parent loads edit data
  useEffect(() => {
    const valid = images.filter(Boolean)
    if (valid.length > 0) {
      setItems(valid.map((url) => ({ url, path: urlToPath(url) })))
    }
  }, [images.join(",")]) // eslint-disable-line react-hooks/exhaustive-deps

  function getPublicUrl(path: string) {
    const { data } = supabase.storage.from("fleet-images").getPublicUrl(path)
    return data.publicUrl
  }

  const uploadFile = useCallback(async (file: File): Promise<UploadedImage> => {
    if (!ACCEPTED.includes(file.type)) {
      return { url: "", path: "", error: `${file.name}: unsupported format (use WebP/JPG/PNG)` }
    }
    if (file.size > MAX_SIZE) {
      return { url: "", path: "", error: `${file.name}: exceeds 5MB limit` }
    }
    const ext  = file.name.split(".").pop()
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const path = `${folder}/${name}`

    const { error } = await supabase.storage
      .from("fleet-images")
      .upload(path, file, { cacheControl: "3600", upsert: false })

    if (error) return { url: "", path: "", error: error.message }
    return { url: getPublicUrl(path), path }
  }, [folder]) // eslint-disable-line react-hooks/exhaustive-deps

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArr = Array.from(files)

    // Show uploading placeholders
    const placeholders: UploadedImage[] = fileArr.map((f) => ({
      url:       URL.createObjectURL(f),
      path:      "",
      uploading: true,
    }))
    setItems((prev) => [...prev, ...placeholders])

    // Upload in parallel
    const results = await Promise.all(fileArr.map(uploadFile))

    // ✅ Update items state — no onChange inside updater
    let nextItems: UploadedImage[] = []
    setItems((prev) => {
      const withoutPlaceholders = prev.filter((x) => !x.uploading)
      const validResults        = results.filter((r) => r.url && !r.error)
      nextItems = [...withoutPlaceholders, ...validResults]
      return nextItems
    })

    // ✅ Call onChange AFTER setItems — never inside the updater
    setTimeout(() => {
      const validUrls = nextItems.map((x) => x.url).filter(Boolean)
      const newCover  = coverImage && validUrls.includes(coverImage)
        ? coverImage
        : validUrls[0] ?? ""
      onChange(validUrls, newCover)
    }, 0)

  }, [uploadFile, coverImage, onChange])

  const handleRemove = async (item: UploadedImage, idx: number) => {
    if (item.path && !item.path.startsWith("blob:") && item.path.includes("/")) {
      await supabase.storage.from("fleet-images").remove([item.path])
    }
    setItems((prev) => {
      const next      = prev.filter((_, i) => i !== idx)
      const validUrls = next.filter((x) => x.url && !x.error).map((x) => x.url)
      const newCover  = coverImage === item.url
        ? validUrls[0] ?? ""
        : coverImage
      // ✅ Safe — this is an event handler, not a render
      onChange(validUrls, newCover)
      return next
    })
  }

  // ✅ No setItems wrapper — call onChange directly
  const setCover = useCallback((url: string) => {
    const validUrls = items
      .filter((x) => x.url && !x.error && !x.uploading)
      .map((x) => x.url)
    onChange(validUrls, url)
  }, [items, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files)
  }, [processFiles])

  // Drag-to-reorder
  const dragItem     = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const handleDragSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return
    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(dragItem.current!, 1)
      next.splice(dragOverItem.current!, 0, moved)
      const validUrls = next.filter((x) => x.url && !x.error).map((x) => x.url)
      const newCover  = validUrls.includes(coverImage) ? coverImage : validUrls[0] ?? ""
      onChange(validUrls, newCover)
      dragItem.current     = null
      dragOverItem.current = null
      return next
    })
  }

  const validItems = items.filter((x) => !x.error)
  const errors     = items.filter((x) => x.error)

  return (
    <div className="space-y-4">

      {/* Errors */}
      {errors.map((e, i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
          <AlertCircle size={13} className="shrink-0" /> {e.error}
        </div>
      ))}

      {/* Image grid */}
      {validItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {validItems.map((item, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={() => { dragItem.current = idx }}
              onDragEnter={() => { dragOverItem.current = idx }}
              onDragEnd={handleDragSort}
              onDragOver={(e) => e.preventDefault()}
              className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing ${
                coverImage === item.url
                  ? "border-rose-400 shadow-md"
                  : "border-rose-100 hover:border-rose-300"
              }`}
              style={{ aspectRatio: "4/3" }}
            >
              <img src={item.url} alt="" className="w-full h-full object-cover" />

              {/* Upload spinner */}
              {item.uploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <Loader2 size={20} className="animate-spin" style={{ color: "#b76e79" }} />
                </div>
              )}

              {/* Hover actions */}
              {!item.uploading && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCover(item.url)}
                    title="Set as cover"
                    className={`p-1.5 rounded-lg transition-all ${
                      coverImage === item.url
                        ? "bg-rose-500 text-white"
                        : "bg-white/90 text-zinc-600 hover:bg-rose-50 hover:text-rose-500"
                    }`}
                  >
                    <Star size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item, idx)}
                    title="Remove"
                    className="p-1.5 rounded-lg bg-white/90 text-zinc-600 hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}

              {/* Cover badge */}
              {coverImage === item.url && (
                <div
                  className="absolute top-1.5 left-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#b76e79,#e8a4a0)" }}
                >
                  <Star size={9} /> Cover
                </div>
              )}

              {/* Drag hint */}
              <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-60 transition-opacity">
                <GripVertical size={14} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-rose-400 bg-rose-50"
            : "border-rose-200 hover:border-rose-300 hover:bg-rose-50/50"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
            <Upload size={18} style={{ color: "#b76e79" }} />
          </div>
          <p className="text-sm font-semibold text-zinc-700">
            {isDragging ? "Drop images here" : "Drag & drop images"}
          </p>
          <p className="text-xs text-zinc-400">
            or click to browse · WebP, JPG, PNG · max 5MB each
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/webp,image/jpeg,image/jpg,image/png"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) processFiles(e.target.files) }}
      />
    </div>
  )
}