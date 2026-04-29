"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import allVehiclesData from "@/data/vehicles.json";

type Vehicle = {
  slug: string;
  classSlug: string;
  name: string;
  title: string;
  metaDesc: string;
  seoKeywords: string;
  images: string[];
};

const allVehicles = allVehiclesData as Vehicle[];

type SeoRow = {
  id?: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_desc: string;
  og_image: string;
  canonical: string;
};

const emptyRow = (): SeoRow => ({
  page_path: "",
  title: "",
  description: "",
  keywords: "",
  og_title: "",
  og_desc: "",
  og_image: "",
  canonical: "",
});

export default function AdminSEOPage() {
  const supabase = createClient();
  const [rows, setRows]       = useState<SeoRow[]>([]);
  const [editing, setEditing] = useState<SeoRow | null>(null);
  const [saving, setSaving]   = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [msg, setMsg]         = useState("");
  const [search, setSearch]   = useState("");

  async function load() {
    const { data } = await supabase
      .from("seo_pages")
      .select("*")
      .order("page_path");
    setRows(data ?? []);
  }

  useEffect(() => { load(); }, []);

  // ── Seed all vehicle pages from vehicles.json ──────────────────────────
  async function seedFleetPages() {
    setSeeding(true);
    setMsg("");

    const toInsert = allVehicles.map((v) => ({
      page_path:   `/fleet/${v.classSlug}/${v.slug}`,
      title:       v.title ?? `${v.name} Chauffeur Dubai Abu Dhabi Sharjah`,
      description: v.metaDesc ?? "",
      keywords:    v.seoKeywords ?? "",
      og_title:    v.title ?? `${v.name} Chauffeur Dubai Abu Dhabi Sharjah`,
      og_desc:     v.metaDesc ?? "",
      og_image:    `https://www.chauffeurdubai.ae${v.images[0]}`,
      canonical:   `https://www.chauffeurdubai.ae/fleet/${v.classSlug}/${v.slug}`,
    }));

    const { error } = await supabase
      .from("seo_pages")
      .upsert(toInsert, { onConflict: "page_path", ignoreDuplicates: false });

    setSeeding(false);
    if (error) { setMsg("Seed error: " + error.message); return; }
    setMsg(`Seeded ${toInsert.length} vehicle pages ✓`);
    load();
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setMsg("");

    const { error } = editing.id
      ? await supabase
          .from("seo_pages")
          .update({ ...editing, updated_at: new Date().toISOString() })
          .eq("id", editing.id)
      : await supabase.from("seo_pages").insert(editing);

    setSaving(false);
    if (error) { setMsg("Error: " + error.message); return; }
    setMsg("Saved ✓");
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this SEO entry?")) return;
    await supabase.from("seo_pages").delete().eq("id", id);
    load();
  }

  const filtered = rows.filter(
    (r) =>
      r.page_path.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase())
  );

  const field = (key: keyof SeoRow, label: string, rowCount = 1) => (
  <div>
    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
      {label}
    </label>
    {rowCount > 1 ? (
      <textarea
        rows={rowCount}
        value={(editing as any)[key] ?? ""}
        onChange={(e) => setEditing((p) => ({ ...p!, [key]: e.target.value }))}
        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
      />
    ) : (
      <input
        type="text"
        value={(editing as any)[key] ?? ""}
        onChange={(e) => setEditing((p) => ({ ...p!, [key]: e.target.value }))}
        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
      />
    )}
  </div>
);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">SEO Manager</h1>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={seedFleetPages}
            disabled={seeding}
            className="bg-zinc-800 hover:bg-zinc-900 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all"
          >
            {seeding ? "Seeding…" : "⚡ Seed Fleet Pages"}
          </button>
          <button
            onClick={() => { setEditing(emptyRow()); setMsg(""); }}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all"
          >
            + Add Page
          </button>
        </div>
      </div>

      {msg && (
        <p className={`mb-4 text-sm font-medium ${msg.startsWith("Error") || msg.startsWith("Seed error") ? "text-red-500" : "text-green-600"}`}>
          {msg}
        </p>
      )}

      {/* ── Search ── */}
      <input
        type="text"
        placeholder="Search by path or title…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-rose-400"
      />

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-zinc-500">Page Path</th>
              <th className="text-left px-5 py-3 font-semibold text-zinc-500">Title</th>
              <th className="text-left px-5 py-3 font-semibold text-zinc-500 hidden md:table-cell">Description</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-zinc-600 max-w-[180px] truncate">{r.page_path}</td>
                <td className="px-5 py-3 text-zinc-800 max-w-[200px] truncate">{r.title}</td>
                <td className="px-5 py-3 text-zinc-500 max-w-[240px] truncate hidden md:table-cell">{r.description}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => { setEditing(r); setMsg(""); }}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(r.id!)}
                      className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-zinc-400 text-sm">
                  {rows.length === 0
                    ? 'No SEO entries yet. Click "⚡ Seed Fleet Pages" to auto-populate all vehicles.'
                    : "No results match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="px-5 py-3 text-xs text-zinc-400 border-t border-zinc-100">
          {filtered.length} of {rows.length} pages
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="font-bold text-zinc-900 text-lg">
                {editing.id ? "Edit SEO" : "Add SEO"}{" "}
                <span className="font-mono text-sm text-zinc-400">
                  {editing.page_path || "new page"}
                </span>
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="text-zinc-400 hover:text-zinc-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {field("page_path", "Page Path (e.g. /fleet/rolls-royce/rolls-royce-cullinan)")}
              {field("title", "Meta Title")}
              {field("description", "Meta Description", 3)}
              {field("keywords", "Keywords (comma separated)")}
              {field("og_title", "OG Title (leave blank to use Meta Title)")}
              {field("og_desc", "OG Description (leave blank to use Meta Desc)", 2)}
              {field("og_image", "OG Image URL")}
              {field("canonical", "Canonical URL (leave blank for auto)")}

              {/* Character counters */}
              <div className="flex gap-6 text-xs">
                <span className={editing.title.length > 60 ? "text-red-500" : "text-zinc-400"}>
                  Title: {editing.title.length}/60
                </span>
                <span className={editing.description.length > 160 ? "text-red-500" : "text-zinc-400"}>
                  Description: {editing.description.length}/160
                </span>
              </div>

              {msg && (
                <p className={`text-sm font-medium ${msg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
                  {msg}
                </p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="text-sm font-semibold text-zinc-500 hover:text-zinc-700 px-4 py-2 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}