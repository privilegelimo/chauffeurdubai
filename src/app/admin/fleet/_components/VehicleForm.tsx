// app/admin/fleet/_components/VehicleForm.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  Save, Loader2, AlertCircle, ArrowLeft,
  Plus, X, ChevronDown,
} from "lucide-react"
import ImageUploader from "./ImageUploader"



const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"

const inputClass =
  "w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-sm shadow-sm"
const labelClass =
  "block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"

type Spec     = { label: string; value: string }
type Category = { id: string; slug: string; name: string; sort_order: number }

type FormState = {
  slug:             string
  class_slug:       string
  name:             string
  category:         string
  passengers:       number
  luggage:          number
  transfer_price:   string
  price_5hr:        string
  price_10hr:       string
  cover_image:      string
  images:           string[]
  description:      string
  long_description: string
  features:         string[]
  specs:            Spec[]
  title:            string
  meta_desc:        string
  seo_keywords:     string
  sort_order:       number
  available:        boolean
}

const defaultForm: FormState = {
  slug: "", class_slug: "", name: "", category: "",
  passengers: 3, luggage: 3,
  transfer_price: "", price_5hr: "", price_10hr: "",
  cover_image: "", images: [""],
  description: "", long_description: "",
  features: [""], specs: [{ label: "", value: "" }],
  title: "", meta_desc: "", seo_keywords: "",
  sort_order: 99, available: true,
}

function toSlug(val: string) {
  return val.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export default function VehicleForm({
  mode, slug,
}: { mode: "new" | "edit"; slug?: string }) {
  const router   = useRouter()
  const supabase = createClient()

  const [form,       setForm]       = useState<FormState>(defaultForm)
  const [categories, setCategories] = useState<Category[]>([])
  const [saving,     setSaving]     = useState(false)
  const [loading,    setLoading]    = useState(mode === "edit")
  const [error,      setError]      = useState("")
  const [success,    setSuccess]    = useState("")

  const handleImagesChange = useCallback((imgs: string[], cover: string) => {
    setForm((p) => ({
      ...p,
      images: imgs,
      cover_image: cover,
    }))
  }, [])

  // Load categories
  useEffect(() => {
    supabase
      .from("fleet_categories")
      .select("*")
      .order("sort_order")
      .then(({ data }) => setCategories((data as Category[]) ?? []))
  }, [])

  // Load vehicle for edit
  useEffect(() => {
    if (mode !== "edit" || !slug) return
    supabase.from("fleet").select("*").eq("slug", slug).single()
      .then(({ data, error: e }) => {
        if (e || !data) { setError("Vehicle not found"); setLoading(false); return }
        setForm({
          ...defaultForm,
          ...data,
          images:   Array.isArray(data.images)   ? data.images   : [""],
          features: Array.isArray(data.features) ? data.features : [""],
          specs:    Array.isArray(data.specs)     ? data.specs    : [{ label: "", value: "" }],
        })
        setLoading(false)
      })
  }, [mode, slug])

  // ── Field helpers ────────────────────────────────────────────────────────────
  const set = (key: keyof FormState, val: unknown) =>
    setForm((p) => ({ ...p, [key]: val }))

  const handleName = (val: string) =>
    setForm((p) => ({
      ...p,
      name: val,
      slug: mode === "new" ? toSlug(val) : p.slug,
      title: mode === "new" ? `${val} Chauffeur Dubai | Luxury Car Hire Service UAE` : p.title,
    }))

  // Array field helpers
  const setArrItem = (key: "images" | "features", i: number, val: string) =>
    setForm((p) => {
      const arr = [...(p[key] as string[])]
      arr[i] = val
      return { ...p, [key]: arr }
    })
  const addArrItem = (key: "images" | "features") =>
    setForm((p) => ({ ...p, [key]: [...(p[key] as string[]), ""] }))
  const removeArrItem = (key: "images" | "features", i: number) =>
    setForm((p) => ({ ...p, [key]: (p[key] as string[]).filter((_, idx) => idx !== i) }))

  // Specs helpers
  const setSpec = (i: number, field: "label" | "value", val: string) =>
    setForm((p) => {
      const specs = [...p.specs]
      specs[i] = { ...specs[i], [field]: val }
      return { ...p, specs }
    })
  const addSpec    = () => setForm((p) => ({ ...p, specs: [...p.specs, { label: "", value: "" }] }))
  const removeSpec = (i: number) =>
    setForm((p) => ({ ...p, specs: p.specs.filter((_, idx) => idx !== i) }))

  // ── Save ─────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.name || !form.slug || !form.class_slug) {
      setError("Name, slug and class are required.")
      return
    }
    setSaving(true)
    setError("")
    setSuccess("")

    const payload = {
      ...form,
      images:   form.images.filter(Boolean),
      features: form.features.filter(Boolean),
      specs:    form.specs.filter((s) => s.label || s.value),
      cover_image: form.cover_image || form.images.find(Boolean) || "",
      updated_at: new Date().toISOString(),
    }

    const { error: e } = mode === "new"
      ? await supabase.from("fleet").insert(payload)
      : await supabase.from("fleet").update(payload).eq("slug", slug!)

    if (e) { setError(e.message); setSaving(false); return }

    setSuccess(mode === "new" ? "Vehicle added!" : "Changes saved!")
    setSaving(false)
    setTimeout(() => router.push("/admin/fleet"), 1000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 gap-3">
        <Loader2 size={20} className="animate-spin" style={{ color: "#b76e79" }} />
        <span className="text-zinc-500 text-sm">Loading vehicle...</span>
      </div>
    )
  }

  return (
    <div className="px-8 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/admin/fleet")}
          className="p-2 rounded-xl border border-rose-100 text-zinc-400 hover:text-zinc-600 hover:bg-rose-50 transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">
            {mode === "new" ? "Add New Vehicle" : `Edit: ${form.name}`}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {mode === "new" ? "Fill in all vehicle details" : `Editing /${form.slug}`}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md disabled:opacity-60 transition-all"
          style={{ background: roseGold }}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Vehicle"}
        </button>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <AlertCircle size={15} /> {error}
        </div>
      )}
      {success && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-semibold">
          ✓ {success}
        </div>
      )}

      <div className="space-y-6">

        {/* ── Basic Info ── */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Vehicle Name *</label>
              <input
                type="text" value={form.name}
                onChange={(e) => handleName(e.target.value)}
                placeholder="e.g. Mercedes S 500"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug *</label>
              <input
                type="text" value={form.slug}
                onChange={(e) => set("slug", toSlug(e.target.value))}
                placeholder="e.g. mercedes-s500"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Fleet Class *</label>
              <div className="relative">
                <select
                  value={form.class_slug}
                  onChange={(e) => set("class_slug", e.target.value)}
                  className={`${inputClass} appearance-none pr-8`}
                >
                  <option value="">Select a class...</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Category Label</label>
              <input
                type="text" value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="e.g. Executive VIP / First Class"
                className={inputClass}
              />
            </div>
          </div>
        </Section>

        {/* ── Capacity & Pricing ── */}
        <Section title="Capacity & Pricing">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Passengers</label>
              <input
                type="number" min={1} max={100}
                value={form.passengers}
                onChange={(e) => set("passengers", parseInt(e.target.value) || 1)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Luggage Bags</label>
              <input
                type="number" min={0} max={100}
                value={form.luggage}
                onChange={(e) => set("luggage", parseInt(e.target.value) || 0)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Sort Order</label>
              <input
                type="number" min={1}
                value={form.sort_order}
                onChange={(e) => set("sort_order", parseInt(e.target.value) || 99)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Transfer Price</label>
              <input
                type="text" value={form.transfer_price}
                onChange={(e) => set("transfer_price", e.target.value)}
                placeholder="AED 900"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>5 Hour Price</label>
              <input
                type="text" value={form.price_5hr}
                onChange={(e) => set("price_5hr", e.target.value)}
                placeholder="AED 1,500 / 5 Hr"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>10 Hour Price</label>
              <input
                type="text" value={form.price_10hr}
                onChange={(e) => set("price_10hr", e.target.value)}
                placeholder="AED 2,300 / 10 Hr"
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm font-medium text-zinc-700">Available on site</label>
            <button
              type="button"
              onClick={() => set("available", !form.available)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.available ? "" : "bg-zinc-200"}`}
              style={form.available ? { background: roseGold } : {}}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.available ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
            <span className="text-xs text-zinc-400">{form.available ? "Live" : "Hidden"}</span>
          </div>
        </Section>

       {/* ── Images ── */}
<Section title="Images">
  <ImageUploader
    images={form.images.filter(Boolean)}
    coverImage={form.cover_image}
    folder={`vehicles/${form.slug || "new"}`}
    onChange={handleImagesChange}
  />
  {/* Debug: shows what will be saved */}
  {form.cover_image && (
    <p className="text-[10px] text-zinc-400 mt-3">
      Cover: <span className="text-zinc-600 break-all">{form.cover_image}</span>
    </p>
  )}
</Section>
        {/* ── Descriptions ── */}
        <Section title="Descriptions">
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Short Description (shown on cards)</label>
              <textarea
                value={form.description} rows={2}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Brief 1-2 sentence description shown on fleet cards..."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Long Description (shown on vehicle page)</label>
              <textarea
                value={form.long_description} rows={4}
                onChange={(e) => set("long_description", e.target.value)}
                placeholder="Full description for the vehicle detail page..."
                className={inputClass}
              />
            </div>
          </div>
        </Section>

        {/* ── Features ── */}
        <Section title="Features">
          <div className="space-y-2">
            {form.features.map((feat, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text" value={feat}
                  onChange={(e) => setArrItem("features", i, e.target.value)}
                  placeholder="e.g. Heated & ventilated seats"
                  className={inputClass}
                />
                {form.features.length > 1 && (
                  <button onClick={() => removeArrItem("features", i)} className="p-2.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-all flex-shrink-0">
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrItem("features")}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 transition-all"
              style={{ color: "#b76e79" }}
            >
              <Plus size={13} /> Add Feature
            </button>
          </div>
        </Section>

        {/* ── Specs ── */}
        <Section title="Specs Table">
          <div className="space-y-2">
            {form.specs.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text" value={spec.label}
                  onChange={(e) => setSpec(i, "label", e.target.value)}
                  placeholder="Label (e.g. Fuel Type)"
                  className={inputClass}
                />
                <input
                  type="text" value={spec.value}
                  onChange={(e) => setSpec(i, "value", e.target.value)}
                  placeholder="Value (e.g. Hybrid)"
                  className={inputClass}
                />
                {form.specs.length > 1 && (
                  <button onClick={() => removeSpec(i)} className="p-2.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-all flex-shrink-0">
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addSpec}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 transition-all"
              style={{ color: "#b76e79" }}
            >
              <Plus size={13} /> Add Spec Row
            </button>
          </div>
        </Section>

        {/* ── SEO ── */}
        <Section title="SEO">
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Page Title</label>
              <input
                type="text" value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Mercedes S500 Chauffeur Dubai | Luxury Car Hire Service UAE"
                className={inputClass}
              />
              <p className="text-[10px] text-zinc-400 mt-1">{form.title.length}/60 chars recommended</p>
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea
                value={form.meta_desc} rows={2}
                onChange={(e) => set("meta_desc", e.target.value)}
                placeholder="Book a Mercedes S 500 chauffeur in Dubai, Abu Dhabi & Sharjah..."
                className={inputClass}
              />
              <p className="text-[10px] text-zinc-400 mt-1">{form.meta_desc.length}/160 chars recommended</p>
            </div>
            <div>
              <label className={labelClass}>SEO Keywords</label>
              <input
                type="text" value={form.seo_keywords}
                onChange={(e) => set("seo_keywords", e.target.value)}
                placeholder="Mercedes S500 chauffeur Dubai, S-Class hire Dubai"
                className={inputClass}
              />
            </div>
          </div>
        </Section>

      </div>

      {/* Bottom save */}
      <div className="mt-8 pt-6 border-t border-rose-100 flex justify-end gap-3">
        <button
          onClick={() => router.push("/admin/fleet")}
          className="px-5 py-2.5 text-sm border border-rose-200 text-zinc-500 rounded-xl hover:bg-rose-50 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md disabled:opacity-60 transition-all"
          style={{ background: roseGold }}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Vehicle"}
        </button>
      </div>
    </div>
  )
}

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
      <h2 className="text-sm font-bold text-zinc-700 mb-4 pb-3 border-b border-rose-50">{title}</h2>
      {children}
    </div>
  )
}