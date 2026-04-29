"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import ImageUploader from "@/components/admin/ImageUploader"
import {
  Plus, Pencil, Trash2, Loader2, AlertCircle,
  Car, Users, Briefcase, X, Check,
  ToggleLeft, ToggleRight,
} from "lucide-react"

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"

const inputClass =
  "w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-sm shadow-sm"
const labelClass =
  "block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"

type Category = { id: string; name: string }

type Car = {
  id:             string
  name:           string
  slug:           string
  category_id:    string | null
  description:    string
  passengers:     number
  luggage:        number
  features:       string[]
  cover_image:    string
  price_per_hour: number
  price_per_day:  number
  available:      boolean
}

const emptyCar: Omit<Car, "id"> = {
  name: "", slug: "", category_id: null, description: "",
  passengers: 4, luggage: 3, features: [],
  cover_image: "", price_per_hour: 0, price_per_day: 0, available: true,
}

function toSlug(val: string) {
  return val.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export default function FleetPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [cars, setCars]             = useState<Car[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading]   = useState(true)
  const [error, setError]           = useState("")
  const [saving, setSaving]         = useState(false)
  const [editing, setEditing]       = useState<string | null>(null) // null | "new" | id
  const [form, setForm]             = useState<Omit<Car, "id">>(emptyCar)
  const [featuresInput, setFeaturesInput] = useState("")
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deleting, setDeleting]     = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const fetchAll = async () => {
    setIsLoading(true)
    const [{ data: carsData }, { data: catsData }] = await Promise.all([
      supabase.from("fleet").select("*").order("name"),
      supabase.from("categories").select("id, name").order("name"),
    ])
    setCars((carsData as Car[]) ?? [])
    setCategories((catsData as Category[]) ?? [])
    setIsLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (name === "name") {
      setForm((p) => ({ ...p, name: value, slug: toSlug(value) }))
    } else if (type === "number") {
      setForm((p) => ({ ...p, [name]: Number(value) }))
    } else {
      setForm((p) => ({ ...p, [name]: value }))
    }
  }

  const addFeature = () => {
    const f = featuresInput.trim()
    if (f && !form.features.includes(f)) {
      setForm((p) => ({ ...p, features: [...p.features, f] }))
    }
    setFeaturesInput("")
  }

  const removeFeature = (f: string) =>
    setForm((p) => ({ ...p, features: p.features.filter((x) => x !== f) }))

  const openNew = () => {
    setForm(emptyCar)
    setFeaturesInput("")
    setEditing("new")
    setError("")
  }

  const openEdit = (car: Car) => {
    setForm({
      name: car.name, slug: car.slug, category_id: car.category_id,
      description: car.description, passengers: car.passengers,
      luggage: car.luggage, features: car.features ?? [],
      cover_image: car.cover_image, price_per_hour: car.price_per_hour,
      price_per_day: car.price_per_day, available: car.available,
    })
    setFeaturesInput("")
    setEditing(car.id)
    setError("")
  }

  const cancel = () => { setEditing(null); setForm(emptyCar); setError("") }

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      setError("Name and slug are required.")
      return
    }
    setSaving(true)
    setError("")

    const payload = {
      ...form,
      updated_at: new Date().toISOString(),
    }

    if (editing === "new") {
      const { error: e } = await supabase.from("fleet").insert(payload)
      if (e) { setError(e.message); setSaving(false); return }
    } else {
      const { error: e } = await supabase.from("fleet").update(payload).eq("id", editing!)
      if (e) { setError(e.message); setSaving(false); return }
    }

    setSaving(false)
    cancel()
    fetchAll()
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    const { error: e } = await supabase.from("fleet").delete().eq("id", id)
    if (e) setError(e.message)
    else setCars((p) => p.filter((c) => c.id !== id))
    setDeleting(null)
    setConfirmDelete(null)
  }

  const toggleAvailable = async (car: Car) => {
    setTogglingId(car.id)
    const { error: e } = await supabase
      .from("fleet")
      .update({ available: !car.available, updated_at: new Date().toISOString() })
      .eq("id", car.id)
    if (!e) setCars((p) => p.map((c) => c.id === car.id ? { ...c, available: !c.available } : c))
    setTogglingId(null)
  }

  const getCategoryName = (id: string | null) =>
    categories.find((c) => c.id === id)?.name ?? "—"

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Fleet Manager</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {cars.filter((c) => c.available).length} available · {cars.filter((c) => !c.available).length} unavailable
          </p>
        </div>
        {editing !== "new" && (
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            style={{ background: roseGold }}
          >
            <Plus size={15} /> Add Vehicle
          </button>
        )}
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" /> {error}
        </div>
      )}

      <div className="space-y-4">

        {/* New car form */}
        {editing === "new" && (
          <CarForm
            form={form}
            onChange={handleChange}
            onImageChange={(url) => setForm((p) => ({ ...p, cover_image: url }))}
            categories={categories}
            featuresInput={featuresInput}
            onFeaturesInputChange={(v) => setFeaturesInput(v)}
            onAddFeature={addFeature}
            onRemoveFeature={removeFeature}
            onSave={handleSave}
            onCancel={cancel}
            saving={saving}
            title="New Vehicle"
          />
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-zinc-400">
            <Loader2 size={18} className="animate-spin" style={{ color: "#b76e79" }} />
            <span className="text-sm">Loading fleet...</span>
          </div>
        ) : cars.length === 0 && editing !== "new" ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400 bg-white rounded-2xl border border-rose-100">
            <Car size={28} className="mb-3 opacity-30" />
            <p className="text-sm">No vehicles yet</p>
          </div>
        ) : (
          cars.map((car) =>
            editing === car.id ? (
              <CarForm
                key={car.id}
                form={form}
                onChange={handleChange}
                onImageChange={(url) => setForm((p) => ({ ...p, cover_image: url }))}
                categories={categories}
                featuresInput={featuresInput}
                onFeaturesInputChange={(v) => setFeaturesInput(v)}
                onAddFeature={addFeature}
                onRemoveFeature={removeFeature}
                onSave={handleSave}
                onCancel={cancel}
                saving={saving}
                title="Edit Vehicle"
              />
            ) : (
              <div
                key={car.id}
                className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden group"
              >
                <div className="flex items-start gap-4 p-5">

                  {/* Thumbnail */}
                  <div className="w-20 h-14 rounded-xl overflow-hidden border border-rose-100 flex-shrink-0 bg-zinc-50">
                    {car.cover_image ? (
                      <img src={car.cover_image} alt={car.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car size={20} className="text-zinc-300" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{car.name}</p>
                        <p className="text-xs text-zinc-400">{getCategoryName(car.category_id)}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Availability toggle */}
                        <button
                          onClick={() => toggleAvailable(car)}
                          disabled={togglingId === car.id}
                          className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border transition-all disabled:opacity-50"
                          style={car.available
                            ? { borderColor: "#e8a4a0", color: "#b76e79", background: "#fdf0ef" }
                            : { borderColor: "#e4e4e7", color: "#a1a1aa" }
                          }
                        >
                          {togglingId === car.id
                            ? <Loader2 size={11} className="animate-spin" />
                            : car.available
                              ? <ToggleRight size={13} />
                              : <ToggleLeft size={13} />
                          }
                          {car.available ? "Available" : "Unavailable"}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openEdit(car)}
                          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Pencil size={14} />
                        </button>

                        {/* Delete */}
                        {confirmDelete === car.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(car.id)}
                              disabled={deleting === car.id}
                              className="px-2.5 py-1 text-[10px] font-semibold bg-red-500 text-white rounded-lg disabled:opacity-60"
                            >
                              {deleting === car.id ? <Loader2 size={10} className="animate-spin" /> : "Delete"}
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
                            onClick={() => setConfirmDelete(car.id)}
                            className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Users size={11} /> {car.passengers} passengers
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Briefcase size={11} /> {car.luggage} bags
                      </span>
                      {car.price_per_hour > 0 && (
                        <span className="text-xs text-zinc-500">
                          AED {car.price_per_hour}/hr
                        </span>
                      )}
                      {car.price_per_day > 0 && (
                        <span className="text-xs text-zinc-500">
                          AED {car.price_per_day}/day
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    {car.features?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {car.features.slice(0, 4).map((f) => (
                          <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-zinc-500">
                            {f}
                          </span>
                        ))}
                        {car.features.length > 4 && (
                          <span className="text-[10px] text-zinc-400">+{car.features.length - 4} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}

// ── Car form (shared for new + edit) ─────────────────────────────────────────
function CarForm({
  form, onChange, onImageChange, categories,
  featuresInput, onFeaturesInputChange, onAddFeature, onRemoveFeature,
  onSave, onCancel, saving, title,
}: {
  form: Omit<Car, "id">
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onImageChange: (url: string) => void
  categories: Category[]
  featuresInput: string
  onFeaturesInputChange: (v: string) => void
  onAddFeature: () => void
  onRemoveFeature: (f: string) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
  title: string
}) {
  return (
    <div className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm p-6 space-y-5">
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#b76e79" }}>
        {title}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Name */}
        <div>
          <label className={labelClass}>Name *</label>
          <input name="name" value={form.name} onChange={onChange} placeholder="e.g. Mercedes S-Class" className={inputClass} />
        </div>
        {/* Slug */}
        <div>
          <label className={labelClass}>Slug *</label>
          <input name="slug" value={form.slug} onChange={onChange} placeholder="mercedes-s-class" className={inputClass} />
        </div>
        {/* Category */}
        <div>
          <label className={labelClass}>Category</label>
          <select name="category_id" value={form.category_id ?? ""} onChange={onChange} className={`${inputClass} appearance-none`}>
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        {/* Passengers */}
        <div>
          <label className={labelClass}>Passengers</label>
          <input type="number" name="passengers" value={form.passengers} onChange={onChange} min={1} max={20} className={inputClass} />
        </div>
        {/* Luggage */}
        <div>
          <label className={labelClass}>Luggage bags</label>
          <input type="number" name="luggage" value={form.luggage} onChange={onChange} min={0} max={20} className={inputClass} />
        </div>
        {/* Price/hour */}
        <div>
          <label className={labelClass}>Price / Hour (AED)</label>
          <input type="number" name="price_per_hour" value={form.price_per_hour} onChange={onChange} min={0} className={inputClass} />
        </div>
        {/* Price/day */}
        <div>
          <label className={labelClass}>Price / Day (AED)</label>
          <input type="number" name="price_per_day" value={form.price_per_day} onChange={onChange} min={0} className={inputClass} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={3}
          placeholder="Short description of this vehicle..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Features */}
      <div>
        <label className={labelClass}>Features</label>
        <div className="flex gap-2">
          <input
            value={featuresInput}
            onChange={(e) => onFeaturesInputChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAddFeature() } }}
            placeholder="e.g. WiFi, Leather Seats..."
            className={inputClass}
          />
          <button
            type="button"
            onClick={onAddFeature}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0"
            style={{ background: roseGold }}
          >
            Add
          </button>
        </div>
        {form.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {form.features.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-zinc-600"
              >
                {f}
                <button type="button" onClick={() => onRemoveFeature(f)} className="text-zinc-400 hover:text-red-500 transition-colors ml-0.5">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cover Image */}
      <div>
        <label className={labelClass}>Cover Image</label>
        <ImageUploader
          value={form.cover_image}
          onChange={onImageChange}
          bucket="blog-images"
          folder="fleet"
        />
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            className={`relative w-10 h-5 rounded-full transition-all ${form.available ? "" : "bg-zinc-200"}`}
            style={form.available ? { background: roseGold } : {}}
          >
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={(e) => onChange(e as any)}
              className="sr-only"
            />
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                form.available ? "left-5" : "left-0.5"
              }`}
            />
          </div>
          <span className="text-sm font-medium text-zinc-700">
            {form.available ? "Available for booking" : "Unavailable"}
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-rose-50">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 text-white text-sm font-semibold rounded-xl disabled:opacity-60"
          style={{ background: roseGold }}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {saving ? "Saving..." : "Save Vehicle"}
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