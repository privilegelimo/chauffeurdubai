"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Loader2 } from "lucide-react"

export default function AdminDelete({ slug }: { slug: string }) {
  const router = useRouter()
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      router.refresh()
    } catch {
      alert("Failed to delete post")
    } finally {
      setLoading(false)
      setConfirm(false)
    }
  }

  if (!confirm) {
    return (
      <button
        onClick={() => setConfirm(true)}
        className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
      >
        <Trash2 size={13} />
        Delete
      </button>
    )
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-xs text-zinc-500">Sure?</span>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-2.5 py-1 rounded-lg transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : "Yes"}
      </button>
      <button
        onClick={() => setConfirm(false)}
        className="text-xs text-zinc-400 hover:text-zinc-600 px-2 py-1 rounded-lg hover:bg-zinc-50 transition-colors"
      >
        No
      </button>
    </div>
  )
}
