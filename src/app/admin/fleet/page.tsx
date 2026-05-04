// app/admin/fleet/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  Plus, Search, Loader2, Trash2, Pencil,
  AlertCircle, ChevronDown, Car, ToggleLeft,
  ToggleRight, Users, Luggage,
} from "lucide-react"

export const dynamic = "force-dynamic"

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"

const inputClass =
  "bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-sm shadow-sm"

type Vehicle = {
  id:             string
  slug:           string
  class_slug:     string
  name:           string
  category:       string
  passengers:     number
  luggage:        number
  transfer_price: string
  price_5hr:      string
  price_10hr:     string
  cover_image:    string
  images:         string[]
  available:      boolean
  sort_order:     number
}

type Category = { id: string; slug: string; name: string; sort_order: number }

export default function FleetManagerPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [vehicles,    setVehicles]    = useState<Vehicle[]>([])
  const [categories,  setCategories]  = useState<Category[]>([])
  const [isLoading,   setIsLoading]   = useState(true)
  const [error,       setError]       = useState("")
  const [search,      setSearch]      = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [confirmId,   setConfirmId]   = useState<string | null>(null)
  const [deletingId,  setDeletingId]  = useState<string | null>(null)
  const [togglingId,  setTogglingId]  = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError("")
    const [{ data: cats }, { data: cars, error: e }] = await Promise.all([
      supabase.from("fleet_categories").select("*").order("sort_order"),
      supabase.from("fleet").select(
        "id,slug,class_slug,name,category,passengers,luggage,transfer_price,price_5hr,price_10hr,cover_image,images,available,sort_order"
      ).order("sort_order"),
    ])
    if (e) setError(e.message)
    setCategories((cats as Category[]) ?? [])
    setVehicles((cars as Vehicle[]) ?? [])
    setIsLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const toggleAvailable = async (v: Vehicle) => {
    setTogglingId(v.id)
    await supabase.from("fleet").update({ available: !v.available }).eq("id", v.id)
    setVehicles((p) => p.map((x) => x.id === v.id ? { ...x, available: !v.available } : x))
    setTogglingId(null)
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const { error: e } = await supabase.from("fleet").delete().eq("id", id)
    if (e) setError(e.message)
    else setVehicles((p) => p.filter((v) => v.id !== id))
    setDeletingId(null)
    setConfirmId(null)
  }

  const filtered = vehicles.filter((v) => {
    const matchClass  = classFilter === "all" || v.class_slug === classFilter
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) ||
                        v.category?.toLowerCase().includes(search.toLowerCase())
    return matchClass && matchSearch
  })

  const catLabel = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug

  const availCount  = vehicles.filter((v) =>  v.available).length
  const hiddenCount = vehicles.filter((v) => !v.available).length

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Fleet Manager</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {vehicles.length} vehicles · {availCount} live · {hiddenCount} hidden
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/fleet/new")}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
          style={{ background: roseGold }}
        >
          <Plus size={15} /> Add Vehicle
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" /> {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vehicles..."
            className={`${inputClass} w-full pl-9`}
          />
        </div>
        <div className="relative">
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className={`${inputClass} appearance-none pr-8 min-w-[200px]`}
          >
            <option value="all">All Classes</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-zinc-400">
            <Loader2 size={18} className="animate-spin" style={{ color: "#b76e79" }} />
            <span className="text-sm">Loading fleet...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Car size={32} className="mb-3 opacity-30" />
            <p className="text-sm font-medium">No vehicles found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-rose-50">
                {["Vehicle", "Class", "Capacity", "Transfer Price", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-400 ${["Capacity","Transfer Price"].includes(h) ? "hidden md:table-cell" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-rose-50/30 transition-colors group">

                  {/* Vehicle */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden border border-rose-100 flex-shrink-0 bg-rose-50">
                        {v.cover_image || v.images?.[0] ? (
                          <img
                            src={v.cover_image || v.images?.[0]}
                            alt={v.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car size={14} style={{ color: "#b76e79" }} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">{v.name}</p>
                        <p className="text-xs text-zinc-400">{v.category}</p>
                      </div>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="px-5 py-4">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-zinc-500 whitespace-nowrap">
                      {catLabel(v.class_slug)}
                    </span>
                  </td>

                  {/* Capacity */}
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Users size={11} style={{ color: "#b76e79" }} /> {v.passengers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Luggage size={11} style={{ color: "#b76e79" }} /> {v.luggage}
                      </span>
                    </div>
                  </td>

                  {/* Transfer Price */}
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-sm font-semibold text-zinc-800">{v.transfer_price}</p>
                    <p className="text-[10px] text-zinc-400">{v.price_5hr} · {v.price_10hr}</p>
                  </td>

                  {/* Status toggle */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleAvailable(v)}
                      disabled={togglingId === v.id}
                      className="flex items-center gap-1.5 text-xs font-medium transition-opacity disabled:opacity-50"
                    >
                      {togglingId === v.id ? (
                        <Loader2 size={14} className="animate-spin text-zinc-400" />
                      ) : v.available ? (
                        <><ToggleRight size={18} style={{ color: "#b76e79" }} /><span style={{ color: "#b76e79" }}>Live</span></>
                      ) : (
                        <><ToggleLeft size={18} className="text-zinc-400" /><span className="text-zinc-400">Hidden</span></>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => router.push(`/admin/fleet/edit/${v.slug}`)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>

                      {confirmId === v.id ? (
                        <div className="flex items-center gap-1 ml-1">
                          <button
                            onClick={() => handleDelete(v.id)}
                            disabled={deletingId === v.id}
                            className="px-2.5 py-1 text-[10px] font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-60"
                          >
                            {deletingId === v.id ? <Loader2 size={10} className="animate-spin" /> : "Delete"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-2.5 py-1 text-[10px] border border-zinc-200 text-zinc-500 rounded-lg hover:bg-zinc-50 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(v.id)}
                          className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!isLoading && filtered.length > 0 && (
        <p className="text-xs text-zinc-400 mt-4 text-right">
          Showing {filtered.length} of {vehicles.length} vehicles
        </p>
      )}
    </div>
  )
}