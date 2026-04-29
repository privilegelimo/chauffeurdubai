"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Plus, Pencil, Trash2, Loader2,
  AlertCircle, Check, X, Tag,
} from "lucide-react"

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"

const inputClass =
  "w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-sm shadow-sm"
const labelClass =
  "block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"

type Category = {
  id:          string
  name:        string
  slug:        string
  description: string
  icon:        string
}

const empty: Omit<Category, "id"> = {
  name: "", slug: "", description: "", icon: "",
}

function toSlug(val: string) {
  return val.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export default function CategoriesPage() {
  const supabase = createClient()

  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading]   = useState(true)
  const [error, setError]           = useState("")
  const [saving, setSaving]         = useState(false)

  // inline form state — null = closed, "new" = new, id = edit
  const [editing, setEditing]       = useState<string | null>(null)
  const [form, setForm]             = useState(empty)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deleting, setDeleting]     = useState<string | null>(null)

  const fetch = async () => {
    setIsLoading(true)
    const { data, error: e } = await supabase
      .from("categories")
      .select("*")
      .order("name")
    if (e) setError(e.message)
    else setCategories(data as Category[])
    setIsLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "name") {
      setForm((p) => ({ ...p, name: value, slug: toSlug(value) }))
    } else {
      setForm((p) => ({ ...p, [name]: value }))
    }
  }

  const openNew = () => {
    setForm(empty)
    setEditing("new")
    setError("")
  }

  const openEdit = (cat: Category) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description, icon: cat.icon })
    setEditing(cat.id)
    setError("")
  }

  const cancel = () => { setEditing(null); setForm(empty); setError("") }

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      setError("Name and slug are required.")
      return
    }
    setSaving(true)
    setError("")

    if (editing === "new") {
      const { error: e } = await supabase.from("categories").insert(form)
      if (e) { setError(e.message); setSaving(false); return }
    } else {
      const { error: e } = await supabase
        .from("categories").update(form).eq("id", editing!)
      if (e) { setError(e.message); setSaving(false); return }
    }

    setSaving(false)
    cancel()
    fetch()
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    const { error: e } = await supabase.from("categories").delete().eq("id", id)
    if (e) setError(e.message)
    else setCategories((p) => p.filter((c) => c.id !== id))
    setDeleting(null)
    setConfirmDelete(null)
  }

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Categories</h1>
          <p className="text-xs text-zinc-400 mt-0.5">{categories.length} categories</p>
        </div>
        {editing !== "new" && (
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            style={{ background: roseGold }}
          >
            <Plus size={15} /> New Category
          </button>
        )}
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" /> {error}
        </div>
      )}

      <div className="space-y-3">

        {/* New category inline form */}
        {editing === "new" && (
          <InlineForm
            form={form}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={cancel}
            saving={saving}
            title="New Category"
          />
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-zinc-400">
            <Loader2 size={18} className="animate-spin" style={{ color: "#b76e79" }} />
            <span className="text-sm">Loading...</span>
          </div>
        ) : categories.length === 0 && editing !== "new" ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400 bg-white rounded-2xl border border-rose-100">
            <Tag size={28} className="mb-3 opacity-30" />
            <p className="text-sm">No categories yet</p>
          </div>
        ) : (
          categories.map((cat) =>
            editing === cat.id ? (
              <InlineForm
                key={cat.id}
                form={form}
                onChange={handleChange}
                onSave={handleSave}
                onCancel={cancel}
                saving={saving}
                title="Edit Category"
              />
            ) : (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-rose-100 shadow-sm px-5 py-4 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {cat.icon ? (
                    <span className="text-xl">{cat.icon}</span>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                      <Tag size={14} style={{ color: "#b76e79" }} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{cat.name}</p>
                    <p className="text-xs text-zinc-400">/{cat.slug}</p>
                    {cat.description && (
                      <p className="text-xs text-zinc-500 mt-0.5 max-w-sm truncate">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all"
                  >
                    <Pencil size={14} />
                  </button>
                  {confirmDelete === cat.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        disabled={deleting === cat.id}
                        className="px-2.5 py-1 text-[10px] font-semibold bg-red-500 text-white rounded-lg disabled:opacity-60"
                      >
                        {deleting === cat.id ? <Loader2 size={10} className="animate-spin" /> : "Delete"}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-2.5 py-1 text-[10px] border border-zinc-200 text-zinc-500 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(cat.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}

function InlineForm({
  form, onChange, onSave, onCancel, saving, title,
}: {
  form: Omit<Category, "id">
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
  title: string
}) {
  return (
    <div className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm p-5 space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#b76e79" }}>
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input name="name" value={form.name} onChange={onChange} placeholder="e.g. Luxury Sedans" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input name="slug" value={form.slug} onChange={onChange} placeholder="luxury-sedans" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Icon (emoji)</label>
          <input name="icon" value={form.icon} onChange={onChange} placeholder="🚗" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <input name="description" value={form.description} onChange={onChange} placeholder="Short description..." className={inputClass} />
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 text-white text-sm font-semibold rounded-xl disabled:opacity-60"
          style={{ background: roseGold }}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 text-sm font-medium border border-rose-100 text-zinc-500 hover:text-zinc-900 rounded-xl transition-all"
        >
          <X size={14} className="inline mr-1" /> Cancel
        </button>
      </div>
    </div>
  )
}