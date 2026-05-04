// app/admin/fleet/categories/page.tsx
"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Plus, Pencil, Trash2, Loader2, AlertCircle, Check, X, Tag, GripVertical } from "lucide-react"

export const dynamic = "force-dynamic"

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"
const inputClass = "w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-sm shadow-sm"
const labelClass = "block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"

type Category = { id: string; name: string; slug: string; sort_order: number }
type FormData  = { name: string; slug: string; sort_order: number }

function toSlug(v: string) {
  return v.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim()
}

export default function FleetCategoriesPage() {
  const supabase = createClient()
  const [cats,       setCats]       = useState<Category[]>([])
  const [loading,    setLoading]    = useState(true)
  const [saving,     setSaving]     = useState(false)
  const [error,      setError]      = useState("")
  const [editing,    setEditing]    = useState<string | null>(null) // "new" | id
  const [form,       setForm]       = useState<FormData>({ name: "", slug: "", sort_order: 99 })
  const [confirmDel, setConfirmDel] = useState<string | null>(null)
  const [deleting,   setDeleting]   = useState<string | null>(null)

  const fetch = async () => {
    setLoading(true)
    const { data } = await supabase.from("fleet_categories").select("*").order("sort_order")
    setCats((data as Category[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const handleChange = (key: keyof FormData, val: string | number) => {
    if (key === "name" && typeof val === "string") {
      setForm((p) => ({ ...p, name: val, slug: toSlug(val) }))
    } else {
      setForm((p) => ({ ...p, [key]: val }))
    }
  }

  const openNew  = () => { setForm({ name: "", slug: "", sort_order: cats.length + 1 }); setEditing("new") }
  const openEdit = (c: Category) => { setForm({ name: c.name, slug: c.slug, sort_order: c.sort_order }); setEditing(c.id) }
  const cancel   = () => { setEditing(null); setError("") }

  const save = async () => {
    if (!form.name || !form.slug) { setError("Name and slug required."); return }
    setSaving(true); setError("")
    if (editing === "new") {
      const { error: e } = await supabase.from("fleet_categories").insert(form)
      if (e) { setError(e.message); setSaving(false); return }
    } else {
      const { error: e } = await supabase.from("fleet_categories").update(form).eq("id", editing!)
      if (e) { setError(e.message); setSaving(false); return }
    }
    setSaving(false); cancel(); fetch()
  }

  const del = async (id: string) => {
    setDeleting(id)
    await supabase.from("fleet_categories").delete().eq("id", id)
    setCats((p) => p.filter((c) => c.id !== id))
    setDeleting(null); setConfirmDel(null)
  }

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Fleet Categories</h1>
          <p className="text-xs text-zinc-400 mt-0.5">{cats.length} categories · controls fleet class order</p>
        </div>
        {editing !== "new" && (
          <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md" style={{ background: roseGold }}>
            <Plus size={15} /> New Category
          </button>
        )}
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="space-y-3">
        {/* Inline new form */}
        {editing === "new" && (
          <InlineForm form={form} onChange={handleChange} onSave={save} onCancel={cancel} saving={saving} title="New Category" />
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-zinc-400">
            <Loader2 size={18} className="animate-spin" style={{ color: "#b76e79" }} />
          </div>
        ) : cats.map((cat) =>
          editing === cat.id ? (
            <InlineForm key={cat.id} form={form} onChange={handleChange} onSave={save} onCancel={cancel} saving={saving} title="Edit Category" />
          ) : (
            <div key={cat.id} className="bg-white rounded-2xl border border-rose-100 shadow-sm px-5 py-4 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-zinc-300" />
                <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
                  <Tag size={13} style={{ color: "#b76e79" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{cat.name}</p>
                  <p className="text-xs text-zinc-400">/{cat.slug} · order: {cat.sort_order}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(cat)} className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all">
                  <Pencil size={14} />
                </button>
                {confirmDel === cat.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => del(cat.id)} disabled={deleting === cat.id} className="px-2.5 py-1 text-[10px] font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600">
                      {deleting === cat.id ? <Loader2 size={10} className="animate-spin" /> : "Delete"}
                    </button>
                    <button onClick={() => setConfirmDel(null)} className="px-2.5 py-1 text-[10px] border border-zinc-200 text-zinc-500 rounded-lg">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDel(cat.id)} className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

function InlineForm({ form, onChange, onSave, onCancel, saving, title }: {
  form: FormData; onChange: (k: keyof FormData, v: string | number) => void
  onSave: () => void; onCancel: () => void; saving: boolean; title: string
}) {
  return (
    <div className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm p-5">
      <p className="text-sm font-bold text-zinc-700 mb-4">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input type="text" value={form.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Business Class" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input type="text" value={form.slug} onChange={(e) => onChange("slug", e.target.value)} placeholder="business-class" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Sort Order</label>
          <input type="number" value={form.sort_order} onChange={(e) => onChange("sort_order", parseInt(e.target.value) || 1)} className={inputClass} />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2 text-white text-sm font-semibold rounded-xl disabled:opacity-60" style={{ background: roseGold }}>
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
          {saving ? "Saving..." : "Save"}
        </button>
        <button onClick={onCancel} className="px-4 py-2 text-sm border border-zinc-200 text-zinc-500 rounded-xl hover:bg-zinc-50 transition-all">
          <X size={13} />
        </button>
      </div>
    </div>
  )
}